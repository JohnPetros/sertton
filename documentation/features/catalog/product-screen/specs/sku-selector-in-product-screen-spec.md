# Spec: Seletor de SKU de Produto

## 1. Objetivo

Implementar o widget `SkuSelector` como um componente reutilizável e independente para seleção de SKUs de produtos. Este widget conterá:

- **Dropdown de variação**: Permite selecionar entre as variações disponíveis do produto
- **Input de quantidade**: Permite definir a quantidade desejada com controles de incremento/decremento

O `SkuSelector` será projetado para ser **independente do mundo externo**, recebendo dados via props e comunicando seleções via callbacks. Isso permite sua reutilização em diferentes contextos (tela de produto, modais, quick view).

> **Nota**: A imagem e informações do produto (nome, preço, código) são componentes externos e **não fazem parte** deste widget. O `SkuSelector` apenas expõe o SKU selecionado via callback para que o componente pai atualize essas informações.

## Referência Visual

![SKU Selector Design](file:///C:/Users/petros/.gemini/antigravity/brain/ae2e2bdf-a32e-4f70-8de6-42e10eb4bc5c/uploaded_image_1769010234568.png)

*Design de referência mostrando o dropdown de variação (MATERIAL) e o seletor de quantidade com botões +/-*

---

## 2. O que já existe?

### Camada Core

| Recurso        | Caminho                                        | Descrição                                                                                              |
| -------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `ProductDto`   | `lib/core/catalog/dtos/product_dto.dart`       | DTO com campos: `id`, `slug`, `skuCode`, `name`, `description`, `specifications`, `skus`, `imageUrl`, `brand` |
| `SkuDto`       | `lib/core/catalog/dtos/sku_dto.dart`           | DTO do SKU com `id`, `skuCode`, preços, `imageUrl`, `variations: List<VariationDto>`, `stock`          |
| `VariationDto` | `lib/core/catalog/dtos/variation_dto.dart`     | DTO com `id`, `name` (ex: "Material"), `value` (ex: "Inox")                                            |

### Camada UI (Referências de Padrão)

| Recurso                        | Caminho                                                                                              | Descrição                                              |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `ProductCardPresenter`         | `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/product_card_presenter.dart`      | Exemplo de Presenter com Signals e computed properties |
| `CategoryFilterModalPresenter` | `lib/ui/catalog/widgets/screens/catalog/filters-bar/category-filter-modal/category_filter_modal_presenter.dart` | Exemplo de seleção com estado                         |

---

## 3. O que deve ser criado?

### Camada UI

#### Widget SkuSelector (Componente Reutilizável)

**Localização:** `lib/ui/catalog/widgets/components/sku-selector/`

Este widget será criado na pasta `components/` pois é um componente reutilizável que não pertence a uma tela específica.

##### Estrutura de arquivos (padrão MVP):

```
sku-selector/
├── index.dart
├── sku_selector_view.dart
├── sku_selector_presenter.dart
├── variation-dropdown/
│   ├── index.dart
│   ├── variation_dropdown_view.dart
│   └── variation_dropdown_presenter.dart
└── quantity-input/
    ├── index.dart
    ├── quantity_input_view.dart
    └── quantity_input_presenter.dart
```

---

##### Arquivo: `sku_selector_presenter.dart`

**Classe:** `SkuSelectorPresenter`

- **Dependências** (via construtor):
  - `skus`: `List<SkuDto>` - lista de SKUs disponíveis
  - `variationLabel`: `String` - rótulo do tipo de variação (ex: "MATERIAL")
  - `onSkuSelected`: `void Function(SkuDto)` - callback quando SKU é selecionado
  - `onQuantityChanged`: `void Function(int)` - callback quando quantidade muda

- **Estado reativo** (Signals):
  - `selectedSku`: `signal<SkuDto?>()` - SKU atualmente selecionado (inicia null = placeholder)
  - `quantity`: `signal<int>(1)` - quantidade selecionada

- **Computed** (derivados):
  - `activeSku`: `computed(() => selectedSku.value ?? skus.first)` - SKU ativo para cálculos
  - `maxQuantity`: `computed(() => activeSku.value.stock)` - quantidade máxima baseada no estoque
  - `canIncrement`: `computed(() => quantity.value < maxQuantity.value)` - pode incrementar?
  - `canDecrement`: `computed(() => quantity.value > 1)` - pode decrementar?
  - `isOutOfStock`: `computed(() => activeSku.value.stock <= 0)` - está sem estoque?
  - `hasSelection`: `computed(() => selectedSku.value != null)` - usuário já selecionou?
  - `variationOptions`: `computed(() => skus.map((sku) => _getVariationValue(sku)).toSet().toList())`

- **Métodos**:
  - `selectSkuByVariation(String variationValue)`: Encontra e seleciona o SKU correspondente
  - `incrementQuantity()`: Incrementa quantidade se `canIncrement`
  - `decrementQuantity()`: Decrementa quantidade se `canDecrement`
  - `setQuantity(int value)`: Define quantidade diretamente (validando limites)
  - `_getVariationValue(SkuDto sku)`: Retorna o valor da variação para exibição

- **Lógica**:
  - Ao selecionar um novo SKU, resetar `quantity` para 1
  - Ao mudar quantidade, chamar `onQuantityChanged`
  - Ao selecionar SKU, chamar `onSkuSelected`

- **Provider**:
  ```dart
  final skuSelectorPresenterProvider = Provider.autoDispose
      .family<SkuSelectorPresenter, ({
        List<SkuDto> skus,
        String variationLabel,
        void Function(SkuDto) onSkuSelected,
        void Function(int) onQuantityChanged,
      })>(
        (ref, props) => SkuSelectorPresenter(
          skus: props.skus,
          variationLabel: props.variationLabel,
          onSkuSelected: props.onSkuSelected,
          onQuantityChanged: props.onQuantityChanged,
        ),
      );
  ```

---

##### Arquivo: `sku_selector_view.dart`

**Classe:** `SkuSelectorView` (ConsumerWidget)

- **Props**:
  - `skus`: `List<SkuDto>` - lista de SKUs do produto
  - `variationLabel`: `String` - rótulo da variação (ex: "MATERIAL")
  - `onSkuSelected`: `void Function(SkuDto)` - callback de seleção de SKU
  - `onQuantityChanged`: `void Function(int)` - callback de mudança de quantidade

- **Layout** (`Column` com `CrossAxisAlignment.stretch`):

  1. **VariationDropdown** - Label + Dropdown de seleção de variação
  2. `SizedBox(height: 16)` - Espaçamento
  3. **QuantityInput** - Seletor de quantidade com +/-

- **Responsabilidades**:
  - Obter Presenter via `ref.watch(skuSelectorPresenterProvider(...))`
  - Orquestrar e passar dados para sub-widgets
  - Usar `Watch()` do signals para reatividade

---

##### Arquivo: `index.dart`

```dart
import 'sku_selector_view.dart';
typedef SkuSelector = SkuSelectorView;
```

---

#### Sub-Widgets do SkuSelector

##### 1. `variation-dropdown/`

**Arquivo:** `variation_dropdown_presenter.dart`

**Classe:** `VariationDropdownPresenter`

- **Dependências** (via construtor):
  - `label`: `String` - rótulo da variação (ex: "MATERIAL")
  - `options`: `List<String>` - valores possíveis (ex: ["Inox", "Alumínio"])
  - `selectedValue`: `String?` - valor atualmente selecionado
  - `onSelect`: `void Function(String)` - callback de seleção

- **Estado reativo**:
  - `internalSelectedValue`: `signal<String?>(null)` - inicializa com `selectedValue`

- **Computed**:
  - `displayValue`: `computed(() => internalSelectedValue.value ?? "Selecionar")`
  - `hasSelection`: `computed(() => internalSelectedValue.value != null)`

- **Métodos**:
  - `selectOption(String value)`: Atualiza `internalSelectedValue` e chama `onSelect`

- **Provider**:
  ```dart
  final variationDropdownPresenterProvider = Provider.autoDispose
      .family<VariationDropdownPresenter, ({
        String label,
        List<String> options,
        String? selectedValue,
        void Function(String) onSelect,
      })>(
        (ref, props) => VariationDropdownPresenter(
          label: props.label,
          options: props.options,
          selectedValue: props.selectedValue,
          onSelect: props.onSelect,
        ),
      );
  ```

**Arquivo:** `variation_dropdown_view.dart`

**Classe:** `VariationDropdownView` (ConsumerWidget)

- **Props**:
  - `label`: `String`
  - `options`: `List<String>`
  - `selectedValue`: `String?`
  - `onSelect`: `void Function(String)`

- **Layout**:

  1. **Label**:
     - Texto: `label` (ex: "MATERIAL")
     - Estilo: uppercase, cor mutedForeground, FontWeight.w600
     - FontSize: pequeno (12sp)

  2. **Dropdown** (usando `Select<String>` do shadcn_flutter):
     - Placeholder: "Selecionar"
     - Valor: `presenter.internalSelectedValue.value`
     - `onChanged`: chama `presenter.selectOption(value)`

- **Exemplo de implementação**:
  ```dart
  Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(
        label.toUpperCase(),
        style: theme.typography.small.copyWith(
          color: theme.colorScheme.mutedForeground,
          fontWeight: FontWeight.w600,
        ),
      ),
      const SizedBox(height: 8),
      Select<String>(
        value: presenter.internalSelectedValue.value,
        placeholder: const Text('Selecionar'),
        onChanged: (value) {
          if (value != null) presenter.selectOption(value);
        },
        itemBuilder: (context, item) => Text(item),
        popup: SelectPopup.menu(
          children: options.map((option) => SelectItem(
            value: option,
            child: Text(option),
          )).toList(),
        ),
      ),
    ],
  )
  ```

**Arquivo:** `index.dart`
```dart
import 'variation_dropdown_view.dart';
typedef VariationDropdown = VariationDropdownView;
```

---

##### 2. `quantity-input/`

**Arquivo:** `quantity_input_presenter.dart`

**Classe:** `QuantityInputPresenter`

- **Dependências** (via construtor):
  - `initialQuantity`: `int` - quantidade inicial (default: 1)
  - `maxQuantity`: `int` - quantidade máxima (baseada no estoque)
  - `onQuantityChanged`: `void Function(int)` - callback de mudança

- **Estado reativo**:
  - `quantity`: `signal<int>(1)` - quantidade atual

- **Computed**:
  - `canIncrement`: `computed(() => quantity.value < maxQuantity)`
  - `canDecrement`: `computed(() => quantity.value > 1)`
  - `displayQuantity`: `computed(() => quantity.value.toString())`

- **Métodos**:
  - `increment()`: Incrementa se `canIncrement`, chama `onQuantityChanged`
  - `decrement()`: Decrementa se `canDecrement`, chama `onQuantityChanged`
  - `setQuantity(int value)`: Define valor diretamente (clamped entre 1 e maxQuantity)

- **Provider**:
  ```dart
  final quantityInputPresenterProvider = Provider.autoDispose
      .family<QuantityInputPresenter, ({
        int initialQuantity,
        int maxQuantity,
        void Function(int) onQuantityChanged,
      })>(
        (ref, props) => QuantityInputPresenter(
          initialQuantity: props.initialQuantity,
          maxQuantity: props.maxQuantity,
          onQuantityChanged: props.onQuantityChanged,
        ),
      );
  ```

**Arquivo:** `quantity_input_view.dart`

**Classe:** `QuantityInputView` (ConsumerWidget)

- **Props**:
  - `initialQuantity`: `int`
  - `maxQuantity`: `int`
  - `onQuantityChanged`: `void Function(int)`

- **Layout** (`Row` com `MainAxisAlignment.start`):

  1. **Botão Decrementar (-)**:
     - Ícone: `Icons.remove` ou texto "-"
     - Estilo: `Button.outline` ou `IconButton`
     - **Desabilitado** quando `!presenter.canDecrement.value`
     - `onPressed`: `presenter.decrement()`

  2. **Display de Quantidade**:
     - Container com padding horizontal
     - Texto: `presenter.displayQuantity.value`
     - Min-width para evitar layout shift
     - Centralizado

  3. **Botão Incrementar (+)**:
     - Ícone: `Icons.add` ou texto "+"
     - Estilo: `Button.outline` ou `IconButton`
     - **Desabilitado** quando `!presenter.canIncrement.value`
     - `onPressed`: `presenter.increment()`

- **Visual (baseado no PRD E.1-E.2)**:
  - Botões com área de toque mínima de 44px
  - Cor primária para botões ativos
  - Cor muted para botões desabilitados
  - Número centralizado entre os botões

- **Exemplo de implementação**:
  ```dart
  Row(
    mainAxisSize: MainAxisSize.min,
    children: [
      Button.outline(
        size: ButtonSize.icon,
        onPressed: presenter.canDecrement.value ? presenter.decrement : null,
        child: const Icon(Icons.remove),
      ),
      Container(
        constraints: const BoxConstraints(minWidth: 48),
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Text(
          presenter.displayQuantity.value,
          textAlign: TextAlign.center,
          style: theme.typography.large,
        ),
      ),
      Button.outline(
        size: ButtonSize.icon,
        onPressed: presenter.canIncrement.value ? presenter.increment : null,
        child: const Icon(Icons.add),
      ),
    ],
  )
  ```

**Arquivo:** `index.dart`
```dart
import 'quantity_input_view.dart';
typedef QuantityInput = QuantityInputView;
```

---

## 4. O que deve ser modificado?

### Camada UI

#### Criar pasta `components/` em `lib/ui/catalog/widgets/`

A pasta `lib/ui/catalog/widgets/components/` deve ser criada para abrigar widgets reutilizáveis do módulo Catalog que não pertencem a uma tela específica.

---

## 5. O que deve ser removido?

Nenhum arquivo precisa ser removido.

---

## 6. Usar como referência

| Padrão                           | Arquivo de Referência                                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Estrutura MVP (View + Presenter) | `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/`                                        |
| Uso de Signals com computed      | `product_card_presenter.dart` → `salePrice`, `discountPrice`                                                |
| Barrel pattern (index.dart)      | `lib/ui/catalog/widgets/screens/catalog/products-list/product-card/index.dart`                              |
| Componente Select do shadcn      | Documentação: `Select<T>` com `SelectPopup.menu` e `SelectItem`                                             |
| Seleção com estado               | `category_filter_modal_presenter.dart` → `isCategorySelected`, `selectedCategory`                           |

---

## 7. Resumo de Arquivos

### Arquivos a criar:

**SkuSelector (principal):**
1. `lib/ui/catalog/widgets/components/sku-selector/index.dart`
2. `lib/ui/catalog/widgets/components/sku-selector/sku_selector_view.dart`
3. `lib/ui/catalog/widgets/components/sku-selector/sku_selector_presenter.dart`

**Sub-widget VariationDropdown:**
4. `lib/ui/catalog/widgets/components/sku-selector/variation-dropdown/index.dart`
5. `lib/ui/catalog/widgets/components/sku-selector/variation-dropdown/variation_dropdown_view.dart`
6. `lib/ui/catalog/widgets/components/sku-selector/variation-dropdown/variation_dropdown_presenter.dart`

**Sub-widget QuantityInput:**
7. `lib/ui/catalog/widgets/components/sku-selector/quantity-input/index.dart`
8. `lib/ui/catalog/widgets/components/sku-selector/quantity-input/quantity_input_view.dart`
9. `lib/ui/catalog/widgets/components/sku-selector/quantity-input/quantity_input_presenter.dart`

### Arquivos a modificar:

Nenhum arquivo existente precisa ser modificado.

---

## 8. Notas de Implementação

1. **Independência**: O `SkuSelector` não faz chamadas de API nem depende de Services. Toda a lógica é local.

2. **Estado Inicial**: 
   - Dropdown inicia com placeholder "Selecionar"
   - Quantidade inicia em 1

3. **Comunicação via Callbacks**:
   - `onSkuSelected(SkuDto)`: Permite que o componente pai atualize imagem, preço, código
   - `onQuantityChanged(int)`: Permite que o componente pai saiba a quantidade para o carrinho

4. **Validações**:
   - Quantidade mínima: 1
   - Quantidade máxima: `sku.stock`
   - Botões desabilitados nos limites

5. **Reset de Quantidade**: Ao trocar de SKU, quantidade volta para 1

6. **Componentes Externos** (não fazem parte desta spec):
   - Imagem do produto
   - Nome do produto
   - Preço e badge de desconto
   - Código SKU
   - Timer de oferta
   - Botão de adicionar ao carrinho
