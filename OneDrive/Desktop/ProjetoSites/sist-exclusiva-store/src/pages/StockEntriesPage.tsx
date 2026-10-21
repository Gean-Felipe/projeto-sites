import React, { useState, useEffect } from 'react';
import { 
  ArrowDownToDot, 
  CheckCircle2, 
  XCircle, 
  Boxes, 
  Building2, 
  FileText, 
  Calendar, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Product, Movement } from '../types';

interface StockEntriesPageProps {
  products: Product[];
  recentEntries: Movement[];
  initialProductId?: string;
  onRegisterEntry: (params: {
    productId: string;
    quantity: number;
    supplier?: string;
    referenceDoc?: string;
    notes?: string;
    date?: string;
  }) => { success: boolean; error?: string };
}

export const StockEntriesPage: React.FC<StockEntriesPageProps> = ({
  products,
  recentEntries,
  initialProductId,
  onRegisterEntry,
}) => {
  const activeProducts = products.filter(p => p.status === 'active');

  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProductId || (activeProducts[0]?.id || '')
  );
  const [quantity, setQuantity] = useState<number>(5);
  const [supplier, setSupplier] = useState<string>('');
  const [referenceDoc, setReferenceDoc] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successAnimation, setSuccessAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (initialProductId) {
      setSelectedProductId(initialProductId);
    } else if (!selectedProductId && activeProducts.length > 0) {
      setSelectedProductId(activeProducts[0].id);
    }
  }, [initialProductId, activeProducts]);

  const selectedProduct = products.find(p => p.id === selectedProductId);
  const currentStock = selectedProduct ? selectedProduct.quantity : 0;
  const simulatedNewStock = currentStock + (Number(quantity) || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedProductId) {
      setErrorMessage('Selecione um produto cadastrado.');
      return;
    }

    if (!quantity || quantity <= 0) {
      setErrorMessage('Informe uma quantidade de entrada maior que zero.');
      return;
    }

    const result = onRegisterEntry({
      productId: selectedProductId,
      quantity: Number(quantity),
      supplier: supplier.trim() || undefined,
      referenceDoc: referenceDoc.trim() || undefined,
      notes: notes.trim() || undefined,
      date,
    });

    if (result.success) {
      setSuccessAnimation(true);
      setTimeout(() => setSuccessAnimation(false), 2000);
      setQuantity(5);
      setSupplier('');
      setReferenceDoc('');
      setNotes('');
    } else {
      setErrorMessage(result.error || 'Erro ao registrar entrada de mercadoria.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Entrada de Mercadorias</h2>
        <p className="text-xs text-slate-500 mt-1">
          Registre compras, reposições de fornecedores e novas peças. O estoque disponível é recalculado automaticamente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Card (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium flex items-center gap-2">
                <XCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successAnimation && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Entrada confirmada com sucesso! O estoque foi incrementado.</span>
              </div>
            )}

            {/* Product selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Produto a Receber *
              </label>
              {activeProducts.length === 0 ? (
                <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-800 border border-amber-200">
                  Nenhum produto ativo cadastrado. Cadastre ou ative produtos primeiro.
                </div>
              ) : (
                <select
                  value={selectedProductId}
                  onChange={e => setSelectedProductId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  {activeProducts.map(p => (
                    <option key={p.id} value={p.id}>
                      [{p.sku}] {p.name} — Estoque Atual: {p.quantity} un.
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Quantity and Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Quantidade Recebida *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity}
                    onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm font-bold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                    unidades
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Data do Recebimento *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Supplier & Doc Ref */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Fornecedor (Opcional)
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Ex: Confecções Bella Donna Ltda"
                    value={supplier}
                    onChange={e => setSupplier(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nota Fiscal / Documento de Referência
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Ex: NF-e 45910 / Romaneio 12"
                    value={referenceDoc}
                    onChange={e => setReferenceDoc(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Observações
              </label>
              <textarea
                rows={2}
                placeholder="Ex: Remessa recebida intacta com etiquetas e lacres conferidos..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={activeProducts.length === 0}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-emerald-950/20 transition-all hover:scale-[1.01]"
              >
                <ArrowDownToDot className="w-4 h-4" />
                Confirmar Entrada de Mercadoria
              </button>
            </div>
          </form>
        </div>

        {/* Visual Calculation & Impact Card (1 col) */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-emerald-800/40">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Boxes className="w-4 h-4" />
              Impacto Direto no Estoque
            </div>

            {selectedProduct ? (
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] text-slate-300 font-medium">Produto Selecionado:</div>
                  <div className="text-sm font-extrabold text-white mt-0.5">{selectedProduct.name}</div>
                  <div className="text-[10px] text-emerald-300 font-mono mt-0.5">SKU: {selectedProduct.sku}</div>
                </div>

                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Estoque Atual:</span>
                    <span className="font-bold text-white text-sm">{currentStock} un.</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-emerald-300">
                    <span>Quantidade a Adicionar:</span>
                    <span className="font-bold text-emerald-400 text-sm">+{quantity || 0} un.</span>
                  </div>

                  <div className="border-t border-white/10 pt-2 flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Novo Estoque Calculado:</span>
                    <span className="font-black text-amber-300 text-base">{simulatedNewStock} un.</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 leading-relaxed">
                  ✓ Regra de negócio 1: A entrada aumentará imediatamente o estoque e gerará rastro no histórico de auditoria.
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Selecione um produto para visualizar a simulação.</p>
            )}
          </div>

          {/* Quick Info Box */}
          <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 space-y-2">
            <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Dica Operacional
            </h4>
            <p className="text-[11px] leading-relaxed">
              Para entradas com múltiplos produtos de uma mesma nota ou remessa de fornecedor, utilize a página de <strong>Recebimentos & Cargas</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Entries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
          <ArrowDownToDot className="w-4 h-4 text-emerald-600" />
          Últimas Entradas Registradas no Sistema
        </h3>

        <div className="overflow-x-auto">
          {recentEntries.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Nenhuma entrada de mercadoria registrada até o momento.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Data/Hora</th>
                  <th className="py-2.5 px-3">Produto</th>
                  <th className="py-2.5 px-3 font-mono">SKU</th>
                  <th className="py-2.5 px-3 text-center">Qtd Recebida</th>
                  <th className="py-2.5 px-3 text-center">Variação Saldo</th>
                  <th className="py-2.5 px-3">Fornecedor / Documento</th>
                  <th className="py-2.5 px-3">Observações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentEntries.slice(0, 5).map(m => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                      {new Date(m.timestamp).toLocaleDateString('pt-BR')} {new Date(m.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">{m.productName}</td>
                    <td className="py-3 px-3 font-mono text-slate-600">{m.productSku}</td>
                    <td className="py-3 px-3 text-center font-bold text-emerald-700">+{m.quantity} un.</td>
                    <td className="py-3 px-3 text-center text-slate-600 font-mono text-[11px]">
                      {m.previousStock} ➔ <strong className="text-slate-900">{m.newStock}</strong>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      <div>{m.supplier || '—'}</div>
                      {m.referenceDoc && <div className="text-[10px] text-slate-400 font-mono">{m.referenceDoc}</div>}
                    </td>
                    <td className="py-3 px-3 text-slate-500 text-[11px] max-w-[200px] truncate">
                      {m.notes || m.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
