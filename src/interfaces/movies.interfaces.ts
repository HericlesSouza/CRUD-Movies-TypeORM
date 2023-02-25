import { DeepPartial, Repository } from "typeorm";
import { z } from "zod";
import { Movie } from "../entities";
import { createMovieSchema, movieSchema, returnAllMovies } from "../schemas/movies.schema";

export type TMovie = z.infer<typeof movieSchema>
export type TAllMovies = z.infer<typeof returnAllMovies>

export type iMovieCreate = z.infer<typeof createMovieSchema>;
export type iMovieUpdate = DeepPartial<Movie>;
export type iMovieRepo = Repository<Movie>;
export interface iMoviePaginationReturn  {
    prevPage: string | null,
    nextPage: string | null,
    count: number,
    data: TAllMovies
}

