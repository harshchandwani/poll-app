import { z } from 'zod';

// registeration input schema
export const registerSchema = z.object({
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters long')
        .max(30, 'Username must not exceed 30 characters')
        .trim(),
    email: z
        .string()
        .email('Invalid email address')
        .trim(),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .trim()
});

// TypeScript type derived from the schema
export type RegisterInput = z.infer<typeof registerSchema>;