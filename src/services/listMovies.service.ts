import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iMoviePaginationReturn} from "../interfaces/movies.interfaces";

export const listMoviesServices = async (req: Request): Promise<iMoviePaginationReturn> => {
    const sort = typeof req.query.sort === "string" ? req.query.sort.toLowerCase() : undefined;
    const order = req.query.order === "DESC" || req.query.order === "desc" ? "DESC" : "ASC";
    let page = Number(req.query.page) || 1;
    let perPage = Number(req.query.perPage) || 5;
    let prevPage: string | null = `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`;

    if (page < 1) {
        page = 1;
    }

    if (perPage <= 0 || perPage > 5) {
        perPage = 5;
    }

    let nextPage: string | null = `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`;

    if (page === 1) {
        prevPage = null;
    }

    const movieRepository = AppDataSource.getRepository(Movie);

    let movie: Movie[];
    let count: number;
    let checkAnyMovieExists: Movie[];

    if (!sort) {
        [movie, count] = await movieRepository.findAndCount({
            take: perPage,
            skip: perPage * (page - 1),
            order: { id: "ASC" }
        });

        checkAnyMovieExists = await movieRepository.find({
            take: perPage,
            skip: perPage * page,
            order: { id: "ASC" }
        });
    } else {
        [movie, count] = await movieRepository.findAndCount({
            take: perPage,
            skip: perPage * (page - 1),
            order: { [sort]: order }
        });

        checkAnyMovieExists = await movieRepository.find({
            take: perPage,
            skip: perPage * page,
            order: { [sort]: order }
        });
    }

    if (checkAnyMovieExists.length === 0) {
        nextPage = null;
    }

    const movieFormatted: iMoviePaginationReturn = {
        prevPage: prevPage,
        nextPage: nextPage,
        count: count,
        data: movie
    };

    return movieFormatted;
};
