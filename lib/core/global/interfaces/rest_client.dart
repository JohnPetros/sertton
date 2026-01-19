import 'package:sertton/core/global/responses/rest_response.dart';

abstract class RestClient {
  Future<RestResponse<Body>> get<Body>(
    String path, {
    Map<String, String>? queryParams,
  });
  Future<RestResponse<Body>> post<Body>(
    String path, {
    Body? body,
    Map<String, String>? queryParams,
  });
  Future<RestResponse<Body>> put<Body>(
    String path, {
    Body? body,
    Map<String, String>? queryParams,
  });
  Future<RestResponse<Body>> delete<Body>(
    String path, {
    Body? body,
    Map<String, String>? queryParams,
  });
  void setBaseUrl(String baseUrl);
  void setHeader(String key, String value);
}
