import { z } from "zod";
export const movieSchema = z.object({
    id: z.number(),
    name: z.string().max(50),
    description: z.string(),
    duration: z.number(),
    price: z.number()
});

export const createMovieSchema = movieSchema.omit({ id: true });