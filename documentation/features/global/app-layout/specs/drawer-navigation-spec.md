# Spec: Navigation Drawer

## Objetivo
Implementar o widget de **Drawer Navigation** global da aplicação Sertton. Este componente servirá como menu lateral acessível em toda a aplicação (via AppLayout), fornecendo acesso rápido aos canais de atendimento da empresa (WhatsApp, Telefone, E-mail) e links para telas de documentos legais (Termos de Uso, Políticas de Privacidade).

## O que já existe?
*   **AppLayoutView** (`lib/ui/global/widgets/layout/app_layout_view.dart`): Estrutura principal que deverá receber o Drawer.
*   **AppHeader** (`lib/ui/global/widgets/app-header/`): Contém o botão de menu que deve acionar o Drawer.
*   **Routes** (`lib/constants/routes.dart`): Rotas para navegação interna.
*   **NavigationDriver** (`lib/drivers/navigation-driver/`): Para navegação interna (Termos e Políticas).
*   **Shadcn UI**: Biblioteca de componentes visuais.
*   **UrlDriver** (`lib/drivers/url-driver/index.dart`): Para abrir URLs externas.

## O que foi criado?

### Core / Constants
*   **SerttonContacts** (`lib/constants/sertton_contacts.dart`)
    *   Classe estática contendo informações corporativas e de contato.
    *   **Contatos:**
        *   `whatsappNumber` / `whatsappLabel` / `whatsappMessage`.
        *   `landlineNumber` / `landlineLabel`.
        *   `emailAddress`.
    *   **URLs/Schemes (Getters):**
        *   `whatsappUrl`: `whatsapp://send...`
        *   `whatsappHttpsUrl`: `https://wa.me/...` (Fallback para Web).
        *   `landlineUrl`: `tel:...`
        *   `emailUrl`: `mailto:...`

### UI / Drawer
**Localização:** `lib/ui/global/widgets/layout/drawer/`

*   **DrawerMenuView** (`drawer_menu_view.dart`):
    *   View principal do Drawer utilizando `Scaffold.drawer` do Material (envolvendo o Shadcn).
    *   Utiliza `FontAwesomeIcons` para ícones de contato e institucionais.
    *   Fecha o drawer (`Navigator.pop`) antes de realizar a ação de navegação ou abertura de URL.

*   **DrawerMenuPresenter** (`drawer_menu_presenter.dart`):
    *   Gerencia a abertura de URLs com suporte a **fallback** (ex: tentar `whatsapp://`, se falhar, tentar `https://wa.me/`).
    *   Utiliza `UrlDriver` e `NavigationDriver`.

*   **Componentes Internos:**
    *   `DrawerMenuHeader` (`components/drawer_menu_header/`): Exibe o logo da Sertton.
    *   `DrawerLinkItem` (`components/drawer_link_item/`): Item de lista customizado usando `shadcn.GhostButton` com largura total e alinhamento à esquerda.

## O que foi modificado?

### Constants
*   **Routes** (`lib/constants/routes.dart`)
    *   Adicionadas rotas: `privacyPolicy`, `termsOfUse`, `about`.

### UI / Layout
*   **AppLayoutView** (`lib/ui/global/widgets/layout/app_layout_view.dart`)
    *   O `shadcn.Scaffold` foi envolvido por um `Scaffold` (Material) para habilitar o uso do `drawer`.
    *   O botão de menu no `AppHeader` agora dispara `Scaffold.of(context).openDrawer()`.

## Fluxo de Interação

```ASCII
  User           AppHeader      Scaffold (Mat)    DrawerMenu      Presenter      Drivers (Url/Nav)
   |                 |               |               |                |               |
   |-- Click Menu -->|               |               |                |               |
   |                 |-- Open() ---->|               |                |               |
   |                 |               |-- Builds ---->|                |               |
   |                 |               |               |                |               |
   |=================================== CONTACT FLOW =================================|
   |                 |               |               |                |               |
   |-- Click WA ---->|               |               |                |               |
   |                 |               |               |-- Pop() ------>|               |
   |                 |               |               |-- OpenURL() -->|               |
   |                 |               |               |                |-- CanLaunch?->|
   |                 |               |               |                |               |
   |                 |               |               |                |<-- Yes/No ----|
   |                 |               |               |                |               |
   |                 |               |               |                |-- Launch() -->|
   |                 |               |               |                |               |
   |================================ INSTITUTIONAL FLOW ==============================|
   |                 |               |               |                |               |
   |-- Click Term -->|               |               |                |               |
   |                 |               |               |-- Pop() ------>|               |
   |                 |               |               |-- Navigate() ->|               |
   |                 |               |               |                |-- Go(route) ->|
   |                 |               |               |                |               |
```

## Dependências Adicionadas
*   `font_awesome_flutter` (Iconografia para redes sociais e contatos).
