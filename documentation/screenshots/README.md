# Referências visuais

As capturas deste diretório são organizadas por implementação, plataforma, tela e estado:

```text
screenshots/
└── flutter/
    └── android/
        ├── home/
        ├── catalog/
        ├── cart/
        ├── orders/
        ├── product/
        ├── drawer/
        └── institutional/
```

As imagens atuais representam o aplicativo Flutter no Android e formam o baseline visual inicial para a implementação React Native. Futuras referências devem seguir `react-native/<plataforma>/<tela>/<tela>-screen-<estado>.png` sem sobrescrever o baseline Flutter.

## Correspondência com a implementação

| Diretório | Rota Expo Router | Widget React Native | Conteúdo registrado |
| --- | --- | --- | --- |
| `home/` | `/(main)/(tabs)` | `HomeScreen` | coleção de produtos, banner, newsletter e meios de pagamento |
| `catalog/` | `/(main)/(tabs)/catalog` | `CatalogScreen` | lista de produtos e dialogs de categoria/marca |
| `cart/` | `/(main)/(tabs)/cart` | `CartScreen` | estados vazio e preenchido com resumo |
| `orders/` | `/(main)/(tabs)/orders` | `OrdersScreen` | formulário de documento, lista e pedido expandido |
| `product/` | `/(main)/(tabs)/catalog/[productId]` | `ProductScreen` | overview, compra, especificações, similares e seletor de material |
| `drawer/` | shell de `/(main)` | `AppDrawer` | Drawer aberto, contatos, links institucionais e versão do aplicativo |
| `institutional/` | `/institutional/privacy`, `/institutional/terms`, `/institutional/return` e `/institutional/about` | `PrivacyScreen`, `TermsScreen`, `ReturnScreen` e `AboutScreen` | conteúdo institucional e estado expandido dos termos |

## Convenção de nomes

- Usar `kebab-case`.
- Começar pelo widget/tela correspondente: `<tela>-screen-*`.
- Terminar com o estado ou seção observável: `empty-state`, `product-list`, `purchase-section`, `*-dialog` ou `*-bottom-sheet`.
- Não incluir timestamp, dispositivo ou identificador opaco no nome do arquivo; plataforma e implementação pertencem aos diretórios.

## Dados sensíveis

As capturas em `flutter/android/orders/` exibem CPF e endereço. Elas devem permanecer restritas ao repositório autorizado e não podem ser publicadas, anexadas ao CI ou copiadas para documentação externa. Antes de serem usadas como baseline público ou compartilhável, precisam ser substituídas por capturas com fixtures sanitizadas.
