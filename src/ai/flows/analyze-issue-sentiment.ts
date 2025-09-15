'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing the sentiment of issue report comments.
 *
 * The flow takes the comments of an issue report as input and returns an overall sentiment analysis (positive, neutral, or negative).
 *
 * @remarks
 * - It exports `analyzeIssueSentiment` function to trigger the sentiment analysis flow.
 * - It exports `AnalyzeIssueSentimentInput` type for the input schema.
 * - It exports `AnalyzeIssueSentimentOutput` type for the output schema.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeIssueSentimentInputSchema = z.object({
  comments: z
    .string()
    .describe('The comments related to the issue report.'),
});
export type AnalyzeIssueSentimentInput = z.infer<typeof AnalyzeIssueSentimentInputSchema>;

const AnalyzeIssueSentimentOutputSchema = z.object({
  sentiment: z
    .enum(['positive', 'neutral', 'negative'])
    .describe('The overall sentiment of the comments.'),
  explanation: z
    .string()
    .describe('The explanation of why sentiment analysis resulted in such sentiment.'),
});
export type AnalyzeIssueSentimentOutput = z.infer<typeof AnalyzeIssueSentimentOutputSchema>;

export async function analyzeIssueSentiment(input: AnalyzeIssueSentimentInput): Promise<AnalyzeIssueSentimentOutput> {
  return analyzeIssueSentimentFlow(input);
}

const analyzeIssueSentimentPrompt = ai.definePrompt({
  name: 'analyzeIssueSentimentPrompt',
  input: {schema: AnalyzeIssueSentimentInputSchema},
  output: {schema: AnalyzeIssueSentimentOutputSchema},
  prompt: `Analyze the sentiment of the following comments related to a civic issue report. Determine if the overall sentiment is positive, neutral, or negative. Provide a brief explanation for your assessment.

Comments: {{{comments}}}`,
});

const analyzeIssueSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeIssueSentimentFlow',
    inputSchema: AnalyzeIssueSentimentInputSchema,
    outputSchema: AnalyzeIssueSentimentOutputSchema,
  },
  async input => {
    const {output} = await analyzeIssueSentimentPrompt(input);
    return output!;
  }
);
