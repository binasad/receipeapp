'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { type Recipe } from '@/lib/actions';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [image, setImage] = useState<ImagePlaceholder | null>(null);

  useEffect(() => {
    // Prefer an image included on the recipe (server-provided). If none, select a random placeholder on the client to avoid hydration mismatch.
    if ((recipe as any).imageUrl) {
      setImage({
        id: `${recipe.name}-generated`,
        description: recipe.name,
        imageUrl: (recipe as any).imageUrl,
        imageHint: (recipe as any).imageHint || recipe.name,
      });
      return;
    }

    setImage(PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)]);
  }, []);

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="relative aspect-[4/3] w-full">
      {image && (
          <Image
            src={image.imageUrl}
            alt={recipe.name}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
      )}
      </div>
      <CardHeader>
        <CardTitle className="font-headline">{recipe.name}</CardTitle>
        <CardDescription>A delightful recipe based on your ingredients.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="ingredients">
            <AccordionTrigger>Ingredients</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {recipe.ingredients.map((ingredient) => (
                  <Badge key={ingredient} variant="outline">{ingredient}</Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="instructions">
            <AccordionTrigger>Instructions</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-sm">
                {recipe.instructions.split('\n').filter(line => line.trim()).map((line, index) =>
                  <p key={index}>{line}</p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
