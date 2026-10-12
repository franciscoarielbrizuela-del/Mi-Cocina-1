import React from 'react';
import { BUSINESS_INFO } from '../data/menuData';
import { Phone, MessageCircle, Clock, Truck, Flame, Heart, AlertTriangle } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-300 pt-16 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-stone-950 shadow-md">
                <Flame className="w-6 h-6 text-stone-950" />
              </div>
              <div>
                <span className="font-display text-2xl font-black tracking-wider text-white block leading-none">
                  MI COCINA
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                  ROTISERÍA • {BUSINESS_INFO.subtitle}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Las mejores pizzas a la parrilla, sándwiches gigantes y comida casera elaborada al momento con dedicación para tu mesa.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navegación</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('hero')} className="hover:text-amber-400 transition-colors">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('promociones')} className="hover:text-amber-400 transition-colors">
                  Promociones del Día
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('menu')} className="hover:text-amber-400 transition-colors">
                  Menú Completo
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contacto')} className="hover:text-amber-400 transition-colors">
                  Contacto y Pedidos
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Atención & Envíos</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Tel: {BUSINESS_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: {BUSINESS_INFO.whatsappNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <Clock className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Delivery: {BUSINESS_INFO.deliveryHours}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Costo de envío: ${BUSINESS_INFO.deliveryCost.toLocaleString('es-AR')}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Redes & Pedido Rápido */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Pedir Ahora</h4>
            <p className="text-xs text-stone-400">
              Tomamos tu pedido al instante a través de WhatsApp.
            </p>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Abrir WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Required Flyers & Price Notice in prompt */}
        <div className="pt-8 border-t border-stone-800/80">
          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-center max-w-3xl mx-auto mb-6">
            <div className="flex items-center justify-center gap-2 text-amber-400 font-bold text-xs uppercase mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>Aviso Importante</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 italic">
              "{BUSINESS_INFO.legalNotice}"
            </p>
          </div>

          <div className="text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} {BUSINESS_INFO.name}. Todos los derechos reservados.</span>
            <span className="hidden sm:inline">•</span>
            <span>Hecho con dedicación para los mejores momentos en familia.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
