import { Product, CategoryId } from '../types';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  icon: string;
  color: string;
  description: string;
  image: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'belleza',
    name: 'Belleza & Skincare',
    icon: 'Sparkles',
    color: 'from-pink-500 to-rose-600',
    description: 'Pestañas, Uñas, Lentes y FREZYDERM',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tecnologia',
    name: 'Tecnología',
    icon: 'Smartphone',
    color: 'from-blue-600 to-cyan-600',
    description: 'Cargadores y Lentes Inteligentes',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'audio',
    name: 'Audio & Linbox',
    icon: 'Speaker',
    color: 'from-violet-600 to-purple-600',
    description: 'Buffer Linbox y Micrófonos',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'moda',
    name: 'Morrales & Moda',
    icon: 'ShoppingBag',
    color: 'from-amber-500 to-orange-600',
    description: 'Morral Varón Antirrobo y Dama',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'juguetes',
    name: 'Juguetes Niños',
    icon: 'Gamepad2',
    color: 'from-emerald-500 to-teal-600',
    description: 'Carros acrobáticos y Pistas LED',
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'libreria',
    name: 'Librería',
    icon: 'BookOpen',
    color: 'from-indigo-500 to-blue-600',
    description: 'Papelería Kawaii y Resaltadores',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'regalos',
    name: 'Regalos',
    icon: 'Gift',
    color: 'from-red-500 to-rose-500',
    description: 'Cajas sorpresa y Peluches',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'celulares',
    name: 'Celulares & Fundas',
    icon: 'Smartphone',
    color: 'from-amber-400 to-rose-500',
    description: 'Fundas estéticas, protectores y accesorios',
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ropa_mujer',
    name: 'Ropa de Mujer',
    icon: 'ShoppingBag',
    color: 'from-pink-600 to-rose-600',
    description: 'Vestidos, tops, enterizos y tendencias',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hogar',
    name: 'Hogar & Vida',
    icon: 'Home',
    color: 'from-emerald-500 to-teal-600',
    description: 'Organizadores, termos y decoración',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'joyeria',
    name: 'Joyería & Accesorios',
    icon: 'Sparkles',
    color: 'from-yellow-500 to-amber-600',
    description: 'Collares, lentes, anillos y bisutería',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80'
  }
];

export interface SheinCircularCategory {
  id: CategoryId | 'todos';
  name: string;
  image: string;
}

