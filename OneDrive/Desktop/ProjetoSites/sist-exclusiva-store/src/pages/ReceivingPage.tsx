import React, { useState } from 'react';
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Trash2, 
  FileText, 
  Building2, 
  Calendar, 
  AlertCircle, 
  Eye, 
  Boxes,
  ArrowRight
} from 'lucide-react';
import { Receiving, Product } from '../types';
import { Modal } from '../components/Modal';

interface ReceivingPageProps {
  receivings: Receiving[];
  products: Product[];
  onCreateReceiving: (params: {
    supplier: string;
    date: string;
    referenceDoc?: string;
    notes?: string;
    items: { productId: string; quantity: number; unitCost?: number }[];
  }) => { success: boolean; error?: string };
  onConfirmReceiving: (receivingId: string) => { success: boolean; error?: string };
}

export const ReceivingPage: React.FC<ReceivingPageProps> = ({
  receivings,
  products,
  onCreateReceiving,
  onConfirmReceiving,
}) => {
  const activeProducts = products.filter(p => p.status === 'active');

  // Modais
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingReceiving, setViewingReceiving] = useState<Receiving | null>(null);
  const [confirmModalReceiving, setConfirmModalReceiving] = useState<Receiving | null>(null);

  // Form State
  const [supplier, setSupplier] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [referenceDoc, setReferenceDoc] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<{ productId: string; quantity: number; unitCost: number }[]>([
    { productId: activeProducts[0]?.id || '', quantity: 10, unitCost: 0 },
  ]);
  const [formError, setFormError] = useState<string | null>(null);

  const handleAddItemRow = () => {
    setItems([
      ...items,
      { productId: activeProducts[0]?.id || '', quantity: 5, unitCost: 0 },
    ]);
  };

  const handleRemoveItemRow = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleOpenCreate = () => {
    setSupplier('');
    setDate(new Date().toISOString().split('T')[0]);
    setReferenceDoc('');
    setNotes('');
    setItems([
      { productId: activeProducts[0]?.id || '', quantity: 10, unitCost: 0 },
    ]);
    setFormError(null);
    setIsCreateModalOpen(true);
  };

  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!supplier.trim()) {
      setFormError('Informe o nome do fornecedor.');
      return;
    }

    if (items.length === 0) {
      setFormError('Adicione pelo menos um produto na remessa.');
      return;
    }

    for (let i = 0; i < items.length; i++) {
      if (!items[i].productId) {
        setFormError(`Selecione o produto na linha ${i + 1}.`);
        return;
      }
      if (!items[i].quantity || items[i].quantity <= 0) {
        setFormError(`A quantidade na linha ${i + 1} deve ser maior que zero.`);
        return;
      }
    }

    const res = onCreateReceiving({
      supplier: supplier.trim(),
      date,
      referenceDoc: referenceDoc.trim() || undefined,
      notes: notes.trim() || undefined,
      items: items.map(it => ({
        productId: it.productId,
        quantity: Number(it.quantity),
        unitCost: it.unitCost ? Number(it.unitCost) : undefined,
      })),
    });

    if (res.success) {
      setIsCreateModalOpen(false);
    } else {
      setFormError(res.error || 'Erro ao registrar recebimento.');
    }
  };

  const handleExecuteConfirmation = () => {
    if (!confirmModalReceiving) return;
    const res = onConfirmReceiving(confirmModalReceiving.id);
    if (res.success) {
      setConfirmModalReceiving(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Recebimento & Conferência de Cargas
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Controle seguro de lotes recebidos de fornecedores com verificação de lacre e bloqueio de entradas duplicadas.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-950/20 transition-all hover:scale-[1.02] shrink-0"
        >
          <Plus className="w-4 h-4" />
          Registrar Novo Recebimento
        </button>
      </div>

      {/* Info Banner about atomic safety */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong>Garantia de Consistência:</strong> Enquanto o recebimento estiver com status <span className="font-bold underline">Pendente</span>, as peças NÃO são adicionadas ao estoque disponível. Somente após a conferência física e confirmação da carga, o sistema alimenta o estoque e registra o histórico, bloqueando qualquer reprocessamento duplicado.
        </div>
      </div>

      {/* Receivings List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {receivings.map(rec => {
          const isPending = rec.status === 'PENDENTE';
          const totalPieces = rec.items.reduce((acc, it) => acc + it.quantity, 0);

          return (
            <div
              key={rec.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
                isPending ? 'border-amber-300 shadow-amber-500/5' : 'border-slate-200'
              }`}
            >
              <div>
                {/* Header card */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                    {rec.code}
                  </span>
                  {isPending ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 animate-pulse">
                      <Clock className="w-3 h-3" /> Aguardando Conferência
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Integrado ao Estoque
                    </span>
                  )}
                </div>

                {/* Supplier & Doc */}
                <h3 className="font-extrabold text-slate-900 text-sm">{rec.supplier}</h3>
                <div className="text-[11px] text-slate-500 mt-1 space-y-0.5">
                  <div>Data: <strong className="text-slate-700">{new Date(rec.date).toLocaleDateString('pt-BR')}</strong></div>
                  <div>Doc / NF: <strong className="text-slate-700 font-mono">{rec.referenceDoc || 'Não informado'}</strong></div>
                </div>

                {/* Items summary */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Itens na Remessa:</span>
                    <span className="font-bold text-slate-900">{rec.items.length} produto(s)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Total de Peças:</span>
                    <span className="font-black text-amber-700">{totalPieces} unidades</span>
                  </div>
                </div>

                {rec.notes && (
                  <p className="text-[11px] text-slate-500 mt-3 italic line-clamp-2">
                    "{rec.notes}"
                  </p>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setViewingReceiving(rec)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Ver Detalhes
                </button>

                {isPending ? (
                  <button
                    onClick={() => setConfirmModalReceiving(rec)}
                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Conferir e Confirmar
                  </button>
                ) : (
                  <span className="text-[11px] font-semibold text-slate-400">
                    Processado em {new Date(rec.confirmedAt || '').toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Novo Recebimento */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Registrar Recebimento de Carga"
        subtitle="Cadastre uma remessa com múltiplos produtos antes da conferência física"
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmitCreate} className="space-y-4">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Fornecedor / Indústria Têxtil *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Alfaiataria Moderna & Cia"
                value={supplier}
                onChange={e => setSupplier(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Data Prevista / Chegada *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Documento de Referência / Nota Fiscal
              </label>
              <input
                type="text"
                placeholder="Ex: NF-e 91024 / CTRC 8812"
                value={referenceDoc}
                onChange={e => setReferenceDoc(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          {/* Items Table in form */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700">
                Produtos na Carga ({items.length})
              </label>
              <button
                type="button"
                onClick={handleAddItemRow}
                className="text-xs font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Outro Produto
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden max-h-52 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Produto</th>
                    <th className="p-2.5 w-24 text-center">Quantidade</th>
                    <th className="p-2.5 w-28 text-right">Custo Un. (R$)</th>
                    <th className="p-2.5 w-10 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2">
                        <select
                          value={item.productId}
                          onChange={e => handleItemChange(idx, 'productId', e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg text-xs bg-white border border-slate-200"
                        >
                          {activeProducts.map(p => (
                            <option key={p.id} value={p.id}>
                              [{p.sku}] {p.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={e => handleItemChange(idx, 'quantity', Math.max(1, parseInt(e.target.value) || 0))}
                          className="w-full px-2 py-1.5 rounded-lg text-xs text-center font-bold bg-white border border-slate-200"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.unitCost || ''}
                          onChange={e => handleItemChange(idx, 'unitCost', parseFloat(e.target.value) || 0)}
                          placeholder="0,00"
                          className="w-full px-2 py-1.5 rounded-lg text-xs text-right bg-white border border-slate-200"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItemRow(idx)}
                          disabled={items.length <= 1}
                          className="p-1 text-slate-400 hover:text-rose-600 disabled:opacity-20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Observações da Carga (Opcional)
            </label>
            <textarea
              rows={2}
              placeholder="Instruções de recebimento, transportadora..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-950/20"
            >
              Salvar Recebimento (Pendente)
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Confirmar Recebimento e Alimentar Estoque */}
      <Modal
        isOpen={!!confirmModalReceiving}
        onClose={() => setConfirmModalReceiving(null)}
        title="Confirmar Entrada no Estoque"
        subtitle={`Recebimento ${confirmModalReceiving?.code} — ${confirmModalReceiving?.supplier}`}
        maxWidth="lg"
      >
        {confirmModalReceiving && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
              <strong>Atenção:</strong> Ao confirmar esta operação, as quantidades de cada produto da lista abaixo serão <strong>adicionadas imediatamente ao estoque</strong> e cada entrada será gravada no histórico de auditoria. Esta operação não poderá ser revertida ou duplicada.
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Produto</th>
                    <th className="p-2.5 font-mono">SKU</th>
                    <th className="p-2.5 text-center">Qtd a Entrar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {confirmModalReceiving.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-bold text-slate-900">{item.productName}</td>
                      <td className="p-2.5 font-mono text-slate-600">{item.productSku}</td>
                      <td className="p-2.5 text-center font-black text-emerald-700">+{item.quantity} un.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setConfirmModalReceiving(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleExecuteConfirmation}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/20"
              >
                Sim, Confirmar e Alimentar Estoque
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Detalhes do Recebimento */}
      <Modal
        isOpen={!!viewingReceiving}
        onClose={() => setViewingReceiving(null)}
        title={`Detalhes do Recebimento ${viewingReceiving?.code}`}
        subtitle={`Fornecedor: ${viewingReceiving?.supplier}`}
        maxWidth="lg"
      >
        {viewingReceiving && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Status</span>
                <div className="text-xs font-bold mt-1 text-slate-900">
                  {viewingReceiving.status}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Data Carga</span>
                <div className="text-xs font-bold mt-1 text-slate-900">
                  {new Date(viewingReceiving.date).toLocaleDateString('pt-BR')}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Documento / NF</span>
                <div className="text-xs font-mono font-bold mt-1 text-slate-900">
                  {viewingReceiving.referenceDoc || '—'}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-xs mb-2">Itens Registrados</h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Produto</th>
                      <th className="p-2.5 font-mono">SKU</th>
                      <th className="p-2.5 text-center">Quantidade</th>
                      <th className="p-2.5 text-right">Custo Un.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {viewingReceiving.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-semibold text-slate-900">{it.productName}</td>
                        <td className="p-2.5 font-mono text-slate-500">{it.productSku}</td>
                        <td className="p-2.5 text-center font-bold text-slate-900">{it.quantity} un.</td>
                        <td className="p-2.5 text-right font-mono text-slate-700">
                          {it.unitCost ? `R$ ${it.unitCost.toFixed(2)}` : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {viewingReceiving.notes && (
              <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700">
                <strong>Observações:</strong> {viewingReceiving.notes}
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setViewingReceiving(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
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
