import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ProductVariant,
  CartItem,
  Order,
  OrderStatus,
  AppTab,
  CategoryId,
  CategoryInfo,
  DeliveryFormData,
  PaymentMethodType,
  BusinessConfig
} from '../types';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { DISCOUNT_COUPONS, BUSINESS_CONFIG, PAYMENT_ACCOUNTS } from '../data/shipping';
import confetti from 'canvas-confetti';
import {
  getSupabaseCredentials,
  fetchSupabaseProducts,
  upsertSupabaseProduct,
  deleteSupabaseProduct,
  fetchSupabaseCategories,
  upsertSupabaseCategory,
  deleteSupabaseCategory,
  fetchSupabaseBusinessConfig,
  upsertSupabaseBusinessConfig,
  fetchSupabaseOrders,
  upsertSupabaseOrder,
  deleteSupabaseOrder,
  setupSupabaseRealtimeSync
} from '../services/supabase';

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

  // Catalog & Products (Dynamic for Admin)
  products: Product[];
  addProduct: (productData: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStock: (id: string) => void;
  resetCatalogToDefaults: () => void;

  // Categories (Dynamic for Admin)
  categories: CategoryInfo[];
  addCategory: (catData: Omit<CategoryInfo, 'id'>) => CategoryInfo;
  updateCategory: (id: string, updated: Partial<CategoryInfo>) => void;
  deleteCategory: (id: string) => void;
  resetCategoriesToDefaults: () => void;

  // Business & Store Config (Dynamic for Admin)
  businessConfig: BusinessConfig;
  updateBusinessConfig: (newConfig: Partial<BusinessConfig>) => void;

  // Catalog Filters
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

  // Admin Auth & State
  isAdminUnlocked: boolean;
  isAdminModalOpen: boolean;
  adminPin: string;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  unlockAdmin: (pinInput: string) => boolean;
  lockAdmin: () => void;
  updateAdminPin: (newPin: string) => void;

  // Orders Log (Admin)
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Order Placement & WhatsApp
  placeOrder: (paymentMethod: PaymentMethodType) => Order;
  sendOrderToWhatsApp: (order: Order) => void;

  // Supabase Realtime Cloud Sync
  isSupabaseConnected: boolean;
  reloadFromSupabase: () => Promise<void>;

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

  // Splash / Portal screen state
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<AppTab>('inicio');

  // Dynamic Products State (Persisted in localStorage)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('el_almacen_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('el_almacen_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Dynamic Categories State (Persisted in localStorage)
  const [categories, setCategories] = useState<CategoryInfo[]>(() => {
    try {
      const saved = localStorage.getItem('el_almacen_categories');
      return saved ? JSON.parse(saved) : CATEGORIES;
    } catch {
      return CATEGORIES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('el_almacen_categories', JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  // Dynamic Business Config State
  const [businessConfig, setBusinessConfig] = useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem('el_almacen_config');
      return saved ? JSON.parse(saved) : BUSINESS_CONFIG;
    } catch {
      return BUSINESS_CONFIG;
    }
  });

  // Supabase Realtime Sync State
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);

  const reloadFromSupabase = async () => {
    const creds = getSupabaseCredentials();
    if (!creds) {
      setIsSupabaseConnected(false);
      return;
    }

    setIsSupabaseConnected(true);

    const [remoteProds, remoteCats, remoteConfig, remoteOrders] = await Promise.all([
      fetchSupabaseProducts(),
      fetchSupabaseCategories(),
      fetchSupabaseBusinessConfig(),
      fetchSupabaseOrders()
    ]);

    if (remoteProds && remoteProds.length > 0) setProducts(remoteProds);
    if (remoteCats && remoteCats.length > 0) setCategories(remoteCats);
    if (remoteConfig) setBusinessConfig(remoteConfig);
    if (remoteOrders) setOrders(remoteOrders);
  };

  useEffect(() => {
    reloadFromSupabase();

    const channel = setupSupabaseRealtimeSync(
      async () => {
        const prods = await fetchSupabaseProducts();
        if (prods) setProducts(prods);
      },
      async () => {
        const cats = await fetchSupabaseCategories();
        if (cats) setCategories(cats);
      },
      async () => {
        const cfg = await fetchSupabaseBusinessConfig();
        if (cfg) setBusinessConfig(cfg);
      },
      async () => {
        const ords = await fetchSupabaseOrders();
        if (ords) setOrders(ords);
      }
    );

    return () => {
      if (channel) channel.unsubscribe();
    };
  }, []);

  const addCategory = (catData: Omit<CategoryInfo, 'id'>): CategoryInfo => {
    const id = catData.name.toLowerCase().replace(/[^a-z0-9]/g, '_') || `cat_${Date.now()}`;
    const newCat: CategoryInfo = { id, ...catData };
    setCategories(prev => [...prev, newCat]);
    upsertSupabaseCategory(newCat);
    return newCat;
  };

  const updateCategory = (id: string, updated: Partial<CategoryInfo>) => {
    setCategories(prev =>
      prev.map(c => {
        if (c.id === id) {
          const nextCat = { ...c, ...updated };
          upsertSupabaseCategory(nextCat);
          return nextCat;
        }
        return c;
      })
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    deleteSupabaseCategory(id);
  };

  const resetCategoriesToDefaults = () => {
    setCategories(CATEGORIES);
    localStorage.removeItem('el_almacen_categories');
  };

  useEffect(() => {
    try {
      localStorage.setItem('el_almacen_config', JSON.stringify(businessConfig));
    } catch (e) {
      console.error(e);
    }
  }, [businessConfig]);

  const updateBusinessConfig = (newConfig: Partial<BusinessConfig>) => {
    setBusinessConfig(prev => {
      const merged = { ...prev, ...newConfig };
      upsertSupabaseBusinessConfig(merged);
      return merged;
    });
  };

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const id = `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newProd: Product = { id, ...productData };
    setProducts(prev => [newProd, ...prev]);
    upsertSupabaseProduct(newProd);
    return newProd;
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextProd = { ...p, ...updated };
          upsertSupabaseProduct(nextProd);
          return nextProd;
        }
        return p;
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    deleteSupabaseProduct(id);
  };

  const toggleProductStock = (id: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextProd = { ...p, stock: p.stock > 0 ? 0 : 10 };
          upsertSupabaseProduct(nextProd);
          return nextProd;
        }
        return p;
      })
    );
  };

  const resetCatalogToDefaults = () => {
    setProducts(PRODUCTS);
    localStorage.removeItem('el_almacen_products');
  };

  // Admin Auth State
  const [adminPin, setAdminPin] = useState<string>(() => {
    const saved = localStorage.getItem('el_almacen_admin_pin');
    if (!saved || saved === '1234') {
      localStorage.setItem('el_almacen_admin_pin', 'almacen26');
      return 'almacen26';
    }
    return saved;
  });

  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('el_almacen_admin_unlocked') === 'true';
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  const openAdminModal = () => {
    if (isAdminUnlocked) {
      setActiveTab('admin');
      setShowSplash(false);
    } else {
      setIsAdminModalOpen(true);
    }
  };

  const closeAdminModal = () => setIsAdminModalOpen(false);

  const unlockAdmin = (pinInput: string): boolean => {
    if (pinInput.trim() === adminPin) {
      setIsAdminUnlocked(true);
      sessionStorage.setItem('el_almacen_admin_unlocked', 'true');
      setIsAdminModalOpen(false);
      setActiveTab('admin');
      setShowSplash(false);
      showToast('¡Acceso concedido al Panel de Administración!', 'success');
      return true;
    }
    return false;
  };

  const lockAdmin = () => {
    setIsAdminUnlocked(false);
    sessionStorage.removeItem('el_almacen_admin_unlocked');
    setActiveTab('inicio');
    showToast('Sesión administrativa cerrada', 'info');
  };

  const updateAdminPin = (newPin: string) => {
    if (newPin && newPin.length >= 4) {
      setAdminPin(newPin);
      localStorage.setItem('el_almacen_admin_pin', newPin);
    }
  };

  // Orders Log (Admin)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('el_almacen_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('el_almacen_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          const updated = { ...o, status };
          upsertSupabaseOrder(updated);
          return updated;
        }
        return o;
      })
    );
    showToast(`Estado del pedido cambiado a ${status}`, 'info');
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    deleteSupabaseOrder(orderId);
  };

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

  // Delivery data
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

  const grandTotal = Math.max(0, cartSubtotal - discountAmount);

  // Place Order & Save in Orders state
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
      paymentMethod,
      status: 'pendiente'
    };

    setOrders(prev => [newOrder, ...prev]);
    upsertSupabaseOrder(newOrder);

    clearCart();
    setCouponCode('');
    closeCheckout();

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
`👋 *¡HOLA ${businessConfig.name.toUpperCase()}! DESEO CONFIRMAR MI PEDIDO* 🛍️
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
💳 *MÉTODO DE PAGO:* Yape al número *${businessConfig.whatsappDisplay}*
📲 *En breve realizaré el pago por Yape y enviaré la captura de mi comprobante por este chat.*
━━━━━━━━━━━━━━━━━━━━
✨ _Pedido realizado desde el Catálogo de ${businessConfig.name} - ${businessConfig.tagline}._`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${businessConfig.whatsappNumber}?text=${encoded}`;
    
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
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        resetCatalogToDefaults,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        resetCategoriesToDefaults,
        businessConfig,
        updateBusinessConfig,
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
        isAdminUnlocked,
        isAdminModalOpen,
        adminPin,
        openAdminModal,
        closeAdminModal,
        unlockAdmin,
        lockAdmin,
        updateAdminPin,
        orders,
        updateOrderStatus,
        deleteOrder,
        favorites,
        toggleFavorite,
        isFavorite,
        placeOrder,
        sendOrderToWhatsApp,
        isSupabaseConnected,
        reloadFromSupabase,
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
