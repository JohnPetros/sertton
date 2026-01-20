import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class AppSearchBarPresenter {
  final Function(String)? onSubmitted;
  final VoidCallback? onTap;
  final bool readOnly;

  AppSearchBarPresenter({this.onSubmitted, this.onTap, this.readOnly = false});

  void submit(String search) {
    if (readOnly) {
      onTap?.call();
    } else {
      onSubmitted?.call(search);
    }
  }
}

final appSearchBarPresenterProvider = Provider.autoDispose
    .family<
      AppSearchBarPresenter,
      ({Function(String)? onSubmitted, VoidCallback? onTap, bool readOnly})
    >((ref, arg) {
      return AppSearchBarPresenter(
        onSubmitted: arg.onSubmitted,
        onTap: arg.onTap,
        readOnly: arg.readOnly,
      );
    });
