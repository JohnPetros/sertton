# PRD: Tela de Detalhes do Produto (PDP)

## 1. Visão Geral

Este documento descreve os requisitos para a Tela de Detalhes do Produto. O objetivo é apresentar informações detalhadas de um produto que possui variações (SKUs), permitindo que o usuário visualize preços, imagens e disponibilidade específicas antes de adicionar o item ao carrinho.

A estrutura de dados baseia-se no conceito de que um Produto Pai possui múltiplas variações (ex: tamanho, material). A combinação dessas variações gera um SKU único, que detém o preço, o código e o estoque real.

## 2. Regras de Negócio

* **Hierarquia de SKU:** Cada variação selecionada (ex: Material "Inox") corresponde a um SKU específico. Preço, Código de Referência e Estoque pertencem ao SKU, não ao produto genérico.
* **Carregamento Inicial (Default):** Ao abrir a tela, o sistema deve carregar visualmente os dados (Imagem, Preço, Código e Estoque) referentes ao **primeiro SKU** cadastrado na lista.
* **Estado do Seletor:** Embora os dados do primeiro SKU sejam exibidos, o campo de seleção de variação deve iniciar com o texto "Selecionar" (placeholder). O usuário visualiza o preço "padrão", mas precisa interagir com o campo para confirmar a escolha.
* **Dinâmica de Seleção:** Ao alterar a seleção no dropdown, os campos de Código, Preço e Imagem devem atualizar imediatamente para refletir o novo SKU escolhido.
* **Timer de Oferta:** O contador regressivo é fictício e deve sempre marcar o tempo restante para o fim do dia atual (reset às 00:00), criando senso de urgência.

## 3. Histórias de Usuário

* **Como cliente,** quero ver a imagem do produto em tela cheia ao clicar nela, **para** que eu possa verificar os detalhes do acabamento.
* **Como cliente,** quero ver o preço exato e o código correspondente à variação que escolhi, **para** ter certeza do que estou comprando.
* **Como cliente,** quero identificar rapidamente se o produto tem desconto através de uma etiqueta visual, **para** perceber a vantagem da compra.
* **Como cliente,** quero adicionar itens ao carrinho sabendo quanto tempo falta para a oferta acabar, **para** priorizar essa compra.

## 4. Requisitos Funcionais

### A. Imagem e Zoom

* **Exibição:** A imagem principal deve corresponder ao SKU ativo.
* **Zoom:** Deve haver um indicativo visual no canto superior esquerdo com ícone de expansão e texto "Pressione para zoom". O clique na imagem deve abrir um modal em tela cheia.

### B. Identificação do Produto

* **Código SKU:** Deve ser exibido logo abaixo da imagem, na cor de destaque (azul), seguindo o formato "SKU: [código]".
* **Nome do Produto:** Deve ser exibido abaixo do código, com tipografia maior e em cor escura para fácil leitura.

### C. Precificação e Oferta

* **Preço "De":** O preço original (sem desconto) deve ser exibido tachado (riscado) em cor cinza.
* **Badge de Desconto:** Ao lado do preço "De", deve haver uma etiqueta arredondada (azul claro) exibindo a porcentagem de desconto com uma seta para baixo (ex: ↓ 19%).
* **Preço "Por":** O preço final de venda deve ter o maior destaque visual da tela (fonte grande, cor azul forte).

### D. Seleção de Variação

* **Rótulo (Label):** O nome do tipo de variação (ex: "MATERIAL") deve aparecer acima do campo em letras maiúsculas.
* **Input:** Deve ser um componente de seleção (dropdown).
* **Opções:** O dropdown deve listar os nomes das variações disponíveis. O estado inicial exibe o texto "Selecionar".

### E. Quantidade e Ação (Rodapé)

* **Seletor de Quantidade:** Input numérico com botões de incremento (+) e decremento (-). Não deve permitir selecionar quantidade maior que o estoque do SKU.
* **Botão de Compra:** Botão principal para adicionar o SKU selecionado ao carrinho.
* **Contador (Timer):** Texto ou badge exibindo a contagem regressiva para o fim do dia.

## 5. Requisitos Não Funcionais

* **Performance:** A troca de SKU (atualização de preço/imagem) deve ser instantânea, sem recarregamento completo da página (full reload).
* **Responsividade:** O layout deve se adaptar a telas de diferentes tamanhos, mantendo a legibilidade do preço e a facilidade de toque nos botões (touch targets).
* **Tratamento de Erro:** Caso um SKU específico esteja sem estoque, o seletor de quantidade deve travar ou o botão de compra deve ficar inativo.

## 6. Observações de UI/Design

* **Paleta de Cores:** Baseada na referência visual, utilizar Azul (`#2D9CDB` aprox.) para elementos de destaque (Preço final, SKU, Badge de desconto) e Cinza para elementos secundários.
* **Hierarquia:** A ordem visual vertical deve ser rigorosamente: Imagem -> SKU -> Título -> Preços -> Seletor de Variação -> Inputs de Quantidade/Botões.