import { z } from 'zod';

// Validation schema for creating a poll
export const createPollSchema = z.object({
    question: z.string().min(5, 'Question must be at least 5 characters'),
    options: z
        .array(z.string().min(1, 'Option text cannot be empty'))
        .min(2, 'At least two options are required'),
});

// Validation schema for voting in a poll
export const votePollSchema = z.object({
    option: z.string().min(1, 'Option is required'),
});

// TypeScript type for the input based on the validation schema
export type CreatePollInput = z.infer<typeof createPollSchema>;
export type VotePollInput = z.infer<typeof votePollSchema>;