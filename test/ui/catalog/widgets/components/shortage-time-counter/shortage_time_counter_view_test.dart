import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';
import 'package:sertton/ui/catalog/widgets/components/shortage-time-counter/shortage_time_counter_view.dart';
import 'package:sertton/ui/catalog/widgets/components/shortage-time-counter/shortage_time_counter_presenter.dart';

class MockShortageTimeCounterPresenter extends Mock
    implements ShortageTimeCounterPresenter {}

void main() {
  late MockShortageTimeCounterPresenter presenter;
  late Signal<Duration> remainingTimeSignal;

  setUp(() {
    presenter = MockShortageTimeCounterPresenter();
    remainingTimeSignal = signal(
      const Duration(hours: 2, minutes: 30, seconds: 45),
    );

    when(() => presenter.stock).thenReturn(10);
    when(() => presenter.remainingTime).thenReturn(remainingTimeSignal);
  });

  Widget createWidget() {
    return ShadcnApp(
      home: ProviderScope(
        overrides: [
          shortageTimeCounterPresenterProvider(10).overrideWithValue(presenter),
        ],
        child: const Scaffold(child: ShortageTimeCounterView(stock: 10)),
      ),
    );
  }

  group('ShortageTimeCounterView', () {
    testWidgets('should render stock amount and formatted time', (
      tester,
    ) async {
      await tester.pumpWidget(createWidget());

      expect(find.textContaining('Apenas'), findsOneWidget);
      expect(find.textContaining('10'), findsOneWidget);
      expect(find.textContaining('02:30:45'), findsOneWidget);
      expect(find.byIcon(RadixIcons.stopwatch), findsOneWidget);
    });

    testWidgets('should update time when signal changes', (tester) async {
      await tester.pumpWidget(createWidget());

      expect(find.textContaining('02:30:45'), findsOneWidget);

      remainingTimeSignal.value = const Duration(
        hours: 1,
        minutes: 15,
        seconds: 10,
      );
      await tester.pump();

      expect(find.textContaining('01:15:10'), findsOneWidget);
    });
  });
}
