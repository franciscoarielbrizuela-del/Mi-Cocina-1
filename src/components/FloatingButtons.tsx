import React from 'react';
import { BUSINESS_INFO, formatCurrency } from '../data/menuData';
import { MessageCircle, ShoppingBag } from 'lucide-react';

interface FloatingButtonsProps {
  totalItems: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  totalItems,
  cartTotal,
  onOpenCart,
}) => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Floating Cart Button (if items > 0 or user wants quick access) */}
      {totalItems > 0 && (
        <button
          onClick={onOpenCart}
          className="flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black shadow-2xl shadow-black/80 border-2 border-stone-900 transform hover:scale-105 active:scale-95 transition-all cursor-pointer animate-in slide-in-from-bottom duration-300"
          aria-label="Abrir carrito con tus pedidos"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-stone-950" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <div className="text-left text-xs leading-tight">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-800">Ver Pedido</div>
            <div className="text-sm font-extrabold">{formatCurrency(cartTotal)}</div>
          </div>
        </button>
      )}

      {/* Floating WhatsApp Button (always visible in bottom right corner as required) */}
      <a
        href={BUSINESS_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-950/80 transform hover:scale-110 active:scale-95 transition-all"
        aria-label="Contactar por WhatsApp a Mi Cocina Rotisería"
      >
        {/* Pulsating animation rings */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow" />

        {/* Hover Tooltip for desktop */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-100 text-xs font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          💬 ¡Hacé tu pedido al {BUSINESS_INFO.whatsappNumber}!
        </span>
      </a>
    </div>
  );
};
