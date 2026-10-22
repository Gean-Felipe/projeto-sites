import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { ToastNotification } from '../types/index.ts';

interface ToastProps {
  toasts: ToastNotification[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />;
        let borderColor = 'border-emerald-200 bg-white';
        let titleColor = 'text-emerald-950';

        if (toast.type === 'error') {
          icon = <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />;
          borderColor = 'border-rose-200 bg-white';
          titleColor = 'text-rose-950';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />;
          borderColor = 'border-amber-200 bg-white';
          titleColor = 'text-amber-950';
        } else if (toast.type === 'info') {
          icon = <Info className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />;
          borderColor = 'border-zinc-200 bg-white';
          titleColor = 'text-zinc-950';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-sm transition-all ${borderColor}`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              {toast.title && (
                <h4 className={`text-xs font-bold mb-0.5 ${titleColor}`}>{toast.title}</h4>
              )}
              <p className="text-xs text-zinc-700 leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="text-zinc-400 hover:text-zinc-700 transition-colors p-0.5"
              aria-label="Fechar notificação"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
