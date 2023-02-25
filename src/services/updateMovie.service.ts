import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iMovieUpdate } from "../interfaces";
import { movieSchema } from "../schemas/movies.schema";

export const updateMovieService = async (newMovieData: iMovieUpdate, idMovie: number): Promise<iMovieUpdate> => {
    const movieRepository = AppDataSource.getRepository(Movie);

    const oldMovieData = await movieRepository.findOneBy({
        id: idMovie
    });

    const movie = movieRepository.create({
        ...oldMovieData,
        ...newMovieData
    });

    await movieRepository.save(movie);

    const updateMovie = movieSchema.parse(movie);

    return updateMovie;
};