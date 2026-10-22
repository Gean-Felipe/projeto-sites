# 📖 Manual de Operação e Uso — Exclusiva Store
### Guia Prático Passo a Passo para o Dia a Dia da Loja

Bem-vindo ao **Manual Oficial do Sistema de Gerenciamento da Exclusiva Store**.  
Este guia foi feito para você e sua equipe aprenderem a utilizar todas as funções do sistema em poucos minutos, sem complicações técnicas.

* **Acesso ao Sistema:** [https://sist-exclusiva-store.vercel.app](https://sist-exclusiva-store.vercel.app)
* **Compatibilidade:** Funciona em qualquer computador, notebook, tablet ou smartphone com navegador de internet.

---

## 📑 Sumário

1. [Primeiros Passos: Começando do Zero](#1-primeiros-passos-começando-do-zero)
2. [Como Cadastrar seus Produtos](#2-como-cadastrar-seus-produtos)
3. [Rotina Diária 1: Vendeu uma Peça no Balcão (Registrar Saída)](#3-rotina-diária-1-vendeu-uma-peça-no-balcão-registrar-saída)
4. [Rotina Diária 2: Chegaram Peças Novas de Fornecedor (Registrar Entrada)](#4-rotina-diária-2-chegaram-peças-novas-de-fornecedor-registrar-entrada)
5. [Rotina Diária 3: Peça Rasgada, Manchada ou com Defeito (Baixa por Avaria)](#5-rotina-diária-3-peça-rasgada-manchada-ou-com-defeito-baixa-por-avaria)
6. [Recebimento de Grandes Cargas com Nota Fiscal](#6-recebimento-de-grandes-cargas-com-nota-fiscal)
7. [Como Saber o que Precisa Repor (Alertas de Ruptura)](#7-como-saber-o-que-precisa-repor-alertas-de-ruptura)
8. [Histórico de Movimentações e Exportação para Excel (CSV)](#8-histórico-de-movimentações-e-exportação-para-excel-csv)
9. [Perguntas Frequentes & Resolução de Dúvidas](#9-perguntas-frequentes--resolução-de-dúvidas)

---

## 1. Primeiros Passos: Começando do Zero

Quando você acessa o sistema pela primeira vez, a base está **100% zerada e limpa** para que você cadastre apenas as mercadorias reais da sua loja.

> 💡 **Dica de ouro:** No topo da tela (menu superior), você tem acesso aos botões rápidos de ação:
> * **Registrar Entrada** (botão rosa em destaque)
> * **Registrar Saída**
> * **Baixa**
> * **Restaurar Demo** *(caso queira carregar produtos fictícios para treinar uma nova vendedora)*.

---

## 2. Como Cadastrar seus Produtos

Antes de vender ou dar entrada, a mercadoria precisa existir no catálogo:

1. No menu da esquerda, clique em **Produtos**.
2. Clique no botão rosa **"+ Cadastrar Produto"** no canto superior direito.
3. Preencha os campos da mercadoria:
   * **Nome do Produto:** Ex: `Vestido Midi Linho Cru` ou `Blazer Alfaiataria Tweed`.
   * **Código / SKU (Obrigatório):** O código de referência da peça (ex: `VST-01`, `BLZ-04`, `1024`). *Nota: o sistema não permite códigos repetidos.*
   * **Categoria:** Escolha a categoria correspondente (ex: *Vestidos, Calças, Alfaiataria, Blusas, Calçados, Acessórios*).
   * **Quantidade Inicial:** Quantas peças você já tem físicas na loja hoje.
   * **Estoque Mínimo de Segurança:** A quantidade mínima para o sistema te avisar quando estiver acabando (ex: `3` ou `5`).
   * **Preço de Custo (R$):** Quanto você pagou pela peça ao fornecedor.
   * **Preço de Venda (R$):** Preço da etiqueta na arara para a cliente.
4. Clique em **"Confirmar Cadastro"**. Pronto! A peça já aparece com estoque atualizado no catálogo.

---

## 3. Rotina Diária 1: Vendeu uma Peça no Balcão (Registrar Saída)

Sempre que uma cliente comprar uma peça na loja, dê a baixa no sistema para manter o saldo físico perfeito:

### Opção Rápida (Recomendada):
* No topo de qualquer tela, clique no botão **"Registrar Saída"**.

### Pela tela de Estoque:
1. No menu da esquerda, clique em **Estoque & Operações**.
2. Clique na aba **"Registrar Saída"**.
3. Selecione qual produto foi vendido na lista.
4. Digite a **Quantidade Vendida** (ex: `1` ou `2`).
5. No campo **Motivo**, selecione ou confirme: `Venda balcão loja`.
6. No painel ao lado, confira o **Saldo Resultante** (ex: `De 10 para 9 peças`).
7. Clique no botão rosa **"Confirmar Saída de Mercadoria"**.

> 🔒 **Trava de Segurança:** O sistema **nunca permite estoque negativo**. Se você tem 2 unidades e tentar dar saída de 3, o sistema avisará que o estoque é insuficiente e travará o botão para proteger o seu inventário.

---

## 4. Rotina Diária 2: Chegaram Peças Novas de Fornecedor (Registrar Entrada)

Quando o correio ou transportadora entrega reposição de peças:

1. Clique no botão rosa **"Registrar Entrada"** no cabeçalho ou vá em **Estoque & Operações > Registrar Entrada**.
2. Selecione o produto que chegou.
3. Digite a **Quantidade Recebida** (ex: `10` unidades).
4. *(Opcional)* Preencha o **Fornecedor** e o **Número da Nota/Documento**.
5. Clique no botão rosa **"Confirmar Entrada de Mercadoria"**.
6. O saldo do produto é somado imediatamente e uma movimentação oficial fica gravada no histórico.

---

## 5. Rotina Diária 3: Peça Rasgada, Manchada ou com Defeito (Baixa por Avaria)

Se uma peça foi provada e descosturou, manchou de maquiagem ou veio com defeito da fábrica, **NUNCA registre como saída comum**. Use a **Baixa de Mercadoria**:

1. Clique no botão **"Baixa"** no menu superior ou acesse **Estoque & Operações > Baixa de Mercadoria**.
2. Selecione a peça avariada.
3. Digite a quantidade descartada (geralmente `1`).
4. Selecione o motivo exato:
   * *Produto com defeito de fabricação*
   * *Avaria ou dano durante manuseio*
   * *Mancha permanente ou rasgo no tecido*
   * *Extravio de mercadoria*
5. Clique em **"Confirmar Baixa de Mercadoria"**.
6. A peça sai do estoque físico, mas fica classificada como **perda/avaria**, não distorcendo os números de vendas da sua loja.

---

## 6. Recebimento de Grandes Cargas com Nota Fiscal

Quando a loja recebe um pedido grande com várias referências diferentes na mesma nota fiscal:

1. Acesse **Estoque & Operações > Recebimento de Cargas**.
2. Clique em **"+ Novo Lote de Recebimento"**.
3. Digite o nome do fornecedor e o número da Nota Fiscal.
4. Adicione todos os produtos e quantidades que constam na nota.
5. Salve o recebimento como `PENDENTE`.
6. Na hora em que a equipe física conferir as caixas abertas e tudo bater com o romaneio, basta clicar no botão rosa **"Confirmar Carga"**.
7. Todas as peças entram no estoque juntas instantaneamente.
   * *Trava de proteção:* O sistema não permite confirmar a mesma carga duas vezes, evitando duplicidade de notas.

---

## 7. Como Saber o que Precisa Repor (Alertas de Ruptura)

Para nunca perder vendas por falta de mercadoria no fim de semana:

1. Na tela **Visão Geral** (tela inicial):
   * Olhe os 4 cards superiores: o card **"Estoque Baixo"** (amarelo) e **"Sem Estoque"** (vermelho).
   * No quadro **"Atenção ao Estoque"**, você vê a lista das peças que estão no limite.
2. Cada produto em alerta tem o botão **"Repor"**, que já abre a tela de entrada pré-preenchida com aquela peça para você registrar assim que chegar.
3. Você também pode acessar a aba **"Consulta & Alertas"** dentro de Estoque para ver o panorama geral de peças esgotadas.

---

## 8. Histórico de Movimentações e Exportação para Excel (CSV)

Toda e qualquer alteração de saldo gera uma trilha de auditoria:

1. No menu da esquerda, clique em **Movimentações**.
2. Veja o registro detalhado com:
   * **Data e Hora exata**
   * **Tipo:** Entrada (verde), Saída (neutro/rosa) ou Baixa (vermelho)
   * **Produto e Código SKU**
   * **Saldo Anterior ➔ Saldo Resultante** (ex: `15 ➔ 14 un.`)
   * **Motivo ou Documento**
3. **Filtros:** Você pode filtrar por período de datas (ex: do dia 01 ao dia 30 do mês) ou por tipo de operação.
4. **Exportar para Excel:** Clique no botão rosa **"Exportar Relatório (CSV)"**. O sistema gera automaticamente uma planilha compatível com Microsoft Excel, Google Planilhas e sistemas contábeis.

---

## 9. Perguntas Frequentes & Resolução de Dúvidas

#### P: Onde ficam salvos os dados da loja?
**R:** Ficam salvos na memória local do seu navegador (`LocalStorage`). Isso significa que mesmo se a internet cair, o sistema continua funcionando perfeitamente sem lentidão.

#### P: Se eu fechar o navegador ou desligar o computador, meus produtos somem?
**R:** **Não!** Os dados ficam gravados com segurança no navegador do dispositivo. Quando você reabrir o link, tudo estará exatamente do jeito que você deixou.

#### P: O que acontece se eu tentar vender uma peça com estoque zerado?
**R:** O sistema bloqueia a saída na hora e desativa o botão de confirmação, informando que a quantidade solicitada é maior que o saldo disponível na loja física.

#### P: Quero limpar tudo para recomeçar o estoque do zero, como faço?
**R:** No menu superior, clique em **Restaurar Demo**. Na janela que abrir, escolha a opção **"Zerar Todo o Estoque (Limpo)"**. Todas as mercadorias de teste serão removidas e a base ficará zerada para novos cadastros reais.

#### P: Como acessar pelo celular?
**R:** Abra o navegador do celular (Chrome ou Safari) e entre no link:  
👉 [https://sist-exclusiva-store.vercel.app](https://sist-exclusiva-store.vercel.app)  
O sistema é 100% responsivo, adaptando o menu e os botões perfeitamente para a tela do smartphone.

---

*Manual elaborado com carinho para a equipe da **Exclusiva Store**.*  
*Em caso de dúvidas sobre alterações técnicas ou novas regras, consulte o repositório oficial da loja.*
