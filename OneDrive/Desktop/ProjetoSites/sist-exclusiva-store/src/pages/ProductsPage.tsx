import React, { useState, useMemo } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Eye, 
  ArrowDownToDot, 
  ArrowUpFromDot, 
  FileWarning, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2,
  Tag,
  DollarSign,
  Boxes
} from 'lucide-react';
import { Product, Movement } from '../types';
import { Modal } from '../components/Modal';

interface ProductsPageProps {
  products: Product[];
  movements: Movement[];
  onSaveProduct: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => { success: boolean; error?: string };
  onUpdateProduct: (id: string, updates: Partial<Product>) => { success: boolean; error?: string };
  onQuickEntry: (productId: string) => void;
  onQuickExit: (productId: string) => void;
  onQuickLoss: (productId: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  movements,
  onSaveProduct,
  onUpdateProduct,
  onQuickEntry,
  onQuickExit,
  onQuickLoss,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [stockStatusFilter, setStockStatusFilter] = useState('ALL');
  const [activeStatusFilter, setActiveStatusFilter] = useState('ALL');

  // Modais
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Vestuário Feminino',
    description: '',
    quantity: 0,
    minStock: 5,
    unitCost: 0,
    salePrice: 0,
    status: 'active' as 'active' | 'inactive',
  });
  const [formError, setFormError] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Busca
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));

      // Categoria
      const matchCat = categoryFilter === 'ALL' || p.category === categoryFilter;

      // Status Estoque
      let matchStock = true;
      if (stockStatusFilter === 'OUT') matchStock = p.quantity === 0;
      else if (stockStatusFilter === 'LOW') matchStock = p.quantity > 0 && p.quantity <= p.minStock;
      else if (stockStatusFilter === 'NORMAL') matchStock = p.quantity > p.minStock;

      // Status Ativo
      const matchActive =
        activeStatusFilter === 'ALL' ||
        (activeStatusFilter === 'ACTIVE' && p.status === 'active') ||
        (activeStatusFilter === 'INACTIVE' && p.status === 'inactive');

      return matchSearch && matchCat && matchStock && matchActive;
    });
  }, [products, searchTerm, categoryFilter, stockStatusFilter, activeStatusFilter]);

  const handleOpenCreate = () => {
    setFormData({
      name: '',
      sku: '',
      category: categories[0] || 'Vestuário Feminino',
      description: '',
      quantity: 0,
      minStock: 5,
      unitCost: 0,
      salePrice: 0,
      status: 'active',
    });
    setFormError(null);
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      sku: p.sku,
      category: p.category,
      description: p.description || '',
      quantity: p.quantity,
      minStock: p.minStock,
      unitCost: p.unitCost || 0,
      salePrice: p.salePrice || 0,
      status: p.status,
    });
    setFormError(null);
  };

  const handleSubmitCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError('Informe o nome do produto.');
      return;
    }
    if (!formData.sku.trim()) {
      setFormError('Informe o código ou SKU do produto.');
      return;
    }

    const res = onSaveProduct({
      name: formData.name.trim(),
      sku: formData.sku.trim().toUpperCase(),
      category: formData.category.trim(),
      description: formData.description.trim() || undefined,
      quantity: Number(formData.quantity) || 0,
      minStock: Number(formData.minStock) || 0,
      unitCost: Number(formData.unitCost) || undefined,
      salePrice: Number(formData.salePrice) || undefined,
      status: formData.status,
    });

    if (res.success) {
      setIsCreateModalOpen(false);
    } else {
      setFormError(res.error || 'Erro ao cadastrar produto.');
    }
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError('Informe o nome do produto.');
      return;
    }
    if (!formData.sku.trim()) {
      setFormError('Informe o código ou SKU do produto.');
      return;
    }

    const res = onUpdateProduct(editingProduct.id, {
      name: formData.name.trim(),
      sku: formData.sku.trim().toUpperCase(),
      category: formData.category.trim(),
      description: formData.description.trim() || undefined,
      minStock: Number(formData.minStock) || 0,
      unitCost: Number(formData.unitCost) || undefined,
      salePrice: Number(formData.salePrice) || undefined,
      status: formData.status,
    });

    if (res.success) {
      setEditingProduct(null);
    } else {
      setFormError(res.error || 'Erro ao atualizar produto.');
    }
  };

  const formatCurrency = (val?: number) => {
    if (val === undefined || val === null) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  // Movimentações do produto selecionado para visualização
  const productMovements = useMemo(() => {
    if (!viewingProduct) return [];
    return movements.filter(m => m.productId === viewingProduct.id);
  }, [movements, viewingProduct]);

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Gerenciamento de Produtos</h2>
          <p className="text-xs text-slate-500 mt-1">
            Cadastre novos itens, consulte níveis de estoque e configure estoques mínimos de segurança.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-950/20 transition-all hover:scale-[1.02] shrink-0"
        >
          <Plus className="w-4 h-4" />
          Cadastrar Novo Produto
        </button>
      </div>

      {/* Filters & Search Card */}
      <div className="bg-white p-4.5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou SKU..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-700"
            >
              <option value="ALL">Todas as Categorias</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Stock Status Filter */}
          <div>
            <select
              value={stockStatusFilter}
              onChange={e => setStockStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-700"
            >
              <option value="ALL">Situação: Todos os Estoques</option>
              <option value="OUT">Sem Estoque (Zerados)</option>
              <option value="LOW">Estoque Baixo (No Limite)</option>
              <option value="NORMAL">Estoque Normal</option>
            </select>
          </div>

          {/* Active Status */}
          <div>
            <select
              value={activeStatusFilter}
              onChange={e => setActiveStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-700"
            >
              <option value="ALL">Status: Todos</option>
              <option value="ACTIVE">Apenas Ativos</option>
              <option value="INACTIVE">Inativos</option>
            </select>
          </div>
        </div>

        {/* Filter count summary */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>Exibindo <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> produtos cadastrados</span>
          {(searchTerm || categoryFilter !== 'ALL' || stockStatusFilter !== 'ALL' || activeStatusFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('ALL');
                setStockStatusFilter('ALL');
                setActiveStatusFilter('ALL');
              }}
              className="text-amber-600 hover:text-amber-800 font-semibold"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 font-bold">Código / SKU</th>
                <th className="py-3 px-4 font-bold">Produto & Categoria</th>
                <th className="py-3 px-4 font-bold text-center">Qtd Atual</th>
                <th className="py-3 px-4 font-bold text-center">Est. Mínimo</th>
                <th className="py-3 px-4 font-bold text-center">Situação</th>
                <th className="py-3 px-4 font-bold text-right">Custo</th>
                <th className="py-3 px-4 font-bold text-right">Venda</th>
                <th className="py-3 px-4 font-bold text-center">Status</th>
                <th className="py-3 px-4 font-bold text-center">Ações Rápidas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <Boxes className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="text-xs font-semibold text-slate-600">Nenhum produto encontrado</p>
                    <p className="text-[11px] text-slate-400">Tente alterar os termos da busca ou os filtros aplicados.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map(prod => {
                  const isOutOfStock = prod.quantity === 0;
                  const isLowStock = prod.quantity > 0 && prod.quantity <= prod.minStock;

                  return (
                    <tr key={prod.id} className="hover:bg-slate-50/90 transition-colors">
                      {/* SKU */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {prod.sku}
                      </td>

                      {/* Product Name & Category */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{prod.name}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Tag className="w-3 h-3 text-slate-400" />
                          <span>{prod.category}</span>
                        </div>
                      </td>

                      {/* Current Quantity */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`text-sm font-extrabold ${
                          isOutOfStock ? 'text-rose-600' : isLowStock ? 'text-amber-600' : 'text-slate-900'
                        }`}>
                          {prod.quantity}
                        </span>
                        <span className="text-[10px] text-slate-400 ml-1">un.</span>
                      </td>

                      {/* Min Stock */}
                      <td className="py-3.5 px-4 text-center text-slate-600 font-medium">
                        {prod.minStock} un.
                      </td>

                      {/* Stock Situation Badge */}
                      <td className="py-3.5 px-4 text-center">
                        {isOutOfStock ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                            <XCircle className="w-3 h-3" /> Esgotado
                          </span>
                        ) : isLowStock ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            <AlertTriangle className="w-3 h-3" /> Baixo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> Normal
                          </span>
                        )}
                      </td>

                      {/* Costs */}
                      <td className="py-3.5 px-4 text-right text-slate-600 font-mono text-[11px]">
                        {formatCurrency(prod.unitCost)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900 font-mono text-xs">
                        {formatCurrency(prod.salePrice)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          prod.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {prod.status === 'active' ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {/* Quick Entry */}
                          <button
                            onClick={() => onQuickEntry(prod.id)}
                            className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-colors"
                            title="Registrar Entrada deste produto"
                          >
                            <ArrowDownToDot className="w-4 h-4" />
                          </button>

                          {/* Quick Exit */}
                          <button
                            onClick={() => onQuickExit(prod.id)}
                            disabled={prod.quantity === 0 || prod.status === 'inactive'}
                            className="p-1.5 rounded-lg text-blue-700 hover:bg-blue-50 border border-transparent hover:border-blue-200 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Registrar Saída deste produto"
                          >
                            <ArrowUpFromDot className="w-4 h-4" />
                          </button>

                          {/* Quick Loss */}
                          <button
                            onClick={() => onQuickLoss(prod.id)}
                            disabled={prod.quantity === 0}
                            className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            title="Registrar Baixa / Avaria"
                          >
                            <FileWarning className="w-4 h-4" />
                          </button>

                          {/* View details */}
                          <button
                            onClick={() => setViewingProduct(prod)}
                            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                            title="Visualizar Detalhes e Extrato"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => handleOpenEdit(prod)}
                            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                            title="Editar Dados do Produto"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Cadastro de Novo Produto */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Cadastrar Novo Produto"
        subtitle="Informe os dados da mercadoria. O código SKU deve ser único."
        maxWidth="lg"
      >
        <form onSubmit={handleSubmitCreate} className="space-y-4">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium flex items-center gap-2">
              <XCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nome do Produto *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Vestido Chemise Poá Seda"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Código / SKU * (Único)
              </label>
              <input
                type="text"
                required
                placeholder="Ex: VST-009"
                value={formData.sku}
                onChange={e => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Categoria *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Vestuário Feminino"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Descrição (Opcional)
              </label>
              <textarea
                rows={2}
                placeholder="Detalhes sobre tecido, medidas, cor ou coleção..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Quantidade Inicial em Estoque
              </label>
              <input
                type="number"
                min="0"
                value={formData.quantity}
                onChange={e => setFormData({ ...formData, quantity: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-bold"
              />
              <p className="text-[10px] text-slate-400 mt-1">Gera entrada automática se &gt; 0</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Estoque Mínimo de Alerta
              </label>
              <input
                type="number"
                min="0"
                value={formData.minStock}
                onChange={e => setFormData({ ...formData, minStock: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Custo Unitário (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.unitCost}
                onChange={e => setFormData({ ...formData, unitCost: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preço de Venda (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.salePrice}
                onChange={e => setFormData({ ...formData, salePrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status Inicial
              </label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                <option value="active">Ativo (Disponível para operações)</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-950/20 transition-colors"
            >
              Salvar Produto
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Edição de Produto */}
      <Modal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        title="Editar Dados do Produto"
        subtitle={`Alterando informações de ${editingProduct?.name}`}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmitEdit} className="space-y-4">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium flex items-center gap-2">
              <XCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nome do Produto *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Código / SKU *
              </label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={e => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Categoria *
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Descrição (Opcional)
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Estoque Mínimo de Alerta
              </label>
              <input
                type="number"
                min="0"
                value={formData.minStock}
                onChange={e => setFormData({ ...formData, minStock: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo (Bloqueia novas saídas e entradas)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Custo Unitário (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.unitCost}
                onChange={e => setFormData({ ...formData, unitCost: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preço de Venda (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.salePrice}
                onChange={e => setFormData({ ...formData, salePrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-bold"
              />
            </div>
          </div>

          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-[11px] text-amber-800">
            <strong>Nota de Auditoria:</strong> A quantidade em estoque atual ({editingProduct?.quantity} un.) só pode ser alterada através dos módulos de Entrada, Saída, Baixa ou Recebimento para garantir a integridade do histórico.
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-950/20 transition-colors"
            >
              Atualizar Produto
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Detalhes e Extrato do Produto */}
      <Modal
        isOpen={!!viewingProduct}
        onClose={() => setViewingProduct(null)}
        title={viewingProduct?.name || 'Detalhes do Produto'}
        subtitle={`SKU: ${viewingProduct?.sku} | ${viewingProduct?.category}`}
        maxWidth="2xl"
      >
        {viewingProduct && (
          <div className="space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Estoque Atual</span>
                <div className="text-xl font-black text-slate-900 mt-1">{viewingProduct.quantity} un.</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Estoque Mínimo</span>
                <div className="text-xl font-black text-slate-700 mt-1">{viewingProduct.minStock} un.</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Custo Unitário</span>
                <div className="text-sm font-bold text-slate-700 font-mono mt-2">{formatCurrency(viewingProduct.unitCost)}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400">Preço de Venda</span>
                <div className="text-sm font-bold text-emerald-700 font-mono mt-2">{formatCurrency(viewingProduct.salePrice)}</div>
              </div>
            </div>

            {viewingProduct.description && (
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">Descrição:</span>
                {viewingProduct.description}
              </div>
            )}

            {/* Extrato de movimentações deste produto */}
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-3">Extrato de Movimentações deste Produto</h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                {productMovements.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    Nenhuma movimentação registrada para este item.
                  </div>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-400 uppercase text-[9px] font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">Data/Hora</th>
                        <th className="p-2.5">Tipo</th>
                        <th className="p-2.5 text-center">Qtd</th>
                        <th className="p-2.5 text-center">Saldo</th>
                        <th className="p-2.5">Motivo / Doc</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {productMovements.map(m => (
                        <tr key={m.id} className="hover:bg-slate-50">
                          <td className="p-2.5 text-slate-500 whitespace-nowrap">
                            {new Date(m.timestamp).toLocaleDateString('pt-BR')} {new Date(m.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="p-2.5 font-bold">
                            <span className={m.type === 'ENTRADA' ? 'text-emerald-700' : m.type === 'SAIDA' ? 'text-blue-700' : 'text-rose-700'}>
                              {m.type}
                            </span>
                          </td>
                          <td className="p-2.5 text-center font-bold">
                            {m.type === 'ENTRADA' ? `+${m.quantity}` : `-${m.quantity}`}
                          </td>
                          <td className="p-2.5 text-center text-slate-600 font-mono text-[11px]">
                            {m.previousStock} ➔ {m.newStock}
                          </td>
                          <td className="p-2.5 text-slate-600 truncate max-w-[200px]">
                            {m.reason} {m.referenceDoc && `(${m.referenceDoc})`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setViewingProduct(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
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
