# Leads Capturer Section

## Objetivo
Implementar a seção de captura de leads na tela Home ("Home Screen"), que deverá conter um campo de input para e-mail e um botão de ação para cadastrar o lead (Newsletter). Essa área da tela deve ser chamativa e atraente para o usuário, incentivando o cadastro.

## O que já existe?
*   **Core**:
    *   `lib/core/marketing/dtos/lead_dto.dart`: DTO para transporte dos dados do lead (email).
    *   `lib/core/marketing/interfaces/marketing_service.dart`: Interface que define o contrato `saveLead`.
*   **Rest**:
    *   `lib/rest/yampi/services/yampi_marketing_service.dart`: Serviço existente onde o método `saveLead` deve ser implementado.
*   **UI**:
    *   `lib/ui/global/widgets/screens/home/home_screen_view.dart`: Tela onde o componente será inserido.

## O que foi criado?
### UI
*   **Leads Capturer Section** (`lib/ui/global/widgets/screens/home/leads-capturer-section/`)
    *   Responsável por exibir o formulário de captura e gerenciar o estado de envio.
    *   `leads_capturer_section_view.dart`:
        *   Utiliza componentes do `shadcn_flutter` (TextField, Button.secondary) dentro de um `Container` com gradiente e bordas arredondadas.
        *   Exibe textos promocionais ("Receba novidades e ofertas incríveis").
        *   Possui feedback visual (mensagens de sucesso em verde e erro em vermelho).
        *   Gerencia estado local do TextEditingController sincronizado com o Presenter.
    *   `leads_capturer_section_presenter.dart`:
        *   Gerencia o estado do input de email (`email`), carregamento (`isLoading`) e mensagens de feedback (`errorMessage`, `successMessage`) usando `signals`.
        *   Realiza validação de formato de e-mail via Regex.
        *   Chama `MarketingService.saveLead` para submissão.
    *   `index.dart`: Arquivo de exportação do widget (`LeadsCapturerSectionView`).

## O que foi modificado?
### Rest
*   `lib/rest/yampi/services/yampi_marketing_service.dart`:
    *   Implementado o método `saveLead(LeadDto leadDto)`.
    *   Realiza chamada POST para `/leads` enviando payload com `email` e `name` (opcional).

### UI
*   `lib/ui/global/widgets/screens/home/home_screen_view.dart`:
    *   Adicionado o widget `LeadsCapturerSectionView` na lista de filhos do `SingleChildScrollView`, logo abaixo de `MarketingSection`.
