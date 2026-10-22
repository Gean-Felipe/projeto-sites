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
    <header className="bg-white border-b border-[#EAE0E3] px-4 md:px-8 py-3.5 sticky top-0 z-30">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Lado Esquerdo: Botão Mobile + Título */}
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-[#1F1719] hover:bg-[#FAF6F7] border border-[#E0D4D7] transition-colors"
              title="Abrir menu lateral"
              aria-label="Abrir menu lateral"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div>
            <h2 className="text-base md:text-lg font-bold text-[#1F1719] tracking-tight">
              {title}
            </h2>
            <p className="text-xs text-[#78696F] mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Lado Direito: Resumo e Ações Rápidas (Exatamente como o usuário adorou) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Indicador de Unidades Totais (Rosa Enxuto / Clean) */}
          <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-lg bg-[#FAF6F7] border border-[#EAE0E3] text-xs font-medium text-[#1F1719]">
            <div>
              <span className="text-[#78696F]">Produtos:</span>{' '}
              <strong className="font-bold text-[#1F1719]">{totalProducts}</strong>
            </div>
            <span className="text-[#EAE0E3]">|</span>
            <div>
              <span className="text-[#78696F]">Disponível:</span>{' '}
              <strong className="font-bold text-[#9C4B5C]">{totalUnits} un.</strong>
            </div>
          </div>

          {/* Botões de Ação Rápida */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onNavigate('stock', 'entry')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#9C4B5C] hover:bg-[#863C4B] text-white transition-colors shadow-2xs"
              title="Registrar nova entrada de produtos"
            >
              <ArrowDownToDot className="w-3.5 h-3.5" />
              <span>Registrar Entrada</span>
            </button>

            <button
              onClick={() => onNavigate('stock', 'exit')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FDF2F4] hover:bg-[#FCE7EB] text-[#863C4B] border border-[#F4D7DE] transition-colors shadow-2xs"
              title="Registrar saída de produtos por venda ou transferência"
            >
              <ArrowUpFromDot className="w-3.5 h-3.5 text-[#9C4B5C]" />
              <span>Registrar Saída</span>
            </button>

            <button
              onClick={() => onNavigate('stock', 'loss')}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FDF2F4] hover:bg-[#FCE7EB] text-[#863C4B] border border-[#F4D7DE] transition-colors shadow-2xs"
              title="Registrar baixa por defeito ou perda"
            >
              <FileWarning className="w-3.5 h-3.5 text-[#9C4B5C]" />
              <span>Baixa</span>
            </button>
          </div>

          {/* Restaurar Demonstração (Discreto) */}
          <button
            onClick={onResetDemo}
            className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium rounded-lg text-[#78696F] hover:text-[#1F1719] hover:bg-[#FAF6F7] border border-transparent hover:border-[#EAE0E3] transition-colors"
            title="Restaurar dados ou gerenciar base de dados"
          >
            <RotateCcw className="w-3 h-3 text-[#A39299]" />
            <span className="hidden xl:inline">Restaurar Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
