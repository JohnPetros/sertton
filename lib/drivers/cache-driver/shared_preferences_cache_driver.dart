import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/global/interfaces/cache_driver.dart';

class SharedPreferencesCacheDriver implements CacheDriver {
  final SharedPreferences _prefs;

  SharedPreferencesCacheDriver(this._prefs);

  @override
  String? get(String key) {
    return _prefs.getString(key);
  }

  @override
  void set(String key, String value) {
    _prefs.setString(key, value);
  }

  @override
  void delete(String key) {
    _prefs.remove(key);
  }
}

final sharedPreferencesProvider = Provider<SharedPreferences>((ref) {
  throw UnimplementedError(
    'SharedPreferences must be initialized in main.dart',
  );
});
