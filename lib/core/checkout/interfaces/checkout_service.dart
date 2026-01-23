import 'package:sertton/core/checkout/dtos/order_dto.dart';
import 'package:sertton/core/global/responses/rest_response.dart';

abstract class CheckoutService {
  Future<RestResponse<String>> fetchCheckoutLink(
    List<String> skuTokens,
    List<int> quantities,
  );

  Future<RestResponse<List<OrderDto>>> fetchOrdersByCustomer(
    String customerDocument,
  );
}
