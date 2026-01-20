import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/catalog/dtos/collection_dto.dart';
import 'package:sertton/core/catalog/interfaces/catalog_service.dart';
import 'package:sertton/core/marketing/dtos/banner_dto.dart';
import 'package:sertton/core/marketing/interfaces/marketing_service.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/rest/services.dart';
import 'package:signals/signals.dart';

sealed class MarketingItem {}

class BannerItem extends MarketingItem {
  final BannerDto banner;
  BannerItem(this.banner);
}

class CollectionItem extends MarketingItem {
  final CollectionDto collection;
  CollectionItem(this.collection);
}

class MarketingSectionPresenter {
  final MarketingService _marketingService;
  final CatalogService _catalogService;

  final items = signal<List<MarketingItem>>([]);
  final isLoading = signal(false);
  final error = signal<String?>(null);

  MarketingSectionPresenter(this._marketingService, this._catalogService) {
    loadContent();
  }

  Future<void> loadContent() async {
    isLoading.value = true;
    error.value = null;

    try {
      final responses = await Future.wait([
        _marketingService.fetchBanners(),
        _catalogService.fetchCollections(),
      ]);

      final bannersResponse = responses[0] as RestResponse<List<BannerDto>>;
      final collectionsResponse =
          responses[1] as RestResponse<List<CollectionDto>>;

      if (bannersResponse.isSuccessful && collectionsResponse.isSuccessful) {
        final List<BannerDto> banners = bannersResponse.body
            .skip(2)
            .take(3)
            .toList();
        final List<CollectionDto> collections = collectionsResponse
            .body
            .reversed
            .toList();

        final List<MarketingItem> interleaved = [];
        int bannerIndex = 0;
        int collectionIndex = 0;

        while (bannerIndex < banners.length ||
            collectionIndex < collections.length) {
          if (collectionIndex < collections.length) {
            interleaved.add(CollectionItem(collections[collectionIndex]));
            collectionIndex++;
          }
          if (bannerIndex < banners.length) {
            interleaved.add(BannerItem(banners[bannerIndex]));
            bannerIndex++;
          }
        }

        items.value = interleaved;
      } else {
        error.value = 'Houve um erro ao carregar o conteúdo.';
      }
    } catch (e) {
      error.value = 'Houve um erro inesperado.';
    } finally {
      isLoading.value = false;
    }
  }
}

final marketingSectionPresenterProvider =
    Provider.autoDispose<MarketingSectionPresenter>((ref) {
      final marketingService = ref.read(marketingServiceProvider);
      final catalogService = ref.read(catalogServiceProvider);
      return MarketingSectionPresenter(marketingService, catalogService);
    });
