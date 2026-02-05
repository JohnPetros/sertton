# Arquitetura do Projeto Sertton

## Visao Geral

O Sertton usa arquitetura em camadas inspirada em Clean Architecture para reduzir acoplamento e facilitar testes. E um app de e-commerce em Flutter/Dart integrado a plataforma Yampi.

## Camadas

- **UI (`lib/ui/`)**: Widgets, telas e presenters (MVP). Estado com Riverpod + Signals.
- **Core (`lib/core/`)**: DTOs, interfaces e tipos de resposta (ex.: `RestResponse`).
- **Rest (`lib/rest/`)**: Implementacoes HTTP e servicos externos (Dio + Yampi).
- **Drivers (`lib/drivers/`)**: Infraestrutura externa (ex.: `.env`).

## Modulos de Dominio

| Modulo | Foco | DTOs principais |
|--------|------|-----------------|
| **Catalog** | Produtos, SKUs, categorias, marcas | `ProductDto`, `SkuDto`, `VariationDto`, `CategoryDto`, `BrandDto`, `CollectionDto` |
| **Checkout** | Carrinho, cliente, descontos | `CartItemDto`, `CustomerDto`, `DiscountDto` |
| **Marketing** | Banners e leads | `BannerDto`, `LeadDto`, `ContactDto` |
| **Reviewing** | Avaliacoes | `CommentDto`, `AuthorDto` |

## Injecao de Dependencias

Riverpod centraliza a composicao de dependencias: providers para drivers, rest client, servicos e rotas.

## Fluxo de Dados (resumo)

UI (View) -> Presenter -> Provider -> Interface de Servico -> Implementacao Yampi -> RestClient (Dio) -> API externa.

## Padroes Principais

- **MVP** na UI para separar View e Presenter.
- **DTO** para contratos de dados entre camadas.
- **Adapter** para adaptar Dio ao `RestClient`.
- **Service/Mapper** para integrar Yampi e converter dados externos.

## Decisoes Arquiteturais

- Camadas garantem testabilidade e substituicao de implementacoes.
- Riverpod + Signals oferecem DI robusta e estado reativo granular.
- Yampi simplifica operacao de e-commerce via API REST.

## Armadilhas a Evitar

1. Logica de dominio fora do `core/`.
2. Chamar API diretamente na UI.
3. Dependencias circulares entre camadas.
4. Presenter fazendo requisicoes diretas.
5. DTOs mutaveis (prefira `final`).

## Estrutura de Diretorios (essencial)

```
lib/
├── core/
├── rest/
├── drivers/
└── ui/
```
