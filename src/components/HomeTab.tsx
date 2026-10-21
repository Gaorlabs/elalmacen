import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, SHEIN_CIRCULAR_CATEGORIES, SheinCircularCategory } from '../data/products';
import { BUSINESS_CONFIG } from '../data/shipping';
import { ProductCard } from './ProductCard';
import { CategoryId, Product } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  ArrowRight,
  Clock,
  Zap,
  Tag,
  ShieldCheck
} from 'lucide-react';

export const HomeTab: React.FC = () => {
  const { setSelectedCategory, setActiveTab, openProductDetail, selectedCategory } = useApp();

  // Banner slide index (0: Official Brand Portada with Logo, 1: SHEIN Mega Promo, 2: Flash Sale)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto rotate slides every 6.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === 2 ? 0 : prev + 1));
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  // Flash sale countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 42, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Category bubbles scroll ref
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      categoryScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (catId: CategoryId | 'todos') => {
    setSelectedCategory(catId);
    // Smooth scroll down to products section if on same page
    const el = document.getElementById('catalog-products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3 Exact Featured Products from the user's SHEIN screenshot:
  const sheinCaseDots = PRODUCTS.find(p => p.id === 'shein-case-dots') || PRODUCTS[0];
  const sheinPetOveralls = PRODUCTS.find(p => p.id === 'shein-pet-overalls') || PRODUCTS[1];
  const sheinCaseGlitter = PRODUCTS.find(p => p.id === 'shein-case-glitter') || PRODUCTS[2];

  const featuredBannerCards = [
    {
      product: sheinCaseDots,
      price: '10.30',
      label: 'Funda Polka Dots',
      image: sheinCaseDots.image
    },
    {
      product: sheinPetOveralls,
      price: '20.38',
      label: 'Enterizo Overalls Mascota',
      image: sheinPetOveralls.image
    },
    {
      product: sheinCaseGlitter,
      price: '9.29',
      label: 'Funda Glitter Transparente',
      image: sheinCaseGlitter.image
    }
  ];

  // Filter products for sections
  const flashSaleProducts = PRODUCTS.slice(0, 6);
  const displayedProducts = selectedCategory === 'todos' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-6 sm:space-y-8 pb-20 select-none">
      
      {/* 1. MEGA PORTADA & CAROUSEL (Con Logo oficial en lugar de flores y el color de la web) */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl bg-gradient-to-r from-[#FA436B] via-[#FF5876] to-[#FA7088] text-white min-h-[300px] sm:min-h-[340px] flex items-center">
        
        {/* Subtle decorative sparkles in background */}
        <div className="absolute top-4 left-1/4 text-white/30 text-2xl font-serif pointer-events-none select-none">
          ✦
        </div>
        <div className="absolute bottom-6 left-12 text-white/30 text-xl font-serif pointer-events-none select-none">
          ✧
        </div>
        <div className="absolute top-8 right-1/3 text-white/20 text-3xl font-serif pointer-events-none select-none">
          ✦
        </div>
        <div className="absolute top-12 left-10 text-yellow-300/40 text-lg pointer-events-none select-none animate-pulse">
          ★
        </div>
        <div className="absolute bottom-10 right-16 text-yellow-300/40 text-xl pointer-events-none select-none animate-pulse">
          ★
        </div>

        {/* SLIDE 0: LA GRAN PORTADA OFICIAL (Logo en lugar de flores, colores vivos de la web) */}
        {currentSlide === 0 && (
          <div className="w-full relative z-10 px-4 sm:px-10 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 transition-all duration-500 animate-fadeIn">
            {/* Left: Typography & Badges */}
            <div className="w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-[11px] sm:text-xs font-black tracking-wide border border-white/30 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>PORTADA OFICIAL &bull; EL ALMACÉN</span>
                <span className="text-yellow-300">✦</span>
              </div>

              <h1 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight text-white uppercase drop-shadow-sm">
                TODO EN SOLO LUGAR<br />
                <span className="text-yellow-200 tracking-normal text-xl sm:text-3xl md:text-4xl">NOVEDADES &bull; MODA &bull; REGALOS</span>
              </h1>

              <p className="text-xs sm:text-sm text-white/95 font-medium max-w-md leading-relaxed">
                Cosmética, Morrales, Juguetes, Tecnología y Regalos con los mejores precios del mercado. ¡Envíos rápidos a todo el Perú!
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-[11px] font-bold text-white/90">
                <span className="bg-white/15 px-2.5 py-1 rounded-sm border border-white/20 flex items-center gap-1">
                  💜 Yape: {BUSINESS_CONFIG.whatsappDisplay}
                </span>
                <span className="bg-white/15 px-2.5 py-1 rounded-sm border border-white/20 flex items-center gap-1">
                  🚚 Delivery Garantizado
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory('todos');
                    const el = document.getElementById('catalog-products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-none sm:rounded-xs bg-white text-[#FA436B] hover:bg-neutral-100 transition-all text-xs sm:text-sm font-black tracking-widest uppercase active:scale-95 shadow-lg"
                >
                  VER CATÁLOGO
                </button>

                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hola El Almacén, vi su portada oficial y deseo realizar una consulta.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-none sm:rounded-xs border-2 border-white text-white hover:bg-white/20 transition-all text-xs sm:text-sm font-black tracking-wider uppercase active:scale-95 shadow-sm inline-flex items-center gap-1.5"
                >
                  PEDIR POR WHATSAPP
                </a>
              </div>
            </div>

            {/* Right: Circular Illuminated Centerpiece with Official Brand Logo (Reemplaza las flores) */}
            <div className="w-full md:w-2/5 flex flex-col items-center justify-center relative">
              {/* Outer Golden/White Glow Aura */}
              <div className="absolute inset-0 bg-yellow-300/25 rounded-full blur-2xl scale-125 pointer-events-none" />

              {/* Circular Emblem Frame */}
              <div className="relative p-2.5 sm:p-3.5 rounded-full bg-white/25 backdrop-blur-md border-2 border-white/80 shadow-2xl flex items-center justify-center group hover:scale-105 transition-all duration-300">
                <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full bg-white flex items-center justify-center p-3 shadow-inner overflow-hidden">
                  <img
                    src={BUSINESS_CONFIG.logoUrl}
                    alt="El Almacén - Logotipo Oficial"
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Ribbon Tag Below Circle */}
                <div className="absolute -bottom-2 bg-amber-400 text-slate-900 font-black text-[9px] sm:text-[11px] px-3 sm:px-4 py-1 rounded-full shadow-lg border border-white/80 uppercase tracking-widest whitespace-nowrap">
                  ⭐ Todo en solo lugar ⭐
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 1: SHEIN MEGA PROMO BANNER (Exact look & feel from screenshot) */}
        {currentSlide === 1 && (
          <div className="w-full relative z-10 px-4 sm:px-10 py-6 sm:py-8 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 transition-all duration-500 animate-fadeIn">
            {/* Left Column: Big Bold Sale Typography & Outlined Button */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-white/95 text-xs sm:text-sm font-bold tracking-wide">
                <span>El Almacén &bull; Todo en solo lugar</span>
                <span className="text-yellow-200">✦</span>
              </div>

              <h1 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight text-white uppercase drop-shadow-sm">
                1.4M+ ARTÍCULOS<br />
                <span className="tracking-normal">POPULARES</span><br />
                REBAJADOS
              </h1>

              <div className="pt-1">
                <button
                  onClick={() => {
                    setSelectedCategory('todos');
                    const el = document.getElementById('catalog-products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-none sm:rounded-xs border-2 border-white text-white hover:bg-white hover:text-[#FA436B] transition-all text-xs sm:text-sm font-black tracking-widest uppercase active:scale-95 shadow-sm"
                >
                  AHORRA AHORA
                </button>
              </div>
            </div>

            {/* Right Column: 3 Side-by-Side Floating Product Cards matching screenshot */}
            <div className="w-full lg:w-1/2 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {featuredBannerCards.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => openProductDetail(item.product)}
                  className="group relative w-28 sm:w-36 md:w-44 flex-shrink-0 aspect-[3/4] bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border-2 border-white/80 cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 sm:py-1 rounded-full shadow-md flex items-baseline gap-0.5 whitespace-nowrap">
                    <span className="text-[10px] font-bold text-rose-600">S/</span>
                    <span className="text-xs sm:text-sm font-black text-[#FA436B]">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 2: FLASH SALE & LIQUIDACIÓN */}
        {currentSlide === 2 && (
          <div className="w-full relative z-10 px-4 sm:px-10 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 transition-all duration-500 animate-fadeIn">
            <div className="w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-yellow-300 text-xs font-black tracking-wide border border-yellow-300/30">
                <Flame className="w-3.5 h-3.5 fill-yellow-300" />
                <span>VENTA FLASH &bull; LIQUIDACIÓN</span>
              </div>

              <h1 className="font-sans font-black text-2xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight text-white uppercase drop-shadow-sm">
                HASTA 50% DSCTO<br />
                <span className="text-yellow-200">SUPER OFERTAS DE TEMPORADA</span>
              </h1>

              {/* Live countdown */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white/90">
                <span>Termina en:</span>
                <span className="bg-black/40 px-2 py-1 rounded font-mono text-yellow-300">
                  {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => {
                    setSelectedCategory('todos');
                    const el = document.getElementById('catalog-products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-none sm:rounded-xs bg-black text-white hover:bg-neutral-900 border border-white/30 transition-all text-xs sm:text-sm font-black tracking-widest uppercase active:scale-95 shadow-lg"
                >
                  VER OFERTAS FLASH
                </button>
              </div>
            </div>

            {/* Right: Featured Products Grid */}
            <div className="w-full md:w-2/5 flex items-center justify-center gap-3">
              {flashSaleProducts.slice(0, 2).map((prod, idx) => (
                <div
                  key={idx}
                  onClick={() => openProductDetail(prod)}
                  className="w-32 sm:w-36 aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-xl cursor-pointer relative group border-2 border-white/80 hover:-translate-y-1 transition-all"
                >
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-2 left-2 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                    -35%
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 px-2 py-0.5 rounded-full shadow text-xs font-black text-rose-600">
                    S/ {prod.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Carousel Side Arrows (Visual Controls) */}
        <button
          onClick={() => setCurrentSlide(prev => (prev === 0 ? 2 : prev - 1))}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all active:scale-90 z-20 cursor-pointer"
          title="Anterior"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCurrentSlide(prev => (prev === 2 ? 0 : prev + 1))}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all active:scale-90 z-20 cursor-pointer"
          title="Siguiente"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots Pagination Indicator at bottom center */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          <button
            onClick={() => setCurrentSlide(0)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              currentSlide === 0 ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            title="Portada Oficial"
          />
          <button
            onClick={() => setCurrentSlide(1)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              currentSlide === 1 ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            title="Artículos Populares"
          />
          <button
            onClick={() => setCurrentSlide(2)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              currentSlide === 2 ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            title="Venta Flash"
          />
        </div>
      </div>

      {/* 2. SHEIN CIRCULAR CATEGORY AVATARS (Exact Bubbles from screenshot) */}
      <div className="relative py-2">
        
        {/* Navigation Arrows for Categories */}
        <button
          onClick={() => scrollCategories('left')}
          className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center text-slate-700 dark:text-slate-200 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title="Desplazar categorías a la izquierda"
          aria-label="Izquierda"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => scrollCategories('right')}
          className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center text-slate-700 dark:text-slate-200 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title="Desplazar categorías a la derecha"
          aria-label="Derecha"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* 2-Row Horizontal Scrollable Bubbles Container */}
        <div
          ref={categoryScrollRef}
          className="flex flex-col gap-3 overflow-x-auto no-scrollbar scroll-smooth px-1 py-1"
        >
          {/* Row 1 (First 8 categories from screenshot) */}
          <div className="flex items-center gap-3 sm:gap-5 min-w-max">
            {SHEIN_CIRCULAR_CATEGORIES.slice(0, 8).map((cat, idx) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={`r1-${idx}`}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="flex flex-col items-center gap-1.5 w-18 sm:w-22 text-center group cursor-pointer"
                >
                  <div className={`relative w-14 h-14 sm:w-18 sm:h-18 rounded-full overflow-hidden p-0.5 transition-all duration-300 ${
                    isSelected 
                      ? 'ring-3 ring-rose-500 scale-105 shadow-md' 
                      : 'border border-slate-200 dark:border-slate-700 group-hover:scale-105 group-hover:border-rose-400'
                  }`}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                    />
                  </div>
                  <span className={`text-[10px] sm:text-xs leading-tight transition-colors line-clamp-2 max-w-[70px] sm:max-w-[85px] ${
                    isSelected ? 'font-black text-rose-600 dark:text-rose-400' : 'font-medium text-slate-800 dark:text-slate-200 group-hover:text-rose-600'
                  }`}>
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Row 2 (Second 8 categories from screenshot) */}
          <div className="flex items-center gap-3 sm:gap-5 min-w-max">
            {SHEIN_CIRCULAR_CATEGORIES.slice(8, 16).map((cat, idx) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={`r2-${idx}`}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="flex flex-col items-center gap-1.5 w-18 sm:w-22 text-center group cursor-pointer"
                >
                  <div className={`relative w-14 h-14 sm:w-18 sm:h-18 rounded-full overflow-hidden p-0.5 transition-all duration-300 ${
                    isSelected 
                      ? 'ring-3 ring-rose-500 scale-105 shadow-md' 
                      : 'border border-slate-200 dark:border-slate-700 group-hover:scale-105 group-hover:border-rose-400'
                  }`}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                    />
                  </div>
                  <span className={`text-[10px] sm:text-xs leading-tight transition-colors line-clamp-2 max-w-[70px] sm:max-w-[85px] ${
                    isSelected ? 'font-black text-rose-600 dark:text-rose-400' : 'font-medium text-slate-800 dark:text-slate-200 group-hover:text-rose-600'
                  }`}>
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. SHEIN VENTA FLASH / FLASH SALE STRIP */}
      <div className="bg-neutral-950 text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        
        {/* Flash Sale Title & Realtime Countdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm uppercase tracking-wider text-yellow-400">
            <Zap className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse" />
            <span>VENTA FLASH</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-slate-400 mr-1" />
            <span className="bg-neutral-800 text-white px-2 py-0.5 rounded text-[11px]">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-neutral-800 text-white px-2 py-0.5 rounded text-[11px]">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-neutral-800 text-white px-2 py-0.5 rounded text-[11px]">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Promo tag */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto text-xs">
          <span className="text-neutral-400 text-[11px]">
            Hasta <strong className="text-yellow-400 font-black">-60% DCTO</strong> en artículos virales
          </span>
          <button
            onClick={() => {
              setSelectedCategory('todos');
              const el = document.getElementById('catalog-products-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-black text-rose-400 hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Ver Todo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. MAIN PRODUCT CATALOG GRID (SHEIN Look: 2 cols on mobile, 4-6 on desktop) */}
      <div id="catalog-products-section" className="space-y-4 pt-2">
        <div className="flex items-center justify-between px-1 border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">
              {selectedCategory === 'todos' ? 'Artículos Populares' : `Catálogo: ${selectedCategory}`}
            </h2>
            <span className="text-xs font-bold text-slate-400">
              ({displayedProducts.length} productos)
            </span>
          </div>

          {selectedCategory !== 'todos' && (
            <button
              onClick={() => setSelectedCategory('todos')}
              className="text-xs font-black text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
            >
              Restablecer filtros
            </button>
          )}
        </div>

        {/* High Density SHEIN Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3.5">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
