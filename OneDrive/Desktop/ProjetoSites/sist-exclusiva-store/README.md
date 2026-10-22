# 🛍️ Exclusiva Store — Sistema de Controle de Mercadorias & Gestão

Sistema web moderno, rápido e intuitivo desenvolvido sob medida para a rotina comercial da **Exclusiva Store**. O sistema centraliza o controle de estoque físico, operações diárias de entrada e saída, auditoria de movimentações e inteligência de gestão financeira.

* **Link em Produção (Vercel):** [https://sist-exclusiva-store.vercel.app](https://sist-exclusiva-store.vercel.app)
* **Repositório Git:** [https://github.com/Gean-Felipe/projeto-sites](https://github.com/Gean-Felipe/projeto-sites)

---

## 🎯 Objetivo do Sistema

Eliminar planilhas manuais e o risco de erros de estoque na rotina da loja. Com o sistema, qualquer atendente ou gestor consegue responder em poucos segundos:
1. **Quais produtos existem no catálogo da loja?**
2. **Quantas unidades estão disponíveis no momento para venda?**
3. **Quais peças precisam de reposição urgente antes de esgotar?**
4. **Quanto dinheiro a loja tem investido em mercadorias a preço de custo?**
5. **Qual é o faturamento potencial caso todo o estoque atual seja vendido?**

---

## 🧭 Organização e Telas do Sistema

O menu lateral esquerdo foi desenhado para seguir o fluxo real de trabalho da loja:

```
├── 📦 Produtos                (Catálogo, preços e cadastro)
├── 📥 Estoque & Operações     (Entradas, saídas, baixas e recebimento de notas)
├── 🕒 Movimentações           (Histórico auditado e relatórios CSV)
└── 📊 Dashboard de Gestão     (Métricas financeiras, margem e indicadores executivos)
```

---

### 1. 📦 Tela de Produtos
É o coração do catálogo da loja.
* **Cadastro Rápido de Mercadorias:** Permite cadastrar nome, código SKU (referência única), categoria, preço de custo, preço de venda, estoque mínimo de segurança e quantidade inicial.
* **Filtros e Busca em Tempo Real:** Pesquisa instantânea por nome, SKU ou filtro de categorias (Vestidos, Conjuntos, Alfaiataria, Calçados, Acessórios, etc.).
* **Ações Rápidas por Item:** Botões diretos para dar entrada, registrar saída ou lançar avaria em um produto específico com 1 clique.
* **Edição e Detalhes:** Visualização completa da ficha técnica do produto e edição de valores e parâmetros.

---

### 2. 📥 Tela de Estoque & Operações
Área onde são feitas as atualizações diárias de saldo físico da loja:

* **➕ Registrar Entrada:**
  * Usado quando chegam novas peças de reposição de fornecedores ou transferências.
  * Solicita o produto, quantidade, motivo, documento de referência (ex: número da nota) e fornecedor.
* **➖ Registrar Saída:**
  * Usado para vendas no balcão da loja ou saídas autorizadas.
  * **Proteção ativa:** O sistema impede saídas que deixariam o estoque negativo.
* **⚠️ Baixa por Avaria / Defeito:**
  * Usado quando uma peça sofre dano, mancha ou defeito de fábrica e precisa ser retirada da arara.
  * Fica contabilizada separadamente das vendas para não distorcer o faturamento real da loja.
* **📋 Recebimento de Lotes de Fornecedores:**
  * Permite cadastrar uma remessa inteira de fornecedor com múltiplos produtos em conferência (status `PENDENTE`).
  * Ao clicar em **"Confirmar Recebimento"**, todas as quantidades entram no estoque de uma só vez, com trava anti-duplicidade para evitar bipar a mesma nota duas vezes.

---

### 3. 🕒 Tela de Movimentações (Auditoria Completa)
Cada peça que entra ou sai da loja fica registrada para sempre, sem possibilidade de sumir do histórico:
* **Rastreabilidade Total:** Grava data/hora exata, tipo (`ENTRADA`, `SAIDA`, `BAIXA`), quantidade movimentada, motivo e os saldos: **Saldo Anterior ➔ Saldo Atual**.
* **Filtros Inteligentes:** Filtre por período (de data até data), por tipo de operação ou por produto específico.
* **Exportação CSV:** Botão para exportar o relatório de movimentações em planilha Excel/CSV para a contabilidade ou conferência fiscal.

---

### 4. 📊 Dashboard de Gestão Comercial
Localizado diretamente **abaixo de Movimentações no menu lateral esquerdo**, fornece uma visão executiva do negócio:
* **Capital Investido (Custo):** Total em Reais (`R$`) imobilizado nas mercadorias físicas guardadas na loja.
* **Faturamento Potencial (Venda):** Projeção de receita bruta se todo o estoque for vendido a preço de tabela.
* **Margem Bruta Estimada (%):** Percentual médio de ganho comercial do mix da loja.
* **Ticket Médio por Peça:** Custo médio e preço médio de venda praticado no catálogo.
* **Distribuição por Categoria:** Gráfico visual em barras mostrando quantas peças e quanto dinheiro está alocado em cada setor da loja.
* **Alerta de Rupturas:** Lista automática de produtos esgotados ou abaixo do estoque mínimo para direcionar novos pedidos aos fornecedores.
* **Widget em Tempo Real no Menu Esquerdo:** Exibe o resumo do estoque e do capital imobilizado visível a qualquer momento.

---

## 🔒 Regras de Negócio e Proteções do Sistema

1. **SKU Único e Inviolável:** O sistema não permite cadastrar dois produtos com o mesmo código SKU, garantindo integridade no estoque e nas etiquetas.
2. **Estoque Negativo Bloqueado:** Não é possível vender mais peças do que o saldo físico real disponível no sistema. Se tentar retirar mais, a operação é rejeitada com aviso claro.
3. **Trava Anti-Duplicidade de Recebimentos:** Lotes de fornecedores só podem ser confirmados uma única vez. Tentativas repetidas são bloqueadas.
4. **Saldo Histórico Imutável:** O histórico grava o saldo exato antes e depois de cada ação para garantir auditoria limpa contra divergências de balanço.

---

## 💾 Gerenciamento da Base de Dados

Os dados são salvos no armazenamento local do navegador (`LocalStorage`), funcionando perfeitamente sem necessidade de internet:

* **Base Zerada para Início Real:** O sistema já inicia 100% limpo para você cadastrar seus produtos reais.
* **Zerar Tudo ou Restaurar Demonstração:** No cabeçalho da página (ícone de engrenagem), você pode a qualquer momento:
  * **Zerar Base:** Limpa todas as informações para começar do zero.
  * **Restaurar Cenário Demo:** Carrega produtos de exemplo de moda feminina e movimentações para demonstração ou treinamento de equipe.

---

## 🛠️ Tecnologias Utilizadas

* **React 18** com **TypeScript** — Código fortemente tipado, confiável e livre de bugs em tempo de execução.
* **Vite** — Compilação e carregamento ultrarrápido.
* **Tailwind CSS** — Design system exclusivo, limpo, responsivo para celulares e computadores, com paleta neutra e moderna.
* **Lucide Icons** — Ícones modernos e consistentes.
* **Node.js Test Suite** — Bateria automatizada de testes cobrindo todas as 10 regras de negócio (`test-business-rules.js`).

---

## 🚀 Como Executar Localmente no seu Computador

Caso queira rodar o projeto localmente para desenvolvimento:

```bash
# 1. Entre na pasta do sistema
cd sist-exclusiva-store

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Para rodar a bateria de testes de regras de negócio:
node test-business-rules.js

# 5. Para gerar o build de produção:
npm run build
```

---

## 👩‍💼 Suporte e Manutenção

Desenvolvido para **Exclusiva Store** — Qualquer dúvida operacional ou necessidade de novas regras comerciais, consulte o histórico de alterações no repositório oficial da loja.
