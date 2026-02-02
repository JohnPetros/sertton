# Spec: Componentes de Informação do Produto

## 1. Objetivo

Implementar os componentes visuais essenciais para a exibição de informações do produto na Tela de Detalhes do Produto (PDP). O objetivo é fornecer widgets modulares, seguindo o padrão **MVP (Model-View-Presenter)**, que reagem ao SKU selecionado para exibir:

1.  **Imagens**: Visualização da imagem principal com funcionalidade de zoom.
2.  **Identificação**: Código SKU e Nome do Produto.
3.  **Precificação**: Preço original, preço com desconto e badge.
4.  **Descrição**: Descrição detalhada e especificações técnicas do produto.

Além disso, esta spec cobre:
*   A promoção do widget `DiscountBadge` (atualmente no ProductCard) para um componente compartilhado do módulo de catálogo.
*   A definição da dependência do Service para busca de dados (embora a implementação da *Tela* completa seja outra tarefa, os componentes devem ser projetados para receber dados que virão deste service).

## 2. O que já existe?

### Camada Core
*   `CatalogService` (`lib/core/catalog/interfaces/catalog_service.dart`): Interface definindo `Future<RestResponse<ProductDto>> fetchProduct(String productId)`.
*   `SkuDto` e `ProductDto`: DTOs contendo os dados necessários.

### Camada UI
*   `DiscountBadge` (`lib/ui/catalog/widgets/screens/catalog/products-list/product-card/discount-badge/`): Widget existente que deve ser refatorado para ser reutilizável.
*   `shadcn_flutter`: Biblioteca base.

## 3. O que deve ser criado?

### Camada UI - Componentes da Tela de Produto

Os novos componentes devem ser criados no diretório `lib/ui/catalog/widgets/screens/product/` (direto no subdiretório do componente). Cada componente deve seguir o padrão MVP (View + Presenter + Index).

#### A. ProductImageViewer

**Diretório:** `lib/ui/catalog/widgets/screens/product/product-image-viewer/`

1.  **`product_image_viewer_presenter.dart`**:
    *   **Props:** `imageUrl` (String), `productName` (String - para acessibilidade/alt).
    *   **Estado:** `isZoomOpen` (Signal<bool>) - controla a visibilidade do modal de zoom.
    *   **Métodos:** `toggleZoom()`.
2.  **`product_image_viewer_view.dart`**:
    *   Exibe a imagem usando `Image.network`.
    *   Sobrepõe indicação de zoom ("Toque para ampliar").
    *   Abre Dialog/Modal com `InteractiveViewer` quando clicado.
3.  **`index.dart`**: Exportação.

#### B. ProductHeader

**Diretório:** `lib/ui/catalog/widgets/screens/product/product-header/`

1.  **`product_header_presenter.dart`**:
    *   **Props:** `skuCode` (String), `title` (String).
    *   **Computed:** Formatação do código SKU (ex: adicionar prefixo "SKU: ").
2.  **`product_header_view.dart`**:
    *   Exibe SKU (destaque/cor primária) e Título (H2).
    *   Layout vertical simples.
3.  **`index.dart`**: Exportação.

#### C. ProductPricing

**Diretório:** `lib/ui/catalog/widgets/screens/product/product-pricing/`

1.  **`product_pricing_presenter.dart`**:
    *   **Props:** `originalPrice` (double), `currentPrice` (double).
    *   **Computed:**
        *   `hasDiscount`: `originalPrice > currentPrice`.
        *   `formattedOriginalPrice`: String formatada (R$).
        *   `formattedCurrentPrice`: String formatada (R$).
2.  **`product_pricing_view.dart`**:
    *   Usa o componente compartilhado **`DiscountBadge`**.
    *   Exibe preços com estilos diferenciados (riscado para original, destaque para atual).
3.  **`index.dart`**: Exportação.

#### D. ProductDescription

**Diretório:** `lib/ui/catalog/widgets/screens/product/product-description/`

1.  **`product_description_presenter.dart`**:
    *   **Props:** `product` (ProductDto).
    *   **Estado:** Sinais para `description` e `specifications`.
2.  **`product_description_view.dart`**:
    *   Exibe seções de "Descrição do produto" e "Especificações técnicas".
    *   Aplica formatação básica para tags HTML (ex: `<br>`, `<p>`, `<li>`).
    *   Utiliza alinhamento justificado para descrição e alinhamento à esquerda para especificações.
3.  **`index.dart`**: Exportação.

## 4. O que deve ser modificado?

### Camada UI - Refatoração para Componentes Compartilhados

#### A. Refatorar DiscountBadge

**Origem:** `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/discount-badge/`
**Destino:** `lib/ui/catalog/widgets/components/discount-badge/`

1.  **Mover** a pasta `discount-badge` para o diretório de componentes reutilizáveis (`lib/ui/catalog/widgets/components/`).
2.  **Ajustar Imports**: Atualizar as referências no `ProductCardView` (`lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product_card_view.dart`) e `index.dart` do ProductCard para apontar para o novo local.
3.  Garantir que o `DiscountBadge` continue seguindo MVP (já segue).

#### B. Modificar ProductCard (Navegação)

**Arquivo:** `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product_card_presenter.dart`

1.  **Dependência:** Injetar `NavigationDriver` no Presenter (interface `lib/core/global/interfaces/navigation_driver.dart`). Lembre-se que o `GoRouterNavigationDriver` é a implementação, mas o presenter deve depender da abstração.
2.  **Método:** Criar método `void navigateToProductDetails()` que chama `navigationDriver.goTo('/catalog/${product.id}')`.
3.  **View:** No `ProductCardView` (`lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product_card_view.dart`), implementar o `onTap` do `GestureDetector` para chamar `presenter.navigateToProductDetails()`.

### Camada REST

Ao implementar a tela completa que usa esses widgets, deve-se usar `YampiCatalogService` (implementação de `CatalogService`) para buscar os dados via `fetchProduct`.

## 5. O que deve ser removido?

*   A pasta antiga `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/discount-badge/` após a movimentação.

## 6. Usar como referência

*   **CatalogService**: Para tipos de retorno e integração futura.
*   **ProductCardPresenter**: Lógica existente de tratamento de preços.
*   **MVP Guidelines**: Seguir estritamente `ui-layer-guidelines.md`.
