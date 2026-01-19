# Arquitetura do Projeto Sertton

## Visão Geral

O Sertton segue uma **arquitetura em camadas** inspirada nos princípios de Clean Architecture, visando desacoplamento, testabilidade e escalabilidade. O projeto é um aplicativo de e-commerce nativo desenvolvido em **Flutter/Dart**, integrado com a plataforma **Yampi** para gerenciamento de produtos, pedidos e clientes.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             Camada de UI                                     │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                    Widgets / Screens / Presenters                      │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │  │
│  │  │   Catalog   │  │  Checkout   │  │  Marketing  │  │  Reviewing  │   │  │
│  │  │    (UI)     │  │    (UI)     │  │    (UI)     │  │    (UI)     │   │  │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │  │
│  └─────────┼────────────────┼────────────────┼────────────────┼──────────┘  │
└────────────┼────────────────┼────────────────┼────────────────┼─────────────┘
             │                │                │                │
             ▼                ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             Camada Core                                      │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │     DTOs (Data Transfer Objects) • Interfaces • Responses • Config    │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │  │
│  │  │   Catalog   │  │  Checkout   │  │  Marketing  │  │  Reviewing  │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │  │
│  │  ┌───────────────────────────────────────────────────────────────┐    │  │
│  │  │                          Global                                │    │  │
│  │  │  RestClient Interface • EnvDriver Interface • Responses       │    │  │
│  │  └───────────────────────────────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
             │                │                │                │
             ▼                ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             Camada Rest                                      │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                    Implementações de Serviços                          │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │                         Yampi                                    │  │  │
│  │  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────────┐ │  │  │
│  │  │  │ YampiCatalog   │  │ YampiMarketing │  │     Mappers        │ │  │  │
│  │  │  │    Service     │  │    Service     │  │                    │ │  │  │
│  │  │  └────────────────┘  └────────────────┘  └────────────────────┘ │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │                          Dio                                     │  │  │
│  │  │                    DioRestClient (HTTP)                          │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
             │                
             ▼                
┌─────────────────────────────────────────────────────────────────────────────┐
│                             Camada Drivers                                   │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                  Implementações de Infraestrutura                      │  │
│  │  ┌──────────────────┐                                                  │  │
│  │  │   DotEnvDriver   │                                                  │  │
│  │  │  (Variáveis Env) │                                                  │  │
│  │  └──────────────────┘                                                  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Módulos de Domínio

O projeto é organizado por **contextos delimitados** (bounded contexts), cada domínio contendo seus próprios DTOs e interfaces de serviço:

| Módulo | Descrição | Entidades (DTOs) |
|--------|-----------|------------------|
| **Catalog** | Gestão de produtos, SKUs, categorias e marcas | `ProductDto`, `SkuDto`, `VariationDto`, `CategoryDto`, `BrandDto`, `CollectionDto` |
| **Checkout** | Gestão do carrinho, clientes e descontos | `CartItemDto`, `CustomerDto`, `DiscountDto` |
| **Marketing** | Engajamento e comunicação visual | `BannerDto`, `LeadDto`, `ContactDto` |
| **Reviewing** | Prova social e avaliações | `CommentDto`, `AuthorDto` |

---

## Responsabilidades das Camadas

### 1. Camada UI (`lib/ui/`)

A camada mais externa, responsável pela apresentação visual e interação com o usuário.

```
lib/ui/
└── catalog/
    └── widgets/
        └── screens/
            └── home/
                ├── index.dart                  # Export público
                ├── home_screen_view.dart       # Widget (View)
                └── home_screen_presenter.dart  # Lógica de apresentação
```

**Padrões Utilizados:**
- **MVP (Model-View-Presenter):** Separação entre View (widgets) e Presenter (lógica de estado)
- **ConsumerWidget:** Widgets reativos do Riverpod
- **Signals:** Gestão de estado granular e reativo via `signals` package

**Exemplo de Presenter:**
```dart
class HomeScreenPresenter {
  final String userId;
  final count = signal(0);  // Estado reativo com Signals

  HomeScreenPresenter({required this.userId});
}

final presenterProvider = Provider.autoDispose
    .family<HomeScreenPresenter, ({String userId})>(
      (ref, props) => HomeScreenPresenter(userId: props.userId),
    );
```

### 2. Camada Core (`lib/core/`)

