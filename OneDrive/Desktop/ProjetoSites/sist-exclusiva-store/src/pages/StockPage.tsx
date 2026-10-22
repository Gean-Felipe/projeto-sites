import React, { useState, useEffect } from 'react';
import { 
  ArrowDownToDot, 
  ArrowUpFromDot, 
  FileWarning, 
  Truck, 
  AlertTriangle, 
  CheckCircle2, 
  Check
} from 'lucide-react';
import { Product, Movement, Receiving, StockTab } from '../types/index.ts';

interface StockPageProps {
  products: Product[];
  recentMovements: Movement[];
  receivings: Receiving[];
  activeTab: StockTab;
  onTabChange: (tab: StockTab) => void;
  preselectedProductId?: string;
  onNavigateToProducts?: () => void;
  onRegisterEntry: (params: {
    productId: string;
    quantity: number;
    supplier?: string;
    referenceDoc?: string;
    notes?: string;
    date?: string;
  }) => { success: boolean; error?: string };
  onRegisterExit: (params: {
    productId: string;
    quantity: number;
    reason: string;
    referenceDoc?: string;
    notes?: string;
    date?: string;
  }) => { success: boolean; error?: string };
  onRegisterLoss: (params: {
    productId: string;
    quantity: number;
    reason: string;
    referenceDoc?: string;
    notes?: string;
    date?: string;
  }) => { success: boolean; error?: string };
  onCreateReceiving: (params: {
    supplier: string;
    date: string;
    referenceDoc?: string;
    notes?: string;
    items: { productId: string; quantity: number; unitCost?: number }[];
  }) => { success: boolean; error?: string };
  onConfirmReceiving: (receivingId: string) => { success: boolean; error?: string };
}

