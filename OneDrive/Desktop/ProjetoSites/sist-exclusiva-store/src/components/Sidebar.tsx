import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  History,
  Store,
  AlertCircle
} from 'lucide-react';
import { ActivePage } from '../types/index.ts';

interface SidebarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  lowStockAlertsCount: number;
  outOfStockCount: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  lowStockAlertsCount,
  outOfStockCount,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const totalAlerts = lowStockAlertsCount + outOfStockCount;

  const navItems: { id: ActivePage; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'dashboard',
      label: 'Visão Geral',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
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
          className="fixed inset-0 bg-[#0E0606]/30 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#FEFEFE] border-r border-[#EED9DC] flex flex-col transition-transform duration-200 ease-in-out
        lg:static lg:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Identidade Visual da Loja */}
        <div className="p-5 border-b border-[#EED9DC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAE7E7] border border-[#EED9DC] flex items-center justify-center text-[#CF7C89] font-bold text-lg">
              <Store className="w-5 h-5 text-[#CF7C89]" />
            </div>
            <div>
              <h1 className="font-bold text-base text-[#0E0606] leading-tight tracking-tight">
                Exclusiva Store
              </h1>
              <p className="text-xs text-[#AA8B97] font-medium">
                Controle de Mercadorias
              </p>
            </div>
          </div>
        </div>

        {/* Menu de Navegação */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-[#7A5B67] uppercase">
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
                    ? 'bg-[#FAE7E7] text-[#0E0606] font-semibold border border-[#EED9DC]'
                    : 'text-[#0E0606]/80 hover:bg-[#FDF7F7] hover:text-[#0E0606]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-[#CF7C89]' : 'text-[#AA8B97]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#CF7C89] text-[#FEFEFE]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Painel de Apoio / Status da Loja */}
        <div className="p-4 border-t border-[#EED9DC] bg-[#FDF7F7]">
          {totalAlerts > 0 ? (
            <div className="p-3 rounded-lg bg-[#FAE7E7] border border-[#EED9DC] text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#0E0606]">
                <AlertCircle className="w-3.5 h-3.5 text-[#CF7C89]" />
                <span>Itens com Atenção</span>
              </div>
              <p className="text-[11px] text-[#7A5B67] leading-relaxed">
                {outOfStockCount > 0 ? `${outOfStockCount} esgotado(s) e ` : ''}
                {lowStockAlertsCount} com estoque baixo.
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-[#FAE7E7]/60 border border-[#EED9DC] text-xs">
              <div className="font-semibold text-[#0E0606] text-xs">Estoque Regularizado</div>
              <p className="text-[11px] text-[#7A5B67] mt-0.5">
                Nenhum produto em nível crítico no momento.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
