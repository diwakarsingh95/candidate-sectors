import { Request, Response, NextFunction } from "express";
import SectorModel from "../models/sector.model";
import { sendSuccessResponse } from "../utils/responseHandler";
import { SectorMappedDocument, mapSectorData } from "../utils/helpers";

export const getAllSectors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sectors: SectorMappedDocument[] = await SectorModel.aggregate([
      {
        $graphLookup: {
          from: "sectors",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parent",
          as: "children",
          depthField: "depth",
        },
      },
      {
        $match: {
          parent: null,
        },
      },
    ]);
    const mappedSectors = sectors.map((sector) => ({
      ...sector,
      children: mapSectorData("", sector?.children),
    }));
    sendSuccessResponse({ res, data: mappedSectors });
  } catch (error) {
    next(error);
  }
};
