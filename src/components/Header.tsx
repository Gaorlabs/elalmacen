import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/products';
import { BUSINESS_CONFIG } from '../data/shipping';
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
    setShowSplash
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
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Official Brand Logo & Name */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              setSelectedCategory('todos');
              setSearchQuery('');
              setActiveTab('inicio');
            }}
            className="flex items-center gap-2 sm:gap-2.5 group text-left cursor-pointer transition-transform active:scale-95"
            title="El Almacén - Todo en solo lugar (Ir al inicio)"
          >
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-17_at_12.27.58_PM_f3242823.jpeg"
              alt="El Almacén"
              className="h-10 sm:h-12 w-auto max-w-[50px] sm:max-w-[65px] object-contain rounded-lg shadow-sm bg-white p-0.5 border border-white/20 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-sans font-black text-lg sm:text-2xl tracking-[0.06em] text-white group-hover:text-amber-300 transition-colors uppercase leading-none">
                EL ALMACÉN
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 tracking-tight leading-tight mt-0.5 hidden xs:block">
                Todo en solo lugar
              </span>
            </div>
          </button>

          {/* Botón para volver a ver la Portada Oficial */}
          <button
            onClick={() => setShowSplash(true)}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-black rounded-full bg-gradient-to-r from-[#FA436B] to-[#FA7088] text-white hover:opacity-95 shadow-xs transition-all active:scale-95 cursor-pointer border border-white/20"
            title="Ver Portada oficial y Bienvenida"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Portada</span>
          </button>
        </div>

        {/* Center: Search Bar with "Musera tendencias" input */}
        <div className="flex-1 max-w-xl mx-auto min-w-0">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div className="relative w-full flex items-center bg-white rounded-xs sm:rounded-sm overflow-hidden shadow-xs border border-transparent focus-within:border-black">
              {/* Trend Tag icon / text inside input */}
              <div className="hidden xs:flex items-center pl-3 pr-1 text-slate-400 pointer-events-none">
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
                placeholder="Buscar productos, tendencias, moda, fundas..."
                className="w-full text-xs sm:text-sm pl-2 sm:pl-2.5 pr-2 py-2 sm:py-2.5 text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
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

              {/* Black search button on the right */}
              <button
                type="submit"
                className="bg-black hover:bg-neutral-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-center transition-colors shrink-0"
                title="Buscar"
                aria-label="Buscar"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </form>
        </div>

        {/* Right: User, Cart, Wishlist, WhatsApp Support, Globe, Theme */}
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0 text-white">
          
          {/* User Account */}
          <button
            onClick={() => setActiveTab('explorar')}
            className="p-1.5 sm:p-2 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
            title="Mi Cuenta"
            aria-label="Cuenta"
          >
            <User className="w-5 h-5 stroke-[1.8px]" />
          </button>

          {/* Cart Icon with Numeric Counter Badge */}
          <button
            onClick={openCartDrawer}
            className="relative p-1.5 sm:p-2 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
            title="Ver Carrito de Compras"
            aria-label="Carrito"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8px]" />
            <span className="text-xs font-bold font-mono tabular-nums leading-none">
              {cartCount}
            </span>
          </button>

          {/* Wishlist Heart Icon with Counter */}
          <button
            onClick={() => setActiveTab('favoritos')}
            className="p-1.5 sm:p-2 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
            title="Mis Favoritos"
            aria-label="Favoritos"
          >
            <Heart className={`w-5 h-5 stroke-[1.8px] ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span className="text-xs font-bold font-mono tabular-nums leading-none">
              {favorites.length}
            </span>
          </button>

          {/* Customer Service / WhatsApp Direct Support */}
          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hola El Almacén, deseo realizar una consulta sobre sus productos.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex p-1.5 sm:p-2 hover:text-emerald-400 transition-colors items-center cursor-pointer"
            title="Atención al Cliente por WhatsApp (+51 958 607 999)"
            aria-label="Soporte WhatsApp"
          >
            <Headphones className="w-5 h-5 stroke-[1.8px]" />
          </a>

          {/* Country / Currency Indicator */}
          <div className="hidden md:flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-white px-2 py-1 rounded cursor-pointer">
            <Globe className="w-4 h-4 text-slate-300" />
            <span className="text-xs">PE / S/.</span>
          </div>

          {/* Dark / Light Mode Switch */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 sm:p-2 hover:text-amber-400 transition-colors cursor-pointer"
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
                {CATEGORIES.map(cat => (
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
