import React, { useState, useMemo } from 'react';
import { CATEGORIES, MENU_ITEMS, formatCurrency } from '../data/menuData';
import { MenuItem, MenuCategoryKey, CartItem } from '../types';
import { Search, Plus, Minus, Check, Flame, Sparkles, Filter, Info } from 'lucide-react';

interface MenuSectionProps {
  cartItems: CartItem[];
  onAddToCart: (item: { id: string; title: string; unitPrice: number; category: string; notes?: string }) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryKey | 'todas'>('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItemForNotes, setSelectedItemForNotes] = useState<MenuItem | null>(null);
  const [customNote, setCustomNote] = useState('');

  // Cart quantity lookup helper
  const cartItemMap = useMemo(() => {
    const map = new Map<string, number>();
    cartItems.forEach(item => {
      map.set(item.id, (map.get(item.id) || 0) + item.quantity);
    });
    return map;
  }, [cartItems]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'todas' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleQuickAdd = (item: MenuItem) => {
    // If it's empanada docena/media docena or torpedo a eleccion, let user customize if they want, or add directly
    onAddToCart({
      id: item.id,
      title: item.name,
      unitPrice: item.price,
      category: item.category
    });
  };

  const handleConfirmNotes = () => {
    if (!selectedItemForNotes) return;
    onAddToCart({
      id: selectedItemForNotes.id,
      title: selectedItemForNotes.name,
      unitPrice: selectedItemForNotes.price,
      category: selectedItemForNotes.category,
      notes: customNote.trim() ? customNote.trim() : undefined
    });
    setSelectedItemForNotes(null);
    setCustomNote('');
  };

  return (
    <section id="menu" className="py-20 bg-stone-950 text-stone-100">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <span>Variedad Casera & Recién Hecho</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            NUESTRO MENÚ COMPLETO
          </h2>
          <p className="text-stone-300 text-base md:text-lg mt-2">
            Preparado al momento con ingredientes frescos de primera calidad. Elegí tus platos y armá tu pedido.
          </p>
        </div>

        {/* Search Bar & Fast Filter */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por plato (ej. Carlitos, Muzza, Torpedo, Papas)..."
              className="w-full pl-12 pr-10 py-3.5 bg-stone-900 border border-stone-800 rounded-2xl text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm transition-all shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs (Scrollable on mobile) */}
        <div className="mb-10 overflow-x-auto pb-3 scrollbar-thin">
          <div className="flex items-center gap-2 min-w-max mx-auto justify-start md:justify-center px-2">
            <button
              onClick={() => setSelectedCategory('todas')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                selectedCategory === 'todas'
                  ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-950/40'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-100 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <span>🍽️</span>
              <span>Todo el Menú</span>
            </button>

            {CATEGORIES.filter(c => c.key !== 'promos').map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-950/40'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-100 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter if searching */}
        {searchTerm && (
          <div className="text-center text-xs text-stone-400 mb-6">
            Encontrados {filteredItems.length} resultado(s) para "{searchTerm}"
          </div>
        )}

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-stone-900/40 rounded-3xl border border-stone-800 max-w-md mx-auto">
            <p className="text-stone-400 text-base mb-3">No encontramos platos que coincidan con tu búsqueda.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('todas'); }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
            >
              Ver todos los platos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => {
              const currentQty = cartItemMap.get(item.id) || 0;

              return (
                <div
                  key={item.id}
                  className="bg-stone-900/90 hover:bg-stone-900 border border-stone-800/80 hover:border-stone-700 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl group"
                >
                  <div>
                    {/* Item header: tags and portions */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.portions && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-stone-800 text-amber-300 border border-stone-700">
                            {item.portions}
                          </span>
                        )}
                        {item.tag && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/50 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            {item.tag}
                          </span>
                        )}
                      </div>

                      {item.popular && (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-400" />
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Item Name */}
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug mb-1.5">
                      {item.name}
                    </h3>

                    {/* Item Description */}
                    {item.description && (
                      <p className="text-xs sm:text-sm text-stone-400 leading-relaxed mb-4 line-clamp-3">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Price & Cart Actions */}
                  <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-3 mt-auto">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Precio</span>
                      <span className="font-display text-2xl sm:text-3xl font-black text-amber-400">
                        {formatCurrency(item.price)}
                      </span>
                    </div>

                    {/* Interactive Quantity / Add button */}
                    {currentQty > 0 ? (
                      <div className="flex items-center gap-2 bg-stone-800 rounded-xl p-1 border border-stone-700">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-lg bg-stone-700 hover:bg-stone-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Restar una unidad"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center font-black text-amber-400 text-sm">
                          {currentQty}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center transition-colors font-bold cursor-pointer"
                          aria-label="Sumar una unidad"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        {/* Custom note button if it's empanada or torpedo */}
                        {(item.category === 'empanadas' || item.name.includes('Torpedo') || item.name.includes('Pizzanesa')) && (
                          <button
                            onClick={() => {
                              setSelectedItemForNotes(item);
                              setCustomNote('');
                            }}
                            title="Aclarar gustos o preparación"
                            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 text-xs font-semibold cursor-pointer"
                          >
                            <Info className="w-4 h-4 text-amber-400" />
                          </button>
                        )}

                        <button
                          onClick={() => handleQuickAdd(item)}
                          className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-amber-950/40 cursor-pointer active:scale-95"
                        >
                          <Plus className="w-4 h-4 stroke-[3]" />
                          <span>Agregar</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for Custom Item Notes (Gustos de empanadas, etc.) */}
        {selectedItemForNotes && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-stone-900 border border-stone-700 rounded-3xl max-w-md w-full p-6 text-stone-100 shadow-2xl animate-in zoom-in-95 duration-200">
              <h3 className="font-display text-2xl font-bold text-white mb-1">
                Personalizar: {selectedItemForNotes.name}
              </h3>
              <p className="text-xs text-stone-400 mb-4">
                Aclaración especial para la cocina (gustos de empanadas, elección de carne o pollo, punto de cocción, etc.):
              </p>

              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Ejemplo: 4 de carne suave, 4 de jamón y queso, 4 de pollo..."
                rows={3}
                className="w-full p-3 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500 mb-4"
                autoFocus
              />

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedItemForNotes(null)}
                  className="flex-1 py-2.5 rounded-xl bg-stone-800 text-stone-300 hover:text-white text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmNotes}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold"
                >
                  Agregar con Nota
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
