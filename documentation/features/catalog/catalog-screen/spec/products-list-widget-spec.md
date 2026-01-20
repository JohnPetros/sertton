# Spec: Widget de Listagem de Produtos (ProductsList)

## Objetivo

Implementar o widget de listagem de produtos (`ProductsList`) na tela de catálogo, suportando:
- Exibição em formato de lista vertical de cards de produtos
- Paginação infinita (infinite scroll) para carregar mais produtos
- Renderização de cards de produto (`ProductCard`) com informações visuais

Este widget será o componente principal da tela de catálogo, renderizando os produtos retornados pelo `CatalogService`.

---

## O que já existe?

### Camada Core

| Recurso | Caminho | Descrição |
|---------|---------|-----------|
| `ProductDto` | `lib/core/catalog/dtos/product_dto.dart` | DTO com campos: `id`, `slug`, `skuCode`, `name`, `description`, `specifications`, `skus`, `imageUrl`, `brand` |
| `SkuDto` | `lib/core/catalog/dtos/sku_dto.dart` | DTO do SKU com preços (`costPrice`, `salePrice`, `discountPrice`), dimensões e `stock` |
| `BrandDto` | `lib/core/catalog/dtos/brand_dto.dart` | DTO com `id` e `name` da marca/fabricante |
| `PaginationResponse<T>` | `lib/core/global/responses/pagination_response.dart` | Wrapper de paginação com `items`, `itemsPerPage`, `currentPage`, `totalItems`, `totalPages` |
| `CatalogService` | `lib/core/catalog/interfaces/catalog_service.dart` | Interface com método `fetchProducts()` retornando `RestResponse<PaginationResponse<ProductDto>>` |

### Camada Rest

| Recurso | Caminho | Descrição |
|---------|---------|-----------|
| `YampiCatalogService` | `lib/rest/yampi/services/yampi_catalog_service.dart` | Implementação do `CatalogService` que busca produtos da API Yampi |
| `catalogServiceProvider` | `lib/rest/services.dart` | Provider Riverpod para injetar `CatalogService` |

### Camada UI

| Recurso | Caminho | Descrição |
|---------|---------|-----------|
| `CatalogScreenView` | `lib/ui/catalog/widgets/screens/catalog/catalog_screen_view.dart` | Tela de catálogo que renderiza o `ProductList` |
| `ProductListView` | `lib/ui/catalog/widgets/screens/catalog/products-list/product_list_view.dart` | Widget View atual (incompleto) |
| `ProductsListPresenter` | `lib/ui/catalog/widgets/screens/catalog/products-list/products_list_presenter.dart` | Presenter atual com `futureSignal` para fetch de produtos |

---

## O que deve ser criado?

### Camada UI

#### Widget ProductsList

**Localização:** `lib/ui/catalog/widgets/screens/catalog/products-list/`

##### Arquivo: `products_list_presenter.dart` (modificar existente)

- **Estado reativo** via Signals:
  - `products`: `signal<List<ProductDto>>([])` - lista de produtos carregados
  - `isLoading`: `signal<bool>(false)` - indicador de carregamento
  - `hasMore`: `signal<bool>(true)` - se há mais páginas disponíveis
  - `currentPage`: `signal<int>(1)` - página atual para paginação
  - `error`: `signal<String?>()` - mensagem de erro, se houver

- **Métodos**:
  - `loadProducts()`: Carrega a primeira página de produtos
  - `loadMoreProducts()`: Carrega próxima página (infinite scroll)
  - `refresh()`: Reseta e recarrega desde a primeira página

- **Lógica de paginação**:
  - Usar `currentPage` e `totalPages` do `PaginationResponse`
  - Setar `hasMore = false` quando `currentPage >= totalPages`
  - Acumular produtos no signal `products` a cada nova página

##### Arquivo: `product_list_view.dart` (modificar existente)

- **Estrutura do Widget**:
  - Usar `ListView.builder` ou `ListView.separated` para renderizar os cards
  - Implementar `ScrollController` para detectar scroll até o final (infinite scroll)
  - Mostrar indicador de carregamento (`CircularProgressIndicator`) no final da lista
  - Mostrar estado de erro com opção de retry
  - Mostrar estado vazio se nenhum produto encontrado

- **Responsabilidades**:
  - Observar signals do Presenter via `Watch()`
  - Chamar `loadMoreProducts()` quando scroll atinge threshold (ex: 80% da lista)
  - Renderizar `ProductCard` para cada `ProductDto`

##### Widget ProductCard (Criar novo)

**Localização:** `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/`

