import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';

export const FavoritesTab: React.FC = () => {
  const { favorites, setActiveTab } = useApp();

  const favoriteProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-white">
              Mis Productos Favoritos
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {favoriteProducts.length} {favoriteProducts.length === 1 ? 'producto guardado' : 'productos guardados'}
            </p>
          </div>
        </div>

        {favoriteProducts.length > 0 && (
          <button
            onClick={() => setActiveTab('explorar')}
            className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
          >
            Agregar más
          </button>
        )}
      </div>

      {/* Grid or Empty */}
      {favoriteProducts.length === 0 ? (
        <div className="py-16 px-4 text-center flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-slate-800 text-rose-400 flex items-center justify-center mb-3">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            Aún no has guardado favoritos
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1 mb-5">
            Toca el corazón en cualquier producto para guardarlo en tu lista de deseos y comprarlo cuando quieras.
          </p>
          <button
            onClick={() => setActiveTab('explorar')}
            className="px-5 py-2.5 rounded-2xl bg-slate-900 dark:bg-rose-600 hover:bg-rose-600 dark:hover:bg-rose-500 text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explorar el Catálogo</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5">
          {favoriteProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
