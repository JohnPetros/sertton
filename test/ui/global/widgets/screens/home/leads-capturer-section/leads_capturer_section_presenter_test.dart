import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:sertton/core/global/responses/rest_response.dart';
import 'package:sertton/core/marketing/dtos/lead_dto.dart';
import 'package:sertton/core/marketing/interfaces/marketing_service.dart';
import 'package:sertton/ui/global/widgets/screens/home/leads-capturer-section/leads_capturer_section_presenter.dart';

class MockMarketingService extends Mock implements MarketingService {}

class FakeLeadDto extends Fake implements LeadDto {}

void main() {
  late MockMarketingService service;
  late LeadsCapturerSectionPresenter presenter;

  setUpAll(() {
    registerFallbackValue(FakeLeadDto());
  });

  setUp(() {
    service = MockMarketingService();
    presenter = LeadsCapturerSectionPresenter(service);
  });

  group('LeadsCapturerSectionPresenter', () {
    test('should return true for valid email', () {
      presenter.email.value = 'test@example.com';
      expect(presenter.isEmailValid, isTrue);
    });

    test('should return false for invalid email', () {
      presenter.email.value = 'invalid-email';
      expect(presenter.isEmailValid, isFalse);
    });

    test('should show error message when submitting invalid email', () async {
      presenter.email.value = 'invalid-email';

      await presenter.submitLead();

      expect(
        presenter.errorMessage.value,
        equals('Por favor, insira um e-mail válido'),
      );
      expect(presenter.successMessage.value, isNull);
      verifyNever(() => service.saveLead(any()));
    });

    test('should submit lead successfully', () async {
      final email = 'test@example.com';
      presenter.email.value = email;

      when(
        () => service.saveLead(any()),
      ).thenAnswer((_) async => RestResponse<void>(body: null));

      final future = presenter.submitLead();

      expect(presenter.isLoading.value, isTrue);

      await future;

      expect(presenter.isLoading.value, isFalse);
      expect(
        presenter.successMessage.value,
        equals('Obrigado! Você foi cadastrado com sucesso.'),
      );
      expect(presenter.email.value, isEmpty);
      expect(presenter.errorMessage.value, isNull);

      verify(
        () => service.saveLead(
          any(that: isA<LeadDto>().having((l) => l.email, 'email', email)),
        ),
      ).called(1);
    });

    test('should show error when submission fails', () async {
      presenter.email.value = 'test@example.com';

      when(() => service.saveLead(any())).thenAnswer(
        (_) async => RestResponse<void>(statusCode: 500, errorMessage: 'Error'),
      );

      await presenter.submitLead();

      expect(presenter.isLoading.value, isFalse);
      expect(
        presenter.errorMessage.value,
        equals('Erro ao cadastrar. Tente novamente.'),
      );
      expect(presenter.successMessage.value, isNull);
    });

    test('should clear messages', () {
      presenter.errorMessage.value = 'Error';
      presenter.successMessage.value = 'Success';

      presenter.clearMessages();

      expect(presenter.errorMessage.value, isNull);
      expect(presenter.successMessage.value, isNull);
    });
  });
}
