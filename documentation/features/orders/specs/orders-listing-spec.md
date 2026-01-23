# Spec: Listagem de Pedidos do Cliente

## 1. Objetivo

Permitir que o cliente visualize o histórico de pedidos realizados na loja com base no seu documento (CPF/CNPJ). A funcionalidade deve incluir:

- Tela de identificação para entrada do documento
- Persistência do documento em cache local
- Listagem de pedidos com accordion expansível
- Detalhes completos de cada pedido (status, itens, resumo financeiro, endereço)
- Opção de alterar documento/logout

---

## 2. O que já existe?

### Camada Core

| Recurso | Tipo | Caminho | Observação |
|---------|------|---------|------------|
| `OrderDto` | DTO | `lib/core/checkout/dtos/order_dto.dart` | Contém status, número, shipping, items, payment, createdAt |
| `OrderItemDto` | DTO | `lib/core/checkout/dtos/order_item_dto.dart` | Contém id, quantity, price, skuName, skuCode, skuSalePrice, skuDiscountPrice |
| `AddressDto` | DTO | `lib/core/checkout/dtos/address_dto.dart` | Contém receiver, street, number, neighborhood, city, uf, zipcode |
| `PaymentDto` | DTO | `lib/core/checkout/dtos/payment_dto.dart` | Contém name, icon, pdf, method |
| `OrderStatus` | Enum | `lib/core/checkout/dtos/order_dto.dart` | paid, created, cancelled, refused, authorized, delivered, waitingPayment |
| `CheckoutService` | Interface | `lib/core/checkout/interfaces/checkout_service.dart` | Já contém `fetchOrdersByCustomer(String customerDocument)` |
| `CacheDriver` | Interface | `lib/core/global/interfaces/cache_driver.dart` | get, set, delete operations |

### Camada Drivers

| Recurso | Tipo | Caminho | Observação |
|---------|------|---------|------------|
| `SharedPreferencesCacheDriver` | Impl. | `lib/drivers/cache-driver/shared_preferences_cache_driver.dart` | Implementação de CacheDriver |
| `sharedPreferencesProvider` | Provider | `lib/drivers/cache-driver/shared_preferences_cache_driver.dart` | Provider de SharedPreferences |

### Camada REST

| Recurso | Tipo | Caminho | Observação |
|---------|------|---------|------------|
| `YampiCheckoutService` | Serviço | `lib/rest/yampi/services/yampi_checkout_service.dart` | Já implementa `CheckoutService`, mas **não possui** implementação de `fetchOrdersByCustomer` |
| `checkoutServiceProvider` | Provider | `lib/rest/services.dart` | Já registrado |

### Camada UI

| Recurso | Tipo | Caminho | Observação |
|---------|------|---------|------------|
| `OrdersScreenView` | View | `lib/ui/checkout/widgets/screens/orders/widgets/screens/orders/orders_screen_view.dart` | Apenas placeholder (texto "Tela de Pedidos") |

---

## 3. O que deve ser criado?

### Camada Drivers

#### 3.1 `CacheDriverProvider`
- **Arquivo:** `lib/drivers/cache-driver/index.dart`
- **Responsabilidade:** Re-exportar o provider do CacheDriver para uso global
- **Observação:** Verificar se já existe; se não, criar provider `cacheDriverProvider`

### Camada REST

#### 3.2 `YampiOrderMapper`
- **Arquivo:** `lib/rest/yampi/mappers/yampi_order_mapper.dart`
- **Responsabilidade:** Converter resposta JSON da API Yampi para `List<OrderDto>`
- **Métodos:**
  - `static OrderDto toDto(Json json)` - Converte um pedido
  - `static List<OrderDto> toDtoList(Json json)` - Converte lista de pedidos

#### 3.3 `YampiOrderItemMapper`
- **Arquivo:** `lib/rest/yampi/mappers/yampi_order_item_mapper.dart`
- **Responsabilidade:** Converter itens do pedido
- **Métodos:**
  - `static OrderItemDto toDto(Json json)`
  - `static List<OrderItemDto> toDtoList(Json json)`

#### 3.4 `YampiAddressMapper`
- **Arquivo:** `lib/rest/yampi/mappers/yampi_address_mapper.dart`
- **Responsabilidade:** Converter endereço de entrega
- **Métodos:**
  - `static AddressDto toDto(Json json)`

#### 3.5 `YampiPaymentMapper`
- **Arquivo:** `lib/rest/yampi/mappers/yampi_payment_mapper.dart`
- **Responsabilidade:** Converter informações de pagamento
- **Métodos:**
  - `static PaymentDto toDto(Json json)`

