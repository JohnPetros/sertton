import 'package:sertton/constants/env.dart';
import 'package:sertton/core/checkout/dtos/order_dto.dart';
import 'package:sertton/core/checkout/interfaces/checkout_service.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/rest/yampi/mappers/yampi_order_mapper.dart';
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
    for (var index = 0; index < skuTokens.length; index++) {
      items.add('${skuTokens[index]}:${quantities[index]}');
    }

    final itemsParam = items.join(',');

    final link = Uri.parse(
      '${super.envDriver.get(Env.yampiPurchaseUrl)}/$itemsParam',
    );

    return RestResponse(body: link.toString());
  }

  @override
  Future<RestResponse<List<OrderDto>>> fetchOrdersByCustomer(
    String customerDocument,
  ) async {
    final response = await super.restClient.get(
      '/orders',
      queryParams: {'q': customerDocument},
    );

    return response.mapBody((json) => YampiOrderMapper.toDtoList(json));
  }
}
