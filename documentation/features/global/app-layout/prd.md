# PRD: App Layout e Navegação Global

## 1. Visão Geral

Este documento detalha os requisitos estruturais do layout principal da aplicação Sertton (`AppLayout`), que define a navegação global e a hierarquia visual base. O objetivo é fornecer uma experiência de navegação híbrida e intuitiva:
*   **Bottom Tab Navigation:** Para acesso rápido às funcionalidades principais de compra (Home, Busca, Carrinho, Pedidos).
*   **Navigation Drawer:** Para acesso secundário a suporte, contatos institucionais e informações legais, mantendo a interface limpa.

---

## 2. Requisitos Funcionais

### A. Bottom Tab Navigation (Existente)

Barra de navegação inferior persistente em todas as telas principais.

**Funcionalidades:**
- [x] **Navegação entre Abas:** Alternância rápida entre 4 seções principais sem perda de estado onde apropriado.
    1.  **Home:** Tela inicial (Vitrine).
    2.  **Catálogo/Busca:** Lista de produtos e pesquisa.
    3.  **Carrinho:** Visualização de itens adicionados.
    4.  **Pedidos:** Histórico de compras do usuário.
- [x] **Indicador Ativo:** Destaque visual (cor primária/preenchimento) para a aba selecionada atualmente.
- [x] **Badge de Carrinho:** Exibição numérica da quantidade de itens sobre o ícone do carrinho.
    - Deve atualizar reativamente conforme o `CartStore`.
    - Ocultar se a quantidade for zero.
- [x] **Animação de Seleção:** Feedback visual (escala/bounce) ao tocar em um item da tab bar.

### B. Navigation Drawer (Novo)

Menu lateral oculto acessível via topo da tela, focado em suporte e institucional.

**Funcionalidades:**
- [ ] **Abertura/Fechamento:**
    - Abrir ao tocar no ícone de "Menu" (hambúrguer) localizado no canto superior esquerdo do `AppHeader`.
    - Fechar ao tocar fora do drawer, arrastar para a esquerda ou selecionar um item.
- [ ] **Cabeçalho do Drawer:**
    - Exibir o logotipo da Sertton de forma centralizada ou alinhada, reforçando a marca.
    - [Escopo Atual] Não exibir dados de perfil de usuário neste momento.
- [ ] **Links de Contato Rápido (Ações Externas):**
    - **WhatsApp:** Abrir app do WhatsApp com mensagem pré-definida.
    - **Telefone:** Iniciar discagem para o número fixo da empresa.
    - **E-mail:** Abrir cliente de e-mail padrão com destinatário preenchido.
- [ ] **Links Institucionais/Legais (Navegação Interna):**
    - Acesso aos "Termos de Uso".
    - Acesso às "Políticas de Privacidade".

### C. App Header (Integração)

- [ ] **Gatilho do Drawer:** Configurar o botão de ícone `Icons.menu` existente no `AppHeader` para disparar a abertura do `Scaffold.drawer`.

---

## 3. Requisitos de UI/Design

Utilização do Design System existente (`shadcn_flutter`) e tokens do tema.

- [ ] **Cores:**
    - **Tab Bar Background:** Branco (`Colors.white`) com sombra suave (`BoxShadow`).
    - **Tab Active Item:** Cor Primária do Tema (`theme.colorScheme.primary`) e texto/ícone em Branco (para badges/fundos ativos).
    - **Drawer Background:** Branco ou Surface.
- [ ] **Tipografia:** Seguir padrões do tema (Inter/Roboto) para textos de lista e títulos.
- [ ] **Ícones:**
    - Utilizar ícones consistentes (Material Icons ou Lucide via Shadcn).
    - Ícones específicos para WhatsApp e Redes Sociais se necessário.
- [ ] **Feedback Visual:**
    - Ripple/Highlight ao tocar nos itens do Drawer.
    - Animação suave na transição das abas (já implementado: `FadeTransition` + `SlideTransition`).

---

## 4. Requisitos Não Funcionais

- [ ] **Performance:**
    - O Drawer deve ser carregado sob demanda (lazy) ou ser leve o suficiente para não impactar a renderização inicial do `AppLayout`.
    - As trocas de abas devem manter, quando possível, o estado da página (ex: scroll position) usando `StatefulNavigationShell` do GoRouter.
- [ ] **Usabilidade:**
    - Área de toque mínima de 44x44px para todos os botões de navegação.
- [ ] **Compatibilidade:**
    - O esquema de URL (`url_launcher`) deve tratar erros caso o app nativo (ex: WhatsApp) não esteja instalado, preferencialmente abrindo versão web ou falhando graciosamente.

---

## 5. Regras de Negócio

- **[Contagem do Carrinho]:** O badge do carrinho deve refletir o número total de *itens* (quantidade somada) ou *produtos distintos*?
    - *Definição Atual:* Seguir lógica do `itemCount` do `CartStore`.
- **[Abertura de Links Externos]:**
    - **WhatsApp:** Tentar esquema `whatsapp://`. Se falhar, tentar link web `https://wa.me/...`.
    - **Telefone:** Esquema `tel:`.
    - **E-mail:** Esquema `mailto:`.




