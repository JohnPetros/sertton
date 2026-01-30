# Spec: Tabela de Opções de Parcelamento

## Objetivo
Implementar a funcionalidade de visualização das opções de parcelamento na tela de detalhes do produto ("Product Screen"). Isso inclui a criação de um botão de gatilho "Ver parcelas", um dialog sobreposto contendo um seletor de bandeira de cartão e uma tabela detalhando o número de parcelas, valor de cada parcela e o total acumulado.

> **Status:** Implementado em 30/01/2026.
> **Decisões de Implementação:**
> - Utilizado `Dialog` do Material com largura fixa de 80% da tela.
> - Ícones das bandeiras renderizados via `SvgPicture.network` (pacote `flutter_svg`).
> - Gerenciamento de estado reativo com `signals` no `InstallmentsPresenter`.

## O que já existe?

*   **`CheckoutService`** (`lib/core/checkout/interfaces/checkout_service.dart`) - Interface que define o método `fetchInstallments` e `fetchPayments`.
*   **`InstallmentDto`** (`lib/core/checkout/dtos/installment_dto.dart`) - DTO para representar os dados de uma parcela.
*   **`PaymentDto`** (`lib/core/checkout/dtos/payment_dto.dart`) - DTO para representar as formas de pagamento (bandeiras).
*   **`CheckoutResponse`** / **RestResponse** (`lib/core/global/responses/rest_response.dart`) - Wrapper de resposta da API.

## O que deve ser criado?

### Camada UI (Widgets)

#### `InstallmentsDialogView`
*   **Localização:** `lib/ui/catalog/widgets/components/installments-dialog/installments_dialog_view.dart`
*   **Responsabilidade:** Exibir o dialog com o seletor de bandeira e a tabela de parcelas.
*   **Props:**
    *   `productId`: `String` (ID do produto para consulta)
    *   `productPrice`: `double` (Preço atual do produto para cálculo)
*   **Componentes Internos:**
    *   `BrandSelector`: Botão que abre um `ModalBottomSheet` para selecionar a bandeira.
    *   `InstallmentsList`: Tabela/Lista scrollável com as parcelas.
    *   **Observação**: O dialog possui um overlay escuro (`Colors.black.withValues(alpha: 0.6)`).

#### `InstallmentsPresenter`
*   **Localização:** `lib/ui/catalog/widgets/components/installments-dialog/installments_presenter.dart`
*   **Responsabilidade:** Gerenciar o estado do modal (carregamento, seleção de bandeira, lista de parcelas).
*   **Dependências:**
    *   `CheckoutService` (Injetado via Locator/Provider)
*   **Signals/Estado:**
    *   `isLoading`: `Signal<bool>` - Estado de carregamento.
    *   `payments`: `Signal<List<PaymentDto>>` - Lista de bandeiras disponíveis.
    *   `selectedPaymentId`: `Signal<String?>` - ID da bandeira selecionada.
    *   `installments`: `Signal<List<InstallmentDto>>` - Lista de parcelas da bandeira selecionada.
    *   `error`: `Signal<String?>` - Mensagem de erro caso falhe a busca.
*   **Métodos:**
    *   `loadPayments()`: Busca as formas de pagamento disponíveis.
    *   `selectPayment(String paymentId)`: Atualiza a bandeira selecionada e busca as parcelas correspondentes.
    *   `loadInstallments()`: Busca as parcelas baseadas na seleção atual.

---

## O que deve ser modificado?

### Legado / Implementação existente
*   **`YampiCheckoutService`** (`lib/rest/yampi/services/yampi_checkout_service.dart`)
    *   Garantir a implementação correta dos métodos `fetchPayments` e `fetchInstallments` se ainda não estiverem funcionais ou se precisarem de ajustes para o novo fluxo.

### Camada UI (Screens)
*   **`ProductScreenView`** (`lib/ui/catalog/widgets/screens/product/product_screen_view.dart`)
    *   Adicionar o botão/link "Ver parcelas" abaixo do preço do produto.
    *   Implementar a ação de `onTap` desse botão para abrir o `InstallmentsDialog` via `showDialog` ou `showModalBottomSheet` (preferencialmente Dialog conforme PRD/Imagem).

## Diagramas de Visualização

### Layout ASCII

```
+-------------------------------------------------------+
|  Parcelamento                                     [X] |
+-------------------------------------------------------+
|  BANDEIRA                                             |
|  [ (Svg) Mastercard v ]                               |  <- Brand Selector (Botão Outline)
+-------------------------------------------------------+
|  Valores para 1 unidade do produto                    |
+-------------------------------------------------------+
|  Nº   | Valor da parcela     | Total do produto       |
+-------+----------------------+------------------------+
|  1    | 1x de R$ 462,35      | R$ 462,35              |
+-------+----------------------+------------------------+
|  2    | 2x de R$ 231,18...   | R$ 462,35              |
+-------+----------------------+------------------------+
|  ...                                                  |
+-------------------------------------------------------+
```
