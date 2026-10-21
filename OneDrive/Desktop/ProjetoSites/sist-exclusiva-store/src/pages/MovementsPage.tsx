import React, { useState, useMemo } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  ArrowDownToDot, 
  ArrowUpFromDot, 
  FileWarning, 
  Download, 
  Calendar,
  FileSpreadsheet,
  Boxes
} from 'lucide-react';
import { Movement, Product } from '../types';

interface MovementsPageProps {
  movements: Movement[];
  products: Product[];
}

export const MovementsPage: React.FC<MovementsPageProps> = ({
  movements,
  products,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'ENTRADA' | 'SAIDA' | 'BAIXA'>('ALL');
  const [productFilter, setProductFilter] = useState('ALL');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredMovements = useMemo(() => {
    return movements.filter(m => {
      // Tipo
      if (typeFilter !== 'ALL' && m.type !== typeFilter) return false;

      // Produto
      if (productFilter !== 'ALL' && m.productId !== productFilter) return false;

      // Busca livre
      const term = searchTerm.toLowerCase();
      const matchSearch =
        m.productName.toLowerCase().includes(term) ||
        m.productSku.toLowerCase().includes(term) ||
        m.reason.toLowerCase().includes(term) ||
        (m.referenceDoc && m.referenceDoc.toLowerCase().includes(term)) ||
        (m.supplier && m.supplier.toLowerCase().includes(term)) ||
        (m.notes && m.notes.toLowerCase().includes(term));

      if (!matchSearch) return false;

      // Período
      const movDate = new Date(m.timestamp);
      if (startDate) {
        const start = new Date(startDate + 'T00:00:00');
        if (movDate < start) return false;
      }
      if (endDate) {
        const end = new Date(endDate + 'T23:59:59');
        if (movDate > end) return false;
      }

      return true;
    });
  }, [movements, typeFilter, productFilter, searchTerm, startDate, endDate]);

  const handleExportCSV = () => {
    const headers = [
      'Data/Hora',
      'Tipo',
      'Produto',
      'SKU',
      'Quantidade',
      'Estoque Anterior',
      'Estoque Posterior',
      'Motivo',
      'Fornecedor',
      'Documento/NF',
      'Observações',
    ];

    const rows = filteredMovements.map(m => [
      `"${new Date(m.timestamp).toLocaleString('pt-BR')}"`,
      `"${m.type}"`,
      `"${m.productName.replace(/"/g, '""')}"`,
      `"${m.productSku}"`,
      m.type === 'ENTRADA' ? `+${m.quantity}` : `-${m.quantity}`,
      m.previousStock,
      m.newStock,
      `"${m.reason.replace(/"/g, '""')}"`,
      `"${(m.supplier || '').replace(/"/g, '""')}"`,
      `"${(m.referenceDoc || '').replace(/"/g, '""')}"`,
      `"${(m.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `historico-movimentacoes-exclusiva-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Title & Export action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Histórico Completo & Auditoria</h2>
          <p className="text-xs text-slate-500 mt-1">
            Rastreabilidade total e imutável de todas as movimentações (entradas, saídas e baixas) realizadas no estoque.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide shadow-sm transition-all hover:scale-[1.01] shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          Exportar Relatório (CSV)
        </button>
      </div>

      {/* Filters Card */}
      <div className="bg-white p-4.5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por produto, SKU, motivo ou doc..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value as any)}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="ALL">Tipo: Todas as Operações</option>
              <option value="ENTRADA">Apenas Entradas (+)</option>
              <option value="SAIDA">Apenas Saídas (-)</option>
              <option value="BAIXA">Apenas Baixas / Avarias (!)</option>
            </select>
          </div>

          {/* Product Filter */}
          <div>
            <select
              value={productFilter}
              onChange={e => setProductFilter(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="ALL">Produto: Todos</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.sku})
                </option>
              ))}
            </select>
          </div>

          {/* Date range */}
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-2 py-2 rounded-xl text-[11px] bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none"
              title="Data Inicial"
            />
            <span className="text-slate-400 text-xs">até</span>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-2 py-2 rounded-xl text-[11px] bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none"
              title="Data Final"
            />
          </div>
        </div>

        {/* Counts */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Mostrando <strong>{filteredMovements.length}</strong> movimentação(ões) auditada(s)
          </span>
          {(searchTerm || typeFilter !== 'ALL' || productFilter !== 'ALL' || startDate || endDate) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('ALL');
                setProductFilter('ALL');
                setStartDate('');
                setEndDate('');
              }}
              className="text-amber-600 hover:text-amber-800 font-semibold"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Movements Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 font-bold">Data/Hora</th>
                <th className="py-3 px-4 font-bold">Tipo</th>
                <th className="py-3 px-4 font-bold">Produto & SKU</th>
                <th className="py-3 px-4 font-bold text-center">Movimentado</th>
                <th className="py-3 px-4 font-bold text-center">Histórico Saldo</th>
                <th className="py-3 px-4 font-bold">Motivo / Finalidade</th>
                <th className="py-3 px-4 font-bold">Referência / Doc</th>
                <th className="py-3 px-4 font-bold">Observações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMovements.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Boxes className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="text-xs font-semibold text-slate-600">Nenhum registro encontrado</p>
                    <p className="text-[11px] text-slate-400">Ajuste os filtros de data, tipo ou termos de pesquisa.</p>
                  </td>
                </tr>
              ) : (
                filteredMovements.map(m => {
                  let badge = (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <ArrowDownToDot className="w-3 h-3" /> Entrada
                    </span>
                  );
                  if (m.type === 'SAIDA') {
                    badge = (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                        <ArrowUpFromDot className="w-3 h-3" /> Saída
                      </span>
                    );
                  } else if (m.type === 'BAIXA') {
                    badge = (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                        <FileWarning className="w-3 h-3" /> Baixa
                      </span>
                    );
                  }

                  return (
                    <tr key={m.id} className="hover:bg-slate-50/90 transition-colors">
                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap font-medium text-[11px]">
                        {new Date(m.timestamp).toLocaleDateString('pt-BR')} {new Date(m.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-4">{badge}</td>

                      {/* Product */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{m.productName}</div>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">{m.productSku}</div>
                      </td>

                      {/* Quantity */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`text-xs font-black ${
                          m.type === 'ENTRADA' ? 'text-emerald-700' : m.type === 'SAIDA' ? 'text-blue-700' : 'text-rose-700'
                        }`}>
                          {m.type === 'ENTRADA' ? `+${m.quantity}` : `-${m.quantity}`} un.
                        </span>
                      </td>

                      {/* Previous and Next */}
                      <td className="py-3.5 px-4 text-center text-xs font-mono">
                        <span className="text-slate-400">{m.previousStock}</span>
                        <span className="mx-1 text-slate-300">➔</span>
                        <span className="font-bold text-slate-900">{m.newStock} un.</span>
                      </td>

                      {/* Reason */}
                      <td className="py-3.5 px-4 font-medium text-slate-800 max-w-[200px] truncate">
                        {m.reason}
                      </td>

                      {/* Reference Doc / Supplier */}
                      <td className="py-3.5 px-4 text-slate-600 text-[11px] max-w-[180px] truncate">
                        {m.referenceDoc && <div className="font-mono text-slate-800">{m.referenceDoc}</div>}
                        {m.supplier && <div className="text-slate-500">{m.supplier}</div>}
                        {!m.referenceDoc && !m.supplier && <span className="text-slate-400">—</span>}
                      </td>

                      {/* Notes */}
                      <td className="py-3.5 px-4 text-slate-500 text-[11px] max-w-[200px] truncate">
                        {m.notes || '—'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
