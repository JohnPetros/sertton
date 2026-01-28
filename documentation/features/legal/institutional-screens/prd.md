# PRD: Telas Institucionais

## 1. Visão Geral

Este documento detalha os requisitos das Telas Institucionais do aplicativo Sertton Industrial. O objetivo é fornecer ao usuário acesso fácil e transparente a informações cruciais sobre a empresa, políticas de privacidade e termos de uso, garantindo conformidade legal e confiança na marca.

As telas abrangidas por este PRD são:
1.  **Políticas de Privacidade**: Detalhamento sobre coleta, uso e proteção de dados.
2.  **Sobre a Sertton Industrial**: Apresentação institucional, logotipo e canais de atendimento.
3.  **Termos e Condições**: Regras legais de uso do aplicativo organizadas para fácil leitura.
4.  **Política de Devolução**: Regras e procedimentos para devoluções e trocas de produtos.

**Público Alvo**: Todos os usuários do aplicativo (clientes e visitantes).

---

## 2. Requisitos Funcionais

### A. Elementos Compartilhados (Cabeçalho e Estrutura)
Estes elementos são comuns a todas as telas institucionais.

**Funcionalidades:**
- [x] **Botão de Retorno:** Deve permitir ao usuário retornar à tela anterior da navegação.
- [x] **Título da Seção:** Deve exibir claramente o nome da página atual (ex: "Políticas de privacidade").
- [x] **Navegação Vertical:** O conteúdo principal deve permitir rolagem fluida para leitura de textos longos, sem exibir indicadores visuais de barra de rolagem.
- [x] **Margens e Espaçamentos:** O conteúdo deve respeitar os recuos laterais e inferiores padrão do aplicativo para garantir legibilidade e não ser cortado por elementos da interface.

### B. Tela: Políticas de Privacidade
Tela destinada à transparência sobre o tratamento de dados do usuário.

**Funcionalidades:**
- [x] **Apresentação de Conteúdo:** Deve listar os parágrafos informativos sobre coleta, uso, armazenamento e consentimento de dados.
- [x] **Informações de Contato:** Deve exibir os canais de comunicação para dúvidas relacionadas à privacidade.
- [x] **Data de Atualização:** Deve indicar claramente a data e hora em que a política entrou em vigor.
- [x] **Legibilidade:** O texto deve utilizar cores contrastantes que facilitem a leitura prolongada.

### C. Tela: Sobre a Sertton Industrial
Tela de apresentação institucional da empresa.

**Funcionalidades:**
- [x] **Identidade Visual:** Exibição do logotipo oficial da empresa no topo da página.
- [x] **Texto Institucional:** Descrição sobre a expertise da empresa e a qualificação de seus profissionais.
- [x] **Canais de Atendimento:**
    - [x] Destaque visual para a seção de atendimento.
    - [x] Centralização dos ícones ou métodos de contato.
- [x] **Identificação de Rodapé:** Exibição de informações complementares de identificação da empresa ao final da página.

### D. Tela: Termos e Condições
Tela contendo as regras e diretrizes legais de uso.

**Funcionalidades:**
- [x] **Organização por Tópicos:** O conteúdo legal deve ser dividido em seções expansíveis (estilo acordeão) para não sobrecarregar o usuário visualmente.
    - [x] Tópicos obrigatórios: Concordância, Licença de Uso, Isenção, Limitações, Precisão de Materiais, Links Externos, Modificações e Lei Aplicável.
- [x] **Interatividade de Leitura:** O usuário deve poder clicar em cada tópico para revelar ou ocultar os detalhes de cada regra.
- [x] **Listagem de Restrições:** Dentro das seções, restrições específicas devem ser apresentadas de forma numerada e destacada.

### E. Tela: Política de Devolução
Tela destinada a informar o usuário sobre prazos, condições e procedimentos para devolução e troca de produtos.

**Funcionalidades:**
- [x] **Apresentação de Conteúdo:** Deve apresentar de forma clara os prazos e condições para devolução.
- [x] **Instruções de Procedimento:** Descrição passo a passo de como o usuário deve proceder para solicitar trocas ou devoluções.
- [x] **Canais de Atendimento:** Exibição dos contatos específicos para suporte relacionado a devoluções.

---

## 3. Requisitos de Experiência do Usuário (UX/UI)

Aspectos visuais focados na clareza e hierarquia de informação.

- [x] **Hierarquia Visual:**
  - Diferenciação clara entre títulos de seções, textos informativos e legendas.
  - Uso de tons de cinza escuro para o corpo do texto e tons mais fortes para títulos.
- [x] **Tipografia:** Tamanhos de fonte adequados para leitura no dispositivo móvel, com tamanhos reduzidos apenas para informações secundárias (como datas).
- [x] **Distribuição de Espaço:**
  - Espaçamento vertical consistente entre parágrafos para evitar blocos densos de texto.
  - Adaptação automática do conteúdo para diferentes larguras de tela, garantindo que textos não fiquem excessivamente longos ou estreitos.
- [x] **Estados de Interação:** Feedback visual claro quando o usuário interage com botões de voltar ou seções expansíveis.

---

## 4. Requisitos Não Funcionais

- [x] **Performance:** Carregamento imediato do conteúdo textual, garantindo fluidez total durante a rolagem.
- [x] **Acessibilidade:** Garantir contraste de cores suficiente segundo normas básicas de acessibilidade digital.
- [x] **Responsividade:** O layout deve se adaptar sem falhas a diferentes dispositivos (smartphones e tablets).

---

## 5. Regras de Negócio

- **[Persistência de Navegação]:** O fechamento ou retorno das telas institucionais deve levar o usuário exatamente ao ponto de onde ele partiu (ex: Menu Lateral).
- **[Comunicação Direta]:** Os elementos de contato disparar ações nativas do dispositivo (ex: abrir app de e-mail ou telefone).
- **[Independência de Seções]:** Permitir que o usuário explore múltiplos tópicos de termos e condições de forma independente.
