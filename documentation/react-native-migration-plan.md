# Plano de migração do Flutter para React Native

## 1. Objetivo

Migrar integralmente o aplicativo Sertton existente em Flutter para um novo aplicativo em React Native, preservando comportamento, regras de negócio, integrações, conteúdo e identidade visual.

O novo aplicativo deve residir em `sertton-react-native-app/` e utilizar obrigatoriamente:

- Expo;
- React Native;
- TypeScript;
- NativeWind;
- React Native Reusables;
- Expo Router;
- React Native Reanimated;
- Lucide React Native;
- Jest;
- Maestro MCP exclusivamente para inspeção visual interativa em dispositivos/emuladores.

A migração será incremental. O aplicativo Flutter permanecerá disponível como referência e alternativa de rollback até que o aplicativo React Native atinja todos os critérios de paridade e publicação.

## 2. Escopo e premissas

### 2.1. Escopo funcional

Devem ser migrados os comportamentos que existem no código Flutter atual:

- shell de navegação com Drawer, quatro abas persistentes e stacks internas;
- splash screen e tratamento compartilhado de conectividade;
- Home com busca, banners, coleções, captura de leads, meios de pagamento e informações da empresa;
- catálogo com busca, paginação infinita, filtro por categoria, filtro por múltiplas marcas e estados de carregamento/erro;
- detalhes do produto com SKU, variação, estoque, quantidade, preços, desconto, zoom, parcelamento, contador e produtos similares;
- compra rápida por modal;
- carrinho persistente, atualização de quantidade, remoção, resumo financeiro e redirecionamento ao checkout externo;
- consulta de pedidos por CPF/CNPJ, persistência da identificação, ordenação, accordions e estados vazio/erro/carregamento;
- páginas institucionais de privacidade, trocas/devoluções, termos e sobre a empresa;
- abertura de WhatsApp, telefone, e-mail e links externos.

O inventário inicial contém 19 DTOs, 12 mappers Yampi, 3 serviços de domínio implementados, 5 tipos de providers de infraestrutura, 72 Views, 35 Presenters e 70 arquivos de teste Flutter. Esse inventário deve ser reconfirmado no início da execução para capturar alterações posteriores a este plano.

### 2.2. Plataformas

- Android e iOS são obrigatórios para o primeiro cutover.
- Expo Web deve ser validado como alvo secundário, pois o repositório Flutter possui suporte web e a stack escolhida é compatível com web.
- Os shells Flutter de Windows, Linux e macOS não serão migrados nesta iniciativa. React Native para desktop exigiria tecnologias e um ciclo de entrega fora da stack solicitada.
- Se existir uma publicação desktop ativa, a desativação desse alvo deve ser aprovada antes do início da implementação.

### 2.3. Limites do escopo

- A migração não adicionará novas funcionalidades de negócio.
- Os tipos de `reviewing` (`AuthorDto` e `CommentDto`) serão portados para manter o domínio completo, mas não será criada uma experiência de avaliações enquanto ela não existir no app Flutter.
- Funcionalidades descritas como futuras, mas sem fluxo executável no código atual, como um módulo completo de frete, não fazem parte da paridade inicial.
- Bugs existentes não devem ser reproduzidos ou corrigidos silenciosamente. Cada divergência encontrada deve ser registrada como uma decisão: preservar temporariamente, corrigir antes do port ou corrigir durante o port. Quando o comportamento pertencer a um widget/hook, adicionar teste de regressão; nas demais camadas, registrar validação manual nesta etapa.

## 3. Decisões de arquitetura

### 3.1. Estrutura em camadas

A arquitetura em camadas será preservada, adaptada ao ecossistema TypeScript:

```text
Visual Route -> Screen component -> Hook -> Expo service -> /api
API Route -> ExpoHttp -> Controller -> Yampi service -> Axios -> Yampi

Provider implementation -> Provider contract
Todas as camadas dependem de Core; Core não depende de React, Expo ou bibliotecas externas.
```

- `core`: tipos imutáveis, contratos, erros de domínio, respostas e regras puras;
- `rest`: adapter Axios, controllers, adapters Expo, services cliente e integração Yampi;
- `providers`: storage, configuração, conectividade, navegação e links externos;
- `ui`: contexts, stores, widgets, telas e hooks organizados pelos mesmos domínios do Flutter;
- `constants`: constantes globais, contatos, headers e códigos HTTP;
- `app`: rotas visuais finas e Expo API Routes de composição do BFF.

Os diretórios `core`, `rest`, `providers`, `ui` e `constants` devem espelhar o máximo possível a organização atual em `lib/`. A infraestrutura será organizada em `providers`, e todo domínio compartilhado será nomeado `shared`. As demais divergências estruturais permitidas são somente as necessárias ao Expo Router, ao React e à colocalização de testes.

Cada Presenter Flutter será substituído por um hook testável colocado dentro da mesma pasta do widget. A View será substituída por um componente funcional exportado pelo `index.tsx`, sem o sufixo `View` no nome da função JSX. Toda função que retorna JSX deve ser declarada como arrow function atribuída a `const`. Componentes em `src/ui/` usarão exclusivamente export nomeado, sem `default export`. Por exemplo:

```tsx
export const ProductScreen = () => {
  return <View />
}
```

```text
product-screen/
├── index.tsx
├── use-product-screen.ts
├── tests/
│   ├── product-screen.test.tsx
│   └── use-product-screen.test.tsx
└── similar-products/
```

### 3.2. Estrutura de diretórios alvo

```text
sertton-react-native-app/
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── splash.tsx
│   │   ├── offline.tsx
│   │   ├── api/
│   │   │   ├── catalog/
│   │   │   │   ├── products+api.ts
│   │   │   │   └── products/
│   │   │   │       └── [productId]/
│   │   │   │           ├── index+api.ts
│   │   │   │           └── similar+api.ts
│   │   │   ├── checkout/
│   │   │   ├── orders/
│   │   │   └── leads+api.ts
│   │   ├── (main)/
│   │   │   ├── _layout.tsx
│   │   │   └── (tabs)/
│   │   │       ├── _layout.tsx
│   │   │       ├── index.tsx
│   │   │       ├── catalog/
│   │   │       │   ├── _layout.tsx
│   │   │       │   ├── index.tsx
│   │   │       │   └── [productId].tsx
│   │   │       ├── cart.tsx
│   │   │       └── orders.tsx
│   │   └── institutional/
│   │       ├── privacy.tsx
│   │       ├── return.tsx
│   │       ├── terms.tsx
│   │       └── about.tsx
│   ├── constants/
│   │   ├── http-headers.ts
│   │   ├── http-status-code.ts
│   │   └── sertton-contacts.ts
│   ├── core/
│   │   ├── catalog/
│   │   ├── checkout/
│   │   ├── shared/
│   │   ├── marketing/
│   │   ├── reviewing/
│   │   └── domain/
│   │       └── errors/
│   ├── providers/
│   │   ├── cache-provider/
│   │   ├── env-provider/
│   │   ├── internet-connection-provider/
│   │   ├── navigation-provider/
│   │   └── url-provider/
│   ├── rest/
│   │   ├── axios/
│   │   │   ├── axios-rest-client.ts
│   │   │   └── types/
│   │   ├── controllers/
│   │   │   ├── fetch-product-controller.ts
│   │   │   └── index.ts
│   │   ├── expo/
│   │   │   ├── expo-http.ts
│   │   │   ├── route.ts
│   │   │   └── services/
│   │   └── yampi/
│   │       ├── mappers/
│   │       └── services/
│   │           ├── yampi-catalog-service.ts
│   │           ├── yampi-checkout-service.ts
│   │           └── yampi-marketing-service.ts
│   └── ui/
│       ├── catalog/
│       │   ├── stores/
│       │   └── widgets/
│       ├── checkout/
│       │   ├── stores/
│       │   │   └── cart-store.ts
│       │   └── widgets/
│       ├── shared/
│       │   ├── contexts/
│       │   │   └── rest-context/
│       │   └── widgets/
│       └── institutional/
│           └── widgets/
├── assets/
├── app.config.ts
├── global.css
├── jest.config.ts
├── metro.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

Todos os arquivos e diretórios criados para o aplicativo React Native devem usar `kebab-case`. Os arquivos em `src/app/` usarão `kebab-case` sempre que o Expo Router permitir e seguirão suas convenções obrigatórias para `_layout.tsx`, `index.tsx`, `+api.ts` e grupos entre parênteses. Segmentos dinâmicos usarão `camelCase` dentro dos colchetes, como `[productId].tsx` e `[productId]+api.ts`, para que o nome do parâmetro coincida diretamente com o schema Zod e `Http<Schema>`.

Os arquivos de rota visual em `src/app/` não conterão UI, regra de negócio, chamadas de service ou estado de feature. Cada rota visual somente importará e retornará o widget correspondente de `src/ui`:

```tsx
import { CatalogScreen } from '@/ui/catalog/widgets/screens/catalog'

const CatalogRoute = () => {
  return <CatalogScreen />
}

export default CatalogRoute
```

O `default export` é proibido em todo o código de `src/`. A única exceção são os arquivos de rota visual dentro de `src/app/`, pois o Expo Router exige que cada tela exporte seu componente React como valor default. Mesmo nessa exceção, a função JSX deve ser declarada primeiro com `const`; não usar `export default function` nem function declaration. Arquivos `+api.ts` usam somente handlers HTTP nomeados, como `export const GET` e `export const POST`, sem default export.

Por enquanto, Jest será usado somente na camada de widgets. Cada pasta de widget terá uma subpasta `tests/`. A View será testada em `<nome-do-widget>.test.tsx`, e cada Presenter convertido em hook será testado em `use-<nome-do-widget>.test.tsx`. Axios, Core, providers, contexts, stores, mappers, services, controllers, adapters Expo e arquivos `+api.ts` não terão testes Jest nesta etapa. Não haverá uma pasta centralizada `tests/` fora de `src/`. Maestro não produzirá testes, flows ou arquivos de código no projeto; será usado somente para abrir e visualizar as telas implementadas.

### 3.3. Estado e injeção de dependências

- Criar `RestContext` em `src/ui/shared/contexts/rest-context/` como React Context responsável por compor e fornecer somente os services cliente de `src/rest/expo/services/`. O provider será `RestContextProvider` e o hook de consumo será `useRestContext`; nenhum código Yampi será importado pelo Context.
- Implementar o estado compartilhado do carrinho com Zustand. O store deve se chamar `CartStore` e ficar em `src/ui/checkout/stores/cart-store.ts`.
- Implementar hidratação e persistência do `CartStore` por meio do cache provider, sem acesso direto ao AsyncStorage dentro dos widgets.
- Manter o estado compartilhado de busca/filtros em `src/ui/catalog/stores/`, preservando a responsabilidade do `CatalogStore` atual.
- Manter estados de requisição explícitos: `idle`, `loading`, `success` e `error`.
- Expor hooks por widget/feature, sem chamadas HTTP diretas em componentes.
- Evitar passar objetos de produto nos parâmetros do Expo Router. A rota transportará apenas `productId`; o cache de catálogo poderá fornecer o conteúdo inicial enquanto a atualização remota ocorre.

### 3.4. Contratos de resultado e HTTP

Portar `RestResponse<T>` como classe TypeScript, preservando o padrão do projeto e adicionando erros de domínio tipados. Ela deve conter body e mensagem de erro privados, status, headers, getters de estado, leitura de headers, validação por campo, redirecionamento e conversão de status HTTP em exceções de domínio.

```ts
type RestResponseProps<Body> = {
  body?: Body
  statusCode?: number
  errorMessage?: string
  headers?: Record<string, string>
}

