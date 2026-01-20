# Spec para seção de marketing na tela Home

## Objetivo
Implementar a seção de marketing na tela Home ("Home Screen"), que serve como a área principal de descoberta e engajamento. Ela deve exibir uma sequência intercalada de banners promocionais e coleções de produtos para maximizar o interesse do usuário. A seção deve ser dinâmica, carregando conteúdo via serviços do catálogo e marketing.

## O que já existe?

### Camada Core (DTOs e Interfaces)
- `MarketingService` (Interface) - `lib/core/marketing/interfaces/marketing_service.dart`
- `CatalogService` (Interface) - `lib/core/catalog/interfaces/catalog_service.dart`
- `BannerDto` - `lib/core/marketing/dtos/banner_dto.dart`
- `CollectionDto` - `lib/core/catalog/dtos/collection_dto.dart`
- `ProductDto` - `lib/core/catalog/dtos/product_dto.dart`

### Camada Rest (Implementações)
- `YampiMarketingService` - `lib/rest/yampi/services/yampi_marketing_service.dart`
- `YampiCatalogService` - `lib/rest/yampi/services/yampi_catalog_service.dart`
- `YampiBannerMapper` - `lib/rest/yampi/mappers/yampi_banner_mapper.dart`

### Camada UI
- `HomeScreen` - `lib/ui/global/widgets/screens/home/home_screen_view.dart`

## O que deve ser criado?

### Camada UI
**Localização:** `lib/ui/global/widgets/screens/home/marketing-section/`

- **Widget `MarketingSectionView`** (MVP): Widget container principal.
    - Responsável por consumir o `MarketingSectionPresenter`.
    - Renderiza layouts de carregamento (Skeletons) e o layout intercalado (Coleção > Banner > Coleção...).
- **Presenter `MarketingSectionPresenter`**:
    - Gerencia o estado da seção (loading, data, error).
    - Orquestra chamadas para buscar banners e metadados de coleções (sem produtos).
- **Sub-Widgets em pastas próprias (MVP)**:
    - **Banner:** `marketing-banner/`
        - `MarketingBannerView`: Exibe a imagem (com suporte a skeleton interno).
        - `MarketingBannerPresenter`: Sanitiza URLs.
        - `MarketingBannerSkeleton`: Estado de carregamento.
    - **Collection:** `marketing-collection/`
        - `MarketingCollectionView`: Exibe título e grid/lista de produtos.
        - `MarketingCollectionPresenter`: Busca produtos sob demanda (`fetchProductsByCollection`).
        - `MarketingCollectionSkeleton`: Estado de carregamento.

### Camada Rest
**Localização:** `lib/rest/yampi/mappers/`

- **Mapper `YampiCollectionMapper`**:
    - Transforma JSON da API em `CollectionDto`.

## O que deve ser modificado?

### Camada Rest
- **`YampiCatalogService`** (`lib/rest/yampi/services/yampi_catalog_service.dart`):
    - Implementar `fetchCollections()` (traz apenas metadados).
    - Implementar `fetchProductsByCollection(id)` (usado pelo widget de coleção).
- **`YampiMarketingService`**:
    - Ajustar endpoint e lógica de filtro/sublist de banners.

### Camada UI
- **`HomeScreenView`** (`lib/ui/global/widgets/screens/home/home_screen_view.dart`):
    - Integrar `MarketingSectionView`.
- **`ProductCard`** (`lib/ui/catalog/widgets/screens/catalog/products-list/product-card/`):
    - Adicionar suporte a layout vertical (`isColumn`).

## O que deve ser removido?
- N/A

## Usar como referência
- `ProductsList` para listagem de produtos.
- `CatalogScreen` para estrutura de presenter/view.