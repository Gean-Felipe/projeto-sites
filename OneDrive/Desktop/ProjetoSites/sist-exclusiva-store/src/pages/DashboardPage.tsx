import React from 'react';
import { 
  Package, 
  Boxes, 
  AlertTriangle, 
  XCircle, 
  ArrowDownToDot, 
  ArrowUpFromDot, 
  Plus, 
  ArrowRight
} from 'lucide-react';
import { DashboardMetrics, Movement, Product, ActivePage, StockTab } from '../types/index.ts';

interface DashboardProps {
  metrics: DashboardMetrics;
  recentMovements: Movement[];
  criticalProducts: Product[];
  products?: Product[];
  onNavigate: (page: ActivePage, stockTab?: StockTab) => void;
  onOpenNewProduct: () => void;
  onQuickEntry: (productId?: string) => void;
  onQuickExit: (productId?: string) => void;
  onViewProduct?: (product: Product) => void;
}

export const DashboardPage: React.FC<DashboardProps> = ({
  metrics,
  recentMovements,
  criticalProducts,
  onNavigate,
  onOpenNewProduct,
  onQuickEntry,
  onQuickExit,
}) => {
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner Principal com Tom Rosé Suave e Enxuto */}
      <div className="bg-[#FAF6F7] border border-[#EAE0E3] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <span className="text-[11px] font-semibold text-[#865B67] uppercase tracking-wider block mb-1">
            Exclusiva Store • Controle Diário
          </span>
          <h1 className="text-xl md:text-2xl font-bold text-[#1F1719] tracking-tight">
            Situação do Estoque
          </h1>
          <p className="text-xs text-[#6F5F64] mt-1 max-w-xl">
            Resumo em tempo real das mercadorias disponíveis, alertas de reposição e movimentações recentes.
          </p>
        </div>

        {/* Ações Rápidas com Rosé Seco Elegante */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => onQuickEntry()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#9C4B5C] hover:bg-[#863C4B] text-white text-xs font-semibold transition-colors shadow-xs"
            title="Registrar entrada de mercadoria"
          >
            <ArrowDownToDot className="w-4 h-4" />
            <span>Registrar Entrada</span>
          </button>

          <button
            onClick={() => onQuickExit()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FDF2F4] hover:bg-[#FCE7EB] text-[#863C4B] border border-[#F4D7DE] text-xs font-semibold transition-colors shadow-2xs"
            title="Registrar saída por venda ou transferência"
          >
            <ArrowUpFromDot className="w-4 h-4 text-[#9C4B5C]" />
            <span>Registrar Saída</span>
          </button>

          <button
            onClick={onOpenNewProduct}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FDF2F4] hover:bg-[#FCE7EB] text-[#863C4B] border border-[#F4D7DE] text-xs font-semibold transition-colors shadow-2xs"
            title="Cadastrar um novo produto no estoque"
          >
            <Plus className="w-4 h-4 text-[#9C4B5C]" />
            <span>Cadastrar Produto</span>
          </button>
        </div>
      </div>

      {/* 4 Cards de Indicadores com Fundos Claros e Enxutos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Produtos cadastrados */}
        <div className="bg-white border border-[#EAE0E3] rounded-xl p-4.5 flex flex-col justify-between shadow-2xs hover:border-[#D9CCD0] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#6F5F64] uppercase tracking-wider">
              Produtos Cadastrados
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FDF2F4] text-[#9C4B5C] flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#1F1719] tracking-tight">
              {metrics.totalProducts}
            </div>
            <p className="text-[11px] text-[#78696F] mt-0.5">
              Itens ativos no catálogo
            </p>
          </div>
        </div>

        {/* 2. Unidades disponíveis */}
        <div className="bg-white border border-[#EAE0E3] rounded-xl p-4.5 flex flex-col justify-between shadow-2xs hover:border-[#D9CCD0] transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#6F5F64] uppercase tracking-wider">
              Unidades Disponíveis
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FDF2F4] text-[#9C4B5C] flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#1F1719] tracking-tight">
              {metrics.totalUnitsInStock} <span className="text-xs font-normal text-[#78696F]">peças</span>
            </div>
            <p className="text-[11px] text-[#78696F] mt-0.5">
              Saldo total no estoque físico
            </p>
          </div>
        </div>

        {/* 3. Estoque baixo */}
        <div 
          onClick={() => onNavigate('stock', 'overview')}
          className="bg-white border border-[#EAE0E3] rounded-xl p-4.5 flex flex-col justify-between shadow-2xs cursor-pointer hover:border-[#D9CCD0] transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#6F5F64] uppercase tracking-wider">
              Estoque Baixo
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF9EB] text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-amber-800 tracking-tight">
              {metrics.lowStockCount}
            </div>
            <p className="text-[11px] text-[#78696F] mt-0.5 flex items-center justify-between">
              <span>Abaixo do limite de reposição</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9C4B5C] group-hover:translate-x-0.5 transition-transform" />
            </p>
          </div>
        </div>

        {/* 4. Sem estoque */}
        <div 
          onClick={() => onNavigate('stock', 'overview')}
          className="bg-white border border-[#EAE0E3] rounded-xl p-4.5 flex flex-col justify-between shadow-2xs cursor-pointer hover:border-[#D9CCD0] transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#6F5F64] uppercase tracking-wider">
              Sem Estoque
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FDF2F4] text-rose-700 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-rose-700 tracking-tight">
              {metrics.outOfStockCount}
            </div>
            <p className="text-[11px] text-[#78696F] mt-0.5 flex items-center justify-between">
              <span>Peças esgotadas na loja</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9C4B5C] group-hover:translate-x-0.5 transition-transform" />
            </p>
          </div>
        </div>
      </div>

      {/* Grid Principal: Seção de Atenção & Movimentações Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seção de Atenção (1 coluna) */}
        <div className="bg-white rounded-xl border border-[#EAE0E3] p-5 flex flex-col shadow-2xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-[#EAE0E3]">
            <div>
              <h2 className="font-bold text-[#1F1719] text-sm">Atenção ao Estoque</h2>
              <p className="text-[11px] text-[#78696F]">Itens zerados ou próximos da reposição</p>
            </div>
            <button
              onClick={() => onNavigate('stock', 'overview')}
              className="text-xs font-semibold text-[#9C4B5C] hover:text-[#863C4B] flex items-center gap-1 transition-colors"
            >
              Consultar <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 flex-1 space-y-2.5">
            {criticalProducts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xs font-medium text-[#1F1719]">Estoque equilibrado</p>
                <p className="text-[11px] text-[#78696F] mt-0.5">Nenhum produto precisando de reposição imediata.</p>
              </div>
            ) : (
              criticalProducts.slice(0, 5).map(prod => {
                const isZero = prod.quantity === 0;
                return (
                  <div
                    key={prod.id}
                    className="p-3 rounded-lg border border-[#EAE0E3] bg-[#FAF6F7]/60 flex items-center justify-between gap-3 hover:bg-[#FAF6F7] transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isZero ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {isZero ? 'Sem Estoque' : 'Estoque Baixo'}
                        </span>
                        <span className="text-xs font-semibold text-[#1F1719] truncate">
                          {prod.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#78696F] mt-1">
                        Cód: <span className="font-mono text-[#1F1719] font-medium">{prod.sku}</span> | Saldo: <strong className="text-[#1F1719]">{prod.quantity}</strong> (mín. {prod.minStock})
                      </div>
                    </div>

                    <button
                      onClick={() => onQuickEntry(prod.id)}
                      className="shrink-0 px-2.5 py-1 text-xs font-medium rounded-md bg-white hover:bg-[#FAF6F7] text-[#1F1719] border border-[#E0D4D7] transition-colors"
                      title="Registrar entrada para este produto"
                    >
                      Repor
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Movimentações Recentes (2 colunas) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#EAE0E3] p-5 flex flex-col shadow-2xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-[#EAE0E3]">
            <div>
              <h2 className="font-bold text-[#1F1719] text-sm">Últimas Movimentações</h2>
              <p className="text-[11px] text-[#78696F]">Histórico recente de entradas, saídas e baixas</p>
            </div>
            <button
              onClick={() => onNavigate('movements')}
              className="text-xs font-semibold text-[#9C4B5C] hover:text-[#863C4B] flex items-center gap-1 transition-colors"
            >
              Histórico Completo <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-3 flex-1 overflow-x-auto">
            {recentMovements.length === 0 ? (
              <div className="text-center py-8 text-[#78696F] text-xs">
                Nenhuma movimentação registrada no histórico.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[#78696F] uppercase text-[10px] font-semibold border-b border-[#EAE0E3] pb-2">
                    <th className="py-2.5">Data/Hora</th>
                    <th className="py-2.5">Tipo</th>
                    <th className="py-2.5">Produto</th>
                    <th className="py-2.5 text-center">Qtd</th>
                    <th className="py-2.5 text-center">Estoque Resultante</th>
                    <th className="py-2.5">Motivo / Documento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE0E3]/60">
                  {recentMovements.slice(0, 6).map(mov => {
                    let typeBadge = (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Entrada
                      </span>
                    );
                    if (mov.type === 'SAIDA') {
                      typeBadge = (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#FAF6F7] text-[#1F1719] border border-[#E0D4D7]">
                          Saída
                        </span>
                      );
                    } else if (mov.type === 'BAIXA') {
                      typeBadge = (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-rose-50 text-rose-800 border border-rose-200">
                          Baixa
                        </span>
                      );
                    }

                    return (
                      <tr key={mov.id} className="hover:bg-[#FAF6F7]/50 transition-colors">
                        <td className="py-2.5 text-[#78696F] whitespace-nowrap text-[11px]">
                          {formatDate(mov.timestamp)}
                        </td>
                        <td className="py-2.5">{typeBadge}</td>
                        <td className="py-2.5">
                          <div className="font-medium text-[#1F1719]">{mov.productName}</div>
                          <div className="text-[10px] text-[#78696F] font-mono">{mov.productSku}</div>
                        </td>
                        <td className="py-2.5 text-center font-bold text-[#1F1719]">
                          {mov.type === 'ENTRADA' ? `+${mov.quantity}` : `-${mov.quantity}`}
                        </td>
                        <td className="py-2.5 text-center text-xs text-[#1F1719]">
                          <span className="text-[#78696F]">{mov.previousStock}</span>
                          <span className="mx-1 text-[#B09FA5]">➔</span>
                          <span className="font-bold text-[#1F1719]">{mov.newStock} un.</span>
                        </td>
                        <td className="py-2.5 text-[#78696F] max-w-[200px]">
                          <div className="font-medium text-[#1F1719] truncate">{mov.reason}</div>
                          {mov.referenceDoc && (
                            <div className="text-[10px] text-[#78696F] truncate">{mov.referenceDoc}</div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
