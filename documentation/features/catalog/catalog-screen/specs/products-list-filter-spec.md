# Spec: Filtros da Lista de Produtos

## 1. Objetivo

Implementar filtros para a lista de produtos na tela de catálogo, permitindo filtrar por:
- **Categoria:** seleção única de uma categoria
- **Marcas:** seleção múltipla de marcas

A filtragem será aplicada na requisição à API Yampi através de query parameters.

---

## 2. O que já existe?

### Camada Core

| Recurso | Caminho | Descrição |
|---------|---------|-----------|
| `ProductDto` | `lib/core/catalog/dtos/product_dto.dart` | DTO de produto |
| `CategoryDto` | `lib/core/catalog/dtos/category_dto.dart` | DTO de categoria com `id`, `name`, `description` |
| `BrandDto` | `lib/core/catalog/dtos/brand_dto.dart` | DTO de marca com `id`, `name` |
| `CatalogService` | `lib/core/catalog/interfaces/catalog_service.dart` | Interface de serviço de catálogo |
| `PaginationResponse` | `lib/core/global/responses/pagination_response.dart` | Resposta paginada |

### Camada Rest

| Recurso | Caminho | Descrição |
|---------|---------|-----------|
| `YampiCatalogService` | `lib/rest/yampi/services/yampi_catalog_service.dart` | Implementação do `CatalogService` |
| `YampiCategoryMapper` | `lib/rest/yampi/mappers/yampi_category_mapper.dart` | Mapper de categorias |
| `catalogServiceProvider` | `lib/rest/services.dart` | Provider do serviço de catálogo |

### Camada UI

| Recurso | Caminho | Descrição |
|---------|---------|-----------|
| `CatalogScreenView` | `lib/ui/catalog/widgets/screens/catalog/catalog_screen_view.dart` | Tela de catálogo |
| `ProductsListPresenter` | `lib/ui/catalog/widgets/screens/catalog/products-list/products_list_presenter.dart` | Presenter da lista de produtos |
| `ProductListView` | `lib/ui/catalog/widgets/screens/catalog/products-list/product_list_view.dart` | View da lista de produtos |

---

## 3. O que deve ser criado?

### Camada UI

#### 3.1. Widget `FiltersBar`

**Diretório:** `lib/ui/catalog/widgets/screens/catalog/filters-bar/`

**Arquivos:**
- `filters_bar_view.dart`
- `filters_bar_presenter.dart`
- `index.dart`

**Responsabilidades:**
- Exibir barra horizontal com botões de filtro
- Orquestrar abertura de modais de filtro (categoria e marcas)
- Manter estado dos filtros selecionados via signals
- Notificar mudanças para atualização da lista de produtos

**Signals do Presenter:**
```dart
final selectedCategory = signal<CategoryDto?>(null);
final selectedBrands = signal<List<BrandDto>>([]);
final categories = signal<List<CategoryDto>>([]);
final brands = signal<List<BrandDto>>([]);
```

**Métodos do Presenter:**
- `loadFiltersData()`: Carrega categorias e marcas disponíveis
- `selectCategory(CategoryDto? category)`: Seleciona categoria
- `toggleBrand(BrandDto brand)`: Seleciona/deseleciona marca
- `clearFilters()`: Limpa todos os filtros

**Callback:**
```dart
void Function({String? categoryId, List<String> brandsIds})? onFilterChanged
```

---

#### 3.2. Widget `CategoryFilterModal`

**Diretório:** `lib/ui/catalog/widgets/screens/catalog/filters-bar/category-filter-modal/`

**Arquivos:**
- `category_filter_modal_view.dart`
- `category_filter_modal_presenter.dart`
- `index.dart`

**Responsabilidades:**
- Exibir lista de categorias disponíveis
- Permitir seleção única de categoria
- Opção para limpar seleção ("Todas as categorias")
- Fechar modal ao selecionar

**Props (via construtor):**
- `List<CategoryDto> categories`: Lista de categorias
- `CategoryDto? selectedCategory`: Categoria atualmente selecionada
- `void Function(CategoryDto?) onSelect`: Callback de seleção

---

#### 3.3. Widget `BrandsFilterModal`

**Diretório:** `lib/ui/catalog/widgets/screens/catalog/filters-bar/brands-filter-modal/`

**Arquivos:**
- `brands_filter_modal_view.dart`
- `brands_filter_modal_presenter.dart`
- `index.dart`

**Responsabilidades:**
- Exibir lista de marcas disponíveis com checkboxes
- Permitir seleção múltipla
- Opção para limpar seleção
- Botão de confirmar seleção

**Props (via construtor):**
- `List<BrandDto> brands`: Lista de marcas
- `List<BrandDto> selectedBrands`: Marcas selecionadas
- `void Function(List<BrandDto>) onConfirm`: Callback de confirmação

---

## 4. O que deve ser modificado?

### Camada Core

#### 4.1. Interface `CatalogService`

**Arquivo:** `lib/core/catalog/interfaces/catalog_service.dart`

**Modificações:**
- Adicionar parâmetros opcionais `String? categoryId` e `List<String> brandsIds` ao método `fetchProducts`
- Adicionar método `fetchBrands()` para buscar marcas disponíveis

