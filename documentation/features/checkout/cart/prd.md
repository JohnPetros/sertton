# PRD Carrinho de Compras

## 1. Visão Geral

Este documento detalha os requisitos da tela de **Meu Carrinho** e do componente **Dialog de Seleção de SKU**. O objetivo é permitir que o utilizador faça uma gestão eficiente dos seus itens e consiga adicionar variações ao carrinho rapidamente através da listagem de produtos (PLP/Home), sem necessidade de abrir a página de detalhes (PDP).

## 2. Regras de Negócio

* **Gatilho de Seleção Rápida:** O Dialog de seleção de SKU é ativado ao clicar no botão azul de carrinho presente no card do produto.
* **Estado Inicial do Seletor (Dialog):** Ao abrir o Dialog, o seletor de variação deve carregar automaticamente o **primeiro SKU** da lista como selecionado. Se o item já estiver no carrinho, a quantidade inicial exibida deve ser a quantidade atual no carrinho.
* **Lógica de Adição (Replace vs Add):** Ao confirmar a adição no Dialog para um item que já existe no carrinho, a quantidade selecionada deve **substituir** a quantidade anterior (lógica de "Set" e não de "Add").
* **Persistência de Dados:** O SKU selecionado no Dialog deve ser transferido para o carrinho mantendo o ID, imagem, material e preço promocional.
* **Cálculo Automático:** O carrinho deve atualizar o Subtotal, Desconto e Total em tempo real ao alterar quantidades ou remover itens.

## 3. Requisitos Funcionais

### A. Dialog de Seleção de SKU (Quick Buy)

Componente ativado a partir do card do produto:

*   [x] **Rótulo (Label):** Exibir o nome da variação (ex: "MATERIAL") em letras maiúsculas acima do campo.
*   [x] **Input de Seleção:** Utilizar um componente **dropdown** (implementado como Bottom Sheet para melhor UX em diálogos) para listar as variações disponíveis.
*   [x] **Ação de Adicionar:** Botão para confirmar a escolha e enviar o SKU selecionado diretamente para o carrinho. **Se o item já estiver no carrinho, o botão deve atualizar a quantidade.**
*   [x] **Ação de Remover:** Disponibilizar opção de remover o item diretamente do dialog caso ele já pertença ao carrinho.
*   [x] **Indicador de Status:** Mostrar visualmente se o SKU selecionado já está no carrinho.

### B. Gestão de Itens no Carrinho

A tela de "Meu Carrinho" deve listar os itens com as seguintes capacidades:

*   [x] **Identificação do SKU:** Exibir o código SKU em azul (ex: `SKU: 116000010P`) acima do nome do produto.
*   [x] **Detalhe da Variação:** Indicar o atributo selecionado (ex: "• Material: Inox") logo abaixo do nome.
*   [x] **Controle de Quantidade:** Botões de incremento (+) e decremento (-) com campo de valor centralizado.
*   [x] **Remoção:**
    *   [x] Ícone de lixeira individual por item.
    *   [x] Botão "Limpar carrinho" no topo para remover todos os itens de uma vez.

### C. Resumo Financeiro (Footer)

Exibição clara dos valores na base da tela:

*   [x] **Produtos:** Soma dos preços originais (ex: R$ 244,00).
*   [x] **Desconto:** Valor total poupado, exibido em verde com sinal negativo (ex: - R$ 140,00).
*   [x] **Total:** Valor final em azul (ex: R$ 104,00).
*   [x] **Botão Finalizar:** Ação principal "Finalizar compra" em destaque azul.

### D. Checkout

*   [x] **Botão Finalizar:** Ação principal "Finalizar compra" em destaque azul.
*   [x] **Uso de link de compra:** Deve ser feito o redirecionamento para a página de checkout do usuário usando uma url de link de compra que contém todos os tokens de compra de cada sku do carrinho.


## 4. Requisitos de UI/Design

*   [x] **Cores de Destaque:** Azul (`#2D9CDB`) para SKUs, preços finais, botões de ação e ícone de carrinho no card.
*   [x] **Preços Riscados:** Preços originais ("De") devem ser exibidos em cinza e com efeito riscado.
*   [x] **Hierarquia Visual:** O título "Meu Carrinho" deve ser proeminente, seguido pela lista de itens e finalizando com o resumo de valores fixo no rodapé.

## 5. Requisitos Não Funcionais

*   [x] **Performance:** A abertura do Dialog de Seleção e a atualização de preços no carrinho devem ser instantâneas.
*   [x] **Feedback ao Utilizador:** Após adicionar um item via Dialog, o utilizador deve receber uma confirmação visual de que o item foi para o carrinho.
*   [x] **Persistência:** Após adicionar um item via Dialog, o item deve ser mantido no carrinho mesmo que o usuário feche e reabra o aplicativo.