import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:sertton/core/global/interfaces/env_driver.dart';

class DotEnvDriver implements EnvDriver {
  @override
  String get(String key) {
    return dotenv.env[key] ?? '';
  }
}
