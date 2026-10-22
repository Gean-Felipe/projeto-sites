import React from 'react';
import { 
  Menu, 
  RotateCcw, 
  ArrowDownToDot, 
  ArrowUpFromDot, 
  FileWarning
} from 'lucide-react';
import { ActivePage, StockTab } from '../types/index.ts';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, stockTab?: StockTab) => void;
  onResetDemo: () => void;
  totalProducts: number;
  totalUnits: number;
  onToggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onResetDemo,
  totalProducts,
  totalUnits,
  onToggleMobileMenu,
}) => {
  const getPageInfo = () => {
    switch (activePage) {
      case 'dashboard':
        return {
          title: 'Dashboard de Gestão',
          subtitle: 'Painel executivo com métricas financeiras, margem bruta e rentabilidade do estoque',
        };
      case 'products':
        return {
          title: 'Produtos',
          subtitle: 'Cadastro, consulta, preços e controle de estoque de cada mercadoria',
        };
      case 'stock':
        return {
          title: 'Estoque & Operações',
          subtitle: 'Entradas, saídas, baixas por avaria e conferência de recebimentos',
        };
      case 'movements':
        return {
          title: 'Movimentações',
          subtitle: 'Histórico completo de entradas, saídas e baixas com auditoria de saldo',
        };
      default:
        return {
          title: 'Exclusiva Store',
          subtitle: 'Sistema de Gerenciamento de Mercadorias',
        };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <header className="bg-white border-b border-zinc-200 px-4 md:px-8 py-3.5 sticky top-0 z-30">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Lado Esquerdo: Botão Mobile + Título */}
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-zinc-900 hover:bg-zinc-100 border border-zinc-200 transition-colors"
              title="Abrir menu lateral"
              aria-label="Abrir menu lateral"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div>
            <h2 className="text-base md:text-lg font-bold text-zinc-900 tracking-tight">
              {title}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Lado Direito: Resumo e Ações Rápidas */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Indicador de Unidades Totais */}
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-900">
            <div>
              <span className="text-zinc-500">Produtos:</span>{' '}
              <strong className="font-semibold text-zinc-900">{totalProducts}</strong>
            </div>
            <span className="text-zinc-300">|</span>
            <div>
              <span className="text-zinc-500">Disponível:</span>{' '}
              <strong className="font-semibold text-zinc-950">{totalUnits} un.</strong>
            </div>
          </div>

          {/* Botões de Ação Rápida */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onNavigate('stock', 'entry')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white transition-colors shadow-xs"
              title="Registrar nova entrada de produtos"
            >
              <ArrowDownToDot className="w-3.5 h-3.5" />
              <span>Registrar Entrada</span>
            </button>

            <button
              onClick={() => onNavigate('stock', 'exit')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 transition-colors"
              title="Registrar saída de produtos por venda ou transferência"
            >
              <ArrowUpFromDot className="w-3.5 h-3.5 text-zinc-600" />
              <span>Registrar Saída</span>
            </button>

            <button
              onClick={() => onNavigate('stock', 'loss')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 transition-colors"
              title="Registrar baixa por defeito ou perda"
            >
              <FileWarning className="w-3.5 h-3.5 text-zinc-500" />
              <span>Baixa</span>
            </button>
          </div>

          {/* Gerenciar Base de Dados (Zerar ou Demo) */}
          <button
            onClick={onResetDemo}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 border border-transparent hover:border-zinc-200 transition-colors"
            title="Zerar todo o estoque para nova rotina ou carregar dados de demonstração"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden lg:inline">Zerar / Configurar Base</span>
          </button>
        </div>
      </div>
    </header>
  );
};
