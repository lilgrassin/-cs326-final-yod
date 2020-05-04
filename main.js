"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_postgres_1 = require("./db-postgres");
const server_1 = require("./server");
const theDatabase = new db_postgres_1.Database();
const theServer = new server_1.PRServer(theDatabase);
theServer.listen(process.env.PORT);
