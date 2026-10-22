import React, { useState, useEffect, useCallback } from 'react';
import { 
  ActivePage, 
  StockTab,
  Product, 
  Movement, 
  Receiving, 
  DashboardMetrics, 
  ToastNotification 
} from './types/index.ts';
import { StockService } from './services/storage';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/Toast';
import { Modal } from './components/Modal';

// Páginas principais
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { StockPage } from './pages/StockPage';
import { MovementsPage } from './pages/MovementsPage';

export function App() {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [activeStockTab, setActiveStockTab] = useState<StockTab>('entry');
  const [preselectedProductId, setPreselectedProductId] = useState<string | undefined>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Navegação
  const handleNavigate = (page: ActivePage, stockTab?: StockTab) => {
    setActivePage(page);
    if (stockTab) {
      setActiveStockTab(stockTab);
    }
  };

  // Ações de atalho rápido
  const handleQuickEntry = (productId?: string) => {
    setPreselectedProductId(productId);
    setActivePage('stock');
    setActiveStockTab('entry');
  };

  const handleQuickExit = (productId?: string) => {
    setPreselectedProductId(productId);
    setActivePage('stock');
    setActiveStockTab('exit');
  };

  const handleQuickLoss = (productId?: string) => {
    setPreselectedProductId(productId);
    setActivePage('stock');
    setActiveStockTab('loss');
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
        `Entrada de +${params.quantity} peça(s) confirmada! Novo saldo: ${result.movement?.newStock} un.`,
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
        `Saída de -${params.quantity} peça(s) confirmada com sucesso! Restam: ${result.movement?.newStock} un.`,
        'Saída Confirmada'
      );
      return { success: true };
    } else {
      showToast('error', result.error || 'Não foi possível efetuar a saída.', 'Operação Recusada');
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
        `Baixa de ${params.quantity} peça(s) registrada no histórico. Motivo: ${params.reason}.`,
        'Baixa Registrada'
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
        'Estoque Integrado'
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
    showToast('info', 'Os dados de exemplo da Exclusiva Store foram carregados.', 'Demonstração Ativada');
  };

  // Zerar todo o estoque (iniciar 100% limpo)
  const handleConfirmClearAll = () => {
    StockService.clearAllData();
    refreshData();
    setIsResetConfirmOpen(false);
    showToast('success', 'Todas as mercadorias e movimentações foram zeradas. O sistema está limpo para novos cadastros.', 'Estoque Zerado com Sucesso');
  };

  // Produtos críticos para o dashboard
  const criticalProducts = products.filter(p => p.quantity <= p.minStock);

  return (
    <div className="flex min-h-screen bg-white text-zinc-900 font-sans">
      {/* Notificações Toast */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Barra de Navegação Lateral */}
      <Sidebar
        activePage={activePage}
        onNavigate={page => {
          setPreselectedProductId(undefined);
          handleNavigate(page);
        }}
        lowStockAlertsCount={metrics.lowStockCount}
        outOfStockCount={metrics.outOfStockCount}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Área de Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          activePage={activePage}
          onNavigate={(page, stockTab) => {
            setPreselectedProductId(undefined);
            handleNavigate(page, stockTab);
          }}
          onResetDemo={() => setIsResetConfirmOpen(true)}
          totalProducts={metrics.totalProducts}
          totalUnits={metrics.totalUnitsInStock}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {activePage === 'dashboard' && (
            <DashboardPage
              metrics={metrics}
              recentMovements={movements}
              criticalProducts={criticalProducts}
              products={products}
              onNavigate={handleNavigate}
              onOpenNewProduct={() => setActivePage('products')}
              onQuickEntry={handleQuickEntry}
              onQuickExit={handleQuickExit}
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

          {activePage === 'stock' && (
            <StockPage
              products={products}
              recentMovements={movements}
              receivings={receivings}
              activeTab={activeStockTab}
              onTabChange={setActiveStockTab}
              preselectedProductId={preselectedProductId}
              onNavigateToProducts={() => setActivePage('products')}
              onRegisterEntry={handleRegisterEntry}
              onRegisterExit={handleRegisterExit}
              onRegisterLoss={handleRegisterLoss}
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
        </main>
      </div>

      {/* Modal de Gestão de Dados: Zerar ou Restaurar */}
      <Modal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        title="Gerenciamento da Base de Dados"
        subtitle="Exclusiva Store — Limpeza ou Demonstração"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <p className="text-zinc-600 leading-relaxed">
            Escolha como deseja configurar o sistema:
          </p>

          <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
            <strong className="text-zinc-900 block font-semibold">Opção 1: Zerar Tudo (Iniciar Loja Real)</strong>
            <p className="text-zinc-500 text-[11px]">
              Remove todos os produtos, movimentações e recebimentos. Deixa o sistema 100% limpo para você cadastrar as mercadorias reais da sua loja.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
            <strong className="text-zinc-900 block font-semibold">Opção 2: Carregar Demonstração</strong>
            <p className="text-zinc-500 text-[11px]">
              Carrega produtos e histórico fictícios para você demonstrar a aplicação com dados preenchidos.
            </p>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-end gap-2.5 border-t border-zinc-200">
            <button
              onClick={() => setIsResetConfirmOpen(false)}
              className="px-3.5 py-2 rounded-lg text-xs font-medium text-zinc-600 hover:bg-zinc-100 border border-zinc-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmResetDemo}
              className="px-3.5 py-2 rounded-lg text-xs font-medium text-zinc-700 hover:bg-zinc-100 border border-zinc-200 transition-colors"
            >
              Carregar Demo
            </button>
            <button
              onClick={handleConfirmClearAll}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white transition-colors shadow-xs"
            >
              Zerar Todo o Estoque (Limpo)
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
