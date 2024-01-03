import "reflect-metadata";
import express from "express";
import cors from "cors";
import indexRouter from "./routes/index.route";
const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey you i'm here...");
});

// all the routes here
app.use("/api", indexRouter);

// this is for 404
app.use(function (req, res) {
  res.status(404).send(" route not found");
});

export default app;