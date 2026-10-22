import type { Product, Movement, Receiving, DashboardMetrics } from '../types/index.ts';

const STORAGE_KEYS = {
  PRODUCTS: 'exclusiva_products_v1',
  MOVEMENTS: 'exclusiva_movements_v1',
  RECEIVINGS: 'exclusiva_receivings_v1',
  VERSION: 'exclusiva_version_v1',
};

// Dados demonstrativos realistas e consistentes para a Exclusiva Store
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Vestido Midi Linho Elegance',
    sku: 'VST-001',
    category: 'Vestuário Feminino',
    description: 'Vestido midi em linho puro com faixa ajustável na cintura e acabamento refinado.',
    quantity: 35,
    minStock: 10,
    unitCost: 89.90,
    salePrice: 189.90,
    status: 'active',
    createdAt: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-18T14:30:00Z',
  },
  {
    id: 'prod-002',
    name: 'Camisa Slim Algodão Egípcio',
    sku: 'CMS-002',
    category: 'Camisaria',
    description: 'Camisa social masculina slim fit, tecido 100% algodão fio nobre com caimento perfeito.',
    quantity: 22,
    minStock: 8,
    unitCost: 65.00,
    salePrice: 149.90,
    status: 'active',
    createdAt: '2026-10-02T11:00:00Z',
    updatedAt: '2026-10-19T09:15:00Z',
  },
  {
    id: 'prod-003',
    name: 'Calça Jeans Skinny Alta Premium',
    sku: 'JNS-003',
    category: 'Jeans & Denim',
    description: 'Jeans com elastano de alta compressão, lavagem média escovada e costura reforçada.',
    quantity: 3,
    minStock: 8,
    unitCost: 80.00,
    salePrice: 179.90,
    status: 'active',
    createdAt: '2026-10-03T09:30:00Z',
    updatedAt: '2026-10-20T16:45:00Z',
  },
  {
    id: 'prod-004',
    name: 'Blazer Alfaiataria Tweed Classic',
    sku: 'BLZ-004',
    category: 'Alfaiataria',
    description: 'Blazer estruturado feminino com forro acetinado e botões resinados dourados.',
    quantity: 0,
    minStock: 5,
    unitCost: 140.00,
    salePrice: 299.90,
    status: 'active',
    createdAt: '2026-10-04T15:00:00Z',
    updatedAt: '2026-10-21T11:20:00Z',
  },
  {
    id: 'prod-005',
    name: 'Bolsa Transversal Couro Sintético',
    sku: 'BLS-005',
    category: 'Bolsas & Acessórios',
    description: 'Bolsa compacta moderna com alça de corrente metálica e divisórias internas.',
    quantity: 14,
    minStock: 5,
    unitCost: 75.00,
    salePrice: 169.00,
    status: 'active',
    createdAt: '2026-10-05T14:10:00Z',
    updatedAt: '2026-10-18T10:00:00Z',
  },
  {
    id: 'prod-006',
    name: 'Cinto Couro Fivela Dourada',
    sku: 'CNT-006',
    category: 'Bolsas & Acessórios',
    description: 'Cinto confeccionado em couro legítimo com fivela circular banhada em verniz italiano.',
    quantity: 2,
    minStock: 6,
    unitCost: 25.00,
    salePrice: 59.90,
    status: 'active',
    createdAt: '2026-10-06T13:00:00Z',
    updatedAt: '2026-10-20T18:10:00Z',
  },
  {
    id: 'prod-007',
    name: 'Macacão Pantalona Seda Chic',
    sku: 'MCK-007',
    category: 'Vestuário Feminino',
    description: 'Macacão longo fluído com decote transpassado e bolsos laterais alfaiataria.',
    quantity: 18,
    minStock: 6,
    unitCost: 110.00,
    salePrice: 239.90,
    status: 'active',
    createdAt: '2026-10-07T16:20:00Z',
    updatedAt: '2026-10-19T17:00:00Z',
  },
  {
    id: 'prod-008',
    name: 'Sandália Salto Bloco Tiras',
    sku: 'SND-008',
    category: 'Calçados',
    description: 'Sandália confortável com palmilha acolchoada e salto bloco 6cm para eventos e rotina.',
    quantity: 12,
    minStock: 4,
    unitCost: 70.00,
    salePrice: 159.90,
    status: 'active',
    createdAt: '2026-10-08T09:40:00Z',
    updatedAt: '2026-10-17T11:30:00Z',
  },
];

