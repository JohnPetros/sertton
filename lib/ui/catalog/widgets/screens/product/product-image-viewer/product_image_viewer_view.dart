import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class ProductImageViewerView extends ConsumerWidget {
  final String imageUrl;
  final String productName;

  const ProductImageViewerView({
    super.key,
    required this.imageUrl,
    required this.productName,
  });

  void _showZoom(BuildContext context) {
    showDialog(
      context: context,
      barrierColor: const Color(0xFF000000).withValues(alpha: 0.9),
      builder: (context) {
        return Stack(
          children: [
            Center(
              child: InteractiveViewer(
                minScale: 0.5,
                maxScale: 4.0,
                child: Image.network(imageUrl, fit: BoxFit.contain),
              ),
            ),
            Positioned(
              top: 40,
              right: 16,
              child: GestureDetector(
                onTap: () => Navigator.of(context).pop(),
                child: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: const Color(0xFF000000).withValues(alpha: 0.5),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(
                    RadixIcons.cross2,
                    color: Colors.white,
                    size: 24,
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);

    return GestureDetector(
      onTap: () => _showZoom(context),
      child: Stack(
        children: [
          // Main image
          ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: Image.network(
              imageUrl,
              width: double.infinity,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) {
                return Container(
                  width: double.infinity,
                  height: 300,
                  decoration: BoxDecoration(
                    color: theme.colorScheme.muted,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    RadixIcons.image,
                    size: 48,
                    color: theme.colorScheme.mutedForeground,
                  ),
                );
              },
            ),
          ),
          // Zoom indicator
          Positioned(
            top: 12,
            left: 12,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
              decoration: BoxDecoration(
                color: const Color(0xFF000000).withValues(alpha: 0.6),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    RadixIcons.zoomIn,
                    size: 16,
                    color: theme.colorScheme.primaryForeground,
                  ),
                  const SizedBox(width: 4),
                  Text(
                    'Pressione para zoom',
                    style: theme.typography.small.copyWith(
                      color: theme.colorScheme.primaryForeground,
                      fontSize: 11,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
