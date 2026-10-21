import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  ArrowDownToDot, 
  Boxes, 
  Search,
  ArrowRight
} from 'lucide-react';
import { Product } from '../types';

interface StockAlertsPageProps {
  products: Product[];
  onQuickEntry: (productId: string) => void;
}

export const StockAlertsPage: React.FC<StockAlertsPageProps> = ({
  products,
  onQuickEntry,
}) => {
  const [filterTab, setFilterTab] = useState<'ALL' | 'CRITICAL' | 'LOW' | 'NORMAL'>('ALL');
  const [search, setSearch] = useState('');

  const stats = useMemo(() => {
    let outOfStock = 0;
    let lowStock = 0;
    let normal = 0;

    products.forEach(p => {
      if (p.quantity === 0) outOfStock++;
      else if (p.quantity <= p.minStock) lowStock++;
      else normal++;
    });

    return { outOfStock, lowStock, normal, total: products.length };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      if (filterTab === 'CRITICAL') return p.quantity === 0;
      if (filterTab === 'LOW') return p.quantity > 0 && p.quantity <= p.minStock;
      if (filterTab === 'NORMAL') return p.quantity > p.minStock;
      return true;
    });
  }, [products, filterTab, search]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Supervisão de Estoque & Alertas de Reposição
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Identifique rupturas imediatas e produtos com nível de estoque inferior ao limite de segurança recomendado.
        </p>
      </div>

      {/* Tabs / Filter Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* All */}
        <button
          onClick={() => setFilterTab('ALL')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            filterTab === 'ALL'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs font-semibold opacity-80 uppercase tracking-wider">Todos os Produtos</div>
          <div className="text-2xl font-black mt-1">{stats.total}</div>
          <div className="text-[11px] mt-1 opacity-70">Itens monitorados</div>
        </button>

        {/* Esgotados */}
        <button
          onClick={() => setFilterTab('CRITICAL')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            filterTab === 'CRITICAL'
              ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20'
              : 'bg-rose-50/60 text-rose-900 border-rose-200 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">Sem Estoque (Zerados)</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black mt-1">{stats.outOfStock}</div>
          <div className="text-[11px] mt-1 opacity-80">Ruptura crítica imediata</div>
        </button>

        {/* Baixo */}
        <button
          onClick={() => setFilterTab('LOW')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            filterTab === 'LOW'
              ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20 font-bold'
              : 'bg-amber-50/60 text-amber-900 border-amber-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">Estoque Baixo</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black mt-1">{stats.lowStock}</div>
          <div className="text-[11px] mt-1 opacity-80">Abaixo do limite de segurança</div>
        </button>

        {/* Normal */}
        <button
          onClick={() => setFilterTab('NORMAL')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            filterTab === 'NORMAL'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
              : 'bg-emerald-50/60 text-emerald-900 border-emerald-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">Estoque Normal</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black mt-1">{stats.normal}</div>
          <div className="text-[11px] mt-1 opacity-80">Nível saudável de peças</div>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Filtrar por nome do produto ou SKU..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
        />
      </div>

      {/* Products Grid with Stock Level Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
            <Boxes className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-xs font-semibold text-slate-600">Nenhum produto para esta condição</p>
          </div>
        ) : (
          filteredProducts.map(prod => {
            const isZero = prod.quantity === 0;
            const isLow = prod.quantity > 0 && prod.quantity <= prod.minStock;

            // Percentage calculated against target safe buffer (2x minStock)
            const targetCapacity = Math.max(prod.minStock * 2, 10);
            const percentage = Math.min(100, Math.round((prod.quantity / targetCapacity) * 100));

            return (
              <div
                key={prod.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
                  isZero
                    ? 'border-rose-300 bg-rose-50/20'
                    : isLow
                    ? 'border-amber-300 bg-amber-50/20'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {prod.sku}
                    </span>

                    {isZero ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                        <XCircle className="w-3 h-3" /> Zerado
                      </span>
                    ) : isLow ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        <AlertTriangle className="w-3 h-3" /> Repor
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Saudável
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{prod.name}</h3>
                  <div className="text-[11px] text-slate-500 mt-1">{prod.category}</div>

                  {/* Stock Quantity vs Min Stock Display */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-500">Estoque Disponível:</span>
                      <span className={`font-black text-sm ${isZero ? 'text-rose-600' : isLow ? 'text-amber-600' : 'text-slate-900'}`}>
                        {prod.quantity} unidades
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs mb-2 text-slate-500">
                      <span>Estoque Mínimo Definido:</span>
                      <span className="font-bold text-slate-700">{prod.minStock} unidades</span>
                    </div>

                    {/* Progress visual bar */}
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isZero
                            ? 'w-0'
                            : isLow
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.max(percentage, isZero ? 0 : 8)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {isZero ? 'Reabastecimento urgente' : isLow ? 'Pedido sugerido' : 'Operação regular'}
                  </span>

                  <button
                    onClick={() => onQuickEntry(prod.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xs transition-colors"
                  >
                    <ArrowDownToDot className="w-3.5 h-3.5" />
                    Repor Peças
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
