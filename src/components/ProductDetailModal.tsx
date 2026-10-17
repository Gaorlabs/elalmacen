import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductVariant } from '../types';
import { BUSINESS_CONFIG } from '../data/shipping';
import {
  X,
  Star,
  Plus,
  Minus,
  CheckCircle2,
  Heart,
  ShieldCheck,
  ShoppingBag,
  MessageCircle
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductDetail,
    addToCart,
    toggleFavorite,
    isFavorite
  } = useApp();

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    selectedProduct?.variants && selectedProduct.variants.length > 0
      ? selectedProduct.variants[0]
      : undefined
  );

  React.useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
      setSelectedVariant(
        selectedProduct.variants && selectedProduct.variants.length > 0
          ? selectedProduct.variants[0]
          : undefined
      );
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const isFav = isFavorite(selectedProduct.id);
  const unitPrice = selectedProduct.price + (selectedVariant?.priceModifier || 0);
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedVariant, quantity);
    closeProductDetail();
  };

  const handleConsultWhatsApp = () => {
    const variantText = selectedVariant ? ` (${selectedVariant.name})` : '';
    const text = encodeURIComponent(
      `Hola El Almacén, deseo consultar sobre el producto: *${selectedProduct.name}*${variantText} (Precio: S/ ${unitPrice.toFixed(2)}). ¿Tienen disponibilidad?`
    );
    window.open(`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex flex-col justify-end sm:items-center sm:justify-center p-0 sm:p-4 transition-opacity duration-300"
      onClick={closeProductDetail}
    >
      <div
        className="relative w-full max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-t-[28px] sm:rounded-3xl shadow-2xl border-t sm:border border-slate-200 dark:border-slate-800 max-h-[85dvh] flex flex-col overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile Pull Drag Handle */}
        <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-1.5 flex-shrink-0 sm:hidden" />

        {/* Compact Image Header */}
        <div className="relative w-full h-44 sm:h-52 bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-cover"
          />

          {/* Close Button */}
          <button
            onClick={closeProductDetail}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:scale-105 active:scale-95 shadow-md backdrop-blur-xs transition-all z-10"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(selectedProduct.id)}
            className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:scale-105 active:scale-95 shadow-md backdrop-blur-xs transition-all z-10"
            title="Guardar favorito"
          >
            <Heart
              className={`w-4 h-4 ${
                isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-600 dark:text-slate-300'
              }`}
            />
          </button>

          {/* Category & Badge pill overlay */}
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-md bg-slate-950/80 text-white text-[10px] font-bold backdrop-blur-xs">
              {selectedProduct.categoryName}
            </span>
            {selectedProduct.badge && (
              <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-black shadow-xs">
                {selectedProduct.badge}
              </span>
            )}
          </div>
        </div>

        {/* Content Body: Compact, High Visibility */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 sm:p-4 space-y-3">
          {/* Header Row: Title & Price */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                  {selectedProduct.rating.toFixed(1)}
                </span>
                <span className="text-[10px] text-slate-400">
                  ({selectedProduct.reviewsCount} reseñas)
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold ml-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Stock Disponible
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                {selectedProduct.name}
              </h2>
            </div>

            {/* Price Box */}
            <div className="text-right flex-shrink-0 bg-rose-50 dark:bg-rose-950/60 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900">
              <span className="text-[9px] font-bold uppercase text-rose-600 dark:text-rose-400 block">
                Precio Yape
              </span>
              <span className="text-lg font-black text-rose-600 dark:text-rose-400">
                S/ {unitPrice.toFixed(2)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-[10px] text-slate-400 line-through block -mt-0.5">
                  S/ {selectedProduct.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Variant Selector (Compact Pills) */}
          {selectedProduct.variants && selectedProduct.variants.length > 0 && (
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                Selecciona Opción / Variante:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {selectedProduct.variants.map(variant => {
                  const isSelected = selectedVariant?.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <span>{variant.name}</span>
                      {variant.priceModifier ? (
                        <span className={`text-[10px] ${isSelected ? 'text-white' : 'text-rose-600'}`}>
                          +S/ {variant.priceModifier.toFixed(2)}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Highlights (Compact bullet chips, no text walls) */}
          {selectedProduct.highlights && selectedProduct.highlights.length > 0 && (
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {selectedProduct.highlights.slice(0, 4).map((highlight, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* WhatsApp Direct Query button */}
          <div className="pt-1 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Garantía El Almacén</span>
            </div>
            <button
              onClick={handleConsultWhatsApp}
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Consultar en WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Sticky Action Bottom Bar */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2.5 flex-shrink-0">
          {/* Stepper controls */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-white flex items-center justify-center font-bold hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-90 transition-all shadow-2xs"
              title="Disminuir"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-black text-xs text-slate-900 dark:text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-white flex items-center justify-center font-bold hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-90 transition-all shadow-2xs"
              title="Aumentar"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm shadow-md active:scale-98 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" />
              <span>Agregar a la Canasta</span>
            </div>
            <span className="bg-black/25 px-2 py-0.5 rounded-lg text-xs font-black">
              S/ {totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
