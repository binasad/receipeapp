'use server';

import {
  generateRecipesFromIngredients,
  type GenerateRecipesFromIngredientsOutput,
} from '@/ai/flows/generate-recipes-from-ingredients';

export type Recipe = GenerateRecipesFromIngredientsOutput['recipes'][0];

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
    return { recipes: result.recipes };
  } catch (e) {
    console.error(e);
    return {
      recipes: [],
      error: 'Something went wrong while generating recipes. Please try again.',
    };
  }
}
