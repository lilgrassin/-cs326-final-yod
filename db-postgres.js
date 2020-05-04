"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_interface_1 = require("./db-interface");
const pg_promise_1 = __importDefault(require("pg-promise"));
const pgp = pg_promise_1.default({
    /* initialization options */
    capSQL: true // capitalize all generated SQL
});
class Database {
    // private userColumns = new pgp.helpers.ColumnSet();
    // private itemColumns: ColumnSet;
    // private statColumns: ColumnSet;
    // private mailColumns: ColumnSet;
    // private shiftColumns: ColumnSet;
    // private userMailColumns: ColumnSet;
    // private itemStatColumns: ColumnSet;
    constructor() {
        this.userMailTable = new pgp.helpers.TableName(`${db_interface_1.DataType.User}_${db_interface_1.DataType.Mail}`);
        this.itemStatTable = new pgp.helpers.TableName(`${db_interface_1.DataType.Item}_${db_interface_1.DataType.Transaction}`);
        console.log(process.env.DATABASE_URL);
        if (!process.env.DATABASE_URL) {
            throw `process.env.DATABASE_URL=${process.env.DATABASE_URL}`;
        }
        this.db = pgp(process.env.DATABASE_URL);
        console.log("db = " + JSON.stringify(this.db));
        /*  IIFE pattern: https://anthonychu.ca/post/async-await-typescript-nodejs/
         *  self: https://stackoverflow.com/questions/51675833/typescript-error-property-is-used-before-being-assigned
         *  (this.db is assigned in constructor)
         */
        ((self) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createTableSQL = (cols) => { return `CREATE TABLE $(table~) (${cols})`; };
                /***** Data Tables *****/
                console.log("creating users");
                // Users
                yield self.db.none(createTableSQL(`id SERIAL PRIMARY KEY,
						fname VARCHAR(100) NOT NULL,
						lname VARCHAR(100) NOT NULL,
						phone CHAR(10) UNIQUE NOT NULL,
						email VARCHAR(100) NOT NULL UNIQUE,
						password VARCHAR(100) NOT NULL,
						grad DATE NOT NULL,
						admin BOOLEAN NOT NULL`), { table: db_interface_1.DataType.User });
                // Items
                console.log("creating items");
                yield self.db.none(createTableSQL(`id SERIAL PRIMARY KEY,
						name VARCHAR(100) NOT NULL,
						category VARCHAR(100) NOT NULL,
						stock INTEGER NOT NULL,
						donated INTEGER NOT NULL,
						distributed INTEGER NOT NULL,
						UNIQUE (name, category)`), { table: db_interface_1.DataType.Item });
                // Mail
                console.log("creating mail");
                yield self.db.none(createTableSQL(`id SERIAL PRIMARY KEY,
						created TIMESTAMP NOT NULL,
						sent TIMESTAMP,
						subject VARCHAR(300) NOT NULL,
						content TEXT NOT NULL`), { table: db_interface_1.DataType.Mail });
                // Statistics/Transactions
                console.log("creating stats");
                yield self.db.none(createTableSQL(`id SERIAL PRIMARY KEY,
						user_id SERIAL REFERENCES $(userRef~) NOT NULL,
						created TIMESTAMP NOT NULL,
						check_in BOOLEAN NOT NULL,
						weight INTEGER NOT NULL`), {
                    table: db_interface_1.DataType.Transaction,
                    userRef: db_interface_1.DataType.User
                });
                // Shifts
                console.log("creating shifts");
                yield self.db.none(createTableSQL(`id SERIAL PRIMARY KEY,
						shift TIMESTAMP UNIQUE NOT NULL,
						user1_id SERIAL REFERENCES $(userRef~),
						user2_id SERIAL REFERENCES $(userRef~),
						CHECK (user1_id IS DISTINCT FROM user2_id)`), {
                    table: db_interface_1.DataType.Shift,
                    userRef: db_interface_1.DataType.User
                });
                /***** Relational Tables *****/
                // Mail <-> Users (Owner, Sender, Recipient)
                console.log("creating mail-users");
                yield self.db.none(createTableSQL(`user_id SERIAL REFERENCES $(userRef~),
						message_id SERIAL REFERENCES $(mailRef~),
						is_owner BOOLEAN NOT NULL,
						is_sender BOOLEAN NOT NULL,
						is_recipient BOOLEAN NOT NULL,
						PRIMARY KEY (user_id, message_id),
						CHECK (is_sender OR is_recipient)`), {
                    table: self.userMailTable,
                    userRef: db_interface_1.DataType.User,
                    mailRef: db_interface_1.DataType.Mail
                });
                // Constrain each message to a unique sender
                console.log("creating mail-users index");
                yield self.db.none("CREATE UNIQUE INDEX single_message_sender ON $(table~) (message_id) WHERE (is_sender)", { table: self.userMailTable });
                // Items <-> Statistics/Transactions
                console.log("creating items-stats");
                yield self.db.none(createTableSQL(`item_id SERIAL REFERENCES $(itemRef~),
						stat_id SERIAL REFERENCES $(statRef~),
						item_count INTEGER NOT NULL,
						PRIMARY KEY (item_id, stat_id)`), {
                    table: self.itemStatTable,
                    itemRef: db_interface_1.DataType.Item,
                    statRef: db_interface_1.DataType.Transaction
                });
            }
            catch (e) {
                // Already created.
                console.log(e);
            }
        }))(this);
    }
    put(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("put: type = " + obj.dataType + ", object = " + obj);
            const query = obj.criteria
                ? "UPDATE ${dataType~} SET (${data~}) = (${data:csv}) WHERE (${criteria~}) = (${critera:csv})"
                : "INSERT INTO ${dataType~}(${data~}) VALUES(${data:csv})";
            try {
                yield this.db.none(query, obj);
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    get(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get: type = " + obj.dataType + ", object = " + obj);
            const query = "SELECT * FROM ${dataType~} WHERE (${criteria~}) = (${critera:csv})";
            try {
                let result = yield this.db.any(query, obj);
                console.log("get: returned " + JSON.stringify(result));
                return result;
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
    aggregate(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    del(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("del: type = " + obj.dataType + ", object = " + obj);
            const query = "DELETE FROM ${dataType~} WHERE (${criteria~}) = (${critera:csv})";
            try {
                yield this.db.none(query, obj);
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
}
exports.Database = Database;
