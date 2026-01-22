import 'package:sertton/constants/env.dart';
import 'package:sertton/core/checkout/interfaces/checkout_service.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/rest/yampi/services/yampi_service.dart';

class YampiCheckoutService extends YampiService implements CheckoutService {
  YampiCheckoutService(super.restClient, super.envDriver);

  @override
  Future<RestResponse<String>> fetchCheckoutLink(
    List<String> skuTokens,
    List<int> quantities,
  ) async {
    if (skuTokens.isEmpty || quantities.isEmpty) {
      throw ArgumentError('skuTokens and quantities cannot be empty');
    }

    if (skuTokens.length != quantities.length) {
      throw ArgumentError('skuTokens and quantities must have the same length');
    }

    final items = <String>[];
    for (var i = 0; i < skuTokens.length; i++) {
      items.add('${skuTokens[i]}:${quantities[i]}');
    }

    final itemsParam = items.join(',');

    final link = Uri.parse(
      '${super.envDriver.get(Env.yampiPurchaseUrl)}/$itemsParam',
    );

    return RestResponse(body: link.toString());
  }
}