export const INITIAL_MOVEMENTS: Movement[] = [
  {
    id: 'mov-001',
    timestamp: '2026-10-15T09:30:00Z',
    productId: 'prod-001',
    productName: 'Vestido Midi Linho Elegance',
    productSku: 'VST-001',
    type: 'ENTRADA',
    quantity: 40,
    previousStock: 0,
    newStock: 40,
    reason: 'Compra de Estoque Primavera/Verão',
    referenceDoc: 'NF-e 45210',
    supplier: 'Confecções Bella Donna Ltda',
    notes: 'Lote recebido com etiqueta e lacre',
  },
  {
    id: 'mov-002',
    timestamp: '2026-10-16T14:15:00Z',
    productId: 'prod-001',
    productName: 'Vestido Midi Linho Elegance',
    productSku: 'VST-001',
    type: 'SAIDA',
    quantity: 5,
    previousStock: 40,
    newStock: 35,
    reason: 'Venda balcão - Loja Física',
    referenceDoc: 'Cupom Fiscal 10892',
    notes: 'Vendas registradas no turno da tarde',
  },
  {
    id: 'mov-003',
    timestamp: '2026-10-17T11:00:00Z',
    productId: 'prod-003',
    productName: 'Calça Jeans Skinny Alta Premium',
    productSku: 'JNS-003',
    type: 'ENTRADA',
    quantity: 15,
    previousStock: 0,
    newStock: 15,
    reason: 'Reposição Semanal',
    referenceDoc: 'NF-e 8812',
    supplier: 'Denim Brasil Indústria Têxtil',
  },
  {
    id: 'mov-004',
    timestamp: '2026-10-18T16:40:00Z',
    productId: 'prod-003',
    productName: 'Calça Jeans Skinny Alta Premium',
    productSku: 'JNS-003',
    type: 'SAIDA',
    quantity: 11,
    previousStock: 15,
    newStock: 4,
    reason: 'Venda online / WhatsApp',
    referenceDoc: 'Pedidos #401 ao #411',
  },
  {
    id: 'mov-005',
    timestamp: '2026-10-19T10:20:00Z',
    productId: 'prod-003',
    productName: 'Calça Jeans Skinny Alta Premium',
    productSku: 'JNS-003',
    type: 'BAIXA',
    quantity: 1,
    previousStock: 4,
    newStock: 3,
    reason: 'Avaria no zíper e tecido desfiado no mostruário',
    referenceDoc: 'Laudo Interno #04',
    notes: 'Item descartado para garantia junto ao fornecedor',
  },
  {
    id: 'mov-006',
    timestamp: '2026-10-20T17:00:00Z',
    productId: 'prod-004',
    productName: 'Blazer Alfaiataria Tweed Classic',
    productSku: 'BLZ-004',
    type: 'SAIDA',
    quantity: 6,
    previousStock: 6,
    newStock: 0,
    reason: 'Venda balcão - Queima de coleção',
    referenceDoc: 'Cupom Fiscal 11045',
    notes: 'Produto esgotado em estoque físico',
  },
];

