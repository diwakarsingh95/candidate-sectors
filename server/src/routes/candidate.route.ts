import express from "express";
import {
  createCandidate,
  getCandidate,
  updateCandidate,
} from "../controllers/candidate.controller";

const candidateRouter = express.Router();

candidateRouter.post("/", createCandidate);
candidateRouter.get("/:id", getCandidate);
candidateRouter.post("/update", updateCandidate);

export default candidateRouter;
