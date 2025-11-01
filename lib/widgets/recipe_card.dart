import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../models/recipe.dart';

class RecipeCard extends StatefulWidget {
  final Recipe recipe;

  const RecipeCard({super.key, required this.recipe});

  @override
  State<RecipeCard> createState() => _RecipeCardState();
}

class _RecipeCardState extends State<RecipeCard> {
  bool _isExpanded = false;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min, // Changed from default to min
        children: [
          // Recipe Image
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
            child: Container(
              height: 200, // Fixed height instead of AspectRatio
              width: double.infinity,
              child: _buildRecipeImage(),
            ),
          ),
          // Recipe Content
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min, // Changed from default to min
              children: [
                Text(
                  widget.recipe.name,
                  style: Theme.of(context).textTheme.titleLarge,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 8),
                Text(
                  'A delightful recipe based on your ingredients.',
                  style: Theme.of(
                    context,
                  ).textTheme.bodyMedium?.copyWith(color: Colors.grey[600]),
                ),
                const SizedBox(height: 12),
                // Recipe Meta Info
                Row(
                  children: [
                    if (widget.recipe.prepTime != null) ...[
                      Icon(
                        Icons.access_time,
                        size: 16,
                        color: Colors.grey[600],
                      ),
                      const SizedBox(width: 4),
                      Text(
                        '${widget.recipe.prepTime} min',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                      const SizedBox(width: 16),
                    ],
                    if (widget.recipe.servings != null) ...[
                      Icon(Icons.people, size: 16, color: Colors.grey[600]),
                      const SizedBox(width: 4),
                      Text(
                        '${widget.recipe.servings} servings',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ],
                ),
                const SizedBox(height: 12),
                // Expandable Content - Removed Expanded wrapper
                Column(
                  children: [
                    // Ingredients Section
                    _buildExpandableSection(
                      title: 'Ingredients',
                      content: Wrap(
                        spacing: 6,
                        runSpacing: 6,
                        children: widget.recipe.ingredients.map((
                          ingredient,
                        ) {
                          return Chip(
                            label: Text(
                              ingredient,
                              style: const TextStyle(fontSize: 12),
                            ),
                            backgroundColor: const Color(0xFFF5F5F5),
                            materialTapTargetSize:
                                MaterialTapTargetSize.shrinkWrap,
                          );
                        }).toList(),
                      ),
                    ),
                    const SizedBox(height: 12),
                    // Instructions Section
                    _buildExpandableSection(
                      title: 'Instructions',
                      content: Text(
                        widget.recipe.instructions,
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRecipeImage() {
    // Use placeholder images or random food images
    final placeholderImages = [
      'https://images.unsplash.com/photo-1722938687772-62a0dbfacc25?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1620256114757-322387444c16?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1736013061975-163957935b1a?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1692812472060-c15ca30af036?w=400&h=300&fit=crop',
    ];

    final imageUrl =
        widget.recipe.imageUrl ??
        placeholderImages[widget.recipe.name.hashCode %
            placeholderImages.length];

    return CachedNetworkImage(
      imageUrl: imageUrl,
      fit: BoxFit.cover,
      placeholder: (context, url) => Container(
        color: Colors.grey[200],
        child: const Center(child: CircularProgressIndicator()),
      ),
      errorWidget: (context, url, error) => Container(
        color: Colors.grey[200],
        child: const Icon(Icons.restaurant, size: 48, color: Colors.grey),
      ),
    );
  }

  Widget _buildExpandableSection({
    required String title,
    required Widget content,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        InkWell(
          onTap: () {
            setState(() {
              _isExpanded = !_isExpanded;
            });
          },
          child: Row(
            children: [
              Text(
                title,
                style: Theme.of(
                  context,
                ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600),
              ),
              const Spacer(),
              Icon(
                _isExpanded ? Icons.expand_less : Icons.expand_more,
                color: Colors.grey[600],
              ),
            ],
          ),
        ),
        if (_isExpanded) ...[const SizedBox(height: 8), content],
      ],
    );
  }
}
