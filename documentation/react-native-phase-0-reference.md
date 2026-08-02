# Referência de migração React Native — Fase 0

Data da inspeção: 2026-07-10. Esta referência foi construída exclusivamente por leitura estática. O aplicativo Flutter não foi iniciado, compilado nem alterado.

## Inventário confirmado

| Artefato | Planejado | Encontrado | Fonte |
| --- | ---: | ---: | --- |
| DTOs | 19 | 19 | `lib/core/**/dtos/*_dto.dart` |
| Mappers Yampi | 12 | 12 | `lib/rest/yampi/mappers/*_mapper.dart` |
| Serviços Yampi de domínio | 3 | 3 | `lib/rest/yampi/services/yampi_{catalog,checkout,marketing}_service.dart` |
| Drivers de infraestrutura | 5 | 5 | `lib/drivers/` |
| Views | 72 | 72 | `lib/ui/**/*_view.dart` |
| Presenters | 35 | 35 | `lib/ui/**/*_presenter.dart` |
| Testes Flutter | 70 | 70 | `test/**/*_test.dart` |

## Matriz de paridade funcional

| Área | Comportamentos a portar | Referência estática | Baseline visual | Situação |
| --- | --- | --- | --- | --- |
| Shell global | Splash, guarda de conectividade, Drawer, quatro abas persistentes e stacks | `lib/router.dart`, `lib/ui/global/widgets/layout/` | `flutter/android/drawer/` | Implementado |
| Home | Busca, coleções, banners, captura de lead, pagamentos e dados da empresa | `lib/ui/global/widgets/screens/home/`, testes Home | `flutter/android/home/` | Implementado |
| Catálogo | Busca, categoria única, marcas múltiplas, paginação, loading, erro e vazio | `lib/ui/catalog/widgets/screens/catalog/`, testes Catalog | `flutter/android/catalog/` | Implementado |
| Produto | SKU, variações, estoque, quantidade, preço/desconto, zoom, parcelas, contador e similares | `lib/ui/catalog/widgets/screens/product/`, testes Product | `flutter/android/product/` | Implementado |
| Compra rápida | Modal de carrinho a partir do catálogo/produto | `lib/ui/catalog/widgets/components/cart-dialog/`, testes associados | Sem captura dedicada | Implementado; validar visualmente na Fase 5 |
| Carrinho | Persistência, quantidade mínima, remoção, resumo e checkout externo | `lib/ui/checkout/widgets/screens/cart/`, `cart_store.dart` | `flutter/android/cart/` | Implementado |
| Pedidos | CPF/CNPJ, cache, consulta, estados, ordenação e accordion | `lib/ui/checkout/widgets/screens/orders/`, testes Orders | `flutter/android/orders/` **sensível** | Implementado |
| Institucional | Privacidade, trocas/devoluções, termos e sobre | `lib/ui/institutional/`, `institutional_content.dart` | `flutter/android/institutional/` | Implementado |
| Links externos | WhatsApp, telefone, e-mail e links | `lib/drivers/url-driver/`, Drawer | `flutter/android/drawer/` | Implementado |
| Reviews | Tipos `AuthorDto` e `CommentDto` | `lib/core/reviewing/` | Não aplicável | Documentado sem fluxo UI; portar somente o domínio |
| Frete | Simulação e escolha de entrega | `documentation/overview.md` | Não aplicável | Futuro; não há fluxo executável no código |

As imagens de `documentation/screenshots/flutter/android/orders/` são classificadas como sensíveis: exibem CPF e endereço. Elas permanecem restritas ao repositório autorizado, não devem entrar em CI nem material externo, e exigem substituição por dados sanitizados antes de qualquer compartilhamento.

## Reconciliação entre documentação e código (RNM-001)

| Requisito | Classificação | Decisão de paridade | Evidência |
| --- | --- | --- | --- |
| Catálogo, produto, carrinho, Home, institucional e navegação | Implementado | Portar integralmente | Matriz acima e testes correspondentes |
| Pedidos por CPF/CNPJ | Implementado | Manter acesso pela posse do documento, sem autenticação adicional | `YampiCheckoutService.fetchOrdersByCustomer`, `orders_screen_presenter_test.dart` |
| `fetchOrdersByCustomer` ausente | Obsoleto | A especificação antiga não representa o código atual | `documentation/features/orders/specs/orders-listing-spec.md` versus `lib/rest/yampi/services/yampi_checkout_service.dart` |
| Captura de leads | Implementado | Portar | `YampiMarketingService.saveLead`; documentação antiga usa linguagem futura |
| Reviews | Documentado mas incompleto | Portar os tipos; não criar interface de avaliações | `lib/core/reviewing/` e ausência de rota/tela |
| Frete | Futuro | Fora da paridade inicial | Ausência de serviço, tela e rota executáveis |
| Shell desktop | Obsoleto para o cutover | Não migrar Windows/Linux/macOS | plataformas Flutter presentes, mas fora da stack aprovada |

