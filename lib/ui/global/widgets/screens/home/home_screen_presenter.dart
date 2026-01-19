import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

class HomeScreenPresenter {
  final String userId;
  final count = signal(0);

  HomeScreenPresenter({required this.userId});
}

final presenterProvider = Provider.autoDispose
    .family<HomeScreenPresenter, ({String userId})>(
      (ref, props) => HomeScreenPresenter(userId: props.userId),
    );
