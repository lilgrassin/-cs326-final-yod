import { DatabaseInterface, DatabaseConstructor } from './db-interface';
import * as mongodb from "mongodb";

export const Database: DatabaseConstructor = class Database implements DatabaseInterface {

	private uri = "mongodb+srv://guest:guest@cluster0-y0tyl.mongodb.net/test?retryWrites=true&w=majority";
	private client: mongodb.MongoClient;
	private collectionName: string;
	private dbName: string = "pantryraider";

	constructor(collectionName: string) {
		this.collectionName = collectionName;
		this.client = new mongodb.MongoClient(this.uri, { useNewUrlParser: true });
		(async () => {
			// @ts-ignore: https://stackoverflow.com/questions/51675833/typescript-error-property-is-used-before-being-assigned
			await this.client.connect().catch(err => { console.log(err); });
		})();
	}

	public async put(key: string, value: string): Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("put: key = " + key + ", value = " + value);
		let result = await collection.updateOne({ 'name': key }, { $set: { 'value': value } }, { 'upsert': true });
		console.log("result = " + result);
	}

	public async get(key: string): Promise<string | null> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("get: key = " + key);
		let result = await collection.findOne({ 'name': key });
		console.log("get: returned " + JSON.stringify(result));
		if (result) {
			return result.value;
		} else {
			return null;
		}
	}

	public async del(key: string): Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("delete: key = " + key);
		let result = await collection.deleteOne({ 'name': key });
		console.log("result = " + result);
	}

	public async isFound(key: string): Promise<boolean> {
		console.log("isFound: key = " + key);
		let v = await this.get(key);
		console.log("is found result = " + v);
		if (v === null) {
			return false;
		} else {
			return true;
		}
	}
}
