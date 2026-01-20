# Review Code Skill

**Objetivo:**
Realizar uma revisão técnica rigorosa da base de código para assegurar conformidade com os padrões do projeto, identificar bugs latentes e manter a integridade da análise estática (no-warnings policy).

**Entrada:**
*   (Opcional) Caminhos de arquivos ou diretórios específicos.
*   (Padrão) Todo o projeto, caso nenhum caminho seja fornecido.

**Diretrizes de Execução:**

1.  **Análise de Qualidade Estática:**
    *   Execute a ferramenta **Dart MCP** `analyze_files` para listar erros, alertas (warnings) e inconsistências de codificação.
    *   Examine a severidade dos problemas reportados para planejar a ordem de correção, priorizando erros de compilação críticos.

2.  **Correção Automatizada:**
    *   Aplique a ferramenta **Dart MCP** `dart_fix` para resolver automaticamente violações de regras que possuam correções rápidas (quick fixes).
    *   **Atenção:** Verifique as alterações realizadas para garantir que a semântica do código foi preservada.

3.  **Refatoração Manual e Padrões de Projeto:**
    *   Corrija manualmente os problemas que as ferramentas automatizadas não puderam resolver.
    *   Consulte e siga rigorosamente as diretrizes específicas da camada afetada:
        *   **Core:** [core-layer-guidelines.md](../core-layer-guidelines.md)
        *   **UI:** [ui-layer-guidelines.md](../ui-layer-guidelines.md)
        *   **Geral:** [architecture.md](../architecture.md)
    *   Garanta o uso correto de padrões como MVP, injeção de dependência com Riverpod e reatividade com Signals.

4.  **Verificação e Validação:**
    *   Execute o **Dart MCP** `run_tests` para validar que as alterações não impactaram o comportamento funcional do sistema.
    *   Realize uma rodada final de `analyze_files` para confirmar o estado "limpo" do código.

**Critério de Sucesso:**
A revisão é considerada concluída quando a análise estática retornar **"No issues found"** e todos os testes automatizados relevantes estiverem passando com sucesso.