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

**Referências de implementação:**
* `lib/core/catalog/`
* `lib/rest/yampi/services/yampi_catalog_service.dart`
* `lib/ui/catalog/`

### 🛒 Módulo Checkout (Checkout & Cart)

*Responsável pela gestão do Carrinho, Pedidos, Clientes e Pagamentos.*

* **Gestão do Carrinho:**
* Adicionar/Remover itens e ajustar quantidades (Min: 1).
* Validação de estoque em tempo real.
* Bloqueio de duplicidade de SKU (incrementa quantidade, não cria nova linha).
* **Persistência:** Recuperação do estado do carrinho após reiniciar o app.
* Limpeza automática ao iniciar checkout externo.
* **Histórico de Pedidos:** Listagem vinculada ao CPF/CNPJ com status (Pago, Aguardando, Cancelado).
* **Pagamentos:** Visualização de PDF para Boletos e "Copia e Cola"/QR Code para Pix.

**Referências de implementação:**
* `lib/core/checkout/`
* `lib/rest/yampi/services/yampi_checkout_service.dart`
* `lib/ui/checkout/`

### 📢 Módulo Marketing (Marketing)

*Responsável pelo engajamento e comunicação visual.*

* **Banners:** Gerenciamento de áreas de destaque na Home.
* **Leads:** Formulário de captura de e-mail na Home com validação de duplicidade.
* **Suporte:** *Deep links* para WhatsApp e cliente de E-mail.

**Referências de implementação:**
* `lib/core/marketing/`
* `lib/rest/yampi/services/yampi_marketing_service.dart`
* `lib/ui/global/widgets/screens/home/marketing-section/`
* `lib/ui/global/widgets/screens/home/leads-capturer-section/`

### ⭐ Módulo Reviewing (Reviewing)

*Responsável pela prova social.*

* **Comentários:** Exibição e gestão de avaliações vinculadas aos produtos (conforme suporte da API Yampi).

**Referências de implementação:**
* `lib/core/reviewing/`

### 🚚 Módulo Shipping (Shipping)

*Responsável pela logística de entrega e simulação de frete.*

* **Cálculo de frete:** Simulação por CEP.
* **Comparativo de opções:** Exibição de transportadoras por preço e prazo.
* **Integração com checkout:** Seleção de frete aplicada ao fluxo de compra.

### 🌐 Módulo Global (Global)

*Responsável por navegação principal, layout global e estados do app.*

* **Layout global:** Drawer + Tabbar + shell de navegação.
* **Telas base:** Splash, Offline, Home e componentes compartilhados.

**Referências de implementação:**
* `lib/ui/global/`
* `lib/router.dart`
* `lib/constants/routes.dart`

### 🏛️ Módulo Institutional (Institutional)

*Responsável pelo conteúdo institucional e legal do aplicativo.*

* **Telas institucionais:** Sobre, Privacidade, Trocas/Devoluções e Termos.
* **Acesso global:** navegação pelo Drawer e rotas dedicadas.

**Referências de implementação:**
* `lib/ui/institutional/`
* `documentation/features/legal/institutional-screens/`
* `lib/constants/routes.dart`

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

## 5. Estrutura de Módulos (Domain)

A regra de negócio é segregada nos seguintes domínios, cada um contendo seus DTOs e Interfaces de Serviço:

* **Catalog:** `Product`, `SKU`, `Category`, `Variation`, `Brand`, `Collection`.
* **Checkout:** `CartItem`, `Customer`, `Discount`, `Installment`, `Order`, `OrderItem`, `Payment`, `Address`.
* **Marketing:** `Lead`, `Contact`, `Banner`.
* **Reviewing:** `Comment`, `Author` (atualmente sem interface de serviço implementada).
* **Shipping:** `ShippingOption`, `FreightQuote`, `DeliveryAddress` (planejado).
* **Institutional:** conteúdo estático institucional/legal (camada UI).