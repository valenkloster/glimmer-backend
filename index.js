import express from "express";
import cors from "cors";
import routerApi from "./network/routes.js";
// import {
//   logErrors,
//   errorHandler,
//   boomErrorHandler,
//   ormErrorHandler,
// } from "./middleware/error.handler.js";
import boom from "@hapi/boom";
import config from "./config.js";

const app = express();
app.use(express.json());

// Corse
const whitelist = ["http://localhost:5500", "https://myapp.com"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};
app.use(cors(options));

// app.get("/", (req, res) => {
//   res.send("Hola mi server en express");
// });

// Routes
routerApi(app);

// Middleware for not founded routes
app.use((req, res, next) => {
  next(boom.notFound("Route not found"));
});

// Error middleware
// app.use(logErrors);
// app.use(ormErrorHandler);
// app.use(boomErrorHandler);
// app.use(errorHandler);

app.listen(config.port, () => {
  console.log("App listening on port " + config.port + "!");
});
