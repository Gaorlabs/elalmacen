import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useApp } from '../context/AppContext';
import {
  Download,
  Smartphone,
  Share,
  PlusSquare,
  MoreVertical,
  X,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'card' | 'floating';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'compact' }) => {
  const { isInstallable, isStandalone, installStatus, isIOS, install } = usePWAInstall();
  const { businessConfig, showToast } = useApp();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [guideMode, setGuideMode] = useState<'install' | 'post_install'>('install');
  const [dismissedFloating, setDismissedFloating] = useState(() => {
    try {
      return sessionStorage.getItem('el_almacen_pwa_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  // Only hide automatically when ALREADY opened inside the installed standalone app
  if (isStandalone) {
    return null;
  }

  const hasPromptedInstall = installStatus === 'installing' || installStatus === 'installed';

  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome === 'accepted') {
        showToast(
          'Creando ícono de El Almacén... puede tardar 10-15 segundos en aparecer.',
          'info'
        );
        setGuideMode('post_install');
        setShowGuideModal(true);
      }
      return;
    }

    setGuideMode(hasPromptedInstall ? 'post_install' : 'install');
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
          className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[28px] sm:rounded-3xl p-5 sm:p-6 shadow-2xl border-t sm:border border-rose-100 dark:border-slate-800 space-y-4 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] max-h-[90dvh] overflow-y-auto"
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
                  {guideMode === 'post_install'
                    ? '¿No ves el ícono en tu pantalla?'
                    : `Instalar App ${businessConfig.name}`}
                </h3>
                <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                  {guideMode === 'post_install'
                    ? 'Cómo encontrarla o crear el acceso directo'
                    : 'Úsala como una App nativa sin barra de navegador'}
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

          {guideMode === 'post_install' && !isIOS ? (
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-200">
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-start gap-2.5">
                {installStatus === 'installed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                )}
                <p className="font-semibold text-emerald-900 dark:text-emerald-200 leading-relaxed">
                  {installStatus === 'installed'
                    ? 'Android reportó la app como instalada, pero algunos celulares la guardan fuera de la pantalla principal.'
                    : 'Android tarda unos 10 a 20 segundos en crear la app. Si después de ese tiempo no aparece:'}
                </p>
              </div>

              <div className="space-y-2.5 bg-slate-50 dark:bg-slate-800/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#FA436B] text-white font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <p className="pt-0.5">
                    <strong>Revisa el Cajón de Aplicaciones:</strong> Desliza hacia arriba desde el inicio de tu teléfono y busca <strong>"{businessConfig.name}"</strong>. Luego mantenlo presionado para arrastrarlo a tu pantalla principal.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#FA436B] text-white font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <p className="pt-0.5">
                    <strong>Acceso directo instantáneo (si no aparece):</strong> En Chrome toca los <strong>3 puntos</strong>{' '}
                    <MoreVertical className="w-3.5 h-3.5 inline text-slate-600 dark:text-slate-300" /> arriba a la derecha &rarr;{' '}
                    <strong>"Agregar a la pantalla principal"</strong> &rarr; elige <strong>"Crear acceso directo"</strong>.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#FA436B] text-white font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <p className="pt-0.5">
                    <strong>¿Usas Xiaomi, Redmi o POCO?</strong> Entra a <em>Ajustes &rarr; Aplicaciones &rarr; Chrome &rarr; Otros permisos</em> y activa <strong>"Accesos directos en la pantalla de inicio"</strong> (por defecto viene bloqueado).
                  </p>
                </div>
              </div>
            </div>
          ) : isIOS ? (
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
                Cómo agregar el ícono en Android (Chrome / Edge):
              </p>
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#FA436B] text-white font-black text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <p className="pt-0.5">
                  Toca el menú de <strong>3 puntos</strong> <MoreVertical className="w-3.5 h-3.5 inline text-slate-600 dark:text-slate-300" /> arriba a la derecha de Chrome.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#FA436B] text-white font-black text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <p className="pt-0.5">
                  Toca <strong>"Agregar a la pantalla principal"</strong> y si te da dos opciones, elige{' '}
                  <strong>"Crear acceso directo"</strong> (aparece directo en tu inicio) o <strong>"Instalar"</strong>.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#FA436B] text-white font-black text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <p className="pt-0.5">
                  Si usas Xiaomi/Redmi/POCO, recuerda activar <em>"Accesos directos en pantalla de inicio"</em> en los permisos de Chrome.
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
    if (dismissedFloating || (!isInstallable && !isIOS && !hasPromptedInstall)) return null;

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
                <span>{hasPromptedInstall ? '¿No ves el ícono?' : `Instala ${businessConfig.name}`}</span>
                <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
              </p>
              <p className="text-[10px] text-slate-300 truncate">
                {hasPromptedInstall
                  ? 'Toca aquí para crear el acceso directo'
                  : 'Acceso directo en tu celular como App'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FA436B] to-[#FA7088] text-white text-[11px] font-black shadow-sm active:scale-95 transition-transform flex items-center gap-1 cursor-pointer"
            >
              {hasPromptedInstall ? <HelpCircle className="w-3 h-3" /> : <Download className="w-3 h-3" />}
              <span>{hasPromptedInstall ? 'Ver cómo' : 'Instalar'}</span>
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
          <span>
            {hasPromptedInstall
              ? '¿No ves el ícono en tu inicio? Toca aquí'
              : isInstallable
              ? 'Instalar App en tu Celular'
              : 'Agregar a Pantalla de Inicio (App)'}
          </span>
          {hasPromptedInstall ? (
            <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
          ) : (
            <Download className="w-3.5 h-3.5 text-rose-400" />
          )}
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
        className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-black rounded-full text-white border shadow-xs transition-all active:scale-95 cursor-pointer shrink-0 ${
          hasPromptedInstall
            ? 'bg-amber-600 hover:bg-amber-500 border-amber-300/60'
            : 'bg-emerald-600 hover:bg-emerald-500 border-emerald-400/50'
        }`}
        title={hasPromptedInstall ? '¿No ves el ícono? Ver ayuda' : 'Instalar App en tu móvil'}
      >
        {hasPromptedInstall ? (
          <HelpCircle className="w-3 h-3 text-white" />
        ) : (
          <Download className="w-3 h-3 text-amber-200" />
        )}
        <span className="hidden xs:inline">{hasPromptedInstall ? '¿Sin ícono?' : 'Instalar App'}</span>
        <span className="xs:hidden">{hasPromptedInstall ? 'Ícono?' : 'App'}</span>
      </button>
      {renderModal()}
    </>
  );
};