O núcleo do domínio contendo regras de negócio, contratos e estruturas de dados.

```
lib/core/
├── catalog/
│   ├── dtos/                 # Data Transfer Objects
│   │   ├── product_dto.dart
│   │   ├── sku_dto.dart
│   │   ├── variation_dto.dart
│   │   ├── category_dto.dart
│   │   ├── brand_dto.dart
│   │   └── collection_dto.dart
│   └── interfaces/           # Contratos de serviço
│       └── catalog_service.dart
├── checkout/
│   └── dtos/
│       ├── cart_item_dto.dart
│       ├── customer_dto.dart
│       └── discount_dto.dart
├── marketing/
│   ├── dtos/
│   │   ├── banner_dto.dart
│   │   ├── lead_dto.dart
│   │   └── contact_dto.dart
│   └── interfaces/
│       └── marketing_service.dart
├── reviewing/
│   ├── author_dto.dart
│   └── comment_dto.dart
├── global/
│   ├── interfaces/
│   │   ├── rest_client.dart   # Contrato HTTP abstrato
│   │   └── env_driver.dart    # Contrato para variáveis de ambiente
│   └── responses/
│       ├── rest_response.dart            # Wrapper de resposta HTTP
│       └── cursor_pagination_response.dart  # Paginação por cursor
└── constants/
    └── http_status_code.dart  # Constantes de status HTTP
```

**Padrões Utilizados:**
- **DTO Pattern:** Objetos de transferência de dados com contratos explícitos
- **Interface Segregation:** Interfaces específicas por domínio
- **Result Pattern:** `RestResponse<T>` encapsula sucesso/erro

**Exemplo de Interface de Serviço:**
```dart
abstract class CatalogService {
  Future<RestResponse<CursorPaginationResponse<ProductDto>>> fetchProducts();
  Future<RestResponse<ProductDto>> fetchProduct();
}
```

**Exemplo de Response Wrapper:**
```dart
class RestResponse<Body> {
  final Body? _body;
  final int _statusCode;
  final String? _errorMessage;

  bool get isSuccessful => _statusCode <= HttpStatusCode.badRequest;
  bool get isFailure => _statusCode >= HttpStatusCode.badRequest || _errorMessage != null;
  
  RestResponse<NewBody> mapBody<NewBody>(NewBody Function(Body?) mapper) {
    return RestResponse(body: mapper(_body), statusCode: _statusCode);
  }
}
```

### 3. Camada Rest (`lib/rest/`)

Implementações concretas de comunicação HTTP e serviços externos.

```
lib/rest/
├── rest_client.dart         # Provider do RestClient
├── services.dart            # Providers de serviços
├── dio/
│   └── dio_rest_client.dart # Implementação Dio do RestClient
└── yampi/
    ├── services/
    │   ├── yampi_service.dart           # Classe base Yampi
    │   ├── yampi_catalog_service.dart   # Implementação CatalogService
    │   └── yampi_marketing_service.dart # Implementação MarketingService
    ├── mappers/
    │   └── yampi_banner_mapper.dart     # Conversão Yampi → DTO
    └── types/
        └── yampi_response.dart          # Tipagem de resposta Yampi
```

**Padrões Utilizados:**
- **Adapter Pattern:** `DioRestClient` adapta Dio para `RestClient` interface
- **Service Pattern:** `YampiService` como base para serviços Yampi
- **Mapper Pattern:** Conversão de dados externos para DTOs internos

**Exemplo de Service Implementation:**
```dart
class YampiCatalogService extends YampiService implements CatalogService {
  YampiCatalogService(super.restClient, super.envDriver);

  @override
  Future<RestResponse<CursorPaginationResponse<ProductDto>>> fetchProducts() {
    return super.restClient.get('/products');
  }
}
```

**Exemplo de Mapper:**
```dart
class YampiBannerMapper {
  static BannerDto toDto(Map<String, dynamic> yampiBanner) {
    return BannerDto(
      id: yampiBanner['id'], 
      imageUrl: yampiBanner['image_url']
    );
  }
}
```

### 4. Camada Drivers (`lib/drivers/`)

Implementações de infraestrutura e drivers externos.

```
lib/drivers/
└── dot_env_driver.dart  # Implementação DotEnv do EnvDriver
```

**Padrão Utilizado:**
- **Driver Pattern:** Abstração de dependências externas

