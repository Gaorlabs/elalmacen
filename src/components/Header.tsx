import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryId } from '../types';
import { BUSINESS_CONFIG } from '../data/shipping';
import { PWAInstallButton } from './PWAInstallButton';
import {
  Moon,
  Sun,
  ShoppingBag,
  Heart,
  User,
  Search,
  Headphones,
  Globe,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flame,
  Sparkles,
  ShieldCheck,
  QrCode,
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    cartCount,
    openCartDrawer,
    setActiveTab,
    activeTab,
    favorites,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setShowSplash,
    openAdminModal,
    isAdminUnlocked,
    businessConfig,
    categories,
    openQRModal
  } = useApp();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const navScrollRef = useRef<HTMLDivElement>(null);

  const navCategories: { id: CategoryId | 'todos'; label: string; highlight?: boolean }[] = [
    { id: 'todos', label: 'Solo para ti' },
    { id: 'todos', label: 'Novedades', highlight: true },
    { id: 'todos', label: 'Ofertas', highlight: true },
    { id: 'ropa_mujer', label: 'Ropa de mujer' },
    { id: 'ropa_mujer', label: 'Trajes de baño' },
    { id: 'ropa_mujer', label: 'Talla Grande' },
    { id: 'juguetes', label: 'Niños' },
    { id: 'moda', label: 'Ropa para hombre' },
    { id: 'ropa_mujer', label: 'Ropa interior y para dormir' },
    { id: 'joyeria', label: 'Bisutería Y Accesorios' },
    { id: 'moda', label: 'Zapatos' },
    { id: 'hogar', label: 'Hogar y Vida' },
    { id: 'tecnologia', label: 'Deportes Y Al Aire Libre' },
    { id: 'celulares', label: 'Celulares & Fundas' },
    { id: 'belleza', label: 'Belleza & Skincare' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setActiveTab('explorar');
  };

  const scrollNav = (direction: 'left' | 'right') => {
    if (navScrollRef.current) {
      const offset = direction === 'left' ? -220 : 220;
      navScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleSelectNavCategory = (catId: CategoryId | 'todos') => {
    setSelectedCategory(catId);
    if (activeTab !== 'inicio' && activeTab !== 'explorar') {
      setActiveTab('inicio');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-black text-white transition-colors shadow-md select-none">
      {/* Top Main Black Header Bar */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-2 md:py-0 md:h-18 flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-5">
        
        {/* Top Row on Mobile / Left + Right on Desktop */}
        <div className="flex items-center justify-between gap-2 w-full md:w-auto">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
                setActiveTab('inicio');
              }}
              className="flex items-center gap-2 group text-left cursor-pointer transition-transform active:scale-95 min-w-0"
              title="El Almacén - Todo en solo lugar (Ir al inicio)"
            >
              <img
                src={businessConfig.logoUrl}
                alt={businessConfig.name}
                className="h-9 sm:h-11 w-auto max-w-[44px] sm:max-w-[60px] object-contain rounded-lg shadow-sm bg-white p-0.5 border border-white/20 shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-sans font-black text-base sm:text-xl tracking-[0.04em] text-white group-hover:text-amber-300 transition-colors uppercase leading-none truncate">
                  {businessConfig.name}
                </span>
                <span className="text-[10px] font-bold text-amber-300 tracking-tight leading-tight mt-0.5 hidden sm:block truncate">
                  {businessConfig.tagline}
                </span>
              </div>
            </button>

            {/* Botón Instalar App PWA */}
            <PWAInstallButton variant="compact" />

            {/* Botón Portada (icon+text on sm+, icon on mobile) */}
            <button
              onClick={() => setShowSplash(true)}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-[11px] font-black rounded-full bg-gradient-to-r from-[#FA436B] to-[#FA7088] text-white hover:opacity-95 shadow-xs transition-all active:scale-95 cursor-pointer border border-white/20 shrink-0"
              title="Ver Portada oficial y Bienvenida"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Portada</span>
            </button>

            {/* Botón QR Catálogo */}
            <button
              onClick={openQRModal}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-black rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
              title="Ver y descargar Código QR del Catálogo"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">QR Catálogo</span>
              <span className="sm:hidden">QR</span>
            </button>

            {/* Botón Acceso Panel de Administración (Desktop; en móvil está en la barra inferior) */}
            <button
              onClick={openAdminModal}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1 text-[11px] font-black rounded-full transition-all active:scale-95 cursor-pointer border shrink-0 ${
                isAdminUnlocked
                  ? 'bg-emerald-600 text-white border-emerald-400 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-amber-500/40'
              }`}
              title="Panel de Administración (Gestión de Productos y Empresa)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>{isAdminUnlocked ? 'Admin 🟢' : 'Admin 🔐'}</span>
            </button>
          </div>

          {/* Mobile Right Quick Icons (Portada, Cart, Theme) */}
          <div className="flex md:hidden items-center gap-1 shrink-0 text-white">
            <button
              onClick={() => setShowSplash(true)}
              className="p-1.5 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
              title="Ver Portada"
              aria-label="Portada"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            <button
              onClick={openCartDrawer}
              className="relative p-1.5 hover:text-rose-400 transition-colors flex items-center gap-0.5 cursor-pointer"
              title="Ver Carrito"
              aria-label="Carrito"
            >
              <ShoppingBag className="w-4.5 h-4.5 stroke-[1.8px]" />
              <span className="text-[11px] font-black font-mono text-amber-300 leading-none">
                {cartCount}
              </span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-full bg-neutral-900 border border-neutral-700 hover:text-amber-400 transition-colors cursor-pointer"
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label="Cambiar modo claro u oscuro"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-200" />
              )}
            </button>
          </div>
        </div>

        {/* Center: Search Bar (Full width row on mobile, centered inline on desktop) */}
        <div className="w-full md:flex-1 max-w-xl mx-auto min-w-0">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div className="relative w-full flex items-center bg-white rounded-xl md:rounded-sm overflow-hidden shadow-xs border border-transparent focus-within:border-rose-500">
              {/* Trend Tag icon / text inside input */}
              <div className="hidden sm:flex items-center pl-3 pr-1 text-slate-400 pointer-events-none">
                <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-nowrap flex items-center gap-1">
                  Musera <span className="text-purple-600 italic font-black text-[10px]">tendencias</span>
                </span>
              </div>

              <input
                type="text"
                value={localSearch}
                onChange={e => {
                  setLocalSearch(e.target.value);
                  setSearchQuery(e.target.value);
                }}
                placeholder="Buscar productos, colores, novedades..."
                className="w-full text-xs sm:text-sm pl-3 sm:pl-2.5 pr-2 py-2 text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
              />

              {localSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalSearch('');
                    setSearchQuery('');
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 mr-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Black / Rose search button on the right */}
              <button
                type="submit"
                className="bg-black hover:bg-neutral-800 text-white px-3 sm:px-4 py-2 flex items-center justify-center transition-colors shrink-0"
                title="Buscar"
                aria-label="Buscar"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </form>
        </div>

        {/* Desktop Right: User, Cart, Wishlist, WhatsApp Support, Globe, Theme */}
        <div className="hidden md:flex items-center gap-3 shrink-0 text-white">
          <button
            onClick={() => setActiveTab('explorar')}
            className="p-2 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
            title="Explorar Catálogo"
            aria-label="Explorar"
          >
            <User className="w-5 h-5 stroke-[1.8px]" />
          </button>

          <button
            onClick={openCartDrawer}
            className="relative p-2 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
            title="Ver Carrito de Compras"
            aria-label="Carrito"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8px]" />
            <span className="text-xs font-bold font-mono tabular-nums leading-none">
              {cartCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('favoritos')}
            className="p-2 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
            title="Mis Favoritos"
            aria-label="Favoritos"
          >
            <Heart className={`w-5 h-5 stroke-[1.8px] ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span className="text-xs font-bold font-mono tabular-nums leading-none">
              {favorites.length}
            </span>
          </button>

          <a
            href={`https://wa.me/${businessConfig.whatsappNumber || BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hola ${businessConfig.name}, deseo realizar una consulta sobre sus productos.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:text-emerald-400 transition-colors flex items-center cursor-pointer"
            title={`Atención al Cliente por WhatsApp (${businessConfig.whatsappDisplay})`}
            aria-label="Soporte WhatsApp"
          >
            <Headphones className="w-5 h-5 stroke-[1.8px]" />
          </a>

          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-white px-2 py-1 rounded cursor-pointer">
            <Globe className="w-4 h-4 text-slate-300" />
            <span className="text-xs">PE / S/.</span>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 hover:text-amber-400 transition-colors cursor-pointer"
            title={isDarkMode ? 'Modo claro' : 'Modo oscuro'}
            aria-label="Cambiar tema"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-300" />
            )}
          </button>
        </div>
      </div>

      {/* Sub-Navigation Bar: Horizontal Categories Scrollable with Arrows */}
      <div className="relative border-t border-neutral-800 bg-black text-white text-xs">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 flex items-center h-10 sm:h-11">
          
          {/* Categorías Dropdown Toggle */}
          <div className="relative shrink-0 pr-3 border-r border-neutral-800">
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="flex items-center gap-1.5 font-bold text-white hover:text-rose-400 transition-colors text-xs py-1"
            >
              <span>Categorías</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isCategoryMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl py-2 z-50 text-white">
                <button
                  onClick={() => {
                    setSelectedCategory('todos');
                    setIsCategoryMenuOpen(false);
                    setActiveTab('inicio');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-neutral-800 text-xs font-bold transition-colors flex items-center justify-between"
                >
                  <span>Ver Todo el Catálogo</span>
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                </button>
                <div className="h-px bg-neutral-800 my-1" />
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setIsCategoryMenuOpen(false);
                      setActiveTab('explorar');
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-neutral-800 text-xs transition-colors flex items-center justify-between ${
                      selectedCategory === cat.id ? 'text-rose-400 font-bold bg-neutral-800/60' : 'text-slate-300'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Left Arrow Button for Scroll */}
          <button
            onClick={() => scrollNav('left')}
            className="p-1 text-slate-400 hover:text-white shrink-0 mx-1 cursor-pointer"
            title="Desplazar a la izquierda"
            aria-label="Izquierda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scrollable Category Links */}
          <div
            ref={navScrollRef}
            className="flex-1 flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap text-xs font-semibold py-1 px-1"
          >
            {navCategories.map((item, idx) => {
              const isSelected = selectedCategory === item.id;
              return (
                <button
                  key={`${item.id}-${idx}`}
                  onClick={() => handleSelectNavCategory(item.id)}
                  className={`hover:text-rose-400 transition-colors shrink-0 py-0.5 cursor-pointer ${
                    item.highlight ? 'text-rose-400 font-bold' : isSelected ? 'text-white border-b-2 border-white' : 'text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Arrow Button for Scroll */}
          <button
            onClick={() => scrollNav('right')}
            className="p-1 text-slate-400 hover:text-white shrink-0 mx-1 cursor-pointer"
            title="Desplazar a la derecha"
            aria-label="Derecha"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
