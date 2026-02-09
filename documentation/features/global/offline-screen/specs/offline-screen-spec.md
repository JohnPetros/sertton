---
title: Spec da Tela de Offline (Wallblock)
status: concluida
lastUpdatedAt: 2026-02-07
---

## 2. Objetivo

Implementar um wallblock global de conectividade para bloquear o fluxo do app quando não houver acesso real a internet, exibindo uma tela única de offline com CTA de reconexão. Tecnicamente, a solução deve centralizar a detecção de internet em driver próprio, acoplar o bloqueio na camada de roteamento e manter a UI desacoplada da implementação de infraestrutura.

## 3. O que ja existe?

### UI

- **`SplashScreenPresenter`** (`lib/ui/global/widgets/screens/splash/splash_screen_presenter.dart`) - *Ja controla navegacao inicial via `NavigationDriver` e e referencia para fluxos de entrada no app.*
- **`OrdersErrorStateView`** (`lib/ui/checkout/widgets/screens/orders/error-state/orders_error_state_view.dart`) - *Referencia visual para estado de erro com icone, mensagem e botao `Tentar novamente`.*
- **`CartErrorStateView`** (`lib/ui/checkout/widgets/screens/cart/error-state/cart_error_state_view.dart`) - *Exemplo de CTA de retry acoplado a presenter.*

### Core

- **`NavigationDriver`** (`lib/core/global/interfaces/navigation_driver.dart`) - *Contrato de navegacao usado pelos presenters e reaproveitavel no CTA da tela offline.*

### Drivers

- **`GoRouterNavigationDriver`** (`lib/drivers/navigation-driver/go_router_navigation_driver.dart`) - *Implementacao concreta da navegacao baseada em `GoRouter`.*
- **`navigationDriverProvider`** (`lib/drivers/navigation-driver/index.dart`) - *Provider padrao para injecao do driver de navegacao na UI.*

### Roteamento

- **`routerProvider`** (`lib/router.dart`) - *Ponto central de configuracao de rotas, ideal para aplicar gate global de conectividade.*
- **`Routes`** (`lib/constants/routes.dart`) - *Centraliza as rotas nomeadas e precisa receber a rota de offline.*

## 4. O que deve ser criado?

### Core (Interfaces)

- **Localizacao:** `lib/core/global/interfaces/internet_connection_driver.dart`
- **Dependencias:** nenhuma (camada Core).
- **Metodos:**
  - `Future<bool> hasInternetAccess()` - verifica conectividade real no momento atual.
  - `Stream<bool> onStatusChange()` - stream de alteracao online/offline para atualizacao reativa do app.

### Drivers

- **Localizacao:** `lib/drivers/internet-connection-driver/internet_connection_checker_plus_driver.dart`
- **Dependencias:** `internet_connection_checker_plus`.
- **Metodos:**
  - Implementar `hasInternetAccess()` usando `InternetConnection().hasInternetAccess`.
  - Implementar `onStatusChange()` convertendo `InternetStatus` para `bool` (`connected` -> `true`, `disconnected` -> `false`) com `distinct()`.

- **Localizacao:** `lib/drivers/internet-connection-driver/index.dart`
- **Dependencias:** `flutter_riverpod`, `InternetConnectionDriver` e implementacao concreta do driver.
- **Metodos:**
  - Expor `internetConnectionDriverProvider` para injecao global.

### UI (Presenters, Stores)

- **Localizacao:** `lib/ui/global/widgets/screens/offline/offline_screen_presenter.dart`
- **Dependencias:** `NavigationDriver`, `InternetConnectionDriver`.
- **Signals/Estado:**
  - `isChecking` (`signal<bool>`) para estado do botao durante tentativa manual.
- **Computeds:**
  - `isIdle` (`computed<bool>`) para habilitar/desabilitar CTA.
- **Metodos:**
  - `Future<void> tryReconnect()` - revalida conectividade; se online, navega para `Routes.home`; se offline, permanece na tela.

### UI (Views)

- **Localizacao:** `lib/ui/global/widgets/screens/offline/offline_screen_view.dart`
- **Bibliotecas de UI:** `shadcn_flutter` (layout, tipografia e botoes), `signals_flutter` (Watch), `flutter_riverpod`.
- **Props:** sem props obrigatorias (screen de rota).

### UI (Widgets)

- **Localizacao:** `lib/ui/global/widgets/screens/offline/`
- **Props:** N/A.
- **Widgets internos:** nao obrigatorio nesta primeira versao.
- **Estrutura de pastas:**

```text
lib/ui/global/widgets/screens/offline/
|- offline_screen_view.dart
|- offline_screen_presenter.dart
|- index.dart
```

## 5. O que deve ser modificado?

