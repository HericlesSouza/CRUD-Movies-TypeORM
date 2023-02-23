import { z } from "zod";
import { createMovieSchema } from "../schemas/movies.schema";

export type TCreateMovie = z.infer<typeof createMovieSchema>