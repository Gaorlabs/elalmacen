import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, Eye, EyeOff, X } from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const { isAdminModalOpen, closeAdminModal, unlockAdmin } = useApp();
  const [pinInput, setPinInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAdminModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setErrorMsg('Por favor ingrese el PIN de seguridad');
      return;
    }
    const success = unlockAdmin(pinInput.trim());
    if (success) {
      setPinInput('');
      setErrorMsg('');
    } else {
      setErrorMsg('Contraseña o PIN incorrecto. Intente nuevamente.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-rose-100 dark:border-slate-800 overflow-hidden relative transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FA436B] via-[#FF5876] to-[#FA7088] p-5 text-white relative">
          <button
            onClick={closeAdminModal}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-inner">
              <ShieldCheck className="w-7 h-7 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">Acceso Administrativo</h2>
              <p className="text-xs text-rose-100 font-medium">Panel de Gestión El Almacén</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Ingrese su clave o contraseña de administrador para gestionar productos, precios, inventario y datos de la empresa.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                Contraseña de Administrador
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={pinInput}
                  onChange={e => {
                    setPinInput(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Ingrese contraseña"
                  maxLength={30}
                  className="w-full text-sm pl-10 pr-10 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#FA436B]"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errorMsg && (
                <p className="text-xs text-rose-500 font-bold mt-1.5 animate-bounce">
                  ⚠️ {errorMsg}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={closeAdminModal}
                className="flex-1 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#FA436B] to-[#FA7088] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-[#FA436B]/30 hover:opacity-95 active:scale-95 transition-all cursor-pointer"
              >
                Acceder al Panel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
