import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

class AddToCartButtonPresenter {
  final void Function(BuildContext) onAddToCart;

  final isLoading = signal(false);

  AddToCartButtonPresenter(this.onAddToCart);

  Future<void> handlePress(BuildContext context) async {
    if (isLoading.value) return;

    isLoading.value = true;
    try {
      onAddToCart(context);
      await Future.delayed(const Duration(milliseconds: 200));
    } finally {
      isLoading.value = false;
    }
  }
}

final addToCartButtonPresenterProvider = Provider.autoDispose
    .family<AddToCartButtonPresenter, void Function(BuildContext)>((
      ref,
      onAddToCart,
    ) {
      return AddToCartButtonPresenter(onAddToCart);
    });