export const StockPage: React.FC<StockPageProps> = ({
  products,
  receivings,
  activeTab,
  onTabChange,
  preselectedProductId,
  onNavigateToProducts,
  onRegisterEntry,
  onRegisterExit,
  onRegisterLoss,
  onConfirmReceiving,
}) => {
  const activeProducts = products.filter(p => p.status === 'active');

  // Estados da Operação de Entrada
  const [entryId, setEntryId] = useState<string>(preselectedProductId || activeProducts[0]?.id || '');
  const [entryQty, setEntryQty] = useState<number>(5);
  const [entrySupplier, setEntrySupplier] = useState<string>('');
  const [entryDoc, setEntryDoc] = useState<string>('');
  const [entryNotes, setEntryNotes] = useState<string>('');
  const [entryFeedback, setEntryFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Estados da Operação de Saída
  const [exitId, setExitId] = useState<string>(preselectedProductId || activeProducts[0]?.id || '');
  const [exitQty, setExitQty] = useState<number>(1);
  const [exitReason, setExitReason] = useState<string>('Venda balcão loja');
  const [exitDoc, setExitDoc] = useState<string>('');
  const [exitFeedback, setExitFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Estados da Operação de Baixa
  const [lossId, setLossId] = useState<string>(preselectedProductId || activeProducts[0]?.id || '');
  const [lossQty, setLossQty] = useState<number>(1);
  const [lossReason, setLossReason] = useState<string>('Produto com defeito de fabricação');
  const [lossNotes, setLossNotes] = useState<string>('');
  const [lossFeedback, setLossFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Atualizar quando preselectedProductId mudar
  useEffect(() => {
    if (preselectedProductId) {
      setEntryId(preselectedProductId);
      setExitId(preselectedProductId);
      setLossId(preselectedProductId);
    }
  }, [preselectedProductId]);

  // Produtos selecionados para cálculo visual
  const selectedEntryProd = products.find(p => p.id === entryId);
  const entryCurrentStock = selectedEntryProd?.quantity || 0;
  const entrySimulatedStock = entryCurrentStock + (Number(entryQty) || 0);

  const selectedExitProd = products.find(p => p.id === exitId);
  const exitCurrentStock = selectedExitProd?.quantity || 0;
  const exitSimulatedStock = exitCurrentStock - (Number(exitQty) || 0);
  const isExitExceeded = exitQty > exitCurrentStock;

  const selectedLossProd = products.find(p => p.id === lossId);
  const lossCurrentStock = selectedLossProd?.quantity || 0;
  const lossSimulatedStock = lossCurrentStock - (Number(lossQty) || 0);
  const isLossExceeded = lossQty > lossCurrentStock;

  // Handlers de Submissão
  const handleEntrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEntryFeedback(null);

    if (!entryId) {
      setEntryFeedback({ type: 'error', message: 'Selecione um produto cadastrado.' });
      return;
    }
    if (!entryQty || entryQty <= 0) {
      setEntryFeedback({ type: 'error', message: 'Informe a quantidade recebida (mínimo 1 unidade).' });
      return;
    }

    const res = onRegisterEntry({
      productId: entryId,
      quantity: Number(entryQty),
      supplier: entrySupplier.trim() || undefined,
      referenceDoc: entryDoc.trim() || undefined,
      notes: entryNotes.trim() || undefined,
    });

    if (res.success) {
      setEntryFeedback({
        type: 'success',
        message: `Entrada registrada com sucesso! Saldo atualizado para ${entrySimulatedStock} unidades.`,
      });
      setEntryQty(5);
      setEntrySupplier('');
      setEntryDoc('');
      setEntryNotes('');
    } else {
      setEntryFeedback({ type: 'error', message: res.error || 'Erro ao registrar entrada.' });
    }
  };

  const handleExitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExitFeedback(null);

    if (!exitId) {
      setExitFeedback({ type: 'error', message: 'Selecione o produto.' });
      return;
    }
    if (!exitQty || exitQty <= 0) {
      setExitFeedback({ type: 'error', message: 'Informe a quantidade que sairá.' });
      return;
    }
    if (isExitExceeded) {
      setExitFeedback({
        type: 'error',
        message: `Quantidade indisponível para essa saída. O estoque atual é de apenas ${exitCurrentStock} unidade(s).`,
      });
      return;
    }

    const res = onRegisterExit({
      productId: exitId,
      quantity: Number(exitQty),
      reason: exitReason.trim() || 'Saída de estoque',
      referenceDoc: exitDoc.trim() || undefined,
    });

    if (res.success) {
      setExitFeedback({
        type: 'success',
        message: `Saída registrada com sucesso! Restam ${exitSimulatedStock} unidades em estoque.`,
      });
      setExitQty(1);
      setExitDoc('');
    } else {
      setExitFeedback({ type: 'error', message: res.error || 'Erro ao registrar saída.' });
    }
  };

  const handleLossSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLossFeedback(null);

    if (!lossId) {
      setLossFeedback({ type: 'error', message: 'Selecione o produto.' });
      return;
    }
    if (!lossQty || lossQty <= 0) {
      setLossFeedback({ type: 'error', message: 'Informe a quantidade para baixa.' });
      return;
    }
    if (!lossReason.trim()) {
      setLossFeedback({ type: 'error', message: 'É obrigatório informar o motivo da baixa.' });
      return;
    }
    if (isLossExceeded) {
      setLossFeedback({
        type: 'error',
        message: `Não é possível dar baixa de ${lossQty} peças. O saldo atual é de ${lossCurrentStock} unidade(s).`,
      });
      return;
    }

    const res = onRegisterLoss({
      productId: lossId,
      quantity: Number(lossQty),
      reason: lossReason.trim(),
      notes: lossNotes.trim() || undefined,
    });

    if (res.success) {
      setLossFeedback({
        type: 'success',
        message: `Baixa de estoque efetuada com sucesso. Saldo restante: ${lossSimulatedStock} peças.`,
      });
      setLossQty(1);
      setLossNotes('');
    } else {
      setLossFeedback({ type: 'error', message: res.error || 'Erro ao registrar baixa.' });
    }
  };

  // Produtos que requerem atenção para a aba de Consulta
  const lowStockProducts = products.filter(p => p.quantity > 0 && p.quantity <= p.minStock);
  const outOfStockProducts = products.filter(p => p.quantity === 0);

  return (
    <div className="space-y-6">
      {/* Abas Superiores de Estoque com Toque Rosé da Loja */}
      <div className="bg-[#FAF6F7] border border-[#EAE0E3] rounded-xl p-1 flex flex-wrap gap-1">
        <button
          onClick={() => onTabChange('entry')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'entry'
              ? 'bg-[#9C4B5C] text-white shadow-xs'
              : 'text-[#6F5F64] hover:text-[#1F1719] hover:bg-white'
          }`}
        >
          <ArrowDownToDot className="w-4 h-4" />
          <span>Registrar Entrada</span>
        </button>

        <button
          onClick={() => onTabChange('exit')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'exit'
              ? 'bg-[#9C4B5C] text-white shadow-xs'
              : 'text-[#6F5F64] hover:text-[#1F1719] hover:bg-white'
          }`}
        >
          <ArrowUpFromDot className="w-4 h-4" />
          <span>Registrar Saída</span>
        </button>

        <button
          onClick={() => onTabChange('loss')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'loss'
              ? 'bg-[#9C4B5C] text-white shadow-xs'
              : 'text-[#6F5F64] hover:text-[#1F1719] hover:bg-white'
          }`}
        >
          <FileWarning className="w-4 h-4" />
          <span>Baixa de Mercadoria</span>
        </button>

        <button
          onClick={() => onTabChange('receivings')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'receivings'
              ? 'bg-[#9C4B5C] text-white shadow-xs'
              : 'text-[#6F5F64] hover:text-[#1F1719] hover:bg-white'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Recebimento de Cargas</span>
        </button>

        <button
          onClick={() => onTabChange('overview')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'overview'
              ? 'bg-[#9C4B5C] text-white shadow-xs'
              : 'text-[#6F5F64] hover:text-[#1F1719] hover:bg-white'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Consulta & Alertas</span>
        </button>
      </div>

      {/* ABA 1: ENTRADA DE MERCADORIA */}
      {activeTab === 'entry' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl p-5 md:p-6 shadow-xs">
            <h2 className="text-base font-bold text-zinc-900 mb-1">Registrar Entrada de Mercadoria</h2>
            <p className="text-xs text-zinc-500 mb-5">
              Selecione o produto e informe as peças recebidas para incrementar o saldo automaticamente.
            </p>

            {entryFeedback && (
              <div className={`p-3 rounded-lg mb-5 text-xs ${
                entryFeedback.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}>
                {entryFeedback.message}
              </div>
            )}

            <form onSubmit={handleEntrySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-900 mb-1">
                  Produto <span className="text-zinc-900">*</span>
                </label>
                <select
                  value={entryId}
                  onChange={e => setEntryId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-400"
                >
                  {activeProducts.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku}) — Estoque atual: {p.quantity} peças
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-900 mb-1">
                    Quantidade Recebida <span className="text-zinc-900">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={entryQty}
                    onChange={e => setEntryQty(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-900 mb-1">
                    Fornecedor ou Origem (Opcional)
                  </label>
                  <input
                    type="text"
                    value={entrySupplier}
                    onChange={e => setEntrySupplier(e.target.value)}
                    placeholder="Ex: Alfaiataria Moderna, Confecção Bella..."
                    className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-900 mb-1">
                    Documento / NF-e (Opcional)
                  </label>
                  <input
                    type="text"
                    value={entryDoc}
                    onChange={e => setEntryDoc(e.target.value)}
                    placeholder="Ex: NF 1024 / Romaneio 88"
                    className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-900 mb-1">
                    Observações Internas (Opcional)
                  </label>
                  <input
                    type="text"
                    value={entryNotes}
                    onChange={e => setEntryNotes(e.target.value)}
                    placeholder="Ex: Lote de reposição de inverno"
                    className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-400"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-200 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#9C4B5C] hover:bg-[#863C4B] text-white transition-colors shadow-xs"
                >
                  Confirmar Entrada de Mercadoria
                </button>
              </div>
            </form>
          </div>

          {/* Painel Lateral: Resumo de Conferência da Entrada */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 flex flex-col justify-between shadow-xs">
            <div>
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-3">
                Conferência da Entrada
              </h3>

              {selectedEntryProd ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-zinc-500 text-[11px] block">Produto Selecionado</span>
                    <strong className="text-zinc-900 text-sm block">{selectedEntryProd.name}</strong>
                    <span className="text-[11px] font-mono text-zinc-400">SKU: {selectedEntryProd.sku}</span>
                  </div>

                  <div className="pt-2 border-t border-zinc-200 grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                      <span className="text-[10px] text-zinc-500 block">Estoque Atual</span>
                      <strong className="text-sm text-zinc-900">{entryCurrentStock} un.</strong>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                      <span className="text-[10px] text-zinc-500 block">Entrada Informada</span>
                      <strong className="text-sm text-emerald-800">+{entryQty || 0} un.</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-zinc-200 text-center">
                    <span className="text-[11px] text-zinc-500 block">Saldo Resultante no Estoque</span>
                    <strong className="text-xl font-bold text-zinc-900">{entrySimulatedStock} peças</strong>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-zinc-500">Nenhum produto selecionado.</p>
              )}
            </div>

            <p className="text-[11px] text-zinc-400 mt-4 pt-3 border-t border-zinc-200">
              O sistema registrará data, hora, saldo anterior e novo saldo no histórico de auditoria.
            </p>
          </div>
        </div>
      )}

      {/* ABA 2: SAÍDA DE MERCADORIA */}
      {activeTab === 'exit' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl p-5 md:p-6 shadow-xs">
            <h2 className="text-base font-bold text-zinc-900 mb-1">Registrar Saída de Mercadoria</h2>
            <p className="text-xs text-zinc-500 mb-5">
              Informe a quantidade que sairá do estoque. O sistema bloqueia automaticamente saídas com saldo insuficiente.
            </p>

            {exitFeedback && (
              <div className={`p-3 rounded-lg mb-5 text-xs ${
                exitFeedback.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}>
                {exitFeedback.message}
              </div>
            )}

            <form onSubmit={handleExitSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-900 mb-1">
                  Produto <span className="text-zinc-900">*</span>
                </label>
                <select
                  value={exitId}
                  onChange={e => setExitId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-400"
                >
                  {activeProducts.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku}) — Disponível: {p.quantity} peças
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-900 mb-1">
                    Quantidade de Saída <span className="text-zinc-900">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={exitQty}
                    onChange={e => setExitQty(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-400"
                  />
                  {isExitExceeded && (
                    <p className="text-[11px] text-rose-700 font-medium mt-1">
                      Atenção: Quantidade superior ao estoque disponível ({exitCurrentStock} un.).
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-900 mb-1">
                    Motivo da Saída <span className="text-zinc-900">*</span>
                  </label>
                  <select
                    value={exitReason}
                    onChange={e => setExitReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-400"
                  >
                    <option value="Venda balcão loja física">Venda balcão loja física</option>
                    <option value="Venda online / WhatsApp">Venda online / WhatsApp</option>
                    <option value="Transferência entre setores">Transferência entre setores</option>
                    <option value="Mostruário / Vitrine">Mostruário / Vitrine</option>
                    <option value="Ajuste de inventário">Ajuste de inventário</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-900 mb-1">
                  Documento ou Cupom (Opcional)
                </label>
                <input
                  type="text"
                  value={exitDoc}
                  onChange={e => setExitDoc(e.target.value)}
                  placeholder="Ex: Cupom 402, Pedido #891..."
                  className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-400"
                />
              </div>

              <div className="pt-3 border-t border-zinc-200 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isExitExceeded}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold transition-colors shadow-xs ${
                    isExitExceeded
                      ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                      : 'bg-[#9C4B5C] hover:bg-[#863C4B] text-white'
                  }`}
                >
                  Confirmar Saída de Mercadoria
                </button>
              </div>
            </form>
          </div>

          {/* Painel Lateral: Validação e Saldo Restante */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 flex flex-col justify-between shadow-xs">
            <div>
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-3">
                Conferência da Saída
              </h3>

              {selectedExitProd ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-zinc-500 text-[11px] block">Produto</span>
                    <strong className="text-zinc-900 text-sm block">{selectedExitProd.name}</strong>
                    <span className="text-[11px] font-mono text-zinc-400">SKU: {selectedExitProd.sku}</span>
                  </div>

                  <div className="pt-2 border-t border-zinc-200 grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                      <span className="text-[10px] text-zinc-500 block">Disponível</span>
                      <strong className="text-sm text-zinc-900">{exitCurrentStock} un.</strong>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                      <span className="text-[10px] text-zinc-500 block">Saída Prevista</span>
                      <strong className={`text-sm ${isExitExceeded ? 'text-rose-700' : 'text-zinc-900'}`}>
                        -{exitQty || 0} un.
                      </strong>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg border text-center ${
                    isExitExceeded ? 'bg-rose-50 border-rose-200' : 'bg-white border-zinc-200'
                  }`}>
                    <span className="text-[11px] text-zinc-500 block">Saldo Restante</span>
                    <strong className={`text-xl font-bold ${isExitExceeded ? 'text-rose-700' : 'text-zinc-900'}`}>
                      {exitSimulatedStock} peças
                    </strong>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-zinc-500">Nenhum produto selecionado.</p>
              )}
            </div>

            <p className="text-[11px] text-zinc-400 mt-4 pt-3 border-t border-zinc-200">
              Operações de saída reduzem o estoque imediatamente e preservam o número do documento no histórico.
            </p>
          </div>
        </div>
      )}

      {/* ABA 3: BAIXA DE MERCADORIA */}
      {activeTab === 'loss' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl p-5 md:p-6 shadow-xs">
            <h2 className="text-base font-bold text-zinc-900 mb-1">Registrar Baixa de Mercadoria</h2>
            <p className="text-xs text-zinc-500 mb-5">
              Utilize esta opção para descartar peças danificadas, avariadas ou com defeito de fábrica, mantendo a rastreabilidade da perda.
            </p>

            {lossFeedback && (
              <div className={`p-3 rounded-lg mb-5 text-xs ${
                lossFeedback.type === 'success'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}>
                {lossFeedback.message}
              </div>
            )}

            <form onSubmit={handleLossSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-900 mb-1">
                  Produto para Baixa <span className="text-zinc-900">*</span>
                </label>
                <select
                  value={lossId}
                  onChange={e => setLossId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-400"
                >
                  {activeProducts.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku}) — Saldo atual: {p.quantity} peças
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-900 mb-1">
                    Quantidade a Baixar <span className="text-zinc-900">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={lossQty}
                    onChange={e => setLossQty(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-900 mb-1">
                    Motivo da Baixa <span className="text-zinc-900">*</span>
                  </label>
                  <select
                    value={lossReason}
                    onChange={e => setLossReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-400"
                  >
                    <option value="Produto com defeito de fabricação">Produto com defeito de fabricação</option>
                    <option value="Avaria ou dano durante manuseio">Avaria ou dano durante manuseio</option>
                    <option value="Mancha permanente ou rasgo no tecido">Mancha permanente ou rasgo no tecido</option>
                    <option value="Extravio de mercadoria">Extravio de mercadoria</option>
                    <option value="Ajuste por perda / inventário">Ajuste por perda / inventário</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-900 mb-1">
                  Detalhes da Avaria ou Laudo (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={lossNotes}
                  onChange={e => setLossNotes(e.target.value)}
                  placeholder="Ex: Zíper travado, costura rompida no acabamento..."
                  className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-zinc-200 text-zinc-900 focus:outline-none focus:border-zinc-400"
                />
              </div>

              <div className="pt-3 border-t border-zinc-200 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isLossExceeded}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold transition-colors shadow-xs ${
                    isLossExceeded
                      ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                      : 'bg-rose-700 hover:bg-rose-800 text-white'
                  }`}
                >
                  Confirmar Baixa de Mercadoria
                </button>
              </div>
            </form>
          </div>

          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 flex flex-col justify-between shadow-xs">
            <div>
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-3">
                Conferência da Baixa
              </h3>

              {selectedLossProd ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-zinc-500 text-[11px] block">Produto</span>
                    <strong className="text-zinc-900 text-sm block">{selectedLossProd.name}</strong>
                    <span className="text-[11px] font-mono text-zinc-400">SKU: {selectedLossProd.sku}</span>
                  </div>

                  <div className="pt-2 border-t border-zinc-200 grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                      <span className="text-[10px] text-zinc-500 block">Estoque Atual</span>
                      <strong className="text-sm text-zinc-900">{lossCurrentStock} un.</strong>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                      <span className="text-[10px] text-zinc-500 block">Baixa Registrada</span>
                      <strong className="text-sm text-rose-700">-{lossQty || 0} un.</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-zinc-200 text-center">
                    <span className="text-[11px] text-zinc-500 block">Saldo Após Baixa</span>
                    <strong className="text-xl font-bold text-zinc-900">{lossSimulatedStock} peças</strong>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-zinc-500">Nenhum produto selecionado.</p>
              )}
            </div>

            <p className="text-[11px] text-zinc-400 mt-4 pt-3 border-t border-zinc-200">
              A baixa é categorizada separadamente de saídas comuns para facilitar o acompanhamento de perdas da loja.
            </p>
          </div>
        </div>
      )}

      {/* ABA 4: RECEBIMENTO DE CARGAS */}
      {activeTab === 'receivings' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-xl p-5 md:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <h2 className="text-base font-bold text-zinc-900">Recebimentos & Conferência de Cargas</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Conferência de lotes e notas fiscais com trava de segurança contra entradas duplicadas.
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {receivings.length === 0 ? (
                <p className="text-xs text-zinc-500 text-center py-6">
                  Nenhuma carga de recebimento registrada no sistema.
                </p>
              ) : (
                receivings.map(rec => {
                  const isPending = rec.status === 'PENDENTE';
                  const totalItemsQty = rec.items.reduce((acc, it) => acc + it.quantity, 0);

                  return (
                    <div
                      key={rec.id}
                      className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            isPending
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}>
                            {isPending ? 'Pendente de Conferência' : 'Confirmado no Estoque'}
                          </span>
                          <span className="font-mono text-xs font-bold text-zinc-900">{rec.code}</span>
                          {rec.referenceDoc && (
                            <span className="text-xs text-zinc-500">• {rec.referenceDoc}</span>
                          )}
                        </div>

                        <div className="text-xs text-zinc-900 font-medium">
                          Fornecedor: <span className="font-semibold">{rec.supplier}</span>
                        </div>

                        <div className="text-[11px] text-zinc-500">
                          Itens da Carga ({rec.items.length}):{' '}
                          {rec.items.map(it => `${it.productName} (+${it.quantity} un.)`).join(', ')}
                        </div>

                        {rec.confirmedAt && (
                          <div className="text-[10px] text-emerald-800 font-medium">
                            Conferido e integrado ao estoque em: {new Date(rec.confirmedAt).toLocaleString('pt-BR')}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right hidden sm:block">
                          <span className="text-[10px] text-zinc-500 uppercase block">Total da Carga</span>
                          <span className="text-sm font-bold text-zinc-900">{totalItemsQty} peças</span>
                        </div>

                        {isPending ? (
                          <button
                            onClick={() => onConfirmReceiving(rec.id)}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#9C4B5C] hover:bg-[#863C4B] text-white text-xs font-semibold transition-colors shadow-xs"
                            title="Confirmar carga e alimentar o estoque"
                          >
                            <Check className="w-4 h-4" />
                            <span>Confirmar Carga</span>
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Estoque Integrado</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ABA 5: CONSULTA & ALERTAS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-xl p-5 md:p-6 shadow-xs">
            <h2 className="text-base font-bold text-zinc-900 mb-1">Produtos que Precisam de Reposição</h2>
            <p className="text-xs text-zinc-500 mb-5">
              Supervisão de produtos com estoque zerado ou em quantidade igual ou inferior ao estoque mínimo.
            </p>

            <div className="space-y-4">
              {/* Produtos Esgotados (Zerados) */}
              <div>
                <h3 className="text-xs font-bold text-rose-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <span>Produtos Esgotados ({outOfStockProducts.length})</span>
                </h3>

                {outOfStockProducts.length === 0 ? (
                  <p className="text-xs text-zinc-500 p-3 rounded-lg bg-zinc-50 border border-zinc-200">
                    Nenhum produto com estoque zerado na loja.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {outOfStockProducts.map(p => (
                      <div
                        key={p.id}
                        className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/30 flex items-center justify-between gap-3"
                      >
                        <div>
                          <strong className="text-xs font-bold text-zinc-900 block">{p.name}</strong>
                          <span className="text-[11px] font-mono text-zinc-500">SKU: {p.sku} | Mínimo: {p.minStock} un.</span>
                        </div>
                        <button
                          onClick={() => {
                            setEntryId(p.id);
                            onTabChange('entry');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#9C4B5C] hover:bg-[#863C4B] text-white text-xs font-semibold transition-colors shadow-2xs"
                        >
                          Repor Agora
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Produtos com Estoque Baixo */}
              <div className="pt-3 border-t border-zinc-200">
                <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <span>Produtos com Estoque Baixo ({lowStockProducts.length})</span>
                </h3>

                {lowStockProducts.length === 0 ? (
                  <p className="text-xs text-zinc-500 p-3 rounded-lg bg-zinc-50 border border-zinc-200">
                    Nenhum produto abaixo do limite de segurança.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lowStockProducts.map(p => (
                      <div
                        key={p.id}
                        className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/30 flex items-center justify-between gap-3"
                      >
                        <div>
                          <strong className="text-xs font-bold text-zinc-900 block">{p.name}</strong>
                          <span className="text-[11px] text-zinc-500">
                            Restam: <strong className="text-amber-800">{p.quantity} un.</strong> (mínimo de segurança: {p.minStock} un.)
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setEntryId(p.id);
                            onTabChange('entry');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-200 text-xs font-semibold transition-colors"
                        >
                          Registrar Entrada
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
