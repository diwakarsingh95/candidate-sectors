import express from "express";
import { create } from "../controllers/candidate.controller";

const candidateRouter = express.Router();

candidateRouter.post("/", create);

export default candidateRouter;
