// src/schemas/bookSchema.ts
import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  publishedDate: z.string().optional(),
});

export type BookInput = z.infer<typeof bookSchema>;
