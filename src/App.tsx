import React, { useState, useEffect } from 'react';
import { CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PromotionsSection } from './components/PromotionsSection';
import { MenuSection } from './components/MenuSection';
import { ContactSection } from './components/ContactSection';
import { OrderDrawer } from './components/OrderDrawer';
import { FloatingButtons } from './components/FloatingButtons';
import { Footer } from './components/Footer';

const CART_STORAGE_KEY = 'mi_cocina_rotiseria_cart';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Could not save cart', e);
    }
  }, [cartItems]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  // Add item to cart
  const handleAddToCart = (item: {
    id: string;
    title: string;
    unitPrice: number;
    category: string;
    notes?: string;
  }) => {
    setCartItems((prev) => {
      // Check if exact item and same notes exist
      const existingIndex = prev.findIndex(
        (i) => i.id === item.id && (i.notes || '') === (item.notes || '')
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: item.id,
            title: item.title,
            unitPrice: item.unitPrice,
            quantity: 1,
            category: item.category,
            notes: item.notes,
          },
        ];
      }
    });

    showToast(`¡Agregaste "${item.title}" a tu pedido!`);
  };

  // Update quantity (+1 or -1)
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove single item
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Total calculations
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalAmount = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-amber-500 text-stone-950 font-bold px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm animate-in fade-in slide-in-from-top duration-200 border-2 border-stone-950">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        totalItems={totalItemsCount}
        cartTotal={cartTotalAmount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenCart={() => setIsCartOpen(true)} />

        {/* Highlighted Promotions */}
        <PromotionsSection onAddToCart={handleAddToCart} />

        {/* Complete Menu with Categories & Search */}
        <MenuSection
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
        />

        {/* Contact, Delivery info, WhatsApp CTA */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Order & Delivery Management Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Persistent Floating WhatsApp & Cart Buttons */}
      <FloatingButtons
        totalItems={totalItemsCount}
        cartTotal={cartTotalAmount}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
