import { NextFunction, Request, Response, json } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../exeption/response-error";

export const errMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      errors: `Validation Error: ${JSON.stringify(err)}`
    });
  } else if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.message
    });
  } else {
    const e: number = 500;
    res.status(e).json({
      errors: `Internal Server Error ${JSON.stringify(e)}`
    });
  }
}