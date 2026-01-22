# Spec: Tela de Carrinho

## Objetivo

Implementar a tela de carrinho completa que exibe os itens adicionados pelo usuário, permite o gerenciamento de quantidade e remoção de itens, calcula automaticamente o resumo financeiro (subtotal, desconto e total), e possibilita o checkout da compra através de um link de redirecionamento para a página de pagamento da Yampi contendo os tokens de compra de cada SKU.

---

## O que já existe?

### Camada Core

- **`CartItemDto`** (`lib/core/checkout/dtos/cart_item_dto.dart`)
  - Modelo de dados do item do carrinho contendo: `productId`, `skuId`, `quantity`

- **`CartStore`** (`lib/core/checkout/stores/cart_store.dart`)
  - Store global do carrinho gerenciado com Signals e Riverpod
  - Métodos: `addItem()`, `removeItem()`, `updateQuantity()`, `clear()`
  - Persistência automática via `CacheDriver`
  - Signal: `items`

- **`CheckoutService`** (`lib/core/checkout/interfaces/checkout_service.dart`)
  - Interface para gerar o link de checkout
  - Método: `Future<RestResponse<String>> fetchCheckoutLink(List<String> skuTokens, List<int> quantities)`

- **`CatalogService.fetchProduct(String productId)`** (`lib/core/catalog/interfaces/catalog_service.dart`)
  - Método que busca um produto completo pelo ID
  - Retorna `RestResponse<ProductDto>`

- **`ProductDto`** (`lib/core/catalog/dtos/product_dto.dart`)
  - Contém: `id`, `slug`, `skuCode`, `name`, `description`, `specifications`, `skus`, `imageUrl`, `brand`

- **`SkuDto`** (`lib/core/catalog/dtos/sku_dto.dart`)
  - Contém: `id`, `skuCode`, `salePrice`, `discountPrice`, `imageUrl`, `variations`, `stock`, `yampiToken`
  - O `yampiToken` é usado para construir o link de checkout da Yampi

- **`VariationDto`** (`lib/core/catalog/dtos/variation_dto.dart`)
  - Contém: `id`, `name`, `value`

### Camada UI

- **`CartScreenView`** (`lib/ui/checkout/widgets/screens/cart/cart_screen_view.dart`)
  - Widget de tela de carrinho, atualmente apenas com scaffold placeholder

- **`QuantityInput`** (`lib/ui/catalog/widgets/components/sku-selector/quantity-input/`)
  - Widget de input de quantidade com botões de incremento/decremento
  - Props: `initialQuantity`, `maxQuantity`, `onQuantityChanged`
  - Atualmente localizado dentro do `sku-selector`, será movido para global

- **`AppSearchBar`** (`lib/ui/global/widgets/app-search-bar/`)
  - Barra de pesquisa com menu hamburger e logo da Sertton
  - Deve ser adicionada no topo da tela de carrinho

---

## O que deve ser criado?

### Camada Rest

#### `YampiCheckoutService` (Implementação)

- **Localização:** `lib/rest/yampi/services/yampi_checkout_service.dart`
- **Responsabilidades:**
  - Implementar `CheckoutService`
  - Construir a URL de checkout da Yampi com os tokens dos SKUs e quantidades
  - Formato da URL: `https://checkout.yampi.com.br/cart?items=token1:qty1,token2:qty2,...`

### Camada UI

#### `CartScreenPresenter`

- **Localização:** `lib/ui/checkout/widgets/screens/cart/cart_screen_presenter.dart`
- **Dependências:**
  - `CartStore` (via provider)
  - `CatalogService` (para buscar dados dos produtos de cada item do carrinho)
  - `CheckoutService` (para gerar link de checkout)
- **Signals:**
  - `isLoading: Signal<bool>` - estado de carregamento inicial (para exibir loading skeleton)
  - `cartDisplayItems: Signal<List<CartDisplayItem>>` - lista de itens com dados enriched do produto
  - `hasError: Signal<bool>` - indicador de erro no carregamento
