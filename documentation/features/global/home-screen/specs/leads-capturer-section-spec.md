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

## O que deve ser criado?
### UI
*   **Leads Capturer Section** (`lib/ui/global/widgets/screens/home/leads-capturer-section/`)
    *   Responsável por exibir o formulário de captura e gerenciar o estado de envio.
    *   `leads_capturer_view.dart`:
        *   Deve utilizar componentes do `shadcn_flutter` (Card, Input, Button) para manter consistência visual.
        *   Layout deve ser responsivo e esteticamente agradável (ex: background colorido ou imagem de fundo, texto persuasivo).
        *   Feedback visual de sucesso/erro após o envio (ex: Toast ou mudança de estado do botão).
    *   `leads_capturer_presenter.dart`:
        *   Gerenciar o estado do input de email (validação).
        *   Gerenciar o estado de "loading" durante a requisição.
        *   Chamar o `MarketingService.saveLead` via Signals/Riverpod.
    *   `index.dart`: Arquivo de exportação do widget.

## O que deve ser modificado?
### Rest
*   `lib/rest/yampi/services/yampi_marketing_service.dart`:
    *   Implementar o método `saveLead(LeadDto leadDto)`.
    *   Realizar a chamada POST para o endpoint de leads da Yampi o endpoint é /leads.

### UI
*   `lib/ui/global/widgets/screens/home/home_screen_view.dart`:
    *   Importar e adicionar o widget `LeadsCapturer` na lista de filhos do `SingleChildScrollView`, logo abaixo de `MarketingSection` (substituindo o placeholder).
