'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Search, Sparkles, ShoppingBasket } from 'lucide-react';

type IngredientManagerProps = {
  ingredients: string[];
  setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
  onGenerate: () => void;
  isLoading: boolean;
};

export default function IngredientManager({
  ingredients,
  setIngredients,
  onGenerate,
  isLoading,
}: IngredientManagerProps) {
  const [newIngredient, setNewIngredient] = useState('');
  const [filter, setFilter] = useState('');

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIngredient && !ingredients.map(i => i.toLowerCase()).includes(newIngredient.toLowerCase())) {
      setIngredients([...ingredients, newIngredient.charAt(0).toUpperCase() + newIngredient.slice(1)]);
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredientToRemove));
  };

  const filteredIngredients = useMemo(() => {
    return ingredients.filter((i) => i.toLowerCase().includes(filter.toLowerCase()));
  }, [ingredients, filter]);

  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <ShoppingBasket className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Your Ingredients</CardTitle>
        </div>
        <CardDescription>
          Add the ingredients you have on hand, then generate recipes!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddIngredient} className="flex gap-2 mb-4">
          <Input
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="e.g., Chicken breast, eggs..."
            className="flex-grow"
          />
          <Button type="submit">Add</Button>
        </form>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search your ingredients..."
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap gap-2 min-h-[40px] mb-6">
          {filteredIngredients.map((ingredient) => (
            <Badge key={ingredient} variant="secondary" className="text-sm py-1 pl-3 pr-1">
              {ingredient}
              <button
                onClick={() => handleRemoveIngredient(ingredient)}
                className="ml-2 rounded-full p-0.5 hover:bg-muted-foreground/20"
                aria-label={`Remove ${ingredient}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <Button onClick={onGenerate} disabled={isLoading || ingredients.length === 0} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          {isLoading ? (
            'Generating...'
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Recipes
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