Estrutura de arquivos (padrão MVP) - **AS BUILT**:
```
product-card/
├── index.dart
├── product_card_view.dart
├── product_card_presenter.dart
├── product_card_skeleton.dart
├── product_card_skeleton_presenter.dart
├── discount-badge/
│   ├── index.dart
│   ├── discount_badge_view.dart
│   └── discount_badge_presenter.dart
├── product-image/
│   ├── index.dart
│   ├── product_image_view.dart
│   └── product_image_presenter.dart
├── add-to-cart-button/
│   ├── index.dart
│   ├── add_to_cart_button_view.dart
│   └── add_to_cart_button_presenter.dart
└── product-info/
    ├── index.dart
    ├── product_info_view.dart
    └── product_info_presenter.dart

product-skeleton/
├── index.dart
└── (referência ao ProductCardSkeletonView)
```

> **Nota**: A estrutura final difere da planejada. Os sub-widgets foram movidos para pastas diretas em `product-card/` ao invés de ficarem dentro de `widgets/`. Também foi adicionado um `ProductCardSkeleton` para estados de carregamento.

###### Arquivo: `product_card_presenter.dart`

**Classe:** `ProductCardPresenter`

- **Dependências**:
  - Recebe `ProductDto` via construtor

- **Estado reativo** (Signals):
  - `isAddingToCart`: `signal<bool>(false)` - feedback visual ao adicionar

- **Computed** (derivados do ProductDto):
  - `hasDiscount`: `computed(() => firstSku.discountPrice < firstSku.salePrice)`
  - `discountPercentage`: `computed(() => ((salePrice - discountPrice) / salePrice * 100).round())`
  - `firstSku`: getter para `product.skus.first`

- **Métodos**:
  - `handleAddToCart()`: Lógica de adicionar ao carrinho (atualiza `isAddingToCart`)
  - `handleTap()`: Navegação para detalhes

- **Provider**:
  ```dart
  final productCardPresenterProvider = Provider.autoDispose
      .family<ProductCardPresenter, ProductDto>(
        (ref, product) => ProductCardPresenter(product),
      );
  ```

###### Arquivo: `product_card_view.dart`

**Classe:** `ProductCardView` (ConsumerWidget)

- **Props**:
  - `product`: `ProductDto` - dados do produto

- **Layout (baseado no PRD)**:
  - Card horizontal com `Row`:
    - Coluna esquerda: `ProductImage` com `DiscountBadge` (overlay) e `AddToCartButton`
    - Coluna direita: `ProductInfo`

- **Responsabilidades**:
  - Obter Presenter via `ref.watch(productCardPresenterProvider(product))`
  - Delegar ações aos sub-widgets
  - Usar `GestureDetector` para `onTap` no card inteiro

###### Arquivo: `index.dart`

```dart
import 'product_card_view.dart';
typedef ProductCard = ProductCardView;
```

###### Arquivo: `product_card_skeleton.dart` (AS BUILT - Adicionado)

**Classe:** `ProductCardSkeletonView` (ConsumerWidget)

- **Objetivo**: Exibir um placeholder visual durante o carregamento de produtos
- **Uso**: Renderizado em `ProductListView` durante estados de loading (inicial e paginação)
- **Layout**: Replica a estrutura visual do `ProductCard` usando containers com `colorScheme.surfaceVariant` do Material ou `colorScheme.muted` do shadcn_flutter
- **Presenter**: `ProductCardSkeletonPresenter` gerencia configurações como `imageSize`

> **Nota**: Este widget foi adicionado durante a implementação para melhorar a UX durante carregamentos. Não estava no planejamento original.

---

##### Sub-Widgets do ProductCard (Padrão MVP)

###### 1. `widgets/discount-badge/`

**Arquivo:** `discount_badge_presenter.dart`

**Classe:** `DiscountBadgePresenter`

- **Dependências**:
  - `salePrice`: `double`
  - `discountPrice`: `double`

- **Computed**:
  - `isVisible`: `computed(() => discountPrice < salePrice)`
  - `percentage`: `computed(() => ((salePrice - discountPrice) / salePrice * 100).round())`
  - `formattedText`: `computed(() => "↓ ${percentage.value} %")`

- **Provider**:
  ```dart
  final discountBadgePresenterProvider = Provider.autoDispose
      .family<DiscountBadgePresenter, ({double salePrice, double discountPrice})>(
        (ref, props) => DiscountBadgePresenter(
          salePrice: props.salePrice,
          discountPrice: props.discountPrice,
        ),
      );
  ```

**Arquivo:** `discount_badge_view.dart`

**Classe:** `DiscountBadgeView` (ConsumerWidget)

- **Props**:
  - `salePrice`: `double`
  - `discountPrice`: `double`

