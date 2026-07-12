# Runbook de rotação Yampi para a migração React Native

Este runbook executa a parte externa de RNM-003. Ele não contém valores de credenciais e não autoriza o uso das credenciais legadas no aplicativo React Native.

## Pré-requisitos e responsáveis

| Item | Responsável | Evidência requerida |
| --- | --- | --- |
| Acesso administrativo à conta Yampi | Responsável pela loja | Permissão para criar/revogar `User-Token` e `User-Secret-Key` |
| Acesso ao ambiente de deploy Expo/EAS | Responsável pelo deploy | Permissão para definir secrets server-side |
| API Routes implantáveis | Time de implementação | Fase 1 concluída com `expo.web.output: server`; Fase 3 com `+api.ts` |
| Janela de troca e rollback | Produto/Operação | Registro de horário, responsável e critério de reversão |

O template versionado [`.env.example`](../sertton-react-native-app/.env.example) define os quatro nomes permitidos. Ele deve permanecer sem valores; o arquivo local de segredo e as variáveis EAS não devem ser versionados.

## Procedimento

1. Gerar novas credenciais na Yampi. Registrar somente o identificador/versão da rotação em um cofre de segredos aprovado; nunca em issue, log, captura ou repositório.
2. No provedor de deploy, definir `YAMPI_USER_TOKEN` e `YAMPI_SECRET_KEY` como variáveis **server-side** com visibilidade **sensitive**. Não usar o prefixo `EXPO_PUBLIC_`.
3. Após RNM-310, publicar uma API Route mínima que leia as variáveis exclusivamente no servidor e faça uma chamada Yampi por meio de `src/rest/yampi/`. A rota deve retornar erro sanitizado quando uma variável estiver ausente.
4. Em build Android, iOS e web, confirmar que o cliente acessa apenas `/api/*`; procurar o bundle por `User-Token`, `User-Secret-Key`, URL base Yampi e valores de credenciais. A ausência deve bloquear a publicação.
5. Com a Route em produção, validar catálogo, pagamento e pedidos contra dados autorizados. Não registrar CPF/CNPJ, URLs de pagamento nem corpo de resposta em logs.
6. Revogar as credenciais legadas usadas pelo Flutter somente após a validação do BFF e conforme a janela de rollback aprovada. Registrar a revogação no cofre de segredos.

## Critérios de aceite de RNM-003

- As novas credenciais existem apenas no ambiente server-side do deploy.
- Não há credenciais no repositório, `app.json`, `EXPO_PUBLIC_*`, bundle ou logs.
- A árvore cliente não importa `src/rest/yampi/`, controllers ou provider de segredo.
- Todas as integrações Yampi observadas na matriz usam API Routes.
- As credenciais legadas foram revogadas por uma pessoa com autoridade Yampi.
- Consultas administrativas ao EAS foram feitas sem exibir valores; não usar comandos ou formatos que imprimam secrets no terminal.

## Relação com RNM-004

As fixtures em `documentation/fixtures/yampi/yampi-contract-fixtures.json` já são sanitizadas e permitem trabalho offline. Após a rotação, o responsável técnico deve compará-las com as respostas autorizadas, registrar incompatibilidades em `react-native-phase-0-reference.md` e somente então marcar RNM-004 como concluído.
