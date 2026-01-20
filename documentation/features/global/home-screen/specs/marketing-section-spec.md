# Spec para seção de marketing na tela Home

## Objetivo

Implementar a seção de marketing na tela Home ("Home Screen"), que serve como a área principal de descoberta e engajamento. Ela deve exibir uma sequência intercalada de banners promocionais e coleções de produtos para maximizar o interesse do usuário.

## Contexto Arquitetural

### Estrutura Existente

#### Camada Core
- **MarketingService** (Interface): Contrato para operações de marketing.
  - `fetchBanners()`: Retorna lista de `BannerDto`.
- **BannerDto**: Dados do banner (id, imagem, link de destino).
- **CatalogService** (Interface): Contrato para operações de catálogo.
  - `fetchCollections()`: Retorna lista de coleções (`CollectionDto`).
  - `fetchProductsByCollection(id)`: Retorna produtos (`ProductDto`) de uma coleção.
- **ProductDto**: Dados resumidos do produto (nome, preço, imagem).
- **CollectionDto**: Dados da coleção (id, título).

#### Camada Rest
- `YampiMarketingService` e `YampiCatalogService`: Implementações concretas.

#### Camada UI
- `HomeScreenPresenter`: Gerencia o estado da home screen.

## Especificação dos Componentes

### 1. Widget `MarketingSection`

Este é o widget orquestrador da seção. Ele deve recompor a lista de itens recebidos do presenter para seguir estritamente o layout definido no PRD.

**Responsabilidades:**
- Receber a lista de `BannerDto` e `CollectionDto` (já populados com produtos ou buscando sob demanda).
- Renderizar a estrutura fixa/intercalada:
  1.  Banner Promocional #1
  2.  Coleção de Produtos #1
  3.  Banner Promocional #2
  4.  Coleção de Produtos #2
- Tratar estados de loading (Skeleton) e erro (ocultar seção ou item específico).

**Lógica de Renderização:**
- Deve garantir que existem pelo menos 2 banners e 2 coleções para preencher o layout ideal.
- Se houver menos itens, adaptar o layout graciosamente (ex: exibir apenas 1 banner e 1 coleção).

**Snippet (Conceitual):**
```dart
Column(
  children: [
    if (banners.isNotEmpty) BannerWidget(banner: banners[0]),
    if (collections.isNotEmpty) CollectionSection(collection: collections[0]),
    if (banners.length > 1) BannerWidget(banner: banners[1]),
    if (collections.length > 1) CollectionSection(collection: collections[1]),
  ],
)
```

### 2. Widget `BannerWidget`

Exibe um banner individual.

**Props:**
- `BannerDto banner`

**UI Specs:**
- **Aspect Ratio**: 16:9 (ou conforme design system).
- **Imagem**: `CachedNetworkImage` com placeholder e tratamento de erro.
- **Interação**: `InkWell`/`GestureDetector`. Ao clicar, deve usar o `GoRouter` ou `url_launcher` dependendo do link do banner (interno vs externo).
- **Bordas**: Arredondadas (Radius.md do theme).

### 3. Widget `CollectionSection`

Exibe o título da coleção e uma lista horizontal de produtos.

**Props:**
- `CollectionDto collection`
- `List<ProductDto> products` (ou `AsyncValue` se o fetch for lazy)

**UI Specs:**
- **Header**: Título da coleção alinhado à esquerda. Fonte `H3` ou similar.
- **Lista**: `ListView.horizontal`.
- **Item**: `ProductCard` (reutilizável do catálogo).
- **Espaçamento**: `Gap(16)` entre itens. Padding horizontal `screenPadding`.

### Integração com Presenter

O `HomeScreenPresenter` deve expor um estado consolidado para a home.

**Estado Sugerido:**
```dart
// Pode ser um objeto composto ou múltiplos signals
final marketingState = signal<AsyncValue<MarketingData>>(...);

class MarketingData {
  final List<BannerDto> banners;
  final List<CollectionWithProducts> collections;
}
```

**Fluxo de Dados:**
1.  `HomeScreen` inicializa.
2.  `Presenter` dispara `fetchBanners()` e `fetchCollections()`.
3.  Para as 2 primeiras coleções retornadas, dispara `fetchProductsByCollection()`.
4.  Agrupa os dados e atualiza o signal.

## Cenários de Borda

- **Falha na API de Banners**: A seção de banners é ocultada, mostrando apenas coleções.
- **Falha na API de Coleções**: A seção de coleções é ocultada.
- **Sem dados**: Se nada retornar, a `MarketingSection` renderiza um `SizedBox.shrink()`.
- **Navegação**: O clique no banner deve saber diferenciar links internos (`/product/123`) de deep links.
