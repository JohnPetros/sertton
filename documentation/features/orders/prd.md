# PRD: Meus Pedidos

## 1. Visão Geral

Este documento detalha os requisitos da funcionalidade **Meus Pedidos**. O objetivo é permitir que o cliente (visitante/guest) consulte o histórico de compras realizadas na loja. Como o aplicativo não possui sistema de login tradicional (usuário/senha), a identificação é feita através do CPF ou CNPJ.

## 2. Regras de Negócio

*   **Identificação via Documento:** O acesso aos pedidos é liberado mediante a informação do CPF (Pessoa Física) ou CNPJ (Pessoa Jurídica).
*   **Persistência de Identificação:** Após o primeiro acesso com sucesso, o documento deve ser salvo em cache local.
*   **Logout/Troca de Conta:** Deve haver um botão "Alterar documento", que limpa o cache e retorna à tela de identificação.
*   **Carregamento Completo:** A listagem traz todos os pedidos de uma vez, sem paginação.
*   **Ordenação:** Pedidos exibidos em ordem cronológica decrescente.

## 3. Requisitos Funcionais

### A. Tela de Identificação

*   [ ] **Seletor:** Toggle Pessoa Física/Jurídica.
*   [ ] **Input:** Campo com máscara e validação de CPF/CNPJ.
*   [ ] **Ação:** Botão para buscar pedidos.

### B. Listagem de Pedidos

*   [ ] **Header da Tela:**
    *   Documento atual exibido em destaque (cor azul primária).
    *   Botão "Alterar documento" (estilo `Primary` ou `Default` azul) alinhado à direita.

*   [ ] **Lista de Pedidos (Accordion):**
    
    *   **Cabeçalho do Accordion (Sempre visível):**
        *   Título "Número do pedido" (Label discreto).
        *   Número do pedido (ex: `#73938...`) em destaque.
        *   Ícone de expansão (Chevron) à direita.
    
    *   **Conteúdo do Accordion (Expandido):**
        *   **Bloco Status e Data:**
            *   Lado a lado: Coluna STATUS e Coluna DATA.
            *   Badge de Status: Fundo suave (ex: vermelho claro para cancelado), texto escuro e borda.
            *   Data formatada (`dd/mm/aaaa`).
        
        *   **Seção PRODUTOS:**
            *   Título "PRODUTOS" em caixa alta.
            *   Lista de itens:
                *   SKU: Destaque em azul (ex: `SKU: 195000058`).
                *   Quantidade: `qtd.: X` alinhado à direita.
                *   Nome do Produto.
                *   Preços: Preço original riscado (cinza) e Preço final (azul) lado a lado.
        
        *   **Resumo Financeiro:**
            *   Linha separadora.
            *   Produtos (item): Valor total dos itens.
            *   Desconto: Valor em verde com sinal negativo (ex: `- R$ 2,00`).
            *   Total: Valor final em destaque azul, alinhado à direita.
        
        *   **Endereço de Entrega:**
            *   Título "ENDEREÇO DE ENTREGA" em caixa alta.
            *   Nome do destinatário.
            *   Endereço completo (Rua, Número, Bairro, Cidade/UF, CEP).
