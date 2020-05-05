import { DatabaseInterface, DataType, UserData, MailData } from './db-interface';
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
		this.router.get('/create/mail', this.createMailHandler.bind(this));
		this.router.get('/create/user', this.createUserHandler.bind(this));
		this.router.get('/users/:userId/read', [this.errorHandler.bind(this), this.readHandler.bind(this)]);
		this.router.get('/users/:userId/update', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);
		this.router.get('/users/:userId/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
		this.router.get('*', async (request, response) => {
			response.send(JSON.stringify({ "result" : "command-not-found" }));
		});
		this.server.use('/counter', this.router);
	}

	// TODO
	private async errorHandler(request, response, next) : Promise<void> {
	// let value : boolean = await this.theDatabase.isFound(request.params['userId']+"-"+request.query.name);
	// if (!value) {
	//     response.write(JSON.stringify({'result' : 'error'}));
	//     response.end();
	// } else {
	    next();
	// }
	}

	// TODO
	private async createMailHandler(request: any, response: any) : Promise<void> {
	await this.createMail(request.query.name, request.query.email, request.query.type, request.query.message, response);
	}

	private async createUserHandler(request: any, response: any) : Promise<void> {
	await this.createUser(request.query.name, request.query.email, request.query.type, request.query.message, response);
	}

	// TODO
	private async readHandler(request, response): Promise<void> {
	await this.readUser(request.params['email']+"-"+request.query.name, response);
	}

	// TODO
	private async updateHandler(request, response) : Promise<void> {
	await this.updateUser(request.params['email']+"-"+request.query.name, request.query.value, response);
	}

	// TODO
	private async deleteHandler(request, response) : Promise<void> {
	await this.deleteUser(request.params['email']+"-"+request.query.name, response);
	}

	// FIXME: check this?
	public listen(port: string | undefined): void {
		this.server.listen(port);
	}

	// TODO
	public async createUser(first: string, last: string, email: string, phone: string, graduation: string, password:string, response: any) : Promise<void> {
		console.log("creating user " + first);
		await this.theDatabase.put({dataType: DataType.User, data:{'fname': first, 'lname': last, 'email': email, 'phone': phone, 'password':password, 'grad':graduation, 'admin':false}} as UserData);
		response.write(JSON.stringify({'result' : 'created',
						'name' : name,
						'value' : 0 }));
		response.end();
	}

	// TODO
	public async errorUser(name: string, response) : Promise<void> {
	// response.write(JSON.stringify({'result': 'error'}));
	// response.end();
	}

	// TODO
	public async readUser(name: string, response) : Promise<void> {
	// let value = await this.theDatabase.get(name);
	// response.write(JSON.stringify({'result' : 'read',
	// 			       'name' : name,
	// 			       'value' : value }));
	// response.end();
	}

	// TODO
	public async updateUser(name: string, value: number, response) : Promise<void> {
	// await this.theDatabase.put(name, value);
	// response.write(JSON.stringify({'result' : 'updated',
	// 			       'name' : name,
	// 			       'value' : value }));
	// response.end();
	}

	// TODO
	public async deleteUser(name : string, response) : Promise<void> {
	// await this.theDatabase.del(name);
	// response.write(JSON.stringify({'result' : 'deleted',
	// 			       'value'  : name }));
	// response.end();
	}

	// TODO
	public async createItem(name: string, response) : Promise<void> {
	// console.log("creating counter named '" + name + "'");
	// await this.theDatabase.put(name, 0);
	// response.write(JSON.stringify({'result' : 'created',
	// 			       'name' : name,
	// 			       'value' : 0 }));
	// response.end();
	}

	// TODO
	public async errorItem(name: string, response) : Promise<void> {
	// response.write(JSON.stringify({'result': 'error'}));
	// response.end();
	}

	// TODO
	public async readItem(name: string, response) : Promise<void> {
	// let value = await this.theDatabase.get(name);
	// response.write(JSON.stringify({'result' : 'read',
	// 			       'name' : name,
	// 			       'value' : value }));
	// response.end();
	}

	// TODO
	public async updateItem(name: string, value: number, response) : Promise<void> {
	// await this.theDatabase.put(name, value);
	// response.write(JSON.stringify({'result' : 'updated',
	// 			       'name' : name,
	// 			       'value' : value }));
	// response.end();
	}

	// TODO
	public async deleteItem(name : string, response) : Promise<void> {
	// await this.theDatabase.del(name);
	// response.write(JSON.stringify({'result' : 'deleted',
	// 			       'value'  : name }));
	// response.end();
	}

	// TODO
	public async createMail(name: string, email: string, type: string, message: string, response: any) : Promise<void> {
		console.log("creating mail");
		let dateTime = new Date()
		await this.theDatabase.put({dataType: DataType.Mail, data:{'created': dateTime, 'name':name, 'email':email, 'type': type, 'message': message}} as MailData);
		response.write(JSON.stringify({'result' : 'created',
						'name' : name,
						'value' : 0 }));
		response.end();
	}

	// TODO
	public async errorMail(name: string, response) : Promise<void> {
	// response.write(JSON.stringify({'result': 'error'}));
	// response.end();
	}

	// TODO
	public async readMail(name: string, response) : Promise<void> {
	// let value = await this.theDatabase.get(name);
	// response.write(JSON.stringify({'result' : 'read',
	// 			       'name' : name,
	// 			       'value' : value }));
	// response.end();
	}

	// TODO
	public async updateMail(name: string, value: number, response) : Promise<void> {
	// await this.theDatabase.put(name, value);
	// response.write(JSON.stringify({'result' : 'updated',
	// 			       'name' : name,
	// 			       'value' : value }));
	// response.end();
	}

	// TODO
	public async deleteMail(name : string, response) : Promise<void> {
	// await this.theDatabase.del(name);
	// response.write(JSON.stringify({'result' : 'deleted',
	// 			       'value'  : name }));
	// response.end();
	}
	// TODO
	public async createTransaction(name: string, response) : Promise<void> {
	// console.log("creating counter named '" + name + "'");
	// await this.theDatabase.put(name, 0);
	// response.write(JSON.stringify({'result' : 'created',
	// 			       'name' : name,
	// 			       'value' : 0 }));
	// response.end();
	}

	// TODO
	public async errorTransaction(name: string, response) : Promise<void> {
	// response.write(JSON.stringify({'result': 'error'}));
	// response.end();
	}

	// TODO
	public async readTransaction(name: string, response) : Promise<void> {
	// let value = await this.theDatabase.get(name);
	// response.write(JSON.stringify({'result' : 'read',
	// 			       'name' : name,
	// 			       'value' : value }));
	// response.end();
	}

	// TODO
	public async updateTransaction(name: string, value: number, response) : Promise<void> {
	// await this.theDatabase.put(name, value);
	// response.write(JSON.stringify({'result' : 'updated',
	// 			       'name' : name,
	// 			       'value' : value }));
	// response.end();
	}

	// TODO
	public async deleteTransaction(name : string, response) : Promise<void> {
	// await this.theDatabase.del(name);
	// response.write(JSON.stringify({'result' : 'deleted',
	// 			       'value'  : name }));
	// response.end();
	}
	// TODO
	public async createSchedule(name: string, response) : Promise<void> {
	// console.log("creating counter named '" + name + "'");
	// await this.theDatabase.put(name, 0);
	// response.write(JSON.stringify({'result' : 'created',
	// 			       'name' : name,
	// 			       'value' : 0 }));
	// response.end();
	}

	// TODO
	public async errorSchedule(name: string, response) : Promise<void> {
	// response.write(JSON.stringify({'result': 'error'}));
	// response.end();
	}

	// TODO
	public async readSchedule(name: string, response) : Promise<void> {
	// let value = await this.theDatabase.get(name);
	// response.write(JSON.stringify({'result' : 'read',
	// 			       'name' : name,
	// 			       'value' : value }));
	// response.end();
	}

	// TODO
	public async updateSchedule(name: string, value: number, response) : Promise<void> {
	// await this.theDatabase.put(name, value);
	// response.write(JSON.stringify({'result' : 'updated',
	// 			       'name' : name,
	// 			       'value' : value }));
	// response.end();
	}

	// TODO
	public async deleteSchedule(name : string, response) : Promise<void> {
	// await this.theDatabase.del(name);
	// response.write(JSON.stringify({'result' : 'deleted',
	// 			       'value'  : name }));
	// response.end();
	}
	// TODO
	public async createShift(name: string, response) : Promise<void> {
	// console.log("creating counter named '" + name + "'");
	// await this.theDatabase.put(name, 0);
	// response.write(JSON.stringify({'result' : 'created',
	// 			       'name' : name,
	// 			       'value' : 0 }));
	// response.end();
	}

	// TODO
	public async errorShift(name: string, response) : Promise<void> {
	// response.write(JSON.stringify({'result': 'error'}));
	// response.end();
	}

	// TODO
	public async readShift(name: string, response) : Promise<void> {
	// let value = await this.theDatabase.get(name);
	// response.write(JSON.stringify({'result' : 'read',
	// 			       'name' : name,
	// 			       'value' : value }));
	// response.end();
	}

	// TODO
	public async updateShift(name: string, value: number, response) : Promise<void> {
	// await this.theDatabase.put(name, value);
	// response.write(JSON.stringify({'result' : 'updated',
	// 			       'name' : name,
	// 			       'value' : value }));
	// response.end();
	}

	// TODO
	public async deleteShift(name : string, response) : Promise<void> {
	// await this.theDatabase.del(name);
	// response.write(JSON.stringify({'result' : 'deleted',
	// 			       'value'  : name }));
	// response.end();
	}
}

