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
          title: 'Visão Geral',
          subtitle: 'Situação atual do estoque e atividades recentes da Exclusiva Store',
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
    <header className="bg-[#FEFEFE] border-b border-[#EED9DC] px-4 md:px-8 py-4 sticky top-0 z-30">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Lado Esquerdo: Botão Mobile + Título */}
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-[#0E0606] hover:bg-[#FAE7E7] border border-[#EED9DC] transition-colors"
              title="Abrir menu lateral"
              aria-label="Abrir menu lateral"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div>
            <h2 className="text-lg md:text-xl font-bold text-[#0E0606] tracking-tight">
              {title}
            </h2>
            <p className="text-xs text-[#7A5B67] mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Lado Direito: Resumo e Ações Rápidas */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Indicador de Unidades Totais */}
          <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-lg bg-[#FAE7E7] border border-[#EED9DC] text-xs font-medium text-[#0E0606]">
            <div>
              <span className="text-[#7A5B67]">Produtos:</span>{' '}
              <strong className="font-bold text-[#0E0606]">{totalProducts}</strong>
            </div>
            <span className="text-[#EED9DC]">|</span>
            <div>
              <span className="text-[#7A5B67]">Disponível:</span>{' '}
              <strong className="font-bold text-[#CF7C89]">{totalUnits} un.</strong>
            </div>
          </div>

          {/* Botões de Ação Rápida */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onNavigate('stock', 'entry')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#CF7C89] hover:bg-[#BE6B78] text-[#FEFEFE] transition-colors shadow-2xs"
              title="Registrar nova entrada de produtos"
            >
              <ArrowDownToDot className="w-3.5 h-3.5" />
              <span>Registrar Entrada</span>
            </button>

            <button
              onClick={() => onNavigate('stock', 'exit')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#FEFEFE] hover:bg-[#FAE7E7] text-[#0E0606] border border-[#EED9DC] transition-colors"
              title="Registrar saída de produtos por venda ou transferência"
            >
              <ArrowUpFromDot className="w-3.5 h-3.5 text-[#CF7C89]" />
              <span>Registrar Saída</span>
            </button>

            <button
              onClick={() => onNavigate('stock', 'loss')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#FEFEFE] hover:bg-[#FAE7E7] text-[#0E0606] border border-[#EED9DC] transition-colors"
              title="Registrar baixa por defeito ou perda"
            >
              <FileWarning className="w-3.5 h-3.5 text-[#7A5B67]" />
              <span>Baixa</span>
            </button>
          </div>

          {/* Restaurar Demonstração (Discreto) */}
          <button
            onClick={onResetDemo}
            className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium rounded-lg text-[#7A5B67] hover:text-[#0E0606] hover:bg-[#FAE7E7] border border-transparent hover:border-[#EED9DC] transition-colors"
            title="Restaurar dados originais de demonstração para testes"
          >
            <RotateCcw className="w-3 h-3 text-[#AA8B97]" />
            <span className="hidden xl:inline">Restaurar Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
