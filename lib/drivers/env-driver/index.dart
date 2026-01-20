import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/global/interfaces/env_driver.dart';
import 'package:sertton/drivers/env-driver/dot_env_driver.dart';

final envDriverProvider = Provider<EnvDriver>((ref) {
  return DotEnvDriver();
});
