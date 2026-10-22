import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Edit3, 
  Eye, 
  ArrowDownToDot, 
  ArrowUpFromDot, 
  FileWarning, 
  History,
  X
} from 'lucide-react';
import { Product, Movement } from '../types/index.ts';
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

  // Modais
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
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
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = categoryFilter === 'ALL' || p.category === categoryFilter;

      let matchStock = true;
      if (stockStatusFilter === 'OUT') matchStock = p.quantity === 0;
      else if (stockStatusFilter === 'LOW') matchStock = p.quantity > 0 && p.quantity <= p.minStock;
      else if (stockStatusFilter === 'NORMAL') matchStock = p.quantity > p.minStock;

      return matchSearch && matchCategory && matchStock;
    });
  }, [products, searchTerm, categoryFilter, stockStatusFilter]);

  const handleOpenCreate = () => {
    setEditingProduct(null);
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
    setIsFormModalOpen(true);
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
    setIsFormModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    if (editingProduct) {
      const res = onUpdateProduct(editingProduct.id, {
        name: formData.name.trim(),
        sku: formData.sku.trim().toUpperCase(),
        category: formData.category.trim(),
        description: formData.description.trim() || undefined,
        minStock: Math.max(0, Number(formData.minStock) || 0),
        unitCost: Number(formData.unitCost) || 0,
        salePrice: Number(formData.salePrice) || 0,
        status: formData.status,
      });

      if (res.success) {
        setIsFormModalOpen(false);
      } else {
        setFormError(res.error || 'Erro ao atualizar dados do produto.');
      }
    } else {
      const res = onSaveProduct({
        name: formData.name.trim(),
        sku: formData.sku.trim().toUpperCase(),
        category: formData.category.trim(),
        description: formData.description.trim() || undefined,
        quantity: Math.max(0, Number(formData.quantity) || 0),
        minStock: Math.max(0, Number(formData.minStock) || 0),
        unitCost: Number(formData.unitCost) || 0,
        salePrice: Number(formData.salePrice) || 0,
        status: formData.status,
      });

      if (res.success) {
        setIsFormModalOpen(false);
      } else {
        setFormError(res.error || 'Erro ao cadastrar produto.');
      }
    }
  };

  // Movimentações do produto em visualização
  const viewingMovements = useMemo(() => {
    if (!viewingProduct) return [];
    return movements.filter(m => m.productId === viewingProduct.id);
  }, [viewingProduct, movements]);

  const formatCurrency = (val?: number) => {
    if (val === undefined || val === null) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
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
      {/* Cabeçalho e Botão de Ação Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0E0606] tracking-tight">Produtos em Estoque</h1>
          <p className="text-xs text-[#7A5B67] mt-0.5">
            Consulta rápida, controle de estoque mínimo e dados cadastrais das mercadorias.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#CF7C89] hover:bg-[#BE6B78] text-[#FEFEFE] text-xs font-semibold transition-colors shadow-2xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Produto</span>
        </button>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="bg-[#FAE7E7] border border-[#EED9DC] rounded-xl p-3.5 flex flex-col md:flex-row gap-3">
        {/* Campo de Busca */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A5B67]" />
          <input
            type="text"
            placeholder="Buscar por nome ou código do produto..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-xs bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606] placeholder-[#7A5B67] focus:outline-none focus:border-[#CF7C89]"
          />
        </div>

        {/* Filtro por Categoria */}
        <div className="w-full md:w-56">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-xs bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606] focus:outline-none focus:border-[#CF7C89]"
          >
            <option value="ALL">Todas as categorias</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Filtro por Situação de Estoque */}
        <div className="w-full md:w-52">
          <select
            value={stockStatusFilter}
            onChange={e => setStockStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-xs bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606] focus:outline-none focus:border-[#CF7C89]"
          >
            <option value="ALL">Todas as situações</option>
            <option value="NORMAL">Estoque regular</option>
            <option value="LOW">Estoque baixo (alerta)</option>
            <option value="OUT">Sem estoque (zerado)</option>
          </select>
        </div>
      </div>

      {/* Tabela Principal de Produtos */}
      <div className="bg-[#FEFEFE] rounded-xl border border-[#EED9DC] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAE7E7]/60 text-[#7A5B67] uppercase text-[10px] font-semibold border-b border-[#EED9DC]">
                <th className="py-3 px-4">Nome do Produto</th>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4 text-center">Qtd em Estoque</th>
                <th className="py-3 px-4 text-center">Estoque Mínimo</th>
                <th className="py-3 px-4 text-center">Situação</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EED9DC]/60">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#7A5B67]">
                    Nenhum produto encontrado com os filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => {
                  const isZero = product.quantity === 0;
                  const isLow = product.quantity > 0 && product.quantity <= product.minStock;

                  let situationBadge = (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Normal
                    </span>
                  );
                  if (isZero) {
                    situationBadge = (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-rose-50 text-rose-800 border border-rose-200">
                        Esgotado
                      </span>
                    );
                  } else if (isLow) {
                    situationBadge = (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                        Baixo
                      </span>
                    );
                  }

                  return (
                    <tr key={product.id} className="hover:bg-[#FAE7E7]/30 transition-colors">
                      {/* Nome do Produto */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => setViewingProduct(product)}
                          className="font-semibold text-[#0E0606] hover:text-[#CF7C89] text-left transition-colors"
                        >
                          {product.name}
                        </button>
                        {product.description && (
                          <p className="text-[11px] text-[#7A5B67] truncate max-w-xs">{product.description}</p>
                        )}
                      </td>

                      {/* Código */}
                      <td className="py-3 px-4 font-mono text-[#0E0606] font-medium">
                        {product.sku}
                      </td>

                      {/* Categoria */}
                      <td className="py-3 px-4 text-[#7A5B67]">
                        {product.category}
                      </td>

                      {/* Quantidade em Estoque */}
                      <td className="py-3 px-4 text-center">
                        <span className={`font-bold ${isZero ? 'text-rose-700' : isLow ? 'text-amber-700' : 'text-[#0E0606]'}`}>
                          {product.quantity} un.
                        </span>
                      </td>

                      {/* Estoque Mínimo */}
                      <td className="py-3 px-4 text-center text-[#7A5B67]">
                        {product.minStock} un.
                      </td>

                      {/* Situação */}
                      <td className="py-3 px-4 text-center">
                        {situationBadge}
                      </td>

                      {/* Ações Discretas */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => onQuickEntry(product.id)}
                            className="p-1.5 rounded text-[#7A5B67] hover:text-[#0E0606] hover:bg-[#FAE7E7] transition-colors"
                            title="Registrar Entrada"
                            aria-label={`Registrar entrada para ${product.name}`}
                          >
                            <ArrowDownToDot className="w-4 h-4 text-[#CF7C89]" />
                          </button>

                          <button
                            onClick={() => onQuickExit(product.id)}
                            className="p-1.5 rounded text-[#7A5B67] hover:text-[#0E0606] hover:bg-[#FAE7E7] transition-colors"
                            title="Registrar Saída"
                            aria-label={`Registrar saída para ${product.name}`}
                          >
                            <ArrowUpFromDot className="w-4 h-4 text-[#7A5B67]" />
                          </button>

                          <button
                            onClick={() => handleOpenEdit(product)}
                            className="p-1.5 rounded text-[#7A5B67] hover:text-[#0E0606] hover:bg-[#FAE7E7] transition-colors"
                            title="Editar Dados do Produto"
                            aria-label={`Editar ${product.name}`}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setViewingProduct(product)}
                            className="p-1.5 rounded text-[#7A5B67] hover:text-[#0E0606] hover:bg-[#FAE7E7] transition-colors"
                            title="Visualizar Detalhes e Histórico"
                            aria-label={`Ver detalhes de ${product.name}`}
                          >
                            <Eye className="w-4 h-4" />
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

      {/* Modal de Cadastro / Edição */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingProduct ? 'Editar Informações do Produto' : 'Cadastrar Novo Produto'}
        subtitle={editingProduct ? `Código: ${editingProduct.sku}` : 'Preencha os dados essenciais para o estoque'}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {formError}
            </div>
          )}

          {/* Grupo 1: Identificação Básica */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0E0606] uppercase tracking-wide border-b border-[#EED9DC] pb-1">
              1. Identificação
            </h4>

            <div>
              <label className="block text-xs font-medium text-[#0E0606] mb-1">
                Nome do Produto <span className="text-[#CF7C89]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Camisa Linho Elegance Manga Longa"
                className="w-full px-3 py-2 rounded-lg text-xs bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606] focus:outline-none focus:border-[#CF7C89]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#0E0606] mb-1">
                  Código / SKU <span className="text-[#CF7C89]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={e => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="Ex: CMS-001"
                  className="w-full px-3 py-2 rounded-lg text-xs font-mono bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606] uppercase focus:outline-none focus:border-[#CF7C89]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0E0606] mb-1">
                  Categoria
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Ex: Vestuário Feminino"
                  className="w-full px-3 py-2 rounded-lg text-xs bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606] focus:outline-none focus:border-[#CF7C89]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#0E0606] mb-1">
                Descrição ou Detalhes (Opcional)
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detalhes sobre o tecido, caimento ou especificações..."
                className="w-full px-3 py-2 rounded-lg text-xs bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606] focus:outline-none focus:border-[#CF7C89]"
              />
            </div>
          </div>

          {/* Grupo 2: Controle de Estoque */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-[#0E0606] uppercase tracking-wide border-b border-[#EED9DC] pb-1">
              2. Parâmetros de Estoque
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {!editingProduct ? (
                <div>
                  <label className="block text-xs font-medium text-[#0E0606] mb-1">
                    Estoque Inicial (Peças)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606] focus:outline-none focus:border-[#CF7C89]"
                  />
                  <p className="text-[10px] text-[#7A5B67] mt-0.5">Saldo inicial em estoque</p>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-[#FAE7E7] border border-[#EED9DC]">
                  <span className="text-[10px] text-[#7A5B67] block uppercase font-semibold">Estoque Atual</span>
                  <span className="text-sm font-bold text-[#0E0606]">{editingProduct.quantity} peças</span>
                  <p className="text-[10px] text-[#7A5B67] mt-0.5">Para alterar o saldo, use as operações de entrada ou saída.</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#0E0606] mb-1">
                  Estoque Mínimo de Segurança
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.minStock}
                  onChange={e => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg text-xs bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606] focus:outline-none focus:border-[#CF7C89]"
                />
                <p className="text-[10px] text-[#7A5B67] mt-0.5">Aviso quando atingir essa quantidade</p>
              </div>
            </div>
          </div>

          {/* Grupo 3: Preços e Custos (Opcional) */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-[#0E0606] uppercase tracking-wide border-b border-[#EED9DC] pb-1">
              3. Valores Comerciais (Opcional)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#0E0606] mb-1">
                  Custo Unitário (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.unitCost}
                  onChange={e => setFormData({ ...formData, unitCost: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg text-xs bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606] focus:outline-none focus:border-[#CF7C89]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#0E0606] mb-1">
                  Preço de Venda (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.salePrice}
                  onChange={e => setFormData({ ...formData, salePrice: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg text-xs bg-[#FEFEFE] border border-[#EED9DC] text-[#0E0606] focus:outline-none focus:border-[#CF7C89]"
                />
              </div>
            </div>
          </div>

          {/* Botões do Formulário */}
          <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-[#EED9DC]">
            <button
              type="button"
              onClick={() => setIsFormModalOpen(false)}
              className="px-4 py-2 rounded-lg text-xs font-medium text-[#7A5B67] hover:bg-[#FAE7E7] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#CF7C89] hover:bg-[#BE6B78] text-[#FEFEFE] transition-colors shadow-2xs"
            >
              {editingProduct ? 'Salvar Alterações' : 'Confirmar Cadastro'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal de Detalhes do Produto */}
      <Modal
        isOpen={Boolean(viewingProduct)}
        onClose={() => setViewingProduct(null)}
        title={viewingProduct?.name || 'Detalhes do Produto'}
        subtitle={`Código: ${viewingProduct?.sku || ''}`}
        maxWidth="xl"
      >
        {viewingProduct && (
          <div className="space-y-5">
            {/* Resumo Rápido */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-[#FAE7E7] border border-[#EED9DC]">
                <span className="text-[10px] text-[#7A5B67] uppercase font-semibold">Estoque Atual</span>
                <div className="text-base font-bold text-[#0E0606] mt-0.5">{viewingProduct.quantity} peças</div>
              </div>
              <div className="p-3 rounded-lg bg-[#FAE7E7] border border-[#EED9DC]">
                <span className="text-[10px] text-[#7A5B67] uppercase font-semibold">Estoque Mínimo</span>
                <div className="text-base font-bold text-[#0E0606] mt-0.5">{viewingProduct.minStock} peças</div>
              </div>
              <div className="p-3 rounded-lg bg-[#FAE7E7] border border-[#EED9DC]">
                <span className="text-[10px] text-[#7A5B67] uppercase font-semibold">Custo Unitário</span>
                <div className="text-base font-bold text-[#0E0606] mt-0.5">{formatCurrency(viewingProduct.unitCost)}</div>
              </div>
              <div className="p-3 rounded-lg bg-[#FAE7E7] border border-[#EED9DC]">
                <span className="text-[10px] text-[#7A5B67] uppercase font-semibold">Preço de Venda</span>
                <div className="text-base font-bold text-[#CF7C89] mt-0.5">{formatCurrency(viewingProduct.salePrice)}</div>
              </div>
            </div>

            {/* Ações diretas para este produto */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-[#FAE7E7]/40 rounded-lg border border-[#EED9DC]">
              <span className="text-xs font-semibold text-[#0E0606] mr-2">Ações rápidas:</span>
              <button
                onClick={() => {
                  setViewingProduct(null);
                  onQuickEntry(viewingProduct.id);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold bg-[#CF7C89] hover:bg-[#BE6B78] text-[#FEFEFE] transition-colors"
              >
                <ArrowDownToDot className="w-3.5 h-3.5" />
                <span>Registrar Entrada</span>
              </button>
              <button
                onClick={() => {
                  setViewingProduct(null);
                  onQuickExit(viewingProduct.id);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold bg-[#FEFEFE] hover:bg-[#FAE7E7] text-[#0E0606] border border-[#EED9DC] transition-colors"
              >
                <ArrowUpFromDot className="w-3.5 h-3.5 text-[#CF7C89]" />
                <span>Registrar Saída</span>
              </button>
              <button
                onClick={() => {
                  const p = viewingProduct;
                  setViewingProduct(null);
                  handleOpenEdit(p);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold bg-[#FEFEFE] hover:bg-[#FAE7E7] text-[#0E0606] border border-[#EED9DC] transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#7A5B67]" />
                <span>Editar</span>
              </button>
            </div>

            {/* Histórico Recente deste Produto */}
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#EED9DC] mb-2">
                <h4 className="text-xs font-bold text-[#0E0606] uppercase tracking-wide">
                  Histórico de Movimentações deste Produto
                </h4>
                <span className="text-[11px] text-[#7A5B67]">{viewingMovements.length} registro(s)</span>
              </div>

              {viewingMovements.length === 0 ? (
                <p className="text-xs text-[#7A5B67] py-4 text-center">
                  Nenhuma movimentação registrada para este produto.
                </p>
              ) : (
                <div className="max-h-56 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-[#7A5B67] text-[10px] font-semibold border-b border-[#EED9DC]">
                        <th className="py-2">Data</th>
                        <th className="py-2">Tipo</th>
                        <th className="py-2 text-center">Quantidade</th>
                        <th className="py-2 text-center">Saldo</th>
                        <th className="py-2">Motivo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EED9DC]/50">
                      {viewingMovements.map(m => (
                        <tr key={m.id}>
                          <td className="py-2 text-[11px] text-[#7A5B67]">{formatDate(m.timestamp)}</td>
                          <td className="py-2">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              m.type === 'ENTRADA' ? 'bg-emerald-50 text-emerald-800' :
                              m.type === 'SAIDA' ? 'bg-[#FAE7E7] text-[#0E0606]' : 'bg-rose-50 text-rose-800'
                            }`}>
                              {m.type}
                            </span>
                          </td>
                          <td className="py-2 text-center font-bold text-[#0E0606]">
                            {m.type === 'ENTRADA' ? `+${m.quantity}` : `-${m.quantity}`}
                          </td>
                          <td className="py-2 text-center text-[#7A5B67]">
                            {m.previousStock} ➔ <strong className="text-[#0E0606]">{m.newStock}</strong>
                          </td>
                          <td className="py-2 text-[#7A5B67] truncate max-w-xs">{m.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
