import { AppDataSource } from "../data-source";
import { Movie } from "../entities";

export const deleteMovieService = async (idMovie: number): Promise<void> => {
    const movieRepository = AppDataSource.getRepository(Movie);

    const movie = await movieRepository.findOne({
        where: {
            id: idMovie
        }
    });

    await movieRepository.remove(movie!);
};