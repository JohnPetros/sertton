import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals_flutter.dart';
import 'package:sertton/ui/institutional/constants/institutional_content.dart';

class TermsConditionsPresenter {
  final sections = signal(InstitutionalContent.terms);
}

final termsConditionsPresenterProvider =
    Provider.autoDispose<TermsConditionsPresenter>((ref) {
      return TermsConditionsPresenter();
    });
