import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/core/marketing/dtos/banner_dto.dart';

abstract class MarketingService {
  Future<RestResponse<List<BannerDto>>> fetchBanners();
}
