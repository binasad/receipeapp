import { type Recipe } from '@/lib/actions';
import RecipeCard from './recipe-card';
import RecipeCardSkeleton from './recipe-card-skeleton';
import { UtensilsCrossed } from 'lucide-react';

type RecipeListProps = {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
};

export default function RecipeList({ recipes, isLoading, error }: RecipeListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error && recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 rounded-lg bg-card border">
        <UtensilsCrossed className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-headline mb-2">No Recipes Found</h2>
        <p className="text-muted-foreground max-w-md">{error}</p>
      </div>
    );
  }

  if (!isLoading && recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 rounded-lg bg-card border">
        <UtensilsCrossed className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-headline mb-2">Ready to Cook?</h2>
        <p className="text-muted-foreground">Your delicious recipes will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-headline mb-6">Your Recipes</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe, index) => (
          <RecipeCard key={recipe.name + index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
