import React, { useState, useMemo } from 'react';
import { 
  Search, 
  FileSpreadsheet, 
  Eye, 
  Calendar,
  X
} from 'lucide-react';
import { Movement, Product } from '../types/index.ts';
import { Modal } from '../components/Modal';

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
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);

  const filteredMovements = useMemo(() => {
    return movements.filter(m => {
      // Tipo
      if (typeFilter !== 'ALL' && m.type !== typeFilter) return false;

      // Produto
      if (productFilter !== 'ALL' && m.productId !== productFilter) return false;

      // Busca por texto
      const term = searchTerm.toLowerCase();
      const matchSearch =
        m.productName.toLowerCase().includes(term) ||
        m.productSku.toLowerCase().includes(term) ||
        m.reason.toLowerCase().includes(term) ||
        (m.referenceDoc && m.referenceDoc.toLowerCase().includes(term)) ||
        (m.supplier && m.supplier.toLowerCase().includes(term));

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
      'Saldo Resultante',
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
      {/* Cabeçalho e Ação de Exportação */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-zinc-950 tracking-tight">Histórico de Movimentações</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Registro cronológico e rastreável de todas as entradas, saídas e baixas efetuadas.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors shadow-xs shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Exportar Relatório (CSV)</span>
        </button>
      </div>

      {/* Painel de Filtros Neutro */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Busca Livre */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar por produto, SKU, motivo ou doc..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400"
            />
          </div>

          {/* Filtro por Tipo */}
          <div>
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-400"
            >
              <option value="ALL">Todos os tipos</option>
              <option value="ENTRADA">Apenas Entradas</option>
              <option value="SAIDA">Apenas Saídas</option>
              <option value="BAIXA">Apenas Baixas</option>
            </select>
          </div>

          {/* Filtro por Produto */}
          <div>
            <select
              value={productFilter}
              onChange={e => setProductFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-400"
            >
              <option value="ALL">Todos os produtos</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Limpar Filtros */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('ALL');
                setProductFilter('ALL');
                setStartDate('');
                setEndDate('');
              }}
              className="w-full px-3 py-2 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-white border border-transparent hover:border-zinc-200 transition-colors text-center"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Filtro por Período */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-zinc-200 text-xs text-zinc-500">
          <span className="font-medium text-zinc-900">Filtrar por período:</span>
          <div className="flex items-center gap-2">
            <span>De:</span>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="px-2.5 py-1 rounded-md text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <span>Até:</span>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="px-2.5 py-1 rounded-md text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none"
            />
          </div>
          <span className="text-[11px] text-zinc-400 ml-auto">
            {filteredMovements.length} registro(s) encontrado(s)
          </span>
        </div>
      </div>

      {/* Tabela de Movimentações */}
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-zinc-50 text-zinc-500 uppercase text-[10px] font-semibold border-b border-zinc-200">
                <th className="py-3 px-4">Data e Hora</th>
                <th className="py-3 px-4">Produto</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4 text-center">Quantidade</th>
                <th className="py-3 px-4 text-center">Saldo Após Movimentação</th>
                <th className="py-3 px-4">Motivo / Referência</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60">
              {filteredMovements.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-500">
                    Nenhuma movimentação localizada com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredMovements.map(m => {
                  let typeBadge = (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Entrada
                    </span>
                  );
                  if (m.type === 'SAIDA') {
                    typeBadge = (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 text-zinc-800 border border-zinc-200">
                        Saída
                      </span>
                    );
                  } else if (m.type === 'BAIXA') {
                    typeBadge = (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-rose-50 text-rose-800 border border-rose-200">
                        Baixa
                      </span>
                    );
                  }

                  return (
                    <tr key={m.id} className="hover:bg-zinc-50/80 transition-colors">
                      <td className="py-3 px-4 text-zinc-500 whitespace-nowrap text-[11px]">
                        {formatDate(m.timestamp)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-zinc-900">{m.productName}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">{m.productSku}</div>
                      </td>
                      <td className="py-3 px-4">{typeBadge}</td>
                      <td className="py-3 px-4 text-center font-bold text-zinc-900">
                        {m.type === 'ENTRADA' ? `+${m.quantity}` : `-${m.quantity}`}
                      </td>
                      <td className="py-3 px-4 text-center text-xs">
                        <span className="text-zinc-400">{m.previousStock}</span>
                        <span className="mx-1 text-zinc-300">➔</span>
                        <strong className="text-zinc-900">{m.newStock} un.</strong>
                      </td>
                      <td className="py-3 px-4 text-zinc-500 max-w-xs">
                        <div className="font-medium text-zinc-800 truncate">{m.reason}</div>
                        {m.referenceDoc && (
                          <div className="text-[10px] text-zinc-400 truncate">{m.referenceDoc}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedMovement(m)}
                          className="p-1.5 rounded text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                          title="Ver detalhes completos desta movimentação"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalhes da Movimentação */}
      <Modal
        isOpen={Boolean(selectedMovement)}
        onClose={() => setSelectedMovement(null)}
        title="Detalhes da Movimentação de Estoque"
        subtitle={selectedMovement ? formatDate(selectedMovement.timestamp) : ''}
        maxWidth="md"
      >
        {selectedMovement && (
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Produto Movimentado</span>
              <div className="text-sm font-bold text-zinc-900">{selectedMovement.productName}</div>
              <div className="text-[11px] font-mono text-zinc-400">SKU: {selectedMovement.productSku}</div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                <span className="text-[10px] text-zinc-500 block">Estoque Anterior</span>
                <strong className="text-sm text-zinc-900">{selectedMovement.previousStock} un.</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                <span className="text-[10px] text-zinc-500 block">Quantidade</span>
                <strong className="text-sm text-zinc-900">
                  {selectedMovement.type === 'ENTRADA' ? `+${selectedMovement.quantity}` : `-${selectedMovement.quantity}`}
                </strong>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                <span className="text-[10px] text-zinc-500 block">Saldo Resultante</span>
                <strong className="text-sm text-zinc-900">{selectedMovement.newStock} un.</strong>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-200">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Tipo de Operação</span>
                <strong className="text-xs text-zinc-900">{selectedMovement.type}</strong>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Motivo Informado</span>
                <p className="text-xs text-zinc-900">{selectedMovement.reason}</p>
              </div>

              {selectedMovement.referenceDoc && (
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Documento / NF-e</span>
                  <p className="text-xs text-zinc-900">{selectedMovement.referenceDoc}</p>
                </div>
              )}

              {selectedMovement.supplier && (
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Fornecedor / Origem</span>
                  <p className="text-xs text-zinc-900">{selectedMovement.supplier}</p>
                </div>
              )}

              {selectedMovement.notes && (
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Observações</span>
                  <p className="text-xs text-zinc-900 italic">{selectedMovement.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-zinc-200 flex justify-end">
              <button
                onClick={() => setSelectedMovement(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
