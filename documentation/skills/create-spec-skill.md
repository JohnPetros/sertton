# Instruções para Escrever Especificações Técnicas (Specs)

Uma **Spec** é um documento que detalha a implementação técnica de uma feature, fix ou refactoring. Ela serve como ponte entre o PRD (Product Requirements Document) e o código.

Ao receber a tarefa de escrever ou completar uma Spec, você deve seguir este processo e estrutura.

## Processo de Criação

1.  **Analise o Input**: Geralmente você receberá um esboço da spec.
2.  **Leia e entenda o PRD associado**.
    - O arquivo fica em um nivél superior ao Spec.
3.  **Pesquise a Codebase**: 
    - Identifique o que já existe.
    - Verifique onde os novos arquivos se encaixam na arquitetura.
    - Encontre exemplos similares para usar como referência.
4.  **Complete a Spec**: Preencha as seções detalhando nomes de arquivos, classes, métodos e responsabilidades, garantindo conformidade com `documentation/architecture.md`.

## Contexto do projeto

- Se perceber que deve ser usado de alguma forma a camada Core, siga as diretrizes de `documentation/core-layer-guidelines.md`.

- Se perceber que deve ser usado de alguma forma a camada Rest, siga as diretrizes de `documentation/rest-layer-guidelines.md`.

- Se perceber que deve ser usado de alguma forma a camada UI, siga as diretrizes de `documentation/ui-layer-guidelines.md`.

## Estrutura do Documento

A Spec finalizada deve seguir estritamente o modelo abaixo:

### 1. Título (Obrigatório)
O nome da tarefa ou funcionalidade.

### 2. Objetivo (Obrigatório)
Uma descrição clara do que será implementado.

### 3. O que já existe? (Obrigatório)
Liste os recursos existentes na codebase que serão utilizados, estendidos ou impactados.
- **Tipos de recursos**: Services, Widgets, Constants, Stores (Signals), Drivers, DTOs, etc.
- **Detalhe**: Indique o caminho ou nome da classe para facilitar a localização.

### 4. O que deve ser criado? (Depende da tarefa)
Descreva os novos componentes que precisam ser programados.
- **Organização**: Use subtítulos (h3) para separar por camadas ou recursos principais (ex: `### Camada Core`, `### Widget de Listagem`).
- **Detalhamento**: Use bullet points para explicar as responsabilidades e requisitos de cada novo recurso.
- **Widgets Internos**: Se um widget principal tiver sub-widgets complexos, detalhe-os aqui também.

### 5. O que deve ser modificado? (Depende da tarefa)
Descreva alterações necessárias em código existente.
- **Organização**: Subtítulos por recurso.
- **Detalhamento**: Explique exatamente o que muda (ex: adicionar novo campo no DTO, alterar lógica no Service).

### 6. O que deve ser removido? (Depende da tarefa)
Liste arquivos ou trechos de código que devem ser excluídos (ex: limpeza de código legado ou refatoração).

### 7. Usar como referência (Opcional)
Aponte arquivos existentes que implementam padrões similares e podem servir de base para o desenvolvedor (copy-paste inteligente ou inspiração de estrutura).

---

## Exemplo de Aplicação

**Usuário**: "Crie a spec para a tela de Login baseada neste esboço..."
**IA**: 
1. Lê o esboço.
2. Lê o PRD (se disponível).
3. Busca na codebase por DTOs de Auth, Services de Login existentes, e componentes de UI padrão.
4. Gera o documento Markdown seguindo a estrutura acima (Título, Objetivo, O que já existe, O que criar, etc.), preenchendo as lacunas técnicas com informações reais da codebase.