- **Computed Signals:**
  - `itemCount: Computed<int>` - contagem total de itens (soma das quantidades)
  - `subtotal: Computed<double>` - soma dos preços originais (salePrice) × quantidade
  - `totalDiscount: Computed<double>` - soma das diferenças (salePrice - discountPrice) × quantidade
  - `total: Computed<double>` - subtotal - totalDiscount
  - `isEmpty: Computed<bool>` - indica se o carrinho está vazio
  - `canCheckout: Computed<bool>` - indica se pode realizar checkout (!isEmpty && !isLoading)
- **Métodos:**
  - `loadCartProducts()` - carrega os dados completos dos produtos para cada item do carrinho usando `CatalogService.fetchProduct()`
  - `updateItemQuantity(String skuId, int quantity)` - atualiza quantidade de um item
  - `removeItem(String skuId)` - remove item do carrinho
  - `clearCart()` - limpa todo o carrinho
  - `checkout()` - gera o link de checkout, abre no navegador externo e limpa o carrinho após o redirecionamento bem-sucedido.

#### `CartDisplayItem` (View Model)

- **Localização:** `lib/ui/checkout/widgets/screens/cart/cart_screen_presenter.dart` (classe auxiliar no mesmo arquivo)
- **Propriedades derivadas:**
  - `skuId: String` → cartItem.skuId
  - `name: String` → product.name
  - `imageUrl: String` → sku.imageUrl (fallback: product.imageUrl)
  - `skuCode: String` → sku.skuCode
  - `variationName: String` → sku.variations.first.name
  - `variationValue: String` → sku.variations.first.value
  - `salePrice: double` → sku.salePrice
  - `discountPrice: double` → sku.discountPrice
  - `quantity: int` → cartItem.quantity
  - `maxQuantity: int` → sku.stock

#### `CartItemCard`

- **Localização:** `lib/ui/checkout/widgets/screens/cart/cart-item-card/`
- **Arquivos:**
  - `cart_item_card_view.dart`
  - `index.dart`
- **Props:**
  - `imageUrl: String`
  - `skuCode: String`
  - `name: String`
  - `variationName: String`
  - `variationValue: String`
  - `salePrice: double`
  - `discountPrice: double`
  - `quantity: int`
  - `maxQuantity: int`
  - `onQuantityChanged: Function(int)`
  - `onRemove: VoidCallback`
- **Layout Visual (conforme imagem de referência):**
  ```
  ┌─────────────────────────────────────────────────────────────────┐
  │  ┌─────────────┐  SKU: 116000010P (azul)                        │
  │  │             │  Dobradiça Lateral Univer... (nome truncado)   │
  │  │   [imagem]  │  • Material: Inox                              │
  │  │             │                                                │
  │  │             │  ┌───┐ ┌───┐ ┌───┐                             │
  │  └─────────────┘  │ - │ │ 1 │ │ + │  (botões azuis)             │
  │                   └───┘ └───┘ └───┘                             │
  │                   R$ 112,00 (cinza, riscado)                    │
  │                   R$ 52,00 (azul)               [🗑️] (lixeira)  │
  └─────────────────────────────────────────────────────────────────┘
  ```

#### `CartSummary`

- **Localização:** `lib/ui/checkout/widgets/screens/cart/cart-summary/`
- **Arquivos:**
  - `cart_summary_view.dart`
  - `index.dart`
- **Props:**
  - `itemCount: int`
  - `subtotal: double`
  - `discount: double`
  - `total: double`
  - `onCheckout: VoidCallback`
  - `isCheckoutEnabled: bool`
