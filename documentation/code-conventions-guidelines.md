# Code Conventions & Guidelines

## Visão Geral
Este documento estabelece as convenções de código adotadas no projeto Sertton para garantir consistência, legibilidade e manutenibilidade.

## 1. Diretrizes de Linguagem
*   **Código:** Todo o código (nomes de variáveis, classes, funções, arquivos) deve ser escrito em **Inglês**.
*   **Documentação e UI:** Comentários, documentação (como este arquivo) e textos exibidos ao usuário final devem ser escritos em **Português**.

## 2. Qualidade de Código & Clean Code
*   **Responsabilidade Única:** Se uma função ou classe tiver muitas responsabilidades, divida-a em unidades menores e mais coesas.
*   **Legibilidade:** O código deve ser autoexplicativo. Evite abreviações obscuras.
*   **Dart & Flutter:** Siga as boas práticas oficiais descritas em [Effective Dart](https://dart.dev/guides/language/effective-dart).

## 3. Organização de Importações
As importações devem ser organizadas em blocos separados por uma linha em branco, seguindo rigorosamente a ordem das camadas da arquitetura:

1.  **Bibliotecas Externas e SDK** (`dart:*`, `package:flutter/*`, bibliotecas de terceiros)
2.  **Camada Core** (`package:sertton/core/*`)
3.  **Camada Rest** (`package:sertton/rest/*`)
4.  **Camada Drivers** (`package:sertton/drivers/*`)
5.  **Camada UI** (`package:sertton/ui/*`)

### Exemplo

```dart
// 1. Bibliotecas Externas
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals_flutter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

// 2. Camada Core
import 'package:sertton/core/catalog/dtos/product_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';

// 3. Camada Rest
import 'package:sertton/rest/dio/dio_rest_client.dart';

// 5. Camada UI
import 'package:sertton/ui/catalog/widgets/screens/catalog/products-list/product-card/product_card_presenter.dart';
```
