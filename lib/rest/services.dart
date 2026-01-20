import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/drivers/env-driver/index.dart';
import 'package:sertton/rest/rest_client.dart';
import 'package:sertton/rest/yampi/services/yampi_catalog_service.dart';

final catalogServiceProvider = Provider<CatalogService>((ref) {
  final restClient = ref.read(restClientProvider);
  final envDriver = ref.read(envDriverProvider);
  return YampiCatalogService(restClient, envDriver);
});
