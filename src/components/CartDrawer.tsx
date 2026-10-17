import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  CheckCircle2,
  AlertCircle,
  Smartphone
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    closeCartDrawer,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartCount,
    couponCode,
    couponError,
    discountAmount,
    applyCoupon,
    removeCoupon,
    grandTotal,
    openCheckout
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(inputCoupon)) {
      setInputCoupon('');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end transition-opacity duration-300"
      onClick={closeCartDrawer}
    >
      <div
        className="w-full max-w-md mx-auto bg-white dark:bg-slate-900 max-h-[90dvh] rounded-t-[32px] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300 border-t border-slate-200 dark:border-slate-800"
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle bar */}
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-2 flex-shrink-0" />

        {/* Drawer Header */}
        <div className="px-4 pb-3 pt-1 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Tu Canasta de Compras
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {cartCount} {cartCount === 1 ? 'producto escogido' : 'productos escogidos'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Vaciar todo el carrito"
              >
                Vaciar
              </button>
            )}
            <button
              onClick={closeCartDrawer}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-slate-800 flex items-center justify-center text-rose-400 mb-4 animate-bounce">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-200 mb-1">
              Tu canasta está vacía
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-6">
              Escoge tus productos en el catálogo y agrégalos a tu canasta para pagar por Yape.
            </p>
            <button
              onClick={closeCartDrawer}
              className="py-3 px-6 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
            >
              Ver Catálogo
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
            {/* List of Cart Items */}
            <div className="space-y-2.5">
              {cart.map(item => {
                const itemUnit = item.product.price + (item.selectedVariant?.priceModifier || 0);
                const itemTotal = itemUnit * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-cover bg-slate-200 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      {item.selectedVariant && (
                        <p className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold line-clamp-1">
                          {item.selectedVariant.name}
                        </p>
                      )}
                      <p className="text-xs font-black text-slate-800 dark:text-slate-200 mt-0.5">
                        S/ {itemTotal.toFixed(2)}
                      </p>

                      {/* Item Quantity controls */}
                      <div className="flex items-center justify-between mt-1.5">
                        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-700/80 rounded-xl p-0.5 border border-slate-200 dark:border-slate-600 shadow-2xs">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center justify-center font-bold"
                            title="Menos"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-4 text-center text-xs font-black text-slate-800 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center justify-center font-bold"
                            title="Más"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Discount Coupon Section */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                <Tag className="w-3.5 h-3.5 text-rose-500" />
                <span>¿Tienes un Cupón de Descuento?</span>
              </label>

              {couponCode ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Cupón {couponCode} aplicado (-S/ {discountAmount.toFixed(2)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-500 hover:text-red-700 text-[11px] underline ml-2"
                  >
                    Quitar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={e => setInputCoupon(e.target.value)}
                    placeholder="Ej. ALMACEN10"
                    className="flex-1 uppercase text-xs font-semibold px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 transition-colors shadow-xs"
                  >
                    Aplicar
                  </button>
                </form>
              )}

              {couponError && (
                <p className="text-[11px] text-red-500 mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" />
                  {couponError}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Drawer Sticky Footer with Subtotal, Discount, Total and Button */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} prod.):</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  S/ {cartSubtotal.toFixed(2)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Descuento Cupón ({couponCode}):</span>
                  <span>-S/ {discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  Total a Pagar:
                </span>
                <span className="text-xl font-black text-rose-600 dark:text-rose-400">
                  S/ {grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={openCheckout}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-rose-600 to-red-600 hover:from-purple-500 hover:to-red-500 text-white font-black text-sm shadow-xl shadow-rose-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 group"
            >
              <Smartphone className="w-4 h-4" />
              <span>Continuar a Pagar con Yape</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
