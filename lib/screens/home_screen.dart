import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/ingredient_provider.dart';
import '../providers/recipe_provider.dart';
import '../widgets/ingredient_manager.dart';
import '../widgets/recipe_list.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            const Icon(Icons.restaurant_menu, color: Color(0xFFFFB800)),
            const SizedBox(width: 8),
            Text(
              'Fridge Feast',
              style: Theme.of(context).textTheme.displaySmall,
            ),
          ],
        ),
        backgroundColor: const Color(0xFFFFF8E1),
        elevation: 0,
      ),
      backgroundColor: const Color(0xFFFFF8E1),
      body: const SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [IngredientManager(), SizedBox(height: 24), RecipeList()],
        ),
      ),
    );
  }
}
