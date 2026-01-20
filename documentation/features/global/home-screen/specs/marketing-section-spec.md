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

- **Widget `MarketingSection`**: Widget container principal.
    - Responsável por consumir o `MarketingSectionPresenter`.
    - Renderiza o layout combinando Banners e Coleções.
- **Presenter `MarketingSectionPresenter`**:
    - Gerencia o estado da seção (loading, data, error).
    - Orquestra chamadas para buscar banners e coleções.
- **Widget `MarketingBanner`**:
    - Exibe a imagem do banner.
    - Deve ser não clicável.
- **Widget `MarketingCollection`**:
    - Exibe o título da coleção.
    - Exibe lista horizontal de `ProductCard` (reutilizar widget existente) com scroll horizontal fluido.

### Camada Rest
**Localização:** `lib/rest/yampi/mappers/`

- **Mapper `YampiCollectionMapper`**:
    - Responsável por transformar a resposta JSON da API em `CollectionDto`.

## O que deve ser modificado?

### Camada Rest
- **`YampiCatalogService`** (`lib/rest/yampi/services/yampi_catalog_service.dart`):
    - Implementar o método `fetchCollections()`.
    - Implementar o método `fetchProductsByCollection(String collectionId)` (se necessário para carregar produtos sob demanda, ou garantir que `fetchCollections` já traga produtos).

### Camada UI
- **`HomeScreen`** (`lib/ui/global/widgets/screens/home/home_screen_view.dart`):
    - Adicionar o widget `MarketingSection` na estrutura da tela (provavelmente dentro de um `CustomScrollView` ou `SingleChildScrollView`).

## O que deve ser removido?
- N/A

## Usar como referência
- `ProductsList` para listagem de produtos.
- `CatalogScreen` para estrutura de presenter/view.