export class RestResponse<Body = unknown> {
  private readonly _body: Body | null
  private readonly _errorMessage: string | null
  readonly statusCode: number = HTTP_STATUS_CODE.ok
  readonly headers: Record<string, string> = {}

  constructor(props: RestResponseProps<Body> = {})
  mapBody<NewBody>(mapper: (body: Body) => NewBody): RestResponse<NewBody>
  throwError(): never
  get isSuccessful(): boolean
  get isFailure(): boolean
  get isValidationFailure(): boolean
  getValidationFieldErrors(fieldName: string): string[]
  getHeader(key: string): string | null
  get body(): Body
  get errorMessage(): string
  get isRedirecting(): string | null | false
}
```

O comportamento deve seguir estas regras:

- `404` lança `NotFoundError`;
- `409` lança `ConflictError`;
- `400` lança `ValidationError`;
- `429` lança o erro de domínio definido para excesso de requisições; enquanto não houver um erro dedicado, usar `ConflictError` para manter o contrato apresentado;
- `401` lança `AuthError`;
- `403` lança `NotAllowedError`;
- `406` e status `5xx` lançam `AppError`;
- `isSuccessful` considera respostas até `HTTP_STATUS_CODE.redirect`;
- `isFailure` considera status a partir de `badRequest` ou a presença de `errorMessage`;
- `mapBody` cria uma nova `RestResponse` preservando status, headers e erro enquanto transforma somente respostas com body válido;
- `body` e `errorMessage` mantêm getters protegidos por `AppError`;
- `isRedirecting` exige o status de redirect e o header `HTTP_HEADERS.location`.

A classe ficará em `src/core/shared/responses/rest-response.ts`. Os erros ficarão em `src/core/domain/errors/`, e os arquivos `http-status-code.ts` e `http-headers.ts` ficarão em `src/constants/`.

O cliente HTTP deve:

- encapsular Axios em `src/rest/axios/axios-rest-client.ts`;
- usar uma instância Axios configurada com base URL, headers e timeout explícito;
- aceitar query parameters tipados e delegar sua serialização ao adapter configurado;
- expor `clearQueryParams()` e `setQueryParam(key, value)` no contrato `RestClient`, para que os services construam filtros sem depender de tipos Axios;
- usar `AbortSignal` para cancelamento de busca e paginação;
- converter `AxiosResponse` em `RestResponse` para respostas de sucesso e redirect;
- converter `AxiosError`, respostas `4xx`/`5xx`, timeout, cancelamento e payload inválido em `RestResponse` ou `AppError`, conforme o contrato;
- nunca expor `AxiosInstance`, `AxiosRequestConfig`, `AxiosResponse` ou `AxiosError` fora de `src/rest/axios/`;
- permitir cancelamento da busca/paginação quando filtros mudarem;
- não compartilhar configuração mutável entre serviços.

### 3.5. Padrão dos mappers

Cada mapper deve possuir um contrato no Core e uma implementação funcional específica da Yampi.

Estrutura:

```text
src/core/<domínio>/interfaces/<entidade>-mapper.ts
src/rest/yampi/mappers/yampi-<entidade>-mapper.ts
```

Regras obrigatórias:

- declarar a interface do mapper no Core, sem dependência de React, Axios ou detalhes da Yampi;
- importar a interface na implementação com alias iniciado por `I`, por exemplo `BannerMapper as IBannerMapper`;
- declarar a implementação como arrow function atribuída a `const` e export nomeado;
- declarar explicitamente a interface do Core como retorno da factory;
- retornar um objeto literal que implemente todos os métodos do contrato;
- usar `import type` para contratos, DTOs/entities e `Json` quando forem usados apenas como tipos;
- manter o mapper puro e determinístico, sem HTTP, Context, Zustand, storage, navegação ou efeitos colaterais;
- centralizar tratamento de campos ausentes, conversões numéricas, datas, enums, listas e paginação;
- permitir composição entre mappers por meio de parâmetros tipados quando um payload contiver entidades aninhadas;
- não criar classes, construtores, herança, métodos estáticos ou default export;
- não criar testes diretos para mappers nesta etapa; a validação será feita pelas fixtures e pelos hooks consumidores.

Exemplo de contrato no Core:

```ts
import type { Banner } from '@/core/marketing/entities'
import type { Json } from '@/core/shared/types'

export interface BannerMapper {
  toDto(json: Json): Banner
  toDtoList(json: Json): Banner[]
}
```

Exemplo de implementação Yampi:

```ts
import type { BannerMapper as IBannerMapper } from '@/core/marketing/interfaces'
import type { Banner } from '@/core/marketing/entities'
import type { Json } from '@/core/shared/types'

export const YampiBannerMapper = (): IBannerMapper => {
  const toDto = (json: Json): Banner => {
    return {
      id: String(json.id ?? ''),
      imageUrl: String(json.image_url ?? ''),
    }
  }

  return {
    toDto,

    toDtoList(json) {
      const items = Array.isArray(json.data) ? json.data : []
      return items.map(toDto)
    },
  }
}
```

### 3.6. Padrão dos services

Cada service dentro de `src/rest/yampi/services/` deve ser uma factory function funcional. Não criar classes de service, construtores ou herança entre services.

Regras obrigatórias:

- importar a interface correspondente do Core com alias iniciado por `I`, por exemplo `CatalogService as ICatalogService`;
- importar contratos e tipos somente com `import type` quando não houver valor necessário em runtime;
- declarar o service como arrow function atribuída a `const` e export nomeado;
- receber `RestClient` por parâmetro, sem criar ou importar Axios diretamente;
- declarar explicitamente o retorno da factory com a interface do Core;
- receber os mappers necessários por parâmetros tipados pelas interfaces do Core, sem instanciar implementações Yampi dentro do service;
- retornar um objeto literal que implementa todos os métodos do contrato;
- implementar métodos com a sintaxe curta `async methodName()` dentro do objeto;
- delegar requisições exclusivamente ao `restClient` recebido;
- usar `clearQueryParams()` antes de construir filtros de uma nova requisição;
- usar `setQueryParam()` para paginação, busca, filtros e ordenação, sem concatenar valores dinâmicos manualmente na URL;
- extrair `.value` de value objects e usar `.dto` de entities/aggregates quando esses tipos existirem;
- manter os métodos finos: montagem de endpoint/payload/query, chamada ao RestClient e mapeamento Yampi;
- não conter estado React, hooks, Zustand, navegação ou regra de apresentação;
- não usar default export;
- não criar testes diretos para services nesta etapa.

Exemplo adaptado ao projeto:

```ts
import type { MarketingService as IMarketingService } from '@/core/marketing/interfaces'
import type { BannerMapper } from '@/core/marketing/interfaces'
import type { RestClient } from '@/core/shared/interfaces'
import type { Json } from '@/core/shared/types'

export const YampiMarketingService = (
  restClient: RestClient,
  bannerMapper: BannerMapper,
): IMarketingService => {
  return {
    async fetchBanners() {
      const response = await restClient.get<Json>('/marketing/banners')
      return response.mapBody(bannerMapper.toDtoList)
    },

    async saveLead(lead) {
      return await restClient.post('/leads', {
        email: lead.email,
        ...(lead.name ? { name: lead.name } : {}),
      })
    },
  }
}
```

O mesmo formato deve ser aplicado a `YampiCatalogService` e `YampiCheckoutService`. O `RestContext` será responsável por criar uma instância isolada do `AxiosRestClient` para cada service, evitando colisão entre query params mutáveis de requisições concorrentes:

```ts
const bannerMapper = YampiBannerMapper()
const marketingService = YampiMarketingService(
  AxiosRestClient(config),
  bannerMapper,
)
```

Os arquivos `+api.ts` repetirão essa composição explicitamente para os mappers e services Yampi de catálogo e checkout. O `RestContext` não participa dessa composição server-side.

### 3.7. Expo API Routes, Http e controllers

As Expo API Routes serão o BFF da aplicação. Elas executarão no servidor implantado e serão o único ponto autorizado a importar `src/rest/yampi/` e acessar as credenciais da Yampi.

#### Contratos no Core

Criar em `src/core/shared/interfaces/`:

- `HttpSchema`: shape-base com `body`, `queryParams` e `routeParams` opcionais;
- `Http<Schema>`: leitura tipada de route params, query params e body; criação de `RestResponse` por `send()` e sinalização de passagem por `pass()`;
- `Controller<Schema>`: contrato com `handle(http: Http<Schema>)`;
- estruturas de domínio como `Id`, quando necessárias para validar e encapsular parâmetros antes de chamar services.

Esses contratos não dependem de Expo Router, Zod, Axios ou Yampi.

#### ExpoHttp

`src/rest/expo/expo-http.ts` seguirá o contrato abaixo, adaptando apenas os aliases para a estrutura `core/shared` deste projeto:

- será uma factory assíncrona, arrow function atribuída a `const` e com export nomeado;
- aceitará `request`, `schema` e `params` opcionais;
- inspecionará as chaves declaradas no schema Zod e lerá somente `queryParams`, `body` e `routeParams` solicitados;
- converterá `URLSearchParams` em objeto, fará o parse do JSON do body e usará os parâmetros dinâmicos entregues pelo Expo Router;
- executará `schema.parse()` uma única vez e manterá o resultado tipado como `ExpoSchema`;
- retornará `Promise<Http<ExpoSchema> & ExpoHttp>`;
- `getBody()` será assíncrono; todos os getters lançarão `AppError` quando a parte solicitada não estiver definida;
- `pass()` criará uma `RestResponse` com `HTTP_HEADERS.xPass: 'true'`;
- `send()` criará a `RestResponse` usada pelo controller;
- `sendResponse()` converterá a `RestResponse` em `Response` do runtime Expo.

```ts
import type { ZodSchema } from 'zod'

import { HTTP_HEADERS } from '@/constants'
import { AppError } from '@/core/domain/errors/app-error'
import type { Http, HttpSchema } from '@/core/shared/interfaces/http'
import { RestResponse } from '@/core/shared/responses'

