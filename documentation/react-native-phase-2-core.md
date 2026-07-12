# Fase 2 — Core TypeScript

Data: 2026-07-10.

## Escopo concluído

| Item | Implementação |
| --- | --- |
| RNM-200 | `RestResponse`, paginação, constantes HTTP e erros de domínio em `src/core/shared/` |
| RNM-201 | As seis entidades de catálogo imutáveis em `src/core/catalog/entities/` |
| RNM-202 | As oito entidades e enums de checkout imutáveis em `src/core/checkout/entities/` |
| RNM-203 | Banner, Lead, Contact, Author e Comment em marketing/reviewing |
| RNM-204 | Contratos Catalog, Checkout, Marketing e `RestClient`, com cancelamento via `AbortSignal` |
| RNM-205 | Contratos de storage, secure storage, conectividade, links e configuração |
| RNM-206 | Regras puras de `pt-BR`, documento, totais/desconto, SKU e contador até meia-noite |
| RNM-207 | Os 12 contratos de mapper, incluindo aliases `I*` para as factories REST |

## Decisões de paridade

- Todas as propriedades das entidades são `readonly`.
- `Address.uf` e `Sku.yampiToken` preservam os nomes do Flutter.
- `RestResponse` considera sucesso somente em HTTP 2xx, resolvendo a divergência registrada como DIV-001.
- `RestResponse.mapBody()` preserva respostas de falha em vez de lançar exceções, resolvendo DIV-002.
- O Core usa somente TypeScript padrão e imports internos; não há React, Expo, Axios, Yampi, UI ou infraestrutura.

## Validações executadas

| Comando/verificação | Resultado |
| --- | --- |
| `npm run codecheck` | Passou; Biome valida `src/core` e as declarações TypeScript adicionadas |
| `npm run typecheck` | Passou com `tsc --noEmit` |
| Busca de fronteiras proibidas em `src/core` | Passou; sem imports React, Expo, Axios, REST ou UI |
| `git diff --check` | Passou |

O Biome e os scripts foram adicionados somente como suporte ao gate da Fase 2. A configuração completa da toolchain continua pertencendo à Fase 1.
