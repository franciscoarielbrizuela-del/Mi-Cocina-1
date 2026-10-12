import React, { useState } from 'react';
import { BUSINESS_INFO, formatCurrency } from '../data/menuData';
import { Phone, ShoppingBag, Menu, X, Clock, Flame, UtensilsCrossed } from 'lucide-react';

interface NavbarProps {
  totalItems: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ totalItems, cartTotal, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800 text-stone-100 shadow-xl transition-all">
      {/* Top micro-bar with delivery status & emergency telephone */}
      <div className="bg-gradient-to-r from-red-900 via-amber-800 to-red-900 px-4 py-1.5 text-xs font-medium text-amber-100 flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold tracking-wide">🛵 Delivery: {BUSINESS_INFO.deliveryHours}</span>
            <span className="hidden sm:inline opacity-75">| Costo de envío: {formatCurrency(BUSINESS_INFO.deliveryCost)}</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${BUSINESS_INFO.phoneClean}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors font-bold underline sm:no-underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Tel: {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => scrollTo('hero')} 
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-stone-950 shadow-lg shadow-red-950/50 group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-stone-950" />
          </div>
          <div>
            <div className="font-display text-2xl md:text-3xl font-extrabold tracking-wider leading-none text-white group-hover:text-amber-400 transition-colors">
              MI COCINA
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-500 flex items-center gap-1">
              <span>ROTISERÍA</span>
              <span className="text-stone-500">•</span>
              <span className="text-red-400 font-semibold">{BUSINESS_INFO.subtitle}</span>
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-stone-300">
          <button 
            onClick={() => scrollTo('hero')} 
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Inicio
          </button>
          <button 
            onClick={() => scrollTo('promociones')} 
            className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase rounded bg-red-600 text-white">Hot</span>
            Promociones
          </button>
          <button 
            onClick={() => scrollTo('menu')} 
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Menú Completo
          </button>
          <button 
            onClick={() => scrollTo('contacto')} 
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Contacto & Envíos
          </button>
        </div>

        {/* Action Buttons: Cart & Order */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-100 font-bold transition-all shadow-md group cursor-pointer"
            aria-label="Abrir carrito de compras"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-medium text-stone-300">Tu pedido:</span>
            <span className="text-sm font-extrabold text-amber-400">
              {cartTotal > 0 ? formatCurrency(cartTotal) : 'Vacío'}
            </span>
          </button>

          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition-all hover:scale-105"
          >
            <span>WhatsApp</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-stone-800 text-stone-300 hover:text-white border border-stone-700"
            aria-label="Menú principal"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-5 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <button
            onClick={() => scrollTo('hero')}
            className="w-full text-left py-2 text-stone-200 font-semibold hover:text-amber-400 border-b border-stone-800/60"
          >
            🏠 Inicio
          </button>
          <button
            onClick={() => scrollTo('promociones')}
            className="w-full text-left py-2 text-amber-400 font-semibold hover:text-amber-300 border-b border-stone-800/60 flex items-center justify-between"
          >
            <span>🔥 Promociones Destacadas</span>
            <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">3 Promos</span>
          </button>
          <button
            onClick={() => scrollTo('menu')}
            className="w-full text-left py-2 text-stone-200 font-semibold hover:text-amber-400 border-b border-stone-800/60"
          >
            📋 Menú Completo
          </button>
          <button
            onClick={() => scrollTo('contacto')}
            className="w-full text-left py-2 text-stone-200 font-semibold hover:text-amber-400 border-b border-stone-800/60"
          >
            📍 Contacto, Horarios y Envíos
          </button>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Ver mi Pedido ({totalItems} items - {formatCurrency(cartTotal)})</span>
            </button>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2 text-center"
            >
              <span>💬 Escribir al WhatsApp ({BUSINESS_INFO.whatsappNumber})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
