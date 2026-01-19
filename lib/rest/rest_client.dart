import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/rest/dio/dio_rest_client.dart';

final restClientProvider = Provider<DioRestClient>((ref) => DioRestClient());
