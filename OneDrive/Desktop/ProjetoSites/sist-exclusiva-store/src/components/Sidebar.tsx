import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ArrowDownToDot, 
  ArrowUpFromDot, 
  FileWarning, 
  Truck, 
  History, 
  ShieldAlert,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ActivePage } from '../types';

interface SidebarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  lowStockAlertsCount: number;
  outOfStockCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  lowStockAlertsCount,
  outOfStockCount,
}) => {
  const totalAlerts = lowStockAlertsCount + outOfStockCount;

  const menuItems: { id: ActivePage; label: string; icon: React.ReactNode; badge?: number; badgeColor?: string }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard Geral',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: 'products',
      label: 'Catálogo de Produtos',
      icon: <Package className="w-5 h-5" />,
    },
    {
      id: 'entries',
      label: 'Entradas de Mercadorias',
      icon: <ArrowDownToDot className="w-5 h-5" />,
    },
    {
      id: 'exits',
      label: 'Saídas de Mercadorias',
      icon: <ArrowUpFromDot className="w-5 h-5" />,
    },
    {
      id: 'losses',
      label: 'Baixas de Estoque',
      icon: <FileWarning className="w-5 h-5" />,
    },
    {
      id: 'receivings',
      label: 'Recebimentos & Cargas',
      icon: <Truck className="w-5 h-5" />,
    },
    {
      id: 'movements',
      label: 'Histórico & Auditoria',
      icon: <History className="w-5 h-5" />,
    },
    {
      id: 'stock-alerts',
      label: 'Consulta & Alertas',
      icon: <ShieldAlert className="w-5 h-5" />,
      badge: totalAlerts > 0 ? totalAlerts : undefined,
      badgeColor: outOfStockCount > 0 ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white',
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col shrink-0 min-h-screen border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-bold text-white shadow-lg shadow-amber-500/20 text-lg tracking-wider">
            ES
          </div>
          <div>
            <h1 className="font-bold text-base text-white tracking-tight flex items-center gap-1.5">
              Exclusiva Store
            </h1>
            <p className="text-[11px] text-amber-400/90 font-medium tracking-wider uppercase">
              Controle de Estoque
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          Módulos Principais
        </div>

        {menuItems.map(item => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30 shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-700 text-slate-200'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Mode / Demo Badge */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center gap-2 text-amber-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold">Versão Demonstrativa</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Base de dados ativa com validações reais de estoque e auditoria.
          </p>
        </div>
      </div>
    </aside>
  );
};
