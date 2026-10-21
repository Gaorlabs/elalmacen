import React, { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  withFloating?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  withFloating = false
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeMap = {
    sm: 'w-24',
    md: 'w-36',
    lg: 'w-52',
    xl: 'w-64 sm:w-72'
  };

  if (!imageError) {
    return (
      <div
        className={`relative inline-flex flex-col items-center select-none ${
          withFloating ? 'animate-float-gentle' : ''
        } ${className}`}
      >
        <img
          src="/assets/aistudio/WhatsApp_Image_2026-10-17_at_12.27.58_PM_f3242823.jpeg"
          alt="El Almacén - Todo en solo lugar"
          className={`${sizeMap[size]} h-auto object-contain rounded-2xl drop-shadow-xl transition-transform hover:scale-105 duration-300`}
          onError={() => setImageError(true)}
        />
        {showSubtitle && (
          <span className="mt-2 text-xs font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400">
            Todo en solo lugar &bull; Delivery Oficial
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${
        withFloating ? 'animate-float-gentle' : ''
      } ${className}`}
    >
      {/* High-fidelity Vector Artwork of El Almacén */}
      <svg
        viewBox="0 0 500 420"
        className={`${sizeMap[size]} h-auto drop-shadow-xl transition-transform hover:scale-105 duration-300`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bearFur" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#C47A3A" />
            <stop offset="70%" stopColor="#A25720" />
            <stop offset="100%" stopColor="#7E3A0B" />
          </radialGradient>
          <radialGradient id="bearSnout" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#F9DFB8" />
            <stop offset="100%" stopColor="#E0B67C" />
          </radialGradient>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B52B6" />
            <stop offset="50%" stopColor="#023E8A" />
            <stop offset="100%" stopColor="#03045E" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="50%" stopColor="#FFBA08" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="giftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF233C" />
            <stop offset="100%" stopColor="#B7094C" />
          </linearGradient>
          <linearGradient id="carGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF3333" />
            <stop offset="100%" stopColor="#B30000" />
          </linearGradient>
          <linearGradient id="pencilYellow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Ambient Back Glow */}
        <circle cx="250" cy="200" r="180" fill="#FDE047" opacity="0.15" filter="blur(30px)" />

        {/* Background School Elements (Left) */}
        <g id="pencils-and-stationery">
          {/* Blue Pencil Pot */}
          <rect x="95" y="145" width="55" height="75" rx="8" fill="#0284C7" stroke="#0369A1" strokeWidth="3" />
          <rect x="91" y="140" width="63" height="12" rx="4" fill="#38BDF8" />
          {/* Yellow Pencil */}
          <polygon points="108,145 108,70 118,50 128,70 128,145" fill="url(#pencilYellow)" />
          <polygon points="113,60 118,50 123,60" fill="#F59E0B" />
          <polygon points="116,54 118,50 120,54" fill="#1F2937" />
          {/* Red Pencil */}
          <polygon points="130,145 130,85 139,65 148,85 148,145" fill="#EF4444" />
          <polygon points="135,74 139,65 143,74" fill="#FDE047" />
          <polygon points="137,68 139,65 141,68" fill="#1F2937" />
          {/* Blue Pen */}
          <polygon points="146,145 146,95 154,80 162,95 162,145" fill="#2563EB" />
          {/* Red Scissors Handle */}
          <circle cx="160" cy="120" r="12" fill="none" stroke="#DC2626" strokeWidth="5" />
          <circle cx="178" cy="130" r="12" fill="none" stroke="#DC2626" strokeWidth="5" />
          {/* Notebook behind */}
          <rect x="45" y="125" width="85" height="110" rx="8" transform="rotate(-15 45 125)" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
          <rect x="35" y="155" width="75" height="95" rx="6" transform="rotate(-22 35 155)" fill="#E11D48" stroke="#9F1239" strokeWidth="3" />
        </g>

        {/* Background Gift & Toys (Right) */}
        <g id="gift-and-car">
          {/* Red Gift Box */}
          <rect x="325" y="100" width="95" height="95" rx="8" fill="url(#giftGrad)" stroke="#800F2F" strokeWidth="3" />
          {/* Golden Ribbon on Gift */}
          <rect x="365" y="100" width="16" height="95" fill="url(#goldGrad)" />
          <rect x="325" y="138" width="95" height="16" fill="url(#goldGrad)" />
          {/* Golden Bow */}
          <ellipse cx="355" cy="95" rx="18" ry="12" transform="rotate(-25 355 95)" fill="url(#goldGrad)" stroke="#B45309" strokeWidth="2" />
          <ellipse cx="385" cy="95" rx="18" ry="12" transform="rotate(25 385 95)" fill="url(#goldGrad)" stroke="#B45309" strokeWidth="2" />
          <circle cx="373" cy="98" r="8" fill="#FDE047" stroke="#B45309" strokeWidth="2" />
          
          {/* Soccer Ball */}
          <circle cx="410" cy="180" r="32" fill="#FFFFFF" stroke="#1F2937" strokeWidth="3" />
          <polygon points="410,165 422,174 418,188 402,188 398,174" fill="#1F2937" />
          <line x1="410" y1="165" x2="410" y2="150" stroke="#1F2937" strokeWidth="2" />
          <line x1="422" y1="174" x2="435" y2="170" stroke="#1F2937" strokeWidth="2" />
          <line x1="418" y1="188" x2="428" y2="200" stroke="#1F2937" strokeWidth="2" />
          <line x1="402" y1="188" x2="392" y2="200" stroke="#1F2937" strokeWidth="2" />
          <line x1="398" y1="174" x2="385" y2="170" stroke="#1F2937" strokeWidth="2" />

          {/* Red Toy Car */}
          <g id="toy-car" transform="translate(370, 195)">
            <path d="M 0 25 Q 15 5 45 5 Q 65 5 75 18 L 85 28 Q 88 35 80 40 L 0 40 Z" fill="url(#carGrad)" stroke="#7F1D1D" strokeWidth="2" />
            <path d="M 22 10 Q 42 10 58 10 L 68 22 L 15 22 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
            <circle cx="18" cy="40" r="10" fill="#1F2937" stroke="#E5E7EB" strokeWidth="3" />
            <circle cx="65" cy="40" r="10" fill="#1F2937" stroke="#E5E7EB" strokeWidth="3" />
            <circle cx="80" cy="30" r="5" fill="#FDE047" />
          </g>
        </g>

        {/* The Cute Mascot: Warm Fluffy Teddy Bear */}
        <g id="teddy-bear">
          {/* Left Ear */}
          <circle cx="205" cy="65" r="28" fill="url(#bearFur)" stroke="#5B2404" strokeWidth="3" />
          <circle cx="205" cy="65" r="16" fill="url(#bearSnout)" />
          {/* Right Ear */}
          <circle cx="295" cy="65" r="28" fill="url(#bearFur)" stroke="#5B2404" strokeWidth="3" />
          <circle cx="295" cy="65" r="16" fill="url(#bearSnout)" />
          {/* Bear Head */}
          <ellipse cx="250" cy="98" rx="65" ry="58" fill="url(#bearFur)" stroke="#5B2404" strokeWidth="3" />
          {/* Bear Cheeks / Snout */}
          <ellipse cx="250" cy="115" rx="34" ry="24" fill="url(#bearSnout)" stroke="#A25720" strokeWidth="2" />
          {/* Nose */}
          <ellipse cx="250" cy="106" rx="10" ry="7" fill="#1E1E1E" />
          <line x1="250" y1="113" x2="250" y2="122" stroke="#1E1E1E" strokeWidth="2.5" />
          {/* Friendly Smile */}
          <path d="M 242 122 Q 250 130 258 122" fill="none" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" />
          {/* Eyes with sparkle */}
          <circle cx="228" cy="95" r="7" fill="#1E1E1E" />
          <circle cx="226" cy="93" r="2.5" fill="#FFFFFF" />
          <circle cx="272" cy="95" r="7" fill="#1E1E1E" />
          <circle cx="270" cy="93" r="2.5" fill="#FFFFFF" />
          {/* Cute Rosy Cheeks */}
          <ellipse cx="218" cy="108" rx="7" ry="5" fill="#F43F5E" opacity="0.4" />
          <ellipse cx="282" cy="108" rx="7" ry="5" fill="#F43F5E" opacity="0.4" />
          {/* Paws Resting on 3D letters */}
          <ellipse cx="195" cy="148" rx="16" ry="12" fill="url(#bearFur)" stroke="#5B2404" strokeWidth="2" />
          <ellipse cx="305" cy="148" rx="16" ry="12" fill="url(#bearFur)" stroke="#5B2404" strokeWidth="2" />
        </g>

        {/* 3D "EL" in Bright Golden Yellow */}
        <g id="text-EL" filter="url(#shadowFilter)">
          {/* Blue Plaque under EL */}
          <rect x="175" y="132" width="150" height="74" rx="18" fill="#0284C7" stroke="#FFFFFF" strokeWidth="6" />
          <text
            x="250"
            y="185"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', Arial-Black, sans-serif"
            fontWeight="900"
            fontSize="54"
            fill="#FACC15"
            stroke="#B45309"
            strokeWidth="3"
            letterSpacing="2"
          >
            EL
          </text>
        </g>

        {/* Vibrant 3D "Almacén" Multi-Colored Typography */}
        <g id="text-almacen" filter="url(#shadowFilter)">
          {/* Bold White Outer Shadow/Contour for Cartoon Pop */}
          <path
            d="M 60 270 Q 150 250 250 250 Q 350 250 440 270 Q 420 320 250 325 Q 80 320 60 270 Z"
            fill="#FFFFFF"
            stroke="#0284C7"
            strokeWidth="10"
          />

          {/* Letter 'A' - Red */}
          <text x="82" y="285" fontFamily="'Plus Jakarta Sans', Arial-Black, sans-serif" fontWeight="900" fontSize="76" fill="#EF4444" stroke="#991B1B" strokeWidth="4">A</text>
          {/* Letter 'l' - Orange */}
          <text x="142" y="285" fontFamily="'Plus Jakarta Sans', Arial-Black, sans-serif" fontWeight="900" fontSize="76" fill="#F97316" stroke="#C2410C" strokeWidth="4">l</text>
          {/* Letter 'm' - Blue */}
          <text x="175" y="285" fontFamily="'Plus Jakarta Sans', Arial-Black, sans-serif" fontWeight="900" fontSize="74" fill="#0EA5E9" stroke="#0369A1" strokeWidth="4">m</text>
          {/* Letter 'a' - Orange-Yellow */}
          <text x="250" y="285" fontFamily="'Plus Jakarta Sans', Arial-Black, sans-serif" fontWeight="900" fontSize="76" fill="#F59E0B" stroke="#B45309" strokeWidth="4">a</text>
          {/* Letter 'c' - Green */}
          <text x="306" y="285" fontFamily="'Plus Jakarta Sans', Arial-Black, sans-serif" fontWeight="900" fontSize="76" fill="#10B981" stroke="#047857" strokeWidth="4">c</text>
          {/* Letter 'é' - Pink */}
          <text x="354" y="285" fontFamily="'Plus Jakarta Sans', Arial-Black, sans-serif" fontWeight="900" fontSize="76" fill="#EC4899" stroke="#BE185D" strokeWidth="4">é</text>
          {/* Letter 'n' - Purple */}
          <text x="402" y="285" fontFamily="'Plus Jakarta Sans', Arial-Black, sans-serif" fontWeight="900" fontSize="76" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="4">n</text>
        </g>

        {/* Curved Royal Blue Ribbon: "Todo en solo lugar" */}
        <g id="ribbon-slogan" filter="url(#shadowFilter)">
          {/* Golden Ribbon Edge */}
          <path
            d="M 50 325 Q 250 375 450 325 L 438 368 Q 250 415 62 368 Z"
            fill="url(#goldGrad)"
          />
          {/* Blue Ribbon Body */}
          <path
            d="M 55 330 Q 250 378 445 330 L 434 362 Q 250 408 66 362 Z"
            fill="url(#ribbonGrad)"
            stroke="#1D4ED8"
            strokeWidth="1.5"
          />
          {/* Slogan Text */}
          <text
            x="250"
            y="355"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="800"
            fontSize="26"
            fill="#FFFFFF"
            letterSpacing="1"
          >
            Todo en solo lugar
          </text>
          {/* Little Yellow Accents */}
          <circle cx="85" cy="344" r="3.5" fill="#FACC15" />
          <circle cx="415" cy="344" r="3.5" fill="#FACC15" />
        </g>

        {/* Sweet Heart Badge at bottom center */}
        <g id="heart-badge" transform="translate(235, 372)">
          <path
            d="M 15 5 C 10 -2, 0 0, 0 8 C 0 16, 15 25, 15 25 C 15 25, 30 16, 30 8 C 30 0, 20 -2, 15 5 Z"
            fill="#EF4444"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
          <path d="M 7 35 Q 15 37 23 35" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      </svg>

      {showSubtitle && (
        <span className="mt-1 text-xs font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400">
          Delivery Oficial &bull; WhatsApp Directo
        </span>
      )}
    </div>
  );
};
