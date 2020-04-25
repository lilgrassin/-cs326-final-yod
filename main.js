"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Database } from './db-mongo';
const server_1 = require("./server");
// const theDatabase = new Database('pantryraiders');
const theServer = new server_1.PRServer( /* theDatabase */);
theServer.listen(process.env.PORT);
