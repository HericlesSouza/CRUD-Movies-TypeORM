import { Request, Response } from "express";
import { createMovieServices } from "../services/createMovie.services";
import { listMoviesServices } from "../services/listMovies.service";

export const createMovieController = async (req: Request, res: Response): Promise<Response> => {
    const movieData = req.body;

    const newMovie = await createMovieServices(movieData);

    return res.status(201).json(newMovie);
};

export const listMoviesController = async (req: Request, res: Response): Promise<Response> => {
    const movies = await listMoviesServices(req);

    return res.status(200).json(movies);
};