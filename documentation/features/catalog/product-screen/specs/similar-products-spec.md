# Spec: Seção de Produtos Relacionados

## Objetivo
Implementar a seção de produtos relacionados na tela de detalhes do produto (PDP), exibindo uma lista horizontal de itens similares para incentivar a navegação e aumentar o ticket médio. O layout e comportamento devem seguir o padrão visual estabelecido na seção de coleções da tela Home.

## O que já existe?

### Camada Core (DTOs e Interfaces)
- **CatalogService** (`lib/core/catalog/interfaces/catalog_service.dart`): Interface de serviço que já define o método `fetchSimiliarProducts`.
- **ProductDto** (`lib/core/catalog/dtos/product_dto.dart`): Modelo de dados do produto.

### Camada UI (Widgets)
- **ProductCard** (`lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product_card_view.dart`): Componente reutilizável para exibição de produtos, suportando layout em coluna.
- **MarketingCollectionView** (`lib/ui/global/widgets/screens/home/marketing-section/marketing-collection/marketing_collection_view.dart`): Referência visual e estrutural para listas horizontais de produtos.
- **ProductScreen** (`lib/ui/catalog/widgets/screens/product/product_screen_view.dart`): Tela onde a nova seção será inserida.

### Camada REST

- **YampiCatalogService** (`lib/rest/yampi/services/yampi_catalog_service.dart`): Implementado o método `fetchSimiliarProducts`

## O que deve ser criado?

### Camada UI

*   **SimilarProductsSection** (`lib/ui/catalog/widgets/screens/product/related-products/related_products_section_view.dart`):
    *   Widget responsável por exibir o título "Produtos relacionados" e o carrossel horizontal.
    *   Deve tratar estados de carregamento (utilizando skeleton) e lista vazia (ocultar seção).
    *   Deve utilizar `ProductCard` com largura fixa (igual ao da Home, ex: 200px) e `isColumn: true`.
    *   Título deve usar tipografia `h4` com `FontWeight.bold`, consistente com a Home.

*   **SimilarProductsPresenter** (`lib/ui/catalog/widgets/screens/product/related-products/related_products_presenter.dart`):
    *   Gerenciador de estado (via `signals`) para a lista de produtos relacionados.
    *   Deve chamar `catalogService.fetchSimiliarProducts(productId)` na inicialização.
    *   Deve expor o estado de carregamento e a lista de produtos.

## O que deve ser modificado?

### Camada UI

*   **ProductScreenView** (`lib/ui/catalog/widgets/screens/product/product_screen_view.dart`):
    *   Inserir o widget `RelatedProductsSection` no final do `SingleChildScrollView` (ou estrutura equivalente), após as especificações técnicas.

## O que deve ser removido?
Não se aplica.

## Usar como referência
*   `lib/ui/global/widgets/screens/home/marketing-section/marketing-collection/marketing_collection_view.dart`: Copiar a estrutura do `ListView.separated` horizontal e uso de skeletons.

## Diagramas de Visualização

### Fluxo de Carregamento

