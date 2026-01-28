# Spec: Telas Institucionais

### Objetivo
Desenvolver as telas de "Políticas de Privacidade", "Sobre a Sertton Industrial", "Termos e Condições" e "Política de Devolução". O objetivo é garantir conformidade legal e fornecer informações claras ao usuário, utilizando uma arquitetura escalável que separa o conteúdo (hardcoded ou via API futura) da apresentação.

### O que já existe?
* **`Routes`** (`lib/constants/routes.dart`) - *Arquivo de rotas onde as novas entradas serão adicionadas.*
* **`Global Layout/Components`** (`lib/ui/global/widgets/layout`) - *Possíveis componentes de layout base.*

### O que deve ser criado?

#### Camada UI (Constants)
Centralização dos textos e links institucionais para fácil manutenção.

* **`InstitutionalContent`**
    * **Localização:** `lib/ui/institutional/constants/institutional_content.dart`
    * **Detalhes:**  Classe abstrata ou utilitária contendo `static const` ou métodos que retornam os Mapas/Listas de conteúdo (Termos, Políticas, Contatos).
    * **Exemplo de Estrutura:**
      ```dart
      class InstitutionalContent {
        static const String privacyPolicy = "...";
        static const String returnPolicy = "...";
        static const List<({String title, String content})> terms = [...];
        static const companyInfo = (...);
      }
      ```

#### Camada UI (Presenters & Screens)
Cada tela terá seu MVP. Os Presenters buscarão os dados diretamente de `InstitutionalContent`.

**1. Política de Privacidade**
* **Presenter:**
    * **Localização:** `lib/ui/institutional/widgets/screens/privacy_policy/privacy_policy_presenter.dart`
    * **Signals:** `isLoading` (opcional, pode ser removido se for instantâneo), `policy (String)`.
    * **Métodos:** `loadPolicy()` (carrega de `InstitutionalContent`).
* **View:**
    * **Localização:** `lib/ui/institutional/widgets/screens/privacy_policy/privacy_policy_screen.dart`
    * **Comportamento:** Exibe o texto formatado.

**2. Política de Devolução**
* **Presenter:**
    * **Localização:** `lib/ui/institutional/widgets/screens/return_policy/return_policy_presenter.dart`
    * **Signals:** `policy (String)`.
* **View:**
    * **Localização:** `lib/ui/institutional/widgets/screens/return_policy/return_policy_screen.dart`
    * **Comportamento:** Exibe regras e botão/link para contato de suporte.

**3. Termos e Condições**
* **Presenter:**
    * **Localização:** `lib/ui/institutional/widgets/screens/terms_conditions/terms_conditions_presenter.dart`
    * **Signals:** `sections (List<({String title, String content})>)`.
* **View:**
    * **Localização:** `lib/ui/institutional/widgets/screens/terms_conditions/terms_conditions_screen.dart`
    * **Comportamento:** Lista de `Accordion` (shadcn) para cada tópico.

**4. Sobre a Sertton**
* **Presenter:**
    * **Localização:** `lib/ui/institutional/widgets/screens/about_company/about_company_presenter.dart`
    * **Métodos:** `openContact(String url)` (usando `url_launcher` via driver ou utils).
* **View:**
    * **Localização:** `lib/ui/institutional/widgets/screens/about_company/about_company_screen.dart`
    * **Comportamento:** Logo, texto institucional, lista de ícones/botões de contato.

**Componentes Compartilhados**
* **`InstitutionalScaffold`**
    * **Localização:** `lib/ui/institutional/widgets/components/institutional_scaffold/`
    * **Presenter:**
        * **Localização:** `lib/ui/institutional/widgets/components/institutional_scaffold/institutional_scaffold_presenter.dart`
        * **Responsabilidade:** Gerenciar ações globais do scaffold, como o `onBack`.
    * **View:**
        * **Localização:** `lib/ui/institutional/widgets/components/institutional_scaffold/institutional_scaffold_view.dart`
        * **Props:** `String title`, `Widget body`.
    * **Detalhes:** Padroniza o layout base (AppBar, botões de ação e padding), seguindo o padrão MVP.

### O que deve ser modificado?

* **`lib/constants/routes.dart`**
    * Adicionar rotas estáticas:
        * `static const String privacyPolicy = '/institutional/privacy';`
        * `static const String returnPolicy = '/institutional/return';`
        * `static const String terms = '/institutional/terms';`
        * `static const String about = '/institutional/about';`

* **`lib/router.dart`**
    * Registrar as novas rotas no `GoRouter` apontando para as respectivas Views.

### O que deve ser removido?
N/A

### Usar como referência
* Estrutura de `lib/ui/catalog/widgets/screens/home` para padrão View/Presenter.

### Diagramas de Visualização

**Fluxo de Dados:**
```
[View] (ex: TermsScreen)
   |
   +--> [Presenter] (TermsConditionsPresenter)
           |
           +--> [Constants] (InstitutionalContent)
                   |
                   +--> (Retorna Strings/Dados estáticos)
```

**Layout Genérico:**
```
+-----------------------------------+
|  [<-]    Título da Seção          | 
+-----------------------------------+
|                                   |
|  [ Logo (apenas no Sobre) ]       |
|                                   |
|  Título do Conteúdo               |
|                                   |
|  Texto / Accordions               |
|                                   |
|  [ Contatos / Links ]             |
|                                   |
+-----------------------------------+
```

### Conclusão e Implementação
As funcionalidades descritas nesta especificação foram totalmente implementadas e validadas.
- **Cobertura de Testes:** Testes unitários para Presenters e Widgets (Drawer integration) foram adicionados e validados.
- **Rotas:** Rotas adicionadas e integradas ao `go_router`.
- **UI:** Telas responsivas utilizando `InstitutionalScaffold` e design system `shadcn`.
