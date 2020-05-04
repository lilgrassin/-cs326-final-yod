import { DatabaseInterface, ObjectData, DataType } from './db-interface';
import pgpromise, { IDatabase } from "pg-promise";
import { IClient } from 'pg-promise/typescript/pg-subset';

const pgp = pgpromise({
	/* initialization options */
	capSQL: true // capitalize all generated SQL
});


export class Database implements DatabaseInterface {

	private db: IDatabase<{}, IClient>;
	private userMailTable = new pgp.helpers.TableName(`${DataType.User}_${DataType.Mail}`);
	private itemStatTable = new pgp.helpers.TableName(`${DataType.Item}_${DataType.Transaction}`);
	// private userColumns = new pgp.helpers.ColumnSet();
	// private itemColumns: ColumnSet;
	// private statColumns: ColumnSet;
	// private mailColumns: ColumnSet;
	// private shiftColumns: ColumnSet;
	// private userMailColumns: ColumnSet;
	// private itemStatColumns: ColumnSet;

	constructor() {
		console.log(process.env.DATABASE_URL)
		if (!process.env.DATABASE_URL) {
			throw `process.env.DATABASE_URL=${process.env.DATABASE_URL}`;
		}
		this.db = pgp(process.env.DATABASE_URL);
		console.log("db = " + JSON.stringify(this.db));

		/*  IIFE pattern: https://anthonychu.ca/post/async-await-typescript-nodejs/ 
		 *  self: https://stackoverflow.com/questions/51675833/typescript-error-property-is-used-before-being-assigned
		 *  (this.db is assigned in constructor)
		 */
		(async (self) => {
			try {
				const createTableSQL = (cols: string) => { return `CREATE TABLE $(table~) (${cols})`; };
				/***** Data Tables *****/
				console.log("creating users");
				// Users
				await self.db.none(
					createTableSQL(
						`id SERIAL PRIMARY KEY,
						fname VARCHAR(100) NOT NULL,
						lname VARCHAR(100) NOT NULL,
						phone CHAR(10) UNIQUE NOT NULL,
						email VARCHAR(100) NOT NULL UNIQUE,
						password VARCHAR(100) NOT NULL,
						grad DATE NOT NULL,
						admin BOOLEAN NOT NULL`
					),
					{ table: DataType.User }
				);
				// Items
				console.log("creating items");
				await self.db.none(
					createTableSQL(
						`id SERIAL PRIMARY KEY,
						name VARCHAR(100) NOT NULL,
						category VARCHAR(100) NOT NULL,
						stock INTEGER NOT NULL,
						donated INTEGER NOT NULL,
						distributed INTEGER NOT NULL,
						UNIQUE (name, category)`
					),
					{ table: DataType.Item }
				);
				// Mail
				console.log("creating mail");
				await self.db.none(
					createTableSQL(
						`id SERIAL PRIMARY KEY,
						created TIMESTAMP NOT NULL,
						sent TIMESTAMP,
						subject VARCHAR(300) NOT NULL,
						content TEXT NOT NULL`
					),
					{ table: DataType.Mail }
				);
				// Statistics/Transactions
				console.log("creating stats");
				await self.db.none(
					createTableSQL(
						`id SERIAL PRIMARY KEY,
						user_id SERIAL REFERENCES $(userRef~) NOT NULL,
						created TIMESTAMP NOT NULL,
						check_in BOOLEAN NOT NULL,
						weight INTEGER NOT NULL`
					),
					{
						table: DataType.Transaction,
						userRef: DataType.User
					}
				);
				// Shifts
				console.log("creating shifts");
				await self.db.none(
					createTableSQL(
						`id SERIAL PRIMARY KEY,
						shift TIMESTAMP UNIQUE NOT NULL,
						user1_id SERIAL REFERENCES $(userRef~),
						user2_id SERIAL REFERENCES $(userRef~),
						CHECK (user1_id IS DISTINCT FROM user2_id)`
					),
					{
						table: DataType.Shift,
						userRef: DataType.User
					}
				);

				/***** Relational Tables *****/
				// Mail <-> Users (Owner, Sender, Recipient)
				console.log("creating mail-users");
				await self.db.none(
					createTableSQL(
						`user_id SERIAL REFERENCES $(userRef~),
						message_id SERIAL REFERENCES $(mailRef~),
						is_owner BOOLEAN NOT NULL,
						is_sender BOOLEAN NOT NULL,
						is_recipient BOOLEAN NOT NULL,
						PRIMARY KEY (user_id, message_id),
						CHECK (is_sender OR is_recipient)`
					),
					{
						table: self.userMailTable,
						userRef: DataType.User,
						mailRef: DataType.Mail
					}
				);
				// Constrain each message to a unique sender
				console.log("creating mail-users index");
				await self.db.none(
					"CREATE UNIQUE INDEX single_message_sender ON $(table~) (message_id) WHERE (is_sender)",
					{ table: self.userMailTable }
				);
				// Items <-> Statistics/Transactions
				console.log("creating items-stats");
				await self.db.none(
					createTableSQL(
						`item_id SERIAL REFERENCES $(itemRef~),
						stat_id SERIAL REFERENCES $(statRef~),
						item_count INTEGER NOT NULL,
						PRIMARY KEY (item_id, stat_id)`
					),
					{
						table: self.itemStatTable,
						itemRef: DataType.Item,
						statRef: DataType.Transaction
					}
				);

			} catch (e) {
				// Already created.
				console.log(e);
			}
		})(this);
	}

	public async put(obj: ObjectData): Promise<boolean> {
		console.log("put: type = " + obj.dataType + ", object = " + obj);
		const query = obj.criteria
			? "UPDATE ${dataType~} SET (${data~}) = (${data:csv}) WHERE (${criteria~}) = (${critera:csv})"
			: "INSERT INTO ${dataType~}(${data~}) VALUES(${data:csv})";
		try {
			await this.db.none(query, obj);
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	}

	public async get(obj: ObjectData): Promise<object[] | null> {
		console.log("get: type = " + obj.dataType + ", object = " + obj);
		const query = "SELECT * FROM ${dataType~} WHERE (${criteria~}) = (${critera:csv})";
		try {
			let result = await this.db.any(query, obj);
			console.log("get: returned " + JSON.stringify(result));
			if (result.length) {
				return result;
			} else {
				return [];
			}
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	public async aggregate(obj: ObjectData): Promise<object[] | null> {
		return null;
	}

	public async del(obj: ObjectData): Promise<boolean> {
		console.log("del: type = " + obj.dataType + ", object = " + obj);
		const query = "DELETE FROM ${dataType~} WHERE (${criteria~}) = (${critera:csv})";
		try {
			await this.db.none(query, obj);
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	}
}
