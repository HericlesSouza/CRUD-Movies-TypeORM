import { Router } from "express";
import { createMovieController, deleteMovieController, listMoviesController, updateMovieController } from "../controllers/movies.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middlewares";
import { ensureMovieExists } from "../middlewares/ensureMovieExists.middlewares";
import { createMovieSchema, updateMovieSchema } from "../schemas/movies.schema";

export const movieRoutes: Router = Router();

movieRoutes.get("", listMoviesController);
movieRoutes.post("", ensureDataIsValidMiddleware(createMovieSchema), ensureMovieExists, createMovieController);
movieRoutes.patch("/:id", ensureDataIsValidMiddleware(updateMovieSchema), ensureMovieExists, updateMovieController);
movieRoutes.delete("/:id", ensureMovieExists, deleteMovieController);