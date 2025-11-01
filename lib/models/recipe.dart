class Recipe {
  final String name;
  final List<String> ingredients;
  final String instructions;
  final String? imageUrl;
  final int? prepTime;
  final int? servings;

  Recipe({
    required this.name,
    required this.ingredients,
    required this.instructions,
    this.imageUrl,
    this.prepTime,
    this.servings,
  });

  factory Recipe.fromJson(Map<String, dynamic> json) {
    return Recipe(
      name: json['name'] ?? '',
      ingredients: List<String>.from(json['ingredients'] ?? []),
      instructions: json['instructions'] ?? '',
      imageUrl: json['imageUrl'],
      prepTime: json['prepTime'],
      servings: json['servings'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'ingredients': ingredients,
      'instructions': instructions,
      'imageUrl': imageUrl,
      'prepTime': prepTime,
      'servings': servings,
    };
  }
}
