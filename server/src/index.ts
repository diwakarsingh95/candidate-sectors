import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI as string;

const app = express();

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

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("User sectors server.");
});
