# PRD - Home Screen (Tela Inicial)

## 1. Visão Geral

A **Home Screen** é a porta de entrada do aplicativo Sertton. Ela serve como a vitrine principal da loja, projetada para engajar o usuário imediatamente, promovendo produtos em destaque, facilitando a navegação via busca e capturando leads para futuras campanhas de marketing.

## 2. Objetivos de Negócio

*   **Maximização de Descoberta**: Garantir que o usuário seja exposto a promoções e produtos relevantes nos primeiros segundos de uso.
*   **Facilidade de Navegação**: Permitir acesso rápido ao catálogo completo através da busca.
*   **Aquisição de Leads**: Capturar e-mails de visitantes para nutrir a base de clientes (newsletter).
*   **Conversão**: Apresentar "Call to Actions" claros em banners e coleções.
*   **Credibilidade**: Exibir informações institucionais e de pagamento para transmitir confiança.

## 3. Estrutura da Tela (Layout)

A tela deve ser renderizada em uma lista vertical única (`ScrollView`), composta pelas seguintes seções, de cima para baixo:

1.  **Header Principal**
2.  **Seção de Marketing (Loop)**
3.  **Captura de Leads**
4.  **Footer Institucional**

---

## 4. Detalhamento das Seções

### 4.1. Header Principal & Busca

*   **Componentes**:
    *   Campo de pesquisa ("O que você procura?").
    *   Botão/Ícone de Menu (acesso ao Drawer).
    *   Ícone de Carrinho (com badge de quantidade).
*   **Comportamento**:
    *   Ao tocar no campo de pesquisa, o usuário não digita na Home. Ele é redirecionado imediatamente para a **Tela de Catálogo** com o foco no campo de busca de lá, ou abre uma modal de busca dedicada.
    *   *Nota*: O requisito explicita "buscar produtos navegando o user para a tela de catalogo".

### 4.2. Seção de Marketing (Estrutura de Loop)

Esta seção deve seguir uma ordem estrita e repetitiva para manter o usuário engajado:

1.  **Banner Promocional #1**: Destaque visual principal.
2.  **Coleção de Produtos #1**: Lista horizontal de produtos de uma categoria específica (ex: "Lançamentos").
3.  **Banner Promocional #2**: Destaque secundário.
4.  **Coleção de Produtos #2**: Lista horizontal de produtos de outra categoria (ex: "Mais Vendidos").

*   **Requisitos de UI**:
    *   **Banners**: Imagens de alta qualidade, proporção 16:9 ou similar, clicáveis.
    *   **Coleções**: Título da coleção visível + Lista horizontal de cards de produto (Imagem, Nome, Preço).

### 4.3. Captura de Leads (Newsletter)

*   **Objetivo**: Convencer o usuário a deixar seu e-mail.
*   **Componentes**:
    *   Texto de chamada (ex: "Assine nossa newsletter e ganhe 10% OFF").
    *   Campo de entrada de texto (Input e-mail).
    *   Botão de ação ("Cadastrar" ou "Enviar").
*   **Validação**: Validar formato de e-mail antes de enviar. Exibir mensagem de sucesso ou erro (ex: e-mail já cadastrado).

### 4.4. Footer Institucional

*   **Conteúdo**:
    *   **Métodos de Pagamento**: Ícones das bandeiras de cartão de crédito aceitas e PIX.
    *   **Dados da Empresa**: Razão Social (Sertton), Endereço completo e CNPJ.
*   **Estilo**: Fundo diferenciado (cor neutra/escura) para demarcar o fim da página.

---

## 5. Requisitos Funcionais

| ID | Funcionalidade | Descrição | Critério de Aceite |
| :--- | :--- | :--- | :--- |
| **RF01** | Busca de Produtos | O usuário toca na busca e vai para o catálogo. | Redirecionamento para rota `/catalog` com estado de foco na busca. |
| **RF02** | Visualizar Banners | O App deve carregar banners via API Yampi. | Banners renderizados corretamente. Se falhar, ocultar o banner. |
| **RF03** | Navegação por Banner | Clicar em um banner leva a um destino. | Suporte a deeplinks internos (categoria, produto) ou externos. |
| **RF04** | Visualizar Coleções | Exibir produtos de coleções específicas na Home. | Scroll horizontal fluido; produtos com preço e foto visíveis. |
| **RF05** | Cadastrar Lead | Enviar e-mail inserido para a API. | Input valida e-mail; API retorna 200/201; Feedback visual de sucesso. |
| **RF06** | Exibir Institucional | Mostrar dados estáticos no rodapé. | CNPJ e ícones de cartão visíveis no fim do scroll. |

---

