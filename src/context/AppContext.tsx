import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ProductVariant,
  CartItem,
  Order,
  AppTab,
  CategoryId,
  DeliveryFormData,
  PaymentMethodType
} from '../types';
import { DISCOUNT_COUPONS, BUSINESS_CONFIG, PAYMENT_ACCOUNTS } from '../data/shipping';
import confetti from 'canvas-confetti';

interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Navigation
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;

  // Catalog & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryId | 'todos';
  setSelectedCategory: (cat: CategoryId | 'todos') => void;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string, variantId?: string) => number;
  cartSubtotal: number;
  cartCount: number;

  // Delivery info
  deliveryData: DeliveryFormData;
  updateDeliveryData: (data: Partial<DeliveryFormData>) => void;

  // Coupon
  couponCode: string;
  couponError: string;
  discountAmount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Final Total
  grandTotal: number;

  // Modals & Drawers
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Order Placement & WhatsApp
  placeOrder: (paymentMethod: PaymentMethodType) => Order;
  sendOrderToWhatsApp: (order: Order) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('el_almacen_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('el_almacen_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('el_almacen_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Splash / Portal screen state (true by default so the Portal is shown first as requested)
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<AppTab>('inicio');

  // Search & Categories
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'todos'>('todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openProductDetail = (prod: Product) => setSelectedProduct(prod);
  const closeProductDetail = () => setSelectedProduct(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('el_almacen_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('el_almacen_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Delivery data (Nombre, Teléfono, Dirección, Referencia)
  const [deliveryData, setDeliveryData] = useState<DeliveryFormData>(() => {
    try {
      const saved = localStorage.getItem('el_almacen_delivery');
      return saved ? JSON.parse(saved) : {
        fullName: '',
        phone: '',
        address: '',
        reference: ''
      };
    } catch {
      return {
        fullName: '',
        phone: '',
        address: '',
        reference: ''
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('el_almacen_delivery', JSON.stringify(deliveryData));
    } catch (e) {
      console.error(e);
    }
  }, [deliveryData]);

  const updateDeliveryData = (data: Partial<DeliveryFormData>) => {
    setDeliveryData(prev => ({ ...prev, ...data }));
  };

  // Coupon
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponError, setCouponError] = useState<string>('');

  // Modals & Drawers
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const openCheckout = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('el_almacen_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('el_almacen_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Producto quitado de favoritos', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('¡Guardado en favoritos! ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  // Toast
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  // Cart operations
  const addToCart = (product: Product, variant?: ProductVariant, quantity = 1) => {
    const itemKey = variant ? `${product.id}-${variant.id}` : product.id;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemKey);
      if (existing) {
        return prev.map(item =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          selectedVariant: variant,
          quantity
        }
      ];
    });

    showToast(`Agregaste ${quantity}x ${product.name.slice(0, 26)}...`, 'success');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Producto eliminado del carrito', 'info');
  };

  const clearCart = () => setCart([]);

  const getItemQuantity = (productId: string, variantId?: string): number => {
    const itemKey = variantId ? `${productId}-${variantId}` : productId;
    const found = cart.find(item => item.id === itemKey);
    return found ? found.quantity : 0;
  };

  const cartSubtotal = cart.reduce((acc, item) => {
    const variantPrice = item.selectedVariant?.priceModifier || 0;
    return acc + (item.product.price + variantPrice) * item.quantity;
  }, 0);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Apply Coupon
  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setCouponError('Ingresa un código de cupón');
      return false;
    }
    const match = DISCOUNT_COUPONS[clean];
    if (match) {
      setCouponCode(clean);
      setCouponError('');
      showToast(`¡Cupón ${clean} activado con éxito!`, 'success');
      return true;
    } else {
      setCouponError('Cupón inválido (Prueba ALMACEN10)');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponError('');
    showToast('Cupón removido', 'info');
  };

  const couponMeta = couponCode ? DISCOUNT_COUPONS[couponCode] : null;
  let discountAmount = 0;
  if (couponMeta) {
    if (couponMeta.type === 'percent') {
      discountAmount = (cartSubtotal * couponMeta.value) / 100;
    } else if (couponMeta.type === 'fixed') {
      discountAmount = Math.min(cartSubtotal, couponMeta.value);
    }
  }

  // Pure product total (No added shipping or tip fees!)
  const grandTotal = Math.max(0, cartSubtotal - discountAmount);

  // Place Order & WhatsApp flow
  const placeOrder = (paymentMethod: PaymentMethodType = 'yape'): Order => {
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const code = `ALM-${orderNumber}`;

    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 11),
      code,
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      couponCode: couponCode || undefined,
      total: grandTotal,
      delivery: { ...deliveryData },
      paymentMethod
    };

    clearCart();
    setCouponCode('');
    closeCheckout();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log(e);
    }

    sendOrderToWhatsApp(newOrder);
    showToast('¡Pedido generado! Abriendo WhatsApp...', 'success');
    return newOrder;
  };

  const sendOrderToWhatsApp = (order: Order) => {
    const itemsList = order.items
      .map((item, idx) => {
        const variantText = item.selectedVariant ? ` (${item.selectedVariant.name})` : '';
        const itemTotal = ((item.product.price + (item.selectedVariant?.priceModifier || 0)) * item.quantity).toFixed(2);
        return `   ${idx + 1}. *${item.quantity}x* ${item.product.name}${variantText} -> S/ ${itemTotal}`;
      })
      .join('\n');

    const message = 
`👋 *¡HOLA EL ALMACÉN! DESEO CONFIRMAR MI PEDIDO* 🛍️
━━━━━━━━━━━━━━━━━━━━
📦 *N° DE PEDIDO:* #${order.code}
📅 *Fecha:* ${new Date(order.createdAt).toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}

👤 *DATOS PARA LA ENTREGA:*
• *Nombre:* ${order.delivery.fullName || 'Cliente'}
• *Teléfono / WhatsApp:* ${order.delivery.phone || 'No especificado'}
• *Dirección:* ${order.delivery.address || 'No especificada'}
${order.delivery.reference ? `• *Referencia:* ${order.delivery.reference}\n` : ''}
🛒 *PRODUCTOS ESCOGIDOS:*
${itemsList}

━━━━━━━━━━━━━━━━━━━━
💰 *TOTAL A PAGAR: S/ ${order.total.toFixed(2)}*
${order.discount > 0 ? `(Descuento aplicado: -S/ ${order.discount.toFixed(2)})\n` : ''}
💳 *MÉTODO DE PAGO:* Yape al número *${PAYMENT_ACCOUNTS.yape.phoneFormatted}*
📲 *En breve realizaré el pago por Yape y enviaré la captura de mi comprobante por este chat.*
━━━━━━━━━━━━━━━━━━━━
✨ _Pedido realizado desde el Catálogo de El Almacén - Todo en solo lugar._`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encoded}`;
    
    // Open WhatsApp directly
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        showSplash,
        setShowSplash,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        cartSubtotal,
        cartCount,
        deliveryData,
        updateDeliveryData,
        couponCode,
        couponError,
        discountAmount,
        applyCoupon,
        removeCoupon,
        grandTotal,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        favorites,
        toggleFavorite,
        isFavorite,
        placeOrder,
        sendOrderToWhatsApp,
        toasts,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
