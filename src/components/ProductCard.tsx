import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { useApp } from '../context/AppContext';
import { Star, Plus, Minus, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    updateQuantity,
    cart,
    toggleFavorite,
    isFavorite,
    openProductDetail
  } = useApp();

  const [selectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );

  const isFav = isFavorite(product.id);

  // Check how many of this product are in cart
  const itemKey = selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id;
  const cartItem = cart.find(item => item.id === itemKey);
  const qtyInCart = cartItem ? cartItem.quantity : 0;

  const currentPrice = product.price + (selectedVariant?.priceModifier || 0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
  };

  const handleQuickMinus = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.id, -1);
    }
  };

  const handleQuickPlus = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.id, 1);
    } else {
      addToCart(product, selectedVariant, 1);
    }
  };

  return (
    <div
      onClick={() => openProductDetail(product)}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl p-2 sm:p-2.5 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer active:scale-[0.985] select-none"
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Top Badges */}
        {product.badge && (
          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[9px] font-black tracking-tight bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-slate-700 dark:text-slate-200 flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-xs z-10"
          title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-600 dark:text-slate-300'
            }`}
          />
        </button>

        {/* Rating overlay pill on image bottom */}
        <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-white text-[9px] font-bold flex items-center gap-1">
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          <span>{product.rating.toFixed(1)}</span>
        </div>

        {/* Options badge if variants exist */}
        {product.variants && product.variants.length > 0 && (
          <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 text-rose-600 dark:text-rose-400 text-[8px] font-bold border border-rose-200 dark:border-rose-900 shadow-2xs">
            {product.variants.length} var.
          </div>
        )}
      </div>

      {/* Product Content (Compact, no excessive text walls) */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Name: clean 2-line title with fixed height to ensure cards align uniformly */}
        <h3 className="font-extrabold text-[12px] sm:text-xs text-slate-900 dark:text-white leading-4 line-clamp-2 h-8 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
          {product.name}
        </h3>

        {/* Pricing & Add to Cart Controls */}
        <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1">
          {/* Prices */}
          <div className="flex flex-col min-w-0 pr-1">
            <span className="text-xs sm:text-sm font-black text-rose-600 dark:text-rose-400 tracking-tight leading-tight">
              S/ {currentPrice.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-[9px] text-slate-400 line-through leading-tight">
                S/ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Controls: Compact + / [- qty +] */}
          {qtyInCart > 0 ? (
            <div
              className="flex items-center bg-rose-50 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-700 rounded-xl p-0.5 flex-shrink-0"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={handleQuickMinus}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold hover:bg-rose-100 dark:hover:bg-slate-700 active:scale-90 transition-all shadow-2xs"
                title="Menos"
              >
                <Minus className="w-2.5 h-2.5" />
              </button>
              <span className="w-4 text-center font-black text-[11px] text-rose-700 dark:text-rose-300">
                {qtyInCart}
              </span>
              <button
                onClick={handleQuickPlus}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold hover:bg-rose-500 active:scale-90 transition-all shadow-2xs"
                title="Más"
              >
                <Plus className="w-2.5 h-2.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleQuickAdd}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 dark:bg-rose-600 hover:bg-rose-600 dark:hover:bg-rose-500 text-white flex items-center justify-center font-bold shadow-xs active:scale-90 transition-all flex-shrink-0"
              title="Agregar a la canasta"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
