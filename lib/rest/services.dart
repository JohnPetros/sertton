import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/drivers/dot_env_driver.dart';
import 'package:sertton/rest/dio/dio_rest_client.dart';
import 'package:sertton/rest/yampi/services/yampi_catalog_service.dart';

final catalogServiceProvider = Provider<CatalogService>((ref) {
  final restClient = ref.read(restClientProvider);
  final envDriver = ref.read(envDriverProvider);
  return YampiCatalogService(restClient, envDriver);
});
