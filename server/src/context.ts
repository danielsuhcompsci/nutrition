import type { inferAsyncReturnType } from "@trpc/server";
import { db } from "./db";
import * as trpcExpress from "@trpc/server/adapters/standalone";
import {
  NodeHTTPCreateContextFn,
  NodeHTTPCreateContextFnOptions,
} from "@trpc/server/dist/adapters/node-http";

// created for each request
export const createContext = () => ({
  db,
});

export type Context = inferAsyncReturnType<typeof createContext>;
