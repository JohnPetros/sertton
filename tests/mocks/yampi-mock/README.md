# Yampi Mock

Servidor HTTP local usado pelos testes de integração com Maestro.

Inicie com:

```bash
npm run mock:yampi
```

Por padrão, o servidor fica disponível em `http://127.0.0.1:4010`.

No ambiente usado pelo BFF:

```env
YAMPI_API_URL=http://127.0.0.1:4010
YAMPI_SECRET_KEY=mock-secret
YAMPI_USER_TOKEN=mock-token
```

Endpoints de controle:

```text
GET  /__test/health
POST /__test/reset
POST /__test/scenario
```

Cenários disponíveis:

```json
{ "scenario": "default" }
{ "scenario": "lead-error" }
```

O cenário `produto-inexistente-maestro` retorna uma lista vazia na busca de produtos.
