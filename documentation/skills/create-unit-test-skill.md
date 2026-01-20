# Create Unit/Widget Test Skill

**Objetivo:**
Orientar a criação de testes unitários e de widget padronizados e eficientes para Presenters e Widgets.

**Entrada:**
*   Arquivo de código fonte: `Widget`, que inclui `View` (UI) e `Presenter` (lógica).
*   Dependências relacionadas (DTOs, Repositórios, Serviços).

**Diretrizes de Execução:**

1.  **Adesão às Normas do Projeto:**
    *   **Obrigatório:** Consulte e siga as diretrizes detalhadas em [documentation/unit-tests-guidelines.md](../unit-tests-guidelines.md).
    *   **UI/Widgets:** Para testes de widgets, considere também as boas práticas de UI em [documentation/ui-layer-guidelines.md](../ui-layer-guidelines.md).

2.  **Geração de Dados (Fakers):**
    *   Utilize classes `Faker` para instanciar DTOs e modelos com dados fictícios.
    *   **Ação Necessária:** Se um Faker necessário não existir para um DTO, sua primeira tarefa é criá-lo (ex: `BrandFaker` para `BrandDto`).
    *   **Importante:** Os fakers ficam na pasta `test/fakers/<nome do módulo ao qual o DTO pertence>`.

3.  **Qualidade de Código:**
    *   **Clean Code:** Não inclua comentários no código de teste gerado. O código deve ser legível e expressivo por si só.

4.  **Cobertura de Widgets Internos:**
    *   Caso o widget principal possua widgets internos ou sub-componentes complexos, crie testes dedicados para cada um deles.

5.  **Validação:**
    *   Utilize o MCP do Dart (`run_tests`) para executar e validar os testes criados sempre que possível.

6. Caso tenha sido passado um widget, certifique-se que tenha testes tanto para o presenter quanto para a view

**Passo a Passo Sugerido:**

1.  **Setup:** Crie o arquivo de teste no diretório `test/` espelhando a estrutura de `lib/` (ex: `lib/feature/home.dart` -> `test/feature/home_test.dart`).
2.  **Mocking:** Configure os mocks das dependências usando `mocktail`.
3.  **Implementação:** Escreva os testes cobrindo cenários de sucesso e erro.
4.  **Execução:** Rode os testes e ajuste conforme necessário.
