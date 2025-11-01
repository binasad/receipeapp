import { ChefHat } from 'lucide-react';
import RecipeGenerator from '@/components/app/recipe-generator';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <ChefHat className="h-7 w-7 text-primary" />
          <span className="text-2xl font-display font-bold tracking-tight">Fridge Feast</span>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <RecipeGenerator />
      </main>
    </div>
  );
}
