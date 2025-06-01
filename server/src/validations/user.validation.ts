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
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[@$!%*?&#]/, 'Password must contain at least one special character')
        .trim()
});

// TypeScript type derived from the schema
export type RegisterInput = z.infer<typeof registerSchema>;