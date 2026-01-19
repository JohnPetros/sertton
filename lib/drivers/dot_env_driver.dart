import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:sertton/core/global/interfaces/env_driver.dart';

class DotEnvDriver implements EnvDriver {
  DotEnvDriver() {
    dotenv.load(fileName: ".env");
  }

  @override
  String get(String key) {
    return dotenv.env[key] ?? '';
  }
}

final envDriverProvider = Provider<EnvDriver>((ref) {
  return DotEnvDriver();
});
