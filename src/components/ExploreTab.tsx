import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { CategoryId } from '../types';
import { Search, X, SlidersHorizontal, PackageSearch } from 'lucide-react';

export const ExploreTab: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useApp();

  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategory !== 'todos' && product.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inName = product.name.toLowerCase().includes(query);
        const inSubtitle = product.subtitle.toLowerCase().includes(query);
        const inDesc = product.description.toLowerCase().includes(query);
        const inHighlights = product.highlights.some(h => h.toLowerCase().includes(query));
        const inCategory = product.categoryName.toLowerCase().includes(query);
        return inName || inSubtitle || inDesc || inHighlights || inCategory;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: popular
      return b.reviewsCount - a.reviewsCount;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-4 pb-24">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Buscar FREZYDERM, Linbox, pestañas, morral, lentes..."
          className="w-full text-xs sm:text-sm pl-10 pr-9 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            title="Borrar búsqueda"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setSelectedCategory('todos')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'todos'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          Todos ({PRODUCTS.length})
        </button>

        {CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          const count = PRODUCTS.filter(p => p.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 pl-1.5 pr-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span>{cat.name} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* Category Photo Grid if on 'todos' and no search query */}
      {selectedCategory === 'todos' && !searchQuery.trim() && (
        <div className="pt-1">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Categorías en Fotos
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.slice(0, 6).map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="relative h-20 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm group active:scale-95 transition-all text-left"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-2 text-white">
                  <span className="text-[10px] font-black leading-tight drop-shadow-md">
                    {cat.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filter Stats & Sorting Dropdown */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 pt-1">
        <span>
          Mostrando <strong className="text-slate-900 dark:text-white font-extrabold">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'producto' : 'productos'}
        </span>

        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="text-xs font-semibold bg-transparent border-0 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="popular">Más Populares</option>
            <option value="rating">Mejor Calificados</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mb-3">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No se encontraron productos
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1 mb-4">
            No encontramos coincidencias para "{searchQuery}". Intenta buscar otra palabra o restablece los filtros.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('todos');
            }}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 transition-colors shadow-xs"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
