import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  History,
  Store,
  AlertCircle,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { ActivePage } from '../types/index.ts';

interface SidebarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  lowStockAlertsCount: number;
  outOfStockCount: number;
  totalCostValue?: number;
  totalUnitsInStock?: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  lowStockAlertsCount,
  outOfStockCount,
  totalCostValue = 0,
  totalUnitsInStock = 0,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const totalAlerts = lowStockAlertsCount + outOfStockCount;

  // Itens na ordem solicitada: Produtos, Estoque, Movimentações e Dashboard embaixo de Movimentações
  const navItems: { id: ActivePage; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'products',
      label: 'Produtos',
      icon: <Package className="w-4 h-4" />,
    },
    {
      id: 'stock',
      label: 'Estoque & Operações',
      icon: <Boxes className="w-4 h-4" />,
      badge: totalAlerts > 0 ? totalAlerts : undefined,
    },
    {
      id: 'movements',
      label: 'Movimentações',
      icon: <History className="w-4 h-4" />,
    },
    {
      id: 'dashboard',
      label: 'Dashboard de Gestão',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
  ];

  const handleSelect = (id: ActivePage) => {
    onNavigate(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Backdrop mobile */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-zinc-200 flex flex-col transition-transform duration-200 ease-in-out
        lg:static lg:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Identidade Visual da Loja */}
        <div className="p-5 border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 font-bold text-lg">
              <Store className="w-5 h-5 text-zinc-900" />
            </div>
            <div>
              <h1 className="font-bold text-base text-zinc-900 leading-tight tracking-tight">
                Exclusiva Store
              </h1>
              <p className="text-xs text-zinc-500 font-medium">
                Controle de Mercadorias
              </p>
            </div>
          </div>
        </div>

        {/* Menu de Navegação */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
            Navegação Principal
          </div>

          {navItems.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-white' : 'text-zinc-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Widget de Gestão no Lado Esquerdo (Embaixo de Movimentações) */}
          <div className="pt-4 px-1">
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-zinc-700" />
                  Gestão em Tempo Real
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-white p-2 rounded-lg border border-zinc-200">
                  <span className="text-[10px] text-zinc-400 block font-medium">Estoque</span>
                  <span className="text-xs font-bold text-zinc-900">{totalUnitsInStock} un.</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-zinc-200">
                  <span className="text-[10px] text-zinc-400 block font-medium">Capital Custo</span>
                  <span className="text-xs font-bold text-zinc-900 truncate block">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalCostValue)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleSelect('dashboard')}
                className={`w-full py-1.5 px-2.5 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors ${
                  activePage === 'dashboard'
                    ? 'bg-zinc-900 text-white font-semibold'
                    : 'bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200'
                }`}
              >
                <span>Acessar Dashboard</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </nav>

        {/* Painel de Apoio / Status da Loja */}
        <div className="p-4 border-t border-zinc-200 bg-zinc-50/60">
          {totalAlerts > 0 ? (
            <div className="p-3 rounded-lg bg-white border border-zinc-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-zinc-900">
                <AlertCircle className="w-3.5 h-3.5 text-zinc-700" />
                <span>Itens com Atenção</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                {outOfStockCount > 0 ? `${outOfStockCount} esgotado(s) e ` : ''}
                {lowStockAlertsCount} com estoque baixo.
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-white border border-zinc-200 text-xs">
              <div className="font-semibold text-zinc-900 text-xs">Estoque Regularizado</div>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Nenhum produto em nível crítico no momento.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
