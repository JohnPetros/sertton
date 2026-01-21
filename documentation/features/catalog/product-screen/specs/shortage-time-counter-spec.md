# Spec: Contador de tempo de falta até o estoque acabar

## Objetivo

Implementar o contador de tempo que conta quanto tempo falta para o estoque acabar. É um contador fictício, que simula a contagem regressiva de um estoque que está acabando. O tempo deve ser exibido em horas, minutos e segundos, resetando ao final de cada dia.

## O que já existe?

*   `shadcn_flutter`: Biblioteca de UI base utilizada para estilização e ícones (`RadixIcons.stopwatch`).
*   `lib/ui/catalog/widgets/components/`: Diretório onde componentes reutilizáveis do módulo de catálogo residem.
*   `ProductScreenView`: Tela onde o componente foi integrado.

## Implementação Final ("As Built")

### UI Layer (`lib/ui/catalog/widgets/components/shortage-time-counter/`)

1.  **`shortage_time_counter_presenter.dart`**:
    *   **Padrão**: Family Provider (`shortageTimeCounterPresenterProvider(int stock)`).
    *   **Estado**: `remainingTime` (Signal<Duration>).
    *   **Lógica**:
        *   Calcula o tempo restante até o início do próximo dia (`DateTime.now().toLocal()`).
        *   Usa `Timer.periodic` de 1 segundo para atualizar o sinal.
        *   Garante que o tempo seja relativo ao fuso horário local do usuário.

2.  **`shortage_time_counter_view.dart`**:
    *   **Componente**: `ConsumerWidget` chamado `ShortageTimeCounterView`.
    *   **Mensagem**: "Apenas **{stock}** restantes! O estoque acaba em: **{HH:mm:ss}**".
    *   **Resolução de Overflow**: Utiliza `Text.rich` dentro de um `Expanded` para permitir quebra de linha em telas pequenas.
    *   **Estilização**:
        *   Container com fundo `destructive` (opacidade 0.1) e borda (opacidade 0.2).
        *   Ícone `RadixIcons.stopwatch` alinhado ao topo do texto.
        *   Uso de `FontFeature.tabularFigures()` no cronômetro para evitar jitter.

3.  **`index.dart`**:
    *   Exporta o widget como `ShortageTimeCounter`.

## Integração

*   **Arquivo**: `lib/ui/catalog/widgets/screens/product/product_screen_view.dart`.
*   **Posição**: Inserido abaixo do `SkuSelector`, recebendo `sku.stock`.

## Usar como referência

*   `ui-layer-guidelines.md` para estrutura de arquivos e padrão MVP.