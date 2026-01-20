# Spec: Busca de Produtos (SearchBar)

## 1. Objetivo
Implementar a funcionalidade de busca textual de produtos com design específico. Na **Home Screen**, a barra de busca servirá como atalho de navegação para a **Catalog Screen**. Na **Catalog Screen**, a barra de busca filtrará a listagem de produtos.

## 2. O que já existe?
*   **Serviços**:
    *   `lib/core/catalog/interfaces/catalog_service.dart`: Interface de busca de produtos.
    *   `lib/rest/yampi/services/yampi_catalog_service.dart`: Implementação da API.
*   **Presenters**:
    *   `lib/ui/catalog/widgets/screens/catalog/products-list/products_list_presenter.dart`: Gerencia o estado da lista de produtos.
*   **Views**:
    *   `lib/ui/global/widgets/screens/home/home_screen_view.dart`: Tela inicial.
    *   `lib/ui/catalog/widgets/screens/catalog/catalog_screen_view.dart`: Tela de catálogo.
*   **NavigationDriver**:
    *   GoRouterNavigationDriver.

## 3. O que deve ser criado?

### Camada UI (Global)
### Camada UI (Global)
*   **`lib/ui/global/widgets/app-search-bar/`**:
    *   Refatorado para padrão MVP (`AppSearchBarView` + `AppSearchBarPresenter`).
    *   **Estrutura Visual**:
        *   **Header Interno**:
            *   Ícone de Menu (Ghost Button) à esquerda.
            *   Logo Sertton (Image Asset) à direita.
        *   **Label Superior**: "PROCURAR PRODUTO".
        *   **Área de Input**: TextField expandido + Botão de Busca (Azul).
    *   **Props Atualizadas**:
        *   `readOnly` (bool): Usado para controlar comportamento (submit direto ou via presenter).
        *   `onTap` (VoidCallback): Callback opcional.
        *   `onSubmitted` (Function(String)): Dispara a busca.
        *   `initialValue` (String?): Valor inicial do campo.
        *   `autoFocus` (bool): Foco automático.
        *   `onChanged` (ValueChanged<String>?): Para detectar limpeza do campo.

## 4. O que deve ser modificado?

### Camada Core & Rest
*   **`CatalogService` (Interface)**:
    *   Adicionado parâmetro `String? query` no método `fetchProducts`.
*   **`YampiCatalogService` (Implementação)**:
    *   Mapeamento do parâmetro `query` para `q` na API Yampi.
*   **`NavigationDriver`**:
    *   Suporte a envio de dados complexos (`extra/data`) na navegação.

### Camada UI - Home
*   **`HomeScreenView`**:
    *   Inserido `AppSearchBar` no topo.
    *   **Comportamento**: Campo editável (não `readOnly`).
    *   **Ação**: Ao submeter (`onSubmitted`), navega para `/catalog` enviando o termo digitado e flag `focusSearch`.

### Camada UI - Catalog
*   **`ProductsListPresenter`**:
    *   Estado `query` (Signal) adicionado para filtrar listagem.
*   **`CatalogScreenView`**:
    *   Recebe parâmetros `focusSearch` e `initialQuery` via rota.
    *   **Lógica**:
        *   Se `initialQuery` vier preenchido, dispara busca automaticamente.
        *   Se o campo for limpo (`onChanged` vazio), dispara busca vazia para recarregar tudo.

## 5. O que deve ser removido?
*   N/A

## 6. Referências
*   PRD da Home Screen (`documentation/features/global/home-screen/prd.md`).
*   Mockup Visual ("PROCURAR PRODUTO").
