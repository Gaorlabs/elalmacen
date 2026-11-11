import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product, CategoryInfo, BusinessConfig, Order, OrderStatus } from '../types';

export interface SupabaseCredentials {
  url: string;
  anonKey: string;
}

let supabaseInstance: SupabaseClient | null = null;

export const DEFAULT_SUPABASE_CREDENTIALS: SupabaseCredentials = {
  url: 'https://yhufsgcnhptfyovotxkr.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlodWZzZ2NuaHB0Znlvdm90eGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDM2NjgsImV4cCI6MjA3NTQ3OTY2OH0.M-DPvJ-3Ttkods89Ios7MDQIxvcggi3v-4G05lwQRww'
};

// Helper to get saved credentials, env vars, or default project
export const getSupabaseCredentials = (): SupabaseCredentials => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (envUrl && envKey) {
    return { url: envUrl, anonKey: envKey };
  }

  try {
    const saved = localStorage.getItem('el_almacen_supabase_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    }
  } catch (e) {
    console.error(e);
  }

  return DEFAULT_SUPABASE_CREDENTIALS;
};

// Get or initialize Supabase client
export const getSupabaseClient = (): SupabaseClient | null => {
  if (supabaseInstance) return supabaseInstance;

  const creds = getSupabaseCredentials();
  if (creds && creds.url && creds.anonKey) {
    try {
      supabaseInstance = createClient(creds.url, creds.anonKey, {
        auth: { persistSession: false }
      });
      return supabaseInstance;
    } catch (e) {
      console.error('Failed to init Supabase client:', e);
      return null;
    }
  }

  return null;
};

export const saveSupabaseCredentials = (creds: SupabaseCredentials) => {
  localStorage.setItem('el_almacen_supabase_config', JSON.stringify(creds));
  supabaseInstance = createClient(creds.url, creds.anonKey);
};

export const clearSupabaseCredentials = () => {
  localStorage.removeItem('el_almacen_supabase_config');
  supabaseInstance = null;
};

// 1. PRODUCTS API
export const fetchSupabaseProducts = async (): Promise<Product[] | null> => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
      if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
        // Table not created yet in Supabase
        return null;
      }
      throw error;
    }
    if (!data) return null;

    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      subtitle: item.subtitle || '',
      category: item.category,
      categoryName: item.category_name || 'General',
      price: Number(item.price),
      originalPrice: item.original_price ? Number(item.original_price) : undefined,
      rating: Number(item.rating || 4.9),
      reviewsCount: Number(item.reviews_count || 15),
      image: item.image,
      badge: item.badge || undefined,
      description: item.description || '',
      highlights: Array.isArray(item.highlights) ? item.highlights : [],
      stock: Number(item.stock ?? 10)
    }));
  } catch (e: any) {
    if (e?.code !== 'PGRST205') {
      console.warn('Supabase fetchProducts notice:', e?.message || e);
    }
    return null;
  }
};

export const upsertSupabaseProduct = async (product: Product): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const row = {
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      category: product.category,
      category_name: product.categoryName,
      price: product.price,
      original_price: product.originalPrice || null,
      rating: product.rating,
      reviews_count: product.reviewsCount,
      image: product.image,
      badge: product.badge || null,
      description: product.description,
      highlights: product.highlights || [],
      stock: product.stock
    };

    const { error } = await client.from('products').upsert(row);
    if (error) throw error;
    return true;
  } catch (e) {
    return false;
  }
};

export const deleteSupabaseProduct = async (id: string): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('products').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (e) {
    return false;
  }
};

// 2. CATEGORIES API
export const fetchSupabaseCategories = async (): Promise<CategoryInfo[] | null> => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client.from('categories').select('*').order('created_at', { ascending: true });
    if (error) {
      if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
        return null;
      }
      throw error;
    }
    if (!data) return null;

    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      icon: item.icon || 'Sparkles',
      color: item.color || 'from-pink-500 to-rose-600',
      description: item.description || '',
      image: item.image || ''
    }));
  } catch (e: any) {
    return null;
  }
};

export const upsertSupabaseCategory = async (cat: CategoryInfo): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('categories').upsert({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      color: cat.color,
      description: cat.description,
      image: cat.image
    });
    if (error) throw error;
    return true;
  } catch (e) {
    return false;
  }
};

export const deleteSupabaseCategory = async (id: string): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('categories').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (e) {
    return false;
  }
};

// 3. BUSINESS CONFIG API
export const fetchSupabaseBusinessConfig = async (): Promise<BusinessConfig | null> => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client.from('business_config').select('*').eq('id', 'main').single();
    if (error) {
      if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
        return null;
      }
      throw error;
    }
    if (!data) return null;

    return {
      name: data.name,
      tagline: data.tagline || '',
      whatsappNumber: data.whatsapp_number || '',
      whatsappDisplay: data.whatsapp_display || '',
      supportHours: data.support_hours || '',
      city: data.city || 'Perú',
      logoUrl: data.logo_url || '',
      yapePhone: data.yape_phone || '',
      yapeHolder: data.yape_holder || '',
      bcpAccount: data.bcp_account || '',
      bcpCci: data.bcp_cci || '',
      bcpHolder: data.bcp_holder || ''
    };
  } catch (e) {
    return null;
  }
};

