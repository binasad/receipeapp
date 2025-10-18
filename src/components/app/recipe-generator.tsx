'use client';

import { useState } from 'react';
import { getRecipesAction, type Recipe } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import IngredientManager from './ingredient-manager';
import RecipeList from './recipe-list';

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState<string[]>(['Tomatoes', 'Cheese', 'Basil']);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateRecipes = async () => {
    setIsLoading(true);
    setError(null);
    setRecipes([]);

    const result = await getRecipesAction(ingredients);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: result.error,
      });
      setError(result.error);
    } else {
      setRecipes(result.recipes);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <IngredientManager
        ingredients={ingredients}
        setIngredients={setIngredients}
        onGenerate={handleGenerateRecipes}
        isLoading={isLoading}
      />
      <RecipeList recipes={recipes} isLoading={isLoading} error={error} />
    </div>
  );
}
