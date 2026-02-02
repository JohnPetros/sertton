# Funcionalidade: Splash Screen

### 2. Objetivo

Implementar a tela de abertura (Splash Screen) animada que serve como ponto de entrada do aplicativo. A tela deve exibir animações de entrada (Lottie e componentes visuais) e redirecionar automaticamente o usuário para a rota `Home` após 4 segundos de exibição, sem depender de chamadas ou validações de autenticação neste momento.

### 3. O que já existe?

*   **`assets/lotties/truck.json`** - Arquivo de animação Lottie do caminhão que será utilizado.
*   **`Routes.home`** (`lib/constants/routes.dart`) - Rota de destino após o término da animação.
*   **`NavigationDriver`** (`lib/drivers/navigation-driver/index.dart`) - Driver para navegação entre rotas utilizando `navigationDriverProvider`.

### 4. O que deve ser criado?

#### Camada UI (Presenters, Stores)

*   **`lib/ui/global/widgets/screens/splash/splash_screen_presenter.dart`**
    *   **Dependências:** `NavigationDriver` (`package:sertton/core/global/interfaces/navigation_driver.dart`).
    *   **Signals/Estado:**
        *   N/A.
    *   **Métodos:**
        *   `void init()`: Inicia o temporizador de 4 segundos.
        *   `Future<void> _navigateToHome()`: método privado chamado após 4 segundos utilizando `navigationDriver.goTo(Routes.home)`.

#### Camada UI (Views)

*   **`lib/ui/global/widgets/screens/splash/splash_screen_view.dart`**
    *   **Bibliotecas de UI:** `lottie`, `animate_do` (ou similar para animações de entrada como `RollIn`, `FadeInDown`), `font_awesome_flutter` (para ícones), `shadcn_flutter` (para tema/cores).
    *   **Componentes:**
        *   `Lottie.asset` para o caminhão.
        *   `FaIcon` para os ícones de ícones "Shopping Bag" e "Dollar Sign".
        *   `Text` estilizado para "Sertton".
    *   **Responsabilidade:** Implementar a composição visual e as animações descritas no PRD. Chamar `presenter.init()` no `initState` (ou via hook). A navegação será disparada pelo Presenter.

#### Camada UI (Exports)

*   **`lib/ui/global/widgets/screens/splash/index.dart`**
    *   Exportar `SplashScreen` (typedef para `SplashScreenView`).

### 5. O que deve ser modificado?

*   **`lib/constants/routes.dart`**
    *   Adicionar constante `static const String splash = '/splash';`.

*   **`lib/router.dart`**
    *   Alterar `initialLocation` de `Routes.home` para `Routes.splash`.
    *   Adicionar a rota `Routes.splash` no array de `routes` (fora do `StatefulShellRoute` pois não precisa da BottomBar ou Layout principal da aplicação, é uma tela FullScreen).

### 6. O que deve ser removido?

*   N/A

### 7. Usar como referência

*   **`lib/ui/global/widgets/screens/home/home_screen_view.dart`** - Exemplo de estrutura de Screen.

### 8. Diagramas de Visualização

#### Fluxo de Dados

```text
[App Start]
    |
    v
[SplashScreenView] --(mount)--> [SplashScreenPresenter]
         |                              |
    Render UI/Anims                 init() (start timer)
         |                              |
         | <------(wait 2s)-------------|
         |                              |
         |                      [navigationDriver.goTo(home)]
         |                              |
    [GoRouter] <------------------------|
         |
    [HomeScreen]
```

### 9. Resumo da Implementação

A funcionalidade de Splash Screen foi implementada com sucesso, atendendo a todos os requisitos visuais e funcionais descritos.

*   **UI/UX:**
    *   Implementada `SplashScreenView` utilizando `Lottie` para a animação do caminhão.
    *   Adicionados ícones animados (`FontAwesome`) com `animate_do` (SlideInLeft, Spin).
    *   Texto "Sertton" animado (`FadeInUp`).
    *   Layout responsivo centralizado.

*   **Lógica:**
    *   Criado `SplashScreenPresenter` gerenciando o timer de 4 segundos.
    *   Navegação automática para `Routes.home` após o timer.
    *   Configuração de rotas no `GoRouter`.

*   **Qualidade:**
    *   Testes de widget `splash_screen_view_test.dart` cobrindo renderização e chamada de inicialização.
    *   Análise estática sem erros (`flutter analyze`).
    *   Código formatado (`dart format`).
