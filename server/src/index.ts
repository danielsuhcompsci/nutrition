import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./appRouter";
import { createContext } from "./context";
import cors from "cors";
import { db } from "./db";

import { createHTTPServer } from "@trpc/server/adapters/standalone";

createHTTPServer({
  middleware: cors({ origin: "*" }),
  router: appRouter,
  createContext,
}).listen(4000);

// const app = express();

// app.use((req, _res, next) => {
//   // request logger
//   console.log("⬅️ ", req.method, req.path, req.body ?? req.query);

//   next();
// });

// app.use(cors({ origin: "https://localhost:5173" }));

// app.use(
//   "/trpc",
//   trpcExpress.createExpressMiddleware({
//     router: appRouter,
//     createContext,
//   })
// );

// app.get("/", (_req, res) => {
//   res.send("Hello!");
// });

console.log("Listening on port 4000");

// app.listen(4000);