### Camada UI

#### 3.6 `OrdersScreenPresenter`
- **Arquivo:** `lib/ui/checkout/widgets/screens/orders/orders_screen_presenter.dart`
- **Dependências:** 
  - `CheckoutService` (para buscar pedidos)
  - `CacheDriver` (para persistir/recuperar documento)
- **Estado (signals):**
  - `document: signal<String>('')` - documento atual
  - `documentType: signal<DocumentType>(DocumentType.cpf)` - tipo (CPF/CNPJ)
  - `isIdentified: signal<bool>(false)` - se usuário já está identificado
  - `orders: signal<List<OrderDto>>([])` - lista de pedidos
  - `isLoading: signal<bool>(false)` - estado de carregamento
  - `hasError: signal<bool>(false)` - estado de erro
  - `errorMessage: signal<String>('')` - mensagem de erro
- **Computed:**
  - `isDocumentValid: computed<bool>` - valida CPF/CNPJ
  - `formattedDocument: computed<String>` - documento formatado com máscara
  - `sortedOrders: computed<List<OrderDto>>` - pedidos ordenados por data decrescente
- **Métodos:**
  - `init()` - carrega documento do cache se existir
  - `setDocument(String value)` - atualiza documento
  - `setDocumentType(DocumentType type)` - alterna CPF/CNPJ
  - `fetchOrders()` - busca pedidos na API
  - `logout()` - limpa cache e retorna para identificação

#### 3.7 `DocumentType` Enum
- **Arquivo:** `lib/ui/checkout/widgets/screens/orders/orders_screen_presenter.dart` (inline)
- **Valores:** `cpf`, `cnpj`

#### 3.8 `IdentificationFormView`
- **Diretório:** `lib/ui/checkout/widgets/screens/orders/identification-form/`
- **Arquivos:**
  - `identification_form_view.dart`
  - `index.dart`
- **Props:**
  - `document: String`
  - `documentType: DocumentType`
  - `isLoading: bool`
  - `isValid: bool`
  - `onDocumentChanged: Function(String)`
  - `onDocumentTypeChanged: Function(DocumentType)`
  - `onSubmit: VoidCallback`
- **UI:**
  - Toggle (RadioGroup) para Pessoa Física / Pessoa Jurídica
  - Input com máscara de CPF ou CNPJ
  - Botão "Buscar Pedidos" (desabilitado se inválido ou loading)

#### 3.9 `OrdersHeaderView`
- **Diretório:** `lib/ui/checkout/widgets/screens/orders/orders-header/`
- **Arquivos:**
  - `orders_header_view.dart`
  - `index.dart`
- **Props:**
  - `formattedDocument: String`
  - `onLogout: VoidCallback`
- **UI:**
  - Texto do documento em cor azul primária
  - Botão "Alterar documento" alinhado à direita

#### 3.10 `OrdersListView`
- **Diretório:** `lib/ui/checkout/widgets/screens/orders/orders-list/`
- **Arquivos:**
  - `orders_list_view.dart`
  - `index.dart`
- **Props:**
  - `orders: List<OrderDto>`
- **UI:**
  - Lista de `OrderAccordion` para cada pedido

#### 3.11 `OrderAccordionView`
- **Diretório:** `lib/ui/checkout/widgets/screens/orders/orders-list/order-accordion/`
- **Arquivos:**
  - `order_accordion_view.dart`
  - `index.dart`
- **Props:**
  - `order: OrderDto`
- **UI (Accordion):**
  - **Header (sempre visível):**
    - Label "Número do pedido"
    - Número do pedido em destaque (truncado se necessário)
    - Ícone Chevron
  - **Conteúdo (expandido):**
    - `OrderStatusBlock` - Status e Data lado a lado
    - `OrderProductsSection` - Lista de itens
    - `OrderFinancialSummary` - Resumo financeiro
    - `OrderAddressSection` - Endereço de entrega

#### 3.12 `OrderStatusBlockView`
- **Diretório:** `lib/ui/checkout/widgets/screens/orders/orders-list/order-accordion/order-status-block/`
- **Props:**
  - `status: OrderStatus`
  - `createdAt: DateTime`
- **UI:**
  - Duas colunas: STATUS e DATA
  - Badge colorido para status
  - Data formatada (`dd/mm/aaaa`)

#### 3.13 `OrderProductsSectionView`
- **Diretório:** `lib/ui/checkout/widgets/screens/orders/orders-list/order-accordion/order-products-section/`
- **Props:**
  - `items: List<OrderItemDto>`
