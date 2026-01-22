# Implement Spec Skill

**Objetivo:**
Executar o plano de implementação técnica de forma iterativa, organizada e validada, garantindo qualidade e integração contínua.

**Entrada:**
*   Documento de Spec técnica aprovado/finalizado.

**Diretrizes de Execução:**

1.  **Validação de Diretrizes e Arquitetura:**
    Antes de iniciar a implementação, certifique-se de que compreende as diretrizes e a estrutura do projeto:
    *   **Arquitetura & Clean Architecture:** `documentation\architecture.md` (Fonte primária de verdade)
    *   **Padronização de Código:** `documentation\code-conventions-guidelines.md`
    *   **Diretrizes de Camadas:**
        *   **Core:** `documentation\core-layer-guidelines.md`
        *   **UI:** `documentation\ui-layer-guidelines.md`
        *   **REST:** `documentation\rest-layer-guidelines.md`
        *   **Drivers:** `documentation\drivers-layer-guidelines.md`
    *   **Padrões de Testes:** `documentation\unit-tests-guidelines.md`
    *   **Estratégia de Branch & Commits:** `documentation\developement-guidelines.md`

2.  **Decomposição Atômica:**
    *   Divida o plano macro em micro-tarefas atômicas.
    *   Cada tarefa deve resultar em um código compilável e funcional isoladamente.

3.  **Ordem de Execução (Bottom-Up):**
    Implemente as tarefas seguindo rigorosamente a hierarquia de dependências:
    1.  **Modelos:** DTOs e entidades de domínio.
    2.  **Backend/Core:** Services, Repositories, UseCases.
    3.  **State Management:** Stores (Signals), Presenters, Controllers.
    4.  **Interface de Usuário:** Views e Widgets.
    *   **Regra:** Nunca implemente um componente consumidor (ex: Widget) antes de implementar a lógica/dados que ele consome.

4.  **Ciclo de Qualidade e Verificação (Por Tarefa):**
    Ao finalizar a codificação de *cada micro-tarefa*, execute os passos de validação ANTES de passar para a próxima:
    *   **Formatação:** Execute `dart format .`
    *   **Análise Estática:** Execute `flutter analyze` (ou utilize ferramentas MCP do dart).
    *   **Critério de Aceite:** Corrija imediatamente quaisquer erros ou recomendações do linter. Não avance com código "sujo".

5.  **Uso de Ferramentas Auxiliares (Context7):**
    *   Caso tenha dúvidas sobre como usar uma biblioteca específica (ex: `shadcn_flutter`), utilize o MCP do Context7 para obter documentação e exemplos de uso.

6.  **Planejamento e Tarefas:**
    *   Caso tenha sido realizado o planejamento e a definição de tarefas prévias, leve-as em consideração durante a implementação.

7.  **Consistência de Padrões:**
    *   **Camada UI:** 
        *   Sempre que criar um widget interno, crie uma pasta dedicada para ele dentro da estrutura do widget pai.
        *   **Importante:** Utilize exclusivamente o `shadcn_flutter` para componentes de interface, evitando o uso de `Material UI`.

