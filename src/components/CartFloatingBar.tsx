import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const CartFloatingBar: React.FC = () => {
  const { cartCount, cartSubtotal, openCartDrawer, isCartDrawerOpen, isCheckoutOpen } = useApp();

  if (cartCount === 0 || isCartDrawerOpen || isCheckoutOpen) return null;

  return (
    <div className="sticky bottom-20 z-30 px-3 -mt-16 pointer-events-none transition-all duration-300 w-full md:hidden">
      <div className="w-full max-w-7xl mx-auto pointer-events-auto">
        <button
          onClick={openCartDrawer}
          className="w-full bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 dark:from-rose-600 dark:via-red-600 dark:to-rose-700 text-white rounded-2xl p-3.5 shadow-2xl flex items-center justify-between border border-rose-500/40 hover:scale-[1.01] active:scale-98 transition-all duration-200 group animate-bounce-short"
        >
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-rose-500/30 flex items-center justify-center text-white font-bold">
              <ShoppingBag className="w-5 h-5 text-rose-300 dark:text-white" />
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            </div>
            <div className="text-left">
              <p className="text-[11px] text-rose-200 dark:text-rose-100 font-medium">
                {cartCount === 1 ? '1 producto seleccionado' : `${cartCount} productos seleccionados`}
              </p>
              <p className="text-base font-extrabold tracking-tight">
                Total: S/ {cartSubtotal.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 dark:bg-black/20 hover:bg-white/20 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors">
            <span>Ver Pedido</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};
