import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals_flutter.dart';

import 'package:sertton/core/marketing/dtos/lead_dto.dart';
import 'package:sertton/core/marketing/interfaces/marketing_service.dart';

import 'package:sertton/rest/services.dart';

class LeadsCapturerSectionPresenter {
  final MarketingService _service;

  LeadsCapturerSectionPresenter(this._service);

  final email = signal('');
  final isLoading = signal(false);
  final errorMessage = signal<String?>(null);
  final successMessage = signal<String?>(null);

  bool get isEmailValid {
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    return emailRegex.hasMatch(email.value);
  }

  Future<void> submitLead() async {
    if (!isEmailValid) {
      errorMessage.value = 'Por favor, insira um e-mail válido';
      successMessage.value = null;
      return;
    }

    isLoading.value = true;
    errorMessage.value = null;
    successMessage.value = null;

    final leadDto = LeadDto(email: email.value);
    final response = await _service.saveLead(leadDto);

    isLoading.value = false;

    if (response.isSuccessful) {
      successMessage.value = 'Obrigado! Você foi cadastrado com sucesso.';
      email.value = '';
    } else {
      errorMessage.value = 'Erro ao cadastrar. Tente novamente.';
      successMessage.value = null;
    }
  }

  void clearMessages() {
    errorMessage.value = null;
    successMessage.value = null;
  }
}

final leadsCapturerSectionPresenterProvider =
    Provider.autoDispose<LeadsCapturerSectionPresenter>((ref) {
      final marketingService = ref.read(marketingServiceProvider);
      return LeadsCapturerSectionPresenter(marketingService);
    });
