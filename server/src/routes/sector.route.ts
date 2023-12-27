import express from "express";
import { getAllSectors } from "../controllers/sector.controller";

const sectorRouter = express.Router();

sectorRouter.get("/", getAllSectors);

export default sectorRouter;
