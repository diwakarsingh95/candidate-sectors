import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/httpException.js";

export default function errorMiddleware(
  responseError: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("responseError", responseError);
  const {
    status = 500,
    message = "Something went wrong.",
    error,
  } = responseError;
  res.status(status).json({ message, error });
}
