import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";

export const ensureMovieExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    if (req.method === "DELETE" || req.method === "PATCH") {
        const movieRepository = AppDataSource.getRepository(Movie);

        const movie = await movieRepository.findOne({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!movie) {
            throw new AppError("Movie not found", 404);
        }
    }
    
    const movieRepository = AppDataSource.getRepository(Movie);

    const movie = await movieRepository.findOne({
        where: {
            name: req.body.name
        }
    });
    console.log(req.method);

    if (movie) {
        throw new AppError("Movie already exists.", 409);
    }


    return next();
};