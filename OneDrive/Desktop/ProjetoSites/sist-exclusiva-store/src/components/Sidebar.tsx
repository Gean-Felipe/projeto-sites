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
          className="fixed inset-0 bg-black/25 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#EAE0E3] flex flex-col transition-transform duration-200 ease-in-out
        lg:static lg:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Identidade Visual da Loja */}
        <div className="p-5 border-b border-[#EAE0E3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF2F4] border border-[#F4D7DE] flex items-center justify-center text-[#9C4B5C] font-bold text-lg shadow-2xs">
              <Store className="w-5 h-5 text-[#9C4B5C]" />
            </div>
            <div>
              <h1 className="font-bold text-base text-[#1F1719] leading-tight tracking-tight">
                Exclusiva Store
              </h1>
              <p className="text-xs text-[#78696F] font-medium">
                Controle de Mercadorias
              </p>
            </div>
          </div>
        </div>

        {/* Menu de Navegação */}
        <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-[#8A7980] uppercase">
            Navegação Principal
          </div>

          {navItems.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#FDF2F4] text-[#863C4B] font-semibold border border-[#F4D7DE] shadow-2xs'
                    : 'text-[#4F4447] hover:bg-[#FAF6F7] hover:text-[#1F1719]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-[#9C4B5C]' : 'text-[#A39299]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-[#9C4B5C] text-white' : 'bg-[#EAE0E3] text-[#78696F]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Painel de Apoio / Status da Loja */}
        <div className="p-4 border-t border-[#EAE0E3] bg-[#FAF6F7]/60">
          {totalAlerts > 0 ? (
            <div className="p-3 rounded-xl bg-white border border-[#EAE0E3] text-xs space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 font-semibold text-[#1F1719]">
                <AlertCircle className="w-3.5 h-3.5 text-[#9C4B5C]" />
                <span>Itens com Atenção</span>
              </div>
              <p className="text-[11px] text-[#78696F] leading-relaxed">
                {outOfStockCount > 0 ? `${outOfStockCount} esgotado(s) e ` : ''}
                {lowStockAlertsCount} com estoque baixo.
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-white border border-[#EAE0E3] text-xs shadow-2xs">
              <div className="font-semibold text-[#1F1719] text-xs">Estoque Regularizado</div>
              <p className="text-[11px] text-[#78696F] mt-0.5">
                Nenhum produto em nível crítico no momento.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
