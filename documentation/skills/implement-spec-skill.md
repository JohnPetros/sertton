## Protocolo de Implementação de Funcionalidades

Ao executar um plano de implementação, siga rigorosamente este fluxo iterativo:

### 1. Decomposição Atômica
Divida o plano macro em micro-tarefas atômicas. Cada tarefa deve resultar em um código compilável e funcional isoladamente.

### 2. Ordem de Execução (Dependências)
Implemente as tarefas seguindo a hierarquia de dependências (Bottom-Up):
- **1º:** Modelos de Dados (Dtos).
- **2º:** Camada de backend / Services .
- **3º:** State Management (Stores/Presenter).
- **4º:** Interface de Usuário (Views).
*Regra:* Nunca implemente um Widget que consome dados antes de implementar a lógica de obtenção desses dados.

### 3. Ciclo de Qualidade e Verificação
Ao finalizar a escrita do código de **cada tarefa**, execute os passos de validação abaixo ANTES de passar para a próxima:

1.  **Formatação:**
    Execute `dart format .` para garantir o estilo padrão.
2.  **Análise Estática:**
    Execute `flutter analyze`.
    - *Se houver erros:* Corrija-os imediatamente. Não prossiga com erros de linter.

---