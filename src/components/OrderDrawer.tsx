import React, { useState, useId } from 'react';
import { CartItem, DeliveryDetails } from '../types';
import { BUSINESS_INFO, formatCurrency } from '../data/menuData';
import { 
  X, Trash2, Plus, Minus, MessageCircle, Truck, Store, 
  MapPin, CreditCard, DollarSign, Send, Copy, Check, Clock, AlertCircle 
} from 'lucide-react';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<DeliveryDetails>({
    orderType: 'delivery',
    customerName: '',
    phone: '',
    address: '',
    crossStreets: '',
    notes: '',
    paymentMethod: 'efectivo',
    cashAmountWith: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryCost = form.orderType === 'delivery' ? BUSINESS_INFO.deliveryCost : 0;
  const grandTotal = subtotal + deliveryCost;

  // Cash change calculation
  const cashGiven = form.cashAmountWith ? parseFloat(form.cashAmountWith.replace(/[^0-9]/g, '')) : 0;
  const changeDue = cashGiven > grandTotal ? cashGiven - grandTotal : 0;

  // Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.customerName.trim()) {
      errors.customerName = 'Por favor ingresá tu nombre';
    }
    if (form.orderType === 'delivery' && !form.address.trim()) {
      errors.address = 'La dirección es obligatoria para envíos a domicilio';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Build formatted WhatsApp message
  const generateWhatsAppMessage = () => {
    const lines: string[] = [];
    lines.push(`👋 *¡HOLA MI COCINA ROTISERÍA!*`);
    lines.push(`Quiero encargar el siguiente pedido:\n`);
    lines.push(`📋 *DETALLE DE LA COMPRA:*`);

    cartItems.forEach((item) => {
      lines.push(`• *${item.quantity}x* ${item.title} - ${formatCurrency(item.unitPrice * item.quantity)}`);
      if (item.notes) {
        lines.push(`  ↳ _Nota: ${item.notes}_`);
      }
    });

    lines.push(``);
    lines.push(`💰 *Subtotal comidas:* ${formatCurrency(subtotal)}`);
    if (form.orderType === 'delivery') {
      lines.push(`🛵 *Envío a domicilio:* ${formatCurrency(BUSINESS_INFO.deliveryCost)}`);
    } else {
      lines.push(`🏪 *Tipo de entrega:* Retiro en el local (Sin costo)`);
    }
    lines.push(`✨ *TOTAL A PAGAR: ${formatCurrency(grandTotal)}*`);
    lines.push(``);

    lines.push(`👤 *DATOS DEL CLIENTE:*`);
    lines.push(`• *Nombre:* ${form.customerName || 'No especificado'}`);
    if (form.phone) lines.push(`• *Teléfono:* ${form.phone}`);

    if (form.orderType === 'delivery') {
      lines.push(`• *Dirección:* ${form.address || 'A convenir'}`);
      if (form.crossStreets) lines.push(`• *Entrecalles/Ref:* ${form.crossStreets}`);
    } else {
      lines.push(`• *Entrega:* Retiro en local`);
    }

    const paymentLabels = {
      efectivo: 'Efectivo',
      transferencia: 'Transferencia bancaria',
      mercadopago: 'Mercado Pago / Dinero en cuenta'
    };
    lines.push(`• *Forma de pago:* ${paymentLabels[form.paymentMethod]}`);

    if (form.paymentMethod === 'efectivo' && cashGiven > 0) {
      lines.push(`• *Abona con:* ${formatCurrency(cashGiven)} (Vuelto: ${formatCurrency(changeDue)})`);
    }

    if (form.notes.trim()) {
      lines.push(`• *Aclaraciones especiales:* ${form.notes}`);
    }

    lines.push(`\n🕒 _Horario de delivery: ${BUSINESS_INFO.deliveryHours}_`);
    lines.push(`¡Espero su confirmación! Muchas gracias.`);

    return lines.join('\n');
  };

  const handleSendWhatsApp = () => {
    if (!validateForm()) return;
    const msg = generateWhatsAppMessage();
    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${BUSINESS_INFO.whatsappClean}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyOrder = () => {
    const msg = generateWhatsAppMessage();
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md sm:max-w-xl bg-stone-900 border-l border-stone-800 text-stone-100 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-5 py-4 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                🛒
              </div>
              <div>
                <h2 className="font-display text-2xl font-black text-white leading-tight">
                  GESTIONAR MI PEDIDO
                </h2>
                <p className="text-xs text-stone-400">
                  {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en tu lista
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Cerrar carrito"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-stone-800 flex items-center justify-center mx-auto mb-4 text-2xl">
                  🍕
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Tu pedido está vacío</h3>
                <p className="text-stone-400 text-sm max-w-xs mx-auto mb-6">
                  Explorá nuestras promociones, sándwiches, pizzas y empanadas para armar tu cena.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm"
                >
                  Ver el menú
                </button>
              </div>
            ) : (
              <>
                {/* 1. Items List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Platos seleccionados
                    </span>
                    <button
                      onClick={onClearCart}
                      className="text-xs text-stone-400 hover:text-red-400 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Vaciar</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-white truncate">{item.title}</h4>
                          <div className="text-xs text-amber-400 font-semibold mt-0.5">
                            {formatCurrency(item.unitPrice * item.quantity)}
                            <span className="text-stone-500 font-normal ml-1">
                              ({formatCurrency(item.unitPrice)} c/u)
                            </span>
                          </div>
                          {item.notes && (
                            <p className="text-[11px] text-stone-400 italic mt-1 line-clamp-2">
                              Nota: {item.notes}
                            </p>
                          )}
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-xl p-1 shrink-0">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center transition-colors text-xs"
                            aria-label="Restar una unidad"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center font-bold text-xs text-stone-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-7 h-7 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center transition-colors text-xs font-bold"
                            aria-label="Sumar una unidad"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-500 hover:text-red-400 p-1.5 transition-colors shrink-0"
                          title="Eliminar producto"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Delivery Options */}
                <div className="p-4 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Truck className="w-4 h-4" />
                    <span>Gestión de Envío y Entrega</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, orderType: 'delivery' })}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                        form.orderType === 'delivery'
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-amber-400" />
                          Delivery
                        </span>
                        <span className="text-xs font-extrabold text-amber-400">
                          {formatCurrency(BUSINESS_INFO.deliveryCost)}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400">A tu domicilio</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm({ ...form, orderType: 'takeaway' })}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                        form.orderType === 'takeaway'
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold flex items-center gap-1.5">
                          <Store className="w-3.5 h-3.5 text-amber-400" />
                          Retiro
                        </span>
                        <span className="text-xs font-extrabold text-emerald-400">GRATIS</span>
                      </div>
                      <span className="text-[10px] text-stone-400">En el local</span>
                    </button>
                  </div>

                  {/* Customer Info Form */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 mb-1">
                        Tu Nombre y Apellido *
                      </label>
                      <input
                        type="text"
                        value={form.customerName}
                        onChange={(e) => {
                          setForm({ ...form, customerName: e.target.value });
                          if (formErrors.customerName) setFormErrors({ ...formErrors, customerName: '' });
                        }}
                        placeholder="Ej. Martín Pérez"
                        className={`w-full px-3 py-2 bg-stone-900 border rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500 ${
                          formErrors.customerName ? 'border-red-500' : 'border-stone-800'
                        }`}
                      />
                      {formErrors.customerName && (
                        <p className="text-[11px] text-red-400 mt-1">{formErrors.customerName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-300 mb-1">
                        Teléfono de contacto (opcional)
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="Ej. 341-1234567"
                        className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {form.orderType === 'delivery' && (
                      <>
                        <div>
                          <label className="block text-[11px] font-bold text-stone-300 mb-1">
                            Dirección de entrega (Calle y Altura) *
                          </label>
                          <input
                            type="text"
                            value={form.address}
                            onChange={(e) => {
                              setForm({ ...form, address: e.target.value });
                              if (formErrors.address) setFormErrors({ ...formErrors, address: '' });
                            }}
                            placeholder="Ej. Av. Pellegrini 1420, Piso 3 Depto B"
                            className={`w-full px-3 py-2 bg-stone-900 border rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500 ${
                              formErrors.address ? 'border-red-500' : 'border-stone-800'
                            }`}
                          />
                          {formErrors.address && (
                            <p className="text-[11px] text-red-400 mt-1">{formErrors.address}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-300 mb-1">
                            Entrecalles o referencias para el delivery
                          </label>
                          <input
                            type="text"
                            value={form.crossStreets}
                            onChange={(e) => setForm({ ...form, crossStreets: e.target.value })}
                            placeholder="Ej. Entre Corrientes y Paraguay, portón negro"
                            className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="p-4 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" />
                    <span>Forma de Pago</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, paymentMethod: 'efectivo' })}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        form.paymentMethod === 'efectivo'
                          ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs block">💵 Efectivo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm({ ...form, paymentMethod: 'transferencia' })}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        form.paymentMethod === 'transferencia'
                          ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs block">🏦 Transf.</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm({ ...form, paymentMethod: 'mercadopago' })}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        form.paymentMethod === 'mercadopago'
                          ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs block">📱 MP / QR</span>
                    </button>
                  </div>

                  {form.paymentMethod === 'efectivo' && (
                    <div className="pt-1">
                      <label className="block text-[11px] font-medium text-stone-300 mb-1">
                        ¿Con cuánto abonás? (Calculamos tu vuelto)
                      </label>
                      <input
                        type="text"
                        value={form.cashAmountWith}
                        onChange={(e) => setForm({ ...form, cashAmountWith: e.target.value })}
                        placeholder={`Ej: ${formatCurrency(Math.ceil((grandTotal + 1000) / 1000) * 1000)}`}
                        className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                      />
                      {changeDue > 0 && (
                        <p className="text-xs text-emerald-400 font-bold mt-1.5 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Vuelto a recibir: {formatCurrency(changeDue)}
                        </p>
                      )}
                    </div>
                  )}

                  {/* General notes */}
                  <div>
                    <label className="block text-[11px] font-medium text-stone-300 mb-1">
                      Aclaraciones especiales (opcional)
                    </label>
                    <input
                      type="text"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Ej. Sin cebolla, papas bien crocantes..."
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer with Totals & Action Buttons */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-800 bg-stone-950 space-y-4">
              <div className="space-y-1.5 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span>Subtotal productos:</span>
                  <span className="font-semibold text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {form.orderType === 'delivery' ? 'Costo de envío:' : 'Retiro en local:'}
                  </span>
                  <span className="font-semibold text-amber-400">
                    {form.orderType === 'delivery' ? formatCurrency(deliveryCost) : 'Gratis ($0)'}
                  </span>
                </div>
                <div className="flex justify-between text-base pt-2 border-t border-stone-800 font-black">
                  <span className="text-white">TOTAL GENERAL:</span>
                  <span className="font-display text-2xl text-amber-400">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/60 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="w-5 h-5 animate-pulse" />
                  <span>Enviar Pedido por WhatsApp</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyOrder}
                    className="flex-1 py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-stone-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '¡Copiado!' : 'Copiar texto'}</span>
                  </button>

                  <a
                    href={`tel:${BUSINESS_INFO.phoneClean}`}
                    className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-stone-700 transition-colors"
                  >
                    <span>Llamar al {BUSINESS_INFO.phone}</span>
                  </a>
                </div>
              </div>

              <p className="text-[10px] text-center text-stone-500">
                Al enviar el pedido serás redirigido a WhatsApp con el mensaje ya redactado para coordinar el despacho.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
