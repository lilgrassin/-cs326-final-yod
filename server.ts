import { DatabaseInterface, DataType, UserData, MailData, TransactionData } from './db-interface';
import express, { Request, Response } from "express";
import cors from "cors";

export class PRServer {

	private theDatabase: DatabaseInterface;

	// Server stuff: use express instead of http.createServer
	private server = express();

	constructor(db: DatabaseInterface) {
		this.theDatabase = db;
		/* from https://enable-cors.org/server_expressjs.html */
		this.server.use(cors());
		this.server.use(express.json());

		/* Serve static pages from a particular path. */
		this.server.use('/', express.static('./static', { 'extensions': ['html'] }));

		/* TODO: Handle CREATE, READ, UPDATE, and DELETE operations
		handle errors with a wildcard (*) */
		this.server.post('/create/mail', this.createMailHandler.bind(this));
		this.server.post('/create/user', this.createUserHandler.bind(this));
		this.server.post('/create/item', this.createItemHandler.bind(this));
		this.server.post('*', async (_req, res) => {
			res.send(JSON.stringify({ "result": "command-not-found" }));
		});
	}

	// TODO
	// @ts-ignore
	private async errorHandler(req, res, next): Promise<void> {
		// let value : boolean = await this.theDatabase.isFound(req.params['userId']+"-"+req.query.name);
		// if (!value) {
		//     res.write(JSON.stringify({'result' : 'error'}));
		//     res.end();
		// } else {
		next();
		// }
	}

	// FIXME
	private async createMailHandler(req: Request, res: Response): Promise<void> {
		await this.createMail(req.body.name, req.body.email, req.body.type, req.body.message, res);
	}

	// FIXME
	private async createUserHandler(req: Request, res: Response): Promise<void> {
		await this.createUser(req.body.fname, req.body.lname, req.body.email, req.body.phone, req.body.grad, req.body.pass, res);
	}

	private async createItemHandler(req: Request, res: Response): Promise<void> {
		console.log("recieved:\n" + JSON.stringify(req.body));
		let trans : TransactionData = {
			dataType: DataType.Transaction,
			data: {
				created: new Date(),
				user_id: null,
				check_in: req.body.check_in,
				weight: req.body.weight
			}
		};
		if (!await this.theDatabase.put(trans)) {
			console.log("error inserting transaction");
			res.write(JSON.stringify({
				'result': 'error',
			}));
		} else {
			res.write(JSON.stringify({
				'result': 'created'
			}));
		}
		res.end();

		// let item : ItemData = {
		// 	dataType: DataType.Item,
		// 	data: {
				
		// 	}
		// }
		// res.
		// for (let i of req.body.items) {
		// 	item.data = {
		// 		name: i.name,
		// 		c
		// 	}
		// 	if (!await this.theDatabase.put(item))
		// }
	}

	// TODO
	// @ts-ignore
	private async readHandler(req: Request, res: Response): Promise<void> {
		await this.readUser(req.params['email'] + "-" + req.query.name, res);
	}

	// TODO
	// @ts-ignore
	private async updateHandler(req: Request, res: Response): Promise<void> {
		await this.updateUser(req.params['email'] + "-" + req.query.name, req.body.value, res);
	}

	// TODO
	// @ts-ignore
	private async deleteHandler(req: Request, res: Response): Promise<void> {
		await this.deleteUser(req.params['email'] + "-" + req.query.name, res);
	}

	// FIXME: check this?
	public listen(port: string | undefined): void {
		this.server.listen(port);
	}

	// TODO
	public async createUser(first: string, last: string, email: string, phone: string, graduation: string, password: string, res: Response): Promise<void> {
		console.log("creating user " + first);
		await this.theDatabase.put({ dataType: DataType.User, data: { 'fname': first, 'lname': last, 'email': email, 'phone': phone, 'password': password, 'grad': graduation, 'admin': false } } as UserData);
		res.write(JSON.stringify({
			'result': 'created',
			'name': name,
			'value': 0
		}));
		res.end();
	}

	// TODO
	// @ts-ignore
	public async errorUser(name: string, res: Response): Promise<void> {
		// res.write(JSON.stringify({'result': 'error'}));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async readUser(name: string, res: Response): Promise<void> {
		// let value = await this.theDatabase.get(name);
		// res.write(JSON.stringify({'result' : 'read',
		// 			       'name' : name,
		// 			       'value' : value }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async updateUser(name: string, value: number, res: Response): Promise<void> {
		// await this.theDatabase.put(name, value);
		// res.write(JSON.stringify({'result' : 'updated',
		// 			       'name' : name,
		// 			       'value' : value }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async deleteUser(name: string, res: Response): Promise<void> {
		// await this.theDatabase.del(name);
		// res.write(JSON.stringify({'result' : 'deleted',
		// 			       'value'  : name }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async createItem(name: string, res: Response): Promise<void> {
		// console.log("creating counter named '" + name + "'");
		// await this.theDatabase.put(name, 0);
		// res.write(JSON.stringify({'result' : 'created',
		// 			       'name' : name,
		// 			       'value' : 0 }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async errorItem(name: string, res: Response): Promise<void> {
		// res.write(JSON.stringify({'result': 'error'}));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async readItem(name: string, res: Response): Promise<void> {
		// let value = await this.theDatabase.get(name);
		// res.write(JSON.stringify({'result' : 'read',
		// 			       'name' : name,
		// 			       'value' : value }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async updateItem(name: string, value: number, res: Response): Promise<void> {
		// await this.theDatabase.put(name, value);
		// res.write(JSON.stringify({'result' : 'updated',
		// 			       'name' : name,
		// 			       'value' : value }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async deleteItem(name: string, res: Response): Promise<void> {
		// await this.theDatabase.del(name);
		// res.write(JSON.stringify({'result' : 'deleted',
		// 			       'value'  : name }));
		// res.end();
	}

