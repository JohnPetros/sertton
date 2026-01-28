import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals_flutter.dart';
import 'package:sertton/ui/institutional/constants/institutional_content.dart';

typedef TermSection = ({String title, String content});

class TermsConditionsPresenter {
  final sections = signal<List<TermSection>>([]);

  void loadSections() {
    sections.value = InstitutionalContent.terms;
  }
}

final termsConditionsPresenterProvider =
    Provider.autoDispose<TermsConditionsPresenter>((ref) {
      final presenter = TermsConditionsPresenter();
      presenter.loadSections();
      return presenter;
    });
