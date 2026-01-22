import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/global/interfaces/cache_driver.dart';
import 'package:sertton/drivers/cache-driver/shared_preferences_cache_driver.dart';

final cacheDriverProvider = Provider<CacheDriver>((ref) {
  final prefs = ref.watch(sharedPreferencesProvider);
  return SharedPreferencesCacheDriver(prefs);
});
