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
  onViewProduct,
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
      {/* Cabeçalho Limpo e Ações Rápidas Principais */}
      <div className="bg-[#FAE7E7] border border-[#EED9DC] rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-[#7A5B67] uppercase tracking-wider block mb-1">
            Exclusiva Store • Controle Diário
          </span>
          <h1 className="text-xl md:text-2xl font-bold text-[#0E0606] tracking-tight">
            Situação do Estoque
          </h1>
          <p className="text-xs text-[#7A5B67] mt-1 max-w-xl">
            Resumo em tempo real das mercadorias disponíveis, alertas de reposição e movimentações recentes.
          </p>
        </div>

        {/* 3 Ações Rápidas Claras e Diretas */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => onQuickEntry()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#CF7C89] hover:bg-[#BE6B78] text-[#FEFEFE] text-xs font-semibold transition-colors shadow-2xs"
            title="Registrar entrada de mercadoria"
          >
            <ArrowDownToDot className="w-4 h-4" />
            <span>Registrar Entrada</span>
          </button>

          <button
            onClick={() => onQuickExit()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FEFEFE] hover:bg-[#FDF7F7] text-[#0E0606] border border-[#EED9DC] text-xs font-semibold transition-colors"
            title="Registrar saída por venda ou transferência"
          >
            <ArrowUpFromDot className="w-4 h-4 text-[#CF7C89]" />
            <span>Registrar Saída</span>
          </button>

          <button
            onClick={onOpenNewProduct}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FEFEFE] hover:bg-[#FDF7F7] text-[#0E0606] border border-[#EED9DC] text-xs font-semibold transition-colors"
            title="Cadastrar um novo produto no estoque"
          >
            <Plus className="w-4 h-4 text-[#7A5B67]" />
            <span>Cadastrar Produto</span>
          </button>
        </div>
      </div>

      {/* 4 Indicadores Principais com Fundo e Contraste Harmonioso */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Produtos cadastrados */}
        <div className="bg-[#FAE7E7] border border-[#EED9DC] rounded-xl p-4.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7A5B67] uppercase tracking-wide">
              Produtos Cadastrados
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FEFEFE] border border-[#EED9DC] flex items-center justify-center text-[#7A5B67]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#0E0606] tracking-tight">
              {metrics.totalProducts}
            </div>
            <p className="text-[11px] text-[#7A5B67] mt-0.5">
              Itens ativos no catálogo
            </p>
          </div>
        </div>

        {/* 2. Unidades disponíveis */}
        <div className="bg-[#FAE7E7] border border-[#EED9DC] rounded-xl p-4.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7A5B67] uppercase tracking-wide">
              Unidades Disponíveis
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FEFEFE] border border-[#EED9DC] flex items-center justify-center text-[#CF7C89]">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#0E0606] tracking-tight">
              {metrics.totalUnitsInStock} <span className="text-xs font-normal text-[#7A5B67]">peças</span>
            </div>
            <p className="text-[11px] text-[#7A5B67] mt-0.5">
              Saldo total no estoque físico
            </p>
          </div>
        </div>

        {/* 3. Produtos com estoque baixo */}
        <div 
          onClick={() => onNavigate('stock', 'overview')}
          className="bg-[#FAE7E7] border border-[#EED9DC] rounded-xl p-4.5 flex flex-col justify-between cursor-pointer hover:border-[#CF7C89] transition-colors"
          title="Ver produtos com estoque baixo"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7A5B67] uppercase tracking-wide">
              Estoque Baixo
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FEFEFE] border border-[#EED9DC] flex items-center justify-center text-amber-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-amber-800 tracking-tight">
              {metrics.lowStockCount}
            </div>
            <p className="text-[11px] text-[#7A5B67] mt-0.5 flex items-center justify-between">
              <span>Abaixo do limite de reposição</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#CF7C89]" />
            </p>
          </div>
        </div>

        {/* 4. Produtos sem estoque (zerados) */}
        <div 
          onClick={() => onNavigate('stock', 'overview')}
          className="bg-[#FAE7E7] border border-[#EED9DC] rounded-xl p-4.5 flex flex-col justify-between cursor-pointer hover:border-[#CF7C89] transition-colors"
          title="Ver produtos sem estoque"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7A5B67] uppercase tracking-wide">
              Sem Estoque
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FEFEFE] border border-[#EED9DC] flex items-center justify-center text-rose-700">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-rose-800 tracking-tight">
              {metrics.outOfStockCount}
            </div>
            <p className="text-[11px] text-[#7A5B67] mt-0.5 flex items-center justify-between">
              <span>Peças esgotadas na loja</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#CF7C89]" />
            </p>
          </div>
        </div>
      </div>

      {/* Grid Principal: Seção de Atenção & Movimentações Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seção de Atenção (1 coluna) */}
        <div className="bg-[#FEFEFE] rounded-xl border border-[#EED9DC] p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3.5 border-b border-[#EED9DC]">
            <div>
              <h2 className="font-bold text-[#0E0606] text-sm">Atenção ao Estoque</h2>
              <p className="text-[11px] text-[#7A5B67]">Itens zerados ou próximos da reposição</p>
            </div>
            <button
              onClick={() => onNavigate('stock', 'overview')}
              className="text-xs font-semibold text-[#CF7C89] hover:text-[#BE6B78] flex items-center gap-1"
            >
              Consultar <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 flex-1 space-y-2.5">
            {criticalProducts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xs font-medium text-[#0E0606]">Estoque equilibrado</p>
                <p className="text-[11px] text-[#7A5B67] mt-0.5">Nenhum produto precisando de reposição imediata.</p>
              </div>
            ) : (
              criticalProducts.slice(0, 5).map(prod => {
                const isZero = prod.quantity === 0;
                return (
                  <div
                    key={prod.id}
                    className="p-3 rounded-lg border border-[#EED9DC] bg-[#FAE7E7]/50 flex items-center justify-between gap-3 hover:bg-[#FAE7E7] transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          isZero ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {isZero ? 'Sem Estoque' : 'Estoque Baixo'}
                        </span>
                        <span className="text-xs font-semibold text-[#0E0606] truncate">
                          {prod.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#7A5B67] mt-1">
                        Cód: <span className="font-mono text-[#0E0606]">{prod.sku}</span> | Saldo: <strong className="text-[#0E0606]">{prod.quantity}</strong> (mín. {prod.minStock})
                      </div>
                    </div>

                    <button
                      onClick={() => onQuickEntry(prod.id)}
                      className="shrink-0 px-2.5 py-1 text-xs font-medium rounded-md bg-[#FEFEFE] hover:bg-[#FAE7E7] text-[#0E0606] border border-[#EED9DC] transition-colors"
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
        <div className="lg:col-span-2 bg-[#FEFEFE] rounded-xl border border-[#EED9DC] p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3.5 border-b border-[#EED9DC]">
            <div>
              <h2 className="font-bold text-[#0E0606] text-sm">Últimas Movimentações</h2>
              <p className="text-[11px] text-[#7A5B67]">Histórico recente de entradas, saídas e baixas</p>
            </div>
            <button
              onClick={() => onNavigate('movements')}
              className="text-xs font-semibold text-[#CF7C89] hover:text-[#BE6B78] flex items-center gap-1"
            >
              Histórico Completo <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-3 flex-1 overflow-x-auto">
            {recentMovements.length === 0 ? (
              <div className="text-center py-8 text-[#7A5B67] text-xs">
                Nenhuma movimentação registrada no histórico.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[#7A5B67] uppercase text-[10px] font-semibold border-b border-[#EED9DC] pb-2">
                    <th className="py-2.5">Data/Hora</th>
                    <th className="py-2.5">Tipo</th>
                    <th className="py-2.5">Produto</th>
                    <th className="py-2.5 text-center">Qtd</th>
                    <th className="py-2.5 text-center">Estoque Resultante</th>
                    <th className="py-2.5">Motivo / Documento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EED9DC]/60">
                  {recentMovements.slice(0, 6).map(mov => {
                    let typeBadge = (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Entrada
                      </span>
                    );
                    if (mov.type === 'SAIDA') {
                      typeBadge = (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#FAE7E7] text-[#0E0606] border border-[#EED9DC]">
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
                      <tr key={mov.id} className="hover:bg-[#FAE7E7]/30 transition-colors">
                        <td className="py-2.5 text-[#7A5B67] whitespace-nowrap text-[11px]">
                          {formatDate(mov.timestamp)}
                        </td>
                        <td className="py-2.5">{typeBadge}</td>
                        <td className="py-2.5">
                          <div className="font-medium text-[#0E0606]">{mov.productName}</div>
                          <div className="text-[10px] text-[#7A5B67] font-mono">{mov.productSku}</div>
                        </td>
                        <td className="py-2.5 text-center font-bold text-[#0E0606]">
                          {mov.type === 'ENTRADA' ? `+${mov.quantity}` : `-${mov.quantity}`}
                        </td>
                        <td className="py-2.5 text-center text-xs text-[#0E0606]">
                          <span className="text-[#7A5B67]">{mov.previousStock}</span>
                          <span className="mx-1 text-[#AA8B97]">➔</span>
                          <span className="font-bold text-[#0E0606]">{mov.newStock} un.</span>
                        </td>
                        <td className="py-2.5 text-[#7A5B67] max-w-[200px]">
                          <div className="font-medium text-[#0E0606] truncate">{mov.reason}</div>
                          {mov.referenceDoc && (
                            <div className="text-[10px] text-[#7A5B67] truncate">{mov.referenceDoc}</div>
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