**Exemplo:**
```dart
class DotEnvDriver implements EnvDriver {
  DotEnvDriver() {
    dotenv.load(fileName: ".env");
  }

  @override
  String get(String key) {
    return dotenv.env[key] ?? '';
  }
}
```

---

## Injeção de Dependências

O projeto utiliza **Riverpod** para injeção de dependências e gerenciamento de estado global.

```
lib/
├── router.dart          # Provider do GoRouter
├── constants/
│   ├── env.dart         # Constantes de variáveis de ambiente
│   └── routes.dart      # Constantes de rotas
└── rest/
    ├── rest_client.dart # restClientProvider
    └── services.dart    # catalogServiceProvider, etc.
```

**Estrutura de Providers:**

```dart
// Driver Provider
final envDriverProvider = Provider<EnvDriver>((ref) => DotEnvDriver());

// RestClient Provider
final restClientProvider = Provider<DioRestClient>((ref) => DioRestClient());

// Service Provider (com composição)
final catalogServiceProvider = Provider<CatalogService>((ref) {
  final restClient = ref.read(restClientProvider);
  final envDriver = ref.read(envDriverProvider);
  return YampiCatalogService(restClient, envDriver);
});

// Router Provider
final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: Routes.home,
    routes: [
      GoRoute(
        path: Routes.home,
        builder: (context, state) => const HomeScreen(),
      ),
    ],
  );
});
```

---

## Stack Tecnológica

### Dependências de Produção

| Pacote | Versão | Finalidade |
|--------|--------|------------|
| **flutter** | SDK | Framework de UI multiplataforma |
| **dio** | ^5.9.0 | Cliente HTTP robusto com interceptors |
| **flutter_riverpod** | ^3.2.0 | Injeção de dependências e estado |
| **go_router** | ^17.0.1 | Navegação declarativa e deep linking |
| **shadcn_flutter** | 0.0.47 | UI Kit moderno e acessível |
| **signals** | ^6.3.0 | Gestão de estado reativo granular |
| **flutter_animate** | ^4.5.2 | Micro-animações e transições |
| **flutter_dotenv** | ^6.0.0 | Carregamento de variáveis de ambiente |

### Dependências de Desenvolvimento

| Pacote | Versão | Finalidade |
|--------|--------|------------|
| **flutter_test** | SDK | Framework de testes |
| **flutter_lints** | ^6.0.0 | Regras de lint recomendadas |

### Ambiente

| Especificação | Valor |
|---------------|-------|
| **Linguagem** | Dart ^3.10.7 |
| **Framework** | Flutter |
| **API Externa** | Yampi Dev (RESTful) |

---

## Diagrama de Fluxo de Dados

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│      View       │◄───│    Presenter    │◄───│    Provider     │
│  (Widget/UI)    │    │   (Signals)     │    │   (Riverpod)    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └────────┬────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │                 │
                                              │     Service     │
                                              │   (Interface)   │
                                              │                 │
                                              └────────┬────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │                 │
                                              │  YampiService   │
                                              │(Implementation) │
                                              │                 │
                                              └────────┬────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │                 │
                                              │   RestClient    │
                                              │     (Dio)       │
                                              │                 │
                                              └────────┬────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │                 │
                                              │    Yampi API    │
                                              │   (External)    │
                                              │                 │
                                              └─────────────────┘
```

---

## Padrões de Design Utilizados

### 1. Repository/Service Pattern
Abstrai o acesso a dados permitindo que o domínio permaneça agnóstico à fonte de dados.

```dart
abstract class CatalogService {
  Future<RestResponse<CursorPaginationResponse<ProductDto>>> fetchProducts();
}

class YampiCatalogService extends YampiService implements CatalogService {
  // Implementação específica Yampi
}
```

### 2. Adapter Pattern
Adapta interfaces externas (Dio) para contratos internos (RestClient).

```dart
abstract class RestClient {
  Future<RestResponse<Body>> get<Body>(String path, {...});
}

class DioRestClient implements RestClient {
  // Implementação usando Dio
}
```

### 3. DTO Pattern
Transfere dados entre camadas com contratos explícitos.

```dart
class ProductDto {
  String id;
  String name;
  List<SkuDto> skus;
  BrandDto brand;
  // ...
}
```

### 4. Mapper Pattern
Converte dados de fontes externas para DTOs internos.

```dart
class YampiBannerMapper {
  static BannerDto toDto(Map<String, dynamic> yampiBanner) {
    return BannerDto(
      id: yampiBanner['id'], 
      imageUrl: yampiBanner['image_url']
    );
  }
}
```

### 5. MVP Pattern (Model-View-Presenter)
Separa a lógica de apresentação dos widgets.

```dart
// Presenter com estado reativo
class HomeScreenPresenter {
  final count = signal(0);
}

