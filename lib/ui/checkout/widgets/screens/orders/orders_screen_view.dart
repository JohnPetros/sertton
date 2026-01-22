import 'package:flutter/material.dart' as m;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

import 'package:sertton/ui/checkout/widgets/screens/orders/orders_screen_presenter.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/empty-state/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/error-state/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/identification-form/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/loading-state/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/orders-header/index.dart';
import 'package:sertton/ui/checkout/widgets/screens/orders/orders-list/index.dart';
import 'package:sertton/ui/global/widgets/app-search-bar/index.dart';

class OrdersScreenView extends ConsumerStatefulWidget {
  const OrdersScreenView({super.key});

  @override
  ConsumerState<OrdersScreenView> createState() => _OrdersScreenViewState();
}

class _OrdersScreenViewState extends ConsumerState<OrdersScreenView> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(ordersScreenPresenterProvider).init();
    });
  }

  @override
  Widget build(BuildContext context) {
    final presenter = ref.watch(ordersScreenPresenterProvider);

    return Scaffold(
      headers: [const AppBar(title: AppSearchBar())],
      child: Watch((context) {
        if (!presenter.isIdentified.value) {
          return IdentificationForm(
            document: presenter.document.value,
            documentType: presenter.documentType.value,
            isLoading: presenter.isLoading.value,
            isValid: presenter.isDocumentValid.value,
            onDocumentChanged: presenter.setDocument,
            onDocumentTypeChanged: presenter.setDocumentType,
            onSubmit: presenter.fetchOrders,
          );
        }

        if (presenter.isLoading.value && presenter.orders.value.isEmpty) {
          return const OrdersLoadingState();
        }

        if (presenter.hasError.value && presenter.orders.value.isEmpty) {
          return OrdersErrorState(
            message: presenter.errorMessage.value,
            onRetry: presenter.fetchOrders,
          );
        }

        if (presenter.orders.value.isEmpty) {
          return OrdersEmptyState(onLogout: presenter.logout);
        }

        return m.RefreshIndicator(
          onRefresh: presenter.fetchOrders,
          child: CustomScrollView(
            physics: const m.AlwaysScrollableScrollPhysics(),
            slivers: [
              SliverToBoxAdapter(
                child: OrdersHeader(
                  formattedDocument: presenter.formattedDocument.value,
                  onLogout: presenter.logout,
                ),
              ),
              SliverToBoxAdapter(
                child: OrdersList(orders: presenter.sortedOrders.value),
              ),
              const SliverPadding(padding: EdgeInsets.only(bottom: 24)),
            ],
          ),
        );
      }),
    );
  }
}