export const upsertSupabaseBusinessConfig = async (config: BusinessConfig): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const row = {
      id: 'main',
      name: config.name,
      tagline: config.tagline,
      whatsapp_number: config.whatsappNumber,
      whatsapp_display: config.whatsappDisplay,
      support_hours: config.supportHours,
      city: config.city,
      logo_url: config.logoUrl,
      yape_phone: config.yapePhone,
      yape_holder: config.yapeHolder,
      bcp_account: config.bcpAccount,
      bcp_cci: config.bcpCci,
      bcp_holder: config.bcpHolder,
      updated_at: new Date().toISOString()
    };

    const { error } = await client.from('business_config').upsert(row);
    if (error) throw error;
    return true;
  } catch (e) {
    return false;
  }
};

// 4. ORDERS API
export const fetchSupabaseOrders = async (): Promise<Order[] | null> => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client.from('orders').select('*').order('created_at', { ascending: false });
    if (error) {
      if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
        return null;
      }
      throw error;
    }
    if (!data) return null;

    return data.map((item: any) => ({
      id: item.id,
      code: item.code,
      createdAt: item.created_at,
      items: item.items || [],
      subtotal: Number(item.subtotal),
      discount: Number(item.discount || 0),
      couponCode: item.coupon_code || undefined,
      total: Number(item.total),
      delivery: item.delivery || {},
      paymentMethod: item.payment_method,
      status: item.status as OrderStatus
    }));
  } catch (e) {
    return null;
  }
};

export const upsertSupabaseOrder = async (order: Order): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const row = {
      id: order.id,
      code: order.code,
      created_at: order.createdAt,
      items: order.items,
      subtotal: order.subtotal,
      discount: order.discount,
      coupon_code: order.couponCode || null,
      total: order.total,
      delivery: order.delivery,
      payment_method: order.paymentMethod,
      status: order.status || 'pendiente'
    };

    const { error } = await client.from('orders').upsert(row);
    if (error) throw error;
    return true;
  } catch (e) {
    return false;
  }
};

export const deleteSupabaseOrder = async (id: string): Promise<boolean> => {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('orders').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (e) {
    return false;
  }
};

// 5. AUTO SEED INITIAL DATA TO SUPABASE IF TABLES ARE READY BUT EMPTY
export const seedInitialSupabaseDataIfEmpty = async (
  initialProducts: Product[],
  initialCategories: CategoryInfo[],
  initialConfig: BusinessConfig
) => {
  const client = getSupabaseClient();
  if (!client) return;

  try {
    // Seed Business Config
    const remoteConfig = await fetchSupabaseBusinessConfig();
    if (!remoteConfig) {
      await upsertSupabaseBusinessConfig(initialConfig);
    }

    // Seed Categories
    const remoteCats = await fetchSupabaseCategories();
    if (remoteCats && remoteCats.length === 0 && initialCategories.length > 0) {
      for (const cat of initialCategories) {
        await upsertSupabaseCategory(cat);
      }
    }

    // Seed Products
    const remoteProds = await fetchSupabaseProducts();
    if (remoteProds && remoteProds.length === 0 && initialProducts.length > 0) {
      for (const prod of initialProducts) {
        await upsertSupabaseProduct(prod);
      }
    }
  } catch (e) {
    // Ignore seed errors if tables don't exist yet
  }
};

// 6. REALTIME SUBSCRIPTION FOR LIVE MULTI-DEVICE SYNC
export const setupSupabaseRealtimeSync = (
  onProductsChange: () => void,
  onCategoriesChange: () => void,
  onConfigChange: () => void,
  onOrdersChange: () => void
) => {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const channel = client
      .channel('public_db_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        onProductsChange();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => {
        onCategoriesChange();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'business_config' }, () => {
        onConfigChange();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        onOrdersChange();
      })
      .subscribe();

    return channel;
  } catch (e) {
    return null;
  }
};

// SQL Setup Script for 1-click copy
export const SUPABASE_SQL_SETUP_SCRIPT = `-- SQL CREACIÓN DE TABLAS - EL ALMACÉN TIENDA VIRTUAL
-- Ejecuta este script en el "SQL Editor" de Supabase en 5 segundos

CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL,
  category_name TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  rating NUMERIC DEFAULT 4.9,
  reviews_count INT DEFAULT 15,
  image TEXT NOT NULL,
  badge TEXT,
  description TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  stock INT DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT DEFAULT 'Sparkles',
  color TEXT DEFAULT 'from-pink-500 to-rose-600',
  description TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.business_config (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT NOT NULL,
  tagline TEXT,
  whatsapp_number TEXT,
  whatsapp_display TEXT,
  support_hours TEXT,
  city TEXT,
  logo_url TEXT,
  yape_phone TEXT,
  yape_holder TEXT,
  bcp_account TEXT,
  bcp_cci TEXT,
  bcp_holder TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  discount NUMERIC DEFAULT 0,
  coupon_code TEXT,
  total NUMERIC NOT NULL,
  delivery JSONB NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'pendiente'
);

-- PERMISOS PÚBLICOS DE LECTURA Y ESCRITURA
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Acceso publico libre products" ON public.products;
CREATE POLICY "Acceso publico libre products" ON public.products FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Acceso publico libre categories" ON public.categories;
CREATE POLICY "Acceso publico libre categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Acceso publico libre config" ON public.business_config;
CREATE POLICY "Acceso publico libre config" ON public.business_config FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Acceso publico libre orders" ON public.orders;
CREATE POLICY "Acceso publico libre orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

-- REALTIME SYNC PARA DISPOSITIVOS MÓVILES
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.business_config;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
`;
