import { z } from "zod";
export const movieSchema = z.object({
    id: z.number(),
    name: z.string().max(50),
    description: z.string().optional().nullable(),
    duration: z.number().positive(),
    price: z.number().int()
});

export const createMovieSchema = movieSchema.omit({ id: true });

export const returnAllMovies = movieSchema.array();