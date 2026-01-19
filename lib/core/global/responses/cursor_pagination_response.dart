class CursorPaginationResponse<Item> {
  final List<Item> _items;
  final String? _nextCursor;

  CursorPaginationResponse({required List<Item> items, String? nextCursor})
    : _items = items,
      _nextCursor = nextCursor;

  List<Item> get items => _items;

  String? get nextCursor => _nextCursor;

  bool get hasNextPage => _nextCursor != null;
}
