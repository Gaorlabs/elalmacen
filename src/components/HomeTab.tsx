import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES, PROMO_SLIDES } from '../data/products';
import { ProductCard } from './ProductCard';
import { CategoryId } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  ArrowRight,
  TrendingUp,
  Tag,
  Speaker
} from 'lucide-react';

export const HomeTab: React.FC = () => {
  const { setSelectedCategory, setActiveTab } = useApp();

  // Carousel slider state with swipe support
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const slideInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto rotate banner every 5.5s
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % PROMO_SLIDES.length);
    }, 5500);
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, []);

  const resetInterval = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      slideInterval.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % PROMO_SLIDES.length);
      }, 5500);
    }
  };

  const handlePrevSlide = () => {
    resetInterval();
    setCurrentSlide(prev => (prev === 0 ? PROMO_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    resetInterval();
    setCurrentSlide(prev => (prev + 1) % PROMO_SLIDES.length);
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 45) {
        handleNextSlide();
      } else if (diff < -45) {
        handlePrevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleCategoryClick = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActiveTab('explorar');
  };

  // Filtered product showcases
  const bestSellers = PRODUCTS.filter(p => p.badge === 'Más Vendido' || p.badge === 'Oferta Top').slice(0, 4);
  const beautyProducts = PRODUCTS.filter(p => p.category === 'belleza').slice(0, 4);
  const techAndAudio = PRODUCTS.filter(p => p.category === 'tecnologia' || p.category === 'audio').slice(0, 4);

  return (
    <div className="space-y-6 pb-24">
      {/* Interactive Promo Slider Carousel with Touch Swipe */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-md">
        <div
          className="relative w-full aspect-16/9 sm:aspect-21/9 bg-slate-900 cursor-grab active:cursor-grabbing select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {PROMO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover brightness-65"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-3.5 sm:p-5 text-white">
                <span className="inline-block self-start px-2 py-0.5 rounded-full bg-rose-600 font-extrabold text-[9px] sm:text-[10px] tracking-wide mb-1 shadow-xs">
                  {slide.tag}
                </span>
                <h3 className="text-sm sm:text-lg font-black leading-tight drop-shadow-sm">
                  {slide.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-200 line-clamp-1 mt-0.5 mb-2.5">
                  {slide.subtitle}
                </p>
                <button
                  onClick={() => handleCategoryClick(slide.targetCategory)}
                  className="self-start px-3 py-1.5 rounded-xl bg-white text-slate-900 hover:bg-rose-50 text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <span>{slide.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
                </button>
              </div>
            </div>
          ))}

          {/* Prev / Next controls */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
            title="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
            title="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2 right-3 z-20 flex items-center gap-1">
            {PROMO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  resetInterval();
                  setCurrentSlide(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentSlide ? 'w-4 bg-rose-500' : 'w-1.5 bg-white/60'
                }`}
                title={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Categorías del Catálogo con Fotos (Con fotos grandes y nombres limpios) */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <div>
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-rose-500" />
              <span>Categorías del Catálogo</span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Explora directamente con fotos reales
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('todos');
              setActiveTab('explorar');
            }}
            className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* 7 Category photo cards in responsive grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="relative h-22 sm:h-24 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-2xs group active:scale-95 transition-all text-left"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-2 text-white">
                <span className="text-[10px] sm:text-[11px] font-black leading-tight drop-shadow-md">
                  {cat.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Compact Coupon Reminder */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-md flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Tag className="w-4 h-4 text-yellow-300" />
          </div>
          <div>
            <p className="text-xs font-black">¡10% de Descuento con Cupón!</p>
            <p className="text-[10px] text-rose-100">Código <strong className="bg-white/20 px-1 py-0.2 rounded text-white">ALMACEN10</strong> en tu canasta</p>
          </div>
        </div>
        <button
          onClick={() => {
            setSelectedCategory('todos');
            setActiveTab('explorar');
          }}
          className="px-3 py-1.5 rounded-xl bg-white text-rose-600 text-xs font-black hover:bg-rose-50 transition-colors shadow-2xs flex-shrink-0"
        >
          Comprar
        </button>
      </div>

      {/* Section 1: Top Ventas / Lo Más Pedido */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <div>
            <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>Lo Más Pedido en El Almacén</span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Productos virales con entrega inmediata
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('todos');
              setActiveTab('explorar');
            }}
            className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
          >
            Ver más
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Section 2: Especial Belleza & FREZYDERM */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <div>
            <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>Belleza, FREZYDERM & Cosmética</span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Pestañas, uñas, lentes de contacto y skincare
            </p>
          </div>
          <button
            onClick={() => handleCategoryClick('belleza')}
            className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
          >
            Ver todos
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5">
          {beautyProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Section 3: Tecnología, Buffer Linbox & Audio */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <div>
            <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <Speaker className="w-4 h-4 text-blue-500" />
              <span>Tecnología, Buffer Linbox & Audio</span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Cargadores GaN, micrófonos y parlantes Linbox
            </p>
          </div>
          <button
            onClick={() => handleCategoryClick('tecnologia')}
            className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
          >
            Ver todos
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5">
          {techAndAudio.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
