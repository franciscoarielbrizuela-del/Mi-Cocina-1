import React from 'react';
import { BUSINESS_INFO, formatCurrency } from '../data/menuData';
import { Phone, MessageCircle, Clock, Truck, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contacto" className="py-20 bg-stone-900 border-t border-stone-800 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
            <MessageCircle className="w-4 h-4" />
            <span>Atención Rápida y Personalizada</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            HACÉ TU PEDIDO POR WHATSAPP
          </h2>
          <p className="text-stone-300 text-base md:text-lg mt-2">
            Estamos listos para tomar tu orden y llevarte la comida recién hecha y caliente a la puerta de tu casa.
          </p>
        </div>

        {/* Big CTA banner card */}
        <div className="rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 border-2 border-emerald-500/40 p-8 sm:p-10 shadow-2xl mb-12 text-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <MessageCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-white mb-2">
                WHATSAPP DE PEDIDOS Y CONSULTAS
              </h3>
              <p className="text-stone-300 text-sm sm:text-base">
                Escribinos directamente al número oficial para pedir cualquier promo o plato del menú.
              </p>
            </div>

            <div className="py-2">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-lg sm:text-xl shadow-xl shadow-emerald-950/60 transform hover:-translate-y-1 active:translate-y-0 transition-all border border-emerald-400/40 w-full sm:w-auto"
              >
                <MessageCircle className="w-7 h-7" />
                <span>Pedir por WhatsApp: {BUSINESS_INFO.whatsappNumber}</span>
              </a>
            </div>

            <div className="text-xs text-stone-400">
              Enlace directo: <a href={BUSINESS_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline font-semibold">{BUSINESS_INFO.whatsappUrl}</a>
            </div>
          </div>
        </div>

        {/* Detail cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Phone */}
          <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800 text-center flex flex-col items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Nuevo Teléfono
              </span>
              <h4 className="text-xl font-black text-white mb-1">
                {BUSINESS_INFO.phone}
              </h4>
              <p className="text-xs text-stone-400">
                Línea telefónica directa para llamadas rápidas y confirmación.
              </p>
            </div>
            <a
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="mt-4 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-amber-300 w-full transition-colors"
            >
              Llamar ahora
            </a>
          </div>

          {/* Card 2: Horarios */}
          <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800 text-center flex flex-col items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-400 block mb-1">
                Horario de Delivery
              </span>
              <h4 className="text-xl font-black text-white mb-1">
                {BUSINESS_INFO.deliveryHours}
              </h4>
              <p className="text-xs text-stone-400">
                Despacho nocturno caliente. Podés dejar tu pedido encargado con anticipación.
              </p>
            </div>
            <div className="mt-4 px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs font-semibold text-stone-400 w-full">
              Lunes a Domingos
            </div>
          </div>

          {/* Card 3: Envíos */}
          <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800 text-center flex flex-col items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Costo de Envíos
              </span>
              <h4 className="text-xl font-black text-white mb-1">
                {formatCurrency(BUSINESS_INFO.deliveryCost)}
              </h4>
              <p className="text-xs text-stone-400">
                Reparto ágil en moto con caja térmica para que la comida llegue en su punto justo.
              </p>
            </div>
            <div className="mt-4 px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs font-semibold text-stone-400 w-full">
              O retiro gratis por el local
            </div>
          </div>
        </div>

        {/* Confidence & Delivery Guarantees */}
        <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800/80 flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Comida recién salida del horno y plancha</div>
              <div className="text-xs text-stone-400">Elaboración artesanal con materia prima de calidad</div>
            </div>
          </div>

          <div className="h-8 w-px bg-stone-800 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Medios de pago flexibles</div>
              <div className="text-xs text-stone-400">Efectivo (con vuelto), Transferencia bancaria o Mercado Pago</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