- **Camada:** `Dependencias`
- **Arquivo:** `pubspec.yaml`
- **Mudanca:** adicionar `internet_connection_checker_plus` para suporte a verificacao de internet real (nao apenas status de rede).

- **Camada:** `Core/Constantes`
- **Arquivo:** `lib/constants/routes.dart`
- **Mudanca:** adicionar constante `Routes.offline` (ex.: `'/offline'`).

- **Camada:** `Roteamento (UI Global)`
- **Arquivo:** `lib/router.dart`
- **Mudanca:**
  - adicionar import da nova screen `offline`.
  - adicionar import do `internetConnectionDriverProvider`.
  - criar rota `GoRoute(path: Routes.offline, builder: ... => const OfflineScreen())` fora do `StatefulShellRoute`.
  - adicionar gate global no `GoRouter` via `redirect` para bloquear navegacao quando offline:
    - offline e rota atual diferente de `Routes.offline` -> redireciona para `Routes.offline`.
    - online e rota atual `Routes.offline` -> redireciona para `Routes.home`.
  - configurar refresh do router com stream de conectividade (`onStatusChange`) para troca automatica de tela ao perder/restaurar internet.

## 6. O que deve ser removido?

- **Camada:** `N/A`
- **Arquivo:** `N/A`
- **Motivo:** sem remocoes previstas nesta entrega.

## 7. Usar como referencia

- `lib/ui/global/widgets/screens/splash/splash_screen_presenter.dart`
- `lib/ui/checkout/widgets/screens/orders/error-state/orders_error_state_view.dart`
- `lib/ui/checkout/widgets/screens/cart/error-state/cart_error_state_view.dart`
- `lib/drivers/navigation-driver/index.dart`
- `lib/drivers/url-driver/index.dart`

## 8. Diagramas e referencias

- **Fluxo de dados:**

```text
[GoRouter redirect]
      |
      v
[InternetConnectionDriver.onStatusChange()] ---> (refresh)
      |
      +--> hasInternetAccess() == false --------------------------+
      |                                                           |
      |                                                [Routes.offline]
      |                                                           |
      |                                      [OfflineScreenView + Presenter]
      |                                                           |
      |                          botao "Tentar novamente" -> tryReconnect()
      |                                                           |
      +<-------------------- hasInternetAccess() == true <--------+
                              |
                              v
                         [Routes.home]
```

- **Layout:**

```text
+------------------------------------------------+
|                 [icone/ilustracao]             |
|                                                |
|            Sem conexao com a internet!         |
|    Verifique sua conexao para seguir...        |
|                                                |
|              [ Tentar novamente ]              |
+------------------------------------------------+
```

- **Referencias:**
  - `documentation/features/global/offline-screen/prd.md`
  - `lib/router.dart`
  - `lib/constants/routes.dart`
  - `lib/ui/global/widgets/screens/splash/splash_screen_view.dart`

## 9. Verificacao de requisitos (implementacao final)

- **Criado (Core):** `lib/core/global/interfaces/internet_connection_driver.dart` com `hasInternetAccess()` e `onStatusChange()`.
- **Criado (Drivers):** `lib/drivers/internet-connection-driver/internet_connection_checker_plus_driver.dart` mapeando `InternetStatus` para `bool` com `distinct()`.
- **Criado (DI):** `lib/drivers/internet-connection-driver/index.dart` expondo `internetConnectionDriverProvider`.
- **Criado (UI Offline):** `lib/ui/global/widgets/screens/offline/offline_screen_presenter.dart`, `lib/ui/global/widgets/screens/offline/offline_screen_view.dart` e `lib/ui/global/widgets/screens/offline/index.dart`.
- **Modificado (rotas):** `lib/constants/routes.dart` com `Routes.offline`.
- **Modificado (roteamento):** `lib/router.dart` com rota dedicada de offline, `redirect` global baseado em conectividade e refresh via stream de status.
- **Modificado (dependencias):** `pubspec.yaml` com `internet_connection_checker_plus`.

## 10. Validacao de qualidade final

- **Formatacao:** `dart format .` executado com sucesso.
- **Analise estatica:** `flutter analyze` sem warnings/erros.
- **Testes unitarios:** `flutter test` concluido com sucesso (`All tests passed!`).
- **Diretrizes de codigo:** estrutura em camadas preservada (Core/Drivers/UI), imports por camada e naming aderente ao guia de convencoes.

## 11. Resumo tecnico de conclusao

A implementacao do wallblock global de conectividade foi finalizada com deteccao real de internet via driver dedicado e orquestracao centralizada no `GoRouter`. O fluxo impede acesso ao app quando offline, redireciona para `Routes.offline` e retorna automaticamente para `Routes.home` ao recuperar conexao. A tela offline ficou desacoplada da infraestrutura por meio de Presenter + Drivers injetados, com CTA de reconexao manual e estado reativo de carregamento.
