import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sertton/ui/global/widgets/app-search-bar/app_search_bar_presenter.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class AppSearchBarView extends ConsumerStatefulWidget {
  final bool readOnly;
  final VoidCallback? onTap;
  final Function(String)? onSubmitted;
  final String? initialValue;
  final bool autoFocus;
  final ValueChanged<String>? onChanged;

  const AppSearchBarView({
    super.key,
    this.readOnly = false,
    this.onTap,
    this.onSubmitted,
    this.initialValue,
    this.autoFocus = false,
    this.onChanged,
  });

  @override
  ConsumerState<AppSearchBarView> createState() => _AppSearchBarViewState();
}

class _AppSearchBarViewState extends ConsumerState<AppSearchBarView> {
  late final TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initialValue);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  void didUpdateWidget(covariant AppSearchBarView oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.initialValue != oldWidget.initialValue) {
      _controller.text = widget.initialValue ?? '';
    }
  }

  void _handleSubmit() {
    final presenter = ref.read(
      appSearchBarPresenterProvider((
        onSubmitted: widget.onSubmitted,
        onTap: widget.onTap,
        readOnly: widget.readOnly,
      )),
    );
    presenter.submit(_controller.text);
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 48,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Expanded(
            child: TextField(
              controller: _controller,
              placeholder: const Text('Exemplo: Arremate'),
              readOnly: widget.readOnly,
              onTap: widget.onTap,
              onSubmitted: (_) => _handleSubmit(),
              onChanged: widget.onChanged,
              autofocus: widget.autoFocus,
            ),
          ),
          const SizedBox(width: 4),
          Button.primary(
            onPressed: _handleSubmit,
            child: const Icon(Icons.search, size: 24, color: Colors.white),
          ),
        ],
      ),
    );
  }
}
