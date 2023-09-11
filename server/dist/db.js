"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("@prisma/client");
const globalForPrisma = globalThis;
exports.db = globalForPrisma.db ||
    new client_1.PrismaClient({ log: ["query", "error", "info", "warn"] });
// Use prisma client on globalThis to avoid duplication during hot-reloading
if (process.env.NODE_ENV !== "production")
    globalForPrisma.db = exports.db;
