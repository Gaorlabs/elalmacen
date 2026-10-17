import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-[calc(100%-2rem)] pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 pointer-events-auto border ${
              isSuccess
                ? 'bg-emerald-600/95 text-white border-emerald-400'
                : isWarning
                ? 'bg-amber-600/95 text-white border-amber-400'
                : 'bg-slate-900/95 text-white border-slate-700'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-white" />}
            {isWarning && <AlertTriangle className="w-5 h-5 flex-shrink-0 text-white" />}
            {!isSuccess && !isWarning && <Info className="w-5 h-5 flex-shrink-0 text-cyan-300" />}
            <p className="text-xs sm:text-sm font-semibold leading-snug">{toast.text}</p>
          </div>
        );
      })}
    </div>
  );
};
