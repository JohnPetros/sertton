## 🐛 Bug Report: App Search Bar Inoperante e Duplicado

**Problema Identificado:**
A barra de pesquisa não realiza busca ao pressionar enter/submit nas telas de Carrinho, Pedidos e Produto. Além disso, na Home Screen, a barra aparece duplicada (no cabeçalho e no corpo) e a do cabeçalho não funciona.

**Causas:**
1. **Falta de Callback de Submissão:** O componente `AppSearchBar` é instanciado nas AppBars das telas (`Cart`, `Orders`, `Product`, `Home`) sem fornecer o callback `onSubmitted`. O `AppSearchBarPresenter` ignora a submissão se este callback for nulo.
2. **Violação de SRP no AppSearchBar:** O `AppSearchBarView` contém elementos de layout (Logo, Menu Button, Label "PROCURAR PRODUTO") acoplados ao campo de input. Isso dificulta a reutilização limpa na AppBar (onde esses elementos podem ser redundantes ou indesejados) e causa a aparência "duplicada" ou estranha.
3. **Logica de Navegação Ausente:** As telas afetadas não possuem a lógica de redirecionamento para o catálogo com o termo de busca.

**Contexto e Análise:**
### Camada UI

- Arquivo: `lib/ui/global/widgets/app-search-bar/app_search_bar_view.dart`
- Diagnóstico: O widget inclui `Row` com Logo e Menu Button e text "PROCURAR PRODUTO" hardocded, além de não impor a obrigatoriedade ou fallback para `onSubmitted`.

- Arquivo: `lib/ui/global/widgets/app-search-bar/app_search_bar_presenter.dart`
- Diagnóstico: O método `submit` apenas executa `onSubmitted?.call(search)`, silenciando a ação se o callback não for passado.

- Arquivo: `lib/ui/global/widgets/screens/home/home_screen_view.dart`
- Diagnóstico: Instancia `AppSearchBar` duas vezes: uma no `AppBar` (sem callback, quebrado) e outra no corpo (com callback, funcionando), causando duplicação visual.

- Arquivo: `lib/ui/checkout/widgets/screens/cart/cart_screen_view.dart` (e similares para Orders/Product)
- Diagnóstico: Instancia `AppBar(title: const AppSearchBar())` sem definir o comportamento de `onSubmitted`.

**Plano de Correção (Spec):**

### 1. O que já existe? (Contexto/Impacto)
- **Camada UI**: 
`AppSearchBarView` - Widget atual da barra de busca.
`HomeScreenView` - Tela principal afetada.
`CartScreenView`, `OrdersScreenView`, `ProductScreenView` - Telas onde a busca não funciona.
`NavigationDriver` - Driver responsável pela navegação (reusar para redirecionar ao Catalog).

### 2. O que deve ser criado?
- **Camada UI**: 
`HomeHeaderView` - Novo componente para encapsular o Logo, Menu e Label que hoje estão dentro da SearchBar. Isso permitirá que a `AppSearchBar` seja apenas a barra de busca.

### 3. O que deve ser modificado?
- **Camada UI**: 
`AppSearchBarView` - **Refatorar**. Remover Logo, Menu e Label estáticos. Manter apenas o `TextField` e o botão de busca. Aceitar, opcionalmente, uma lógica padrão de navegação se `onSubmitted` não for passado (ou forçar quem usa a passar).
`AppSearchBarPresenter` - Adicionar validação ou log se `onSubmitted` for nulo, ou permitir injetar um comportamento padrão de navegação via Provider se desejado (mas o mais limpo é o View passar).
`HomeScreenView` - Remover a `AppSearchBar` do `AppBar` (ou corrigir). Na parte do corpo, substituir o uso direto da `AppSearchBar` pelo novo `HomeHeaderView` que conterá a `AppSearchBar` dentro dele.
`CartScreenView`, `OrdersScreenView`, `ProductScreenView` - Atualizar a chamada do `AppSearchBar` no `AppBar` para passar uma função que usa le o `NavigationDriver` para ir para a tela de Catálogo com o termo pesquisado.

### 4. O que deve ser removido?
- **Camada UI**: 
Código de layout (Logo/Menu) dentro de `AppSearchBarView`.

### Mudanças Realizadas:
1.  **Criação do `CatalogStore`**: Introduzido um store global (Signal-based) para gerenciar o termo de busca e filtros, permitindo a sincronização entre o cabeçalho global e a tela de catálogo sem acoplamento direto entre presenters.
2.  **Criação do `AppHeader`**: Extraído o layout de cabeçalho (Logo, Menu, Label) para um componente global em `lib/ui/global/widgets/app-header/`.
3.  **Refatoração do `AppSearchBar`**: Agora o widget é puramente funcional. O `AppSearchBarPresenter` agora possui um comportamento padrão de navegação para o Catálogo caso nenhum callback de submissão seja fornecido.
4.  **Configuração no `AppLayoutView`**: O `AppHeader` foi injetado na propriedade `headers` do `Scaffold` global, sincronizado com o `CatalogStore`.
5.  **Limpeza de Telas**: Removidos os cabeçalhos manuais e barras de busca duplicadas das telas `Home`, `Cart`, `Orders` e `Product`.
6.  **Sincronização de Deep Linking**: A `CatalogScreenView` agora sincroniza corretamente parâmetros de rota (`initialQuery`, `focusSearch`) com o `CatalogStore` e o cabeçalho.

### Validação Técnica:
- **Análise Estática**: Lint corrigido nas telas de Catálogo e Layout.
- **Testes Unitários**: Testes de `ProductsListPresenter` e `AppSearchBarPresenter` atualizados e validados.
- **Arquitetura**: SRP restaurado e acoplamento reduzido via Global Store.
