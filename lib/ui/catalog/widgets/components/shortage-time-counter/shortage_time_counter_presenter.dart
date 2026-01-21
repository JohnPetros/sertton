import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

class ShortageTimeCounterPresenter {
  final int stock;
  final remainingTime = signal<Duration>(Duration.zero);
  Timer? _timer;

  ShortageTimeCounterPresenter(this.stock) {
    _updateRemainingTime();
    _startTimer();
  }

  void _updateRemainingTime() {
    final now = DateTime.now().toLocal();
    final nextDay = DateTime(now.year, now.month, now.day + 1);
    remainingTime.value = nextDay.difference(now);
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      _updateRemainingTime();
      if (remainingTime.value.isNegative) {
        remainingTime.value = Duration.zero;
        _timer?.cancel();
      }
    });
  }

  void dispose() {
    _timer?.cancel();
  }
}

final shortageTimeCounterPresenterProvider = Provider.autoDispose
    .family<ShortageTimeCounterPresenter, int>((ref, stock) {
      final presenter = ShortageTimeCounterPresenter(stock);
      ref.onDispose(() => presenter.dispose());
      return presenter;
    });
