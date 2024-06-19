import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import UserRouter from "./routes/user.routes.js";
import BooksRouter from "./routes/books.routes.js"
import swaggerDocs from "./swagger.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

const allowedOrigins = ["http://localhost:3000", "http://localhost:3000/"];

const corsOptions = {
  origin: allowedOrigins,
};
app.use(cors(corsOptions));

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/books", BooksRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  swaggerDocs(app, port);
});
