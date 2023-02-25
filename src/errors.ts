import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const handleErrors = (error: any, req: Request, res: Response, _: NextFunction): Response => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }

    if (error instanceof ZodError) {
        return res.status(400).json({
            message: error.flatten().fieldErrors
        });
    }

    console.log(error);

    return res.status(500).json({
        message: "Internal server error"
    });
};