export const INITIAL_RECEIVINGS: Receiving[] = [
  {
    id: 'rec-001',
    code: 'REC-2026-001',
    date: '2026-10-15',
    supplier: 'Confecções Bella Donna Ltda',
    referenceDoc: 'NF-e 45210',
    notes: 'Carga entregue pela transportadora Express Cargo.',
    status: 'CONFIRMADO',
    createdAt: '2026-10-15T08:00:00Z',
    confirmedAt: '2026-10-15T09:30:00Z',
    items: [
      {
        productId: 'prod-001',
        productName: 'Vestido Midi Linho Elegance',
        productSku: 'VST-001',
        quantity: 40,
        unitCost: 89.90,
      },
    ],
  },
  {
    id: 'rec-002',
    code: 'REC-2026-002',
    date: '2026-10-21',
    supplier: 'Alfaiataria Moderna & Cia',
    referenceDoc: 'NF-e 91024',
    notes: 'Remessa de reposição urgente de Blazers e Cintos. Aguardando conferência física de lacre e etiquetas.',
    status: 'PENDENTE',
    createdAt: '2026-10-21T08:30:00Z',
    items: [
      {
        productId: 'prod-004',
        productName: 'Blazer Alfaiataria Tweed Classic',
        productSku: 'BLZ-004',
        quantity: 15,
        unitCost: 140.00,
      },
      {
        productId: 'prod-006',
        productName: 'Cinto Couro Fivela Dourada',
        productSku: 'CNT-006',
        quantity: 20,
        unitCost: 25.00,
      },
    ],
  },
];

