## Protocolo de Refactorização e Pequenas Alterações

Execute a modificação solicitada no código. O objetivo é alterar a implementação mantendo o comportamento externo inalterado (Regressão Zero).

Após a edição, execute o seguinte pipeline de validação sequencial. Se qualquer passo falhar, **PARE** e corrija antes de avançar.

1.  **Formatação:**
    Execute `dart format .`
    *Objetivo:* Garantir a consistência do estilo de código.

2.  **Análise Estática (Linting):**
    Execute `flutter analyze`
    *Ação:* Se existirem erros ou avisos (warnings), corrija-os imediatamente. O código não pode conter violações de linter.
