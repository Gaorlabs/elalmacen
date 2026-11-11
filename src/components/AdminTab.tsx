import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, CategoryId, CategoryInfo, OrderStatus, BusinessConfig } from '../types';
import {
  Package,
  Building2,
  ShoppingBag,
  Tag,
  Plus,
  Search,
  Edit,
  Trash2,
  ShieldCheck,
  Lock,
  RotateCcw,
  ExternalLink,
  Save,
  MessageSquare,
  Sparkles,
  Phone,
  CreditCard,
  Image as ImageIcon,
  KeyRound,
  X,
  Layers,
  Palette,
  Database,
  Copy,
  Check,
  Globe2,
  RefreshCw,
  Upload,
  Camera
} from 'lucide-react';
import {
  getSupabaseCredentials,
  saveSupabaseCredentials,
  clearSupabaseCredentials,
  SUPABASE_SQL_SETUP_SCRIPT
} from '../services/supabase';

const SAMPLE_IMAGE_PRESETS = [
  { name: 'Cosméticos / Skincare', url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80' },
  { name: 'Tecnología / Audífonos', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80' },
  { name: 'Morral / Bolso', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80' },
  { name: 'Juguetes / Peluches', url: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80' },
  { name: 'Librería / Kawaii', url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80' },
  { name: 'Funda / Celular', url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80' },
  { name: 'Joyas / Relojes', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80' }
];

const COLOR_GRADIENT_OPTIONS = [
  { label: 'Rosa / Coral', value: 'from-pink-500 to-rose-600' },
  { label: 'Azul / Cian', value: 'from-blue-600 to-cyan-600' },
  { label: 'Violeta / Púrpura', value: 'from-violet-600 to-purple-600' },
  { label: 'Ámbar / Naranja', value: 'from-amber-500 to-orange-600' },
  { label: 'Esmeralda / Verde', value: 'from-emerald-500 to-teal-600' },
  { label: 'Índigo / Azul', value: 'from-indigo-500 to-blue-600' },
  { label: 'Rojo / Rosado', value: 'from-red-500 to-rose-500' }
];

export const AdminTab: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetCatalogToDefaults,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    resetCategoriesToDefaults,
    businessConfig,
    updateBusinessConfig,
    orders,
    updateOrderStatus,
    deleteOrder,
    lockAdmin,
    adminPin,
    updateAdminPin,
    setActiveTab,
    setShowSplash,
    showToast,
    isSupabaseConnected,
    reloadFromSupabase
  } = useApp();

  const [adminSubTab, setAdminSubTab] = useState<'productos' | 'categorias' | 'empresa' | 'pedidos'>('productos');

  // Supabase Configuration Form State
  const initialSupabaseCreds = getSupabaseCredentials();
  const [supabaseUrlInput, setSupabaseUrlInput] = useState(initialSupabaseCreds?.url || '');
  const [supabaseAnonKeyInput, setSupabaseAnonKeyInput] = useState(initialSupabaseCreds?.anonKey || '');
  const [isCopiedSql, setIsCopiedSql] = useState(false);
  
  // Product Search & Filter
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<CategoryId | 'todos'>('todos');

  // Product Form Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [productFormData, setProductFormData] = useState({
    name: '',
    subtitle: '',
    category: (categories[0]?.id || 'belleza') as CategoryId,
    price: '',
    originalPrice: '',
    stock: '10',
    badge: '' as '' | 'Más Vendido' | 'Novedad' | 'Oferta Top' | 'K-Beauty' | 'Garantía 100%',
    image: '',
    description: '',
    highlights: ''
  });

  // Category Form Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryInfo | null>(null);

  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    description: '',
    icon: 'Sparkles',
    color: COLOR_GRADIENT_OPTIONS[0].value,
    image: SAMPLE_IMAGE_PRESETS[0].url
  });

  // Business Config Form State
  const [companyForm, setCompanyForm] = useState<BusinessConfig>({ ...businessConfig });
  const [newPinInput, setNewPinInput] = useState('');

  // Helper to handle image file upload from mobile camera or gallery
  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('La foto es demasiado grande. Elige una menor a 10MB.', 'warning');
      return;
    }

    showToast('Procesando foto de galería...', 'info');

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress image via HTML5 canvas for high performance on mobile
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_DIM = 800;

        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          onComplete(compressedDataUrl);
          showToast('¡Foto lista y optimizada!', 'success');
        } else {
          onComplete(event.target?.result as string);
          showToast('¡Foto cargada!', 'success');
        }
      };
      img.onerror = () => {
        showToast('No se pudo leer la imagen seleccionada', 'warning');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Product modal handlers
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductFormData({
      name: '',
      subtitle: '',
      category: categories[0]?.id || 'belleza',
      price: '',
      originalPrice: '',
      stock: '15',
      badge: 'Novedad',
      image: SAMPLE_IMAGE_PRESETS[0].url,
      description: '',
      highlights: 'Garantía oficial\nEnvío rápido a todo el Perú'
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductFormData({
      name: prod.name,
      subtitle: prod.subtitle || '',
      category: prod.category,
      price: prod.price.toString(),
      originalPrice: prod.originalPrice ? prod.originalPrice.toString() : '',
      stock: prod.stock.toString(),
      badge: prod.badge || '',
      image: prod.image,
      description: prod.description || '',
      highlights: (prod.highlights || []).join('\n')
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.name.trim() || !productFormData.price.trim() || !productFormData.image.trim()) {
      showToast('Complete el nombre, precio e imagen del producto', 'warning');
      return;
    }

    const categoryObj = categories.find(c => c.id === productFormData.category);
    const categoryName = categoryObj ? categoryObj.name : 'Varios';
    const numPrice = parseFloat(productFormData.price) || 0;
    const numOrigPrice = productFormData.originalPrice ? parseFloat(productFormData.originalPrice) : undefined;
    const numStock = parseInt(productFormData.stock, 10) || 0;

    const highlightsArray = productFormData.highlights
      .split('\n')
      .map(h => h.trim())
      .filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: productFormData.name.trim(),
        subtitle: productFormData.subtitle.trim() || 'Edición especial El Almacén',
        category: productFormData.category,
        categoryName,
        price: numPrice,
        originalPrice: numOrigPrice,
        stock: numStock,
        badge: productFormData.badge || undefined,
        image: productFormData.image.trim(),
        description: productFormData.description.trim() || `${productFormData.name} con garantía de El Almacén.`,
        highlights: highlightsArray.length ? highlightsArray : ['Garantía 100%', 'Calidad comprobada']
      });
      showToast('¡Producto actualizado exitosamente!', 'success');
    } else {
      addProduct({
        name: productFormData.name.trim(),
        subtitle: productFormData.subtitle.trim() || 'Nuevo ingreso El Almacén',
        category: productFormData.category,
        categoryName,
        price: numPrice,
        originalPrice: numOrigPrice,
        rating: 4.9,
        reviewsCount: Math.floor(Math.random() * 50) + 12,
        stock: numStock,
        badge: productFormData.badge || 'Novedad',
        image: productFormData.image.trim(),
        description: productFormData.description.trim() || `${productFormData.name} - Novedad en El Almacén.`,
        highlights: highlightsArray.length ? highlightsArray : ['Garantía El Almacén', 'Envío inmediato']
      });
      showToast('¡Nuevo producto añadido al catálogo!', 'success');
    }

    setIsProductModalOpen(false);
  };

  // Category modal handlers
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryFormData({
      name: '',
      description: '',
      icon: 'Sparkles',
      color: COLOR_GRADIENT_OPTIONS[0].value,
      image: SAMPLE_IMAGE_PRESETS[0].url
    });
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat: CategoryInfo) => {
    setEditingCategory(cat);
    setCategoryFormData({
      name: cat.name,
      description: cat.description || '',
      icon: cat.icon || 'Sparkles',
      color: cat.color || COLOR_GRADIENT_OPTIONS[0].value,
      image: cat.image || SAMPLE_IMAGE_PRESETS[0].url
    });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryFormData.name.trim()) {
      showToast('Por favor ingrese el nombre de la categoría', 'warning');
      return;
    }

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: categoryFormData.name.trim(),
        description: categoryFormData.description.trim() || 'Productos seleccionados',
        icon: categoryFormData.icon,
        color: categoryFormData.color,
        image: categoryFormData.image.trim()
      });
      showToast('¡Categoría actualizada exitosamente!', 'success');
    } else {
      addCategory({
        name: categoryFormData.name.trim(),
        description: categoryFormData.description.trim() || 'Productos de calidad',
        icon: categoryFormData.icon,
        color: categoryFormData.color,
        image: categoryFormData.image.trim() || SAMPLE_IMAGE_PRESETS[0].url
      });
      showToast('¡Nueva categoría creada!', 'success');
    }

    setIsCategoryModalOpen(false);
  };

  // Save Business Config
  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessConfig(companyForm);
    if (newPinInput.trim()) {
      if (newPinInput.trim().length >= 4) {
        updateAdminPin(newPinInput.trim());
        showToast('¡Configuración de empresa y nuevo PIN guardados!', 'success');
        setNewPinInput('');
      } else {
        showToast('El PIN debe tener al menos 4 dígitos', 'warning');
      }
    } else {
      showToast('¡Configuración de empresa guardada!', 'success');
    }
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.categoryName.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'todos' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-5 pb-20 select-none animate-fadeIn">
      {/* Admin Top Header Card */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-neutral-900 to-slate-900 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#FA436B] to-[#FA7088] text-white shadow-md">
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                  Panel de Administración
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
                  🟢 Activo
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Gestión en tiempo real de {businessConfig.name} adaptada a tu móvil
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setShowSplash(false);
                setActiveTab('inicio');
              }}
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Tienda</span>
            </button>

            <button
              onClick={lockAdmin}
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Salir Admin</span>
            </button>
          </div>
        </div>

        {/* 4 Mobile Nav Sub-Tabs */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
          <button
            onClick={() => setAdminSubTab('productos')}
            className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              adminSubTab === 'productos'
                ? 'bg-[#FA436B] text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Productos ({products.length})</span>
          </button>

          <button
            onClick={() => setAdminSubTab('categorias')}
            className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              adminSubTab === 'categorias'
                ? 'bg-[#FA436B] text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Categorías ({categories.length})</span>
          </button>

          <button
            onClick={() => setAdminSubTab('empresa')}
            className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              adminSubTab === 'empresa'
                ? 'bg-[#FA436B] text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Empresa</span>
          </button>

          <button
            onClick={() => setAdminSubTab('pedidos')}
            className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              adminSubTab === 'pedidos'
                ? 'bg-[#FA436B] text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Ventas ({orders.length})</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: PRODUCTOS / CATÁLOGO */}
      {adminSubTab === 'productos' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenAddProduct}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FA436B] via-[#FF5876] to-[#FA7088] text-white font-black text-xs sm:text-sm uppercase tracking-wide shadow-lg shadow-[#FA436B]/30 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-5 h-5 stroke-[3px]" />
                <span>+ Crear Nuevo Producto</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('¿Desea restaurar el catálogo original predeterminado? Se perderán las ediciones personalizadas.')) {
                    resetCatalogToDefaults();
                    showToast('Catálogo restaurado a valores por defecto', 'info');
                  }
                }}
                className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-600 transition-colors cursor-pointer"
                title="Restaurar productos por defecto"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
              <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                Total: <strong className="text-slate-900 dark:text-white">{products.length}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                En Stock: <strong>{products.filter(p => p.stock > 0).length}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                Agotados: <strong>{products.filter(p => p.stock === 0).length}</strong>
              </span>
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
                placeholder="Buscar por nombre o categoría..."
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FA436B]"
              />
              {productSearch && (
                <button
                  onClick={() => setProductSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="w-full sm:w-auto flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => setSelectedCategoryFilter('todos')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategoryFilter === 'todos'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                Todos
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategoryFilter === cat.id
                      ? 'bg-rose-600 text-white'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {cat.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500">
                <Package className="w-10 h-10 mx-auto mb-2 text-slate-400" />
                <p className="font-bold text-sm">No se encontraron productos</p>
                <p className="text-xs mt-1">Intente cambiar el término de búsqueda o filtro.</p>
              </div>
            ) : (
              filteredProducts.map(prod => (
                <div
                  key={prod.id}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 uppercase">
                          {prod.categoryName}
                        </span>
                        {prod.badge && (
                          <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                            {prod.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white line-clamp-2 leading-tight">
                        {prod.name}
                      </h3>

                      <div className="mt-1.5 flex items-baseline gap-2">
                        <span className="text-sm font-black text-rose-600 dark:text-rose-400">
                          S/ {prod.price.toFixed(2)}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-xs line-through text-slate-400">
                            S/ {prod.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-xl">
                      <button
                        onClick={() => {
                          const newStock = Math.max(0, prod.stock - 1);
                          updateProduct(prod.id, { stock: newStock });
                        }}
                        className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black text-xs flex items-center justify-center shadow-2xs hover:bg-slate-200 cursor-pointer"
                        title="Reducir stock"
                      >
                        -
                      </button>
                      <span className={`text-xs font-black px-1.5 ${prod.stock === 0 ? 'text-rose-600' : 'text-slate-800 dark:text-slate-200'}`}>
                        {prod.stock === 0 ? 'Agotado' : `Stock: ${prod.stock}`}
                      </span>
                      <button
                        onClick={() => {
                          updateProduct(prod.id, { stock: prod.stock + 1 });
                        }}
                        className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black text-xs flex items-center justify-center shadow-2xs hover:bg-slate-200 cursor-pointer"
                        title="Aumentar stock"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditProduct(prod)}
                        className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                        title="Editar producto"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span className="hidden xs:inline">Editar</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`¿Seguro que desea eliminar "${prod.name}"?`)) {
                            deleteProduct(prod.id);
                            showToast('Producto eliminado', 'info');
                          }
                        }}
                        className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: GESTIÓN DE CATEGORÍAS */}
      {adminSubTab === 'categorias' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenAddCategory}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FA436B] via-[#FF5876] to-[#FA7088] text-white font-black text-xs sm:text-sm uppercase tracking-wide shadow-lg shadow-[#FA436B]/30 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-5 h-5 stroke-[3px]" />
                <span>+ Crear Nueva Categoría</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('¿Desea restaurar las categorías originales?')) {
                    resetCategoriesToDefaults();
                    showToast('Categorías restauradas a valores predeterminados', 'info');
                  }
                }}
                className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-600 transition-colors cursor-pointer"
                title="Restaurar categorías por defecto"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs font-bold text-slate-600 dark:text-slate-400">
              <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                Total Categorías: <strong className="text-slate-900 dark:text-white">{categories.length}</strong>
              </span>
            </div>
          </div>

          {/* Categories Grid List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map(cat => {
              const productCount = products.filter(p => p.category === cat.id).length;
              return (
                <div
                  key={cat.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100"
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${cat.color || 'from-rose-500 to-rose-600'}`}>
                          {productCount} productos
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900 dark:text-white truncate">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {cat.description || 'Categoría de productos'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleOpenEditCategory(cat)}
                      className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors cursor-pointer"
                      title="Editar categoría"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (productCount > 0) {
                          if (!window.confirm(`Esta categoría tiene ${productCount} productos asociados. ¿Seguro que desea eliminarla?`)) {
                            return;
                          }
                        } else if (!window.confirm(`¿Seguro que desea eliminar la categoría "${cat.name}"?`)) {
                          return;
                        }
                        deleteCategory(cat.id);
                        showToast('Categoría eliminada', 'info');
                      }}
                      className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors cursor-pointer"
                      title="Eliminar categoría"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: EMPRESA Y CONFIGURACIÓN */}
      {adminSubTab === 'empresa' && (
        <form onSubmit={handleSaveCompany} className="space-y-5">
          {/* SUPABASE CLOUD REALTIME DATABASE CARD */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
                    Base de Datos en Línea (Supabase Realtime)
                  </h2>
                  <p className="text-xs text-slate-300 font-medium">
                    Sincronización en vivo para que todos los clientes en cualquier móvil vean exactamente la misma información.
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                {isSupabaseConnected ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    🟢 En Línea &bull; Sincronizado
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                    ⚪ Modo Local (Sin Supabase)
                  </span>
                )}
              </div>
            </div>

            {/* Supabase Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  URL del Proyecto Supabase (ej. https://xyz.supabase.co)
                </label>
                <input
                  type="text"
                  value={supabaseUrlInput}
                  onChange={e => setSupabaseUrlInput(e.target.value)}
                  placeholder="https://xyz.supabase.co"
                  className="w-full text-xs p-3 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Clave Anon API Key de Supabase (ej. eyJ...)
                </label>
                <input
                  type="password"
                  value={supabaseAnonKeyInput}
                  onChange={e => setSupabaseAnonKeyInput(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Action Buttons for Supabase */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={async () => {
                  if (!supabaseUrlInput.trim() || !supabaseAnonKeyInput.trim()) {
                    showToast('Ingrese la URL y Anon Key de su proyecto Supabase', 'warning');
                    return;
                  }
                  saveSupabaseCredentials({
                    url: supabaseUrlInput.trim(),
                    anonKey: supabaseAnonKeyInput.trim()
                  });
                  await reloadFromSupabase();
                  showToast('¡Conectado a Supabase exitosamente en Tiempo Real!', 'success');
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95"
              >
                <Globe2 className="w-4 h-4" />
                <span>Conectar Supabase</span>
              </button>

              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(SUPABASE_SQL_SETUP_SCRIPT);
                    setIsCopiedSql(true);
                    showToast('¡Script SQL copiado! Pégalo en el SQL Editor de Supabase', 'success');
                    setTimeout(() => setIsCopiedSql(false), 3000);
                  } catch (e) {
                    showToast('No se pudo copiar automáticamente', 'warning');
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Copiar script SQL para crear las tablas en Supabase"
              >
                {isCopiedSql ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                <span>{isCopiedSql ? '¡Copiado!' : 'Copiar Script SQL (1-Clic)'}</span>
              </button>

              {isSupabaseConnected && (
                <>
                  <button
                    type="button"
                    onClick={async () => {
                      await reloadFromSupabase();
                      showToast('Sincronización forzada completada', 'info');
                    }}
                    className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sincronizar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      clearSupabaseCredentials();
                      setSupabaseUrlInput('');
                      setSupabaseAnonKeyInput('');
                      showToast('Supabase desconectado', 'info');
                    }}
                    className="px-3 py-2.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 font-bold text-xs hover:bg-rose-900/60 cursor-pointer"
                  >
                    Desconectar
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700 text-rose-600 dark:text-rose-400">
              <Building2 className="w-5 h-5" />
              <h2 className="text-base font-black uppercase tracking-tight text-slate-900 dark:text-white">
                Datos de la Empresa y WhatsApp
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Nombre Comercial de la Tienda
                </label>
                <input
                  type="text"
                  value={companyForm.name}
                  onChange={e => setCompanyForm({ ...companyForm, name: e.target.value })}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Eslogan / Leyenda
                </label>
                <input
                  type="text"
                  value={companyForm.tagline}
                  onChange={e => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Número de WhatsApp para Pedidos (sin + ni espacios, ej. 51958607999)
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 absolute left-3 text-slate-400" />
                  <input
                    type="text"
                    value={companyForm.whatsappNumber}
                    onChange={e => setCompanyForm({ ...companyForm, whatsappNumber: e.target.value })}
                    className="w-full text-xs sm:text-sm pl-9 pr-3 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Número Formateado para Mostrar (ej. +51 958 607 999)
                </label>
                <input
                  type="text"
                  value={companyForm.whatsappDisplay}
                  onChange={e => setCompanyForm({ ...companyForm, whatsappDisplay: e.target.value })}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Horario de Atención
                </label>
                <input
                  type="text"
                  value={companyForm.supportHours}
                  onChange={e => setCompanyForm({ ...companyForm, supportHours: e.target.value })}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  URL del Logo Oficial
                </label>
                <input
                  type="text"
                  value={companyForm.logoUrl}
                  onChange={e => setCompanyForm({ ...companyForm, logoUrl: e.target.value })}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Details Configuration */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700 text-purple-600 dark:text-purple-400">
              <CreditCard className="w-5 h-5" />
              <h2 className="text-base font-black uppercase tracking-tight text-slate-900 dark:text-white">
                Datos de Cobro Yape y Banco (BCP)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Número Yape / Plin (ej. 958607999)
                </label>
                <input
                  type="text"
                  value={companyForm.yapePhone}
                  onChange={e => setCompanyForm({ ...companyForm, yapePhone: e.target.value })}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Titular de Cuenta Yape
                </label>
                <input
                  type="text"
                  value={companyForm.yapeHolder}
                  onChange={e => setCompanyForm({ ...companyForm, yapeHolder: e.target.value })}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Número de Cuenta BCP
                </label>
                <input
                  type="text"
                  value={companyForm.bcpAccount}
                  onChange={e => setCompanyForm({ ...companyForm, bcpAccount: e.target.value })}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Código Interbancario (CCI BCP)
                </label>
                <input
                  type="text"
                  value={companyForm.bcpCci}
                  onChange={e => setCompanyForm({ ...companyForm, bcpCci: e.target.value })}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Admin Security PIN Settings */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700 text-amber-600 dark:text-amber-400">
              <KeyRound className="w-5 h-5" />
              <h2 className="text-base font-black uppercase tracking-tight text-slate-900 dark:text-white">
                Seguridad y PIN de Administrador
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  PIN Actual
                </label>
                <input
                  type="text"
                  value={adminPin}
                  disabled
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 text-slate-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Nuevo PIN de Seguridad (Opcional)
                </label>
                <input
                  type="text"
                  value={newPinInput}
                  onChange={e => setNewPinInput(e.target.value)}
                  placeholder="Ingrese nuevo PIN (ej. 4321)"
                  maxLength={12}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FA436B] via-[#FF5876] to-[#FA7088] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-[#FA436B]/30 hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-5 h-5" />
            <span>Guardar Configuración de la Empresa</span>
          </button>
        </form>
      )}

      {/* SUB-TAB 4: VENTAS Y PEDIDOS */}
      {adminSubTab === 'pedidos' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase">
                Historial de Pedidos Realizados
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gestione el estado de las compras enviadas por los clientes vía WhatsApp
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-black">
              {orders.length} Pedidos
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500">
              <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-slate-400" />
              <p className="font-bold text-sm">Aún no hay pedidos registrados</p>
              <p className="text-xs mt-1">Los pedidos generados por los clientes en el carrito se mostrarán aquí.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map(order => (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                        #{order.code}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString('es-PE', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    <select
                      value={order.status || 'pendiente'}
                      onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className={`text-xs font-extrabold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                        (order.status || 'pendiente') === 'completado'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : (order.status || 'pendiente') === 'despachado'
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : (order.status || 'pendiente') === 'cancelado'
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="pendiente">⏳ Pendiente</option>
                      <option value="despachado">🚚 Despachado</option>
                      <option value="completado">✅ Completado</option>
                      <option value="cancelado">❌ Cancelado</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <div>
                      <span className="font-bold block">👤 Cliente:</span>
                      {order.delivery.fullName || 'Cliente Anónimo'} ({order.delivery.phone || 'Sin número'})
                    </div>
                    <div>
                      <span className="font-bold block">📍 Dirección:</span>
                      {order.delivery.address || 'Recojo en tienda'}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl space-y-1">
                    <span className="text-[11px] font-black uppercase text-slate-400 block">
                      Productos ({order.items.length}):
                    </span>
                    {order.items.map(item => (
                      <div key={item.id} className="text-xs flex items-center justify-between text-slate-800 dark:text-slate-200">
                        <span className="line-clamp-1">
                          • {item.quantity}x {item.product.name}
                        </span>
                        <span className="font-mono font-bold shrink-0 ml-2">
                          S/ {((item.product.price + (item.selectedVariant?.priceModifier || 0)) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="pt-1.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-black text-rose-600 dark:text-rose-400">
                      <span>Total A Cobrar:</span>
                      <span className="text-sm font-mono">S/ {order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    {order.delivery.phone && (
                      <a
                        href={`https://wa.me/${order.delivery.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${order.delivery.fullName}, le saludamos de ${businessConfig.name} sobre su pedido #${order.code}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Cliente</span>
                      </a>
                    )}

                    <button
                      onClick={() => {
                        if (window.confirm('¿Seguro de eliminar este pedido del historial?')) {
                          deleteOrder(order.id);
                          showToast('Pedido eliminado del registro', 'info');
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-600 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL PARA CREAR / EDITAR PRODUCTO */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-slate-800 overflow-hidden relative my-auto max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-[#FA436B] to-[#FA7088] p-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-300" />
                <h3 className="font-black text-base uppercase tracking-tight">
                  {editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}
                </h3>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-full bg-black/20 hover:bg-black/30 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  value={productFormData.name}
                  onChange={e => setProductFormData({ ...productFormData, name: e.target.value })}
                  placeholder="ej. Morral Antirrobo Varón Impermeable"
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Categoría *
                  </label>
                  <select
                    value={productFormData.category}
                    onChange={e => setProductFormData({ ...productFormData, category: e.target.value as CategoryId })}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none cursor-pointer"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Etiqueta / Badge
                  </label>
                  <select
                    value={productFormData.badge}
                    onChange={e => setProductFormData({ ...productFormData, badge: e.target.value as any })}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none cursor-pointer"
                  >
                    <option value="">Sin Etiqueta</option>
                    <option value="Más Vendido">🔥 Más Vendido</option>
                    <option value="Novedad">✨ Novedad</option>
                    <option value="Oferta Top">⚡ Oferta Top</option>
                    <option value="K-Beauty">💄 K-Beauty</option>
                    <option value="Garantía 100%">⭐ Garantía 100%</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Precio Venta (S/.) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={productFormData.price}
                    onChange={e => setProductFormData({ ...productFormData, price: e.target.value })}
                    placeholder="29.90"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Precio Antes (S/.)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={productFormData.originalPrice}
                    onChange={e => setProductFormData({ ...productFormData, originalPrice: e.target.value })}
                    placeholder="45.00"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Stock inicial *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={productFormData.stock}
                    onChange={e => setProductFormData({ ...productFormData, stock: e.target.value })}
                    placeholder="15"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Foto / Imagen del Producto *
                </label>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/80 text-rose-700 dark:text-rose-300 text-xs font-black flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 border border-rose-200 dark:border-rose-800 shadow-2xs">
                      <Camera className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      <span>Subir Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleImageFileUpload(e, (url) => setProductFormData(prev => ({ ...prev, image: url })))}
                        className="hidden"
                      />
                    </label>

                    <input
                      type="text"
                      value={productFormData.image}
                      onChange={e => setProductFormData({ ...productFormData, image: e.target.value })}
                      placeholder="o pega URL de la imagen..."
                      className="flex-1 text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                      required
                    />

                    {productFormData.image && (
                      <img
                        src={productFormData.image}
                        alt="Preview"
                        className="w-11 h-11 rounded-xl object-cover border border-slate-300 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800"
                      />
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">
                      O selecciona una foto de muestra rápida:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {SAMPLE_IMAGE_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setProductFormData({ ...productFormData, image: preset.url })}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-[10px] font-bold text-slate-600 dark:text-slate-300 transition-colors"
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Subtítulo / Breve resumen
                </label>
                <input
                  type="text"
                  value={productFormData.subtitle}
                  onChange={e => setProductFormData({ ...productFormData, subtitle: e.target.value })}
                  placeholder="ej. Alta durabilidad, diseño ergonómico"
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Descripción completa
                </label>
                <textarea
                  value={productFormData.description}
                  onChange={e => setProductFormData({ ...productFormData, description: e.target.value })}
                  rows={2}
                  placeholder="Detalles sobre el producto, materiales, tamaño, garantía..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Puntos destacados (Un punto por línea)
                </label>
                <textarea
                  value={productFormData.highlights}
                  onChange={e => setProductFormData({ ...productFormData, highlights: e.target.value })}
                  rows={2}
                  placeholder={"Garantía oficial El Almacén\nEnvío rápido a todo el Perú\nMaterial alta resistencia"}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none font-mono"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="flex-1 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#FA436B] to-[#FA7088] text-white font-black text-xs uppercase tracking-wider shadow-md hover:opacity-95 cursor-pointer"
                >
                  {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PARA CREAR / EDITAR CATEGORÍA */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-slate-800 overflow-hidden relative my-auto max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-[#FA436B] to-[#FA7088] p-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-300" />
                <h3 className="font-black text-base uppercase tracking-tight">
                  {editingCategory ? 'Editar Categoría' : 'Crear Nueva Categoría'}
                </h3>
              </div>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1 rounded-full bg-black/20 hover:bg-black/30 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Nombre de la Categoría *
                </label>
                <input
                  type="text"
                  value={categoryFormData.name}
                  onChange={e => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                  placeholder="ej. Morrales & Bolsos"
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Descripción
                </label>
                <input
                  type="text"
                  value={categoryFormData.description}
                  onChange={e => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                  placeholder="ej. Mochilas antirrobo y bolsos elegantes"
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Color / Degradado Visual
                </label>
                <select
                  value={categoryFormData.color}
                  onChange={e => setCategoryFormData({ ...categoryFormData, color: e.target.value })}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none cursor-pointer"
                >
                  {COLOR_GRADIENT_OPTIONS.map((opt, idx) => (
                    <option key={idx} value={opt.value}>
                      🎨 {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Foto / Imagen de Portada de Categoría
                </label>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/80 text-rose-700 dark:text-rose-300 text-xs font-black flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 border border-rose-200 dark:border-rose-800 shadow-2xs">
                      <Camera className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      <span>Subir Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleImageFileUpload(e, (url) => setCategoryFormData(prev => ({ ...prev, image: url })))}
                        className="hidden"
                      />
                    </label>

                    <input
                      type="text"
                      value={categoryFormData.image}
                      onChange={e => setCategoryFormData({ ...categoryFormData, image: e.target.value })}
                      placeholder="o pega URL de la imagen..."
                      className="flex-1 text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#FA436B] focus:outline-none"
                    />

                    {categoryFormData.image && (
                      <img
                        src={categoryFormData.image}
                        alt="Preview"
                        className="w-11 h-11 rounded-xl object-cover border border-slate-300 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800"
                      />
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">
                      O selecciona una foto de muestra rápida:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {SAMPLE_IMAGE_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCategoryFormData({ ...categoryFormData, image: preset.url })}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-[10px] font-bold text-slate-600 dark:text-slate-300 transition-colors"
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="flex-1 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#FA436B] to-[#FA7088] text-white font-black text-xs uppercase tracking-wider shadow-md hover:opacity-95 cursor-pointer"
                >
                  {editingCategory ? 'Guardar Cambios' : 'Crear Categoría'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