- **Visual**:
  - Retorna `SizedBox.shrink()` se `presenter.isVisible.value == false`
  - Container com `BorderRadius` circular (pílula)
  - Cor de fundo: azul primário
  - Texto branco: `presenter.formattedText.value`

**Arquivo:** `index.dart`
```dart
import 'discount_badge_view.dart';
typedef DiscountBadge = DiscountBadgeView;
```

---

###### 2. `widgets/product-image/`

**Arquivo:** `product_image_presenter.dart`

**Classe:** `ProductImagePresenter`

- **Dependências**:
  - `imageUrl`: `String`

- **Estado reativo**:
  - `isLoading`: `signal<bool>(true)`
  - `hasError`: `signal<bool>(false)`

- **Métodos**:
  - `onLoadComplete()`: Seta `isLoading.value = false`
  - `onLoadError()`: Seta `hasError.value = true`, `isLoading.value = false`

- **Provider**:
  ```dart
  final productImagePresenterProvider = Provider.autoDispose
      .family<ProductImagePresenter, String>(
        (ref, imageUrl) => ProductImagePresenter(imageUrl),
      );
  ```

**Arquivo:** `product_image_view.dart`

**Classe:** `ProductImageView` (ConsumerWidget)

- **Props**:
  - `imageUrl`: `String`
  - `size`: `double` (opcional, default: 100)

- **Visual**:
  - Container com tamanho fixo (`size x size`)
  - `ClipRRect` para bordas arredondadas
  - Condicional baseado no Presenter:
    - Se `isLoading`: `CircularProgressIndicator`
    - Se `hasError`: `Icon(Icons.image_not_supported)`
    - Caso contrário: `Image.network` com `fit: BoxFit.cover`

**Arquivo:** `index.dart`
```dart
import 'product_image_view.dart';
typedef ProductImage = ProductImageView;
```

---

###### 3. `widgets/add-to-cart-button/`

**Arquivo:** `add_to_cart_button_presenter.dart`

**Classe:** `AddToCartButtonPresenter`

- **Dependências**:
  - `onAddToCart`: `VoidCallback` - callback externo

- **Estado reativo**:
  - `isLoading`: `signal<bool>(false)` - feedback visual durante ação

- **Métodos**:
  - `handlePress()`: Seta `isLoading.value = true`, executa callback, seta `isLoading.value = false`

- **Provider**:
  ```dart
  final addToCartButtonPresenterProvider = Provider.autoDispose
      .family<AddToCartButtonPresenter, VoidCallback>(
        (ref, onAddToCart) => AddToCartButtonPresenter(onAddToCart),
      );
  ```

**Arquivo:** `add_to_cart_button_view.dart`

**Classe:** `AddToCartButtonView` (ConsumerWidget)

- **Props**:
  - `onAddToCart`: `VoidCallback`

- **Visual**:
  - Container clicável com `GestureDetector` ou `IconButton`
  - Cor de fundo: azul primário
  - Condicional:
    - Se `presenter.isLoading.value`: `CircularProgressIndicator` pequeno
    - Caso contrário: `Icon(Icons.shopping_cart)`, cor branca
  - Tamanho compacto (ex: 36x36)
  - `BorderRadius` circular

**Arquivo:** `index.dart`
```dart
import 'add_to_cart_button_view.dart';
typedef AddToCartButton = AddToCartButtonView;
```

---

###### 4. `widgets/product-info/`

**Arquivo:** `product_info_presenter.dart`

**Classe:** `ProductInfoPresenter`

- **Dependências** (via construtor):
  - `skuCode`: `String`
  - `brandName`: `String`
  - `productName`: `String`
  - `salePrice`: `double`
  - `discountPrice`: `double`

- **Computed**:
  - `hasDiscount`: `computed(() => discountPrice < salePrice)`
  - `formattedSalePrice`: `computed(() => formatCurrency(salePrice))`
  - `formattedDiscountPrice`: `computed(() => formatCurrency(discountPrice))`
  - `displayPrice`: `computed(() => hasDiscount.value ? formattedDiscountPrice.value : formattedSalePrice.value)`

- **Métodos auxiliares**:
  - `formatCurrency(double value)`: Formata para "R$ 169,28" usando `NumberFormat.currency`

- **Provider**:
  ```dart
  final productInfoPresenterProvider = Provider.autoDispose
      .family<ProductInfoPresenter, ({String skuCode, String brandName, String productName, double salePrice, double discountPrice})>(
        (ref, props) => ProductInfoPresenter(
          skuCode: props.skuCode,
          brandName: props.brandName,
          productName: props.productName,
          salePrice: props.salePrice,
          discountPrice: props.discountPrice,
        ),
      );
  ```

**Arquivo:** `product_info_view.dart`

**Classe:** `ProductInfoView` (ConsumerWidget)

