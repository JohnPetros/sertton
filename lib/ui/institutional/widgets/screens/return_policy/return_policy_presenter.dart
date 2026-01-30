import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals_flutter.dart';
import 'package:sertton/ui/institutional/constants/institutional_content.dart';

class ReturnPolicyPresenter {
  final sections = signal<List<({String title, String content})>>([]);

  ReturnPolicyPresenter() {
    loadPolicy();
  }

  void loadPolicy() {
    sections.value = InstitutionalContent.returnPolicy;
  }
}

final returnPolicyPresenterProvider =
    Provider.autoDispose<ReturnPolicyPresenter>((ref) {
      return ReturnPolicyPresenter();
    });
