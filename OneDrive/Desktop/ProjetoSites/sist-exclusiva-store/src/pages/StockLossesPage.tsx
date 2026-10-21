import React, { useState, useEffect } from 'react';
import { 
  FileWarning, 
  CheckCircle2, 
  XCircle, 
  Boxes, 
  FileText, 
  Calendar, 
  AlertTriangle,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Product, Movement } from '../types';

interface StockLossesPageProps {
  products: Product[];
  recentLosses: Movement[];
  initialProductId?: string;
  onRegisterLoss: (params: {
    productId: string;
    quantity: number;
    reason: string;
    referenceDoc?: string;
    notes?: string;
    date?: string;
  }) => { success: boolean; error?: string };
}

export const StockLossesPage: React.FC<StockLossesPageProps> = ({
  products,
  recentLosses,
  initialProductId,
  onRegisterLoss,
}) => {
  const availableProducts = products.filter(p => p.quantity > 0);

  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProductId || (availableProducts[0]?.id || '')
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [reasonCategory, setReasonCategory] = useState<string>('Produto Danificado / Avaria no Tecido');
  const [customReason, setCustomReason] = useState<string>('');
  const [referenceDoc, setReferenceDoc] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successAnimation, setSuccessAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (initialProductId) {
      setSelectedProductId(initialProductId);
    } else if (!selectedProductId && availableProducts.length > 0) {
      setSelectedProductId(availableProducts[0].id);
    }
  }, [initialProductId, availableProducts]);

  const selectedProduct = products.find(p => p.id === selectedProductId);
  const currentStock = selectedProduct ? selectedProduct.quantity : 0;
  const isOverLimit = Number(quantity) > currentStock;
  const simulatedNewStock = Math.max(0, currentStock - (Number(quantity) || 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedProductId) {
      setErrorMessage('Selecione um produto.');
      return;
    }

    if (!quantity || quantity <= 0) {
      setErrorMessage('A quantidade deve ser maior que zero.');
      return;
    }

    if (isOverLimit) {
      setErrorMessage(
        `Erro de consistência: Não é possível dar baixa em ${quantity} unidade(s). O produto possui apenas ${currentStock} unidade(s) em estoque.`
      );
      return;
    }

    const finalReason = reasonCategory === 'Outro' ? (customReason.trim() || 'Baixa de estoque') : reasonCategory;

    const result = onRegisterLoss({
      productId: selectedProductId,
      quantity: Number(quantity),
      reason: finalReason,
      referenceDoc: referenceDoc.trim() || undefined,
      notes: notes.trim() || undefined,
      date,
    });

    if (result.success) {
      setSuccessAnimation(true);
      setTimeout(() => setSuccessAnimation(false), 2000);
      setQuantity(1);
      setReferenceDoc('');
      setNotes('');
      setCustomReason('');
    } else {
      setErrorMessage(result.error || 'Erro ao registrar baixa.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Baixa de Estoque & Avarias</h2>
        <p className="text-xs text-slate-500 mt-1">
          Registre peças danificadas, defeitos de fábrica, perdas ou ajustes de inventário separados de saídas por vendas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Card (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium flex items-start gap-2.5">
                <XCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <div className="leading-relaxed">{errorMessage}</div>
              </div>
            )}

            {successAnimation && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Baixa de estoque confirmada com sucesso! Histórico atualizado.</span>
              </div>
            )}

            {/* Product selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Produto para Baixa *
              </label>
              {availableProducts.length === 0 ? (
                <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-800 border border-amber-200">
                  Nenhum produto com saldo disponível no estoque.
                </div>
              ) : (
                <select
                  value={selectedProductId}
                  onChange={e => setSelectedProductId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                >
                  {availableProducts.map(p => (
                    <option key={p.id} value={p.id}>
                      [{p.sku}] {p.name} — Saldo Atual: {p.quantity} un.
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Quantity and Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Quantidade a Baixar *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max={currentStock}
                    required
                    value={quantity}
                    onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-bold bg-slate-50 border ${
                      isOverLimit ? 'border-rose-400 focus:ring-rose-500/20' : 'border-slate-200 focus:ring-rose-500/20'
                    } focus:outline-none focus:ring-2 text-slate-900`}
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                    unidades
                  </span>
                </div>
                {isOverLimit && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1">
                    Excede o saldo atual ({currentStock} un.)!
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Data da Ocorrência *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Motivo da baixa */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Motivo da Baixa de Estoque *
                </label>
                <select
                  value={reasonCategory}
                  onChange={e => setReasonCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                >
                  <option value="Produto Danificado / Avaria no Tecido">Produto Danificado / Avaria Tecido</option>
                  <option value="Defeito de Fabricação (Costura/Zíper/Botão)">Defeito de Fabricação (Costura/Zíper)</option>
                  <option value="Extravio / Furto / Perda Física">Extravio / Furto / Perda Física</option>
                  <option value="Ajuste de Inventário / Divergência">Ajuste de Inventário / Divergência</option>
                  <option value="Produto Vencido / Mancha Permanente">Produto Vencido / Mancha Irreversível</option>
                  <option value="Outro">Outra Ocorrência</option>
                </select>
              </div>

              {reasonCategory === 'Outro' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Especifique a Ocorrência *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Descreva detalhadamente..."
                    value={customReason}
                    onChange={e => setCustomReason(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nº do Laudo / Boletim / Referência
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Ex: Laudo Interno #08"
                      value={referenceDoc}
                      onChange={e => setReferenceDoc(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Justificativa e Detalhes da Ocorrência
              </label>
              <textarea
                rows={2}
                placeholder="Ex: Peça descartada para acionamento de garantia com o fornecedor têxtil..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={availableProducts.length === 0 || isOverLimit}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-rose-950/20 disabled:opacity-40 disabled:pointer-events-none transition-all hover:scale-[1.01]"
              >
                <FileWarning className="w-4 h-4" />
                Confirmar Baixa de Estoque
              </button>
            </div>
          </form>
        </div>

        {/* Impact Box */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-rose-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-rose-900/40">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Boxes className="w-4 h-4" />
              Impacto Direto no Estoque
            </div>

            {selectedProduct ? (
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] text-slate-300 font-medium">Produto Selecionado:</div>
                  <div className="text-sm font-extrabold text-white mt-0.5">{selectedProduct.name}</div>
                  <div className="text-[10px] text-rose-300 font-mono mt-0.5">SKU: {selectedProduct.sku}</div>
                </div>

                <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Estoque Atual:</span>
                    <span className="font-bold text-white text-sm">{currentStock} un.</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-rose-300">
                    <span>Quantidade a Baixar:</span>
                    <span className="font-bold text-rose-400 text-sm">-{quantity || 0} un.</span>
                  </div>

                  <div className="border-t border-white/10 pt-2 flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Novo Saldo Após Baixa:</span>
                    <span className={`font-black text-base ${isOverLimit ? 'text-rose-400' : 'text-amber-300'}`}>
                      {isOverLimit ? 'Inválido' : `${simulatedNewStock} un.`}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 leading-relaxed">
                  ✓ Regra de negócio 3 & 4: A baixa reduz o estoque de forma auditada, diferenciando perdas de faturamento.
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Selecione um produto para simulação.</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Losses Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
          <FileWarning className="w-4 h-4 text-rose-600" />
          Últimas Baixas por Avaria e Perdas Registradas
        </h3>

        <div className="overflow-x-auto">
          {recentLosses.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Nenhuma baixa registrada até o momento.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Data/Hora</th>
                  <th className="py-2.5 px-3">Produto</th>
                  <th className="py-2.5 px-3 font-mono">SKU</th>
                  <th className="py-2.5 px-3 text-center">Qtd Baixada</th>
                  <th className="py-2.5 px-3 text-center">Saldo</th>
                  <th className="py-2.5 px-3">Motivo da Baixa</th>
                  <th className="py-2.5 px-3">Justificativa / Laudo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLosses.slice(0, 5).map(m => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                      {new Date(m.timestamp).toLocaleDateString('pt-BR')} {new Date(m.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">{m.productName}</td>
                    <td className="py-3 px-3 font-mono text-slate-600">{m.productSku}</td>
                    <td className="py-3 px-3 text-center font-bold text-rose-700">-{m.quantity} un.</td>
                    <td className="py-3 px-3 text-center text-slate-600 font-mono text-[11px]">
                      {m.previousStock} ➔ <strong className="text-slate-900">{m.newStock}</strong>
                    </td>
                    <td className="py-3 px-3 text-rose-900 font-medium">{m.reason}</td>
                    <td className="py-3 px-3 text-slate-500 text-[11px] max-w-[200px] truncate">
                      {m.referenceDoc ? `${m.referenceDoc} - ` : ''}{m.notes || '—'}
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
