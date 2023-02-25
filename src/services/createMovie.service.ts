import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iMovieCreate, TMovie } from "../interfaces/movies.interfaces";
import { movieSchema } from "../schemas/movies.schema";

export const createMovieServices = async (movieData: iMovieCreate): Promise<TMovie> => {
    const movieRepository = AppDataSource.getRepository(Movie);

    const movie = movieRepository.create(movieData);

    await movieRepository.save(movie);

    const newMovie = movieSchema.parse(movie);

    return newMovie;
};