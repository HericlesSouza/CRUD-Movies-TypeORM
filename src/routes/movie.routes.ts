import { Router } from "express";
import { createMovieController, listMoviesController } from "../controllers/movies.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middlewares";
import { ensureMovieExists } from "../middlewares/ensureMovieExists.middlewares";
import { createMovieSchema } from "../schemas/movies.schema";

export const movieRoutes: Router = Router();

movieRoutes.get("", listMoviesController);
movieRoutes.post("", ensureDataIsValidMiddleware(createMovieSchema), ensureMovieExists, createMovieController);