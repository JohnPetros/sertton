import 'package:flutter_test/flutter_test.dart';
import 'package:sertton/ui/institutional/constants/institutional_content.dart';
import 'package:sertton/ui/institutional/widgets/screens/return_policy/return_policy_presenter.dart';

void main() {
  late ReturnPolicyPresenter presenter;

  setUp(() {
    presenter = ReturnPolicyPresenter();
  });

  group('ReturnPolicyPresenter', () {
    test('should have policy sections initially', () {
      expect(presenter.sections.value, isNotEmpty);
      expect(presenter.sections.value, InstitutionalContent.returnPolicy);
    });
  });
}
