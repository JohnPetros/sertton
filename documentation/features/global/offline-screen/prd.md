# PRD - Tela Offline Global

## Objetivo

Garantir que o app bloqueie navegacao funcional quando nao houver acesso real a internet, exibindo uma tela unica de offline com acao de reconexao, e retornando automaticamente ao fluxo principal ao recuperar conectividade.

## Problema

Sem um gate global de conectividade, o usuario podia acessar telas e fluxos que dependem de rede sem garantia de internet real, gerando erros tardios e experiencia inconsistente.

## Escopo Entregue

- Driver de conectividade com verificacao real de internet (`hasInternetAccess`) e stream reativa (`onStatusChange`).
- Injecao global do driver por Riverpod.
- Rota dedicada `Routes.offline`.
- Gate global no `GoRouter` com `redirect` para bloquear navegacao quando offline.
- Atualizacao automatica de rota com `refreshListenable` conectado ao stream de conectividade.
- Tela offline com mensagem, icone e CTA `Tentar novamente`.
- Presenter desacoplado para tentativa manual de reconexao.

## Regras de Negocio Aplicadas

1. Se estiver offline e a rota atual nao for offline, redirecionar para `Routes.offline`.
2. Se estiver online e a rota atual for offline, redirecionar para `Routes.home`.
3. A rota de splash nao entra no bloqueio global para preservar o fluxo de inicializacao.
4. O CTA de reconexao so habilita nova tentativa quando nao ha verificacao em andamento.

## Fluxo Final

```ASCII
[Mudanca de conectividade]
          |
          v
[InternetConnectionDriver.onStatusChange()] --> [GoRouter refresh]
                                                  |
                                                  v
                               [redirect consulta hasInternetAccess()]
                                     |                         |
                                     | online                  | offline
                                     v                         v
                           [se em /offline -> /]      [se fora de /offline -> /offline]
```

## Criterios de Aceite (atendidos)

- Bloqueio global de navegacao ativa quando sem internet.
- Retorno automatico para home ao recuperar internet.
- Tela offline unica e acessivel por rota dedicada.
- Acao manual de reconexao funcional.
- Implementacao desacoplada por contratos Core + Drivers + Presenter.
- `flutter analyze` sem issues e `flutter test` com todos os testes passando.
