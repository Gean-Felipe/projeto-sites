import React, { useState, useEffect, useCallback } from 'react';
import { 
  ActivePage, 
  Product, 
  Movement, 
  Receiving, 
  DashboardMetrics, 
  ToastNotification 
} from './types';
import { StockService } from './services/storage';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/Toast';
import { Modal } from './components/Modal';

// Páginas
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { StockEntriesPage } from './pages/StockEntriesPage';
import { StockExitsPage } from './pages/StockExitsPage';
import { StockLossesPage } from './pages/StockLossesPage';
import { ReceivingPage } from './pages/ReceivingPage';
import { MovementsPage } from './pages/MovementsPage';
import { StockAlertsPage } from './pages/StockAlertsPage';

export function App() {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [receivings, setReceivings] = useState<Receiving[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalProducts: 0,
    totalUnitsInStock: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    totalEntriesCount: 0,
    totalEntriesUnits: 0,
    totalExitsCount: 0,
    totalExitsUnits: 0,
    totalLossesCount: 0,
    totalLossesUnits: 0,
    totalCostValue: 0,
    totalSaleValue: 0,
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [preselectedProductId, setPreselectedProductId] = useState<string | undefined>();

  // Notificações Toast
  const showToast = useCallback((type: 'success' | 'error' | 'warning' | 'info', message: string, title?: string) => {
    const newToast: ToastNotification = {
      id: 'toast-' + Date.now() + '-' + Math.random(),
      type,
      title,
      message,
    };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Recarregar dados do storage
  const refreshData = useCallback(() => {
    const prods = StockService.getProducts();
    const movs = StockService.getMovements();
    const recs = StockService.getReceivings();
    const met = StockService.getDashboardMetrics();

    setProducts(prods);
    setMovements(movs);
    setReceivings(recs);
    setMetrics(met);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Ações de navegação rápida
  const handleQuickEntry = (productId?: string) => {
    setPreselectedProductId(productId);
    setActivePage('entries');
  };

  const handleQuickExit = (productId?: string) => {
    setPreselectedProductId(productId);
    setActivePage('exits');
  };

  const handleQuickLoss = (productId?: string) => {
    setPreselectedProductId(productId);
    setActivePage('losses');
  };

  // Cadastro de produto
  const handleSaveProduct = (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = StockService.createProduct(data);
    if (result.success) {
      refreshData();
      showToast('success', `Produto "${data.name}" cadastrado com sucesso!`, 'Cadastro Concluído');
      return { success: true };
    } else {
      showToast('error', result.error || 'Falha ao salvar produto.', 'Erro de Validação');
      return { success: false, error: result.error };
    }
  };

  // Edição de produto
  const handleUpdateProduct = (id: string, updates: Partial<Product>) => {
    const result = StockService.updateProduct(id, updates);
    if (result.success) {
      refreshData();
      showToast('success', 'Dados do produto atualizados com sucesso.', 'Atualização Realizada');
      return { success: true };
    } else {
      showToast('error', result.error || 'Falha ao atualizar produto.', 'Erro');
      return { success: false, error: result.error };
    }
  };

  // Registro de Entrada
  const handleRegisterEntry = (params: {
    productId: string;
    quantity: number;
    supplier?: string;
    referenceDoc?: string;
    notes?: string;
    date?: string;
  }) => {
    const result = StockService.registerStockEntry(params);
    if (result.success) {
      refreshData();
      showToast(
        'success',
        `Entrada de +${params.quantity} unidade(s) confirmada! Novo saldo: ${result.movement?.newStock} un.`,
        'Estoque Atualizado'
      );
      return { success: true };
    } else {
      showToast('error', result.error || 'Erro na operação de entrada.', 'Entrada Recusada');
      return { success: false, error: result.error };
    }
  };

  // Registro de Saída
  const handleRegisterExit = (params: {
    productId: string;
    quantity: number;
    reason: string;
    referenceDoc?: string;
    notes?: string;
    date?: string;
  }) => {
    const result = StockService.registerStockExit(params);
    if (result.success) {
      refreshData();
      showToast(
        'success',
        `Saída de -${params.quantity} unidade(s) confirmada com sucesso! Saldo restante: ${result.movement?.newStock} un.`,
        'Saída Confirmada'
      );
      return { success: true };
    } else {
      showToast('error', result.error || 'Não foi possível efetuar a saída.', 'Operação Inválida');
      return { success: false, error: result.error };
    }
  };

  // Registro de Baixa / Avaria
  const handleRegisterLoss = (params: {
    productId: string;
    quantity: number;
    reason: string;
    referenceDoc?: string;
    notes?: string;
    date?: string;
  }) => {
    const result = StockService.registerStockLoss(params);
    if (result.success) {
      refreshData();
      showToast(
        'warning',
        `Baixa de ${params.quantity} peça(s) registrada no histórico! Motivo: ${params.reason}.`,
        'Baixa de Estoque Efetuada'
      );
      return { success: true };
    } else {
      showToast('error', result.error || 'Falha ao registrar baixa.', 'Operação Recusada');
      return { success: false, error: result.error };
    }
  };

  // Criar Recebimento em Lote
  const handleCreateReceiving = (params: {
    supplier: string;
    date: string;
    referenceDoc?: string;
    notes?: string;
    items: { productId: string; quantity: number; unitCost?: number }[];
  }) => {
    const result = StockService.createReceiving(params);
    if (result.success) {
      refreshData();
      showToast(
        'info',
        `Recebimento ${result.receiving?.code} registrado como Pendente de Conferência.`,
        'Carga Registrada'
      );
      return { success: true };
    } else {
      showToast('error', result.error || 'Erro ao registrar recebimento.', 'Erro');
      return { success: false, error: result.error };
    }
  };

  // Confirmar Recebimento e Alimentar Estoque
  const handleConfirmReceiving = (receivingId: string) => {
    const result = StockService.confirmReceiving(receivingId);
    if (result.success) {
      refreshData();
      showToast(
        'success',
        `Carga conferida com sucesso! ${result.updatedCount} produto(s) tiveram seus estoques atualizados.`,
        'Recebimento Integrado ao Estoque'
      );
      return { success: true };
    } else {
      showToast('error', result.error || 'Erro ao confirmar recebimento.', 'Ação Bloqueada');
      return { success: false, error: result.error };
    }
  };

  // Resetar dados para demonstração
  const handleConfirmResetDemo = () => {
    StockService.resetToDemoData();
    refreshData();
    setIsResetConfirmOpen(false);
    showToast('info', 'Os dados originais de demonstração da Exclusiva Store foram restaurados.', 'Demonstração Reiniciada');
  };

  // Produtos críticos para o dashboard
  const criticalProducts = products.filter(p => p.quantity <= p.minStock);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        onNavigate={page => {
          setPreselectedProductId(undefined);
          setActivePage(page);
        }}
        lowStockAlertsCount={metrics.lowStockCount}
        outOfStockCount={metrics.outOfStockCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          activePage={activePage}
          onNavigate={page => {
            setPreselectedProductId(undefined);
            setActivePage(page);
          }}
          onResetDemo={() => setIsResetConfirmOpen(true)}
          totalProducts={metrics.totalProducts}
          totalUnits={metrics.totalUnitsInStock}
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {activePage === 'dashboard' && (
            <DashboardPage
              metrics={metrics}
              recentMovements={movements}
              criticalProducts={criticalProducts}
              onNavigate={setActivePage}
              onOpenNewProduct={() => setActivePage('products')}
              onQuickEntry={handleQuickEntry}
              onQuickExit={handleQuickExit}
              onQuickLoss={handleQuickLoss}
            />
          )}

          {activePage === 'products' && (
            <ProductsPage
              products={products}
              movements={movements}
              onSaveProduct={handleSaveProduct}
              onUpdateProduct={handleUpdateProduct}
              onQuickEntry={handleQuickEntry}
              onQuickExit={handleQuickExit}
              onQuickLoss={handleQuickLoss}
            />
          )}

          {activePage === 'entries' && (
            <StockEntriesPage
              products={products}
              recentEntries={movements.filter(m => m.type === 'ENTRADA')}
              initialProductId={preselectedProductId}
              onRegisterEntry={handleRegisterEntry}
            />
          )}

          {activePage === 'exits' && (
            <StockExitsPage
              products={products}
              recentExits={movements.filter(m => m.type === 'SAIDA')}
              initialProductId={preselectedProductId}
              onRegisterExit={handleRegisterExit}
            />
          )}

          {activePage === 'losses' && (
            <StockLossesPage
              products={products}
              recentLosses={movements.filter(m => m.type === 'BAIXA')}
              initialProductId={preselectedProductId}
              onRegisterLoss={handleRegisterLoss}
            />
          )}

          {activePage === 'receivings' && (
            <ReceivingPage
              receivings={receivings}
              products={products}
              onCreateReceiving={handleCreateReceiving}
              onConfirmReceiving={handleConfirmReceiving}
            />
          )}

          {activePage === 'movements' && (
            <MovementsPage
              movements={movements}
              products={products}
            />
          )}

          {activePage === 'stock-alerts' && (
            <StockAlertsPage
              products={products}
              onQuickEntry={handleQuickEntry}
            />
          )}
        </main>
      </div>

      {/* Modal de Confirmação: Restaurar Dados Demo */}
      <Modal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        title="Restaurar Dados de Demonstração?"
        subtitle="Exclusiva Store — Reiniciar cenário"
        maxWidth="md"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Deseja redefinir o catálogo para o estado original da demonstração?
            Todas as movimentações adicionadas durante os testes serão redefinidas para o conjunto inicial consistente.
          </p>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              onClick={() => setIsResetConfirmOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmResetDemo}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-950/20"
            >
              Sim, Restaurar Dados
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
