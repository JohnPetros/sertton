# Plano para o Widget de Listagem de Produtos

## 1. Objetivo
Implementar o widget de listagem de produtos (`ProductsList`) na tela de catálogo, suportando paginação infinita (infinite scroll) e exibição de cards de produtos (`ProductCard`).

## 2. O que já existe?

### Camada Core
- `lib/core/catalog/interfaces/catalog_service.dart`: Interface do serviço de catálogo.
- `lib/core/catalog/dtos/product_dto.dart`: DTO representando os dados do produto.
- `lib/core/global/responses/cursor_pagination_response.dart`: Wrapper para respostas paginadas.

### Camada UI
- `lib/ui/catalog/widgets/screens/catalog/catalog_screen_view.dart`: Tela principal onde a lista será inserida.

### Camada Rest
- `lib/rest/yampi/services/yampi_catalog_service.dart`: Implementação do serviço de catálogo.

## 3. O que deve ser criado?

### Camada UI

#### Widget ProductsList
- **Diretório**: `lib/ui/catalog/widgets/lists/products_list.dart` (Criar diretório `lists` se não existir)
- **Responsabilidade**: Exibir grid de produtos com scroll infinito.
- **Dependências**: `ProductsListPresenter`.
- **Comportamento**:
    - Deve chamar o presenter para carregar dados iniciais.
    - Deve usar um `NotificationListener<ScrollNotification>` ou similar para detectar fim da lista e solicitar próxima página.
    - Deve exibir *loading* no final da lista enquanto carrega mais itens.
    - Deve exibir mensagem de erro se falhar.

#### Widget ProductCard
- **Diretório**: `lib/ui/catalog/widgets/cards/product_card.dart` (Criar diretório `cards` se não existir)
- **Responsabilidade**: Componente visual para exibir um único produto.
- **Props**: `required ProductDto product`.
- **UI**:
    - Imagem (`product.imageUrl`) com `AspectRatio`.
    - Nome do produto (`product.name`) com `Text` truncado se necessário.
    - Nome da marca (`product.brand.name`).
    - Estilização usando `shadcn_flutter` (ex: `Card` widget).

#### Presenter ProductsListPresenter
- **Diretório**: `lib/ui/catalog/widgets/lists/products_list_presenter.dart`
- **Responsabilidade**: Lógica de negócio da listagem.
- **Estado (Signals)**:
    - `products`: `ListSignal<ProductDto>` (lista acumulada).
    - `isLoading`: `Signal<bool>`.
    - `error`: `Signal<String?>`.
    - `_nextCursor`: `String?` (controle interno).
- **Métodos**:
    - `fetchProducts()`:
        - Verifica se já está carregando ou se não tem mais páginas (cursor null após primeira carga).
        - Chama `_catalogService.fetchProducts(cursor: _nextCursor)`.
        - Em sucesso: adiciona novos produtos à lista existente e atualiza `_nextCursor`.
        - Em falha: define sinal de erro.

### Camada Rest

#### Class YampiProductMapper
- **Diretório**: `lib/rest/yampi/mappers/yampi_product_mapper.dart`
- **Responsabilidade**: Converter JSON da API Yampi para `ProductDto`.
- **Métodos**:
    - `static ProductDto toDto(Map<String, dynamic> map)`: Mapear campos como `id`, `name`, `images`, etc.


## 4. O que deve ser modificado?

### Camada Core

#### Interface CatalogService
- **Arquivo**: `lib/core/catalog/interfaces/catalog_service.dart`
- **Alteração**: Adicionar parâmetro opcional `cursor` ao método `fetchProducts`.
    ```dart
    Future<RestResponse<CursorPaginationResponse<ProductDto>>> fetchProducts({String? cursor});
    ```

### Camada Rest

#### Class YampiCatalogService
- **Arquivo**: `lib/rest/yampi/services/yampi_catalog_service.dart`
- **Alteração**: Implementar o uso do `cursor` na requisição HTTP.
    - Assumindo paginação por número de página, mapear `cursor` (string) para query param `page`.
    - Se `cursor` for nulo, padrão é página 1.
    - Utilizar `YampiProductMapper.toDto` para converter os resultados.
    ```dart
    @override
    Future<RestResponse<CursorPaginationResponse<ProductDto>>> fetchProducts({String? cursor}) async {
      final response = await super.restClient.get(
        '/products',
        queryParameters: {
          if (cursor != null) 'page': cursor,
          'limit': 20,
          'include': 'images,skus,brand', // Incluir relacionamentos necessários
        },
      );

      return response.mapBody((body) {
        final data = body['data'] as List;
        final meta = body['meta']['pagination'];
        
        final products = data
            .map((e) => YampiProductMapper.toDto(e))
            .toList();

        final nextPage = meta['links']['next'] != null 
            ? (meta['current_page'] + 1).toString() 
            : null;

        return CursorPaginationResponse(
          items: products,
          nextCursor: nextPage,
        );
      });
    }
    ```

## 5. Referências
- Documentação Yampi (Listar Produtos): https://docs.yampi.com.br/api-reference/catalogo/produtos/listar-produtos
