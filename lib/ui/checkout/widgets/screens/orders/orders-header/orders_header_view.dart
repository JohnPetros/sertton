import 'package:shadcn_flutter/shadcn_flutter.dart';

class OrdersHeaderView extends StatelessWidget {
  final String formattedDocument;
  final VoidCallback onLogout;

  const OrdersHeaderView({
    super.key,
    required this.formattedDocument,
    required this.onLogout,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    const brandBlue = Color(0xFF46A6D2);

    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                child: Text(
                  formattedDocument,
                  style: theme.typography.h2.copyWith(
                    color: brandBlue,
                    fontWeight: FontWeight.w500,
                    fontSize: 24,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              GestureDetector(
                onTap: onLogout,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 8,
                  ),
                  decoration: BoxDecoration(
                    color: brandBlue,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    'Alterar documento',
                    style: theme.typography.p.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }
}