## Plataformas aprovadas (RNM-002)

| Plataforma | Papel | Build/QA |
| --- | --- | --- |
| Android | Obrigatória | Release e matriz manual completos |
| iOS | Obrigatória | Release e matriz manual completos |
| Expo Web | Secundária | Validar fluxos suportados e export server/web |
| Windows, Linux e macOS | Fora do cutover | Sem migração nesta iniciativa |

## Credenciais Yampi (RNM-003)

O Flutter legado lê `YAMPI_USER_TOKEN` e `YAMPI_SECRET_KEY` por `.env` e os aplica diretamente no cliente em `YampiService`. Os valores não foram lidos, registrados nem copiados.

Decisão aprovada para o React Native: usar apenas `YAMPI_USER_TOKEN` e `YAMPI_SECRET_KEY` sem prefixo `EXPO_PUBLIC_`, configurados no ambiente server-side das Expo API Routes. O cliente chamará exclusivamente `/api/*`; somente arquivos `+api.ts` poderão compor `src/rest/yampi/`.

**Concluído por confirmação do operador em 2026-07-10:** novas credenciais foram geradas, as credenciais expostas foram revogadas e as variáveis foram recriadas como secrets sensíveis no EAS. Os valores não foram registrados neste repositório.

O scaffold atual também não contém API Routes e está configurado com `expo.web.output: static`; a configuração server-side depende de RNM-100 e RNM-310. O procedimento, os responsáveis e os critérios de aceite estão em [react-native-yampi-rotation-runbook.md](react-native-yampi-rotation-runbook.md).

## Fixtures sanitizadas (RNM-004)

O contrato estático dos endpoints foi congelado em [yampi-contract-fixtures.json](fixtures/yampi/yampi-contract-fixtures.json). Cada operação possui variantes `success`, `pagination`, `empty` e `error`; dados de cliente, URLs de pagamento e tokens foram substituídos por valores fictícios. Os campos foram derivados dos 12 mappers e dos três services Yampi atuais.

O congelamento é utilizável para portar e revisar mappers. A comparação com o ambiente Yampi autorizado passa a ser uma verificação de implementação da Fase 3; ela não exige executar o Flutter nem bloqueia o baseline estático da Fase 0.

## Política de divergências (RNM-005)

| ID | Divergência/risco conhecido | Decisão | Validação futura |
| --- | --- | --- | --- |
| DIV-001 | `RestResponse.isSuccessful` aceita HTTP 400, enquanto `isFailure` também classifica 400 como falha | Corrigir antes do port: sucesso será somente 2xx | Teste de hook consumidor e revisão de API Route |
| DIV-002 | `mapBody` lança exceção em resposta com erro, impedindo o retorno tipado de falha | Corrigir antes do port | Estados de erro dos hooks |
| DIV-003 | Catálogo concatena query strings manualmente, sem cancelamento nem proteção contra resposta fora de ordem | Corrigir durante o port com parâmetros estruturados, `AbortController` e token de requisição | Testes de filtros/paginação |
| DIV-004 | O presenter de busca possui bug documentado | Preservar a intenção funcional, não o bug | Fluxo Home → Catálogo e testes da busca |
| DIV-005 | Carrinho Flutter pode conter estado persistido legado | Não migrar dados; iniciar armazenamento React Native versionado | Testes de hidratação do hook |
| DIV-006 | CPF/CNPJ é suficiente para consultar pedidos | Preservar deliberadamente nesta migração | Checklist manual de pedidos |
| DIV-007 | Capturas de Pedidos têm dados pessoais | Não reproduzir nem publicar; usar fixtures sanitizadas | Revisão de screenshots |
| DIV-008 | `YampiOrderMapper` usa `DateTime.now()` quando a data é inválida | Corrigir antes do port: retornar erro/valor explícito, nunca data atual | Fixture de erro e teste de hook |
| DIV-009 | Rota de produto aceita `ProductDto` em `extra` | Corrigir durante o port: URL contém somente ID; cache fica no provider | Revisão das rotas Expo Router |
| DIV-010 | Consulta administrativa do EAS pode imprimir credenciais quando a variável não está protegida como sensível | Rotacionar as credenciais afetadas e recriá-las com visibilidade `sensitive`; não registrar ou reutilizar os valores expostos | Revisão de configuração EAS sem exibir valores |

## Resultado da Fase 0

- RNM-000 a RNM-005 estão concluídos e rastreáveis.
- A fronteira client/server será validada em runtime quando as API Routes forem implementadas na Fase 3; nenhum segredo foi registrado nesta fase.
- Nenhum arquivo Flutter, asset, screenshot ou configuração Flutter foi modificado.
