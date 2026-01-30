import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:mocktail/mocktail.dart';

class TestHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return _TestHttpClient();
  }
}

class _TestHttpClient extends Fake implements HttpClient {
  @override
  bool autoUncompress = true;

  @override
  Future<HttpClientRequest> openUrl(String method, Uri url) async {
    return _TestHttpClientRequest();
  }

  @override
  Future<HttpClientRequest> getUrl(Uri url) async {
    return _TestHttpClientRequest();
  }

  @override
  void close({bool force = false}) {}
}

class _TestHttpClientRequest extends Fake implements HttpClientRequest {
  @override
  HttpHeaders get headers => _TestHttpHeaders();

  @override
  bool followRedirects = true;

  @override
  bool persistentConnection = true;

  @override
  int maxRedirects = 5;

  @override
  int contentLength = -1;

  @override
  Future<void> addStream(Stream<List<int>> stream) async {
    await stream.drain();
  }

  @override
  void add(List<int> data) {}

  @override
  void write(Object? obj) {}

  @override
  Future<HttpClientResponse> close() async {
    return _TestHttpClientResponse();
  }
}

class _TestHttpHeaders extends Fake implements HttpHeaders {
  @override
  void set(String name, Object value, {bool preserveHeaderCase = false}) {}

  @override
  void add(String name, Object value, {bool preserveHeaderCase = false}) {}

  @override
  void remove(String name, Object value) {}

  @override
  void removeAll(String name) {}

  @override
  void forEach(void Function(String name, List<String> values) action) {}

  @override
  String? value(String name) => null;
}

class _TestHttpClientResponse extends Fake implements HttpClientResponse {
  @override
  int get statusCode => 200;

  @override
  int get contentLength => 0;

  @override
  HttpClientResponseCompressionState get compressionState =>
      HttpClientResponseCompressionState.notCompressed;

  @override
  HttpHeaders get headers => _TestHttpHeaders();

  @override
  bool get isRedirect => false;

  @override
  bool get persistentConnection => true;

  @override
  String get reasonPhrase => 'OK';

  @override
  List<RedirectInfo> get redirects => [];

  @override
  StreamSubscription<List<int>> listen(
    void Function(List<int> event)? onData, {
    Function? onError,
    void Function()? onDone,
    bool? cancelOnError,
  }) {
    final svg = '<svg viewBox="0 0 1 1"></svg>';
    Future(() {
      if (onData != null) {
        onData(utf8.encode(svg));
      }
      if (onDone != null) {
        onDone();
      }
    });

    return const Stream<List<int>>.empty().listen(null);
  }
}
