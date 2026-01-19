import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/global/widgets/screens/home/home_screen_presenter.dart';

class HomeScreenView extends ConsumerWidget {
  const HomeScreenView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final presenter = ref.read(presenterProvider((userId: '')));

    return Center(child: Text("${presenter.count.value}"));
  }
}
