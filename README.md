<h1 align="center">
  Sertton 🚚
</h1>

<div align="center">
   <a href="https://github.com/JohnPetros">
      <img alt="Made by JohnPetros" src="https://img.shields.io/badge/made%20by-JohnPetros-blueviolet">
   </a>
   <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/JohnPetros/sertton">
   <a href="https://github.com/JohnPetros/sertton/commits/main">
      <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/JohnPetros/sertton">
   </a>
  </a>
   </a>
   <a href="https://github.com/JohnPetros/sertton/blob/main/LICENSE.md">
      <img alt="GitHub License" src="https://img.shields.io/github/license/JohnPetros/sertton">
   </a>
    <img alt="Stargazers" src="https://img.shields.io/github/stars/JohnPetros/sertton?style=social">
</div>
<br>

## 🖥️ Sobre o Projeto

Sertton é um aplicativo e-commerce voltado para o nicho de peças de carroceria para veículos de transporte de grande porte.

Por ser um e-commerce, o usário pode procurar a peça desejada, adicionar ao carrinho e efetuar a compra por meio de um checkout externo ao aplicativo.

O objetivo da construção desse projeto é atender a demanda da empresa [Sertton Industrial](https://www.sertton.ind.br/) em potencializar suas vendas ao possuir uma maior presença online e facilitar a vida dos seus clientes que preferem utilizar um aplicativo mobile em vez de um site web.

O aplicativo consome via API Rest os dados da loja virtual da **Sertton Industrial** desenvolvida e mantida pela **[Yampi](https://www.yampi.com.br/?utm_source=google&utm_medium=cpc&utm_content=kw-institucional&utm_campaign=search-branded-lead&utm_term=yampi&gad_source=1&gclid=CjwKCAiAopuvBhBCEiwAm8jaMQgyKAUdUOQ1Cx1YwHcWhGp0g_R7CcS-XqyZG05fBjQIXhE5Vox5nRoCVqkQAvD_BwE)**, uma plataforma de e-commerce completa. 

### ⏹️ Demonstração

<table align="center">
  <tr>
    <td align="center" width="700" height="320">
      <span>Tela home<br/></span>
      <img src="documentation/images/home.jpeg" alt="Tela home" />
    </td>
    <td align="center" width="700" height="320">
      <span>Tela de lista de produtos<br/></span>
      <img src="documentation/images/products-list.jpeg" alt="Tela de lista de produtos" />
    </td>
     <td align="center" width="700" height="320">
      <span>Tela de detalhes de produto<br/></span>
      <img src="documentation/images/product-details.jpeg" alt="Tela de detalhes de produto" />
    </td>
  </tr>
  <tr>
    <td align="center" width="700" height="320">
      <span>Tela de carrinho<br/></span>
      <img src="documentation/images/cart.jpeg" alt="Tela de carrinho" />
    </td>
    <td align="center" width="700" height="320">
      <span>Tela de lista de pedidos<br/></span>
      <img src="documentation/images/orders-list.jpeg" alt="Tela de lista de pedidos" />
    </td>
  </tr>
</table>

---

## ✨ Funcionalidades

### ✅ Requisitos Funcionais

#### Listagem de produtos

- [x] Deve ser possível listar todos os produtos que possuem estoque maior que 0
- [x] Cada produto deve exibir:
  - nome
  - imagem
  - preço
  - código sku
  - marca
  - descrição
- [x] As exibição dos dados do produto deve se adaptar ao espaço que ele ocupa na tela
- [x] Deve ser possível dar zoom na imagem do produto
  
#### Seleção de SKU (Tipo de um produto)
- Deve ser possível selecionar um único SKU de um produto antes de adicioná-lo ao carrinho
-  A seleção do SKU deve ser com base nas variações disponíveis para o produto. Ex: Se o usuário escolher Material: Inox e Tamanho: Médio, seleciona o SKU que atende essas características
- Caso o produto não tenha variação, o SKU é o próprio produto em si.

#### Filtragem de produtos

- [x] Deve ser possível filtrar produtos por:
  - nome
  - categoria
    - o filtro deve conter apenas uma categoria
  - marca
    - o filtro pode conter mais de uma marca
- [x] Deve ser possível filtrar utilizando de forma simuntânea os filtros listado acima
- [x] Deve ser possível pesquisar um produto pelo nome em mais de uma tela

#### Ordenação de produtos

- [x] Deve ser possível ordenar produtos por ordem alfabética, seja o inverso (Z-A) ou não (A-Z)


#### Cálculo de Frete

- [x] Deve ser possível calcular cusot de frete de um produto com base no CEP do usuário
- [x] Deve ser possível o usuário calcular o frete antes de ir para o checkout
- [x] Deve ser exibido para o usuário uma tabela de preço para cada transportadora especifica
- [x] Deve ser exibido para o usuário uma tabela de preço para cada transportadora especifica

#### Carrinho

- [x] Deve haver uma tela própria para o carrinho
- [x] Deve ser possível inserir um produto no carrinho
- [x] Deve ser possível alterar a quantidade do produto que está no carrinho
- [x] Deve ser possível remover um produto no carrinho
- [x] Deve ser possível remover todos os produtos do carrinho de uma vez
- [x] Não deve ser posível inserir produtos repetidos no carrinho
- [x] Não deve ser possível alterar a quantidade maior que o estoque permitido
- [x] Não deve ser possível alterar a quantidade menor para menor que 1
- [x] Todos os produtos do carrinho devem ser removidos se o usuário for redirecionado para o checkout
- [x] Os produtos do carrinho devem ser persistidos de modo que o usuário possa acessá-los novamente mesmo que ele feche e abre o aplicativo novamente  
- [x] O produto no carrinho deve dizer a respeito a um do seus SKU, que por sua vez são definidos pelas variações escolhidas pelo usuário. Ex.: variações: material: Inox e tamanho: Médio definem o SKU que contém essas características 

#### Capturador de leads

- [x] Deve ser possível cadastrar o `e-mail` do cliente/lead na tela `Home`
- [x] Não deve ser possível inserir o `e-mail` de um cliente/lead já cadastrado

#### Contato

- [x] Deve ser possível o usuário entrar em contato com alguém da `Sertton` via whatsapp ou e-mail

#### Listagem de pedidos

- [x] Deve ser possível listar todos os pedidos do usuário
- [x] A lista de pedidos deve ser com base no CPF ou CNPJ utilizado para fazer o pedido
- [x] Cada pedido deve exibir:
  - número,
  - status (pago, aguardando pagamento ou cancelado),
  - produtos, onde cada produto exibe:
    - nome
  - total de desconto,
  - total a pagar (considerando o desconto)
  - tipo de pagamento (cartão de crédito, pix ou boleto), sendo que:
    - Se for por pix, permitir o usuário acessar o QR Code gerado pelo pedido
    - Se for por boleto, permitir o usuário acessar o pdf do boleto gerado pelo pedido
- [] Deve ser possível o usuário arquivar o pedido de forma que não seja possível mais acessá-lo no aplicativo

### ☑️ Requisitos não funcionais

#### Informações relevantes

- [x] Deve ser exibido ao usuário informações sobre a empresa Sertton, termos e condições, política de devolução de produto

#### Listagem paginada de produtos

- [x] Todos os produtos não devem ser carregados todos de uma vez mas conforme o usuário desce a tela para visualizar mais produtos

#### Banners

- [x] Devem ser exibidos banners que capturem a atenção do cliente

#### Coleções

- [x] Devem ser exibidos coleções de produtos que compartilham o mesmo tema ou categoria

#### Botão de carrinho

- [x] Deve ser possível adicionar um produto ao carrinho sem o usuário precisar ver a tela de detalhes desse produto
- [x] O botão de carrinho deve seguir as regras da funcionalidade de carrinho

---

## ⚙️ Arquitetura

### 🛠️ Tecnologias, ferramentas e serviços externos

Este projeto foi desenvolvido usando as seguintes tecnologias:

✔️ **[React Native](https://developer.mozilla.org/pt-BR/docs/Web/HTML)** para desevolvimento do applicativo mobile para ambas as plataformas [Android](https://www.android.com/intl/pt-BR_br/everyone/) e [IOS](https://www.apple.com/br/ios/ios-17/)

✔️ **[Tamagui](https://tamagui.dev/)** Para a estilização e utilização de componentes acessíveis

✔️ **[Expo](https://expo.dev/)** Para facilitar o processo de desenvolvimento em React Native

✔️ **[EAS](https://expo.dev/)** Para automatizar o processo de deploy

✔️ **[Zod](https://zod.dev/)** - para a implementação de validação de dados

✔️ **[Dayjs](https://day.js.org/)** - Para a manipulação de datas

✔️ **[MMKV](https://github.com/mrousavy/react-native-mmkv)** - Para a manipulação do local storage do dispositivo do usuário

✔️ **[Zustand](https://zustand-demo.pmnd.rs/)** - Para fazer o gerenciamento de estados complexos

✔️ **[Phosphor icons](https://www.typescriptlang.org/)** - Para exibição de ícones acessíveis

✔️ **[Yampi Api Rest](https://www.typescriptlang.org/)** - Para consumir os dados da loja virtual da **Setton Industrial** 

✔️ **[Yampi Checkout](https://www.typescriptlang.org/)** - Para viabilizar o processo de checkout do usuário do fora do aplicativo

> Para mais detalhes acerca das dependências do projeto, como versões específicas, veja o arquivo [package.json](https://github.com/JohnPetros/sertton/blob/main/package.json)

---

## 🚀 Como rodar a aplicação?

### 🔧 Pré-requisitos

Antes de baixar o projeto você necessecitará ter instalado na sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/en)
- [Expo](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/) (Eu usarei npm no tutorial)

> Além disto é bom ter um editor para trabalhar com o código, como o [VSCode](https://code.visualstudio.com/)

> Além disto é crucial configurar as variáveis de ambiente em um arquivo chamado `.env` antes de executar a aplicação. veja o arquivo [.env.example](https://github.com/JohnPetros/sertton/blob/main/.env.example) para ver quais variáveis devem ser configuradas

### 📟 Rodando a aplicação

```bash

# Clone este repositório
$ git clone https://github.com/JohnPetros/sertton.git

# Acesse a pasta do projeto
$ cd sertton

# Instale as dependências
$ npm install

# Gere o código nativo necessário para executar todas as dependências
$ npm build

# Execute a aplicação em modo de desenvolvimento
$ npm start

```

> Você irá precisar um emulador de android para ver o aplicativo funcionando. Porém você pode gerar o expo development build do projeto e executá-lo tanto no emulador quanto no seu dispositivo físico.

```bash

# Gere o development build do projeto
$ eas build --profile development --platform android
```

> Baixe a build gerado na plataforma do EAS no emulador ou no dispositivo seu dispositivo físico e execute npm start novamente

> Veja a [documentação](https://docs.expo.dev/develop/development-builds/create-a-build/) para mais detalhes a respeito do expo development build

### 🧪 Rodando os testes

```bash
# Execute os testes
$ npm run test
```

---

## 💪 Como contribuir

```bash

# Fork este repositório
$ git clone https://github.com/JohnPetros/sertton.git

# Cria uma branch com a sua feature
$ git checkout -b minha-feature

# Commit suas mudanças:
$ git commit -m 'feat: Minha feature'

# Push sua branch:
$ git push origin minha-feature

```

> Você deve substituir 'minha-feature' pelo nome da feature que você está adicionando

> Veja a [minha lista de emojis para cada tipo de commit](https://gist.github.com/JohnPetros/1f63f8cf07c719c5d2c5e011e2eac770) que eu estou utilizando para manter a consistência entre as mensagens de commit 

> Você também pode abrir um [nova issue](https://github.com/JohnPetros/sertton/issues) a respeito de algum problema, dúvida ou sugestão para o projeto. Ficarei feliz em poder ajudar, assim como melhorar este projeto

---

## 🎨 Layout

O design do projeto foi feita utilizando a ferramenta [Figma](https://www.figma.com/) que pode ser acessada por esse [link](https://www.figma.com/file/8DRd8OlhogKoCcofQD1QX4/Sertton-Industrial?type=design&t=pbdOp6tdnmj2kTmc-6).

---

## 📝 Licença

Esta aplicação está sob licença do MIT. Consulte o [Arquivo de licença](LICENSE) para obter mais detalhes sobre.

---

<p align="center">
  Feito com 💜 por John Petros 👋🏻
</p>
