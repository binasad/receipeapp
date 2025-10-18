'use server';

/**
 * @fileOverview Summarizes recipe instructions to provide a quick overview.
 *
 * - summarizeRecipeInstructions - A function that summarizes recipe instructions.
 * - SummarizeRecipeInstructionsInput - The input type for the summarizeRecipeInstructions function.
 * - SummarizeRecipeInstructionsOutput - The return type for the summarizeRecipeInstructions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRecipeInstructionsInputSchema = z.object({
  instructions: z
    .string()
    .describe('The full recipe instructions to be summarized.'),
});
export type SummarizeRecipeInstructionsInput = z.infer<
  typeof SummarizeRecipeInstructionsInputSchema
>;

const SummarizeRecipeInstructionsOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the recipe instructions.'),
});
export type SummarizeRecipeInstructionsOutput = z.infer<
  typeof SummarizeRecipeInstructionsOutputSchema
>;

export async function summarizeRecipeInstructions(
  input: SummarizeRecipeInstructionsInput
): Promise<SummarizeRecipeInstructionsOutput> {
  return summarizeRecipeInstructionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeRecipeInstructionsPrompt',
  input: {schema: SummarizeRecipeInstructionsInputSchema},
  output: {schema: SummarizeRecipeInstructionsOutputSchema},
  prompt: `Summarize the following recipe instructions into a few key steps:

Instructions: {{{instructions}}}`,
});

const summarizeRecipeInstructionsFlow = ai.defineFlow(
  {
    name: 'summarizeRecipeInstructionsFlow',
    inputSchema: SummarizeRecipeInstructionsInputSchema,
    outputSchema: SummarizeRecipeInstructionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
