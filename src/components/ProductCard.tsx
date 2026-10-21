import React from 'react';
import { Product, ProductVariant } from '../types';
import { useApp } from '../context/AppContext';
import { Star, Plus, Minus, Heart, ShoppingBag } from 'lucide-react';

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

  const selectedVariant: ProductVariant | undefined =
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined;

  const isFav = isFavorite(product.id);

  // Check how many of this product are in cart
  const itemKey = selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id;
  const cartItem = cart.find(item => item.id === itemKey);
  const qtyInCart = cartItem ? cartItem.quantity : 0;

  const currentPrice = product.price + (selectedVariant?.priceModifier || 0);

  // Calculate discount percentage if originalPrice exists
  const discountPercent = product.originalPrice && product.originalPrice > currentPrice
    ? Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)
    : null;

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
      className="group relative bg-white dark:bg-slate-900 rounded-none sm:rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer select-none"
    >
      {/* 3:4 High-Density SHEIN Portrait Image Container */}
      <div className="relative w-full aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top-Left Discount or Badge Pill */}
        {discountPercent ? (
          <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-none sm:rounded-xs bg-[#FA436B] text-white text-[10px] font-black tracking-tight shadow-xs">
            -{discountPercent}%
          </div>
        ) : product.badge ? (
          <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-none sm:rounded-xs bg-black/80 text-white text-[9px] font-black tracking-tight shadow-xs uppercase">
            {product.badge}
          </div>
        ) : null}

        {/* Top-Right Favorite Heart */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs text-slate-700 dark:text-slate-200 flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-xs z-10 cursor-pointer"
          title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          aria-label="Favorito"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isFav ? 'fill-[#FA436B] text-[#FA436B]' : 'text-slate-600 dark:text-slate-300'
            }`}
          />
        </button>

        {/* Floating Quick Add Button on bottom right of photo */}
        <div className="absolute bottom-2 right-2 z-10" onClick={e => e.stopPropagation()}>
          {qtyInCart > 0 ? (
            <div className="flex items-center bg-white/95 dark:bg-slate-900/95 border border-rose-300 dark:border-rose-700 rounded-full p-0.5 shadow-md">
              <button
                onClick={handleQuickMinus}
                className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold active:scale-90 transition-all"
                title="Menos"
              >
                <Minus className="w-2.5 h-2.5" />
              </button>
              <span className="w-4 text-center font-black text-[10px] text-rose-700 dark:text-rose-300">
                {qtyInCart}
              </span>
              <button
                onClick={handleQuickPlus}
                className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold active:scale-90 transition-all"
                title="Más"
              >
                <Plus className="w-2.5 h-2.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleQuickAdd}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer"
              title="Añadir a la bolsa"
              aria-label="Añadir"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Card Content & Pricing */}
      <div className="p-2 sm:p-2.5 flex flex-col justify-between flex-1">
        
        <div>
          {/* Price & Original Price */}
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-xs sm:text-sm font-black text-[#FA436B] tracking-tight">
              S/ {currentPrice.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-slate-400 line-through">
                S/ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Product Title (Clean 2 lines) */}
          <h3 className="font-medium text-[11px] sm:text-xs text-slate-800 dark:text-slate-100 leading-tight line-clamp-2 mt-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Social Proof & Rating */}
        <div className="mt-1.5 pt-1 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
          <div className="flex items-center gap-0.5 text-amber-500 font-bold">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            <span className="text-[10px]">{product.rating.toFixed(1)}</span>
          </div>

          <span className="text-[9px] text-slate-500 dark:text-slate-400">
            {product.reviewsCount * 4}+ vendidos
          </span>
        </div>
      </div>
    </div>
  );
};
