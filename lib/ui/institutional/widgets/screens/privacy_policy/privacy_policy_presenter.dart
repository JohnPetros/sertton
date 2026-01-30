import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals_flutter.dart';
import 'package:sertton/ui/institutional/constants/institutional_content.dart';

class PrivacyPolicyPresenter {
  final sections = signal<List<({String title, String content})>>([]);

  PrivacyPolicyPresenter() {
    loadPolicy();
  }

  void loadPolicy() {
    sections.value = InstitutionalContent.privacyPolicy;
  }
}

final privacyPolicyPresenterProvider =
    Provider.autoDispose<PrivacyPolicyPresenter>((ref) {
      return PrivacyPolicyPresenter();
    });
