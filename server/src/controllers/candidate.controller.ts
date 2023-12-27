import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";
import CandidateModel from "../models/candidate.model";
import { sendSuccessResponse } from "../utils/responseHandler";

export const createCandidate = async (
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
    await newCandidate.populate("sectors");
    sendSuccessResponse({
      res,
      data: newCandidate,
      message: "Candidate created successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const getCandidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id)
      return next(
        errorHandler({ statusCode: 400, message: "Missing required fields." })
      );

    const candidate = await CandidateModel.findById(id).populate("sectors");
    sendSuccessResponse({
      res,
      data: candidate,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

export const updateCandidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, name, sectors, agreedToTerms } = req.body;

    if (
      !id ||
      !name ||
      !sectors ||
      !agreedToTerms ||
      (sectors && !sectors.length)
    )
      return next(
        errorHandler({ statusCode: 400, message: "Missing required fields." })
      );

    const candidate = await CandidateModel.findById(id);
    if (!candidate)
      return next(
        errorHandler({ statusCode: 404, message: "No candidate found!" })
      );

    const udpatedCandidate = await CandidateModel.findByIdAndUpdate(
      id,
      {
        name,
        agreedToTerms,
        sectors,
      },
      { new: true }
    ).populate("sectors");
    sendSuccessResponse({
      res,
      data: udpatedCandidate,
      message: "Candidate updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};
