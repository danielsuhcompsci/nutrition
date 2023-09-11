"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appRouter_1 = require("./appRouter");
const context_1 = require("./context");
const cors_1 = __importDefault(require("cors"));
const standalone_1 = require("@trpc/server/adapters/standalone");
(0, standalone_1.createHTTPServer)({
    middleware: (0, cors_1.default)({ origin: "https://localhost:5173" }),
    router: appRouter_1.appRouter,
    createContext: context_1.createContext,
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
