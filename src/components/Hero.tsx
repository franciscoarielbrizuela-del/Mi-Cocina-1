import React, { useMemo } from 'react';
import { BUSINESS_INFO, formatCurrency } from '../data/menuData';
import { Phone, MessageCircle, Clock, Truck, Flame, ArrowDown, ChevronRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCart }) => {
  // Check if currently open or in pre-order window
  const statusInfo = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;

    // Delivery is 20:30 (1230 min) to 23:00 (1380 min)
    const openTimeInMinutes = 20 * 60 + 30; // 20:30
    const closeTimeInMinutes = 23 * 60;     // 23:00

    const isOpen = currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;

    return {
      isOpen,
      text: isOpen ? '¡Abierto ahora! Tomando pedidos para despacho' : 'Tomando pedidos anticipados para la noche',
      subtext: `Horario de entrega: ${BUSINESS_INFO.deliveryHours}`,
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-stone-950 pt-6 pb-16">
      {/* Background Graphic & Food Ambient Imagery */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=2000&q=80"
          alt="Pizzas y comida de rotisería"
          className="w-full h-full object-cover object-center filter blur-[1px] brightness-75 scale-105 transform animate-pulse duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/60" />
        <div className="absolute inset-0 bg-radial-at-c from-amber-600/10 via-transparent to-black" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center max-w-5xl">
        {/* Real-time Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/40 text-amber-300 text-xs md:text-sm font-bold shadow-lg backdrop-blur-md mb-6 animate-fade-in">
          <span className={`w-2.5 h-2.5 rounded-full ${statusInfo.isOpen ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
          <span>{statusInfo.text}</span>
          <span className="hidden sm:inline text-stone-400 font-normal">({statusInfo.subtext})</span>
        </div>

        {/* Main Brand Title & Subtitle */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-center gap-2 text-red-500 font-extrabold uppercase text-sm md:text-base tracking-widest">
            <Flame className="w-5 h-5 animate-bounce" />
            <span>Sabor Casero & Porciones Abundantes</span>
            <Flame className="w-5 h-5 animate-bounce" />
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white drop-shadow-2xl leading-none">
            MI COCINA <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-red-500">ROTISERÍA</span>
          </h1>

          <div className="flex items-center justify-center gap-3">
            <div className="h-0.5 w-12 bg-amber-500/60" />
            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-amber-400 drop-shadow">
              {BUSINESS_INFO.subtitle}
            </span>
            <div className="h-0.5 w-12 bg-amber-500/60" />
          </div>

          <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base md:text-lg font-medium leading-relaxed pt-2">
            Pizzas a la parrilla y al molde, carlitos auténticos, torpedos gigantes, pizzanesas para compartir y empanadas caseras calientes.
          </p>
        </div>

        {/* Highlighted Value Cards: Horarios, Envíos, WhatsApp, Nuevo Teléfono */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-8 text-left">
          {/* Nuevo Teléfono */}
          <a
            href={`tel:${BUSINESS_INFO.phoneClean}`}
            className="p-3.5 sm:p-4 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/50 transition-all group backdrop-blur-sm block shadow-md"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Nuevo Teléfono</span>
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
            </div>
            <div className="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors">
              {BUSINESS_INFO.phone}
            </div>
            <p className="text-[11px] text-stone-400">Llamada directa para pedidos</p>
          </a>

          {/* WhatsApp */}
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 sm:p-4 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-emerald-500/50 transition-all group backdrop-blur-sm block shadow-md"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">WhatsApp Oficial</span>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-base sm:text-lg font-extrabold text-white group-hover:text-emerald-300 transition-colors">
              {BUSINESS_INFO.whatsappNumber}
            </div>
            <p className="text-[11px] text-stone-400">Pedidos rápidos con 1 clic</p>
          </a>

          {/* Horario Delivery */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-sm shadow-md">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-400">Horario Delivery</span>
              <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-base sm:text-lg font-extrabold text-white">
              {BUSINESS_INFO.deliveryHours}
            </div>
            <p className="text-[11px] text-stone-400">Todas las noches</p>
          </div>

          {/* Costo de Envío */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-sm shadow-md">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Costo de Envío</span>
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-base sm:text-lg font-extrabold text-white">
              {formatCurrency(BUSINESS_INFO.deliveryCost)}
            </div>
            <p className="text-[11px] text-stone-400">O retiro gratis en local</p>
          </div>
        </div>

        {/* Primary Call-to-Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          {/* Main CTA required by prompt */}
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-lg shadow-xl shadow-emerald-950/60 transform hover:-translate-y-0.5 active:translate-y-0 transition-all border border-emerald-400/30"
          >
            <MessageCircle className="w-6 h-6 animate-pulse" />
            <span>Hacé tu pedido por WhatsApp</span>
          </a>

          {/* Interactive online order trigger */}
          <button
            onClick={onOpenCart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-extrabold text-base shadow-xl shadow-amber-950/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span>Armar pedido con carrito</span>
          </button>

          <button
            onClick={() => scrollToSection('promociones')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white font-bold text-base border border-stone-700/80 transition-all cursor-pointer"
          >
            <span>Ver Promos del Día</span>
            <ChevronRight className="w-5 h-5 text-amber-400" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center">
          <button 
            onClick={() => scrollToSection('promociones')} 
            className="text-stone-400 hover:text-amber-400 transition-colors flex flex-col items-center gap-1 cursor-pointer group"
          >
            <span className="text-xs uppercase tracking-wider font-semibold group-hover:text-amber-400">Explorar Menú</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-amber-500" />
          </button>
        </div>
      </div>
    </section>
  );
};
