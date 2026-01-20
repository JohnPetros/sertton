# Implement Spec Skill

**Objetivo:**
Executar o plano de implementação técnica de forma iterativa, organizada e validada, garantindo qualidade e integração contínua.

**Entrada:**
*   Documento de Spec técnica aprovado/finalizado.

**Diretrizes de Execução:**

1.  **Decomposição Atômica:**
    *   Divida o plano macro em micro-tarefas atômicas.
    *   Cada tarefa deve resultar em um código compilável e funcional isoladamente.

2.  **Ordem de Execução (Bottom-Up):**
    Implemente as tarefas seguindo rigorosamente a hierarquia de dependências:
    1.  **Modelos:** DTOs e entidades de domínio.
    2.  **Backend/Core:** Services, Repositories, UseCases.
    3.  **State Management:** Stores (Signals), Presenters, Controllers.
    4.  **Interface de Usuário:** Views e Widgets.
    *   **Regra:** Nunca implemente um componente consumidor (ex: Widget) antes de implementar a lógica/dados que ele consome.

3.  **Ciclo de Qualidade e Verificação (Por Tarefa):**
    Ao finalizar a codificação de *cada micro-tarefa*, execute os passos de validação ANTES de passar para a próxima:
    *   **Formatação:** Execute `dart format .`
    *   **Análise Estática:** Execute `flutter analyze` (ou utilize ferramentas MCP).
    *   **Critério de Aceite:** Corrija imediatamente quaisquer erros ou recomendações do linter. Não avance com código "sujo".

4.  **Uso de Ferramentas Auxiliares (Context7):**
    *   Caso tenha dúvidas sobre como usar uma biblioteca específica (ex: `shadcn_flutter`), utilize o MCP do Context7 para obter documentação e exemplos de uso.

5.  **Planejamento e Tarefas:**
    *   Caso tenha sido realizado o planejamento e a definição de tarefas prévias, leve-as em consideração durante a implementação.

6.  **Consistência de Padrões:**
    *   **Camada UI:** 
        *   Sempre que criar um widget interno, crie uma pasta dedicada para ele dentro da estrutura do widget pai.
        *   **Importante:** Utilize exclusivamente o `shadcn_flutter` para componentes de interface, evitando o uso de `Material UI`.

