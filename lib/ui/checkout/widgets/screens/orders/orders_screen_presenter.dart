import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

import 'package:sertton/core/checkout/dtos/order_dto.dart';
import 'package:sertton/core/checkout/interfaces/checkout_service.dart';
import 'package:sertton/core/global/interfaces/cache_driver.dart';

import 'package:sertton/drivers/cache-driver/index.dart';
import 'package:sertton/rest/services.dart';

enum DocumentType { cpf, cnpj }

class OrdersScreenPresenter {
  final CheckoutService _checkoutService;
  final CacheDriver _cacheDriver;

  final document = signal<String>('');
  final documentType = signal<DocumentType>(DocumentType.cpf);
  final isIdentified = signal<bool>(false);
  final orders = signal<List<OrderDto>>([]);
  final isLoading = signal<bool>(false);
  final hasError = signal<bool>(false);
  final errorMessage = signal<String>('');

  late final isDocumentValid = computed<bool>(() {
    final cleanDoc = document.value.replaceAll(RegExp(r'[^0-9]'), '');
    if (documentType.value == DocumentType.cpf) {
      return cleanDoc.length == 11;
    } else {
      return cleanDoc.length == 14;
    }
  });

  late final formattedDocument = computed<String>(() {
    final clean = document.value.replaceAll(RegExp(r'[^0-9]'), '');
    if (clean.length == 11) {
      return '${clean.substring(0, 3)}.${clean.substring(3, 6)}.${clean.substring(6, 9)}-${clean.substring(9, 11)}';
    } else if (clean.length == 14) {
      return '${clean.substring(0, 2)}.${clean.substring(2, 5)}.${clean.substring(5, 8)}/${clean.substring(8, 12)}-${clean.substring(12, 14)}';
    }
    return document.value;
  });

  late final sortedOrders = computed<List<OrderDto>>(() {
    final list = [...orders.value];
    list.sort((a, b) => b.createdAt.compareTo(a.createdAt));
    return list;
  });

  OrdersScreenPresenter({
    required CheckoutService checkoutService,
    required CacheDriver cacheDriver,
  }) : _checkoutService = checkoutService,
       _cacheDriver = cacheDriver;

  void init() {
    final savedDoc = _cacheDriver.get('customer_document');
    if (savedDoc != null && savedDoc.isNotEmpty) {
      document.value = savedDoc;
      final clean = savedDoc.replaceAll(RegExp(r'[^0-9]'), '');
      if (clean.length == 14) {
        documentType.value = DocumentType.cnpj;
      } else {
        documentType.value = DocumentType.cpf;
      }
      isIdentified.value = true;
      fetchOrders();
    }
  }

  void setDocument(String value) {
    document.value = value;
  }

  void setDocumentType(DocumentType type) {
    documentType.value = type;
  }

  Future<void> fetchOrders() async {
    if (!isDocumentValid.value) return;

    isLoading.value = true;
    hasError.value = false;
    errorMessage.value = '';

    try {
      final cleanDoc = document.value.replaceAll(RegExp(r'[^0-9]'), '');
      final response = await _checkoutService.fetchOrdersByCustomer(cleanDoc);

      if (response.isSuccessful) {
        orders.value = response.body;
        isIdentified.value = true;
        _cacheDriver.set('customer_document', cleanDoc);
      } else {
        hasError.value = true;
        errorMessage.value = 'Não foi possível carregar os pedidos.';
      }
    } catch (e) {
      hasError.value = true;
      errorMessage.value = 'Ocorreu um erro inesperado.';
    } finally {
      isLoading.value = false;
    }
  }

  void logout() {
    _cacheDriver.delete('customer_document');
    document.value = '';
    orders.value = [];
    isIdentified.value = false;
  }
}

final ordersScreenPresenterProvider =
    Provider.autoDispose<OrdersScreenPresenter>((ref) {
      final checkoutService = ref.read(checkoutServiceProvider);
      final cacheDriver = ref.read(cacheDriverProvider);

      return OrdersScreenPresenter(
        checkoutService: checkoutService,
        cacheDriver: cacheDriver,
      );
    });
