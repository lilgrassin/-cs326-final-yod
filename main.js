"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_mongo_1 = require("./db-mongo");
const server_1 = require("./server");
const theDatabase = new db_mongo_1.Database('pantryraiders');
const theServer = new server_1.PRServer(theDatabase);
theServer.listen(process.env.PORT);
