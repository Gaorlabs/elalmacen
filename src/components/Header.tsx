import React from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import {
  Moon,
  Sun,
  ShoppingBag,
  ArrowLeft,
  Search
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    setShowSplash,
    cartCount,
    openCartDrawer,
    setActiveTab,
    activeTab
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-2xs">
      {/* Clean & Organized Main Header Bar */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between gap-2">
        {/* Left: Portada Back Button & Brand Identity */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => setShowSplash(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all border border-slate-200/80 dark:border-slate-700 active:scale-95 group shadow-2xs shrink-0"
            title="Regresar a la Portada"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-rose-600 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[11px] font-extrabold hidden xs:inline">Portada</span>
          </button>

          {/* Brand Logo & Name */}
          <div
            onClick={() => setActiveTab('inicio')}
            className="flex items-center gap-2 cursor-pointer active:scale-98 transition-transform select-none truncate"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200/60 dark:border-rose-900/60 p-0.5 flex items-center justify-center shrink-0">
              <BrandLogo size="sm" showSubtitle={false} className="scale-65 w-full h-full" />
            </div>
            <div className="flex flex-col text-left leading-tight truncate">
              <span className="font-black text-sm tracking-tight text-slate-900 dark:text-white truncate">
                El Almacén
              </span>
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 truncate">
                Todo en solo lugar
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions: Search, Dark Mode, Shopping Cart */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {activeTab !== 'explorar' && (
            <button
              onClick={() => setActiveTab('explorar')}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Buscar productos"
              aria-label="Buscar"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Dark / Light Mode Switch */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDarkMode ? 'Modo claro' : 'Modo oscuro'}
            aria-label="Cambiar tema"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Cart Button with Count Badge */}
          <button
            onClick={openCartDrawer}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-sm active:scale-95 transition-all ml-0.5"
            title="Ver canasta de compras"
            aria-label="Canasta de compras"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="bg-yellow-400 text-slate-950 font-black text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
