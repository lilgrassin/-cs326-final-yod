"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { DatabaseInterface } from './db-interface';
const express_1 = __importDefault(require("express"));
class PRServer {
    constructor( /* db: DatabaseInterface */) {
        // private theDatabase: DatabaseInterface;
        // Server stuff: use express instead of http.createServer
        this.server = express_1.default();
        this.router = express_1.default.Router();
        // this.theDatabase = db;
        /* from https://enable-cors.org/server_expressjs.html */
        this.router.use((request, response, next) => {
            // FIXME: actually use the request so TS doesn't complain
            console.log(request);
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        /* Serve static pages from a particular path. */
        this.server.use('/', express_1.default.static('./static', { 'extensions': ['html'] }));
        /* TODO: Handle CREATE, READ, UPDATE, and DELETE operations
        handle errors with a wildcard (*) */
        // this.router.get('/users/:userId/create', this.createHandler.bind(this));
        // this.router.get('/users/:userId/read', [this.errorHandler.bind(this), this.readHandler.bind(this)]);
        // this.router.get('/users/:userId/update', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);
        // this.router.get('/users/:userId/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
        // this.router.get('*', async (request, response) => {
        // 	response.send(JSON.stringify({ "result" : "command-not-found" }));
        // });
        // this.server.use('/counter', this.router);
    }
    // TODO
    // private async errorHandler(request, response, next) : Promise<void> {
    // let value : boolean = await this.theDatabase.isFound(request.params['userId']+"-"+request.query.name);
    // if (!value) {
    //     response.write(JSON.stringify({'result' : 'error'}));
    //     response.end();
    // } else {
    //     next();
    // }
    // }
    // TODO
    // private async createHandler(request, response) : Promise<void> {
    // await this.createCounter(request.params['userId']+"-"+request.query.name, response);
    // }
    // TODO
    // private async readHandler(request, response): Promise<void> {
    // await this.readCounter(request.params['userId']+"-"+request.query.name, response);
    // }
    // TODO
    // private async updateHandler(request, response) : Promise<void> {
    // await this.updateCounter(request.params['userId']+"-"+request.query.name, request.query.value, response);
    // }
    // TODO
    // private async deleteHandler(request, response) : Promise<void> {
    // await this.deleteCounter(request.params['userId']+"-"+request.query.name, response);
    // }
    // FIXME: check this?
    listen(port) {
        this.server.listen(port);
    }
}
exports.PRServer = PRServer;
