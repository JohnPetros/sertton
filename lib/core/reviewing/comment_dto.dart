import 'package:sertton/core/reviewing/author_dto.dart';

class CommentDto {
  final String productId;
  final String? parentCommentId;
  final String message;
  final AuthorDto author;

  CommentDto({
    required this.productId,
    this.parentCommentId,
    required this.message,
    required this.author,
  });
}
