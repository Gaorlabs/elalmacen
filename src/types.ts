export type CategoryId = 
  | 'belleza'
  | 'moda'
  | 'tecnologia'
  | 'juguetes'
  | 'libreria'
  | 'regalos'
  | 'audio'
  | 'celulares'
  | 'mascotas'
  | 'hogar'
  | 'ropa_mujer'
  | 'joyeria';

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
}

export type AppTab = 'inicio' | 'explorar' | 'favoritos';
