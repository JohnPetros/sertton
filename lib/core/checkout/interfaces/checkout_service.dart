import 'package:sertton/core/global/responses/rest_response.dart';

abstract class CheckoutService {
  Future<RestResponse<String>> fetchCheckoutLink(
    List<String> skuTokens,
    List<int> quantities,
  );
}
