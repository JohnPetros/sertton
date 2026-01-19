import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/core/marketing/dtos/banner_dto.dart';
import 'package:sertton/core/marketing/interfaces/marketing_service.dart';
import 'package:sertton/rest/yampi/mappers/yampi_banner_mapper.dart';
import 'package:sertton/rest/yampi/services/yampi_service.dart';
import 'package:sertton/rest/yampi/types/yampi_response.dart';

class YampiMarketingService extends YampiService implements MarketingService {
  YampiMarketingService(super.restClient, super.envDriver);

  @override
  Future<RestResponse<List<BannerDto>>> fetchBanners() async {
    final response = await super.restClient.get<YampiResponse>('/banners');
    if (response.isFailure) response.throwError();

    return response.mapBody((body) {
      return body?['data'].map(YampiBannerMapper.toDto).toList();
    });
  }
}
