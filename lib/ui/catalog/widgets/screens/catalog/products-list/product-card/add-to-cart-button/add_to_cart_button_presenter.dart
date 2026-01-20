import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals/signals.dart';

class AddToCartButtonPresenter {
  final VoidCallback onAddToCart;

  final isLoading = signal(false);

  AddToCartButtonPresenter(this.onAddToCart);

  Future<void> handlePress() async {
    if (isLoading.value) return;

    isLoading.value = true;
    try {
      // Simulate async action if necessary or just call callback
      // Since callback might trigger async process, we might want to wait for it?
      // For now, let's assume immediate callback execution but simulate UI feedback.
      onAddToCart();

      // If the callback returns a Future, we should await it.
      // But VoidCallback is sync.
      // If we want async handling, we might need a different typedef or just handle purely UI state here.
      // Let's add a small delay for feedback if instantaneous, or assume the parent handles state.
      // Spec says: "Seta isLoading.value = true, executa callback, seta isLoading.value = false"

      // Let's just run it. Using microtask to prevent lock if it were heavy.
      await Future.delayed(const Duration(milliseconds: 200));
    } finally {
      isLoading.value = false;
    }
  }
}

final addToCartButtonPresenterProvider = Provider.autoDispose
    .family<AddToCartButtonPresenter, VoidCallback>((ref, onAddToCart) {
      return AddToCartButtonPresenter(onAddToCart);
    });
