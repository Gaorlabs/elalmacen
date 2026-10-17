import React from 'react';
import { useApp } from '../context/AppContext';
import { AppTab } from '../types';
import { Home, Compass, Heart, ShoppingBag } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, favorites, cartCount, openCartDrawer } = useApp();

  return (
    <div className="sticky bottom-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/90 dark:border-slate-800 transition-colors shadow-[0_-4px_20px_rgba(0,0,0,0.06)] mt-auto pb-[env(safe-area-inset-bottom,0px)]">
      <nav className="w-full max-w-4xl mx-auto px-4 h-16 flex items-center justify-around">
        {/* Inicio */}
        <button
          onClick={() => setActiveTab('inicio')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-200 ${
            activeTab === 'inicio'
              ? 'text-rose-600 dark:text-rose-400 font-black scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <Home
            className={`w-5 h-5 transition-transform duration-200 ${
              activeTab === 'inicio' ? 'stroke-[2.5px] scale-110' : 'stroke-[1.8px]'
            }`}
          />
          <span className="text-[10px] mt-1 tracking-tight">Inicio</span>
          {activeTab === 'inicio' && (
            <span className="absolute bottom-0 w-8 h-1 bg-gradient-to-r from-red-500 to-rose-600 rounded-t-full shadow-xs" />
          )}
        </button>

        {/* Explorar */}
        <button
          onClick={() => setActiveTab('explorar')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-200 ${
            activeTab === 'explorar'
              ? 'text-rose-600 dark:text-rose-400 font-black scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <Compass
            className={`w-5 h-5 transition-transform duration-200 ${
              activeTab === 'explorar' ? 'stroke-[2.5px] scale-110' : 'stroke-[1.8px]'
            }`}
          />
          <span className="text-[10px] mt-1 tracking-tight">Explorar</span>
          {activeTab === 'explorar' && (
            <span className="absolute bottom-0 w-8 h-1 bg-gradient-to-r from-red-500 to-rose-600 rounded-t-full shadow-xs" />
          )}
        </button>

        {/* Favoritos */}
        <button
          onClick={() => setActiveTab('favoritos')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-200 ${
            activeTab === 'favoritos'
              ? 'text-rose-600 dark:text-rose-400 font-black scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <div className="relative">
            <Heart
              className={`w-5 h-5 transition-transform duration-200 ${
                activeTab === 'favoritos' ? 'stroke-[2.5px] scale-110 fill-rose-500 text-rose-500' : 'stroke-[1.8px]'
              }`}
            />
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-black h-3.5 min-w-3.5 px-0.5 rounded-full flex items-center justify-center shadow-xs">
                {favorites.length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Favoritos</span>
          {activeTab === 'favoritos' && (
            <span className="absolute bottom-0 w-8 h-1 bg-gradient-to-r from-red-500 to-rose-600 rounded-t-full shadow-xs" />
          )}
        </button>

        {/* Mi Canasta / Carrito (Direct 1-tap access to cart) */}
        <button
          onClick={openCartDrawer}
          className="relative flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-200 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 active:scale-95"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white flex items-center justify-center shadow-md">
              <ShoppingBag className="w-4 h-4" />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-slate-950 font-black text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-sm animate-bounce">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 font-bold text-slate-900 dark:text-white">Canasta</span>
        </button>
      </nav>
    </div>
  );
};
