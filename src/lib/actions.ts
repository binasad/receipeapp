'use server';

import {
  generateRecipesFromIngredients,
  type GenerateRecipesFromIngredientsOutput,
} from '@/ai/flows/generate-recipes-from-ingredients';
import { PlaceHolderImages } from './placeholder-images';
import { generateImagesForRecipes, type RecipeForImages } from '@/ai/flows/generate-images-for-recipes';

export type RecipeBase = GenerateRecipesFromIngredientsOutput['recipes'][0];
export type Recipe = RecipeBase & { imageUrl?: string; imageHint?: string };

export async function getRecipesAction(ingredients: string[]): Promise<{
  recipes: Recipe[];
  error?: string;
}> {
  if (ingredients.length === 0) {
    return { recipes: [], error: 'Please add some ingredients first.' };
  }

  try {
    const result = await generateRecipesFromIngredients({
      ingredients: ingredients.join(', '),
    });
    if (!result.recipes || result.recipes.length === 0) {
      return { recipes: [], error: 'Could not find any recipes with these ingredients. Try adding more!' };
    }

    // Attach an image (or image hint) to each recipe.
    // Simple heuristic: try to match placeholder images by keywords from the recipe name or ingredients.
    const mapRecipeWithImage = (recipe: RecipeBase): Recipe => {
      const haystack = (recipe.name + ' ' + (recipe.ingredients || []).join(' ')).toLowerCase();

      // Score placeholder images by keyword presence
      let best = null as null | typeof PlaceHolderImages[0];
      let bestScore = 0;
      for (const img of PlaceHolderImages) {
        const target = (img.imageHint + ' ' + img.description).toLowerCase();
        let score = 0;
        for (const token of target.split(/[^a-z0-9]+/)) {
          if (!token) continue;
          if (haystack.includes(token)) score += 1;
        }
        if (score > bestScore) {
          bestScore = score;
          best = img;
        }
      }

      // If no strong match found, pick a random placeholder as fallback
      if (!best) {
        best = PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)];
      }

      return {
        ...recipe,
        imageUrl: best.imageUrl,
        imageHint: best.imageHint,
      };
    };

    let recipesWithImages: Recipe[] = result.recipes.map(mapRecipeWithImage);

    // Optionally generate AI images. This is behind an env flag so it won't run by default.
    if (process.env.GENERATE_AI_IMAGES === 'true') {
      try {
        // Map to a minimal shape expected by the generator
        const minimal: RecipeForImages[] = recipesWithImages.map(r => ({
          name: r.name,
          ingredients: r.ingredients,
          instructions: r.instructions,
          imageUrl: r.imageUrl,
          imageHint: r.imageHint,
        }));

        const withGenerated = await generateImagesForRecipes(minimal);
        // Merge generated imageUrl back onto recipes (preserve other fields)
        recipesWithImages = recipesWithImages.map(r => {
          const gen = withGenerated.find(g => g.name === r.name);
          if (gen && gen.imageUrl) {
            return { ...r, imageUrl: gen.imageUrl, imageHint: gen.imageHint || r.imageHint };
          }
          return r;
        });
      } catch (e) {
        // Log and continue with placeholder images if AI generation fails.
        console.error('AI image generation failed, falling back to placeholders:', e);
      }
    }

    return { recipes: recipesWithImages };
  } catch (e) {
    console.error(e);
    return {
      recipes: [],
      error: 'Something went wrong while generating recipes. Please try again.',
    };
  }
}
