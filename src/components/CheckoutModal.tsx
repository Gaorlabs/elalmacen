import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PAYMENT_ACCOUNTS, BUSINESS_CONFIG } from '../data/shipping';
import {
  X,
  MapPin,
  Phone,
  User,
  FileText,
  Copy,
  Check,
  Smartphone,
  MessageCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    deliveryData,
    updateDeliveryData,
    grandTotal,
    cartSubtotal,
    discountAmount,
    cart,
    placeOrder,
    showToast
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleCopyYape = () => {
    navigator.clipboard.writeText(PAYMENT_ACCOUNTS.yape.phone);
    setCopied(true);
    showToast(`¡Número Yape copiado: ${PAYMENT_ACCOUNTS.yape.phoneFormatted}!`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!deliveryData.fullName.trim()) {
      errs.fullName = 'Ingresa tu nombre completo';
    }
    if (!deliveryData.phone.trim()) {
      errs.phone = 'Ingresa tu número de WhatsApp';
    } else if (deliveryData.phone.replace(/\D/g, '').length < 9) {
      errs.phone = 'Ingresa un número válido de 9 dígitos';
    }
    if (!deliveryData.address.trim()) {
      errs.address = 'Ingresa tu dirección de entrega';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Por favor completa los datos de entrega', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder('yape');
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col justify-end sm:items-center sm:justify-center p-0 sm:p-4 transition-opacity duration-300"
      onClick={closeCheckout}
    >
      <div
        className="relative w-full max-w-md mx-auto bg-white dark:bg-slate-900 rounded-t-[32px] sm:rounded-3xl shadow-2xl border-t sm:border border-slate-200 dark:border-slate-800 max-h-[92dvh] flex flex-col overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-250"
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle bar */}
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-2 flex-shrink-0 sm:hidden" />

        {/* Header */}
        <div className="px-4 py-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-purple-50/60 to-rose-50/40 dark:from-slate-900 dark:to-slate-900 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                Datos de Entrega & Pago Yape
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Completa tus datos y envía tu pedido directo a WhatsApp
              </p>
            </div>
          </div>

          <button
            onClick={closeCheckout}
            className="p-1.5 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmitOrder} className="p-4 space-y-4 overflow-y-auto no-scrollbar">
          {/* SECTION 1: Datos de Entrega */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] flex items-center justify-center font-bold">1</span>
              <span>Datos del Cliente</span>
            </h3>

            {/* Nombre Completo */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Nombre Completo *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={deliveryData.fullName}
                  onChange={e => updateDeliveryData({ fullName: e.target.value })}
                  placeholder="Ej. María Sánchez Romero"
                  className="w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* Teléfono / WhatsApp */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Teléfono / WhatsApp (9 dígitos) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={deliveryData.phone}
                  onChange={e => updateDeliveryData({ phone: e.target.value })}
                  placeholder="Ej. 987 654 321"
                  className="w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
            </div>

            {/* Dirección de Entrega */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Dirección Exacta de Entrega *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={deliveryData.address}
                  onChange={e => updateDeliveryData({ address: e.target.value })}
                  placeholder="Ej. Av. Los Próceres 1240, Dpto 201 / Urbanización"
                  className="w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
            </div>

            {/* Referencia opcional */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Referencia de llegada (opcional)
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={deliveryData.reference || ''}
                  onChange={e => updateDeliveryData({ reference: e.target.value })}
                  placeholder="Ej. Frente al colegio, casa de rejas blancas"
                  className="w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Método de Pago Yape para Copiar */}
          <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[11px] flex items-center justify-center font-bold">2</span>
              <span>Paga con Yape Oficial</span>
            </h3>

            {/* Yape Account Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/60 dark:from-purple-950/40 dark:to-slate-800/80 border border-purple-200 dark:border-purple-800 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-extrabold text-purple-700 dark:text-purple-300 block">
                    Número Yape Oficial:
                  </span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white tracking-wide">
                    {PAYMENT_ACCOUNTS.yape.phoneFormatted}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyYape}
                  className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Yape</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs text-slate-700 dark:text-slate-300 pt-1 border-t border-purple-200/60 dark:border-purple-800/60 flex items-center justify-between">
                <span>Titular: <strong>{PAYMENT_ACCOUNTS.yape.holder}</strong></span>
                <span className="text-[11px] text-purple-700 dark:text-purple-300 font-bold">Pago 100% Seguro</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                📲 <strong>Instrucciones:</strong> Copia el número, realiza tu Yape por el monto total y al presionar el botón de abajo se abrirá WhatsApp donde podrás enviar la captura de tu comprobante.
              </div>
            </div>
          </div>

          {/* Resumen de Total */}
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-baseline justify-between">
            <div>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
                Total a Yapear ({cart.length} {cart.length === 1 ? 'producto' : 'productos'}):
              </span>
              {discountAmount > 0 && (
                <span className="text-[11px] text-emerald-600 font-semibold">
                  Descuento cupón: -S/ {discountAmount.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
              S/ {grandTotal.toFixed(2)}
            </span>
          </div>

          {/* Botón Principal para Enviar al WhatsApp del Negocio */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-base shadow-xl shadow-emerald-600/30 active:scale-98 transition-all flex items-center justify-center gap-2 group disabled:opacity-75"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Confirmar Pedido por WhatsApp</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
            Se abrirá el WhatsApp del negocio <strong className="text-slate-800 dark:text-slate-200">{BUSINESS_CONFIG.whatsappDisplay}</strong> avisando que en breve enviarás tu comprobante de pago.
          </p>
        </form>
      </div>
    </div>
  );
};
