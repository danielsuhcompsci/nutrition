import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { db: PrismaClient };

export const db =
  globalForPrisma.db ||
  new PrismaClient({ log: ["query", "error", "info", "warn"] });

// Use prisma client on globalThis to avoid duplication during hot-reloading
if (process.env.NODE_ENV !== "production") globalForPrisma.db = db;
