import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/core/marketing/dtos/banner_dto.dart';
import 'package:sertton/core/marketing/dtos/lead_dto.dart';
import 'package:sertton/core/marketing/interfaces/marketing_service.dart';
import 'package:sertton/rest/yampi/mappers/yampi_banner_mapper.dart';
import 'package:sertton/rest/yampi/services/yampi_service.dart';

class YampiMarketingService extends YampiService implements MarketingService {
  YampiMarketingService(super.restClient, super.envDriver);

  @override
  Future<RestResponse<List<BannerDto>>> fetchBanners() async {
    final response = await super.restClient.get('/marketing/banners');
    return response.mapBody((body) {
      if (response.isFailure) return [];
      return YampiBannerMapper.toDtoList(body);
    });
  }

  @override
  Future<RestResponse<void>> saveLead(LeadDto leadDto) {
    throw UnimplementedError();
  }
}
