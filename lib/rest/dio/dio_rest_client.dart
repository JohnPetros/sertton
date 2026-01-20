import 'package:dio/dio.dart';
import 'package:sertton/core/global/interfaces/rest_client.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/rest/types/json.dart';

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
  Future<RestResponse<Json>> get(String path, {Json? queryParams}) async {
    try {
      final response = await _dio.get(path, queryParameters: queryParams);
      return _handleResponse(response);
    } on DioException catch (exception) {
      return _handleError(exception);
    }
  }

  @override
  Future<RestResponse<Json>> post(
    String path, {
    Json? body,
    Json? queryParams,
  }) async {
    try {
      final response = await _dio.post(
        path,
        data: body,
        queryParameters: queryParams,
      );
      return _handleResponse(response);
    } on DioException catch (e) {
      return _handleError(e);
    }
  }

  @override
  Future<RestResponse<Json>> put(
    String path, {
    Json? body,
    Json? queryParams,
  }) async {
    try {
      final response = await _dio.put(
        path,
        data: body,
        queryParameters: queryParams,
      );
      return _handleResponse(response);
    } on DioException catch (e) {
      return _handleError(e);
    }
  }

  @override
  Future<RestResponse<Json>> delete(
    String path, {
    Json? body,
    Json? queryParams,
  }) async {
    try {
      final response = await _dio.delete(
        path,
        data: body,
        queryParameters: queryParams,
      );
      return _handleResponse(response);
    } on DioException catch (e) {
      return _handleError(e);
    }
  }

  RestResponse<Json> _handleResponse(Response response) {
    return RestResponse(
      body: response.data as Json,
      statusCode: response.statusCode,
    );
  }

  RestResponse<Json> _handleError(DioException exception) {
    return RestResponse(
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
