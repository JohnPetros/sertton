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
  - `addItem(CartItemDto item)`: Adiciona item ou incrementa quantidade. Remove se qtd=0. Salva no Cache.
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
  - `PrimaryButton`: "Adicionar ao Carrinho", desabilitado se sem estoque ou processando. Abaixo exibe feedback de estoque reativo.

**`lib/ui/checkout/widgets/components/cart-dialog/cart_dialog_presenter.dart`**
- Gerencia o estado reativo usando `signals`.
- **Lógica**:
  - Ao abrir, seleciona o primeiro SKU.
  - Ao adicionar: invoca `cartStore.addItem`, fecha o dialog (`back()`) e navega para a tela de carrinho (`Routes.cart`).
  - Expõe `isOutOfStock` e `canAdd` para controle da UI.

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


