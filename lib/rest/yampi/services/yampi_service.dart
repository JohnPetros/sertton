import 'package:sertton/constants/env.dart';
import 'package:sertton/core/global/interfaces/env_driver.dart';
import 'package:sertton/core/global/interfaces/rest_client.dart';

class YampiService {
  final RestClient restClient;
  final EnvDriver envDriver;

  YampiService(this.restClient, this.envDriver) {
    restClient.setBaseUrl(envDriver.get(Env.yampiApiUrl));
    restClient.setHeader('User-Token', envDriver.get(Env.yampiUserToken));
    restClient.setHeader('User-Secret-Key', envDriver.get(Env.yampiSecretKey));
  }
}