- **UI:**
  - Título "PRODUTOS" em caixa alta
  - Lista de itens com SKU, quantidade, nome, preços

#### 3.14 `OrderFinancialSummaryView`
- **Diretório:** `lib/ui/checkout/widgets/screens/orders/orders-list/order-accordion/order-financial-summary/`
- **Props:**
  - `items: List<OrderItemDto>`
  - `shippingPrice: double`
- **UI:**
  - Linha separadora
  - Produtos: total dos itens
  - Desconto: valor em verde (se houver)
  - Total: valor em destaque azul

#### 3.15 `OrderAddressSectionView`
- **Diretório:** `lib/ui/checkout/widgets/screens/orders/orders-list/order-accordion/order-address-section/`
- **Props:**
  - `address: AddressDto`
- **UI:**
  - Título "ENDEREÇO DE ENTREGA" em caixa alta
  - Nome do destinatário
  - Endereço completo formatado

#### 3.16 `OrdersLoadingStateView`
- **Diretório:** `lib/ui/checkout/widgets/screens/orders/loading-state/`
- **UI:** Skeletons simulando acordeões

#### 3.17 `OrdersEmptyStateView`
- **Diretório:** `lib/ui/checkout/widgets/screens/orders/empty-state/`
- **UI:** Mensagem informando que não há pedidos

#### 3.18 `OrdersErrorStateView`
- **Diretório:** `lib/ui/checkout/widgets/screens/orders/error-state/`
- **Props:**
  - `message: String`
  - `onRetry: VoidCallback`
- **UI:** Mensagem de erro + botão retry

---

## 4. O que deve ser modificado?

### Camada REST

#### 4.1 `YampiCheckoutService`
- **Arquivo:** `lib/rest/yampi/services/yampi_checkout_service.dart`
- **Modificação:** Implementar o método `fetchOrdersByCustomer(String customerDocument)`
- **Detalhes:**
  - Fazer requisição GET para endpoint de orders da Yampi
  - Usar `YampiOrderMapper.toDtoList` para converter resposta
  - Retornar `RestResponse<List<OrderDto>>`

### Camada UI

#### 4.2 `OrdersScreenView`
- **Arquivo:** `lib/ui/checkout/widgets/screens/orders/widgets/screens/orders/orders_screen_view.dart`
- **Modificação:** Substituir placeholder pela implementação completa
- **Nova estrutura:**
  - Consumir `OrdersScreenPresenter` via `ConsumerWidget`
  - Renderizar condicionalmente:
    - `IdentificationFormView` se `!isIdentified`
    - `OrdersLoadingStateView` se `isLoading`
    - `OrdersErrorStateView` se `hasError`
    - `OrdersEmptyStateView` se `orders.isEmpty`
    - `OrdersHeaderView` + `OrdersListView` caso contrário

#### 4.3 Estrutura de diretórios da screen Orders
- **Situação atual:** Estrutura confusa com pastas duplicadas
- **Ação:** Mover para estrutura padrão:
  ```
  lib/ui/checkout/widgets/screens/orders/
  ├── index.dart
  ├── orders_screen_view.dart
  ├── orders_screen_presenter.dart
  ├── identification-form/
  ├── orders-header/
  ├── orders-list/
  │   └── order-accordion/
  │       ├── order-status-block/
  │       ├── order-products-section/
  │       ├── order-financial-summary/
  │       └── order-address-section/
  ├── loading-state/
  ├── empty-state/
  └── error-state/
  ```

---

## 5. O que deve ser removido?

### Camada UI

#### 5.1 Estrutura duplicada
- **Diretório:** `lib/ui/checkout/widgets/screens/orders/widgets/`
- **Ação:** Remover toda a estrutura duplicada e manter apenas a estrutura padrão

---

## 6. Usar como referência

### Presenter + View Pattern
- `lib/ui/checkout/widgets/screens/cart/cart_screen_presenter.dart`
- `lib/ui/checkout/widgets/screens/cart/cart_screen_view.dart`

### Mappers Pattern
- `lib/rest/yampi/mappers/yampi_product_mapper.dart`

### Estados (Loading, Empty, Error)
- `lib/ui/checkout/widgets/screens/cart/loading-state/`
- `lib/ui/checkout/widgets/screens/cart/empty-state/`
- `lib/ui/checkout/widgets/screens/cart/error-state/`

### Componentes de UI
- `lib/ui/checkout/widgets/screens/cart/cart-item-card/` (para layout de item)
- `lib/ui/checkout/widgets/screens/cart/cart-summary/` (para resumo financeiro)
