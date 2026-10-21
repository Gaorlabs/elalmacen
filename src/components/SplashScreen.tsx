import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { BUSINESS_CONFIG } from '../data/shipping';
import { Product } from '../types';
import {
  ArrowRight,
  Sparkles,
  Moon,
  Sun,
  Flame
} from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const {
    setShowSplash,
    setSelectedCategory,
    setActiveTab,
    isDarkMode,
    toggleDarkMode,
    openProductDetail
  } = useApp();

  const handleEnterCatalog = () => {
    setSelectedCategory('todos');
    setActiveTab('inicio');
    setShowSplash(false);
  };

  const handleProductClick = (product: Product) => {
    setShowSplash(false);
    openProductDetail(product);
  };

  // Featured top visual products to showcase
  const visualHighlights = PRODUCTS.slice(0, 5);

  return (
    <div className="flex-1 flex flex-col justify-between relative overflow-x-hidden transition-colors w-full pb-4">
      {/* Ambient background glowing circles */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-rose-500/15 dark:bg-rose-500/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-blue-500/15 dark:bg-blue-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-amber-400/15 dark:bg-amber-400/20 blur-3xl pointer-events-none" />

      {/* Top Bar on Splash */}
      <div className="w-full max-w-md mx-auto px-4 pt-3 pb-1 flex items-center justify-between z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/90 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-[11px] font-black text-rose-700 dark:text-rose-300 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Tienda Abierta &bull; Catálogo Virtual
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-xs border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:scale-105 active:scale-95 transition-all"
          title="Cambiar tema"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>
      </div>

      {/* Main Content Area */}
      <main className="w-full max-w-md mx-auto px-4 py-2 flex-1 flex flex-col items-center justify-center text-center z-10">
        
        {/* Circular Emblem Frame with Official Brand Logo (Reemplaza flores con el logo y colores de la web) */}
        <div className="relative my-3 flex flex-col items-center">
          {/* Luminous Glow Halo with web coral-rose colors */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FA436B]/40 via-[#FF5876]/40 to-yellow-400/30 rounded-full blur-2xl scale-150 pointer-events-none" />
          
          <div className="relative p-2.5 sm:p-3 rounded-full bg-gradient-to-br from-[#FA436B] via-[#FF5876] to-[#FA7088] shadow-2xl border-2 border-white/90">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white flex items-center justify-center p-3 shadow-inner overflow-hidden">
              <img
                src={BUSINESS_CONFIG.logoUrl}
                alt="El Almacén - Todo en solo lugar"
                className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Emblem badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 font-black text-[10px] px-3.5 py-0.5 rounded-full shadow-lg border border-white uppercase tracking-wider whitespace-nowrap">
              ⭐ Todo en solo lugar ⭐
            </div>
          </div>
        </div>

        {/* Brand Title with web gradient */}
        <div className="space-y-1 mt-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase drop-shadow-xs">
            El Almacén
          </h1>
          <p className="text-xs sm:text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FA436B] via-rose-500 to-amber-500">
            ¡Novedades, Morrales, Cosmética, Juguetes & Regalos!
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300">
            <span>💜 Yape: {BUSINESS_CONFIG.whatsappDisplay}</span>
          </div>
        </div>

        {/* Visual Mini Gallery: "Lo más pedido en fotos" */}
        <div className="w-full mt-3 text-left">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              Destacados con Fotos
            </span>
            <span className="text-[10px] text-slate-400 font-bold">Desliza &rarr;</span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 px-1">
            {visualHighlights.map(prod => (
              <button
                key={prod.id}
                onClick={() => handleProductClick(prod)}
                className="relative flex-shrink-0 w-24 h-28 rounded-2xl overflow-hidden shadow-md group border border-slate-200/80 dark:border-slate-700 active:scale-95 transition-all"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-1.5 text-left text-white">
                  <span className="text-[9px] font-black line-clamp-1 leading-tight drop-shadow-sm">
                    {prod.name}
                  </span>
                  <span className="text-[10px] font-black text-rose-300">
                    S/ {prod.price.toFixed(2)}
                  </span>
                </div>
                {prod.badge && (
                  <div className="absolute top-1 left-1 px-1.5 py-0.2 rounded-md bg-rose-600 text-white text-[8px] font-black">
                    {prod.badge.split(' ')[0]}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Central Floating Card with Pulsating Glow Animation & Main CTA */}
        <div className="w-full mt-4 p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-rose-200 dark:border-slate-700 shadow-2xl animate-pulse-glow flex flex-col items-center">
          <button
            onClick={handleEnterCatalog}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FA436B] via-[#FF5876] to-[#FA7088] hover:opacity-95 text-white font-black text-base sm:text-lg shadow-xl shadow-[#FA436B]/40 active:scale-98 transition-all flex items-center justify-center gap-3 group cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="tracking-wide uppercase">Ingresar al Catálogo</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </main>

      {/* Footer on Splash - Clean & Short */}
      <footer className="w-full max-w-md mx-auto px-4 py-3 text-center z-10 text-[11px] text-slate-500 dark:text-slate-400">
        <p>WhatsApp: <strong className="text-slate-800 dark:text-slate-200">{BUSINESS_CONFIG.whatsappDisplay}</strong></p>
      </footer>
    </div>
  );
};
