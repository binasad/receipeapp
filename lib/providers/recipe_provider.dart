import 'package:flutter/foundation.dart';
import 'package:google_generative_ai/google_generative_ai.dart';
import '../models/recipe.dart';
import '../services/ai_service.dart';

class RecipeProvider extends ChangeNotifier {
  final AIService _aiService = AIService();

  List<Recipe> _recipes = [];
  bool _isLoading = false;
  String? _error;

  List<Recipe> get recipes => _recipes;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> generateRecipes(List<String> ingredients) async {
    if (ingredients.isEmpty) {
      _error = 'Please add some ingredients first.';
      notifyListeners();
      return;
    }

    _isLoading = true;
    _error = null;
    _recipes = [];
    notifyListeners();

    try {
      final generatedRecipes = await _aiService.generateRecipes(ingredients);
      _recipes = generatedRecipes;
      _error = null;
    } catch (e) {
      _error = 'Failed to generate recipes. Please try again.';
      _recipes = [];
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void clearRecipes() {
    _recipes = [];
    _error = null;
    notifyListeners();
  }
}
