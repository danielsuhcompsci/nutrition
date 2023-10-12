import type { inferAsyncReturnType } from "@trpc/server";
import { db } from "./db";

// created for each request
export const createContext = () => ({
  db,
});

export type Context = inferAsyncReturnType<typeof createContext>;
