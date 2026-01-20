# Commit Spec Skill

**Objetivo:**
Manter a documentação (Spec e PRD) sincronizada com a implementação real do código, garantindo que divergências naturais do desenvolvimento sejam registradas e regras de negócios atualizadas.

**Entrada:**
*   Alterações de código realizadas (diff).
*   Documento da Spec original.
*   PRD associado.

**Diretrizes de Execução:**

1.  **Verificação de Consistência ("As Built"):**
    *   Compare a solução implementada com o planejado na Spec.
    *   **Ação:** Se houve mudanças (ex: renomeação de classes, gestão de estado diferente), atualize a Spec para refletir a realidade.

2.  **Refinamento de Passos Futuros:**
    *   Analise se as alterações atuais impactam ou invalidam passos subsequentes descritos na Spec.
    *   **Ação:** Remova ou reescreva passos futuros obsoletos para se adequarem à nova arquitetura.

3.  **Atualização de Regra de Negócio (PRD):**
    *   Verifique se houve alguma alteração na lógica de negócios durante a implementação.
    *   **Ação:** Se a regra mudou, atualize o PRD associado imediatamente. A documentação do produto deve ser a fonte da verdade.