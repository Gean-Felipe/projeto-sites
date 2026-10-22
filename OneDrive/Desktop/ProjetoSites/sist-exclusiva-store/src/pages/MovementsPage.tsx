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
          <h1 className="text-xl font-bold text-[#0E0606] tracking-tight">Histórico de Movimentações</h1>
          <p className="text-xs text-[#7A5B67] mt-0.5">
            Registro cronológico e rastreável de todas as entradas, saídas e baixas efetuadas.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FEFEFE] hover:bg-[#FAE7E7] text-[#0E0606] border border-[#EED9DC] text-xs font-semibold transition-colors shadow-2xs shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#CF7C89]" />
          <span>Exportar Relatório (CSV)</span>
        </button>
      </div>

      {/* Painel de Filtros */}
      <div className="bg-[#FAE7E7] border border-[#EED9DC] rounded-xl p-3.5 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Busca Livre */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A5B67]" />
            <input
              type="text"
              placeholder="Buscar por produto, SKU, motivo ou doc..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg text-xs bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606] placeholder-[#7A5B67] focus:outline-none focus:border-[#CF7C89]"
            />
          </div>

          {/* Filtro por Tipo */}
          <div>
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg text-xs bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606] focus:outline-none focus:border-[#CF7C89]"
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
              className="w-full px-3 py-2 rounded-lg text-xs bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606] focus:outline-none focus:border-[#CF7C89]"
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
              className="w-full px-3 py-2 rounded-lg text-xs font-medium text-[#7A5B67] hover:bg-[#FEFEFE] border border-transparent hover:border-[#EED9DC] transition-colors text-center"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Filtro por Período */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#EED9DC]/60 text-xs text-[#7A5B67]">
          <span className="font-medium text-[#0E0606]">Filtrar por período:</span>
          <div className="flex items-center gap-2">
            <span>De:</span>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="px-2.5 py-1 rounded-md text-xs bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606]"
            />
          </div>
          <div className="flex items-center gap-2">
            <span>Até:</span>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="px-2.5 py-1 rounded-md text-xs bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606]"
            />
          </div>
          <span className="text-[11px] text-[#7A5B67] ml-auto">
            {filteredMovements.length} registro(s) encontrado(s)
          </span>
        </div>
      </div>

      {/* Tabela de Movimentações */}
      <div className="bg-[#FEFEFE] rounded-xl border border-[#EED9DC] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAE7E7]/60 text-[#7A5B67] uppercase text-[10px] font-semibold border-b border-[#EED9DC]">
                <th className="py-3 px-4">Data e Hora</th>
                <th className="py-3 px-4">Produto</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4 text-center">Quantidade</th>
                <th className="py-3 px-4 text-center">Saldo Após Movimentação</th>
                <th className="py-3 px-4">Motivo / Referência</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EED9DC]/60">
              {filteredMovements.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#7A5B67]">
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
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#FAE7E7] text-[#0E0606] border border-[#EED9DC]">
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
                    <tr key={m.id} className="hover:bg-[#FAE7E7]/30 transition-colors">
                      <td className="py-3 px-4 text-[#7A5B67] whitespace-nowrap text-[11px]">
                        {formatDate(m.timestamp)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-[#0E0606]">{m.productName}</div>
                        <div className="text-[10px] text-[#7A5B67] font-mono">{m.productSku}</div>
                      </td>
                      <td className="py-3 px-4">{typeBadge}</td>
                      <td className="py-3 px-4 text-center font-bold text-[#0E0606]">
                        {m.type === 'ENTRADA' ? `+${m.quantity}` : `-${m.quantity}`}
                      </td>
                      <td className="py-3 px-4 text-center text-xs">
                        <span className="text-[#7A5B67]">{m.previousStock}</span>
                        <span className="mx-1 text-[#AA8B97]">➔</span>
                        <strong className="text-[#0E0606]">{m.newStock} un.</strong>
                      </td>
                      <td className="py-3 px-4 text-[#7A5B67] max-w-xs">
                        <div className="font-medium text-[#0E0606] truncate">{m.reason}</div>
                        {m.referenceDoc && (
                          <div className="text-[10px] text-[#7A5B67] truncate">{m.referenceDoc}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedMovement(m)}
                          className="p-1.5 rounded text-[#7A5B67] hover:text-[#0E0606] hover:bg-[#FAE7E7] transition-colors"
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
            <div className="p-3 rounded-lg bg-[#FAE7E7] border border-[#EED9DC] space-y-1">
              <span className="text-[10px] font-bold text-[#7A5B67] uppercase">Produto Movimentado</span>
              <div className="text-sm font-bold text-[#0E0606]">{selectedMovement.productName}</div>
              <div className="text-[11px] font-mono text-[#7A5B67]">SKU: {selectedMovement.productSku}</div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 rounded-lg bg-[#FEFEFE] border border-[#EED9DC]">
                <span className="text-[10px] text-[#7A5B67] block">Estoque Anterior</span>
                <strong className="text-sm text-[#0E0606]">{selectedMovement.previousStock} un.</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FEFEFE] border border-[#EED9DC]">
                <span className="text-[10px] text-[#7A5B67] block">Quantidade</span>
                <strong className="text-sm text-[#CF7C89]">
                  {selectedMovement.type === 'ENTRADA' ? `+${selectedMovement.quantity}` : `-${selectedMovement.quantity}`}
                </strong>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FEFEFE] border border-[#EED9DC]">
                <span className="text-[10px] text-[#7A5B67] block">Saldo Resultante</span>
                <strong className="text-sm text-[#0E0606]">{selectedMovement.newStock} un.</strong>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#EED9DC]">
              <div>
                <span className="text-[10px] text-[#7A5B67] uppercase font-semibold block">Tipo de Operação</span>
                <strong className="text-xs text-[#0E0606]">{selectedMovement.type}</strong>
              </div>

              <div>
                <span className="text-[10px] text-[#7A5B67] uppercase font-semibold block">Motivo Informado</span>
                <p className="text-xs text-[#0E0606]">{selectedMovement.reason}</p>
              </div>

              {selectedMovement.referenceDoc && (
                <div>
                  <span className="text-[10px] text-[#7A5B67] uppercase font-semibold block">Documento / NF-e</span>
                  <p className="text-xs text-[#0E0606]">{selectedMovement.referenceDoc}</p>
                </div>
              )}

              {selectedMovement.supplier && (
                <div>
                  <span className="text-[10px] text-[#7A5B67] uppercase font-semibold block">Fornecedor / Origem</span>
                  <p className="text-xs text-[#0E0606]">{selectedMovement.supplier}</p>
                </div>
              )}

              {selectedMovement.notes && (
                <div>
                  <span className="text-[10px] text-[#7A5B67] uppercase font-semibold block">Observações</span>
                  <p className="text-xs text-[#0E0606] italic">{selectedMovement.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#EED9DC] flex justify-end">
              <button
                onClick={() => setSelectedMovement(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#CF7C89] hover:bg-[#BE6B78] text-[#FEFEFE] transition-colors"
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
