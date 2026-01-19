# PRD - Tela de catálogo de produtos

## 1. Visão Geral

A **Products List Screen** (Lista de Produtos) é a interface onde os usuários visualizam, filtram e selecionam produtos do catálogo. Ela é acessada principalmente através da barra de busca da Home ou navegando por categorias. O objetivo dessa tela é facilitar a localização precisa de itens e incentivar a conversão rápida através da adição direta ao carrinho.

## 2. Objetivos de Negócio

*   **Facilidade de Encontro**: Permitir que o usuário refine sua busca e encontre exatamente o que precisa.
*   **Conversão Rápida**: Habilitar a adição de itens ao carrinho diretamente da lista, sem necessidade de entrar na página de detalhes.
*   **Clareza de Informação**: Apresentar preços, descontos e especificações (SKU, Fabricante) de forma clara.

## 3. Estrutura da Tela (Layout)

A tela é composta por um cabeçalho fixo de controle (Busca e Filtros) seguido por uma lista de rolagem vertical.

1.  **Cabeçalho de Busca e Filtros**
2.  **Lista de Resultados (Cards de Produto)**

---

## 4. Detalhamento das Seções

### 4.1. Cabeçalho de Busca

*   **Label Superior**: Texto "PROCURAR PRODUTO" acima do campo de entrada.
*   **Input de Busca**:
    *   Campo de texto com placeholder "Exemplo: Arremate".
    *   Fundo cinza claro para destaque.
*   **Botão de Ação**: Botão quadrado azul com ícone de lupa à direita do input. Ao clicar, executa a busca refinada.

### 4.2. Controles de Ordenação e Filtro

Localizados logo abaixo da barra de busca:

*   **Ordenação (Dropdown)**:
    *   Botão/Select com texto "Relevância" (padrão) e ícone de seta (chevron down).
    *   Permite ordenar por: Relevância, Menor Preço, Maior Preço, Mais Vendidos.
*   **Filtro (Botão)**:
    *   Botão de texto "Filtrar" com ícone de ajustes (sliders) à esquerda.
    *   Abre um modal ou drawer com filtros avançados (Faixa de Preço, Marca, Categoria).

### 4.3. Lista de Produtos (Cards)

Exibição dos produtos em formato de lista (cards verticais).

*   **Card de Produto**:
    *   **Badge de Desconto**: Pílula azul no canto superior esquerdo da imagem (ex: "↓ 19 %"). Exibida apenas se houver desconto.
    *   **Imagem do Produto**: Miniatura do produto alinhada à esquerda.
    *   **Botão Adicionar ao Carrinho**:
        *   Botão quadrado azul com ícone de carrinho de compras (branco).
        *   Posicionado sobre a imagem (canto inferior direito) ou alinhado estrategicamente para fácil acesso.
    *   **Informações (Coluna Direita)**:
        *   **SKU**: Código do produto em destaque (cor azul, ex: "SKU: 116000001P").
        *   **Fabricante**: Nome da marca/fabricante em cinza (ex: "WEX INDUSTRIAL").
        *   **Nome do Produto**: Título do produto (ex: "Dobradiça Traseira Gra..."), podendo ser truncado.
        *   **Preço de Venda**: Preço atual em destaque (cor azul, fonte maior, ex: "R$ 169,28").
        *   **Preço de Lista (De)**: Preço original riscado em cinza (ex: "R$ 209,28"), se houver desconto.

---

## 5. Requisitos Funcionais

| ID | Funcionalidade | Descrição | Critério de Aceite |
| :--- | :--- | :--- | :--- |
| **RF01** | Pesquisar Produtos | O usuário digita um termo e clica na lupa. | A lista deve atualizar com resultados da API baseados na query. |
| **RF02** | Ordenar Resultados | O usuário altera a ordenação via dropdown "Relevância". | A lista é reordenada conforme a opção selecionada (Preço, Nome, etc.). |
| **RF03** | Filtrar Resultados | O usuário acessa a tela de filtros. | O botão "Filtrar" deve abrir as opções de filtro disponíveis. |
| **RF04** | Adicionar ao Carrinho | O usuário clica no ícone de carrinho no card. | O item é adicionado ao carrinho (estado global/local) e feedback visual é exibido (ex: toast ou badge atualizado). |
| **RF05** | Visualizar Detalhes | O usuário toca na área do card (exceto botão de carrinho). | Navega para a tela de Detalhes do Produto (`/product/:id`). |
| **RF06** | Exibir SKUs e Marcas | Mostrar SKU e Fabricante no card. | Dados devem vir do DTO do produto e serem renderizados corretamente. |
