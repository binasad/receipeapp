import 'package:flutter/foundation.dart';

class IngredientProvider extends ChangeNotifier {
  final List<String> _ingredients = ['Tomatoes', 'Cheese', 'Basil'];
  String _searchQuery = '';

  List<String> get ingredients => _ingredients;
  String get searchQuery => _searchQuery;

  List<String> get filteredIngredients {
    if (_searchQuery.isEmpty) return _ingredients;
    return _ingredients
        .where(
          (ingredient) =>
              ingredient.toLowerCase().contains(_searchQuery.toLowerCase()),
        )
        .toList();
  }

  void addIngredient(String ingredient) {
    final trimmedIngredient = ingredient.trim();
    if (trimmedIngredient.isNotEmpty &&
        !_ingredients.any(
          (i) => i.toLowerCase() == trimmedIngredient.toLowerCase(),
        )) {
      _ingredients.add(trimmedIngredient);
      notifyListeners();
    }
  }

  void removeIngredient(String ingredient) {
    _ingredients.remove(ingredient);
    notifyListeners();
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  void clearSearch() {
    _searchQuery = '';
    notifyListeners();
  }

  void clearAllIngredients() {
    _ingredients.clear();
    notifyListeners();
  }
}