	// FIXME: wrong database API
	public async createMail(name: string, email: string, type: string, message: string, res: Response): Promise<void> {
		console.log("creating mail");
		let dateTime = new Date()
		await this.theDatabase.put({ dataType: DataType.Mail, data: { 'created': dateTime, 'name': name, 'email': email, 'type': type, 'message': message } } as MailData);
		res.write(JSON.stringify({
			'result': 'created',
			'name': name,
			'value': 0
		}));
		res.end();
	}

	// TODO
	// @ts-ignore
	public async errorMail(name: string, res: Response): Promise<void> {
		// res.write(JSON.stringify({'result': 'error'}));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async readMail(name: string, res: Response): Promise<void> {
		// let value = await this.theDatabase.get(name);
		// res.write(JSON.stringify({'result' : 'read',
		// 			       'name' : name,
		// 			       'value' : value }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async updateMail(name: string, value: number, res: Response): Promise<void> {
		// await this.theDatabase.put(name, value);
		// res.write(JSON.stringify({'result' : 'updated',
		// 			       'name' : name,
		// 			       'value' : value }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async deleteMail(name: string, res: Response): Promise<void> {
		// await this.theDatabase.del(name);
		// res.write(JSON.stringify({'result' : 'deleted',
		// 			       'value'  : name }));
		// res.end();
	}
	// TODO
	// @ts-ignore
	public async createTransaction(name: string, res: Response): Promise<void> {
		// console.log("creating counter named '" + name + "'");
		// await this.theDatabase.put(name, 0);
		// res.write(JSON.stringify({'result' : 'created',
		// 			       'name' : name,
		// 			       'value' : 0 }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async errorTransaction(name: string, res: Response): Promise<void> {
		// res.write(JSON.stringify({'result': 'error'}));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async readTransaction(name: string, res: Response): Promise<void> {
		// let value = await this.theDatabase.get(name);
		// res.write(JSON.stringify({'result' : 'read',
		// 			       'name' : name,
		// 			       'value' : value }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async updateTransaction(name: string, value: number, res: Response): Promise<void> {
		// await this.theDatabase.put(name, value);
		// res.write(JSON.stringify({'result' : 'updated',
		// 			       'name' : name,
		// 			       'value' : value }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async deleteTransaction(name: string, res: Response): Promise<void> {
		// await this.theDatabase.del(name);
		// res.write(JSON.stringify({'result' : 'deleted',
		// 			       'value'  : name }));
		// res.end();
	}
	// TODO
	// @ts-ignore
	public async createSchedule(name: string, res: Response): Promise<void> {
		// console.log("creating counter named '" + name + "'");
		// await this.theDatabase.put(name, 0);
		// res.write(JSON.stringify({'result' : 'created',
		// 			       'name' : name,
		// 			       'value' : 0 }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async errorSchedule(name: string, res: Response): Promise<void> {
		// res.write(JSON.stringify({'result': 'error'}));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async readSchedule(name: string, res: Response): Promise<void> {
		// let value = await this.theDatabase.get(name);
		// res.write(JSON.stringify({'result' : 'read',
		// 			       'name' : name,
		// 			       'value' : value }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async updateSchedule(name: string, value: number, res: Response): Promise<void> {
		// await this.theDatabase.put(name, value);
		// res.write(JSON.stringify({'result' : 'updated',
		// 			       'name' : name,
		// 			       'value' : value }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async deleteSchedule(name: string, res: Response): Promise<void> {
		// await this.theDatabase.del(name);
		// res.write(JSON.stringify({'result' : 'deleted',
		// 			       'value'  : name }));
		// res.end();
	}
	// TODO
	// @ts-ignore
	public async createShift(name: string, res: Response): Promise<void> {
		// console.log("creating counter named '" + name + "'");
		// await this.theDatabase.put(name, 0);
		// res.write(JSON.stringify({'result' : 'created',
		// 			       'name' : name,
		// 			       'value' : 0 }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async errorShift(name: string, res: Response): Promise<void> {
		// res.write(JSON.stringify({'result': 'error'}));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async readShift(name: string, res: Response): Promise<void> {
		// let value = await this.theDatabase.get(name);
		// res.write(JSON.stringify({'result' : 'read',
		// 			       'name' : name,
		// 			       'value' : value }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async updateShift(name: string, value: number, res: Response): Promise<void> {
		// await this.theDatabase.put(name, value);
		// res.write(JSON.stringify({'result' : 'updated',
		// 			       'name' : name,
		// 			       'value' : value }));
		// res.end();
	}

	// TODO
	// @ts-ignore
	public async deleteShift(name: string, res: Response): Promise<void> {
		// await this.theDatabase.del(name);
		// res.write(JSON.stringify({'result' : 'deleted',
		// 			       'value'  : name }));
		// res.end();
	}
}