export const SHEIN_CIRCULAR_CATEGORIES: SheinCircularCategory[] = [
  { id: 'ropa_mujer', name: 'Mujer', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80' },
  { id: 'ropa_mujer', name: 'Curvy', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80' },
  { id: 'juguetes', name: 'Niños', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=300&q=80' },
  { id: 'moda', name: 'Hombre', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' },
  { id: 'tecnologia', name: 'Automotriz', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=300&q=80' },
  { id: 'ropa_mujer', name: 'Partes superiores', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80' },
  { id: 'ropa_mujer', name: 'Pantalones y faldas', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=300&q=80' },
  { id: 'ropa_mujer', name: 'Enterizos', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=300&q=80' },
  { id: 'joyeria', name: 'Joyería y Acc.', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80' },
  { id: 'belleza', name: 'Belleza y Skincare', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80' },
  { id: 'celulares', name: 'Celulares y Fundas', image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=300&q=80' },
  { id: 'hogar', name: 'Hogar y Vida', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80' },
  { id: 'juguetes', name: 'Juguetes y Juegos', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=300&q=80' },
  { id: 'juguetes', name: 'Bebé', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=300&q=80' },
  { id: 'libreria', name: 'Útiles y Oficina', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=300&q=80' },
  { id: 'ropa_mujer', name: 'Bodysuits', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=300&q=80' }
];

export const PRODUCTS: Product[] = [
  // --- PRODUCTOS DESTACADOS TIPO SHEIN (Exactos de la imagen) ---
  {
    id: 'shein-case-dots',
    name: 'Funda para Celular Polka Dots & Corazones Minimalist',
    subtitle: 'Carcasa estética de silicona suave con patrón de puntos y corazones',
    category: 'celulares',
    categoryName: 'Celulares & Fundas',
    price: 10.30,
    originalPrice: 22.00,
    rating: 4.9,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    description: 'Funda protectora estética con diseño minimalista de corazones y lunares. Protección antigolpes para cámara y bordes reforzados.',
    highlights: ['Borde de silicona antigolpes', 'Acabado mate sedoso', 'Compatible con carga inalámbrica'],
    variants: [
      { id: 'dots-crema', name: 'Crema / Puntos Negros' },
      { id: 'dots-rosa', name: 'Rosa Pastel / Corazones' },
      { id: 'dots-negro', name: 'Negro Minimal' }
    ],
    stock: 45
  },
  {
    id: 'shein-pet-overalls',
    name: 'Enterizo Overalls Divertido para Perro Mascota',
    subtitle: 'Disfraz enterizo con diseño de overol de mezclilla suave',
    category: 'mascotas',
    categoryName: 'Moda & Mascotas',
    price: 20.38,
    originalPrice: 38.00,
    rating: 4.9,
    reviewsCount: 289,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    description: 'Enterizo cómodo y suave para perros y gatos. Tela elástica transpirable que permite libre movimiento para paseos o fotos virales.',
    highlights: ['100% Algodón suave', 'Fácil de lavar', 'Broches de ajuste rápido'],
    variants: [
      { id: 'overalls-s', name: 'Talla S (Razas pequeñas)' },
      { id: 'overalls-m', name: 'Talla M (Pug / Frenchie)' },
      { id: 'overalls-l', name: 'Talla L (Cocker / Mediano)', priceModifier: 4.00 }
    ],
    stock: 28
  },
  {
    id: 'shein-case-glitter',
    name: 'Funda Glitter Brillante Transparente Anti-Caídas',
    subtitle: 'Funda con destellos brillantes en degradé premium',
    category: 'celulares',
    categoryName: 'Celulares & Fundas',
    price: 9.29,
    originalPrice: 19.90,
    rating: 4.8,
    reviewsCount: 412,
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    badge: 'Oferta Top',
    description: 'Carcasa transparente con destellos de purpurina incrustada que nunca se desprenden ni decoloran. Acrílico rígido con esquinas con cámara de aire.',
    highlights: ['Glitter de larga duración', 'Bordes biselados', 'Protección militar anti-caídas'],
    variants: [
      { id: 'glitter-plata', name: 'Destellos Plateados' },
      { id: 'glitter-rose', name: 'Oro Rosa Glitter' },
      { id: 'glitter-purpura', name: 'Púrpura Galáctico' }
    ],
    stock: 60
  },
  {
    id: 'shein-vestido-floral',
    name: 'Vestido Bohemio Floral de Verano Escote V',
    subtitle: 'Corte acampanado con tirantes ajustables y caída fluida',
    category: 'ropa_mujer',
    categoryName: 'Ropa de Mujer',
    price: 34.90,
    originalPrice: 65.00,
    rating: 4.9,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    description: 'Vestido floral fresco y vaporoso, perfecto para salidas casuales o eventos. Tejido suave con cintura elástica que favorece la silueta.',
    highlights: ['Tejido transpirable fresco', 'Estampado de alta definición', 'Tirantes regulables'],
    variants: [
      { id: 'vestido-s', name: 'Talla S (36)' },
      { id: 'vestido-m', name: 'Talla M (38)' },
      { id: 'vestido-l', name: 'Talla L (40)' }
    ],
    stock: 35
  },
  // 1. Crema solar FREZYDERM
  {
    id: 'frezyderm-velvet-spf50',
    name: 'Protector Solar FREZYDERM Velvet Second Skin SPF 50+',
    subtitle: 'Tecnología Second Skin con efecto mate aterciopelado',
    category: 'belleza',
    categoryName: 'Belleza & Skincare',
    price: 135.00,
    originalPrice: 159.00,
    rating: 4.9,
    reviewsCount: 148,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    description: 'Protector solar facial mate aterciopelado sin brillo.',
    highlights: [
      'Toque seco mate',
      'SPF 50+ UVA/UVB',
      'Efecto primer',
      'Resistente al agua'
    ],
    variants: [
      { id: 'transparente-50ml', name: 'Transparent Velvet 50ml' },
      { id: 'color-50ml', name: 'Color Velvet (Toque de Color) 50ml', priceModifier: 6.00 }
    ],
    stock: 24
  },

  // 2. Buffer Linbox
  {
    id: 'buffer-linbox-subwoofer',
    name: 'Parlante Buffer Linbox Bluetooth con Luces RGB Dinámicas',
    subtitle: 'Sonido estéreo de alta fidelidad con Super Bass envolvente',
    category: 'audio',
    categoryName: 'Audio & Linbox',
    price: 89.90,
    originalPrice: 120.00,
    rating: 4.8,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    badge: 'Oferta Top',
    description: 'Buffer potente con graves profundos y luces LED sincronizadas.',
    highlights: [
      'Super Bass 25W',
      'Luces LED RGB',
      'Batería 8 horas',
      'Bluetooth 5.3'
    ],
    variants: [
      { id: 'linbox-negro', name: 'Color Negro Cyber' },
      { id: 'linbox-camuflaje', name: 'Camuflaje Militar', priceModifier: 5.00 },
      { id: 'linbox-azul', name: 'Azul Eléctrico' }
    ],
    stock: 18
  },

  // 3. Pestañas
  {
    id: 'pestanas-magneticas-kit',
    name: 'Kit Pestañas Magnéticas 3D + Delineador Líquido Especial',
    subtitle: 'Colocación instantánea sin pegamento ni irritaciones',
    category: 'belleza',
    categoryName: 'Belleza & Skincare',
    price: 38.00,
    originalPrice: 49.00,
    rating: 4.8,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=800&q=80',
    badge: 'Novedad',
    description: 'Pestañas magnéticas 3D reutilizables sin pegamento.',
    highlights: [
      'Microimanes seguros',
      'Reutilizables 30x',
      'Sin pegamento',
      'Delineador incluido'
    ],
    variants: [
      { id: 'pack-natural', name: 'Pack Efecto Natural Diario' },
      { id: 'pack-glamour', name: 'Pack Volumen Ruso / Glamour', priceModifier: 4.00 }
    ],
    stock: 35
  },

  // 4. Lentes de Contacto
  {
    id: 'lentes-contacto-freshlook',
    name: 'Lentes de Contacto Cosméticos de Color Natural (Par Anual)',
    subtitle: 'Pigmentación 3 tonos para una mirada brillante y profunda',
    category: 'belleza',
    categoryName: 'Belleza & Skincare',
    price: 45.00,
    originalPrice: 60.00,
    rating: 4.7,
    reviewsCount: 63,
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
    badge: 'Garantía 100%',
    description: 'Lentes de contacto de color anuales de alta transpirabilidad.',
    highlights: [
      'Duración anual',
      '40% hidratación',
      'Tono natural',
      'Estuche gratis'
    ],
    variants: [
      { id: 'gris-cristal', name: 'Gris Cristalino / Pure Gray' },
      { id: 'avellana-honey', name: 'Avellana Miel / Honey Brown' },
      { id: 'verde-esmeralda', name: 'Verde Esmeralda Natural' },
      { id: 'azul-zafiro', name: 'Azul Zafiro / Sapphire' }
    ],
    stock: 40
  },

  // 5. Uñas Press-On & Lámpara
  {
    id: 'unas-press-on-luxury',
    name: 'Kit de Uñas Press-On Reutilizables de Salón + Adhesivos',
    subtitle: 'Manicura perfecta de salón en menos de 5 minutos',
    category: 'belleza',
    categoryName: 'Belleza & Skincare',
    price: 25.00,
    originalPrice: 35.00,
    rating: 4.9,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    description: 'Set de 24 uñas acrílicas press-on con adhesivos.',
    highlights: [
      '24 uñas surtidas',
      'Fórmula waterproof',
      'Reutilizables',
      'Kit con adhesivos'
    ],
    variants: [
      { id: 'frances-almendra', name: 'Francés Clásico Almendra' },
      { id: 'glitter-rosegold', name: 'Glitter Rose Gold Elegante' },
      { id: 'nude-minimalista', name: 'Nude Minimalista Coquette' }
    ],
    stock: 50
  },

  // 6. Extensiones Capilares
  {
    id: 'extensiones-capilares-clip',
    name: 'Extensiones de Cabello Ondas de Sirena con Clip Invisible',
    subtitle: 'Fibra orgánica termo-resistente sedosa de 60 cm',
    category: 'belleza',
    categoryName: 'Belleza & Skincare',
    price: 55.00,
    originalPrice: 75.00,
    rating: 4.8,
    reviewsCount: 57,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    badge: 'Novedad',
    description: 'Extensiones con clips invisibles que no dañan tu cabello.',
    highlights: [
      'Largo 60 cm',
      'Clips invisibles',
      'Fibra sedosa',
      'Termo-resistente'
    ],
    variants: [
      { id: 'negro-azabache', name: 'Negro Azabache 1B' },
      { id: 'castano-chocolate', name: 'Castaño Chocolate Cálido' },
      { id: 'rubio-balayage', name: 'Rubio Caramelo Balayage', priceModifier: 5.00 }
    ],
    stock: 22
  },

  // 7. Productos Coreanos (K-Beauty)
  {
    id: 'kbeauty-snail-mucin-cosrx',
    name: 'COSRX Sérum Reparador Advanced Snail 96 Mucin Power (100ml)',
    subtitle: '96% de mucina de caracol filtrada para piel de porcelana',
    category: 'belleza',
    categoryName: 'Belleza & Skincare',
    price: 78.00,
    originalPrice: 95.00,
    rating: 5.0,
    reviewsCount: 230,
    image: 'https://images.unsplash.com/photo-1608248597359-0a56e26715b4?auto=format&fit=crop&w=800&q=80',
    badge: 'K-Beauty',
    description: 'Esencia coreana viral para efecto piel de cristal.',
    highlights: [
      '96% baba caracol',
      'Glass Skin coreano',
      'Repara la piel',
      '100ml original'
    ],
    stock: 30
  },

  // 8. Morral Varón
  {
    id: 'morral-varon-antirrobo',
    name: 'Morral Bandolera Oxford Impermeable Antirrobo para Varón',
    subtitle: 'Con candado de clave TSA y puerto de carga USB exterior',
    category: 'moda',
    categoryName: 'Morrales & Estilo',
    price: 64.90,
    originalPrice: 85.00,
    rating: 4.9,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    description: 'El morral urbano definitivo para hombre. Confeccionado en tela Oxford de grado militar resistente a cortes y al agua. Posee cerradura numérica antirrobo, compartimentos acolchados para tablet de 9.7", billetera, celular y puerto USB integrado.',
    highlights: [
      'Cerradura de combinación numérica de 3 dígitos',
      'Salida USB externa para conectar tu powerbank por dentro',
      'Espaldar con malla transpirable ergonómica y bolsillo oculto',
      'Correa ambidiestra intercambiable izquierda / derecha'
    ],
    variants: [
      { id: 'varon-negro', name: 'Negro Carbón Mate' },
      { id: 'varon-gris', name: 'Gris Grafito Oxford' },
      { id: 'varon-azul', name: 'Azul Marino Ejecutivo' }
    ],
    stock: 28
  },

  // 9. Morral Dama
  {
    id: 'morral-dama-mini-mochila',
    name: 'Morral Mini Mochila Urbana Chic para Dama Cuero PU',
    subtitle: 'Diseño minimalista con herrajes dorados y correa desmontable',
    category: 'moda',
    categoryName: 'Morrales & Estilo',
    price: 58.00,
    originalPrice: 79.00,
    rating: 4.8,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    badge: 'Oferta Top',
    description: 'Hermosa mochila y morral 2 en 1 para mujer, confeccionada en fino cuero vegano PU suave al tacto con costuras reforzadas. Su diseño compacto y versátil te permite usarla al hombro o cruzada.',
    highlights: [
      'Cuero sintético impermeable fácil de limpiar',
      'Múltiples bolsillos organizadores con forro satinado',
      'Cierres de metal pulido anticorrosión'
    ],
    variants: [
      { id: 'dama-negro', name: 'Negro Clásico' },
      { id: 'dama-beige', name: 'Beige Crema Vainilla' },
      { id: 'dama-rosa', name: 'Rosa Palo Pastel' }
    ],
    stock: 32
  },

  // 10. Accesorios & Bisutería
  {
    id: 'set-accesorios-joyeria',
    name: 'Set Collar + Aretes Acero Quirúrgico Baño Dorado 18k',
    subtitle: 'Hipoalergénico, no pierde el brillo ni se despinta con el agua',
    category: 'moda',
    categoryName: 'Morrales & Estilo',
    price: 32.00,
    originalPrice: 45.00,
    rating: 4.9,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    badge: 'Novedad',
    description: 'Elegante juego de dije y aretes con finos acabados y dije en circonitas cúbicas brillantes. Fabricado en acero de titanio inoxidable que puedes usar a diario, en la ducha o piscina sin temor a manchas.',
    highlights: [
      '100% libre de níquel, apto para pieles alérgicas',
      'Cadena ajustable de 40 a 45 cm',
      'Viene en cajita acolchada lista para regalo'
    ],
    variants: [
      { id: 'dije-trebol', name: 'Trébol de la Buena Fortuna' },
      { id: 'dije-mariposa', name: 'Mariposa de Circonias' },
      { id: 'dije-corazon', name: 'Corazón Doble Enlazado' }
    ],
    stock: 45
  },

  // 11. Regalos & Cajas sorpresa
  {
    id: 'caja-regalo-osito-sorpresa',
    name: 'Caja Regalo Sorpresa "Amor & Cariño" con Peluche y Chocolates',
    subtitle: 'El detalle perfecto listo para entregar con lazo y dedicatoria',
    category: 'regalos',
    categoryName: 'Regalos & Detalles',
    price: 49.00,
    originalPrice: 65.00,
    rating: 5.0,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    description: 'Espectacular caja rígida de regalo con ventana transparente. Contiene un suave osito de felpa premium con lazo, caja de finos bombones Ferrero Rocher, luces LED micro-hadas y tarjeta con mensaje personalizado para WhatsApp.',
    highlights: [
      'Peluche antialérgico hipoalergénico ultra esponjoso',
      'Incluye iluminación mágica LED integrada dentro de la caja',
      'Podemos añadir una dedicatoria escrita a mano'
    ],
    variants: [
      { id: 'peluche-miel', name: 'Osito Color Miel Cálido' },
      { id: 'peluche-blanco', name: 'Osito Blanco Nieve' }
    ],
    stock: 19
  },

  // 12. Juguetes Niños
  {
    id: 'carro-acrobatico-360',
    name: 'Carro Acrobático 4x4 Stunt Car Control Remoto con Luces LED',
    subtitle: 'Gira 360°, sube escalones y rueda sobre cualquier terreno',
    category: 'juguetes',
    categoryName: 'Juguetes para Niños',
    price: 69.90,
    originalPrice: 90.00,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=800&q=80',
    badge: 'Oferta Top',
    description: 'Increíble vehículo acrobático a radiocontrol de 2.4 GHz sin interferencias. Su chasis reversible de doble cara le permite seguir rodando incluso al chocar o volcarse. Equipado con luces LED delanteras y traseras de alta intensidad.',
    highlights: [
      'Giros y volteretas de 360 grados automáticos',
      'Batería recargable USB de litio de larga duración',
      'Llantas de goma de tracción todo terreno (pasto, alfombra, pista)'
    ],
    variants: [
      { id: 'carro-rojo', name: 'Rojo Fuego' },
      { id: 'carro-azul', name: 'Azul Neón' },
      { id: 'carro-verde', name: 'Verde Eléctrico' }
    ],
    stock: 25
  },

  // 13. Pista de carreras luminosa
  {
    id: 'pista-magica-glow',
    name: 'Pista de Carreras Mágica Flexible que Brilla en la Oscuridad (150 pcs)',
    subtitle: 'Rieles ensamblables que se doblan en cualquier forma',
    category: 'juguetes',
    categoryName: 'Juguetes para Niños',
    price: 49.90,
    originalPrice: 65.00,
    rating: 4.8,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    badge: 'Novedad',
    description: 'Pista de carreras de tecnología Serpentine con piezas de colores fluorescentes que se encastran a presión con un clic. Incluye un autito de carreras motorizado con 5 luces LED que iluminan la pista al avanzar a gran velocidad.',
    highlights: [
      '150 rieles articulados que giran 360 grados',
      'Auto de carreras LED de alta velocidad incluido',
      'Material ABS no tóxico ultra resistente'
    ],
    stock: 20
  },

  // 14. Librería Kawaii
  {
    id: 'set-libreria-kawaii-completo',
    name: 'Super Set de Papelería Kawaii & Resaltadores Pastel (30 piezas)',
    subtitle: 'Cuaderno anillado con stickers, marcadores de doble punta y estuche',
    category: 'libreria',
    categoryName: 'Librería & Papelería',
    price: 35.00,
    originalPrice: 48.00,
    rating: 4.9,
    reviewsCount: 115,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    description: 'El kit escolar y universitario más tierno y completo. Incluye set de 6 resaltadores pastel doble punta que no traspasan la hoja, 6 lapiceros de tinta gel borrable con goma térmica, un cuaderno pasta dura anillado A5 y un estuche acrílico multiuso.',
    highlights: [
      'Tinta base agua no tóxica de secado instantáneo',
      'Colores pasteles aesthetic ideales para apuntes limpios',
      'Incluye láminas de stickers decorativos resistentes al agua'
    ],
    variants: [
      { id: 'edicion-gatito', name: 'Tema Gatitos Rosados' },
      { id: 'edicion-osito', name: 'Tema Ositos Caramelo' },
      { id: 'edicion-astronauta', name: 'Tema Espacial Galaxia' }
    ],
    stock: 38
  },

  // 15. Micrófonos inalámbricos
  {
    id: 'microfono-inalambrico-lavalier',
    name: 'Micrófono Lavalier Inalámbrico Doble para Celular (Plug & Play)',
    subtitle: 'Cancelación activa de ruido con receptor Tipo C y Lightning iPhone',
    category: 'audio',
    categoryName: 'Audio & Linbox',
    price: 52.00,
    originalPrice: 70.00,
    rating: 4.9,
    reviewsCount: 134,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    description: 'Micrófonos solaperos profesionales para creadores de contenido, TikTok, Instagram Reels, entrevistas y transmisiones en vivo. No necesita Bluetooth ni aplicaciones: solo conecta el receptor a tu teléfono y habla con nitidez de estudio.',
    highlights: [
      'Incluye 2 transmisores solaperos (pueden hablar 2 personas a la vez)',
      'Chip DSP con cancelación de ruido ambiental de 3 niveles',
      'Alcance de hasta 20 metros de transmisión nítida sin latencia',
      'Compatible con iPhone, iPad, Samsung, Xiaomi y Android'
    ],
    variants: [
      { id: 'mic-tipo-c', name: 'Conector Tipo C (Android y iPhone 15/16)' },
      { id: 'mic-lightning', name: 'Conector Lightning (iPhone 14 y anteriores)' },
      { id: 'mic-combo-dual', name: 'Combo Completo con Ambos Adaptadores', priceModifier: 7.00 }
    ],
    stock: 29
  },

  // 16. Lentes Inteligentes
  {
    id: 'lentes-inteligentes-bluetooth',
    name: 'Lentes Inteligentes Smart Glasses con Audio Estéreo Bluetooth',
    subtitle: 'Parlantes de conducción aérea, manos libres y protección UV400',
    category: 'tecnologia',
    categoryName: 'Tecnología & Gadgets',
    price: 99.00,
    originalPrice: 139.00,
    rating: 4.7,
    reviewsCount: 68,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    badge: 'Novedad',
    description: 'Lentes de sol vanguardistas que combinan diseño de moda con tecnología de audio direccional. Escucha tu música favorita, podcasts o responde llamadas telefónicas mientras mantienes tus oídos libres y escuchas el entorno de forma segura.',
    highlights: [
      'Bluetooth 5.2 de baja latencia con sonido envolvente',
      'Lentes polarizadas UV400 anti-reflejo y anti-fatiga visual',
      'Control táctil en la patilla para pausar, cambiar canción y llamar',
      'Batería con autonomía de 5 horas continuas de música'
    ],
    variants: [
      { id: 'montura-negro-polarizado', name: 'Montura Negra / Lente Oscuro Polarizado' },
      { id: 'montura-transparente-blueblock', name: 'Lente Transparente con Filtro de Luz Azul PC', priceModifier: 5.00 }
    ],
    stock: 15
  },

  // 17. Cargadores rápidos
  {
    id: 'cargador-rapido-gan-65w',
    name: 'Cargador Rápido GaN 65W Turbo Dual Port Type-C + USB-A',
    subtitle: 'Carga tu celular al 60% en solo 25 minutos y laptops compatibles',
    category: 'tecnologia',
    categoryName: 'Tecnología & Gadgets',
    price: 49.90,
    originalPrice: 65.00,
    rating: 5.0,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    badge: 'Garantía 100%',
    description: 'Cargador de pared de nitruro de galio (GaN) con alta eficiencia energética y tamaño compacto. Compatible con protocolos de carga rápida Power Delivery 3.0, Quick Charge 4.0, Super Fast Charging de Samsung y Apple 20W/30W.',
    highlights: [
      'Protección inteligente contra sobrecalentamiento y picos de voltaje',
      'Puede cargar 2 dispositivos a máxima velocidad simultáneamente',
      'Tamaño 40% más pequeño que los cargadores convencionales'
    ],
    variants: [
      { id: 'cargador-blanco', name: 'Color Blanco Perla' },
      { id: 'cargador-negro', name: 'Color Negro Mate' }
    ],
    stock: 44
  },

  // 18. Adaptadores
  {
    id: 'adaptador-hub-6en1-usbc',
    name: 'Adaptador Hub USB-C Multifunción 6 en 1 Metálico',
    subtitle: 'Salida HDMI 4K, 3 puertos USB 3.0 de alta velocidad y Carga PD 100W',
    category: 'tecnologia',
    categoryName: 'Tecnología & Gadgets',
    price: 45.00,
    originalPrice: 60.00,
    rating: 4.8,
    reviewsCount: 104,
    image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80',
    badge: 'Oferta Top',
    description: 'Conecta tu laptop, tablet o celular a pantallas grandes o proyectores con resolución nítida 4K Ultra HD. Carcasa de aleación de aluminio aeroespacial que disipa el calor eficientemente.',
    highlights: [
      'Puerto HDMI 4K a 30Hz con transmisión sin retraso',
      '3 puertos USB 3.0 con velocidad de transferencia de 5Gbps',
      'Puerto USB-C PD con soporte de carga de hasta 100W',
      'Carcasa de aluminio blindada anti-interferencias'
    ],
    variants: [
      { id: 'hub-gris-espacial', name: 'Gris Espacial Space Gray' },
      { id: 'hub-plata', name: 'Plata Brillante Silver' }
    ],
    stock: 35
  }
];

export const PROMO_SLIDES = [
  {
    id: 'promo-1',
    title: '¡Super Promoción de Bienvenida!',
    subtitle: 'Usa el cupón ALMACEN10 y obtén 10% de descuento en tu primer pedido',
    tag: 'Cupón: ALMACEN10',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-red-600 to-rose-700',
    buttonText: 'Aprovechar Ahora',
    targetCategory: 'belleza' as CategoryId
  },
  {
    id: 'promo-2',
    title: 'FREZYDERM & Cosmética de Culto',
    subtitle: 'El auténtico protector solar Velvet Second Skin mate con stock exclusivo',
    tag: 'Top Ventas',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-amber-600 to-yellow-600',
    buttonText: 'Ver FREZYDERM',
    targetCategory: 'belleza' as CategoryId
  },
  {
    id: 'promo-3',
    title: 'Parlantes Linbox & Audio Potente',
    subtitle: 'Bajos profundos con subwoofer y micrófonos inalámbricos para videos',
    tag: 'Lanzamiento',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-blue-600 to-indigo-700',
    buttonText: 'Explorar Linbox',
    targetCategory: 'audio' as CategoryId
  },
  {
    id: 'promo-4',
    title: 'Morrales Antirrobo & Moda Urbana',
    subtitle: 'Seguridad con candado TSA, puerto de carga USB y estilo premium',
    tag: 'Delivery Express',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-emerald-600 to-teal-700',
    buttonText: 'Ver Morrales',
    targetCategory: 'moda' as CategoryId
  }
];
