## 🐛 Bug Report: App Search Bar Inoperante e Duplicado

**Problema Identificado:**
A barra de pesquisa não realiza busca ao pressionar enter/submit nas telas de Carrinho, Pedidos e Produto. Além disso, na Home Screen, a barra aparece duplicada (no cabeçalho e no corpo) e a do cabeçalho não funciona.

**Causas Prováveis:**
Nas telas afetadas, o widget `AppSearchBar` está sendo instanciado dentro do `AppBar` sem fornecer o callback obrigatório `onSubmitted`. O `AppSearchBarerPresenter` ignora submissões quando `onSubmitted` é nulo e `readOnly` é false (padrão). A duplicação na Home ocorre porque o widget foi adicionado tanto ao `headers` do `Scaffold` quanto ao corpo do `SingleChildScrollView`.

**Partes do Sistema Relacionadas:**

### UI
- `lib/ui/global/widgets/screens/home/home_screen_view.dart`
- `lib/ui/checkout/widgets/screens/cart/cart_screen_view.dart`
- `lib/ui/checkout/widgets/screens/orders/orders_screen_view.dart`
- `lib/ui/catalog/widgets/screens/product/product_screen_view.dart`

**Soluções Propostas:**

### UI
- [ ] **Home Screen:** Remover o `AppSearchBar` do `AppBar` (headers), mantendo apenas a versão funcional que já existe no corpo da página, eliminando a redundância e o componente inoperante.
- [ ] **Cart Screen:** Adicionar o parâmetro `onSubmitted` ao `AppSearchBar` no `AppBar`, implementando a navegação para a tela de Catálogo com o termo pesquisado.
- [ ] **Orders Screen:** Adicionar o parâmetro `onSubmitted` ao `AppSearchBar` no `AppBar`, implementando a navegação para a tela de Catálogo com o termo pesquisado.
- [ ] **Product Screen:** Adicionar o parâmetro `onSubmitted` ao `AppSearchBar` no `AppBar`, implementando a navegação para a tela de Catálogo com o termo pesquisado.
