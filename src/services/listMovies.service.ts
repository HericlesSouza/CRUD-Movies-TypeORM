import { Request } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iMoviePaginationReturn, TAllMovies } from "../interfaces/movies.interfaces";

export const listMoviesServices = async (req: Request): Promise<TAllMovies | iMoviePaginationReturn | any> => {
    const sort = typeof req.query.sort === "string" ? req.query.sort.toLowerCase() : undefined;
    const order = req.query.order === "DESC" || req.query.order === "desc" ? req.query.order.toUpperCase() : "ASC";
    let page = Number(req.query.page) || 1;
    let perPage = Number(req.query.perPage) || 5;
    let prevPage: string | null = `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`;
    let nextPage: string    | null = `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`;

    if (page < 0 || page == 1) {
        page = 1;
        prevPage = null;
    }

    if (perPage <= 0 || perPage > 5) {
        perPage = 5;
    }

    const movieRepository = AppDataSource.getRepository(Movie);

    if ((sort === "price" || sort === "duration") && (!req.query.page && !req.query.perPage)) {
        const movie = await movieRepository.find({
            order: { [sort]: order }
        });

        const movieFormatted = {
            count: movie.length,
            data: movie
        };

        return movieFormatted;
    }


    if ((req.query.page || req.query.perPage) && !sort) {
        const movie = await movieRepository.find({
            take: perPage,
            skip: perPage * (page - 1),
        });

        const checkAnyMovieExists = await movieRepository.find({
            take: perPage,
            skip: perPage * (page + 1),
        });

        if (checkAnyMovieExists.length === 0) {
            nextPage = null;
        }

        const responseMovieFormatted: iMoviePaginationReturn = {
            prevPage: prevPage,
            nextPage: nextPage,
            count: movie.length,
            data: movie
        };

        return responseMovieFormatted;
    }

    if ((sort === "price" || sort === "duration") && (req.query.page || req.query.perPage)) {
        const movie = await movieRepository.find({
            take: perPage,
            skip: perPage * (page - 1),
            order: { [sort]: order }
        });

        const checkAnyMovieExists = await movieRepository.find({
            take: perPage,
            skip: perPage * (page + 1),
        });

        if (checkAnyMovieExists.length === 0) {
            nextPage = null;
        }

        const responseMovieFormatted: iMoviePaginationReturn = {
            prevPage: prevPage,
            nextPage: nextPage,
            count: movie.length,
            data: movie
        };

        return responseMovieFormatted;
    }

    const movie = await movieRepository.find();

    const formattedMovie = {
        count: movie.length,
        data: movie,
        nextPage: nextPage,
        prevPage: null
    };

    return formattedMovie;
};