- **Layout Visual (conforme imagem de referência):**
  ```
  ┌─────────────────────────────────────────────────────────────────┐
  │  Produtos (3 items)                              R$ 244,00      │
  │  Desconto (cor verde/teal)                     - R$ 140,00      │
  │  Total                                           R$ 104,00      │
  │                                                                 │
  │  ┌─────────────────────────────────────────────────────────────┐│
  │  │                    Finalizar compra                         ││
  │  └─────────────────────────────────────────────────────────────┘│
  └─────────────────────────────────────────────────────────────────┘
  ```

#### `CartItemCardSkeleton`

- **Localização:** `lib/ui/checkout/widgets/screens/cart/cart-item-card/cart_item_card_skeleton_view.dart`
- **Responsabilidade:** Exibir placeholder animado enquanto os dados do produto carregam
- **Layout:** Similar ao `CartItemCard` mas com blocos cinza animados no lugar do conteúdo

---

## O que deve ser modificado?

### Camada UI

#### `CartScreenView`

- **Arquivo:** `lib/ui/checkout/widgets/screens/cart/cart_screen_view.dart`
- **Modificações:**
  - Converter para `ConsumerWidget`
  - Usar `CartScreenPresenter` via provider
  - **Layout completo (conforme imagem de referência):**
  ```
  ┌─────────────────────────────────────────────────────────────────┐
  │  ☰ (menu)                                    [SERTTON logo]     │  ← AppSearchBar
  │  PROCURAR PRODUTO                                               │
  │  [_______________________ Exemplo: Arremate _______] [🔍]       │
  ├─────────────────────────────────────────────────────────────────┤
  │                                                                 │
  │  Meu Carrinho                        🗑️ Limpar carrinho          │  ← Header
  │                                                                 │
  │  ┌─────────────────────────────────────────────────────────────┐│
  │  │  CartItemCard #1                                            ││
  │  └─────────────────────────────────────────────────────────────┘│
  │  ┌─────────────────────────────────────────────────────────────┐│
  │  │  CartItemCard #2                                            ││
  │  └─────────────────────────────────────────────────────────────┘│
  │  ...                                                            │
  │                                                                 │
  ├─────────────────────────────────────────────────────────────────┤
  │  CartSummary (footer fixo)                                      │
  └─────────────────────────────────────────────────────────────────┘
  ```
  - **Estados:**
    - **Loading:** Exibir `CartItemCardSkeleton` (2-3 itens) + `CartSummary` desabilitado
    - **Vazio:** Mensagem "Seu carrinho está vazio" com ícone ilustrativo
    - **Com itens:** Lista de `CartItemCard` + `CartSummary` ativo
    - **Erro:** Mensagem de erro com botão "Tentar novamente"

#### `QuantityInput` → Mover para global

- **De:** `lib/ui/catalog/widgets/components/sku-selector/quantity-input/`
- **Para:** `lib/ui/global/widgets/quantity-input/`
- **Motivo:** O componente é reutilizado tanto no `SkuSelector` quanto no `CartItemCard`
- **Ação adicional:** Atualizar imports no `SkuSelector`

---

## Usar como referência

- **`ProductScreenPresenter`** (`lib/ui/catalog/widgets/screens/product/product_screen_presenter.dart`)
  - Padrão de presenter com signals, loading state, e chamadas a services
  - Uso de `computed` para derivar dados

- **`ProductScreenView`** (`lib/ui/catalog/widgets/screens/product/product_screen_view.dart`)
  - Estrutura de screen com consumo de presenter via provider
  - Uso de `Watch` para reatividade

- **`CartDialogView`** (`lib/ui/checkout/widgets/components/cart-dialog/cart_dialog_view.dart`)
  - Referência para uso do CartStore

- **`AppSearchBarView`** (`lib/ui/global/widgets/app-search-bar/app_search_bar_view.dart`)
  - Referência para estrutura do header com menu e logo

---

## Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CartScreenView                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │                         CartScreenPresenter                               │ │
│  │                                                                           │ │
│  │   ┌───────────────┐    ┌───────────────────────────────────────┐        │ │
│  │   │   CartStore   │    │          CatalogService               │        │ │
│  │   │   (items)     │───▶│ fetchProduct(productId) para cada item│        │ │
│  │   └───────────────┘    └───────────────────────────────────────┘        │ │
│  │            │                          │                                  │ │
│  │            ▼                          ▼                                  │ │
│  │   ┌─────────────────────────────────────────────────────────────────────┐│ │
│  │   │          cartDisplayItems: List<CartDisplayItem>                     ││ │
│  │   │   (cada item contém CartItemDto + ProductDto + SkuDto)              ││ │
│  │   └─────────────────────────────────────────────────────────────────────┘│ │
│  │                                                                           │ │
│  │   ┌───────────────────────────────────────────────────────────────────┐  │ │
│  │   │  computed: itemCount, subtotal, totalDiscount, total, canCheckout │  │ │
│  │   └───────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                           │ │
│  │   ┌───────────────────────────────────────────────────────────────────┐  │ │
│  │   │                     CheckoutService                                │  │ │
│  │   │  fetchCheckoutLink(skuTokens, quantities) → retorna a url de checkout │  │ │
│  │   └───────────────────────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                               │
│  ┌────────────────────────────┐   ┌────────────────────────┐                  │
│  │  - image, name, sku, price │   │  - itemCount, subtotal │                  │
│  │  - QuantityInput (global)  │   │  - discount, total     │                  │
│  │  - delete button           │   │  - checkout button     │                  │
│  └────────────────────────────┘   └────────────────────────┘                  │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## Considerações de UI/UX

### Cores (conforme PRD e imagem de referência)

| Elemento | Cor | Código |
|----------|-----|--------|
| SKU code | Azul | `#2D9CDB` |
| Preço atual | Azul | `#2D9CDB` |
| Botões de quantidade | Azul | `#2D9CDB` |
| Botão "Finalizar compra" | Azul | `#2D9CDB` |
| Botão "Limpar carrinho" | Cinza claro | - |
| Valor do desconto | Verde/Teal | `#27AE60` ou `#2D9CDB` |
| Preço riscado | Cinza | `#828282` |
| Textos secundários | Cinza | `#828282` |

### Tipografia

| Elemento | Estilo |
|----------|--------|
| "Meu Carrinho" | Título grande, negrito |
| SKU code | Fonte pequena, cor azul, prefixo "SKU: " |
| Nome do produto | Fonte média, truncado com ellipsis se muito longo |
| Variação | Fonte pequena, prefixo com bullet "• " |
| Preço riscado | Fonte pequena, decoração strikethrough, cor cinza |
| Preço atual | Fonte média, negrito, cor azul |
| "Produtos (X items)" | Fonte normal |
| "Desconto" | Fonte normal, cor verde/teal |
| "Total" | Fonte média, negrito |

### Loading Skeleton

- **Quantidade:** 2-3 itens skeleton
- **Animação:** Shimmer effect (pulsação cinza clara)
- **Estrutura:** Mesma do `CartItemCard` mas com blocos cinza:
  ```
  ┌─────────────────────────────────────────────────────────────────┐
  │  ┌─────────────┐  ████████████████████ (pequeno)                │
  │  │   ██████    │  ████████████████████████████ (médio)          │
  │  │   ██████    │  ████████████ (pequeno)                        │
  │  │   ██████    │                                                │
  │  │   ██████    │  ┌───┐ ┌───┐ ┌───┐                             │
  │  └─────────────┘  │███│ │███│ │███│                             │
  │                   └───┘ └───┘ └───┘                             │
  │                   ████████████                                  │
  │                   ████████████                                  │
  └─────────────────────────────────────────────────────────────────┘
  ```

### Feedback Visual

- Loading skeleton animado enquanto produtos carregam de `CatalogService`
- Desabilitar botão "Finalizar compra" durante loading ou se carrinho vazio
- Botões de quantidade desabilitados nos limites (min: 1, max: stock)
