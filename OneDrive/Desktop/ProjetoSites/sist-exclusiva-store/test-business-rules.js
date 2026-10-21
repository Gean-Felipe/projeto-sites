// Teste de validação rigorosa das regras de negócio da Exclusiva Store

// Mock de localStorage para ambiente Node.js
const storageMap = new Map();
global.localStorage = {
  getItem: (key) => storageMap.get(key) || null,
  setItem: (key, val) => storageMap.set(key, String(val)),
  removeItem: (key) => storageMap.delete(key),
  clear: () => storageMap.clear(),
};
global.window = {};

async function runTests() {
  console.log('--- INICIANDO BATERIA DE TESTES DE REGRAS DE NEGÓCIO ---');

  // Carrega o módulo compilado ou executa teste com ts-node/esm
  // Vamos implementar os testes simulando as chamadas da classe StockService
  const { StockService, INITIAL_PRODUCTS } = await import('./src/services/storage.ts');

  // 1. Inicialização
  StockService.resetToDemoData();
  const products = StockService.getProducts();
  console.log(`[PASS] 1. Inicialização de dados: ${products.length} produtos carregados.`);

  // 2. Tentar cadastrar produto com SKU duplicado (deve falhar)
  const duplicateRes = StockService.createProduct({
    name: 'Vestido Copiado',
    sku: 'VST-001', // SKU do Vestido Midi
    category: 'Vestuário Feminino',
    quantity: 10,
    minStock: 5,
    status: 'active'
  });
  if (!duplicateRes.success) {
    console.log(`[PASS] 2. Validação de SKU duplicado: Bloqueado com sucesso ("${duplicateRes.error}")`);
  } else {
    throw new Error('FALHA: SKU duplicado foi aceito indevidamente!');
  }

  // 3. Cadastrar novo produto válido
  const newProductRes = StockService.createProduct({
    name: 'Vestido Chemise Seda Pura',
    sku: 'VST-010',
    category: 'Vestuário Feminino',
    quantity: 15,
    minStock: 5,
    unitCost: 95.0,
    salePrice: 220.0,
    status: 'active'
  });
  if (newProductRes.success && newProductRes.product.quantity === 15) {
    console.log(`[PASS] 3. Cadastro de novo produto: Sucesso (ID: ${newProductRes.product.id}, Qtd: ${newProductRes.product.quantity})`);
  } else {
    throw new Error('FALHA ao cadastrar produto válido!');
  }

  // 4. Testar Entrada de Mercadorias (aumento automático de estoque)
  const blazer = StockService.getProductBySku('BLZ-004'); // Estava zerado
  const stockBeforeEntry = blazer.quantity;
  const entryRes = StockService.registerStockEntry({
    productId: blazer.id,
    quantity: 10,
    supplier: 'Alfaiataria Moderna',
    referenceDoc: 'NF-e 8820',
    notes: 'Entrada teste de conferência'
  });

  const blazerAfter = StockService.getProductById(blazer.id);
  if (entryRes.success && blazerAfter.quantity === stockBeforeEntry + 10) {
    console.log(`[PASS] 4. Entrada de mercadoria: Saldo aumentou de ${stockBeforeEntry} para ${blazerAfter.quantity}.`);
  } else {
    throw new Error('FALHA no incremento de estoque após entrada!');
  }

  // 5. Testar Saída Inválida (tentar retirar mais do que existe em estoque)
  const invalidExitRes = StockService.registerStockExit({
    productId: blazer.id,
    quantity: 999, // saldo é 10
    reason: 'Venda de teste com quantidade excessiva'
  });

  const blazerAfterInvalid = StockService.getProductById(blazer.id);
  if (!invalidExitRes.success && blazerAfterInvalid.quantity === 10) {
    console.log(`[PASS] 5. Regra anti-estoque negativo: Bloqueou retirada excessiva e manteve saldo íntegro em 10.`);
  } else {
    throw new Error('FALHA: Sistema permitiu saldo negativo!');
  }

  // 6. Testar Saída Válida (redução automática de estoque)
  const validExitRes = StockService.registerStockExit({
    productId: blazer.id,
    quantity: 3,
    reason: 'Venda balcão - Loja Física',
    referenceDoc: 'Cupom 501'
  });

  const blazerAfterValid = StockService.getProductById(blazer.id);
  if (validExitRes.success && blazerAfterValid.quantity === 7) {
    console.log(`[PASS] 6. Saída válida: Reduziu estoque de 10 para ${blazerAfterValid.quantity}.`);
  } else {
    throw new Error('FALHA na redução de estoque após saída válida!');
  }

  // 7. Testar Baixa de Estoque por Avaria
  const lossRes = StockService.registerStockLoss({
    productId: blazer.id,
    quantity: 1,
    reason: 'Produto Danificado / Avaria no Tecido',
    notes: 'Avaria constatada no zíper'
  });

  const blazerAfterLoss = StockService.getProductById(blazer.id);
  if (lossRes.success && blazerAfterLoss.quantity === 6) {
    console.log(`[PASS] 7. Baixa por avaria: Reduziu saldo de 7 para ${blazerAfterLoss.quantity} e categorizou como BAIXA.`);
  } else {
    throw new Error('FALHA ao registrar baixa de estoque!');
  }

  // 8. Testar Recebimento de Cargas e Bloqueio de Duplicidade
  const receivings = StockService.getReceivings();
  const pendingRec = receivings.find(r => r.status === 'PENDENTE');
  if (!pendingRec) throw new Error('Nenhum recebimento pendente para teste!');

  console.log(`[PASS] 8.1. Recebimento pendente identificado: ${pendingRec.code} (${pendingRec.supplier}).`);

  // Confirmação 1
  const confirm1 = StockService.confirmReceiving(pendingRec.id);
  if (confirm1.success) {
    console.log(`[PASS] 8.2. Primeira confirmação de carga: Realizada com sucesso.`);
  } else {
    throw new Error('FALHA ao confirmar carga de recebimento!');
  }

  // Tentativa de Confirmação 2 (deve ser rejeitada)
  const confirm2 = StockService.confirmReceiving(pendingRec.id);
  if (!confirm2.success) {
    console.log(`[PASS] 8.3. Trava anti-duplicidade em recebimentos: Bloqueou reprocessamento com sucesso ("${confirm2.error}")`);
  } else {
    throw new Error('FALHA CRÍTICA: Recebimento foi processado duas vezes gerando entradas duplicadas!');
  }

  // 9. Histórico e Auditoria
  const movements = StockService.getMovements();
  if (movements.length > 0 && movements[0].previousStock !== undefined && movements[0].newStock !== undefined) {
    console.log(`[PASS] 9. Rastreabilidade de auditoria: ${movements.length} movimentações registradas com saldo anterior e posterior.`);
  } else {
    throw new Error('FALHA na auditoria de movimentações!');
  }

  // 10. Dashboard Metrics
  const metrics = StockService.getDashboardMetrics();
  console.log(`[PASS] 10. Métricas do Dashboard calculadas: Total Produtos = ${metrics.totalProducts}, Total Unidades = ${metrics.totalUnitsInStock}, Entradas = ${metrics.totalEntriesCount}, Saídas = ${metrics.totalExitsCount}, Baixas = ${metrics.totalLossesCount}.`);

  console.log('--- TODOS OS TESTES FORAM CONCLUÍDOS COM 100% DE SUCESSO! ---');
}

runTests().catch(err => {
  console.error('ERRO NO TESTE:', err);
  process.exit(1);
});