- **Props** (mesmas do Presenter):
  - `skuCode`, `brandName`, `productName`, `salePrice`, `discountPrice`

- **Layout** (`Column` com `CrossAxisAlignment.start`):

  1. **SKU Label**:
     - Texto: "SKU: {skuCode}"
     - Cor: azul primário
     - FontSize: pequeno (12-14sp)

  2. **Brand Label**:
     - Texto: `brandName` (uppercase opcional)
     - Cor: cinza (`Colors.grey`)
     - FontSize: pequeno (12sp)

  3. **Product Name**:
     - Texto: `productName`
     - Cor: texto padrão (preto/dark)
     - FontSize: médio (14-16sp)
     - `maxLines: 2`, `overflow: TextOverflow.ellipsis`

  4. **Price Section** (`Row` ou `Column`):
     - **Preço atual**: 
       - Texto: `presenter.displayPrice.value`
       - Cor: azul primário
       - FontSize: grande (18-20sp), `fontWeight: FontWeight.bold`
     - **Preço original** (condicional via `presenter.hasDiscount.value`):
       - Texto: `presenter.formattedSalePrice.value`
       - Cor: cinza
       - FontSize: pequeno (12-14sp)
       - `TextDecoration.lineThrough`

**Arquivo:** `index.dart`
```dart
import 'product_info_view.dart';
typedef ProductInfo = ProductInfoView;
```

---

## O que deve ser modificado?

### CatalogService Interface

**Arquivo:** `lib/core/catalog/interfaces/catalog_service.dart`

- **Modificar** assinatura de `fetchProducts()` para suportar paginação:
  ```dart
  Future<RestResponse<PaginationResponse<ProductDto>>> fetchProducts({int page = 1});
  ```

### YampiCatalogService

**Arquivo:** `lib/rest/yampi/services/yampi_catalog_service.dart`

- **Modificar** `fetchProducts()` para aceitar parâmetro `page`:
  ```dart
  @override
  Future<RestResponse<PaginationResponse<ProductDto>>> fetchProducts({int page = 1}) async {
    final response = await super.restClient.get(
      '/catalog/products?include=skus,brand,images,texts&page=$page',
    );
    // ...
  }
  ```

---

## Usar como referência

| Padrão | Arquivo de Referência |
|--------|----------------------|
| Estrutura MVP (View + Presenter) | `lib/ui/catalog/widgets/screens/catalog/products-list/` |
| Uso de Signals com futureSignal | `products_list_presenter.dart` |
| Barrel pattern (index.dart) | `lib/ui/catalog/widgets/screens/catalog/products-list/index.dart` |
| Injeção de dependência via Provider | `products_list_presenter.dart` → `presenterProvider` |
| Mapeamento de DTOs | `lib/rest/yampi/mappers/yampi_product_mapper.dart` |

---

## Resumo de Arquivos

### Arquivos criados (AS BUILT):

**ProductCard (principal):**
1. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/index.dart`
2. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product_card_view.dart`
3. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product_card_presenter.dart`
4. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product_card_skeleton.dart` *(adicionado)*
5. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product_card_skeleton_presenter.dart` *(adicionado)*

**Sub-widget DiscountBadge:**
6. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/discount-badge/index.dart`
7. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/discount-badge/discount_badge_view.dart`
8. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/discount-badge/discount_badge_presenter.dart`

**Sub-widget ProductImage:**
9. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product-image/index.dart`
10. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product-image/product_image_view.dart`
11. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product-image/product_image_presenter.dart`

**Sub-widget AddToCartButton:**
12. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/add-to-cart-button/index.dart`
13. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/add-to-cart-button/add_to_cart_button_view.dart`
14. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/add-to-cart-button/add_to_cart_button_presenter.dart`

**Sub-widget ProductInfo:**
15. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product-info/index.dart`
16. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product-info/product_info_view.dart`
17. `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product-info/product_info_presenter.dart`

**ProductSkeleton (helper):**
18. `lib/ui/catalog/widgets/screens/catalog/products-list/product-skeleton/index.dart` *(adicionado)*

### Arquivos modificados:
1. `lib/ui/catalog/widgets/screens/catalog/products-list/products_list_presenter.dart` ✅
2. `lib/ui/catalog/widgets/screens/catalog/products-list/product_list_view.dart` ✅
3. `lib/core/catalog/interfaces/catalog_service.dart` ✅
4. `lib/rest/yampi/services/yampi_catalog_service.dart` ✅

> **Nota**: A estrutura final difere do planejamento. Os sub-widgets foram organizados diretamente em `product-card/` sem pasta `widgets/` intermediária. Foi adicionado suporte a skeleton loading.

