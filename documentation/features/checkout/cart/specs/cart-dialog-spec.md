# Spec: Dialog de Carrinho e Store

## Objetivo

Implementar o fluxo de "Quick Buy" (Compra Rápida) que permite adicionar produtos ao carrinho diretamente da listagem (PLP), e criar a camada de gerenciamento de estado do Carrinho de Compras.

## O que já existe?

### Camada Core

- `lib/core/checkout/dtos/cart_item_dto.dart`: DTO que representa um item no carrinho.
- `lib/core/catalog/dtos/product_dto.dart`: DTO do produto, usado para popular o dialog.
- `lib/core/global/interfaces/cache_driver.dart`: Interface para abstração de cache local.

### Camada UI

- `lib/ui/catalog/widgets/components/sku-selector/`: Pasta contendo o widget `SkuSelector` e seus sub-componentes (`VariationDropdown`, `QuantityInput`). Este componente será reutilizado dentro do Dialog.
- `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/add-to-cart-button/`: Botão disparador existente no Card de Produto.
- `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product_card_presenter.dart`: Presenter que atualmente detém o método `handleAddToCart`.

## O que precisa ser criado?


**`lib/core/checkout/stores/cart_store.dart`**
- Criar a store global do carrinho utilizando `signals` (ou `Riverpod` expondo signals).
- **Dependências**:
  - `CacheDriver`: Para persistência dos dados.
- **Estado**:
  - `items`: Lista de `CartItemDto` (Signal<List<CartItemDto>>). Inicializado lendo do `CacheDriver`.
  - `subtotal`: Valor total dos produtos sem desconto (Computed).
  - `totalDiscount`: Valor total dos descontos (Computed).
  - `total`: Valor final do pedido (Computed).
- **Ações**:
  - `addItem(CartItemDto item)`: Adiciona item ou substitui a quantidade existente. Remove se qtd=0. Salva no Cache.
  - `removeItem(String skuId)`: Remove item. Salva no Cache.
  - `updateQuantity(String skuId, int quantity)`: Atualiza a quantidade. Salva no Cache.
  - `clear()`: Limpa o carrinho e limpa do Cache.

### Camada Drivers

**`lib/drivers/cache-driver/`**
- Criar implementação concreta para `SharedPreferences`.
- **`lib/drivers/cache-driver/shared_preferences_cache_driver.dart`**: Implementação da interface `CacheDriver` usando o pacote `shared_preferences`.
- Registrar provedor do driver globalmente.


### Camada UI

**`lib/ui/checkout/widgets/components/cart-dialog/`**
- Feature-component criado para gerenciar a adição rápida ao carrinho.

**`lib/ui/checkout/widgets/components/cart-dialog/cart_dialog_view.dart`**
- Implementado como um `AlertDialog` do `shadcn_flutter`.
- Recebe `ProductDto`.
- **Estrutura**:
  - Título com o nome do produto.
  - `SkuSelectorView`: Reutilizado para escolha de variação e quantidade.
  - **Indicador de Status do Carrinho**: Exibe se o item já está no carrinho com a quantidade atual.
    - Quando o item está no carrinho: Exibe texto "Item já está no carrinho (X unidades)" em cor de destaque.
  - **Botões de Ação**:
    - `PrimaryButton`: "Adicionar ao Carrinho", desabilitado se sem estoque ou processando. Exibido quando o item NÃO está no carrinho ou quando a quantidade selecionada é diferente da quantidade no carrinho.
    - `DestructiveButton`: "Remover do Carrinho", exibido quando o item JÁ está no carrinho. Remove completamente o item do carrinho.
  - Abaixo dos botões exibe feedback de estoque reativo.

**`lib/ui/checkout/widgets/components/cart-dialog/cart_dialog_presenter.dart`**
- Gerencia o estado reativo usando `signals`.
- **Dependências**:
  - `CartStore`: Para verificar se o item está no carrinho e gerenciar adição/remoção.
- **Estado**:
  - `isInCart`: Computed signal que verifica se o SKU selecionado está no carrinho.
  - `cartQuantity`: Computed signal que retorna a quantidade do item no carrinho (0 se não estiver).
- **Lógica**:
  - Ao abrir, seleciona o primeiro SKU e define a quantidade inicial baseada no que já está no carrinho (ou 1 caso não esteja).
  - Ao trocar de variação (SKU), sincroniza a quantidade com o que já está no carrinho ou reseta para 1.
  - Ao adicionar: invoca `cartStore.addItem`, fecha o dialog (`back()`) e navega para a tela de carrinho (`Routes.cart`).
  - Ao remover: invoca `cartStore.removeItem`, fecha o dialog (`back()`).
  - Expõe `isOutOfStock`, `canAdd`, `isInCart`, e `cartQuantity` para controle da UI.
  - O botão "Adicionar" é exibido quando `!isInCart` ou quando a quantidade selecionada é diferente de `cartQuantity`.
  - O botão "Remover" é exibido quando `isInCart`.

### Componentes de Seleção (Refatoração)

**`lib/ui/catalog/widgets/components/sku-selector/`**
- Todos os componentes foram refatorados para serem **Stateless** ("Burros"), recebendo estado e callbacks do pai.
- **`VariationDropdownView`**: Substituído por um disparador que abre um **Bottom Sheet (Drawer)** para seleção, garantindo melhor UX em dispositivos móveis e evitando conflitos de sobreposição de popups em diálogos.
- **`SkuSelectorView`**: Agora inclui um indicador de disponibilidade ("Disponível: X unidades" ou "Indisponível no momento").

## O que foi modificado?

### Camada UI

**`lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product_card_presenter.dart`**
- Método `handleAddToCart`: Invoca a abertura do `CartDialogView` passando o produto selecionado.

**`lib/ui/catalog/widgets/screens/product/product_screen_presenter.dart`**
- Atualizado para centralizar a lógica de variação e estoque, suportando a nova estrutura stateless do `SkuSelector`.
- Integrado com `CartStore` para adição real ao carrinho.


