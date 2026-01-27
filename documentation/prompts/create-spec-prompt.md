Com certeza. Mantendo a estrutura exata que você pediu, mas injetando as instruções de qualidade (detalhamento de signals, paths, layout ASCII, etc.) dentro das **Diretrizes de Execução**.

Aqui está o prompt otimizado:

---

# Create Spec Skill

**Objetivo:**
Detalhar a implementação técnica de uma feature, fix ou refatoração, atuando como um Tech Lead Sênior. O documento deve servir como uma ponte estritamente definida entre o PRD (Product Requirements Document) e o código, com nível de detalhe suficiente para que a implementação seja direta e sem ambiguidades.

**Entrada:**

* Esboço da tarefa ou solicitação de mudança.
* PRD associado (nível superior).
* Acesso à codebase atual.

**Diretrizes de Execução:**

1. **Pesquisa e Contextualização (Chain of Thought):**
* **Mapeie o Fluxo:** Antes de escrever, entenda a origem e o destino dos dados (UI -> Store -> Service -> API).
* **Verifique a Existência:** Investigue a codebase para identificar recursos existentes (Widgets, DTOs, Services) que devem ser reutilizados ou estendidos. Evite duplicidade.
* **Consulte Guidelines:** Aplique os padrões das camadas (`core`, `rest`, `ui`, `drivers`) e da stack (Riverpod, Signals).
* **Identifique Referências:** Procure na codebase por exemplos similares ("copy-paste inteligente") para sugerir como referência.


2. **Estruturação do Documento:**
Gere o arquivo Markdown da Spec seguindo estritamente o modelo de seções e nível de detalhe abaixo:
* ### 1. Título (Obrigatório)


Nome técnico da tarefa ou funcionalidade.
* ### 2. Objetivo (Obrigatório)


Resumo claro em um parágrafo do que será entregue funcionalmente e tecnicamente.
* ### 3. O que já existe? (Obrigatório)


Liste recursos da codebase que serão utilizados ou impactados.
* Formato: **`NomeDaClasse`** (`caminho/relativo/do/arquivo.dart`) - *Breve descrição do uso (ex: método a chamar, store a consumir).*


* ### 4. O que deve ser criado? (Depende da tarefa)


Descreva novos componentes dividindo por camadas. Para cada arquivo novo, detalhe:
* **Camada Lógica (Presenters, Stores, Services):**
* **Localização:** `caminho/do/arquivo.dart`
* **Dependências:** O que deve ser injetado.
* **Signals/Estado:** Liste as variáveis reativas (ex: `isLoading`, `items`).
* **Computeds:** Variáveis derivadas (ex: `isEmpty`, `totalPrice`).
* **Métodos:** Assinatura e responsabilidade.


* **Camada UI (Widgets, Screens):**
* **Localização:** `caminho/do/arquivo.dart`
* **Props:** Parâmetros recebidos no construtor.
* **Estados:** Como se comporta em Loading, Error, Empty, Content.
* **Layout Visual (ASCII Art):** **OBRIGATÓRIO**. Desenhe a estrutura visual aproximada dos widgets para facilitar a montagem.




* ### 5. O que deve ser modificado? (Depende da tarefa)


Alterações em código existente.
* Indique o arquivo e descreva a mudança específica (ex: "Adicionar prop `onTap`", "Injetar novo service").


* ### 6. O que deve ser removido? (Depende da tarefa)


Limpeza de código legado ou refatoração.
* ### 7. Usar como referência (Opcional)


Arquivos que servem de inspiração estrutural ou lógica para a implementação.


3. **Diagramas de Visualização:**
* **Fluxo de Dados:** Gere um diagrama em notação ASCII ou Text-based mostrando a interação entre as camadas (ex: `View` -> `Presenter` -> `Store` -> `Service`).
* **Layout:** Como mencionado acima, use ASCII para representar a hierarquia visual de telas e widgets complexos.