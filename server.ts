import { DatabaseInterface } from './db-interface';
import express from "express";

export class PRServer {

	private theDatabase: DatabaseInterface;

	// Server stuff: use express instead of http.createServer
	private server = express();
	private router = express.Router();

	constructor(db: DatabaseInterface) {
		this.theDatabase = db;
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
		this.server.use('/', express.static('./static', { 'extensions': ['html'] }));

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
	public listen(port: string | undefined): void {
		this.server.listen(port);
	}

	// TODO
	// public async createCounter(name: string, response) : Promise<void> {
	// console.log("creating counter named '" + name + "'");
	// await this.theDatabase.put(name, 0);
	// response.write(JSON.stringify({'result' : 'created',
	// 			       'name' : name,
	// 			       'value' : 0 }));
	// response.end();
	// }

	// TODO
	// public async errorCounter(name: string, response) : Promise<void> {
	// response.write(JSON.stringify({'result': 'error'}));
	// response.end();
	// }

	// TODO
	// public async readCounter(name: string, response) : Promise<void> {
	// let value = await this.theDatabase.get(name);
	// response.write(JSON.stringify({'result' : 'read',
	// 			       'name' : name,
	// 			       'value' : value }));
	// response.end();
	// }

	// TODO
	// public async updateCounter(name: string, value: number, response) : Promise<void> {
	// await this.theDatabase.put(name, value);
	// response.write(JSON.stringify({'result' : 'updated',
	// 			       'name' : name,
	// 			       'value' : value }));
	// response.end();
	// }

	// TODO
	// public async deleteCounter(name : string, response) : Promise<void> {
	// await this.theDatabase.del(name);
	// response.write(JSON.stringify({'result' : 'deleted',
	// 			       'value'  : name }));
	// response.end();
	// }
}

