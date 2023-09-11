"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const db_1 = require("./db");
// created for each request
const createContext = () => ({
    db: db_1.db,
});
exports.createContext = createContext;
