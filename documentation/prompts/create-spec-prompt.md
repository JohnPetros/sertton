# Create Spec Skill

**Objetivo:**
Detalhar a implementação técnica de uma feature, fix ou refatoração, servindo como ponte estritamente definida entre o PRD (Product Requirements Document) e o código.

**Entrada:**
*   Esboço da tarefa ou solicitação de mudança.
*   PRD associado (nível superior).
*   Acesso à codebase atual.

**Diretrizes de Execução:**

1.  **Pesquisa e Contextualização:**
    *   Analise o PRD para compreender a fundo a regra de negócio.
    *   Investigue a codebase para identificar recursos existentes que deve ser usados na implementação, quais recursos precisam ser criados e quais já existem mas precisam ser modificados.
    *   Procure pesquisar na codebase por exemplos similares que possam ser reutilizados.
    *   Consulte as guidelines específicas (`core-layer-guidelines.md`, `rest-layer-guidelines.md`, `ui-layer-guidelines.md`, `drivers-layer-guidelines.md`) conforme a camada afetada.

2.  **Estruturação do Documento:**
    Gere o arquivo Markdown da Spec seguindo estritamente o modelo de seções abaixo:

    *   ### 1. Título (Obrigatório)
        Nome da tarefa ou funcionalidade.
    *   ### 2. Objetivo (Obrigatório)
        Descrição clara do que será implementado.
    *   ### 3. O que já existe? (Obrigatório)
        Liste recursos da codebase (Services, Widgets, DTOs, Stores, Drivers, etc.) que serão utilizados, estendidos ou impactados. Indique caminhos/nomes.
    *   ### 4. O que deve ser criado? (Depende da tarefa)
        Descreva novos componentes. Use subtítulos para separar camadas (ex: Core, UI). Use bullet points para responsabilidades. Detalhe sub-widgets.
    *   ### 5. O que deve ser modificado? (Depende da tarefa)
        Alterações em código existente. Subtítulos por recurso.
    *   ### 6. O que deve ser removido? (Depende da tarefa)
        Limpeza de código legado ou refatoração (se houver).
    *   ### 7. Usar como referência (Opcional)
        Arquivos que servem de "copy-paste inteligente" ou inspiração estrutural.

3.  **Diagramas de Visualização:**
    *   Avalie se as mudanças implementadas alteraram fluxos complexos ou a navegação entre telas.
    *   **Ação:** Se cabível, gere ou atualize um diagrama (fluxo de dados ou sequência) para facilitar a visualização da implementação final.
    *   Utilize a notação ASCII art ou Text-based diagram para gerar o diagrama