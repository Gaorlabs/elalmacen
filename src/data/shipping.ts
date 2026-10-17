import { DistrictDelivery } from '../types';

export const BUSINESS_CONFIG = {
  name: 'El Almacén',
  tagline: 'Todo en solo lugar',
  whatsappNumber: '51958607999',
  whatsappDisplay: '+51 958 607 999',
  supportHours: 'Lunes a Domingo de 8:00 AM a 10:00 PM',
  city: 'Perú'
};

export const DISTRICTS: DistrictDelivery[] = [
  { id: 'sjl', name: 'San Juan de Lurigancho (Zona Centro / Canto Grande / Zárate)', fee: 7.00, estimatedTime: '45 - 90 min' },
  { id: 'cercado', name: 'Lima Cercado / Breña / Lince / Jesús María', fee: 8.00, estimatedTime: '45 - 75 min' },
  { id: 'miraflores', name: 'Miraflores / San Isidro / Barranco', fee: 10.00, estimatedTime: '40 - 70 min' },
  { id: 'surco', name: 'Santiago de Surco / San Borja / Surquillo', fee: 10.00, estimatedTime: '50 - 80 min' },
  { id: 'los_olivos', name: 'Los Olivos / San Martín de Porres / Comas', fee: 9.00, estimatedTime: '50 - 90 min' },
  { id: 'san_miguel', name: 'San Miguel / Magdalena del Mar / Pueblo Libre', fee: 9.00, estimatedTime: '45 - 75 min' },
  { id: 'la_molina', name: 'La Molina / Ate Vitarte / Santa Anita', fee: 11.00, estimatedTime: '60 - 100 min' },
  { id: 'callao', name: 'Callao / Bellavista / La Perla', fee: 12.00, estimatedTime: '60 - 110 min' },
  { id: 'chorrillos', name: 'Chorrillos / Villa El Salvador / SJM', fee: 11.00, estimatedTime: '60 - 110 min' },
  { id: 'recojo_tienda', name: '📍 Recojo en Almacén Central (¡Gratis!)', fee: 0.00, estimatedTime: 'Listo en 20 min' },
  { id: 'provincia', name: '📦 Envío a Provincias (Agencia Olva Courier / Shalom)', fee: 15.00, estimatedTime: '24 a 48 hrs' }
];

export const PAYMENT_ACCOUNTS = {
  yape: {
    name: 'Yape',
    phone: '958607999',
    phoneFormatted: '958 607 999',
    holder: 'El Almacén - Oficial',
    instructions: 'Abre tu app Yape, selecciona "Yapear", digita el número o escanea el QR, ingresa el monto total exacto y adjunta o comparte la constancia por WhatsApp.',
    badgeColor: 'bg-purple-600 text-white',
    icon: 'Smartphone'
  },
  plin: {
    name: 'Plin',
    phone: '958607999',
    phoneFormatted: '958 607 999',
    holder: 'El Almacén - Oficial',
    instructions: 'Abre tu app bancaria, selecciona "Plin", digita el número, coloca el monto y confirma tu transferencia al instante.',
    badgeColor: 'bg-teal-600 text-white',
    icon: 'Zap'
  },
  bcp: {
    name: 'BCP (Banco de Crédito)',
    accountNumber: '193-98241582-0-45',
    cci: '002-193009824158204518',
    holder: 'El Almacén E.I.R.L.',
    accountType: 'Cuenta Corriente Soles',
    instructions: 'Transfiere desde tu Banca Móvil BCP o agente a la cuenta en Soles indicada. Luego envía la captura del voucher al WhatsApp para despachar tu paquete inmediatamente.',
    badgeColor: 'bg-blue-700 text-white',
    icon: 'CreditCard'
  },
  contraentrega: {
    name: 'Pago Contra Entrega',
    holder: 'Repartidor Autorizado',
    instructions: 'Pagas en efectivo exacto o con Yape al recibir tu pedido en la puerta de tu domicilio (disponible para Lima Metropolitana previa validación telefónica).',
    badgeColor: 'bg-emerald-600 text-white',
    icon: 'Truck'
  }
};

export const DISCOUNT_COUPONS: Record<string, { type: 'percent' | 'fixed'; value: number; label: string }> = {
  'ALMACEN10': { type: 'percent', value: 10, label: '10% de descuento de bienvenida' },
  'PRIMERACOMPRA': { type: 'fixed', value: 8, label: 'S/ 8.00 de descuento en tu primera orden' },
  'DELIVERYGRATIS': { type: 'fixed', value: 10, label: 'S/ 10.00 de descuento en costo de envío' }
};

export const VALUE_PROPOSITIONS = [
  {
    icon: 'Truck',
    title: 'Entrega Express',
    desc: 'Despachos rápidos el mismo día en Lima y envíos a todo el Perú'
  },
  {
    icon: 'ShieldCheck',
    title: 'Garantía & Seguridad',
    desc: 'Productos 100% garantizados y pagos protegidos por Yape o BCP'
  },
  {
    icon: 'CheckCircle2',
    title: 'Todo en un solo lugar',
    desc: 'Variedad exclusiva en cosmética, tecnología, morrales y novedades'
  },
  {
    icon: 'MessageCircle',
    title: 'Atención Directa',
    desc: 'Asesoría inmediata y seguimiento en vivo por WhatsApp oficial'
  }
];
