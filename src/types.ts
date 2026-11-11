export type CategoryId = string;

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  icon: string;
  color: string;
  description: string;
  image: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  priceModifier?: number; // difference in S/.
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryId;
  categoryName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: 'Más Vendido' | 'Novedad' | 'Oferta Top' | 'K-Beauty' | 'Garantía 100%';
  description: string;
  highlights: string[];
  variants?: ProductVariant[];
  stock: number;
}

export interface CartItem {
  id: string; // unique cart item key (productId + variantId)
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface DistrictDelivery {
  id: string;
  name: string;
  fee: number;
  estimatedTime: string;
}

export interface DeliveryFormData {
  fullName: string;
  phone: string;
  address: string;
  reference?: string;
}

export type PaymentMethodType = 'yape' | 'bcp' | 'plin';

export type OrderStatus = 'pendiente' | 'despachado' | 'completado' | 'cancelado';

export interface Order {
  id: string;
  code: string; // e.g. ALM-9421
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  total: number;
  delivery: DeliveryFormData;
  paymentMethod: PaymentMethodType;
  status?: OrderStatus;
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  supportHours: string;
  city: string;
  logoUrl: string;
  yapePhone: string;
  yapeHolder: string;
  bcpAccount: string;
  bcpCci: string;
  bcpHolder: string;
}

export type AppTab = 'inicio' | 'explorar' | 'favoritos' | 'admin';
