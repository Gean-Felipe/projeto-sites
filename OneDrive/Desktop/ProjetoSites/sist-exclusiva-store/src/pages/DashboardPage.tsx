import React from 'react';
import { 
  Package, 
  Boxes, 
  AlertTriangle, 
  XCircle, 
  ArrowDownToDot, 
  ArrowUpFromDot, 
  FileWarning, 
  DollarSign, 
  Plus, 
  ArrowRight,
  Truck,
  TrendingUp,
  Clock
} from 'lucide-react';
import { DashboardMetrics, Movement, Product, ActivePage } from '../types';

interface DashboardProps {
  metrics: DashboardMetrics;
  recentMovements: Movement[];
  criticalProducts: Product[];
  onNavigate: (page: ActivePage) => void;
  onOpenNewProduct: () => void;
  onQuickEntry: (productId?: string) => void;
  onQuickExit: (productId?: string) => void;
  onQuickLoss: (productId?: string) => void;
}

export const DashboardPage: React.FC<DashboardProps> = ({
  metrics,
  recentMovements,
  criticalProducts,
  onNavigate,
  onOpenNewProduct,
  onQuickEntry,
  onQuickExit,
  onQuickLoss,
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

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner / Welcome with quick stats */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider inline-block mb-3">
              Painel de Controle em Tempo Real
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Gestão de Mercadorias Exclusiva Store
            </h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Monitore a rotatividade de peças, garanta a reposição pontual e mantenha a consistência total entre entradas, saídas e estoque físico.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              onClick={() => onQuickEntry()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02]"
            >
              <ArrowDownToDot className="w-4 h-4" />
              Entrada de Peças
            </button>
            <button
              onClick={() => onQuickExit()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-950/40 transition-all hover:scale-[1.02]"
            >
              <ArrowUpFromDot className="w-4 h-4" />
              Saída / Venda
            </button>
            <button
              onClick={onOpenNewProduct}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-amber-950/40 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              Cadastrar Produto
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Produtos Cadastrados</span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">{metrics.totalProducts}</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span>{metrics.totalUnitsInStock} unidades no estoque global</span>
            </p>
          </div>
        </div>

        {/* Units in Stock */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Unidades Disponíveis</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Boxes className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-amber-700 tracking-tight">{metrics.totalUnitsInStock}</div>
            <p className="text-xs text-slate-500 mt-1">
              Valor estimado: <span className="font-semibold text-slate-800">{formatCurrency(metrics.totalSaleValue)}</span>
            </p>
          </div>
        </div>

        {/* Low Stock Warning */}
        <div 
          onClick={() => onNavigate('stock-alerts')}
          className="bg-white p-5 rounded-2xl border border-amber-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Estoque Baixo</span>
            <div className="w-10 h-10 rounded-xl bg-amber-100/70 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-amber-600 tracking-tight">{metrics.lowStockCount}</div>
            <p className="text-xs text-amber-700 font-medium mt-1 flex items-center justify-between">
              <span>Itens no limite de reposição</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-1 transition-transform" />
            </p>
          </div>
        </div>

        {/* Out of Stock (Zero) */}
        <div 
          onClick={() => onNavigate('stock-alerts')}
          className="bg-white p-5 rounded-2xl border border-rose-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-800 uppercase tracking-wider">Sem Estoque (Zerados)</span>
            <div className="w-10 h-10 rounded-xl bg-rose-100/70 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-rose-600 tracking-tight">{metrics.outOfStockCount}</div>
            <p className="text-xs text-rose-700 font-medium mt-1 flex items-center justify-between">
              <span>Ruptura de estoque imediata</span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-1 transition-transform" />
            </p>
          </div>
        </div>
      </div>

      {/* Secondary Metrics Bar (Flow summaries) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Entradas */}
        <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ArrowDownToDot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-900 uppercase">Entradas de Mercadorias</div>
              <div className="text-sm font-semibold text-emerald-800">
                {metrics.totalEntriesCount} operações ({metrics.totalEntriesUnits} peças recebidas)
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('entries')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 px-2.5 py-1 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            Ver
          </button>
        </div>

        {/* Saídas */}
        <div className="bg-blue-50/50 border border-blue-200/80 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <ArrowUpFromDot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-blue-900 uppercase">Saídas / Vendas</div>
              <div className="text-sm font-semibold text-blue-800">
                {metrics.totalExitsCount} operações ({metrics.totalExitsUnits} peças retiradas)
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('exits')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Ver
          </button>
        </div>

        {/* Baixas / Avarias */}
        <div className="bg-rose-50/50 border border-rose-200/80 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <FileWarning className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-rose-900 uppercase">Baixas & Avarias</div>
              <div className="text-sm font-semibold text-rose-800">
                {metrics.totalLossesCount} registros ({metrics.totalLossesUnits} peças perdidas)
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('losses')}
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 px-2.5 py-1 rounded-lg hover:bg-rose-100 transition-colors"
          >
            Ver
          </button>
        </div>
      </div>

      {/* Main Two Columns: Critical Alerts & Recent Movements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Alerts (1 col) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-base">Atenção ao Estoque</h3>
            </div>
            <button
              onClick={() => onNavigate('stock-alerts')}
              className="text-xs font-semibold text-amber-600 hover:text-amber-800 flex items-center gap-1"
            >
              Ver todos <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 flex-1 space-y-3">
            {criticalProducts.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Boxes className="w-10 h-10 mx-auto text-emerald-400/80 mb-2" />
                <p className="text-xs font-medium text-slate-600">Estoque 100% equilibrado!</p>
                <p className="text-[11px] text-slate-400">Nenhum produto em nível crítico no momento.</p>
              </div>
            ) : (
              criticalProducts.slice(0, 5).map(prod => {
                const isZero = prod.quantity === 0;
                return (
                  <div
                    key={prod.id}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                      isZero ? 'bg-rose-50/50 border-rose-200' : 'bg-amber-50/50 border-amber-200'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isZero ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
                        }`}>
                          {isZero ? 'ESGOTADO' : 'BAIXO'}
                        </span>
                        <span className="text-xs font-bold text-slate-900 truncate">{prod.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        SKU: <span className="font-mono text-slate-700">{prod.sku}</span> | Estoque: <span className="font-bold text-slate-900">{prod.quantity}</span> (Mín: {prod.minStock})
                      </div>
                    </div>

                    <button
                      onClick={() => onQuickEntry(prod.id)}
                      className="shrink-0 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-colors shadow-2xs"
                      title="Repor Estoque deste produto"
                    >
                      Repor
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Movements (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-600" />
              <h3 className="font-bold text-slate-900 text-base">Últimas Movimentações Realizadas</h3>
            </div>
            <button
              onClick={() => onNavigate('movements')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              Histórico Completo <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 flex-1 overflow-x-auto">
            {recentMovements.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <p className="text-xs font-medium">Nenhuma movimentação registrada até o momento.</p>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-100 pb-2">
                    <th className="py-2 font-semibold">Tipo</th>
                    <th className="py-2 font-semibold">Produto</th>
                    <th className="py-2 font-semibold text-center">Qtd</th>
                    <th className="py-2 font-semibold text-center">Estoque</th>
                    <th className="py-2 font-semibold">Motivo / Doc</th>
                    <th className="py-2 font-semibold text-right">Data/Hora</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentMovements.slice(0, 6).map(mov => {
                    let badge = (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        + Entrada
                      </span>
                    );
                    if (mov.type === 'SAIDA') {
                      badge = (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          - Saída
                        </span>
                      );
                    } else if (mov.type === 'BAIXA') {
                      badge = (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                          ! Baixa
                        </span>
                      );
                    }

                    return (
                      <tr key={mov.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 font-medium">{badge}</td>
                        <td className="py-3">
                          <div className="font-semibold text-slate-900">{mov.productName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{mov.productSku}</div>
                        </td>
                        <td className="py-3 text-center font-bold text-slate-900">
                          {mov.type === 'ENTRADA' ? `+${mov.quantity}` : `-${mov.quantity}`}
                        </td>
                        <td className="py-3 text-center text-[11px] text-slate-600">
                          <span className="text-slate-400">{mov.previousStock}</span>
                          <span className="mx-1 text-slate-300">➔</span>
                          <span className="font-bold text-slate-800">{mov.newStock}</span>
                        </td>
                        <td className="py-3 text-slate-600 max-w-[180px] truncate">
                          <div className="font-medium text-slate-800 truncate">{mov.reason}</div>
                          {mov.referenceDoc && (
                            <div className="text-[10px] text-slate-400 truncate">{mov.referenceDoc}</div>
                          )}
                        </td>
                        <td className="py-3 text-right text-slate-500 whitespace-nowrap">
                          {formatDate(mov.timestamp)}
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
