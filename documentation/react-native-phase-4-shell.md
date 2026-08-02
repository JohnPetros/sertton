# Fase 4 — Design system, stores e shell

## Entregas

- Tokens NativeWind para cores, estados, radius e sombra, alinhados às cores observadas no Flutter.
- Widgets compartilhados acessíveis em `src/ui/shared/widgets/`, incluindo controle de quantidade com hook testável.
- `CartStore` Zustand com hidratação versionada, deduplicação por SKU, persistência e seletor de itens; `CatalogStore` para a busca compartilhada.
- Árvore Expo Router com Root Stack, Drawer, tabs persistentes, stack de catálogo e rotas institucionais. Rotas visuais são wrappers finos de widgets em `src/ui/`.
- Tab bar com quatro abas, ícones Lucide e badge derivado do carrinho; Drawer com contatos, rotas institucionais e fallback WhatsApp.
- Guard de conectividade que evita o splash e redireciona entre Offline e Home sem loop.

## Validações executadas

No diretório `sertton-react-native-app/`:

- `npm run check:code` — aprovado.
- `npm run check:types` — aprovado.
- `npm run test` — aprovado: 7 suítes e 15 testes, incluindo `ConnectivityGuard` e `useConnectivityGuard`.
- `npm run test:coverage` — aprovado.
- `npm run export:web` — aprovado; 14 rotas visuais e 15 API Routes exportadas.
- Inspeção manual no Android `Medium_Phone` com Maestro MCP em 2026-07-11 — aprovado: Home redireciona para Offline ao perder conectividade e Offline retorna à Home após a reconexão, sem loop.

## Conclusão

A Fase 4 está concluída. O Maestro MCP foi usado exclusivamente para inspeção visual interativa; nenhum flow, YAML, teste ou artefato do Maestro foi criado no repositório.
