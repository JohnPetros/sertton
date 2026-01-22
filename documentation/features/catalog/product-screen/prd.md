# PRD: Tela de Detalhes do Produto (PDP)

## 1. Visão Geral

Este documento descreve os requisitos para a Tela de Detalhes do Produto. O objetivo é apresentar informações detalhadas de um produto que possui variações (SKUs), permitindo que o usuário visualize preços, imagens e disponibilidade específicas antes de adicionar o item ao carrinho.

A estrutura de dados baseia-se no conceito de que um Produto Pai possui múltiplas variações (ex: tamanho, material). A combinação dessas variações gera um SKU único, que detém o preço, o código e o estoque real.

## 2. Regras de Negócio

* **Hierarquia de SKU:** Cada variação selecionada (ex: Material "Inox") corresponde a um SKU específico. Preço, Código de Referência e Estoque pertencem ao SKU, não ao produto genérico.
* **Carregamento Inicial (Default):** Ao abrir a tela, o sistema deve carregar visualmente os dados (Imagem, Preço, Código e Estoque) referentes ao **primeiro SKU** cadastrado na lista.
* **Estado do Seletor:** O campo de seleção de variação deve iniciar com o **primeiro SKU já selecionado** por padrão. O seletor exibe o valor da variação correspondente ao primeiro SKU.
* **Dinâmica de Seleção:** Ao alterar a seleção no dropdown, os campos de Código, Preço e Imagem devem atualizar imediatamente para refletir o novo SKU escolhido.
* **Timer de Oferta:** O contador regressivo é fictício e deve sempre marcar o tempo restante para o fim do dia atual (reset às 00:00), criando senso de urgência.

## 3. Histórias de Usuário

* **Como cliente,** quero ver a imagem do produto em tela cheia ao clicar nela, **para** que eu possa verificar os detalhes do acabamento.
* **Como cliente,** quero ver o preço exato e o código correspondente à variação que escolhi, **para** ter certeza do que estou comprando.
* **Como cliente,** quero identificar rapidamente se o produto tem desconto através de uma etiqueta visual, **para** perceber a vantagem da compra.
* **Como cliente,** quero adicionar itens ao carrinho sabendo quanto tempo falta para a oferta acabar, **para** priorizar essa compra.

## 4. Requisitos Funcionais

**A. Imagem e Zoom**

* [ ] A imagem principal exibida deve corresponder ao SKU ativo (ou primeiro SKU no carregamento).
* [ ] Exibir indicativo visual no canto superior esquerdo da imagem com ícone de expansão e texto "Pressione para zoom".
* [ ] Ao clicar na imagem, abrir um modal em tela cheia com a foto ampliada.

**B. Identificação do Produto**

* [x] Exibir o **Código SKU** logo abaixo da imagem, na cor de destaque (azul), no formato "SKU: [código]".
* [x] Exibir o **Nome do Produto** abaixo do código, com tipografia maior e em cor escura.

**C. Precificação e Oferta**

* [x] Exibir o **Preço "De"** (original/sem desconto) tachado (riscado) em cor cinza.
* [x] Exibir **Badge de Desconto** ao lado do preço "De": etiqueta arredondada (azul claro) com a porcentagem e seta para baixo (ex: ↓ 19%).
* [x] Exibir o **Preço "Por"** (preço final de venda) com o maior destaque visual da tela (fonte grande, cor azul forte).

**D. Seleção de Variação**

* [x] Exibir o **Rótulo (Label)** com o nome do tipo de variação (ex: "MATERIAL") acima do campo em letras maiúsculas.
* [x] Implementar o input como um componente de seleção (**dropdown**).
* [x] Listar no dropdown os nomes das variações disponíveis para o produto.
* [x] O seletor deve iniciar com o valor do primeiro SKU já selecionado.

**E. Quantidade e Ação (Rodapé)**

* [x] Implementar **Seletor de Quantidade** numérico com botões de incremento (+) e decremento (-).
* [ ] Bloquear o incremento de quantidade caso o número atinja o limite de estoque do SKU.
* [x] Exibir **Botão de Compra** ("Adicionar ao Carrinho") que envia o ID do SKU selecionado.
* [x] Exibir **Contador (Timer)** com contagem regressiva para o fim do dia (23:59:59).

**F. Descrição e Informações Técnicas**

* [x] Exibir seção **"Descrição do produto"** com o texto da descrição do produto pai.
* [x] Exibir seção **"Especificações técnicas"** com as especificações técnicas do produto.
* [x] Garantir que o texto seja legível, com suporte básico para formatação (quebras de linha e listas).

## 5. Requisitos Não Funcionais

* [ ] **Performance:** A atualização de preço, imagem e código ao trocar a variação deve ser instantânea (sem reload da página).
* [ ] **Responsividade:** O layout deve se adaptar a telas móveis, garantindo que botões de ação e seletores tenham área de toque adequada (min. 44px).
* [ ] **Tratamento de Erro:** Caso o SKU selecionado tenha estoque zero, o botão de compra deve ser desabilitado ou exibir mensagem de indisponibilidade.

## 6. Observações de UI/Design

* **Paleta de Cores:** Baseada na referência visual, utilizar a cor primária para elementos de destaque (Preço final, SKU, Badge de desconto) e Cinza para elementos secundários.
* **Hierarquia:** A ordem visual vertical deve ser: Imagem -> SKU -> Título -> Preços -> Seletor de Variação -> Inputs de Quantidade/Botões -> Timer de Oferta -> Descrição/Especificações.