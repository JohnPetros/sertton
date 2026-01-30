import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/ui/institutional/constants/institutional_content.dart';
import 'package:sertton/ui/institutional/widgets/screens/privacy_policy/privacy_policy_presenter.dart';

void main() {
  late PrivacyPolicyPresenter presenter;

  setUp(() {
    presenter = PrivacyPolicyPresenter();
  });

  group('PrivacyPolicyPresenter', () {
    test('should load policy sections initially', () {
      expect(presenter.sections.value, isEmpty);

      presenter.loadPolicy();

      expect(presenter.sections.value, isNotEmpty);
      expect(presenter.sections.value, InstitutionalContent.privacyPolicy);
    });
  });
}
