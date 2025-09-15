import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-issue-sentiment.ts';
import '@/ai/flows/summarize-issue-reports.ts';