```dart
abstract class CatalogService {
  Future<RestResponse<PaginationResponse<ProductDto>>> fetchProducts({
    int page = 1,
    String? categoryId,              // NOVO
    List<String> brandsIds = const [], // NOVO
  });
  
  Future<RestResponse<List<BrandDto>>> fetchBrands(); // NOVO
  
  // ... métodos existentes
}
```

---

### Camada Rest

#### 4.2. Service `YampiCatalogService`

**Arquivo:** `lib/rest/yampi/services/yampi_catalog_service.dart`

**Modificações:**
- Atualizar `fetchProducts` para construir query string com filtros
- Implementar `fetchBrands()` para buscar marcas

**Lógica de construção de query parameters (baseada no código JS):**
```dart
String _buildFilterParams({
  String? categoryId,
  List<String> brandsIds = const [],
}) {
  final buffer = StringBuffer();
  
  // Filtro de categoria
  if (categoryId != null) {
    buffer.write('&category_id[]=$categoryId');
  }
  
  // Filtro de marcas (múltiplas)
  for (final brandId in brandsIds) {
    buffer.write('&brand_id[]=$brandId');
  }
  
  return buffer.toString();
}
```

**Método `fetchProducts` atualizado:**
```dart
@override
Future<RestResponse<PaginationResponse<ProductDto>>> fetchProducts({
  int page = 1,
  String? categoryId,
  List<String> brandsIds = const [],
}) async {
  final filterParams = _buildFilterParams(
    categoryId: categoryId,
    brandsIds: brandsIds,
  );
  final response = await super.restClient.get(
    '/catalog/products?include=skus,brand,images,texts$filterParams&page=$page',
  );
  // ... mapBody existente
}
```

---

#### 4.3. Mapper `YampiBrandMapper` (CRIAR)

**Arquivo:** `lib/rest/yampi/mappers/yampi_brand_mapper.dart`

**Responsabilidades:**
- Converter JSON da Yampi para `BrandDto`
- Métodos: `toDto(Json)`, `toDtoList(Json)`

---

### Camada UI

#### 4.4. Presenter `ProductsListPresenter`

**Arquivo:** `lib/ui/catalog/widgets/screens/catalog/products-list/products_list_presenter.dart`

**Modificações:**
- Adicionar signals para armazenar filtros atuais: `categoryId` e `brandsIds`
- Modificar `loadProducts()` e `loadMoreProducts()` para passar filtros
- Adicionar método `applyFilter({String? categoryId, List<String> brandsIds})` que atualiza os filtros e recarrega a lista

```dart
final categoryId = signal<String?>(null);
final brandsIds = signal<List<String>>([]);

void applyFilter({String? categoryId, List<String> brandsIds = const []}) {
  this.categoryId.value = categoryId;
  this.brandsIds.value = brandsIds;
  refresh();
}
```

---

#### 4.5. View `CatalogScreenView`

**Arquivo:** `lib/ui/catalog/widgets/screens/catalog/catalog_screen_view.dart`

**Modificações:**
- Adicionar `FiltersBar` acima da lista de produtos
- Conectar callback de filtro com presenter da lista

```dart
@override
Widget build(BuildContext context) {
  final profider ref.watch(productsListPresenterProvider)
  return Scaffold(
    headers: const [AppBar(title: Text('Catálogo'))],
    child: Column(
      children: [
        FiltersBar(
          onFilterChanged: ({categoryId, brandsIds}) {
            profider.applyFilter(
              categoryId: categoryId,
              brandsIds: brandsIds ?? [],
            );
          },
        ),
        Expanded(child: ProductList()),
      ],
    ),
  );
}
```

---

## 5. Usar como referência

| Recurso | Caminho | Motivo |
|---------|---------|--------|
| `ProductsListPresenter` | `lib/ui/catalog/widgets/screens/catalog/products-list/products_list_presenter.dart` | Estrutura de presenter com signals |
| `ProductListView` | `lib/ui/catalog/widgets/screens/catalog/products-list/product_list_view.dart` | Estrutura de view com ConsumerWidget |
| `YampiCategoryMapper` | `lib/rest/yampi/mappers/yampi_category_mapper.dart` | Estrutura de mapper |
| `YampiCatalogService` | `lib/rest/yampi/services/yampi_catalog_service.dart` | Padrão de implementação de service |

---

## 6. Diagrama de Fluxo

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   FiltersBar    │───▶│ ProductsList    │───▶│  CatalogService │
│   (Presenter)   │    │   (Presenter)   │    │   (Interface)   │
└─────────────────┘    └─────────────────┘    └────────┬────────┘
        │                      │                       │
        │ selectCategory()     │ applyFilter()         │
        │ toggleBrand()        │ loadProducts()        │
        ▼                      ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ CategoryModal   │    │   categoryId    │    │  YampiCatalog   │
│ BrandsModal     │    │   brandsIds     │    │    Service      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
                                               ┌─────────────────┐
                                               │   Yampi API     │
                                               │ ?category_id[]=X│
                                               │ &brand_id[]=Y   │
                                               └─────────────────┘
```