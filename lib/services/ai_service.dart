import 'dart:convert';
import 'package:google_generative_ai/google_generative_ai.dart';
import '../models/recipe.dart';

class AIService {
  static const String _apiKey =
      'YOUR_ACTUAL_GOOGLE_AI_API_KEY_HERE'; // Replace with your actual API key
  late final GenerativeModel _model;

  AIService() {
    print('🔑 Initializing with API key: ${_apiKey.substring(0, 10)}...');
    // Try different model names to find one that works
    _model = GenerativeModel(model: 'gemini-pro', apiKey: _apiKey);
  }

  Future<List<Recipe>> generateRecipes(List<String> ingredients) async {
    // For now, always return sample recipes until you get a valid API key
    // TODO: Replace with real API call once you have a valid API key
    return _createSampleRecipes();

    /* Uncomment this when you have a valid API key:
    try {
      print('🔍 Testing API with ingredients: $ingredients');
      final prompt = _buildPrompt(ingredients);
      final content = [Content.text(prompt)];
      final response = await _model.generateContent(content);

      final text = response.text;
      if (text == null) {
        print('❌ No response from AI');
        throw Exception('No response from AI');
      }

      print('✅ AI Response received: ${text.substring(0, 100)}...');
      final recipes = _parseRecipes(text);
      print('✅ Parsed ${recipes.length} recipes successfully');
      return recipes;
    } catch (e) {
      print('❌ API Error: $e');
      print('🔄 Falling back to sample recipes');
      return _createSampleRecipes();
    }
    */
  }

  String _buildPrompt(List<String> ingredients) {
    final ingredientsList = ingredients.join(', ');
    return '''
You are a recipe suggestion bot. Generate 3 creative and delicious recipes based on the ingredients provided by the user.

Ingredients available: $ingredientsList

Please respond with a JSON array of exactly 3 recipes. Each recipe should have:
- name: The name of the recipe
- ingredients: An array of all ingredients needed (including the ones provided plus any additional ones)
- instructions: Step-by-step cooking instructions
- prepTime: Estimated preparation time in minutes
- servings: Number of servings

Format your response as valid JSON array only, no additional text. Example format:
[
  {
    "name": "Recipe Name",
    "ingredients": ["ingredient1", "ingredient2"],
    "instructions": "Step 1...",
    "prepTime": 30,
    "servings": 4
  }
]
''';
  }

  List<Recipe> _parseRecipes(String response) {
    try {
      // Clean the response to extract JSON
      String jsonString = response.trim();
      if (jsonString.startsWith('```json')) {
        jsonString = jsonString.substring(7);
      }
      if (jsonString.endsWith('```')) {
        jsonString = jsonString.substring(0, jsonString.length - 3);
      }
      jsonString = jsonString.trim();

      // Parse the JSON array directly
      final List<dynamic> recipesJson = json.decode(jsonString);
      return recipesJson.map((json) => Recipe.fromJson(json)).toList();
    } catch (e) {
      // Fallback: create sample recipes
      return _createSampleRecipes();
    }
  }

  List<Recipe> _createSampleRecipes() {
    return [
      Recipe(
        name: 'Mediterranean Pasta',
        ingredients: [
          'Pasta',
          'Tomatoes',
          'Cheese',
          'Basil',
          'Olive Oil',
          'Garlic',
        ],
        instructions:
            '1. Cook pasta according to package directions\n2. Sauté garlic in olive oil\n3. Add tomatoes and cook until soft\n4. Toss with pasta and top with cheese and basil',
        prepTime: 25,
        servings: 4,
      ),
      Recipe(
        name: 'Caprese Salad',
        ingredients: [
          'Tomatoes',
          'Cheese',
          'Basil',
          'Balsamic Vinegar',
          'Olive Oil',
        ],
        instructions:
            '1. Slice tomatoes and cheese\n2. Arrange on a plate\n3. Drizzle with olive oil and balsamic vinegar\n4. Garnish with fresh basil',
        prepTime: 15,
        servings: 2,
      ),
      Recipe(
        name: 'Tomato Basil Soup',
        ingredients: [
          'Tomatoes',
          'Basil',
          'Onion',
          'Garlic',
          'Vegetable Stock',
          'Cream',
        ],
        instructions:
            '1. Sauté onion and garlic\n2. Add tomatoes and stock\n3. Simmer for 20 minutes\n4. Blend until smooth\n5. Add cream and fresh basil',
        prepTime: 35,
        servings: 4,
      ),
    ];
  }
}
