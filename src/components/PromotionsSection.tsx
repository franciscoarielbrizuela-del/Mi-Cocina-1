import React from 'react';
import { PROMOTIONS, formatCurrency, BUSINESS_INFO } from '../data/menuData';
import { Promotion } from '../types';
import { Check, Flame, ShoppingBag, MessageCircle, Sparkles, Plus } from 'lucide-react';

interface PromotionsSectionProps {
  onAddToCart: (item: { id: string; title: string; unitPrice: number; category: string }) => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({ onAddToCart }) => {
  const getPromoTheme = (color: Promotion['badgeColor']) => {
    switch (color) {
      case 'red':
        return {
          cardBorder: 'border-red-600/60 hover:border-red-500',
          gradientBg: 'from-red-950/40 via-stone-900/90 to-stone-950',
          badgeBg: 'bg-red-600 text-white shadow-red-900/50',
          tagText: 'text-red-400',
          priceColor: 'text-red-400',
          buttonBg: 'bg-red-600 hover:bg-red-500 text-white',
          glow: 'shadow-red-950/40 hover:shadow-red-900/30',
          accentBorder: 'border-red-500/30'
        };
      case 'yellow':
        return {
          cardBorder: 'border-amber-400/60 hover:border-amber-300',
          gradientBg: 'from-amber-950/40 via-stone-900/90 to-stone-950',
          badgeBg: 'bg-amber-400 text-stone-950 shadow-amber-900/50',
          tagText: 'text-amber-400',
          priceColor: 'text-amber-400',
          buttonBg: 'bg-amber-400 hover:bg-amber-300 text-stone-950',
          glow: 'shadow-amber-950/40 hover:shadow-amber-900/30',
          accentBorder: 'border-amber-500/30'
        };
      case 'green':
        return {
          cardBorder: 'border-emerald-500/60 hover:border-emerald-400',
          gradientBg: 'from-emerald-950/40 via-stone-900/90 to-stone-950',
          badgeBg: 'bg-emerald-600 text-white shadow-emerald-900/50',
          tagText: 'text-emerald-400',
          priceColor: 'text-emerald-400',
          buttonBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
          glow: 'shadow-emerald-950/40 hover:shadow-emerald-900/30',
          accentBorder: 'border-emerald-500/30'
        };
    }
  };

  const getDirectWhatsAppUrl = (promo: Promotion) => {
    const text = encodeURIComponent(
      `¡Hola Mi Cocina Rotisería! Quiero pedir la *${promo.title}* ($${promo.price.toLocaleString('es-AR')}):\n` +
      `• ${promo.items.join('\n• ')}\n\n` +
      `¿Podrían confirmarme la demora? ¡Muchas gracias!`
    );
    return `https://wa.me/${BUSINESS_INFO.whatsappClean}?text=${text}`;
  };

  return (
    <section id="promociones" className="py-20 bg-stone-900/80 border-t border-b border-stone-800/80 relative">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-800/60 text-red-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Flame className="w-4 h-4 text-red-500" />
            <span>Super Promociones Especiales</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            COMBOS DESTACADOS
          </h2>
          <p className="text-stone-300 text-base md:text-lg mt-2">
            Elegí tu combo favorito con descuento especial. Cantidades abundantes y listas para compartir.
          </p>
        </div>

        {/* 3 Promos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {PROMOTIONS.map((promo) => {
            const theme = getPromoTheme(promo.badgeColor);

            return (
              <div
                key={promo.id}
                className={`relative rounded-3xl bg-gradient-to-b ${theme.gradientBg} border-2 ${theme.cardBorder} p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${theme.glow} flex flex-col justify-between group`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-4 py-1.5 rounded-full font-display text-xl font-black tracking-wider uppercase shadow-md ${theme.badgeBg}`}>
                    {promo.title}
                  </span>
                  {promo.savings && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-stone-800/90 text-stone-300 border border-stone-700/60 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      {promo.savings}
                    </span>
                  )}
                </div>

                {/* Promo content */}
                <div>
                  <p className="text-stone-300 text-sm mb-6 leading-relaxed">
                    {promo.description}
                  </p>

                  {/* Included items list */}
                  <div className="space-y-3 mb-8 bg-stone-950/50 p-4 rounded-2xl border border-stone-800/60">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                      ¿Qué incluye esta promo?
                    </div>
                    {promo.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-stone-100 font-semibold text-sm sm:text-base">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${theme.badgeBg}`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and actions */}
                <div className="pt-4 border-t border-stone-800/80">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-xs uppercase font-bold text-stone-400">Precio Promo:</span>
                    <span className={`font-display text-4xl sm:text-5xl font-black ${theme.priceColor}`}>
                      {formatCurrency(promo.price)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Add to order cart */}
                    <button
                      onClick={() => onAddToCart({
                        id: promo.id,
                        title: `${promo.title} (${promo.items.join(' + ')})`,
                        unitPrice: promo.price,
                        category: 'Promociones'
                      })}
                      className="w-full py-3 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer group-hover:border-stone-500"
                    >
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>Al Carrito</span>
                    </button>

                    {/* Direct WhatsApp order */}
                    <a
                      href={getDirectWhatsAppUrl(promo)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3 px-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md ${theme.buttonBg}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Pedir Promo</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
