import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useApp } from '../context/AppContext';
import { Download, Smartphone, Share, PlusSquare, MoreVertical, X, Sparkles } from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'card' | 'floating';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'compact' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { businessConfig, showToast } = useApp();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [dismissedFloating, setDismissedFloating] = useState(() => {
    try {
      return sessionStorage.getItem('el_almacen_pwa_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  // Hide automatically if already running as installed standalone PWA
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome === 'accepted') {
        showToast('¡App El Almacén instalada en tu dispositivo!', 'success');
      }
      return;
    }
    // Show visual guide modal for iOS Safari or browsers where prompt isn't auto-triggered
    setShowGuideModal(true);
  };

  const handleDismissFloating = () => {
    setDismissedFloating(true);
    try {
      sessionStorage.setItem('el_almacen_pwa_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  const renderModal = () =>
    showGuideModal ? (
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-xs p-0 sm:p-4 animate-fadeIn"
        onClick={() => setShowGuideModal(false)}
      >
        <div
          className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[28px] sm:rounded-3xl p-5 sm:p-6 shadow-2xl border-t sm:border border-rose-100 dark:border-slate-800 space-y-4 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={businessConfig.logoUrl}
                alt={businessConfig.name}
                className="w-10 h-10 rounded-xl object-contain bg-white border border-slate-200 p-0.5 shadow-xs"
              />
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                  Instalar App {businessConfig.name}
                </h3>
                <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                  Úsala como una App nativa sin barra de navegador
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowGuideModal(false)}
              className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {isIOS ? (
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <p className="font-extrabold text-slate-900 dark:text-white text-sm">
                Pasos para iPhone / iPad (Safari):
              </p>
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#FA436B] text-white font-black text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <p className="pt-0.5">
                  Toca el botón <strong>Compartir</strong> <Share className="w-3.5 h-3.5 inline text-blue-500 mx-0.5" /> en la barra inferior de Safari.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#FA436B] text-white font-black text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <p className="pt-0.5">
                  Desliza hacia abajo y elige <strong>Agregar a pantalla de inicio</strong>{' '}
                  <PlusSquare className="w-3.5 h-3.5 inline text-slate-600 dark:text-slate-300 mx-0.5" />.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#FA436B] text-white font-black text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <p className="pt-0.5">
                  Presiona <strong>Agregar</strong> arriba a la derecha. ¡Listo! Tendrás el ícono de {businessConfig.name} en tu celular.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <p className="font-extrabold text-slate-900 dark:text-white text-sm">
                Cómo instalar en Android (Chrome / Edge):
              </p>
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#FA436B] text-white font-black text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <p className="pt-0.5">
                  Toca el menú de <strong>3 puntos</strong> <MoreVertical className="w-3.5 h-3.5 inline text-slate-600 dark:text-slate-300" /> arriba a la derecha de tu navegador.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#FA436B] text-white font-black text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <p className="pt-0.5">
                  Selecciona <strong>"Instalar aplicación"</strong> o <strong>"Agregar a la pantalla principal"</strong>.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#FA436B] text-white font-black text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <p className="pt-0.5">
                  Confirma tocando <strong>Instalar</strong> y ábrela directo desde tus apps.
                </p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowGuideModal(false)}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FA436B] to-[#FA7088] text-white font-black text-xs uppercase tracking-wider shadow-md cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    ) : null;

  if (variant === 'floating') {
    if (dismissedFloating || (!isInstallable && !isIOS)) return null;

    return (
      <>
        <div className="md:hidden mx-3 mb-2 p-2.5 rounded-2xl bg-gradient-to-r from-slate-900 via-neutral-900 to-slate-900 text-white border border-rose-500/40 shadow-lg flex items-center justify-between gap-2.5 animate-fadeIn">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={businessConfig.logoUrl}
              alt={businessConfig.name}
              className="w-9 h-9 rounded-xl object-contain bg-white p-0.5 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-black truncate flex items-center gap-1">
                <span>Instala {businessConfig.name}</span>
                <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
              </p>
              <p className="text-[10px] text-slate-300 truncate">
                Acceso directo en tu celular como App
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FA436B] to-[#FA7088] text-white text-[11px] font-black shadow-sm active:scale-95 transition-transform flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Instalar</span>
            </button>
            <button
              type="button"
              onClick={handleDismissFloating}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
              aria-label="Ocultar aviso"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        {renderModal()}
      </>
    );
  }

  if (variant === 'card') {
    return (
      <>
        <button
          type="button"
          onClick={handleInstallClick}
          className="w-full mt-2.5 py-2.5 px-4 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-2 border border-slate-700 shadow-sm active:scale-98 transition-all cursor-pointer"
        >
          <Smartphone className="w-4 h-4 text-amber-300" />
          <span>{isInstallable ? 'Instalar App en tu Celular' : 'Agregar a Pantalla de Inicio (App)'}</span>
          <Download className="w-3.5 h-3.5 text-rose-400" />
        </button>
        {renderModal()}
      </>
    );
  }

  // Default compact button for Header
  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className="flex items-center gap-1 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-black rounded-full bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/50 shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
        title="Instalar App en tu móvil"
      >
        <Download className="w-3 h-3 text-amber-200" />
        <span className="hidden xs:inline">Instalar App</span>
        <span className="xs:hidden">App</span>
      </button>
      {renderModal()}
    </>
  );
};