type ExpoHttp = {
  sendResponse: (response: RestResponse) => Response
}

type ExpoHttpParams = {
  request?: Request
  schema?: ZodSchema
  params?: Record<string, string>
}

export const ExpoHttp = async <ExpoSchema extends HttpSchema>({
  request,
  schema,
  params,
}: ExpoHttpParams = {}): Promise<Http<ExpoSchema> & ExpoHttp> => {
  let httpSchema: ExpoSchema

  if (request && schema) {
    let body: HttpSchema['body']
    let queryParams: HttpSchema['queryParams']
    let routeParams: HttpSchema['routeParams']

    // @ts-ignore -- ZodSchema não expõe keyof no tipo-base, mas a rota exige z.object().
    const keys = schema.keyof().options

    if (keys.includes('queryParams')) {
      const url = new URL(request.url)
      queryParams = Object.fromEntries(url.searchParams.entries())
    }

    if (keys.includes('body')) body = await request.json()

    if (keys.includes('routeParams')) {
      if (!params) throw new AppError('Route params not provided')
      routeParams = params
    }

    httpSchema = schema.parse({ body, queryParams, routeParams }) as ExpoSchema
  }

  return {
    async getBody() {
      if (!httpSchema?.body) throw new AppError('Body is not defined')
      return httpSchema.body
    },

    getRouteParams() {
      if (!httpSchema?.routeParams) throw new AppError('Route params are not defined')
      return httpSchema.routeParams
    },

    getQueryParams() {
      if (!httpSchema?.queryParams) throw new AppError('Query params are not defined')
      return httpSchema.queryParams
    },

    pass() {
      return new RestResponse({ headers: { [HTTP_HEADERS.xPass]: 'true' } })
    },

    send(json?: unknown, statusCode?: number) {
      return new RestResponse({ body: json, statusCode })
    },

    sendResponse(response: RestResponse): Response {
      return Response.json(response.body, {
        status: response.statusCode,
        headers: response.headers,
      })
    },
  }
}
```

O comentário de supressão deve ficar restrito à inspeção de `keyof()` do Zod. Se a versão adotada oferecer uma tipagem pública equivalente, a supressão deverá ser removida sem alterar o contrato. A mensagem original `Next params not provided` será adaptada para `Route params not provided`, pois este adapter pertence ao Expo Router.

#### Route

`src/rest/expo/route.ts` será uma Higher-Order Function declarada com `const`. Ela envolverá handlers `GET`, `POST`, `PUT`, `PATCH` e `DELETE` para:

- capturar erros de domínio;
- capturar `ZodError` lançado por `schema.parse()` e convertê-lo em `ValidationError`/status `400`;
- converter `ValidationError`, `NotFoundError`, `ConflictError`, `AuthError`, `NotAllowedError` e `AppError` nos status HTTP correspondentes;
- retornar `500` para erros inesperados sem expor stack trace;
- aplicar headers compartilhados e CORS quando necessário para Expo Web;
- sanitizar logs, removendo tokens, CPF/CNPJ e dados sensíveis;
- garantir um formato de erro consistente para o aplicativo;
- reconhecer `HTTP_HEADERS.xPass` sem expor esse header de controle como parte do payload público.

#### Controllers

Cada operação terá um controller em `src/rest/controllers/` seguindo o padrão funcional:

- factory arrow function atribuída a `const`;
- dependências recebidas por interfaces do Core;
- retorno explicitamente tipado como `Controller<Schema>`;
- objeto literal com método `async handle(http)`;
- leitura de entrada exclusivamente pela interface `Http`;
- criação de value objects antes de chamar o service;
- lançamento de erros de domínio para situações de falha;
- retorno por `http.send()`;
- sem import de Expo Router, Zod, Axios, mapper Yampi ou implementação concreta;
- sem classe, herança ou default export;
- sem testes diretos nesta etapa.

Exemplo de controller:

```ts
import { NotFoundError } from '@/core/domain/errors'
import { Id } from '@/core/domain/structures'
import type { CatalogService } from '@/core/catalog/interfaces'
import type { Controller, Http } from '@/core/shared/interfaces'

type Schema = {
  routeParams: {
    productId: string
  }
}

export const FetchProductController = (
  catalogService: CatalogService,
): Controller<Schema> => {
  return {
    async handle(http: Http<Schema>) {
      const { productId } = http.getRouteParams()
      const response = await catalogService.fetchProduct(Id.create(productId))

      if (response.isFailure) response.throwError()
      if (!response.body) throw new NotFoundError('Product not found')

      return http.send(response.body)
    },
  }
}
```

#### Arquivos `+api.ts`

Cada arquivo `src/app/api/**/*+api.ts` conterá somente:

1. schema Zod;
2. tipo inferido com `z.infer`;
3. handler nomeado envolvido por `Route`;
4. criação de `ExpoHttp`;
5. composição de RestClient, mappers, service e controller;
6. chamada `controller.handle(http)`;
7. retorno `http.sendResponse(response)`.

Exemplo:

```ts
import { EnvProvider } from '@/providers/env-provider'
import { AxiosRestClient } from '@/rest/axios/axios-rest-client'
import { FetchProductController } from '@/rest/controllers'
import { ExpoHttp } from '@/rest/expo/expo-http'
import { Route } from '@/rest/expo/route'
import { YampiProductMapper } from '@/rest/yampi/mappers'
import { YampiCatalogService } from '@/rest/yampi/services'
import z from 'zod'

const schema = z.object({
  routeParams: z.object({
    productId: z.string(),
  }),
})

type Schema = z.infer<typeof schema>

