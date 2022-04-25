import express, { NextFunction, Request, Response } from "express";
import db from "./config/database.config";
import router from "./route";

db.sync().then(() => {
  console.log("connect to database success");
});

const app = express();

const port = 9000;

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log("Server is connected " + port);
});