// View consumindo Presenter
class HomeScreenView extends ConsumerWidget {
  Widget build(context, ref) {
    final presenter = ref.read(presenterProvider((userId: '')));
    return Text("${presenter.count.value}");
  }
}
```

---

## Decisões Arquiteturais

### Por que Arquitetura em Camadas?
- **Testabilidade:** Lógica de domínio testada sem dependências externas
- **Flexibilidade:** Fácil substituição de implementações (ex: trocar Dio por HTTP package)
- **Independência:** Regras de negócio não dependem de frameworks
- **Manutenibilidade:** Fronteiras claras reduzem acoplamento

### Por que Riverpod + Signals?
- **Riverpod:** Injeção de dependências robusta, escopo de providers, hot-reload friendly
- **Signals:** Estado granular e performático para UI reativa, minimal rebuilds

### Por que Yampi como Backend?
- **E-commerce completo:** Produtos, Pedidos, Clientes, Pagamentos
- **API RESTful:** Integração simplificada
- **Gestão administrativa:** Painel Yampi para operações

### Por que shadcn_flutter?
- **Design moderno:** Componentes acessíveis e customizáveis
- **Consistência:** UI Kit unificado
- **Produtividade:** Componentes prontos para uso

---

## Armadilhas a Evitar

1. **Vazamento de Lógica de Domínio:** Manter regras de negócio na camada `core/`, não em componentes UI
2. **Acesso Direto a API:** Sempre usar interfaces de serviço em presenters
3. **Dependências Circulares:** Manter hierarquia estrita de camadas
4. **Mistura de Responsabilidades:** Presenters devem apenas orquestrar, não fazer requisições diretamente
5. **DTOs Mutáveis:** Preferir campos `final` em DTOs para imutabilidade

---

## Estrutura de Diretórios Completa

```
lib/
├── main.dart                    # Entry point
├── router.dart                  # Configuração de rotas
├── constants/
│   ├── env.dart                 # Constantes de ambiente
│   └── routes.dart              # Constantes de rotas
├── core/
│   ├── catalog/
│   │   ├── dtos/
│   │   │   ├── product_dto.dart
│   │   │   ├── sku_dto.dart
│   │   │   ├── variation_dto.dart
│   │   │   ├── category_dto.dart
│   │   │   ├── brand_dto.dart
│   │   │   └── collection_dto.dart
│   │   └── interfaces/
│   │       └── catalog_service.dart
│   ├── checkout/
│   │   └── dtos/
│   │       ├── cart_item_dto.dart
│   │       ├── customer_dto.dart
│   │       └── discount_dto.dart
│   ├── marketing/
│   │   ├── dtos/
│   │   │   ├── banner_dto.dart
│   │   │   ├── lead_dto.dart
│   │   │   └── contact_dto.dart
│   │   └── interfaces/
│   │       └── marketing_service.dart
│   ├── reviewing/
│   │   ├── author_dto.dart
│   │   └── comment_dto.dart
│   ├── global/
│   │   ├── interfaces/
│   │   │   ├── rest_client.dart
│   │   │   └── env_driver.dart
│   │   └── responses/
│   │       ├── rest_response.dart
│   │       └── cursor_pagination_response.dart
│   └── constants/
│       └── http_status_code.dart
├── drivers/
│   └── dot_env_driver.dart
├── rest/
│   ├── rest_client.dart
│   ├── services.dart
│   ├── dio/
│   │   └── dio_rest_client.dart
│   └── yampi/
│       ├── services/
│       │   ├── yampi_service.dart
│       │   ├── yampi_catalog_service.dart
│       │   └── yampi_marketing_service.dart
│       ├── mappers/
│       │   └── yampi_banner_mapper.dart
│       └── types/
│           └── yampi_response.dart
└── ui/
    └── catalog/
        └── widgets/
            └── screens/
                └── home/
                    ├── index.dart
                    ├── home_screen_view.dart
                    └── home_screen_presenter.dart
```

---