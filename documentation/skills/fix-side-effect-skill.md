# Fix Side Effect Skill

**Objetivo:**
Identificar e corrigir regressões ou erros de compilação (efeitos colaterais) resultantes de alterações manuais no código fonte. O foco é reestabelecer a integridade do projeto atualizando dependências e validando testes.

**Entrada:**
*   Caminho do arquivo ou diretório onde ocorreram as edições manuais.

**Diretrizes de Execução:**

1.  **Diagnóstico Estático:**
    *   Utilize as ferramentas do **Dart MCP** (ex: `analyze_files`) para varrer o projeto em busca de erros de linting ou compilação gerados pela alteração.
    *   Priorize a correção de erros de sintaxe e contratos de interface quebrados.

2.  **Correção de Dependências:**
    *   Atualize todos os arquivos que dependem do código modificado (imports, chamadas de função, instâncias de classe).
    *   `caabe a você` garantir que a refatoração se propague corretamente por todo a base de código.

3.  **Validação de Testes:**
    *   **Verificação:** Caso a alteração tenha impactado a lógica de negócios ou a estrutura de classes, os testes correspondentes DEVEM ser atualizados.
    *   **Execução:** Utilize o **Dart MCP** (`run_tests`) para rodar os testes afetados.
    *   **Critério de Sucesso:** A tarefa só está concluída quando não houver erros de análise estática e os testes estiverem passando (verde).