import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/ingredient_provider.dart';
import '../providers/recipe_provider.dart';

class IngredientManager extends StatefulWidget {
  const IngredientManager({super.key});

  @override
  State<IngredientManager> createState() => _IngredientManagerState();
}

class _IngredientManagerState extends State<IngredientManager> {
  final TextEditingController _ingredientController = TextEditingController();

  @override
  void dispose() {
    _ingredientController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Consumer2<IngredientProvider, RecipeProvider>(
      builder: (context, ingredientProvider, recipeProvider, child) {
        return Card(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Icon(Icons.shopping_basket, color: Color(0xFFFFB800)),
                    const SizedBox(width: 12),
                    Text(
                      'Your Ingredients',
                      style: Theme.of(context).textTheme.headlineLarge,
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  'Add the ingredients you have on hand, then generate recipes!',
                  style: Theme.of(
                    context,
                  ).textTheme.bodyLarge?.copyWith(color: Colors.grey[600]),
                ),
                const SizedBox(height: 20),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _ingredientController,
                        decoration: const InputDecoration(
                          hintText: 'e.g., Chicken breast, eggs...',
                          border: OutlineInputBorder(),
                        ),
                        onSubmitted: (value) =>
                            _addIngredient(ingredientProvider),
                      ),
                    ),
                    const SizedBox(width: 12),
                    ElevatedButton(
                      onPressed: () => _addIngredient(ingredientProvider),
                      child: const Text('Add'),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                TextField(
                  decoration: InputDecoration(
                    hintText: 'Search your ingredients...',
                    prefixIcon: const Icon(Icons.search),
                    border: const OutlineInputBorder(),
                  ),
                  onChanged: ingredientProvider.setSearchQuery,
                ),
                const SizedBox(height: 16),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: ingredientProvider.filteredIngredients.map((
                    ingredient,
                  ) {
                    return Chip(
                      label: Text(ingredient),
                      deleteIcon: const Icon(Icons.close, size: 18),
                      onDeleted: () =>
                          ingredientProvider.removeIngredient(ingredient),
                      backgroundColor: const Color(0xFFF5F5F5),
                      deleteIconColor: Colors.grey[600],
                    );
                  }).toList(),
                ),
                const SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed:
                        ingredientProvider.ingredients.isEmpty ||
                            recipeProvider.isLoading
                        ? null
                        : () => _generateRecipes(
                            ingredientProvider,
                            recipeProvider,
                          ),
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      backgroundColor: const Color(0xFFD46A00),
                    ),
                    child: recipeProvider.isLoading
                        ? const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              SizedBox(
                                width: 20,
                                height: 20,
                                child: CircularProgressIndicator(
                                  color: Colors.white,
                                  strokeWidth: 2,
                                ),
                              ),
                              SizedBox(width: 12),
                              Text('Generating...'),
                            ],
                          )
                        : const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.auto_awesome),
                              SizedBox(width: 8),
                              Text('Generate Recipes'),
                            ],
                          ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  void _addIngredient(IngredientProvider ingredientProvider) {
    final ingredient = _ingredientController.text.trim();
    if (ingredient.isNotEmpty) {
      ingredientProvider.addIngredient(ingredient);
      _ingredientController.clear();
    }
  }

  void _generateRecipes(
    IngredientProvider ingredientProvider,
    RecipeProvider recipeProvider,
  ) {
    recipeProvider.generateRecipes(ingredientProvider.ingredients);
  }
}
