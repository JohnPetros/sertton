## 1. Visão Geral do Produto

Desenvolvimento de um aplicativo de e-commerce nativo para a marca Sertton, focado em alta performance, fluidez de navegação e integração robusta com a plataforma Yampi. O objetivo é oferecer uma experiência de compra completa, desde a descoberta do produto até o acompanhamento do pedido, utilizando uma arquitetura moderna e escalável.

---

## 2. Estrutura de Navegação e UX

O aplicativo adota um modelo de navegação híbrido para maximizar a usabilidade:

* **Menu Lateral (Drawer):** Acesso global a conteúdos institucionais (Sobre, Políticas), configurações e categorias secundárias.
* **Barra Inferior (Tabbar):** Navegação primária persistente (Início, Produtos, Carrinho, Pedidos).
* **Navegação em Pilha (Stack):** Fluxo linear para aprofundamento (Detalhes do Produto, Checkout) com histórico de "voltar".

### Telas Principais

1. **Home:** Vitrine com banners, coleções em destaque e captura de leads.
2. **Catálogo:** Listagem com *scroll* infinito, filtros e ordenação.
3. **Detalhes do Produto:** Zoom em imagens, seleção de variações (SKU) e simulador de frete.
4. **Carrinho:** Gestão de itens, persistência local e resumo financeiro.
5. **Meus Pedidos:** Histórico de compras e acesso a 2ª via de pagamentos (Pix/Boleto).

---

## 3. Especificações Funcionais (Por Módulo)

### 📦 Módulo Catálogo (Catalog)

*Responsável pela gestão de Produtos, SKUs, Categorias, Marcas e Variações.*

* **Listagem de Estoque:** Exibir somente produtos com estoque positivo (`> 0`).
* **Busca Global e Local:** Pesquisa por nome acessível de diversas telas.
* **Filtros Avançados:** Filtragem cruzada por Nome, Categoria (seleção única) e Marca (seleção múltipla).
* **Ordenação:** Alfabética (A-Z, Z-A).
* **Detalhes do Produto:** Exibição rica com zoom, descrição e ficha técnica.
* **Seleção de Variações:** Obrigatoriedade de seleção de atributos (Material, Tamanho) para definir o SKU antes da compra.

### 🛒 Módulo Checkout (Checkout & Cart)

*Responsável pela gestão do Carrinho, Pedidos, Clientes e Logística.*

* **Gestão do Carrinho:**
* Adicionar/Remover itens e ajustar quantidades (Min: 1).
* Validação de estoque em tempo real.
* Bloqueio de duplicidade de SKU (incrementa quantidade, não cria nova linha).
* **Persistência:** Recuperação do estado do carrinho após reiniciar o app.
* Limpeza automática ao iniciar checkout externo.


* **Logística:**
* Cálculo de frete via CEP.
* Exibição comparativa de transportadoras (Preço x Prazo).


* **Histórico de Pedidos:** Listagem vinculada ao CPF/CNPJ com status (Pago, Aguardando, Cancelado).
* **Pagamentos:** Visualização de PDF para Boletos e "Copia e Cola"/QR Code para Pix.

### 📢 Módulo Marketing (Marketing)

*Responsável pelo engajamento e comunicação visual.*

* **Banners:** Gerenciamento de áreas de destaque na Home.
* **Leads:** Formulário de captura de e-mail na Home com validação de duplicidade.
* **Suporte:** *Deep links* para WhatsApp e cliente de E-mail.

### ⭐ Módulo Reviewing (Reviewing)

*Responsável pela prova social.*

* **Comentários:** Exibição e gestão de avaliações vinculadas aos produtos (conforme suporte da API Yampi).

---

## 4. Requisitos Não Funcionais (NFRs)

| Categoria | Requisito |
| --- | --- |
| **Desempenho** | Utilização de **Paginação (Scroll Infinito)** no catálogo para otimizar uso de dados e memória. |
| **Interface** | Layout **Responsivo** adaptável a diferentes densidades de tela e orientações. Uso do pacote **Flutter Animate** para micro-interações. |
| **Estabilidade** | Uso de **Riverpod** e **Signals** para garantir gestão de estado segura e reativa. |
| **Confiabilidade** | Tratamento de erros de rede (Dio) e validação robusta de formulários (**LucidValidation**). |
| **Legal** | Exibição clara de Termos de Uso e Políticas de Privacidade. |

---

## 5. Arquitetura Técnica

O projeto segue uma arquitetura em camadas visando desacoplamento e testabilidade.

### 🏗 Camadas (Layers)

1. **UI:** Widgets, Páginas e Lógica de Apresentação (utilizando **Flutter ShadCn**).
2. **Validation:** Schemas de validação de inputs (**LucidValidation**).
3. **Core:** DTOs, Interfaces, Formatos de Resposta (PaginationResponse, RestResponse) e Configurações.
4. **Rest:** Implementação dos Services e comunicação HTTP (**Dio**).

### 🧱 Estrutura de Módulos (Domain)

A regra de negócio é segregada nos seguintes domínios, cada um contendo seus DTOs e Interfaces de Serviço:

* **Catalog:** `Product`, `SKU`, `Category`, `Variation`, `Brand`, `Cart`.
* **Marketing:** `Lead`, `Contact`, `Banner`.
* **Reviewing:** `Comment`.
* **Checkout:** `Order`, `Customer`.

### 🛠 Stack Tecnológica

| Tecnologia | Finalidade |
| --- | --- |
| **Linguagem** | Dart |
| **Framework** | Flutter |
| **API** | Yampi Dev (RESTful) |
| **Rotas** | GoRouter |
| **Estado & DI** | Riverpod |
| **Eventos** | Flutter Signals |
| **UI Kit** | Flutter ShadCn |
| **HTTP Client** | Dio |
| **Testes** | Mocktail, Faker |

---