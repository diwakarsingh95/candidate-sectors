import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import CandidateModel from "../models/candidate.model";
import { sendSuccessResponse } from "../utils/responseHandler";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, sectors, agreedToTerms } = req.body;

    if (!name || !sectors || !agreedToTerms || (sectors && !sectors.length))
      return next(
        errorHandler({ statusCode: 400, message: "Missing required fields." })
      );

    const newCandidate = await CandidateModel.create({
      name,
      sectors,
      agreedToTerms,
    });
    sendSuccessResponse({
      res,
      data: newCandidate,
      message: "Candidate created successfully.",
    });
  } catch (error) {
    next(error);
  }
};
