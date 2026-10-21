import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { ToastNotification } from '../types';

interface ToastProps {
  toasts: ToastNotification[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col space-y-3 max-w-md w-full pointer-events-none">
      {toasts.map(toast => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />;
        let borderColor = 'border-emerald-200 bg-white shadow-emerald-500/10';
        let titleColor = 'text-emerald-900';

        if (toast.type === 'error') {
          icon = <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />;
          borderColor = 'border-rose-200 bg-white shadow-rose-500/10';
          titleColor = 'text-rose-900';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />;
          borderColor = 'border-amber-200 bg-white shadow-amber-500/10';
          titleColor = 'text-amber-900';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />;
          borderColor = 'border-blue-200 bg-white shadow-blue-500/10';
          titleColor = 'text-blue-900';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all animate-in slide-in-from-top duration-200 ${borderColor}`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              {toast.title && (
                <h4 className={`text-sm font-semibold mb-0.5 ${titleColor}`}>{toast.title}</h4>
              )}
              <p className="text-xs text-slate-700 leading-relaxed font-normal">{toast.message}</p>
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
