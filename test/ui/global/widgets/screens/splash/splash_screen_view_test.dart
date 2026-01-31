import 'package:flutter/material.dart' hide Theme, Scaffold, ThemeData;
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:sertton/ui/global/widgets/screens/splash/splash_screen_view.dart';
import 'package:sertton/ui/global/widgets/screens/splash/splash_screen_presenter.dart';
import 'package:network_image_mock/network_image_mock.dart';

class MockSplashScreenPresenter extends Mock implements SplashScreenPresenter {}

class MockAssetBundle extends CachingAssetBundle {
  @override
  Future<ByteData> load(String key) async => ByteData(0);

  @override
  Future<String> loadString(String key, {bool cache = true}) async {
    if (key.endsWith('.json')) {
      return '{"v":"5.5.7","fr":60,"ip":0,"op":60,"w":100,"h":100,"nm":"Mock","ddd":0,"assets":[],"layers":[]}';
    }
    return '';
  }
}

void main() {
  late MockSplashScreenPresenter presenter;

  setUp(() {
    presenter = MockSplashScreenPresenter();
    when(() => presenter.init()).thenReturn(null);
  });

  Widget createWidget() {
    return ShadcnApp(
      theme: ThemeData(colorScheme: ColorSchemes.lightBlue, radius: 0.5),
      home: DefaultAssetBundle(
        bundle: MockAssetBundle(),
        child: ProviderScope(
          overrides: [
            splashScreenPresenterProvider.overrideWithValue(presenter),
          ],
          child: const Material(child: SplashScreenView()),
        ),
      ),
    );
  }

  group('SplashScreenView', () {
    testWidgets('should render correctly and call init', (tester) async {
      await mockNetworkImagesFor(() async {
        await tester.pumpWidget(createWidget());

        verify(() => presenter.init()).called(1);

        await tester.pump(const Duration(milliseconds: 1000));

        expect(find.text('Sertton'), findsOneWidget);
      });
    });
  });
}
