# Spec para a navegação por tab

## Objetivo

Implementar uma navegação por abas (Tab Navigation) persistente na aplicação, permitindo que o usuário alterne entre as principais seções (Home, Busca/Produtos, Carrinho, Pedidos) sem perder o estado de cada tela.

## Referência Visual

A barra de navegação segue este design customizado:

**Layout:**
- **Posição**: Fixa na parte inferior da tela
- **Fundo**: Branco com sombra sutil
- **Espaçamento**: 24px horizontal, 16px vertical

**Ícones:**
- Home: `home_outlined`
- Busca: `search`
- Carrinho: `shopping_cart_outlined`
- Pedidos: `shopping_bag_outlined`

**Container dos Ícones:**
- **Tamanho**: 56x56px
- **Borda**: 2px sólida na cor primária (azul)
- **Border Radius**: 12px
- **Ícone**: 28px

**Estados:**
- **Ativo**: 
  - Fundo preenchido com cor primária (azul)
  - Ícone branco
  - Borda azul
- **Inativo**: 
  - Fundo transparente
  - Ícone azul
  - Borda azul

## Arquitetura e Roteamento

Utilizaremos o `StatefulShellRoute` do `GoRouter` para gerenciar a navegação aninhada com preservação de estado.

### 1. Rotas
Serão definidas as seguintes rotas em `lib/constants/routes.dart`:

| Rota | Caminho | Tela | Descrição |
|Data | Path | Screen | Description |
|---|---|---|---|
| `home` | `/` | `HomeScreen` | Tela inicial (Dashboard/Destaques) |
| `catalog` | `/catalog` | `CatalogScreen` | Pesquisa e listagem produto |
| `cart` | `/cart` | `CartScreen` | Carrinho de compras |
| `orders` | `/orders` | `OrdersScreen` | Histórico de pedidos |

### 2. Estrutura de Pastas Atual

A estrutura de pastas implementada segue a organização por domínio:
- `lib/ui/global/layout/widgets/app_layout.dart`: Widget Shell com `BottomNavigationBar`
- `lib/ui/global/widgets/screens/home/`: Tela inicial (Home)
- `lib/ui/catalog/widgets/screens/catalog/`: Tela de catálogo de produtos
- `lib/ui/checkout/widgets/screens/cart/`: Tela do carrinho de compras
- `lib/ui/checkout/widgets/screens/orders/`: Tela de histórico de pedidos

## Componentes a Criar

### Widget `AppLayout`
Este widget será o "Shell" da aplicação.
- Receberá o `statefulNavigationShell` do GoRouter.
- Implementará o `BottomNavigationBar` (ou componente equivalente do `shadcn_flutter` se disponível, ou customizado).
- Lógica de navegação: `navigationShell.goBranch(index)`.

### Telas (Placeholders)
Para viabilizar a navegação imediata, criar versões básicas ("Scaffolding") das telas que ainda não existem:
- `CatalogScreen`
- `CartScreen`
- `OrdersScreen`

## Plano de Implementação

1.  **Definir Rotas**: Adicionar as constates em `Routes`.
2.  **Criar Telas**: Criar os arquivos básicos para Catalog, Cart e Orders com um Scaffold simples e título.
3.  **Criar AppLayout**: Implementar o widget com a barra de navegação baseada no design.
4.  **Configurar Router**:
    - Refatorar `router.dart` para usar `StatefulShellRoute.indexedStack`.
    - Definir os `branches` para cada aba.
5.  **Testar**: Verificar a navegação entre abas e a persistência do estado (ex: scrolar uma lista, mudar de aba e voltar).

## Status de Implementação

✅ **CONCLUÍDO** - 19/01/2026

Todos os itens do plano de implementação foram executados com sucesso:

1. ✅ **Rotas Definidas** - `lib/constants/routes.dart`
2. ✅ **Telas Criadas** - Placeholders funcionais para Catalog, Cart e Orders
3. ✅ **AppLayout Implementado** - Design customizado seguindo referência visual
4. ✅ **Router Configurado** - `StatefulShellRoute.indexedStack` com 4 branches
5. ✅ **Testado** - Navegação funcionando com hot reload em 735ms

**Arquivos Criados/Modificados:**
- `lib/constants/routes.dart`
- `lib/ui/global/widgets/layout/app_layout.dart`
- `lib/ui/global/widgets/screens/home/` (movido de catalog)
- `lib/ui/catalog/widgets/screens/catalog/`
- `lib/ui/checkout/widgets/screens/cart/`
- `lib/ui/checkout/widgets/screens/orders/`
- `lib/router.dart`