// Funções de manipulação e persistência segura no Storage
export class StockService {
  private static initStorage(): void {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MOVEMENTS)) {
      localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(INITIAL_MOVEMENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RECEIVINGS)) {
      localStorage.setItem(STORAGE_KEYS.RECEIVINGS, JSON.stringify(INITIAL_RECEIVINGS));
    }
  }

  // --- PRODUTOS ---
  public static getProducts(): Product[] {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return data ? JSON.parse(data) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  }

  public static getProductById(id: string): Product | undefined {
    return this.getProducts().find(p => p.id === id);
  }

  public static getProductBySku(sku: string): Product | undefined {
    return this.getProducts().find(p => p.sku.trim().toUpperCase() === sku.trim().toUpperCase());
  }

  public static createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): { success: boolean; product?: Product; error?: string } {
    const products = this.getProducts();

    // Validação de unicidade do SKU / Código
    const existingSku = products.find(
      p => p.sku.trim().toUpperCase() === productData.sku.trim().toUpperCase()
    );

    if (existingSku) {
      return {
        success: false,
        error: `O código SKU "${productData.sku}" já está cadastrado no produto "${existingSku.name}". Não é permitido duplicar códigos.`,
      };
    }

    if (productData.quantity < 0) {
      return { success: false, error: 'A quantidade inicial não pode ser negativa.' };
    }

    if (productData.minStock < 0) {
      return { success: false, error: 'O estoque mínimo não pode ser negativo.' };
    }

    const now = new Date().toISOString();
    const newProduct: Product = {
      ...productData,
      id: 'prod-' + Date.now(),
      createdAt: now,
      updatedAt: now,
    };

    products.unshift(newProduct);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

    // Se começou com estoque > 0, registra a entrada inicial no histórico
    if (newProduct.quantity > 0) {
      this.recordInternalMovement({
        productId: newProduct.id,
        productName: newProduct.name,
        productSku: newProduct.sku,
        type: 'ENTRADA',
        quantity: newProduct.quantity,
        previousStock: 0,
        newStock: newProduct.quantity,
        reason: 'Cadastro Inicial de Produto',
        notes: 'Estoque inicial lançado no momento do cadastro',
      });
    }

    return { success: true, product: newProduct };
  }

  public static updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): { success: boolean; product?: Product; error?: string } {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return { success: false, error: 'Produto não encontrado.' };
    }

    // Se estiver alterando o SKU, validar se outro produto já possui
    if (updates.sku) {
      const existingSku = products.find(
        p => p.id !== id && p.sku.trim().toUpperCase() === updates.sku!.trim().toUpperCase()
      );
      if (existingSku) {
        return {
          success: false,
          error: `O código SKU "${updates.sku}" já pertence a outro produto cadastrado.`,
        };
      }
    }

    const updated: Product = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    products[index] = updated;
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    return { success: true, product: updated };
  }

  // --- MOVIMENTAÇÕES ---
  public static getMovements(): Movement[] {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MOVEMENTS);
      const list: Movement[] = data ? JSON.parse(data) : INITIAL_MOVEMENTS;
      // Ordenar por data decrescente
      return list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch {
      return INITIAL_MOVEMENTS;
    }
  }

  private static recordInternalMovement(movementData: Omit<Movement, 'id' | 'timestamp'>): Movement {
    const movements = this.getMovements();
    const newMovement: Movement = {
      ...movementData,
      id: 'mov-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
    };
    movements.unshift(newMovement);
    localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(movements));
    return newMovement;
  }

  // Operação 1: Registrar Entrada
  public static registerStockEntry(params: {
    productId: string;
    quantity: number;
    supplier?: string;
    referenceDoc?: string;
    notes?: string;
    date?: string;
  }): { success: boolean; movement?: Movement; error?: string } {
    if (!params.productId) return { success: false, error: 'Selecione um produto.' };
    if (!params.quantity || params.quantity <= 0) {
      return { success: false, error: 'A quantidade de entrada deve ser maior que zero.' };
    }

    const products = this.getProducts();
    const product = products.find(p => p.id === params.productId);

    if (!product) {
      return { success: false, error: 'Produto não encontrado.' };
    }

    if (product.status === 'inactive') {
      return {
        success: false,
        error: 'Este produto está inativo. Ative o produto antes de realizar novas entradas.',
      };
    }

    const previousStock = product.quantity;
    const newStock = previousStock + Number(params.quantity);

    // Atualiza produto
    product.quantity = newStock;
    product.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

    // Registra histórico
    const movement = this.recordInternalMovement({
      productId: product.id,
      productName: product.name,
      productSku: product.sku,
      type: 'ENTRADA',
      quantity: Number(params.quantity),
      previousStock,
      newStock,
      reason: 'Entrada avulsa de mercadorias',
      supplier: params.supplier?.trim() || undefined,
      referenceDoc: params.referenceDoc?.trim() || undefined,
      notes: params.notes?.trim() || undefined,
    });

    return { success: true, movement };
  }

  // Operação 2: Registrar Saída (com regra estrita contra saldo negativo)
  public static registerStockExit(params: {
    productId: string;
    quantity: number;
    reason: string;
    referenceDoc?: string;
    notes?: string;
    date?: string;
  }): { success: boolean; movement?: Movement; error?: string } {
    if (!params.productId) return { success: false, error: 'Selecione um produto.' };
    if (!params.quantity || params.quantity <= 0) {
      return { success: false, error: 'A quantidade de saída deve ser maior que zero.' };
    }
    if (!params.reason || !params.reason.trim()) {
      return { success: false, error: 'Informe o motivo da saída.' };
    }

    const products = this.getProducts();
    const product = products.find(p => p.id === params.productId);

    if (!product) {
      return { success: false, error: 'Produto não encontrado.' };
    }

    if (product.status === 'inactive') {
      return {
        success: false,
        error: 'Este produto está inativo e não pode receber saídas de estoque.',
      };
    }

    const qty = Number(params.quantity);
    if (qty > product.quantity) {
      return {
        success: false,
        error: `Saldo insuficiente! Você tentou retirar ${qty} unidade(s), mas o produto "${product.name}" possui apenas ${product.quantity} unidade(s) disponível(is) em estoque. Operação cancelada.`,
      };
    }

    const previousStock = product.quantity;
    const newStock = previousStock - qty;

    product.quantity = newStock;
    product.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

    const movement = this.recordInternalMovement({
      productId: product.id,
      productName: product.name,
      productSku: product.sku,
      type: 'SAIDA',
      quantity: qty,
      previousStock,
      newStock,
      reason: params.reason.trim(),
      referenceDoc: params.referenceDoc?.trim() || undefined,
      notes: params.notes?.trim() || undefined,
    });

    return { success: true, movement };
  }

  // Operação 3: Registrar Baixa (avaria, perda, vencimento, ajuste de inventário)
  public static registerStockLoss(params: {
    productId: string;
    quantity: number;
    reason: string;
    referenceDoc?: string;
    notes?: string;
    date?: string;
  }): { success: boolean; movement?: Movement; error?: string } {
    if (!params.productId) return { success: false, error: 'Selecione um produto.' };
    if (!params.quantity || params.quantity <= 0) {
      return { success: false, error: 'A quantidade da baixa deve ser maior que zero.' };
    }
    if (!params.reason || !params.reason.trim()) {
      return { success: false, error: 'Informe a justificativa ou motivo da baixa de estoque.' };
    }

    const products = this.getProducts();
    const product = products.find(p => p.id === params.productId);

    if (!product) {
      return { success: false, error: 'Produto não encontrado.' };
    }

    const qty = Number(params.quantity);
    if (qty > product.quantity) {
      return {
        success: false,
        error: `Não é possível realizar a baixa de ${qty} unidade(s). O estoque atual de "${product.name}" é de apenas ${product.quantity} unidade(s). O sistema não permite saldo negativo.`,
      };
    }

    const previousStock = product.quantity;
    const newStock = previousStock - qty;

    product.quantity = newStock;
    product.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

    const movement = this.recordInternalMovement({
      productId: product.id,
      productName: product.name,
      productSku: product.sku,
      type: 'BAIXA',
      quantity: qty,
      previousStock,
      newStock,
      reason: params.reason.trim(),
      referenceDoc: params.referenceDoc?.trim() || undefined,
      notes: params.notes?.trim() || undefined,
    });

    return { success: true, movement };
  }

  // --- RECEBIMENTOS DE MERCADORIAS (LOTE/CARGA COM CONFERÊNCIA) ---
  public static getReceivings(): Receiving[] {
    this.initStorage();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECEIVINGS);
      const list: Receiving[] = data ? JSON.parse(data) : INITIAL_RECEIVINGS;
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch {
      return INITIAL_RECEIVINGS;
    }
  }

  public static createReceiving(params: {
    supplier: string;
    date: string;
    referenceDoc?: string;
    notes?: string;
    items: { productId: string; quantity: number; unitCost?: number }[];
  }): { success: boolean; receiving?: Receiving; error?: string } {
    if (!params.supplier || !params.supplier.trim()) {
      return { success: false, error: 'Informe o fornecedor do recebimento.' };
    }
    if (!params.items || params.items.length === 0) {
      return { success: false, error: 'Adicione pelo menos um produto ao recebimento.' };
    }

    const products = this.getProducts();
    const receivingItems: Receiving['items'] = [];

    for (const item of params.items) {
      if (item.quantity <= 0) {
        return { success: false, error: 'A quantidade de cada produto deve ser maior que zero.' };
      }
      const prod = products.find(p => p.id === item.productId);
      if (!prod) {
        return { success: false, error: `Produto ID ${item.productId} não encontrado.` };
      }
      receivingItems.push({
        productId: prod.id,
        productName: prod.name,
        productSku: prod.sku,
        quantity: Number(item.quantity),
        unitCost: item.unitCost || prod.unitCost,
      });
    }

    const receivings = this.getReceivings();
    const code = `REC-${new Date().getFullYear()}-${String(receivings.length + 1).padStart(3, '0')}`;

    const newReceiving: Receiving = {
      id: 'rec-' + Date.now(),
      code,
      date: params.date || new Date().toISOString().split('T')[0],
      supplier: params.supplier.trim(),
      referenceDoc: params.referenceDoc?.trim() || undefined,
      notes: params.notes?.trim() || undefined,
      status: 'PENDENTE', // Começa pendente, NÃO altera o estoque ainda
      items: receivingItems,
      createdAt: new Date().toISOString(),
    };

    receivings.unshift(newReceiving);
    localStorage.setItem(STORAGE_KEYS.RECEIVINGS, JSON.stringify(receivings));

    return { success: true, receiving: newReceiving };
  }

  // Confirmação atômica e proteção contra duplicidade
  public static confirmReceiving(receivingId: string): {
    success: boolean;
    error?: string;
    updatedCount?: number;
  } {
    const receivings = this.getReceivings();
    const receivingIndex = receivings.findIndex(r => r.id === receivingId);

    if (receivingIndex === -1) {
      return { success: false, error: 'Recebimento de mercadoria não localizado.' };
    }

    const receiving = receivings[receivingIndex];

    // Regra mandatória: se já foi confirmado, impede duplicidade de entrada!
    if (receiving.status === 'CONFIRMADO') {
      return {
        success: false,
        error: `O recebimento ${receiving.code} já foi confirmado e integrado ao estoque em ${new Date(receiving.confirmedAt || '').toLocaleString('pt-BR')}. Não é permitido processar novamente.`,
      };
    }

    if (receiving.status === 'CANCELADO') {
      return {
        success: false,
        error: `O recebimento ${receiving.code} foi cancelado e não pode ser integrado.`,
      };
    }

    const products = this.getProducts();
    const now = new Date().toISOString();

    // Processa a entrada de cada produto no estoque
    for (const item of receiving.items) {
      const prodIndex = products.findIndex(p => p.id === item.productId);
      if (prodIndex !== -1) {
        const prod = products[prodIndex];
        const prevStock = prod.quantity;
        const newStock = prevStock + Number(item.quantity);

        // Atualiza estoque
        prod.quantity = newStock;
        if (item.unitCost) prod.unitCost = item.unitCost;
        prod.updatedAt = now;

        // Registra movimentação de auditoria
        this.recordInternalMovement({
          productId: prod.id,
          productName: prod.name,
          productSku: prod.sku,
          type: 'ENTRADA',
          quantity: item.quantity,
          previousStock: prevStock,
          newStock: newStock,
          reason: `Recebimento de Mercadorias (${receiving.code})`,
          referenceDoc: receiving.referenceDoc,
          supplier: receiving.supplier,
          batchReceivingId: receiving.id,
          notes: receiving.notes ? `Recebimento confirmado: ${receiving.notes}` : 'Entrada via conferência de carga',
        });
      }
    }

    // Atualiza status do recebimento para CONFIRMADO
    receiving.status = 'CONFIRMADO';
    receiving.confirmedAt = now;
    receivings[receivingIndex] = receiving;

    // Salva ambas as listas
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    localStorage.setItem(STORAGE_KEYS.RECEIVINGS, JSON.stringify(receivings));

    return { success: true, updatedCount: receiving.items.length };
  }

  // --- DASHBOARD METRICS ---
  public static getDashboardMetrics(): DashboardMetrics {
    const products = this.getProducts();
    const movements = this.getMovements();

    let totalUnitsInStock = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    let totalCostValue = 0;
    let totalSaleValue = 0;

    for (const p of products) {
      totalUnitsInStock += p.quantity;
      if (p.quantity === 0) {
        outOfStockCount++;
      } else if (p.quantity <= p.minStock) {
        lowStockCount++;
      }

      if (p.unitCost) totalCostValue += p.quantity * p.unitCost;
      if (p.salePrice) totalSaleValue += p.quantity * p.salePrice;
    }

    let totalEntriesCount = 0;
    let totalEntriesUnits = 0;
    let totalExitsCount = 0;
    let totalExitsUnits = 0;
    let totalLossesCount = 0;
    let totalLossesUnits = 0;

    for (const m of movements) {
      if (m.type === 'ENTRADA') {
        totalEntriesCount++;
        totalEntriesUnits += m.quantity;
      } else if (m.type === 'SAIDA') {
        totalExitsCount++;
        totalExitsUnits += m.quantity;
      } else if (m.type === 'BAIXA') {
        totalLossesCount++;
        totalLossesUnits += m.quantity;
      }
    }

    return {
      totalProducts: products.length,
      totalUnitsInStock,
      lowStockCount,
      outOfStockCount,
      totalEntriesCount,
      totalEntriesUnits,
      totalExitsCount,
      totalExitsUnits,
      totalLossesCount,
      totalLossesUnits,
      totalCostValue,
      totalSaleValue,
    };
  }

  // Reset para demonstração
  public static resetToDemoData(): void {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(INITIAL_MOVEMENTS));
    localStorage.setItem(STORAGE_KEYS.RECEIVINGS, JSON.stringify(INITIAL_RECEIVINGS));
  }
}
