import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/core/global/interfaces/rest_client.dart';
import 'package:sertton/core/global/responses/rest_response.dart';

class DioRestClient implements RestClient {
  late final Dio _dio;

  DioRestClient() {
    _dio = Dio(
      BaseOptions(
        connectTimeout: const Duration(seconds: 5),
        receiveTimeout: const Duration(seconds: 3),
      ),
    );
  }

  @override
  Future<RestResponse<Body>> get<Body>(
    String path, {
    Map<String, String>? queryParams,
  }) async {
    try {
      final response = await _dio.get(path, queryParameters: queryParams);
      return _handleResponse<Body>(response);
    } on DioException catch (exception) {
      return _handleError<Body>(exception);
    }
  }

  @override
  Future<RestResponse<Body>> post<Body>(
    String path, {
    Body? body,
    Map<String, String>? queryParams,
  }) async {
    try {
      final response = await _dio.post(
        path,
        data: body,
        queryParameters: queryParams,
      );
      return _handleResponse<Body>(response);
    } on DioException catch (e) {
      return _handleError<Body>(e);
    }
  }

  @override
  Future<RestResponse<Body>> put<Body>(
    String path, {
    Body? body,
    Map<String, String>? queryParams,
  }) async {
    try {
      final response = await _dio.put(
        path,
        data: body,
        queryParameters: queryParams,
      );
      return _handleResponse<Body>(response);
    } on DioException catch (e) {
      return _handleError<Body>(e);
    }
  }

  @override
  Future<RestResponse<Body>> delete<Body>(
    String path, {
    Body? body,
    Map<String, String>? queryParams,
  }) async {
    try {
      final response = await _dio.delete(
        path,
        data: body,
        queryParameters: queryParams,
      );
      return _handleResponse<Body>(response);
    } on DioException catch (e) {
      return _handleError<Body>(e);
    }
  }

  RestResponse<Body> _handleResponse<Body>(Response response) {
    return RestResponse<Body>(
      body: response.data as Body,
      statusCode: response.statusCode,
    );
  }

  RestResponse<Body> _handleError<Body>(DioException exception) {
    return RestResponse<Body>(
      body: null as Body,
      statusCode: exception.response?.statusCode ?? 500,
      errorMessage: exception.message ?? 'Unknown error occurred',
    );
  }

  @override
  void setBaseUrl(String baseUrl) {
    _dio.options.baseUrl = baseUrl;
  }

  @override
  void setHeader(String key, String value) {
    _dio.options.headers[key] = value;
  }
}

final restClientProvider = Provider<DioRestClient>((ref) {
  return DioRestClient();
});
