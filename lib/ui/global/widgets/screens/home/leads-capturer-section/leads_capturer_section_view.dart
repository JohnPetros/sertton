import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';
import 'package:signals/signals_flutter.dart';

import 'package:sertton/ui/global/widgets/screens/home/leads-capturer-section/leads_capturer_section_presenter.dart';

class LeadsCapturerSectionView extends ConsumerStatefulWidget {
  const LeadsCapturerSectionView({super.key});

  @override
  ConsumerState<LeadsCapturerSectionView> createState() =>
      _LeadsCapturerSectionViewState();
}

class _LeadsCapturerSectionViewState
    extends ConsumerState<LeadsCapturerSectionView> {
  late final TextEditingController _emailController;

  @override
  void initState() {
    super.initState();
    _emailController = TextEditingController();

    effect(() {
      final presenter = ref.read(leadsCapturerSectionPresenterProvider);
      final emailValue = presenter.email.value;
      if (emailValue != _emailController.text) {
        _emailController.text = emailValue;
      }
    });
  }

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final presenter = ref.watch(leadsCapturerSectionPresenterProvider);
    final theme = Theme.of(context);

    return Watch((context) {
      final isLoading = presenter.isLoading.value;
      final errorMessage = presenter.errorMessage.value;
      final successMessage = presenter.successMessage.value;

      return Container(
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 32),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              theme.colorScheme.primary,
              Color.lerp(
                    theme.colorScheme.primary,
                    const Color(0xFF000000),
                    0.2,
                  ) ??
                  theme.colorScheme.primary,
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(24),
          boxShadow: [
            BoxShadow(
              color: theme.colorScheme.primary.withValues(alpha: 0.4),
              blurRadius: 24,
              offset: const Offset(0, 12),
              spreadRadius: -4,
            ),
          ],
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 40),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Center(
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFFFFFF).withValues(alpha: 0.15),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.mark_email_unread_outlined,
                    size: 32,
                    color: Color(0xFFFFFFFF),
                  ),
                ),
              ),
              const SizedBox(height: 24),

              const Text(
                'Receba novidades e\nofertas incríveis',
                style: TextStyle(
                  fontSize: 26,
                  color: Color(0xFFFFFFFF),
                  fontWeight: FontWeight.w800,
                  height: 1.2,
                  letterSpacing: -0.5,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),

              Text(
                'Cadastre-se na nossa newsletter e fique por dentro dos lançamentos exclusivos da loja.',
                style: TextStyle(
                  fontSize: 16,
                  color: const Color(0xFFFFFFFF).withValues(alpha: 0.85),
                  height: 1.5,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 32),

              if (successMessage != null) ...[
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFF22C55E).withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: const Color(0xFF22C55E).withValues(alpha: 0.5),
                      width: 1,
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(
                        Icons.check_circle,
                        color: Color(0xFFFFFFFF),
                        size: 20,
                      ),
                      const SizedBox(width: 8),
                      Flexible(
                        child: Text(
                          successMessage,
                          style: const TextStyle(
                            color: Color(0xFFFFFFFF),
                            fontWeight: FontWeight.w600,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
              ],

              // Error Message
              if (errorMessage != null) ...[
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFEF4444).withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: const Color(0xFFEF4444).withValues(alpha: 0.5),
                      width: 1,
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(
                        Icons.error_outline,
                        color: Color(0xFFFFFFFF),
                        size: 20,
                      ),
                      const SizedBox(width: 8),
                      Flexible(
                        child: Text(
                          errorMessage,
                          style: const TextStyle(
                            color: Color(0xFFFFFFFF),
                            fontWeight: FontWeight.w600,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
              ],

              TextField(
                controller: _emailController,
                placeholder: const Text('Digite seu melhor e-mail'),
                keyboardType: TextInputType.emailAddress,
                enabled: !isLoading,
                onChanged: (value) => presenter.email.value = value,
                onSubmitted: (_) => presenter.submitLead(),
                decoration: const BoxDecoration(
                  color: Color(0xFFFFFFFF),
                  borderRadius: BorderRadius.all(Radius.circular(8)),
                ),
                style: const TextStyle(color: Color(0xFF000000), fontSize: 16),
              ),
              const SizedBox(height: 16),

              Button.secondary(
                onPressed: isLoading ? null : () => presenter.submitLead(),
                child: isLoading
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: Colors.black,
                        ),
                      )
                    : const Text(
                        'Inscreva-se',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 0.5,
                        ),
                      ),
              ),
            ],
          ),
        ),
      );
    });
  }
}
