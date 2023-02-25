import { Request, Response } from "express";
import { createMovieServices } from "../services/createMovie.service";
import { deleteMovieService } from "../services/deleteMovie.service";
import { listMoviesServices } from "../services/listMovies.service";
import { updateMovieService } from "../services/updateMovie.service";

export const createMovieController = async (req: Request, res: Response): Promise<Response> => {
    const movieData = req.body;

    const newMovie = await createMovieServices(movieData);

    return res.status(201).json(newMovie);
};

export const listMoviesController = async (req: Request, res: Response): Promise<Response> => {
    const movies = await listMoviesServices(req);

    return res.status(200).json(movies);
};

export const updateMovieController = async (req: Request, res: Response): Promise<Response> => {
    const movieData = req.body;
    const idMovie = parseInt(req.params.id);

    const updateMovie = await updateMovieService(movieData, idMovie);

    return res.status(200).json(updateMovie);
};

export const deleteMovieController = async (req: Request, res: Response): Promise <Response> => {
    const idMovie = parseInt(req.params.id);

    const deleteMovie = await deleteMovieService(idMovie);

    return res.status(204).send();
};