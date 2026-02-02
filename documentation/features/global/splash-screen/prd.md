# PRD: Splash Screen

### 1. Visão Geral
A **Splash Screen** é a primeira tela apresentada ao usuário ao iniciar o aplicativo Sertton.
- **O que é:** Uma tela de abertura animada.
- **Problema que resolve:** Proporciona uma transição fluida e profissional durante a inicialização do app, evitando telas brancas ou carregamentos bruscos.
- **Objetivo principal:** Introduzir a identidade visual da marca e engajar o usuário desde o primeiro segundo.

### 2. Requisitos Funcionais

#### Tela de Splash
**Descrição:** Tela inicial contendo a composição animada de ícones, animação Lottie e título da marca.

* [x] **Animação Principal (Lottie):** Exibir animação de um caminhão em movimento (loop) no centro da tela.
* [x] **Animação de Ícones:** Exibir ícones de "Bolsa" e "Dólar" entrando em cena e rotacionando para se posicionarem ao lado do caminhão.
* [x] **Animação de Texto:** Exibir o nome "Sertton" surgindo abaixo da composição principal.
* [x] **Redirecionamento Automático:** Navegar automaticamente para a rota `Home` após o término da sequência de animação.

#### Regras de Negócio

* [x] **Duração Fixa:** A tela deve permanecer visível por exatos 4 segundos para garantir a visualização da marca.
* [x] **Independência de Dados:** O redirecionamento deve ocorrer sem depender de chamadas de API ou persistência.
* [x] **Sem Autenticação:** A tela não deve barrar usuários não autenticados, seguindo sempre para a Home pública.

#### Regras de UI/UX

* [x] **Cores:** Utilizar a cor **Primária** do projeto para todos os elementos vetoriais e textos.
* [x] **Tipografia:** Texto "Sertton" com `fontSize: 24` e `fontWeight: '600'`.
* [x] **Ícones:** Utilizar ícones da biblioteca **FontAwesome** (Shopping Bag e Dollar Sign).
* [x] **Asset Lottie:** Utilizar o arquivo `truck.json` com largura/altura de 250.
* [x] **Comportamento da Animação:**
    *   **Caminhão:** Centralizado, `autoplay` e `loop`.
    *   **Bolsa:** Surge à esquerda com rotação de -50°.
    *   **Dólar:** Surge à direita com rotação de 50°.
    *   **Transição:** Entrada via `RollIn` e texto via `FadeInDown`.
* [x] **Responsividade:** Garantir que a composição (Ícones + Caminhão + Texto) esteja centralizada em qualquer densidade de tela.

### 3. Fluxo de Usuário (User Flow)

**Nome do fluxo:** Inicialização do Aplicativo.

1.  O usuário acessa o **Aplicativo**.
2.  O sistema exibe a **Splash Screen** e executa a sequência de animações.
3.  O sistema valida o **Tempo de Exibição (Timer)**:
    *   **Sucesso:** Após 4 segundos, o usuário é redirecionado para a **Home**.
    *   **Falha:** Não se aplica.

### 4. Fora do Escopo (Out of Scope)
*   Verificação de estado de login (Auth Guard).
*   Carregamento de dados de catálogo em segundo plano (Lazy loading será feito na Home).
*   Tratamento de erros de rede ou fallbacks offline nesta tela.