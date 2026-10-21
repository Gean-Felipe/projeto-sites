export type ProductStatus = 'active' | 'inactive';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  description?: string;
  quantity: number;
  minStock: number;
  unitCost?: number;
  salePrice?: number;
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export type MovementType = 'ENTRADA' | 'SAIDA' | 'BAIXA';

export interface Movement {
  id: string;
  timestamp: string;
  productId: string;
  productName: string;
  productSku: string;
  type: MovementType;
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  referenceDoc?: string;
  supplier?: string;
  notes?: string;
  batchReceivingId?: string;
}

export type ReceivingStatus = 'PENDENTE' | 'CONFIRMADO' | 'CANCELADO';

export interface ReceivingItem {
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitCost?: number;
}

export interface Receiving {
  id: string;
  code: string;
  date: string;
  supplier: string;
  referenceDoc?: string;
  notes?: string;
  status: ReceivingStatus;
  items: ReceivingItem[];
  createdAt: string;
  confirmedAt?: string;
}

export interface DashboardMetrics {
  totalProducts: number;
  totalUnitsInStock: number;
  lowStockCount: number;
  outOfStockCount: number;
  totalEntriesCount: number;
  totalEntriesUnits: number;
  totalExitsCount: number;
  totalExitsUnits: number;
  totalLossesCount: number;
  totalLossesUnits: number;
  totalCostValue: number;
  totalSaleValue: number;
}

export type ActivePage = 
  | 'dashboard'
  | 'products'
  | 'entries'
  | 'exits'
  | 'losses'
  | 'receivings'
  | 'movements'
  | 'stock-alerts';

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
}
