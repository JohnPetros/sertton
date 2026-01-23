import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/constants/routes.dart';
import 'package:sertton/core/global/interfaces/navigation_driver.dart';
import 'package:sertton/drivers/navigation-driver/index.dart';

class AppSearchBarPresenter {
  final NavigationDriver _navigationDriver;
  final Function(String)? onSubmitted;
  final VoidCallback? onTap;
  final bool readOnly;

  AppSearchBarPresenter(
    this._navigationDriver, {
    this.onSubmitted,
    this.onTap,
    this.readOnly = false,
  });

  void submit(String search) {
    if (readOnly) {
      onTap?.call();
    } else {
      if (onSubmitted != null) {
        onSubmitted!.call(search);
      } else {
        // Default behavior: navigate to catalog with the search term
        _navigationDriver.go(
          Routes.catalog,
          data: {'focusSearch': search.isEmpty, 'initialQuery': search},
        );
      }
    }
  }
}

final appSearchBarPresenterProvider = Provider.autoDispose
    .family<
      AppSearchBarPresenter,
      ({Function(String)? onSubmitted, VoidCallback? onTap, bool readOnly})
    >((ref, arg) {
      final navigationDriver = ref.read(navigationDriverProvider);
      return AppSearchBarPresenter(
        navigationDriver,
        onSubmitted: arg.onSubmitted,
        onTap: arg.onTap,
        readOnly: arg.readOnly,
      );
    });
