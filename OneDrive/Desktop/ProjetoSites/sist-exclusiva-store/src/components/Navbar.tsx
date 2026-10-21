import React from 'react';
import { 
  RotateCcw, 
  Plus, 
  ArrowDownToDot, 
  ArrowUpFromDot, 
  FileWarning, 
  Truck,
  Sparkles
} from 'lucide-react';
import { ActivePage } from '../types';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onResetDemo: () => void;
  totalProducts: number;
  totalUnits: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onResetDemo,
  totalProducts,
  totalUnits,
}) => {
  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard':
        return { title: 'Visão Geral do Estoque', subtitle: 'Acompanhamento em tempo real de mercadorias e movimentações' };
      case 'products':
        return { title: 'Catálogo de Produtos', subtitle: 'Cadastro, edição, consulta de preços e controle de estoque mínimo' };
      case 'entries':
        return { title: 'Entrada de Mercadorias', subtitle: 'Registro avulso de reposição com incremento automático no estoque' };
      case 'exits':
        return { title: 'Saída de Mercadorias', subtitle: 'Retirada para vendas ou transferências com validação anti-saldo negativo' };
      case 'losses':
        return { title: 'Baixa de Estoque', subtitle: 'Registro de perdas, avarias de peças, defeitos e ajustes com rastreabilidade' };
      case 'receivings':
        return { title: 'Recebimento & Conferência de Cargas', subtitle: 'Fluxo em lote com controle seguro contra entradas duplicadas' };
      case 'movements':
        return { title: 'Histórico & Auditoria Completa', subtitle: 'Registro cronológico inviolável de todas as transações de estoque' };
      case 'stock-alerts':
        return { title: 'Consulta & Alertas de Reposição', subtitle: 'Supervisão de itens zerados e estoque abaixo do limite de segurança' };
      default:
        return { title: 'Exclusiva Store', subtitle: 'Sistema de Controle de Mercadorias' };
    }
  };

  const { title, subtitle } = getPageTitle();

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Stats Pill */}
        <div className="hidden lg:flex items-center gap-4 px-3.5 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200/80 text-xs font-medium text-slate-600">
          <div>
            Produtos: <span className="font-bold text-slate-900">{totalProducts}</span>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            Unidades Totais: <span className="font-bold text-amber-700">{totalUnits} un.</span>
          </div>
        </div>

        {/* Quick Actions Dropdown / Direct Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('entries')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            title="Registrar Nova Entrada de Mercadoria"
          >
            <ArrowDownToDot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nova Entrada</span>
          </button>

          <button
            onClick={() => onNavigate('exits')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
            title="Registrar Nova Saída de Mercadoria"
          >
            <ArrowUpFromDot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nova Saída</span>
          </button>

          <button
            onClick={() => onNavigate('losses')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
            title="Registrar Baixa por Avaria / Perda"
          >
            <FileWarning className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Baixa / Avaria</span>
          </button>
        </div>

        {/* Reset Demo Button */}
        <button
          onClick={onResetDemo}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
          title="Restaura os dados originais fictícios de demonstração"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden md:inline">Restaurar Demo</span>
        </button>
      </div>
    </header>
  );
};
