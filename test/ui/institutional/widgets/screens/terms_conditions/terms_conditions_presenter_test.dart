import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/ui/institutional/constants/institutional_content.dart';
import 'package:sertton/ui/institutional/widgets/screens/terms_conditions/terms_conditions_presenter.dart';

void main() {
  late TermsConditionsPresenter presenter;

  setUp(() {
    presenter = TermsConditionsPresenter();
  });

  group('TermsConditionsPresenter', () {
    test('should load terms sections initially', () {
      expect(presenter.sections.value, isNotEmpty);
      expect(presenter.sections.value, InstitutionalContent.terms);
    });
  });
}
