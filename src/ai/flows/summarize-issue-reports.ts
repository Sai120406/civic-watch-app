'use server';

/**
 * @fileOverview Summarizes civic issue reports using AI.
 *
 * - summarizeIssueReport - A function that summarizes an issue report.
 * - SummarizeIssueReportInput - The input type for the summarizeIssueReport function.
 * - SummarizeIssueReportOutput - The return type for the summarizeIssueReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIssueReportInputSchema = z.object({
  title: z.string().describe('The title of the issue report.'),
  description: z.string().describe('The full description of the issue report.'),
  comments: z.array(z.string()).describe('An array of comments related to the issue report.'),
});
export type SummarizeIssueReportInput = z.infer<typeof SummarizeIssueReportInputSchema>;

const SummarizeIssueReportOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the issue report and its comments.'),
  sentiment: z
    .enum(['positive', 'neutral', 'negative'])
    .describe('The overall sentiment of the issue report and comments.'),
});
export type SummarizeIssueReportOutput = z.infer<typeof SummarizeIssueReportOutputSchema>;

export async function summarizeIssueReport(input: SummarizeIssueReportInput): Promise<SummarizeIssueReportOutput> {
  return summarizeIssueReportFlow(input);
}

const summarizeIssueReportPrompt = ai.definePrompt({
  name: 'summarizeIssueReportPrompt',
  input: {
    schema: SummarizeIssueReportInputSchema,
  },
  output: {
    schema: SummarizeIssueReportOutputSchema,
  },
  prompt: `Summarize the following civic issue report and analyze the sentiment of the comments.

Title: {{{title}}}
Description: {{{description}}}
Comments:
{{#each comments}}
- {{{this}}}
{{/each}}

Provide a concise summary of the issue report, no more than 50 words. Also, determine the overall sentiment (positive, neutral, or negative) expressed in the comments section.

Summary:
Sentiment:`, 
});

const summarizeIssueReportFlow = ai.defineFlow(
  {
    name: 'summarizeIssueReportFlow',
    inputSchema: SummarizeIssueReportInputSchema,
    outputSchema: SummarizeIssueReportOutputSchema,
  },
  async input => {
    const {output} = await summarizeIssueReportPrompt(input);
    return output!;
  }
);
