import 'package:sertton/core/constants/http_status_code.dart';

class RestResponse<Body> {
  final Body? _body;
  final int _statusCode;
  final String? _errorMessage;

  RestResponse({Body? body, int? statusCode, String? errorMessage})
    : _body = body,
      _statusCode = statusCode ?? HttpStatusCode.ok,
      _errorMessage = errorMessage;

  Body get body {
    if (_errorMessage != null) {
      throw Exception('Rest Response failed');
    }
    return _body!;
  }

  Never throwError() {
    throw Exception('Rest Response failed');
  }

  RestResponse<NewBody> mapBody<NewBody>(NewBody Function(Body?) mapper) {
    if (_errorMessage != null) {
      throw Exception('Rest Response failed');
    }
    return RestResponse(body: mapper(_body), statusCode: _statusCode);
  }

  bool get isSuccessful {
    return _statusCode <= HttpStatusCode.badRequest;
  }

  bool get isFailure {
    return _statusCode >= HttpStatusCode.badRequest || _errorMessage != null;
  }

  String get errorMessage {
    if (_errorMessage != null) {
      return _errorMessage!;
    }
    throw Exception('Rest Response failed');
  }

  int get statusCode => _statusCode;
}
