import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CartFloatingBar } from './components/CartFloatingBar';
import { HomeTab } from './components/HomeTab';
import { ExploreTab } from './components/ExploreTab';
import { FavoritesTab } from './components/FavoritesTab';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/ToastContainer';

const MainAppContent: React.FC = () => {
  const { showSplash, activeTab } = useApp();

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-slate-800 dark:text-slate-100 antialiased flex flex-col">
      {/* Naturally Responsive Container (full-width on mobile, max-w-7xl on desktop like SHEIN) */}
      <div className="w-full max-w-7xl mx-auto min-h-screen flex flex-col relative transition-colors bg-white dark:bg-slate-900 shadow-sm">
        {showSplash ? (
          <SplashScreen />
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Delivery & Store Header */}
            <Header />

            {/* Scrollable Tab Views */}
            <main className="flex-1 px-3 sm:px-4 pt-3 pb-8">
              {activeTab === 'inicio' && <HomeTab />}
              {activeTab === 'explorar' && <ExploreTab />}
              {activeTab === 'favoritos' && <FavoritesTab />}
            </main>

            {/* Floating Instant Cart Summary Bar in S/. */}
            <CartFloatingBar />

            {/* Bottom Navigation Bar */}
            <BottomNav />
          </div>
        )}

        {/* Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />

        {/* Floating notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
