import React, { useMemo } from 'react';
import { 
  Package, 
  Boxes, 
  AlertTriangle, 
  XCircle, 
  ArrowDownToDot, 
  ArrowUpFromDot, 
  Plus, 
  ArrowRight,
  TrendingUp,
  DollarSign,
  PieChart,
  Tag,
  ShieldCheck,
  FileSpreadsheet
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
  products = [],
  onNavigate,
  onOpenNewProduct,
  onQuickEntry,
  onQuickExit,
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

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

  // Cálculo da Margem Projetada de Lucro
  const projectedProfit = Math.max(0, metrics.totalSaleValue - metrics.totalCostValue);
  const profitMarginPercent = metrics.totalSaleValue > 0 
    ? ((projectedProfit / metrics.totalSaleValue) * 100).toFixed(1) 
    : '0.0';

  const avgPiecePrice = metrics.totalUnitsInStock > 0 
    ? metrics.totalSaleValue / metrics.totalUnitsInStock 
    : 0;

  // Agrupamento por Categoria para Gestão de Mix de Produtos
  const categorySummary = useMemo(() => {
    const map = new Map<string, { count: number; units: number; saleValue: number }>();
    
    products.forEach(p => {
      const cat = p.category || 'Geral';
      const existing = map.get(cat) || { count: 0, units: 0, saleValue: 0 };
      existing.count += 1;
      existing.units += p.quantity;
      existing.saleValue += (p.salePrice || 0) * p.quantity;
      map.set(cat, existing);
    });

    const list = Array.from(map.entries()).map(([name, data]) => ({
      name,
      ...data,
      percentOfUnits: metrics.totalUnitsInStock > 0 ? (data.units / metrics.totalUnitsInStock) * 100 : 0
    }));

    return list.sort((a, b) => b.units - a.units);
  }, [products, metrics.totalUnitsInStock]);

  const isSystemEmpty = metrics.totalProducts === 0;

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Dashboard de Gestão */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
            Exclusiva Store • Gestão Estratégica & Operacional
          </span>
          <h1 className="text-xl md:text-2xl font-bold text-zinc-950 tracking-tight">
            Dashboard de Gestão de Mercadorias
          </h1>
          <p className="text-xs text-zinc-500 mt-1 max-w-xl">
            Indicadores de capital investido, faturamento potencial, liquidez física de estoque e movimentações.
          </p>
        </div>

        {/* Ações Rápidas de Gestão */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => onQuickEntry()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors shadow-xs"
            title="Registrar entrada de mercadorias"
          >
            <ArrowDownToDot className="w-4 h-4" />
            <span>Registrar Entrada</span>
          </button>

          <button
            onClick={() => onQuickExit()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 text-xs font-semibold transition-colors"
            title="Registrar saída por venda ou transferência"
          >
            <ArrowUpFromDot className="w-4 h-4 text-zinc-600" />
            <span>Registrar Saída</span>
          </button>

          <button
            onClick={onOpenNewProduct}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 text-xs font-semibold transition-colors"
            title="Cadastrar uma nova mercadoria"
          >
            <Plus className="w-4 h-4 text-zinc-600" />
            <span>Cadastrar Produto</span>
          </button>
        </div>
      </div>

      {/* ESTADO VAZIO LIMPO E CONVIDATIVO */}
      {isSystemEmpty && (
        <div className="bg-white border border-zinc-200 rounded-xl p-8 text-center shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-zinc-950">Seu estoque está zerado e pronto para uso</h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1 mb-5">
            Cadastre os primeiros produtos da loja para começar a registrar entradas, saídas, controle de estoque mínimo e acompanhar os indicadores gerenciais em tempo real.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenNewProduct}
              className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              Cadastrar Primeira Mercadoria
            </button>
            <button
              onClick={() => onNavigate('stock', 'entry')}
              className="px-4 py-2 rounded-lg bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 text-xs font-semibold transition-colors"
            >
              Registrar Entrada de Lote
            </button>
          </div>
        </div>
      )}

      {/* 4 Indicadores Físicos de Estoque */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total de Produtos */}
        <div className="bg-white border border-zinc-200 rounded-xl p-4.5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              Produtos Ativos
            </span>
            <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-zinc-950 tracking-tight">
              {metrics.totalProducts}
            </div>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Mercadorias no catálogo
            </p>
          </div>
        </div>

        {/* Unidades Físicas Disponíveis */}
        <div className="bg-white border border-zinc-200 rounded-xl p-4.5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              Unidades Físicas
            </span>
            <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-zinc-950 tracking-tight">
              {metrics.totalUnitsInStock} <span className="text-xs font-normal text-zinc-500">peças</span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Saldo total disponível
            </p>
          </div>
        </div>

        {/* Estoque Baixo */}
        <div 
          onClick={() => onNavigate('stock', 'overview')}
          className="bg-white border border-zinc-200 rounded-xl p-4.5 flex flex-col justify-between cursor-pointer hover:border-zinc-400 hover:bg-zinc-50/50 transition-colors shadow-xs group"
          title="Ver produtos com estoque baixo"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              Estoque Baixo
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-amber-700 tracking-tight">
              {metrics.lowStockCount}
            </div>
            <p className="text-[11px] text-zinc-500 mt-0.5 flex items-center justify-between">
              <span>No limite de reposição</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all" />
            </p>
          </div>
        </div>

        {/* Sem Estoque (Zerados) */}
        <div 
          onClick={() => onNavigate('stock', 'overview')}
          className="bg-white border border-zinc-200 rounded-xl p-4.5 flex flex-col justify-between cursor-pointer hover:border-zinc-400 hover:bg-zinc-50/50 transition-colors shadow-xs group"
          title="Ver produtos sem estoque"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
              Sem Estoque
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-rose-700 tracking-tight">
              {metrics.outOfStockCount}
            </div>
            <p className="text-[11px] text-zinc-500 mt-0.5 flex items-center justify-between">
              <span>Ruptura de vendas</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all" />
            </p>
          </div>
        </div>
      </div>

      {/* PAINEL DE GESTÃO FINANCEIRA E DE VALOR DO ESTOQUE */}
      <div className="bg-white border border-zinc-200 rounded-xl p-5 md:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-950">Indicadores Financeiros de Estoque</h2>
              <p className="text-[11px] text-zinc-500">Valor de custo investido, potencial de receita e projeção de margem</p>
            </div>
          </div>
          <span className="text-[11px] font-medium text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-md self-start sm:self-auto">
            Atualizado em tempo real
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Custo Total Investido */}
          <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
            <span className="text-[11px] text-zinc-500 uppercase font-semibold block">Capital Investido (Custo)</span>
            <div className="text-xl font-bold text-zinc-900 mt-1">
              {formatCurrency(metrics.totalCostValue)}
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5">Valor de custo das peças em loja</p>
          </div>

          {/* Faturamento Potencial (Venda) */}
          <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
            <span className="text-[11px] text-zinc-500 uppercase font-semibold block">Valor a Preço de Venda</span>
            <div className="text-xl font-bold text-zinc-950 mt-1">
              {formatCurrency(metrics.totalSaleValue)}
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5">Receita bruta estimada do estoque</p>
          </div>

          {/* Margem Bruta Projetada */}
          <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
            <span className="text-[11px] text-zinc-500 uppercase font-semibold block">Margem Bruta Projetada</span>
            <div className="text-xl font-bold text-emerald-800 mt-1 flex items-baseline gap-1.5">
              <span>{profitMarginPercent}%</span>
              <span className="text-xs text-zinc-500 font-normal">({formatCurrency(projectedProfit)})</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5">Lucro bruto previsto sobre o estoque</p>
          </div>

          {/* Preço Médio por Peça */}
          <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200">
            <span className="text-[11px] text-zinc-500 uppercase font-semibold block">Ticket Médio por Peça</span>
            <div className="text-xl font-bold text-zinc-900 mt-1">
              {formatCurrency(avgPiecePrice)}
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5">Preço médio de venda do mix</p>
          </div>
        </div>
      </div>

      {/* GRID DUPLO: MIX POR CATEGORIA & ATENÇÃO IMEDIATA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribuição por Categoria (1 coluna) */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 flex flex-col shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200">
            <div>
              <h2 className="font-bold text-zinc-900 text-sm">Distribuição por Categoria</h2>
              <p className="text-[11px] text-zinc-500">Composição do mix de mercadorias</p>
            </div>
            <Tag className="w-4 h-4 text-zinc-400" />
          </div>

          <div className="mt-4 flex-1 space-y-3.5">
            {categorySummary.length === 0 ? (
              <div className="text-center py-8 text-zinc-400 text-xs">
                Nenhuma categoria registrada ainda.
              </div>
            ) : (
              categorySummary.map(cat => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-900">{cat.name}</span>
                    <span className="text-zinc-500 font-mono text-[11px]">
                      {cat.units} un. ({cat.percentOfUnits.toFixed(0)}%)
                    </span>
                  </div>
                  {/* Barra de progresso neutra e elegante */}
                  <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-zinc-800 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(5, cat.percentOfUnits))}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-zinc-400 text-right">
                    Valor: {formatCurrency(cat.saleValue)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Itens com Atenção e Reposição Urgente (2 colunas) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-zinc-200 p-5 flex flex-col shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200">
            <div>
              <h2 className="font-bold text-zinc-900 text-sm">Decisões Rápidas: Reposição de Estoque</h2>
              <p className="text-[11px] text-zinc-500">Mercadorias que precisam de compra ou nova entrada</p>
            </div>
            <button
              onClick={() => onNavigate('stock', 'overview')}
              className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 flex items-center gap-1"
            >
              Consultar Todos <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 flex-1 space-y-2.5">
            {criticalProducts.length === 0 ? (
              <div className="text-center py-8">
                <ShieldCheck className="w-8 h-8 mx-auto text-zinc-400 mb-1" />
                <p className="text-xs font-medium text-zinc-900">Nenhum produto em nível crítico</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">Todas as mercadorias ativas estão acima do estoque mínimo de segurança.</p>
              </div>
            ) : (
              criticalProducts.slice(0, 6).map(prod => {
                const isZero = prod.quantity === 0;
                return (
                  <div
                    key={prod.id}
                    className="p-3 rounded-lg border border-zinc-200 bg-zinc-50/60 flex items-center justify-between gap-3 hover:bg-zinc-100/70 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                          isZero ? 'bg-rose-50 text-rose-800 border-rose-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {isZero ? 'ESGOTADO' : 'ESTOQUE BAIXO'}
                        </span>
                        <span className="text-xs font-semibold text-zinc-900 truncate">
                          {prod.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-500 mt-1">
                        Código: <span className="font-mono text-zinc-900">{prod.sku}</span> | Saldo Atual: <strong className="text-zinc-900">{prod.quantity}</strong> (Limite mínimo: {prod.minStock} un.)
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onQuickEntry(prod.id)}
                        className="px-3 py-1 text-xs font-semibold rounded-md bg-zinc-900 hover:bg-zinc-800 text-white transition-colors"
                        title="Registrar entrada para este produto"
                      >
                        Repor Peças
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* HISTÓRICO DAS ÚLTIMAS MOVIMENTAÇÕES DE GESTÃO */}
      <div className="bg-white rounded-xl border border-zinc-200 p-5 flex flex-col shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200">
          <div>
            <h2 className="font-bold text-zinc-900 text-sm">Últimas Transações e Movimentações Registradas</h2>
            <p className="text-[11px] text-zinc-500">Auditoria cronológica de entradas, saídas de vendas e baixas</p>
          </div>
          <button
            onClick={() => onNavigate('movements')}
            className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 flex items-center gap-1"
          >
            Histórico Completo <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-3 overflow-x-auto">
          {recentMovements.length === 0 ? (
            <div className="text-center py-8 text-zinc-400 text-xs">
              Nenhuma movimentação realizada até o momento. As novas entradas e saídas aparecerão aqui.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-zinc-50 text-zinc-500 uppercase text-[10px] font-semibold border-b border-zinc-200">
                  <th className="py-2.5 px-3">Data e Hora</th>
                  <th className="py-2.5 px-3">Tipo</th>
                  <th className="py-2.5 px-3">Mercadoria</th>
                  <th className="py-2.5 px-3 text-center">Quantidade</th>
                  <th className="py-2.5 px-3 text-center">Saldo Resultante</th>
                  <th className="py-2.5 px-3">Motivo / Documento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/60">
                {recentMovements.slice(0, 6).map(mov => {
                  let typeBadge = (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Entrada
                    </span>
                  );
                  if (mov.type === 'SAIDA') {
                    typeBadge = (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 text-zinc-800 border border-zinc-200">
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
                    <tr key={mov.id} className="hover:bg-zinc-50/80 transition-colors">
                      <td className="py-2.5 px-3 text-zinc-500 whitespace-nowrap text-[11px]">
                        {formatDate(mov.timestamp)}
                      </td>
                      <td className="py-2.5 px-3">{typeBadge}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-medium text-zinc-900">{mov.productName}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">{mov.productSku}</div>
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-zinc-900">
                        {mov.type === 'ENTRADA' ? `+${mov.quantity}` : `-${mov.quantity}`}
                      </td>
                      <td className="py-2.5 px-3 text-center text-xs text-zinc-900">
                        <span className="text-zinc-400">{mov.previousStock}</span>
                        <span className="mx-1 text-zinc-300">➔</span>
                        <span className="font-semibold text-zinc-900">{mov.newStock} un.</span>
                      </td>
                      <td className="py-2.5 px-3 text-zinc-500 max-w-[220px]">
                        <div className="font-medium text-zinc-800 truncate">{mov.reason}</div>
                        {mov.referenceDoc && (
                          <div className="text-[10px] text-zinc-400 truncate">{mov.referenceDoc}</div>
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
  );
};