export const GET = Route(async (request, params) => {
  const http = await ExpoHttp<Schema>({ schema, request, params })
  const env = EnvProvider()
  const productMapper = YampiProductMapper()
  const restClient = AxiosRestClient(env.yampi)
  const service = YampiCatalogService(restClient, { productMapper })
  const controller = FetchProductController(service)
  const response = await controller.handle(http)
  return http.sendResponse(response)
})
```

#### Services consumidos pelo aplicativo

O código cliente não consumirá `YampiCatalogService` diretamente. Criar factories em `src/rest/expo/services/` que implementem os mesmos contratos do Core e chamem somente `/api/*` por meio de um `AxiosRestClient` configurado com a origem pública do BFF.

O `RestContext` fornecerá esses services Expo para os hooks:

```ts
const restClient = AxiosRestClient({ baseUrl: config.apiOrigin })
const catalogService = ExpoCatalogService(restClient)
const checkoutService = ExpoCheckoutService(restClient)
const marketingService = ExpoMarketingService(restClient)
```

O Biome deve impedir imports de `@/rest/yampi/*`, `@/rest/controllers/*` e providers de segredo a partir de `src/ui/` ou dos services cliente em `src/rest/expo/services/`.

### 3.8. Segurança e configuração

Esta é uma condição obrigatória antes do cutover:

- `EXPO_PUBLIC_*` é configuração pública e pode ser extraída do bundle do aplicativo.
- O `User-Token` e o `User-Secret-Key` da Yampi devem existir apenas no ambiente server-side das Expo API Routes, sem prefixo `EXPO_PUBLIC_`.
- O código cliente deve chamar somente `/api/*`; chamadas diretas do app para a Yampi são proibidas.
- `src/rest/yampi/`, controllers e providers de segredo só podem ser importados pela árvore server-side iniciada em arquivos `+api.ts`.
- Configurar `expo.web.output` como `server` e implantar as API Routes em EAS Hosting ou runtime WinterCG compatível.
- O aplicativo nativo deve usar uma origem HTTPS estável do BFF; não depender do vínculo automático experimental de deployment para produção.
- O carrinho pode usar AsyncStorage, mas CPF/CNPJ persistido deve usar `expo-secure-store`.
- Não registrar tokens, respostas sensíveis, CPF/CNPJ ou URLs de pagamento em logs.
- Criar `.env.example` somente com nomes e valores não sensíveis; arquivos reais de ambiente permanecem ignorados pelo Git.

### 3.9. Bibliotecas de suporte

Além da stack obrigatória, serão necessárias dependências compatíveis com o SDK Expo selecionado para substituir capacidades existentes:

- `axios` para a implementação HTTP em `src/rest/axios/`;
- `zod` para schemas e validação das Expo API Routes;
- `@biomejs/biome` como dependência de desenvolvimento para lint, formatação e organização de imports;
- `@react-native-async-storage/async-storage` para o carrinho;
- `expo-secure-store` para identificação do cliente;
- `@react-native-community/netinfo` para conectividade;
- `expo-linking` para URLs, telefone e e-mail;
- `expo-splash-screen` e `lottie-react-native` para a experiência de abertura;
- `react-native-gesture-handler` para Drawer, gestos e zoom;
- `react-native-svg`, dependência de ícones e recursos vetoriais;
- `zustand` para o `CartStore` e demais stores compartilhados aprovados;
- `@testing-library/react-native` e `jest-expo` para testes.
- Maestro MCP para abrir o aplicativo e inspecionar visualmente as telas em dispositivo ou emulador, sem automação de testes.

Todas devem ser instaladas pela ferramenta do Expo quando aplicável, garantindo compatibilidade com o SDK escolhido. As versões exatas serão registradas no lockfile e não devem ser definidas por este documento.

### 3.10. Qualidade de código

Biome será a única ferramenta de lint e formatação. Não instalar nem configurar ESLint ou Prettier no aplicativo React Native.

O `package.json` deve expor pelo menos estes scripts:

```json
{
  "scripts": {
    "codecheck": "biome check .",
    "codecheck:fix": "biome check --write .",
    "typecheck": "tsc --noEmit",
    "test": "jest --runInBand",
    "test:coverage": "jest --coverage --runInBand"
  }
}
```

- `npm run codecheck` executa lint, verificação de formatação e organização de imports sem alterar arquivos.
- `npm run codecheck:fix` aplica formatação e correções seguras durante o desenvolvimento.
- `npm run typecheck` executa a validação TypeScript separadamente, pois Biome não substitui o compilador TypeScript.
- `npm run test` executa os testes Jest de Views e hooks dos widgets.
- `npm run test:coverage` executa a mesma suíte e gera coverage restrita aos widgets.
- O CI e os gates de implementação devem chamar os scripts npm, sem invocar Biome ou `tsc` diretamente.
- `biome.json` deve aplicar as regras de kebab-case, uso de `const`/arrow functions para JSX, proibição de default exports em `src/` e restrições de imports cliente/servidor, com override de default export apenas para as rotas visuais obrigatórias do Expo Router em `src/app/`.

## 4. Mapeamento tecnológico

| Flutter atual | React Native alvo | Estratégia |
| --- | --- | --- |
| Flutter/Dart | React Native/TypeScript | Componentes funcionais, strict mode e tipos `readonly` |
| `go_router` | Expo Router | Rotas por arquivos, Stack + Drawer + Tabs |
| Riverpod | `RestContext` + Zustand | Context para serviços REST e stores para estado compartilhado |
| Signals | hooks e seletores Zustand | Hooks colocalizados e valores derivados sem estado duplicado |
| `shadcn_flutter` | React Native Reusables | Componentes copiados para `src/ui/shared/widgets/` e tematizados |
| Material/Widgets customizados | React Native + NativeWind | Tokens e utilities; sem estilos isolados sem justificativa |
| `flutter_animate`/`animate_do` | Reanimated | Microinterações, skeletons, modais e transições |
| Font Awesome/ícones Material | Lucide React Native | Mapeamento semântico de cada ícone |
| Dio | Axios encapsulado | Adapter em `rest/axios`, timeout, cancelamento e `RestResponse` |
| `shared_preferences` | AsyncStorage/SecureStore | Storage não sensível separado de PII |
| `internet_connection_checker_plus` | NetInfo | Monitor compartilhado e ação de reconexão |
| `url_launcher` | Expo Linking | Schemes externos e fallback de WhatsApp |
| `flutter_dotenv` | `app.config.ts` + ambiente Expo | Somente configuração pública no cliente |
| `intl` | `Intl` JavaScript | Moeda BRL e datas `pt-BR` centralizadas |
| Lottie | `lottie-react-native` | Reutilizar `assets/lotties/truck.json` |
| `flutter_test`/Mocktail | Jest + Testing Library | Testes colocalizados de Views e hooks de widgets |

React Native Reusables distribui código-fonte de componentes. Cada componente adicionado deve ser revisado, mantido localmente e coberto pelos mesmos tokens de tema; ele não deve ser tratado como uma caixa-preta atualizada automaticamente.

## 5. Mapeamento de rotas

| Rota atual | Expo Router | Observação |
| --- | --- | --- |
| `/splash` | `/splash` | Tela visual de quatro segundos, separada do splash nativo |
| `/offline` | `/offline` | Fora do shell principal para evitar loop de navegação |
| `/` | `/(main)/(tabs)` | Home, primeira aba |
| `/catalog` | `/(main)/(tabs)/catalog` | Preserva busca, filtros e posição da lista |
| `/catalog/:productId` | `/(main)/(tabs)/catalog/[productId]` | Segmento dinâmico; produto vem do cache ou serviço |
| `/cart` | `/(main)/(tabs)/cart` | Terceira aba, badge derivado do carrinho |
| `/orders` | `/(main)/(tabs)/orders` | Quarta aba |
| `/institutional/privacy` | `/institutional/privacy` | Stack raiz, sem barra de abas |
| `/institutional/return` | `/institutional/return` | Stack raiz, sem barra de abas |
| `/institutional/terms` | `/institutional/terms` | Stack raiz, sem barra de abas |
| `/institutional/about` | `/institutional/about` | Stack raiz, sem barra de abas |

O layout raiz controlará hidratação, splash e redirecionamento offline. `(main)` implementará o Drawer customizado e `(tabs)` implementará as quatro abas. Cada aba deve preservar seu histórico, posição de scroll e estado de formulário ao alternar entre elas.

### 5.1. Expo API Routes

| Endpoint do BFF | Handler | Responsabilidade |
| --- | --- | --- |
| `/api/catalog/products` | `GET` | Busca, filtros e paginação de produtos |
| `/api/catalog/products/:productId` | `GET` | Produto individual |
| `/api/catalog/products/:productId/similar` | `GET` | Produtos similares |
| `/api/catalog/categories` | `GET` | Categorias |
| `/api/catalog/brands` | `GET` | Marcas |
| `/api/catalog/collections` | `GET` | Coleções e produtos por coleção |
| `/api/checkout/payments` | `GET` | Meios de pagamento |
| `/api/checkout/installments` | `GET` | Parcelas por produto/pagamento |
| `/api/checkout/link` | `POST` | Geração validada do link de checkout |
| `/api/leads` | `POST` | Cadastro de lead |
| `/api/orders/session` | `POST` | Início/validação da sessão do cliente |
| `/api/orders` | `GET` | Pedidos da sessão verificada |

Cada endpoint terá schema Zod, controller próprio e composição explícita no arquivo `+api.ts` correspondente.

## 6. Inventário de paridade por domínio

### 6.1. Core e dados

- Portar todos os 19 DTOs como tipos/interfaces imutáveis.
- Portar enums de pessoa, pagamento, pedido e origem de contato.
- Portar `PaginationResponse` para um tipo simples, sem campos privados artificiais.
- Portar contratos de catálogo, checkout e marketing.
- Portar contratos de cache, ambiente, conectividade, navegação e URL quando a abstração continuar útil.
- Portar os 12 mappers Yampi usando fixtures representativas como referência de implementação e revisão manual.
- Portar endpoints de produtos, produto individual, categorias, marcas, coleções, produtos por coleção, similares, pedidos, pagamentos, parcelas, banners e leads.
- Portar geração e validação do link de checkout.

### 6.2. Shared e institucional

- Header, busca compartilhada e ações do Drawer;
- tab bar customizada com estados ativo/inativo e badge do carrinho;
- fallback WhatsApp app -> URL web;
- splash visual, Lottie e navegação temporizada;
- offline compartilhado, tentativa manual e retorno à Home;
- quatro telas institucionais e scaffold compartilhado;
- conteúdo institucional e dados da empresa sem alteração textual acidental.

### 6.3. Home e marketing

- header e busca que navega ao catálogo com termo inicial/foco;
- banners e coleções intercalados na mesma ordem do Flutter;
- lista horizontal de produtos por coleção;
- loading, erro e retry por seção;
- captura e validação de e-mail, estados de sucesso/erro e prevenção de múltiplos submits;
- meios de pagamento com skeleton e fallback discreto;
- rodapé com informações e contatos da empresa.

### 6.4. Catálogo e produto

- paginação infinita sem requisições duplicadas;
- refresh, loading inicial, loading incremental, erro e lista vazia;
- cancelamento da requisição anterior quando busca/filtros mudarem;
- categoria única, múltiplas marcas, limpar e aplicar filtros;
- busca local/compartilhada e foco automático;
- cards, imagem, SKU, marca, nome, desconto, preço e compra rápida;
- seleção inicial do primeiro SKU, variações, estoque e quantidade máxima;
- zoom de imagem em tela cheia;
- descrição, especificações, contador até o fim do dia, similares e parcelamento;
- preços e datas formatados em `pt-BR`, sem lógica de formatação dentro do componente.

### 6.5. Carrinho e checkout

- iniciar um novo storage React Native, sem importar ou migrar dados locais do aplicativo Flutter;
- hidratação antes de renderizar totais definitivos;
- deduplicação por SKU e semântica de substituição de quantidade;
- quantidade mínima 1 e máxima igual ao estoque atual;
- enriquecimento dos itens com dados atuais do catálogo;
- remoção individual, limpar carrinho, vazio, loading e erro;
- subtotal, desconto e total derivados de uma única fonte de estado;
- checkout externo com todos os tokens/quantidades;
- limpar o carrinho somente após confirmação de que a URL foi aberta com sucesso.

### 6.6. Pedidos

- seleção CPF/CNPJ, máscara e validação equivalente ao app atual;
- armazenamento seguro do documento somente após busca bem-sucedida;
- carregamento automático quando houver documento salvo;
- alteração de documento/logout;
- ordenação decrescente por data;
- loading, erro com retry, vazio e lista;
- accordion com status, data, itens, totais e endereço;
- mapeamento completo de todos os status conhecidos e fallback para status desconhecido.

A consulta manterá a regra existente: qualquer pessoa que informe um CPF/CNPJ correto poderá visualizar os pedidos associados. Não será adicionada autenticação, sessão de verificação ou prova adicional de titularidade nesta migração.

## 7. Fases de implementação

Cada tarefa só pode ser marcada como concluída quando seu resultado observável e suas validações estiverem aprovados. Ao final de tarefas fora da UI, executar `npm run codecheck` e `npm run typecheck`. Ao final de tarefas de widgets, executar também os testes Jest da View e do hook afetados e usar o Maestro MCP somente para abrir e visualizar a tela correspondente no aplicativo compilado.

### Fase 0 — Congelamento da referência e decisões bloqueantes

- [ ] **RNM-000 — Registrar baseline funcional sem executar o Flutter.** Usar o código, os testes existentes e as imagens já organizadas em `documentation/screenshots/flutter/<plataforma>/<tela>/` para criar a matriz de paridade. Não iniciar nem compilar o aplicativo Flutter. As referências de Pedidos devem usar fixtures sanitizadas antes de qualquer publicação. **Resultado:** nenhuma tela ou comportamento depende apenas de memória durante o port.
- [ ] **RNM-001 — Reconciliar documentação e código.** Classificar requisitos como implementado, documentado mas incompleto, futuro ou obsoleto. **Depende de:** RNM-000. **Resultado:** escopo de paridade assinado e sem funcionalidades implícitas.
- [ ] **RNM-002 — Aprovar matriz de plataformas.** Confirmar Android/iOS obrigatórios, Expo Web secundário e ausência de desktop no cutover. **Resultado:** alvos de build e QA definidos.
- [ ] **RNM-003 — Resolver credenciais Yampi.** Configurar `User-Token` e `User-Secret-Key` somente no ambiente server-side das Expo API Routes e rotacionar as credenciais expostas pelo Flutter. **Resultado:** nenhum segredo de servidor entra no bundle cliente e todas as chamadas Yampi partem do BFF.
- [ ] **RNM-004 — Congelar contrato da API.** Salvar fixtures sanitizadas de sucesso, paginação, vazio e erro para cada endpoint usado. **Depende de:** RNM-003. **Resultado:** mappers podem ser portados e revisados sem depender da rede.
- [ ] **RNM-005 — Definir política de divergências.** Abrir uma lista de bugs conhecidos, inclusive inconsistências de status HTTP, cancelamento e persistência. **Resultado:** cada diferença entre Flutter e React Native terá decisão explícita.

### Fase 1 — Scaffold e toolchain

- [ ] **RNM-100 — Consolidar o scaffold em `sertton-react-native-app/`.** Partir do projeto Expo já criado com Expo Router em `src/app`, remover o conteúdo demonstrativo, os imports e as declarações diretas não utilizadas de `@expo/ui`, `expo-glass-effect` e `expo-symbols`, sem executar ou modificar o aplicativo Flutter. Esses pacotes podem permanecer no lockfile exclusivamente como dependências transitivas obrigatórias do `expo-router`. Configurar `expo.web.output` como `server` e confirmar uma API Route smoke. **Depende de:** RNM-002. **Resultado:** o scaffold existente inicia localmente em Android, iOS e web, sem código ou dependência direta demonstrativa desnecessária.
- [ ] **RNM-101 — Validar e fixar versões compatíveis.** Usar como baseline as versões já registradas no scaffold — Expo `~57.0.4`, React Native `0.86.0`, React `19.2.3`, TypeScript `~6.0.3`, Expo Router `~57.0.4` e Reanimated `4.5.0` — e validar a compatibilidade de NativeWind, React Native Reusables, Zod, Lucide, Jest e demais dependências antes de adicioná-las. Registrar a versão do Node, manter npm como package manager e preservar `package-lock.json`. **Depende de:** RNM-100. **Resultado:** instalação reproduzível e `expo-doctor` sem erros.
- [ ] **RNM-102 — Configurar TypeScript e Biome.** Ativar `strict`, `noUncheckedIndexedAccess`, alias `@/` e o script `typecheck` com `tsc --noEmit`. Configurar `biome.json` para lint, formatação, organização de imports, kebab-case, JSX em arrow functions atribuídas a `const`, proibição de default export em `src/`, override para rotas visuais em `src/app/` e restrições de imports client/server. Não adicionar ESLint ou Prettier. **Depende de:** RNM-100. **Resultado:** `npm run codecheck` e `npm run typecheck` passam; violações das convenções e fronteiras são rejeitadas.
- [ ] **RNM-103 — Configurar NativeWind.** Adicionar CSS global, Metro, Babel quando exigido pela versão, tipos e paths de conteúdo. **Depende de:** RNM-101. **Resultado:** classes funcionam em componente React Native e web.
- [ ] **RNM-104 — Configurar React Native Reusables.** Inicializar registry/configuração e adicionar somente os componentes necessários: Text, Button, Input, Card, Badge, Dialog, Select, Accordion, Skeleton, Separator, Tabs e Portal. **Depende de:** RNM-103. **Resultado:** catálogo local de componentes renderiza com o tema Sertton.
- [ ] **RNM-105 — Configurar Reanimated e gestos.** Aplicar plugin e setup exigidos pela versão compatível, envolver a raiz com o provider necessário e validar uma animação. **Depende de:** RNM-101. **Resultado:** animação roda sem warning em build nativo.
- [ ] **RNM-106 — Configurar Jest para widgets.** Usar `jest-expo`, Testing Library, setup de Reanimated, mocks de SVG/Linking/storage e alias de paths. Limitar a descoberta a `src/ui/**/widgets/**/tests/*.test.tsx` e impedir testes dentro de `src/app/`. **Depende de:** RNM-102 e RNM-105. **Resultado:** um teste smoke de View e um de hook passam localmente a partir da subpasta `tests/` do widget.
- [ ] **RNM-107 — Copiar assets e preservar a identidade do aplicativo.** Migrar logo, ícone, splash e Lottie. Manter exatamente o Android application ID e o iOS bundle identifier `br.com.sertton.sertton`, o nome Sertton, a assinatura e os registros existentes nas lojas. Usar o scheme `sertton` e definir uma versão superior à Flutter `1.0.15` somente na preparação do release. **Depende de:** RNM-100. **Resultado:** o React Native pode ser publicado como atualização do mesmo aplicativo, sem criar uma nova listagem nas lojas.
- [ ] **RNM-108 — Criar scripts de qualidade.** Adicionar `codecheck`, `codecheck:fix`, `typecheck`, `test`, `test:coverage`, `doctor`, `start`, builds e export web. `codecheck` deve encapsular lint e formatação do Biome; `typecheck` deve executar `tsc --noEmit`; `test` e `test:coverage` devem encapsular o Jest. **Depende de:** RNM-106. **Resultado:** os scripts npm executam toda a validação estática e os testes de widgets sem comandos avulsos.
- [ ] **RNM-109 — Disponibilizar Maestro MCP para inspeção visual.** Configurar o servidor `maestro mcp` no ambiente de desenvolvimento e confirmar que ele consegue abrir o aplicativo em um emulador Android ou simulador iOS. Não criar `.maestro/`, flows, asserções, testes ou scripts no projeto. **Depende de:** RNM-100 e RNM-107. **Resultado:** o MCP permite visualizar interativamente uma tela implementada; limitações de execução do iOS fora de macOS ficam registradas.

### Fase 2 — Core TypeScript

- [ ] **RNM-200 — Criar respostas, erros e constantes compartilhadas.** Implementar a classe `RestResponse`, `RestResponseProps`, `HTTP_STATUS_CODE`, `HTTP_HEADERS` incluindo `location` e `xPass`, `Pagination` e os erros `AppError`, `AuthError`, `ConflictError`, `NotAllowedError`, `NotFoundError` e `ValidationError`. **Depende de:** RNM-102. **Resultado:** contrato compila em TypeScript, atende ao comportamento especificado e não importa React/Expo.
- [ ] **RNM-201 — Migrar domínio de catálogo.** Portar Product, SKU, Variation, Category, Brand e Collection com propriedades `readonly`. **Depende de:** RNM-200. **Resultado:** fixtures de catálogo satisfazem os tipos.
- [ ] **RNM-202 — Migrar domínio de checkout.** Portar CartItem, Customer, Discount, Installment, Order, OrderItem, Payment, Address e enums. **Depende de:** RNM-200. **Resultado:** fixtures de pedidos e carrinho satisfazem os tipos.
- [ ] **RNM-203 — Migrar marketing e reviewing.** Portar Banner, Lead, Contact, Author e Comment. **Depende de:** RNM-200. **Resultado:** domínio completo sem dependências externas.
- [ ] **RNM-204 — Criar contratos de service e RestClient.** Definir `CatalogService`, `CheckoutService` e `MarketingService`, com `AbortSignal` onde cancelamento é necessário. Completar `RestClient` com métodos HTTP, `clearQueryParams()` e `setQueryParam()`. **Depende de:** RNM-201 a RNM-203. **Resultado:** cada factory REST pode declarar explicitamente a interface do Core como retorno, sem casts ou tipos Axios.
- [ ] **RNM-205 — Criar contratos de providers.** Definir storage, secure storage, conectividade, links e configuração, mantendo tipos de bibliotecas fora do Core. **Depende de:** RNM-200. **Resultado:** contratos compilam sem expor tipos das bibliotecas concretas.
- [ ] **RNM-206 — Portar regras puras.** Criar moeda/data `pt-BR`, máscara de documento, cálculo de desconto/totais, seleção de SKU e contador até meia-noite. **Depende de:** RNM-201 e RNM-202. **Resultado:** regras compilam e são verificadas durante os testes dos hooks que as consomem.
- [ ] **RNM-207 — Criar contratos dos mappers.** Definir no Core as interfaces dos mappers de Brand, Category, Collection, Product, SKU, Variation, Address, Order, OrderItem, Payment, Installment e Banner. **Depende de:** RNM-201 a RNM-203. **Resultado:** cada mapper Yampi pode declarar uma interface `I*` como retorno sem depender de detalhes REST.

### Fase 3 — REST, Yampi e providers

- [ ] **RNM-300 — Implementar cliente HTTP Axios.** Criar a factory `AxiosRestClient` em `src/rest/axios/axios-rest-client.ts`, retornando o contrato `RestClient`, com instância Axios configurada, timeout, `AbortSignal`, headers, `clearQueryParams()`, `setQueryParam()`, parsing seguro e normalização de `AxiosError`. **Depende de:** RNM-200 e RNM-003. **Resultado:** implementação compila, consome query params na requisição sem vazá-los para a próxima e não expõe tipos Axios fora da pasta. Não criar testes para Axios nesta etapa.
- [ ] **RNM-301 — Portar mappers de catálogo.** Implementar `YampiBrandMapper`, `YampiCategoryMapper`, `YampiCollectionMapper`, `YampiProductMapper`, `YampiSkuMapper` e `YampiVariationMapper` como factories `const`, retornando interfaces `I*` do Core e objetos literais puros. Usar fixtures congeladas como referência. **Depende de:** RNM-207, RNM-004 e RNM-300. **Resultado:** não há classes, métodos estáticos ou default exports; equivalência campo a campo é revisada contra as fixtures.
- [ ] **RNM-302 — Portar mappers de checkout/marketing.** Implementar `YampiAddressMapper`, `YampiOrderMapper`, `YampiOrderItemMapper`, `YampiPaymentMapper`, `YampiInstallmentMapper` e `YampiBannerMapper` com o mesmo padrão funcional e interfaces do Core. **Depende de:** RNM-207, RNM-004 e RNM-300. **Resultado:** enums, datas, nulls e valores numéricos são revisados contra fixtures, sem efeitos colaterais ou dependências Axios.
- [ ] **RNM-303 — Implementar service de catálogo.** Criar `YampiCatalogService` como factory `const`, receber `RestClient` e interfaces dos mappers de catálogo, declarar retorno `ICatalogService` e retornar objeto literal com métodos assíncronos. Portar endpoints, includes, filtros e paginação usando `clearQueryParams()`/`setQueryParam()`. **Depende de:** RNM-204, RNM-301 e RNM-300. **Resultado:** não há classe, herança, Axios/mappers concretos instanciados internamente, default export ou query dinâmica concatenada manualmente.
- [ ] **RNM-304 — Implementar services de checkout e marketing.** Criar `YampiCheckoutService` e `YampiMarketingService` com o mesmo padrão de factory funcional, interface do Core com alias `I*`, `RestClient` e interfaces de mappers injetados, e objeto literal retornado. Portar pedidos, pagamentos, parcelas, checkout link, banners e leads. **Depende de:** RNM-204, RNM-302 e RNM-300. **Resultado:** contratos completos compilam e nenhum service contém estado de UI, dependência direta de Axios ou instanciação oculta de mapper concreto.
- [ ] **RNM-305 — Implementar storage novo.** AsyncStorage para carrinho e SecureStore para CPF/CNPJ, incluindo versões de schema e recuperação de dados inválidos. Não ler, converter ou migrar valores persistidos pelo Flutter. **Depende de:** RNM-205. **Resultado:** a instalação React Native começa com storage próprio; hidratação, remoção e recuperação são verificadas nos testes dos hooks de widget que usam esses dados.
- [ ] **RNM-306 — Implementar conectividade e links.** NetInfo, Linking, WhatsApp com fallback, telefone e e-mail. **Depende de:** RNM-205. **Resultado:** cleanup de listeners e fallbacks são verificados pelos testes dos hooks de widgets consumidores.
- [ ] **RNM-307 — Criar contratos Http e Controller.** Definir `HttpSchema`, `Http<Schema>` com `getBody`, `getRouteParams`, `getQueryParams`, `pass` e `send`, e `Controller<Schema>` em `src/core/shared/interfaces/`, além das estruturas de domínio necessárias para parâmetros de rota. **Depende de:** RNM-200. **Resultado:** controllers não dependem de Expo Router, Zod, Axios ou Yampi.
- [ ] **RNM-308 — Implementar ExpoHttp e Route.** Criar `ExpoHttp` e `Route` como factories `const` em `src/rest/expo/`. `ExpoHttp` deve inspecionar as chaves do schema Zod, ler somente body/query/route params declarados, retornar `Promise<Http<ExpoSchema> & ExpoHttp>` e implementar getters, `pass`, `send` e `sendResponse`. `Route` deve traduzir `ZodError` e erros de domínio, tratar `xPass` e produzir logs sanitizados. **Depende de:** RNM-307 e RNM-003. **Resultado:** adapters compilam e centralizam toda a fronteira HTTP das API Routes.
- [ ] **RNM-309 — Implementar controllers.** Criar um controller funcional em `src/rest/controllers/` para cada operação de catálogo, checkout, marketing e pedidos. Receber somente interfaces do Core, usar `Http<Schema>`, lançar erros de domínio e retornar `http.send()`. **Depende de:** RNM-303, RNM-304 e RNM-307. **Resultado:** controllers não importam implementações Expo, Zod, Axios ou mappers Yampi.
- [ ] **RNM-310 — Implementar Expo API Routes.** Criar arquivos `src/app/api/**/*+api.ts` com schema Zod, `Route`, `ExpoHttp`, composição de mapper/service/controller e `http.sendResponse`. **Depende de:** RNM-308 e RNM-309. **Resultado:** todos os endpoints do aplicativo passam pelo BFF e nenhum arquivo `+api.ts` contém regra de negócio.
- [ ] **RNM-311 — Implementar services Expo cliente.** Criar `ExpoCatalogService`, `ExpoCheckoutService` e `ExpoMarketingService` em `src/rest/expo/services/`, seguindo o padrão funcional e chamando somente `/api/*` com a origem pública do BFF. **Depende de:** RNM-204, RNM-300 e RNM-310. **Resultado:** o bundle cliente não importa `rest/yampi`, controllers ou providers de segredo.
- [ ] **RNM-312 — Criar o RestContext.** Compor `ExpoCatalogService`, `ExpoCheckoutService` e `ExpoMarketingService` em `src/ui/shared/contexts/rest-context/` por meio de `RestContext`, `RestContextProvider` e `useRestContext`. **Depende de:** RNM-311 e RNM-306. **Resultado:** hooks de UI consomem somente a API `/api/*` e nenhum código Yampi entra na árvore cliente.

### Fase 4 — Design system, stores e shell

- [ ] **RNM-400 — Extrair tokens visuais.** Catalogar cores, radius, spacing, tipografia, sombras e breakpoints a partir do Flutter e das screenshots. **Depende de:** RNM-000 e RNM-103. **Resultado:** tema NativeWind cobre estados claro, muted, primary, destructive e success.
- [ ] **RNM-401 — Criar componentes compartilhados.** AppText, AppHeader, AppSearchBar, QuantityInput, Price, ErrorState, EmptyState, Skeleton e image fallback dentro de `src/ui/shared/widgets/`. Cada pasta terá `index.tsx`, hook quando necessário e uma subpasta `tests/` com os testes da View e do hook. **Depende de:** RNM-104 e RNM-400. **Resultado:** componentes são acessíveis e têm testes isolados dentro da própria pasta do widget.
- [ ] **RNM-402 — Criar stores compartilhados.** Implementar `CartStore` com Zustand em `src/ui/checkout/stores/cart-store.ts`, incluindo hidratação, ações e seletores derivados; portar o `CatalogStore` para `src/ui/catalog/stores/`. **Depende de:** RNM-202, RNM-206 e RNM-305. **Resultado:** stores compilam e seus comportamentos visíveis são verificados pelos testes dos hooks de widgets consumidores.
- [ ] **RNM-403 — Implementar árvore visual do Expo Router.** Root Stack, Drawer customizado, Tabs e Stack do catálogo conforme o mapeamento. Os arquivos de rota visual somente importarão e retornarão widgets de `src/ui`; cada rota será uma arrow function atribuída a `const` e usará default export apenas por exigência do Expo Router. **Depende de:** RNM-105 e RNM-401. **Resultado:** rotas visuais não contêm UI/regra de negócio, não usam `export default function` e coexistem com `src/app/api/`.
- [ ] **RNM-404 — Implementar tab bar.** Quatro abas, Lucide icons, estados visuais, badge do carrinho e preservação de estado. **Depende de:** RNM-402 e RNM-403. **Resultado:** trocar de aba não reinicia lista/formulário.
- [ ] **RNM-405 — Implementar Drawer.** Cabeçalho, contatos, links institucionais, fechamento antes da ação e fallback de WhatsApp. **Depende de:** RNM-306 e RNM-403. **Resultado:** todos os links funcionam e são acessíveis.
- [ ] **RNM-406 — Implementar guard de conectividade.** Redirecionar para Offline fora do splash, evitar loops e retornar à Home quando a conexão voltar. **Depende de:** RNM-306 e RNM-403. **Resultado:** transições online/offline são validadas manualmente e pelos testes do hook da tela Offline.

### Fase 5 — Migração das experiências

- [ ] **RNM-500 — Splash e Offline.** Migrar splash nativo, tela visual, timer com cleanup, animação Lottie, retry e estados de reconexão. **Depende de:** RNM-401, RNM-403 e RNM-406. **Resultado:** inicialização e reconexão replicam o Flutter sem timer/listener órfão.
- [ ] **RNM-501 — Institucional.** Migrar scaffold e quatro páginas, mantendo conteúdo em português e ações externas. **Depende de:** RNM-401 e RNM-405. **Resultado:** conteúdo e navegação possuem paridade visual e textual.
- [ ] **RNM-502 — Catálogo: hooks e filtros.** Substituir os Presenters por hooks colocalizados nos widgets e implementar busca, filtros, paginação, cancelamento, refresh e estados consumindo `RestContext`. **Depende de:** RNM-312 e RNM-402. **Resultado:** testes colocalizados cobrem mudança rápida de filtro, fim de página e retry sem importar Yampi.
- [ ] **RNM-503 — Catálogo: UI.** Migrar lista, cards, skeletons, filtros, modais, imagens, desconto, preço e compra rápida. **Depende de:** RNM-401, RNM-502 e RNM-402. **Resultado:** fluxo do catálogo possui paridade funcional e visual.
- [ ] **RNM-504 — Produto: hooks.** Substituir Presenters por hooks colocalizados e implementar cache inicial, revalidação, SKU, variação, estoque, quantidade, carrinho, parcelas, similares e contador por meio do `RestContext`. **Depende de:** RNM-312 e RNM-402. **Resultado:** regras do PDP passam em Jest sem renderização ou import de Yampi.
- [ ] **RNM-505 — Produto: UI.** Migrar header, zoom, preço, seletor, quantidade, CTA, timer, descrição, especificações, similares e modal de parcelas com Reanimated. **Depende de:** RNM-401 e RNM-504. **Resultado:** PDP corresponde aos requisitos marcados como concluídos no PRD atual.
- [ ] **RNM-506 — Carrinho.** Migrar hidratação, enriquecimento, cards, quantidades, remoção, skeleton, vazio, erro, resumo e checkout externo por meio do BFF. **Depende de:** RNM-312, RNM-402 e RNM-401. **Resultado:** fechar/reabrir mantém itens e checkout usa pares token/quantidade corretos sem expor credenciais.
- [ ] **RNM-507 — Home e marketing.** Migrar busca, banners, coleções, interleaving, produtos, leads, pagamentos e rodapé consumindo o `RestContext`. **Depende de:** RNM-312, RNM-401 e RNM-503. **Resultado:** seções carregam independentemente e falhas parciais não derrubam a Home.
- [ ] **RNM-508 — Pedidos.** Migrar seleção CPF/CNPJ, máscara, validação, busca, persistência local, alteração do documento, estados e accordions completos por meio do BFF. Preservar deliberadamente a regra atual de acesso: conhecer e informar o CPF/CNPJ correto é suficiente para consultar os pedidos correspondentes. **Depende de:** RNM-312, RNM-305 e RNM-401. **Resultado:** o fluxo mantém a mesma regra de consulta do aplicativo atual, sem autenticação adicional.

### Fase 6 — Testes, acessibilidade e paridade

- [ ] **RNM-600 — Migrar os testes de Views.** Para cada View Flutter, criar `tests/<nome-do-widget>.test.tsx` na pasta do widget correspondente ou registrar por que a View deixou de existir. **Depende de:** RNM-500 a RNM-508. **Resultado:** toda View React Native possui teste de renderização, estados e interações visíveis dentro da subpasta `tests/` do widget.
- [ ] **RNM-601 — Criar testes dos hooks de widgets.** Para cada Presenter convertido, criar `tests/use-<nome-do-widget>.test.tsx` dentro da pasta do widget. Não criar testes diretos para Axios, Core, providers, contexts, stores, mappers, services, controllers, adapters Expo ou arquivos do Expo Router nesta etapa. **Depende de:** RNM-600. **Resultado:** cada hook originado de Presenter possui cobertura comportamental dentro da subpasta `tests/` do widget.
- [ ] **RNM-602 — Validar rotas manualmente.** Verificar deep links, segmentos dinâmicos, tabs, Drawer, back, offline e os endpoints `+api.ts` em builds de desenvolvimento/release. Maestro pode ser usado apenas para visualizar o estado final de uma tela, não para executar ou registrar esse teste. **Depende de:** RNM-403, RNM-310 e RNM-600. **Resultado:** rotas e integrações visíveis funcionam sem adicionar testes diretos em `src/app/`.
- [ ] **RNM-603 — Auditoria de acessibilidade.** Labels, roles, ordem de foco, targets de toque, escala de fonte, contraste e reduced motion. **Depende de:** RNM-500 a RNM-508. **Resultado:** fluxos críticos funcionam com TalkBack e VoiceOver.
- [ ] **RNM-604 — Auditoria de performance.** Medir startup, scroll do catálogo, imagens, renders, memória, animações e rede em build release. **Depende de:** RNM-600. **Resultado:** sem frames visivelmente perdidos e sem regressão material frente ao baseline.
- [ ] **RNM-605 — Revisar paridade visual com Maestro MCP.** Usar o MCP para abrir e visualizar cada tela implementada em Android e iOS, comparando-a manualmente com as referências da Fase 0. Não criar flows, asserções de screenshot, thresholds ou testes Maestro. Validar Expo Web separadamente nas larguras previstas. **Depende de:** RNM-109 e RNM-603. **Resultado:** diferenças visuais são revisadas e aprovadas por plataforma, resolução, tema e estado.
- [ ] **RNM-606 — Teste ponta a ponta manual.** Verificar Home -> busca -> filtro -> produto -> SKU -> carrinho -> checkout e Pedidos -> CPF/CNPJ -> accordion -> alteração de documento. Maestro não fará parte da automação desse teste. **Depende de:** RNM-600 a RNM-605. **Resultado:** checklist aprovado em Android e iOS release.

### Fase 7 — CI, publicação e cutover

- [ ] **RNM-700 — Integrar CI.** Executar install imutável, `npm run codecheck`, `npm run typecheck`, `npm run test`, `npm run test:coverage`, Expo Doctor e export server/web. Não instalar nem executar Maestro ou Flutter no CI React Native. Manter o pipeline Flutter existente inalterado até o cutover. **Depende de:** RNM-108 e RNM-601. **Resultado:** PR não pode integrar com validação falha e as fronteiras cliente/servidor são verificadas.
- [ ] **RNM-701 — Configurar EAS Hosting e builds Expo.** Criar perfis development, preview e production; configurar signing, identificadores, variáveis server-side, deploy das API Routes e origem HTTPS estável do BFF no app nativo. **Depende de:** RNM-003, RNM-310 e RNM-700. **Resultado:** builds instaláveis acessam o BFF implantado sem segredos no bundle.
- [ ] **RNM-702 — Distribuição interna.** Publicar preview para QA/stakeholders, executar o checklist acordado e corrigir bloqueadores. **Depende de:** RNM-606 e RNM-701. **Resultado:** aceite formal para produção.
- [ ] **RNM-703 — Preparar rollout.** Definir versão, notas, suporte, percentual de rollout e critérios objetivos de rollback. **Depende de:** RNM-702. **Resultado:** plano operacional aprovado.
- [ ] **RNM-704 — Publicar React Native.** Fazer rollout gradual na mesma listagem existente nas lojas, preservando identificadores e assinatura. **Depende de:** RNM-703. **Resultado:** versão React Native publicada como atualização do aplicativo Sertton.
- [ ] **RNM-705 — Desativar Flutter.** Somente após a janela de estabilidade, remover Flutter do pipeline de release e arquivar instruções. A remoção do código deve ser um PR separado e reversível. **Depende de:** RNM-704. **Resultado:** React Native é a única implementação ativa, sem perda de histórico.
- [ ] **RNM-706 — Atualizar documentação.** Atualizar `README.md`, `documentation/overview.md`, `documentation/architecture.md`, regras de código/UI/testes e runbooks. **Depende de:** RNM-704. **Resultado:** documentação descreve o sistema em produção, não o Flutter legado.

## 8. Execução com goals

### 8.1. Regras gerais

Este plano deve ser executado com um goal por fase. Não criar um único goal para toda a migração.

- Manter somente um goal ativo por vez e iniciar a fase seguinte apenas depois que a anterior estiver concluída.
- Usar este documento como fonte de verdade; o texto do goal identifica o intervalo RNM, mas não substitui os detalhes, dependências e resultados de cada tarefa.
- Antes de alterar `sertton-react-native-app/`, ler o `AGENTS.md` aplicável e consultar a documentação exata do Expo SDK 57 quando a tarefa envolver APIs ou configuração Expo.
- Não executar, compilar ou modificar o aplicativo Flutter. Consultá-lo somente por leitura de código, testes, assets e screenshots existentes.
- Não criar testes, flows, scripts ou arquivos Maestro. Maestro MCP serve somente para visualizar interativamente as telas.
- Não adicionar migração de dados locais, autenticação adicional para consulta de pedidos, observabilidade ou política própria de imagens.
- Preservar `br.com.sertton.sertton` no Android e iOS, além da assinatura e da listagem existente nas lojas.
- Preservar alterações preexistentes do usuário e não modificar arquivos fora do escopo da fase.
- Não definir orçamento de tokens no goal, exceto quando solicitado explicitamente pelo usuário.
- Não concluir um goal enquanto alguma tarefa do intervalo estiver pendente ou sem o resultado observável definido na Fase correspondente.

Ao terminar cada goal:

1. executar as validações da fase;
2. atualizar os checkboxes RNM realmente concluídos;
3. registrar arquivos alterados, comandos executados e resultados;
4. registrar pendências ou decisões sem ocultá-las como concluídas;
5. marcar o goal como completo somente quando nenhum trabalho obrigatório da fase permanecer.

### 8.2. Goal da Fase 0 — Referência e decisões

**Escopo:** RNM-000 a RNM-005.

**Objetivo copiável:**

```text
Executar a Fase 0 do plano em documentation/react-native-migration-plan.md, concluindo RNM-000 a RNM-005. Construir a referência exclusivamente por inspeção estática do código, testes, assets e screenshots existentes, sem executar ou modificar o Flutter. Consolidar matriz de paridade, plataformas, credenciais Yampi server-side, fixtures sanitizadas e política de divergências. Respeitar todas as regras da seção “Execução com goals” e concluir somente quando cada resultado observável da fase estiver registrado.
```

**Validação para encerramento:** matriz de paridade rastreável; decisões RNM-001 a RNM-005 documentadas; screenshots de Pedidos classificadas como sensíveis; nenhuma execução ou alteração Flutter.

### 8.3. Goal da Fase 1 — Scaffold e toolchain

**Escopo:** RNM-100 a RNM-109.

**Objetivo copiável:**

```text
Executar a Fase 1 do plano em documentation/react-native-migration-plan.md, concluindo RNM-100 a RNM-109 dentro de sertton-react-native-app/. Consolidar o scaffold Expo SDK 57, remover o conteúdo demonstrativo e as dependências diretas proibidas, configurar Expo Router com src/app e API Routes server-side, TypeScript estrito, Biome, NativeWind, React Native Reusables, Reanimated, Jest e scripts npm. Preservar os identificadores br.com.sertton.sertton e configurar Maestro MCP somente fora do repositório para visualização interativa. Não executar ou modificar Flutter e não criar testes/flows Maestro. Concluir somente quando todos os resultados observáveis e validações da fase passarem.
```

**Validação para encerramento:** instalação imutável; `npm run codecheck`; `npm run typecheck`; `npm run test`; `npm run doctor`; API Route smoke; Android, iOS e web iniciam conforme o ambiente disponível; nenhuma dependência direta/import de `@expo/ui`, `expo-glass-effect` ou `expo-symbols`.

### 8.4. Goal da Fase 2 — Core TypeScript

**Escopo:** RNM-200 a RNM-207.

**Objetivo copiável:**

```text
Executar a Fase 2 do plano em documentation/react-native-migration-plan.md, concluindo RNM-200 a RNM-207 dentro de sertton-react-native-app/. Implementar RestResponse, erros, constantes, entidades, estruturas, contratos de services/providers/RestClient/mappers e regras puras conforme a arquitetura Core, sem dependências React, Expo, Axios ou Yampi. Respeitar os padrões funcionais, exports nomeados, kebab-case e todas as regras da seção “Execução com goals”. Não adicionar testes diretos fora do escopo de widgets definido pelo plano. Concluir somente quando cada contrato e resultado observável da fase estiver compilando.
```

**Validação para encerramento:** `npm run codecheck` e `npm run typecheck`; Core sem imports de infraestrutura/UI; inventário RNM-200 a RNM-207 conferido com o Flutter por leitura estática.

### 8.5. Goal da Fase 3 — REST, BFF e providers

**Escopo:** RNM-300 a RNM-312.

**Objetivo copiável:**

```text
Executar a Fase 3 do plano em documentation/react-native-migration-plan.md, concluindo RNM-300 a RNM-312 dentro de sertton-react-native-app/. Implementar Axios, mappers e services Yampi funcionais, providers, contratos Http/Controller, ExpoHttp, Route, controllers, Expo API Routes, services Expo cliente e RestContext. Manter credenciais Yampi exclusivamente server-side e impedir imports de rest/yampi no bundle cliente. Preservar a consulta de pedidos por CPF/CNPJ sem autenticação adicional e iniciar storage React Native novo, sem migrar dados Flutter. Não criar testes diretos para essas camadas. Respeitar todas as regras da seção “Execução com goals” e concluir somente quando os resultados observáveis da fase estiverem atendidos.
```

**Validação para encerramento:** `npm run codecheck` e `npm run typecheck`; Expo API Routes smoke; inspeção do bundle/fronteiras sem segredo ou import Yampi no cliente; endpoints e composição conferidos contra fixtures sanitizadas.

### 8.6. Goal da Fase 4 — Design system, stores e navegação

**Escopo:** RNM-400 a RNM-406.

**Objetivo copiável:**

```text
Executar a Fase 4 do plano em documentation/react-native-migration-plan.md, concluindo RNM-400 a RNM-406 dentro de sertton-react-native-app/. Implementar tokens, componentes compartilhados, CartStore Zustand, árvore Expo Router, tab bar, Drawer e guard de conectividade. Rotas visuais devem apenas retornar widgets de src/ui; funções JSX devem ser const arrow functions e default export fica restrito às rotas visuais. Criar somente os testes Jest de View e hook previstos nas pastas dos widgets. Usar Maestro MCP apenas para visualizar o resultado das telas, sem gerar arquivos ou testes. Concluir somente quando todos os resultados observáveis da fase estiverem aprovados.
```

**Validação para encerramento:** `npm run codecheck`; `npm run typecheck`; `npm run test`; navegação validada manualmente; componentes principais visualizados com Maestro contra `documentation/screenshots/flutter/`.

### 8.7. Goal da Fase 5 — Experiências do aplicativo

**Escopo:** RNM-500 a RNM-508.

**Objetivo copiável:**

```text
Executar a Fase 5 do plano em documentation/react-native-migration-plan.md, concluindo RNM-500 a RNM-508 dentro de sertton-react-native-app/. Migrar Splash, Offline, institucional, catálogo, produto, carrinho, Home, marketing e pedidos com paridade funcional e visual. Substituir Presenters por hooks colocalizados e Views por index.tsx, criando para cada widget os testes Jest de hook e View na subpasta tests. Não executar Flutter; usar código e screenshots existentes como referência. Manter pedidos consultáveis por CPF/CNPJ correto, sem autenticação adicional, e não migrar storage Flutter. Usar Maestro somente para visualizar telas. Concluir somente quando todos os estados e resultados observáveis da fase estiverem implementados e validados.
```

**Validação para encerramento:** `npm run codecheck`; `npm run typecheck`; `npm run test`; fluxos funcionais revisados manualmente; telas e estados visualizados com Maestro; nenhuma divergência silenciosa em relação à matriz.

### 8.8. Goal da Fase 6 — Testes, acessibilidade e paridade

**Escopo:** RNM-600 a RNM-606.

**Objetivo copiável:**

```text
Executar a Fase 6 do plano em documentation/react-native-migration-plan.md, concluindo RNM-600 a RNM-606 dentro de sertton-react-native-app/. Finalizar a rastreabilidade dos testes Jest de Views e hooks, validar rotas manualmente, auditar acessibilidade e performance, revisar paridade visual e executar os checklists ponta a ponta em builds apropriados. Maestro MCP deve ser usado exclusivamente para visualizar as telas e comparar manualmente sua aparência; não criar flows, YAML, asserções, scripts ou jobs Maestro. Respeitar todas as regras da seção “Execução com goals” e concluir somente quando as evidências e resultados observáveis da fase estiverem aprovados.
```

**Validação para encerramento:** `npm run codecheck`; `npm run typecheck`; `npm run test`; `npm run test:coverage`; `npm run doctor`; checklists manuais de Android/iOS; auditorias e diferenças visuais documentadas.

### 8.9. Goal da Fase 7 — CI, publicação e cutover

**Escopo:** RNM-700 a RNM-706.

**Objetivo copiável:**

```text
Executar a Fase 7 do plano em documentation/react-native-migration-plan.md, concluindo RNM-700 a RNM-706 dentro do escopo e das autorizações disponíveis. Configurar CI React Native sem executar Flutter ou Maestro, EAS Hosting, builds, distribuição interna, rollout e documentação. Publicar como atualização do mesmo aplicativo, preservando br.com.sertton.sertton, assinatura e listagem das lojas, com versão superior à Flutter 1.0.15. Não publicar, alterar lojas, rotacionar credenciais ou desativar Flutter sem a autoridade externa necessária. Respeitar todas as regras da seção “Execução com goals” e marcar o goal como completo somente depois que publicação, janela de estabilidade e documentação final tiverem sido realmente concluídas.
```

**Validação para encerramento:** CI verde; builds assinados; BFF implantado; preview aceito; rollout concluído; critérios de rollback registrados; documentação atualizada. Se faltar autorização, assinatura, credencial ou aceite externo, manter as tarefas correspondentes pendentes e reportar a dependência.

## 9. Estratégia de testes

### 9.1. Escopo inicial

- **View:** cada `index.tsx` terá um `tests/<nome-do-widget>.test.tsx` com renderização, estados visuais e interações via Testing Library.
- **Hook:** cada `use-<nome-do-widget>.ts` originado de Presenter terá um `tests/use-<nome-do-widget>.test.tsx` com suas transições de estado e chamadas de dependências mockadas.
- **Fora do escopo automatizado inicial:** Axios, Core, providers, contexts, stores, mappers, services, controllers, adapters Expo, arquivos do Expo Router e testes de contrato.
- **Validação manual:** rotas, checkout externo, schemes, conectividade, armazenamento seguro e integração real com Yampi/BFF.

### 9.2. Estratégia para testes dos hooks

O teste do hook é responsável por validar lógica de apresentação, estado e efeitos. Ele não deve renderizar nem inspecionar a View.

- Usar `renderHook` de `@testing-library/react-native` e aguardar `renderHook`, `rerender` e `unmount` quando a versão instalada expuser essas APIs de forma assíncrona.
- Criar um `wrapper` de teste quando o hook depender de `RestContext`, tema ou outro provider React.
- Mockar os contratos consumidos pelo hook, como `CatalogService` e `CheckoutService`, sem mockar ou instanciar diretamente Axios.
- Preparar o estado Zustand necessário antes de cada teste e restaurá-lo no `afterEach`, evitando vazamento entre casos.
- Testar estado inicial, loading, sucesso, vazio, falha, retry e regras de borda aplicáveis ao widget.
- Testar cada ação pública retornada pelo hook e verificar as chamadas feitas aos contratos mockados.
- Usar `act` para ações que alteram estado e `findBy*`/`waitFor` somente quando houver atualização assíncrona real.
- Usar fake timers apenas em hooks com timer, debounce ou contador; sempre restaurar timers reais depois do teste.
- Validar cleanup com `unmount` quando o hook registrar listener, timer, subscription ou requisição cancelável.
- Usar `rerender` para validar mudança de props sem remontar o hook.
- Não testar detalhes privados, nomes de estados internos ou a implementação do Axios/store; testar apenas o contrato público retornado pelo hook.

Casos mínimos para cada hook:

1. deve expor o estado inicial esperado;
2. deve executar o fluxo de sucesso;
3. deve expor e recuperar-se do estado de erro;
4. deve delegar ações às dependências corretas;
5. deve liberar efeitos no unmount, quando aplicável.

### 9.3. Estratégia para testes das Views

O teste da View é responsável por validar o que o usuário percebe e faz. A lógica do hook deve ser substituída por um mock controlado.

- Mockar `use-<nome-do-widget>` e fornecer retornos explícitos para cada estado da View.
- Não montar `RestContext`, services reais, Axios ou stores reais no teste da View quando o hook já encapsular essas dependências.
- Usar `render`, `screen` e `userEvent` de `@testing-library/react-native`.
- Priorizar `getByRole` com nome acessível; usar `getByText` para conteúdo não interativo.
- Usar `findBy*` para elementos que aparecem de forma assíncrona e `queryBy*` somente para verificar ausência.
- Verificar loading, conteúdo, vazio, erro, disabled e demais estados visuais expostos pelo contrato do hook.
- Verificar que interações do usuário chamam as ações fornecidas pelo hook com os argumentos corretos.
- Verificar labels, roles e estados acessíveis como parte do teste da View.
- Evitar snapshots extensos, `testID` quando houver query semântica e asserções sobre componentes internos de bibliotecas.
- Não repetir no teste da View cálculos, paginação, transformação de dados ou regras já cobertas no teste do hook.

Casos mínimos para cada View:

1. deve renderizar o estado principal;
2. deve renderizar loading, vazio e erro quando aplicável;
3. deve delegar a interação principal ao hook;
4. deve bloquear ações indisponíveis;
5. deve expor nomes e roles acessíveis para controles interativos.

### 9.4. Configuração Jest

- preset `jest-expo`;
- setup oficial compatível com a versão do Reanimated instalada;
- fake timers para splash, debounce e contador;
- mocks determinísticos de NetInfo, Linking, AsyncStorage, SecureStore e imagens;
- `<nome-do-widget>.test.tsx` dentro da subpasta `tests/` do widget;
- `use-<nome-do-widget>.test.tsx` dentro da mesma subpasta `tests/`;
- Jest configurado para não coletar testes ou coverage fora de `src/ui/**/widgets/**/tests/*.test.tsx` nesta etapa;
- nenhum teste dentro de `src/app/` ou em uma pasta centralizada fora de `src/`;
- descrições no padrão `should [expected behavior] when [scenario]`;
- fakers/fixtures equivalentes aos atuais, sem dados reais de clientes.

### 9.5. Estratégia de validação visual com Maestro MCP

O Maestro será uma ferramenta exclusivamente visual. Jest continuará sendo a única ferramenta automatizada de testes prevista para o código nesta etapa.

- Configurar o servidor MCP no ambiente do desenvolvedor, fora do repositório.
- Usar o MCP somente para iniciar/abrir o aplicativo, navegar interativamente quando necessário e visualizar o resultado final das telas.
- Comparar manualmente a tela exibida com `documentation/screenshots/flutter/<plataforma>/<tela>/`.
- Revisar os estados principal, loading, vazio, erro e modal/overlay quando aplicáveis.
- Não criar `.maestro/`, YAML, flows, subflows, `testID` específico para Maestro, asserções, thresholds, scripts npm, testes ou jobs de CI.
- Não usar `run_flow`, `run_flow_files`, `assertScreenshot` ou recursos de análise automática.
- O resultado esperado é uma revisão humana da fidelidade visual, sem transformar o Maestro em parte da suíte de testes.

## 10. Validação contínua

Após cada tarefa de código:

```bash
npm run codecheck
npm run typecheck
npm run test
```

Nos gates de fase:

```bash
npm run test:coverage
npm run doctor
npx expo export --platform web
```

Antes do cutover, também são obrigatórios builds release de Android e iOS em dispositivos reais e revisão visual das telas com auxílio do Maestro MCP. O uso de Expo Go é aceitável durante desenvolvimento inicial, mas não substitui testes do artefato de produção.

## 11. Riscos e mitigação

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Segredo Yampi no bundle | Crítico | Expo API Routes, fronteira client/server e bloqueio de produção em RNM-003 |
| Diferença entre documentação e app | Alto | Baseline executável e matriz de paridade na Fase 0 |
| AsyncStorage hidrata depois do primeiro render | Alto | Gate de hidratação e estado explícito antes de totais/checkout |
| Objetos não serializáveis em rota | Médio | Somente IDs na URL e cache de produto no provider |
| Mudança de filtros gera resposta fora de ordem | Alto | AbortController e token de requisição atual |
| Versões incompatíveis de NativeWind/Reusables/Reanimated | Alto | Matriz de versões, Expo Doctor e lockfile na Fase 1 |
| Divergência visual entre plataformas | Médio | Tokens compartilhados, baseline controlado e validação por Maestro MCP em dispositivos fixos |
| Regressão no checkout externo | Crítico | Testes do hook consumidor e validação em dispositivo real |
| Armazenamento de CPF/CNPJ em texto simples | Alto | SecureStore, logs sanitizados e limpeza no logout |
| Remoção prematura do Flutter | Alto | Coexistência, rollout gradual e PR separado de desativação |

## 12. Critérios de conclusão

A migração estará concluída apenas quando:

- o código React Native estiver integralmente dentro de `sertton-react-native-app/`;
- todas as funções JSX forem arrow functions atribuídas a `const`, com default export restrito às rotas visuais obrigatórias em `src/app/`;
- Android e iOS release passarem pela matriz funcional, visual e de acessibilidade;
- Expo Web passar nas funcionalidades classificadas como suportadas;
- nenhum segredo de servidor estiver presente no bundle;
- as rotas, estados e fluxos do inventário tiverem paridade aprovada;
- as Views Flutter estiverem rastreadas para `tests/<nome-do-widget>.test.tsx` e os Presenters para `tests/use-<nome-do-widget>.test.tsx`;
- as telas tiverem sido visualizadas com auxílio do Maestro MCP e sua fidelidade estiver aprovada em Android e iOS;
- `npm run codecheck`, `npm run typecheck`, `npm run test`, `npm run test:coverage`, Expo Doctor e builds estiverem verdes no CI;
- checkout, catálogo, leads e pedidos tiverem sido validados contra ambiente real autorizado;
- o rollout e os critérios de rollback estiverem documentados;
- a documentação principal refletir a arquitetura React Native;
- a desativação do Flutter ocorrer somente após a janela de estabilidade aprovada.

## 13. Referências técnicas

- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Expo Router API Routes](https://docs.expo.dev/router/web/api-routes/)
- [Variáveis de ambiente no EAS](https://docs.expo.dev/eas/environment-variables/usage/)
- [EAS Hosting](https://docs.expo.dev/eas/hosting/get-started/)
- [Testes com Expo e Jest](https://docs.expo.dev/develop/unit-testing/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/docs/start/quick-start)
- [Maestro MCP Server](https://docs.maestro.dev/getting-started/maestro-mcp)
- [Biome](https://biomejs.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [React Native Reusables](https://reactnativereusables.com/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native)
