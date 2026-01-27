import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

class CatalogStore {
  final query = signal<String?>(null);
  final categoryId = signal<String?>(null);
  final brandsIds = signal<List<String>>([]);
  final autoFocus = signal(false);

  void clearSearch() {
    batch(() {
      query.value = '';
      autoFocus.value = false;
    });
  }

  void setSearch(String value, {bool focus = false}) {
    batch(() {
      query.value = value;
      autoFocus.value = focus;
    });
  }
}

final catalogStoreProvider = Provider((ref) => CatalogStore());
