import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { RefreshCw } from 'lucide-react';

interface PullToRefreshProps {
  children: React.ReactNode;
}

const PULL_THRESHOLD = 62;
const MAX_PULL = 94;

export const PullToRefresh: React.FC<PullToRefreshProps> = ({ children }) => {
  const {
    reloadFromSupabase,
    showToast,
    selectedProduct,
    isCartDrawerOpen,
    isCheckoutOpen,
    isAdminModalOpen,
    isQRModalOpen
  } = useApp();

  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const startYRef = useRef<number | null>(null);
  const startXRef = useRef<number | null>(null);
  const isPullingRef = useRef(false);

  const hasOpenModal = Boolean(
    selectedProduct || isCartDrawerOpen || isCheckoutOpen || isAdminModalOpen || isQRModalOpen
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isRefreshing || hasOpenModal) return;
    if (window.scrollY > 2) return;

    const target = e.target as HTMLElement | null;
    if (target && target.closest('input, textarea, select, [data-no-ptr="true"]')) {
      return;
    }

    const touch = e.touches[0];
    if (!touch) return;

    startYRef.current = touch.clientY;
    startXRef.current = touch.clientX;
    isPullingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isRefreshing || hasOpenModal || startYRef.current === null || startXRef.current === null) {
      return;
    }

    const touch = e.touches[0];
    if (!touch) return;

    const deltaY = touch.clientY - startYRef.current;
    const deltaX = touch.clientX - startXRef.current;

    // Cancel if scrolling up or swiping horizontally
    if (deltaY <= 0 || (!isPullingRef.current && Math.abs(deltaX) > Math.abs(deltaY))) {
      if (!isPullingRef.current) {
        startYRef.current = null;
        startXRef.current = null;
      }
      return;
    }

    if (window.scrollY > 2) {
      startYRef.current = null;
      startXRef.current = null;
      setPullDistance(0);
      return;
    }

    if (deltaY > 12) {
      isPullingRef.current = true;
      const damped = Math.min(deltaY * 0.45, MAX_PULL);
      setPullDistance(damped);
    }
  };

  const runRefresh = async () => {
    setIsRefreshing(true);
    setPullDistance(54);

    try {
      if (!navigator.onLine) {
        showToast('Sin conexión a internet. Mostrando catálogo guardado.', 'warning');
      } else {
        await reloadFromSupabase();
        if ('serviceWorker' in navigator) {
          const reg = await navigator.serviceWorker.getRegistration();
          await reg?.update().catch(() => {});
        }
        showToast('¡Catálogo actualizado con los últimos cambios!', 'success');
      }
    } catch {
      showToast('No se pudo actualizar en este momento.', 'warning');
    } finally {
      setIsRefreshing(false);
      setPullDistance(0);
    }
  };

  const handleTouchEnd = () => {
    if (startYRef.current === null) return;

    const triggered = isPullingRef.current && pullDistance >= PULL_THRESHOLD;
    startYRef.current = null;
    startXRef.current = null;
    isPullingRef.current = false;

    if (triggered && !isRefreshing) {
      void runRefresh();
    } else {
      setPullDistance(0);
    }
  };

  const isVisible = pullDistance > 8 || isRefreshing;
  const isReady = pullDistance >= PULL_THRESHOLD;

  return (
    <div
      className="relative flex-1 flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {/* Native-style Pull-to-Refresh floating indicator */}
      {isVisible && (
        <div
          className="fixed left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-150"
          style={{
            top: `calc(env(safe-area-inset-top, 0px) + ${Math.min(pullDistance, 72) + 8}px)`
          }}
        >
          <div
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full shadow-xl border text-xs font-black backdrop-blur-md transition-colors ${
              isRefreshing || isReady
                ? 'bg-[#FA436B] text-white border-rose-300'
                : 'bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            <RefreshCw
              className={`w-4 h-4 shrink-0 ${isRefreshing ? 'animate-spin' : ''}`}
              style={
                !isRefreshing
                  ? { transform: `rotate(${Math.min(pullDistance * 4, 360)}deg)` }
                  : undefined
              }
            />
            <span className="whitespace-nowrap">
              {isRefreshing
                ? 'Actualizando catálogo...'
                : isReady
                ? 'Suelta para actualizar'
                : 'Desliza para actualizar'}
            </span>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};
