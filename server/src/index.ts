import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import errorMiddleware from "./middlewares/error.middleware";

// Routers
import sectorRouter from "./routes/sector.route";
import candidateRouter from "./routes/candidate.route";
import { MONGO_URI, PORT } from "./utils/constants";

const app = express();

app.use(
  cors({
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then((res) => {
    console.log("MongoDB Connected on host", res.connection.host);
    app.listen(PORT, () => console.log("Server started on port", PORT));
  })
  .catch((error) => {
    console.error("MongoDB connection error!");
    console.error(error);
  });

// Routes
app.use("/sector", sectorRouter);
app.use("/candidate", candidateRouter);

app.use("/", (req, res) => {
  res.send("Hi! This is Candidate Sectors Backend.");
});
app.use("/*", (req, res) => {
  res.status(400).send("Not Found.");
});

app.use(errorMiddleware);
