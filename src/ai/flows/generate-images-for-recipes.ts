/*
 * Optional AI image generation for recipes.
 *
 * This flow attempts to generate an image for each recipe using the GenKit `ai` instance
 * (configured in `src/ai/genkit.ts`). It is intentionally defensive:
 * - It only runs when the environment variable `GENERATE_AI_IMAGES` is set to "true".
 * - If the configured `ai` object exposes an images API (checked at runtime), it will call it.
 * - If the images API isn't available or an error occurs, the function throws a descriptive error
 *   that callers should catch so the app can fall back to placeholders.
 *
 * NOTE: To enable actual image generation you need provider credentials (for Google GenAI etc.).
 * Place them in `.env.local` (do NOT commit secrets). Example variables that may be required:
 * - GOOGLE_API_KEY or GENAI_API_KEY depending on provider
 *
 * This file returns image URLs (absolute or data URLs) that can be attached to recipe objects.
 */

import { ai } from '@/ai/genkit';

export type RecipeForImages = {
  name: string;
  ingredients: string[];
  instructions?: string;
  // optional existing image fields (may come from placeholder mapping)
  imageUrl?: string;
  imageHint?: string;
};

export async function generateImagesForRecipes(recipes: RecipeForImages[]): Promise<RecipeForImages[]> {
  if (!process.env.GENERATE_AI_IMAGES || process.env.GENERATE_AI_IMAGES !== 'true') {
    throw new Error('AI image generation is disabled. Set GENERATE_AI_IMAGES=true to enable.');
  }

  // Check if the `ai` instance appears to support image generation.
  // Different genkit plugins may expose different methods; check common possibilities.
  const hasImageApi = !!((ai as any).images || (ai as any).image || (ai as any).images?.generate || (ai as any).image?.create);

  if (!hasImageApi) {
    throw new Error('The configured GenKit `ai` instance does not expose an image API. Ensure your GenKit provider supports image generation and is configured.');
  }

  const out: RecipeForImages[] = [];

  for (const recipe of recipes) {
    // Build a descriptive prompt for image generation
    const ingredientsText = (recipe.ingredients || []).slice(0, 6).join(', ');
    const prompt = `Photorealistic food photography of ${recipe.name}. Include: ${ingredientsText}. Style: bright natural lighting, shallow depth of field, 4k, appetizing composition.`;

    try {
      // Try common entrypoints for image generation supported by genkit plugins.
      // We don't rely on a single API name to keep this code portable; prefer image data URL or URL if available.
      let imageResult: any = null;

      if ((ai as any).images && typeof (ai as any).images.generate === 'function') {
        imageResult = await (ai as any).images.generate({ prompt, size: '1024x1024', format: 'png' });
      } else if ((ai as any).image && typeof (ai as any).image.create === 'function') {
        imageResult = await (ai as any).image.create({ prompt, size: '1024x1024', format: 'png' });
      } else if ((ai as any).images && typeof (ai as any).images.create === 'function') {
        imageResult = await (ai as any).images.create({ prompt, size: '1024x1024', format: 'png' });
      } else {
        throw new Error('No supported images API found on GenKit ai instance.');
      }

      // Heuristics to extract a usable URL or base64. Different providers return different shapes.
      let imageUrl: string | undefined;
      if (!imageResult) throw new Error('No image result returned from provider.');

      // 1) direct URL
      if (imageResult.url) imageUrl = imageResult.url;

      // 2) data / base64
      if (!imageUrl && imageResult.base64) {
        imageUrl = `data:image/png;base64,${imageResult.base64}`;
      }

      // 3) array of artifacts
      if (!imageUrl && Array.isArray(imageResult.artifacts) && imageResult.artifacts[0]) {
        const a = imageResult.artifacts[0];
        if (a.url) imageUrl = a.url;
        else if (a.base64) imageUrl = `data:image/png;base64,${a.base64}`;
      }

      // If still no URL, try common property names
      if (!imageUrl && imageResult.data && imageResult.data[0]) {
        const d0 = imageResult.data[0];
        if (d0.b64_json) imageUrl = `data:image/png;base64,${d0.b64_json}`;
      }

      if (!imageUrl) {
        throw new Error('Could not extract image URL/base64 from provider response.');
      }

      out.push({ ...recipe, imageUrl, imageHint: recipe.name });
    } catch (err: any) {
      // Bubble up with context so callers can log and fall back to placeholders.
      throw new Error(`Failed to generate image for recipe "${recipe.name}": ${err?.message || err}`);
    }
  }

  return out;
}
