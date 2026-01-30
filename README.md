<h1 align="center">🚚 Sertton</h1>

Aplicativo de e-commerce nativo desenvolvido em **Flutter** para a marca **Sertton**. O projeto foca em alta performance, fluidez de navegação e uma integração robusta com a plataforma **Yampi** para gestão de produtos e pedidos.

## 🚀 Visão Geral

O objetivo deste aplicativo é oferecer uma experiência de compra completa e premium, incluindo:

-   **Navegação Híbrida:** Menu lateral (Drawer) e navegação inferior (Tabbar) para acesso rápido.
-   **Vitrine Interativa:** Banners dinâmicos e coleções em destaque.
-   **Catálogo Completo:** Busca avançada, filtros inteligentes e detalhes ricos de produtos (SKUs, variações).
-   **Checkout Transparente:** Gestão de carrinho com cálculo de frete e pagamentos integrados (Pix/Boleto).
-   **Área do Cliente:** Histórico de pedidos e acompanhamento de status.

## 🛠 Tech Stack

O projeto utiliza as tecnologias mais modernas do ecossistema Flutter:

-   **Linguagem:** [Dart](https://dart.dev)
-   **Framework:** [Flutter](https://flutter.dev)
-   **Gerenciamento de Estado & DI:** [Riverpod](https://riverpod.dev) + [Signals](https://pub.dev/packages/signals)
-   **Interface (UI):** [Shadcn Flutter](https://pub.dev/packages/shadcn_flutter) + [Flutter Animate](https://pub.dev/packages/flutter_animate)
-   **Navegação:** [GoRouter](https://pub.dev/packages/go_router)
-   **Cliente HTTP:** [Dio](https://pub.dev/packages/dio)
-   **Backend:** Integração RESTful com API Yampi

## 🏗 Arquitetura

O projeto segue uma **Arquitetura em Camadas (Layered Architecture)**, inspirada em Clean Architecture e MVP (Model-View-Presenter), garantindo desacoplamento e testabilidade.

### Estrutura de Camadas:

-   **UI (`lib/ui`)**: Contém Widgets, Telas e Presenters (lógica de apresentação).
-   **Core (`lib/core`)**: Regras de negócio, DTOs, Entidades e Interfaces de serviço através de domínios específicos (Catalog, Checkout, Marketing, Reviewing).
-   **Rest (`lib/rest`)**: Implementações da comunicação com a API (Services e Mappers).
-   **Drivers (`lib/drivers`)**: Implementações de infraestrutura e adaptadores (ex: Variáveis de ambiente).

Para mais detalhes técnicos, consulte a [Documentação de Arquitetura](documentation/architecture.md).

## 📂 Estrutura do Projeto

```bash
lib/
├── core/           # Regras de Negócio e Contratos (Dominio)
├── drivers/        # Implementações de Infraestrutura
├── rest/           # Comunicação com API (Services, Repositories)
├── ui/             # Camada de Apresentação (Screens, Widgets, Presenters)
├── constants/      # Constantes globais e Rotas
├── router.dart     # Configuração de Navegação (GoRouter)
└── main.dart       # Ponto de entrada
```

## ⚙️ Configuração e Instalação

### Pré-requisitos
-   Flutter SDK 3.10.7 ou superior.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    cd sertton
    ```

2.  **Configure o Ambiente:**
    Crie um arquivo `.env` na raiz do projeto contendo as chaves necessárias (consulte o time de desenvolvimento para obter as credenciais).

3.  **Instale as dependências:**
    ```bash
    flutter pub get
    ```

4.  **Execute o projeto:**
    ```bash
    flutter run
    ```

## 📖 Documentação

Documentações detalhadas estão disponíveis no diretório `documentation/`:

-   [Visão Geral do Produto](documentation/overview.md)
-   [Arquitetura e Decisões Técnicas](documentation/architecture.md)
-   [Diretrizes e Convenções](documentation/guidelines/guidelines.md)
    -   [Diretrizes de UI](documentation/guidelines/ui-layer-guidelines.md)
    -   [Convenções de Código](documentation/guidelines/code-conventions-guidelines.md)
    -   [Core e Domínio](documentation/guidelines/core-layer-guidelines.md)
    -   [Camada REST](documentation/guidelines/rest-layer-guidelines.md)

## 🧪 Testes

O projeto utiliza `flutter_test`, `mocktail` e `faker` para testes automatizados.

```bash
flutter test
```

## 📝 Licença

Todos os direitos reservados à **Sertton**.
