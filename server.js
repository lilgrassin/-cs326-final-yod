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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class PRServer {
    constructor(db) {
        // Server stuff: use express instead of http.createServer
        this.server = express_1.default();
        this.theDatabase = db;
        /* from https://enable-cors.org/server_expressjs.html */
        this.server.use(cors_1.default());
        this.server.use(express_1.default.json());
        /* Serve static pages from a particular path. */
        this.server.use('/', express_1.default.static('./static', { 'extensions': ['html'] }));
        /* TODO: Handle CREATE, READ, UPDATE, and DELETE operations
        handle errors with a wildcard (*) */
        this.server.post('/create/mail', this.createMailHandler.bind(this));
        this.server.post('/create/user', this.createUserHandler.bind(this));
        this.server.post('/create/item', this.createItemHandler.bind(this));
        this.server.post('*', (_req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(JSON.stringify({ "result": "command-not-found" }));
        }));
    }
    // TODO
    // @ts-ignore
    errorHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // let value : boolean = await this.theDatabase.isFound(req.params['userId']+"-"+req.query.name);
            // if (!value) {
            //     res.write(JSON.stringify({'result' : 'error'}));
            //     res.end();
            // } else {
            next();
            // }
        });
    }
    // FIXME
    createMailHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createMail(req.body.name, req.body.email, req.body.type, req.body.message, res);
        });
    }
    // FIXME
    createUserHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createUser(req.body.fname, req.body.lname, req.body.email, req.body.phone, req.body.grad, req.body.pass, res);
        });
    }
    createItemHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("recieved:\n" + JSON.stringify(req.body));
            let trans = {
                dataType: db_interface_1.DataType.Transaction,
                data: {
                    created: new Date(),
                    user_id: null,
                    check_in: req.body.check_in,
                    weight: req.body.weight
                }
            };
            if (!(yield this.theDatabase.put(trans))) {
                console.log("error inserting transaction");
                res.write(JSON.stringify({
                    'result': 'error',
                }));
            }
            else {
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
        });
    }
    // TODO
    // @ts-ignore
    readHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readUser(req.params['email'] + "-" + req.query.name, res);
        });
    }
    // TODO
    // @ts-ignore
    updateHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateUser(req.params['email'] + "-" + req.query.name, req.body.value, res);
        });
    }
    // TODO
    // @ts-ignore
    deleteHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteUser(req.params['email'] + "-" + req.query.name, res);
        });
    }
    // FIXME: check this?
    listen(port) {
        this.server.listen(port);
    }
    // TODO
    createUser(first, last, email, phone, graduation, password, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("creating user " + first);
            yield this.theDatabase.put({ dataType: db_interface_1.DataType.User, data: { 'fname': first, 'lname': last, 'email': email, 'phone': phone, 'password': password, 'grad': graduation, 'admin': false } });
            res.write(JSON.stringify({
                'result': 'created',
                'name': name,
                'value': 0
            }));
            res.end();
        });
    }
    // TODO
    // @ts-ignore
    errorUser(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.write(JSON.stringify({'result': 'error'}));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    readUser(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // let value = await this.theDatabase.get(name);
            // res.write(JSON.stringify({'result' : 'read',
            // 			       'name' : name,
            // 			       'value' : value }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    updateUser(name, value, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.put(name, value);
            // res.write(JSON.stringify({'result' : 'updated',
            // 			       'name' : name,
            // 			       'value' : value }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    deleteUser(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.del(name);
            // res.write(JSON.stringify({'result' : 'deleted',
            // 			       'value'  : name }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    createItem(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("creating counter named '" + name + "'");
            // await this.theDatabase.put(name, 0);
            // res.write(JSON.stringify({'result' : 'created',
            // 			       'name' : name,
            // 			       'value' : 0 }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    errorItem(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.write(JSON.stringify({'result': 'error'}));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    readItem(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // let value = await this.theDatabase.get(name);
            // res.write(JSON.stringify({'result' : 'read',
            // 			       'name' : name,
            // 			       'value' : value }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    updateItem(name, value, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.put(name, value);
            // res.write(JSON.stringify({'result' : 'updated',
            // 			       'name' : name,
            // 			       'value' : value }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    deleteItem(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.del(name);
            // res.write(JSON.stringify({'result' : 'deleted',
            // 			       'value'  : name }));
            // res.end();
        });
    }
    // FIXME: wrong database API
    createMail(name, email, type, message, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("creating mail");
            let dateTime = new Date();
            yield this.theDatabase.put({ dataType: db_interface_1.DataType.Mail, data: { 'created': dateTime, 'name': name, 'email': email, 'type': type, 'message': message } });
            res.write(JSON.stringify({
                'result': 'created',
                'name': name,
                'value': 0
            }));
            res.end();
        });
    }
    // TODO
    // @ts-ignore
    errorMail(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.write(JSON.stringify({'result': 'error'}));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    readMail(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // let value = await this.theDatabase.get(name);
            // res.write(JSON.stringify({'result' : 'read',
            // 			       'name' : name,
            // 			       'value' : value }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    updateMail(name, value, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.put(name, value);
            // res.write(JSON.stringify({'result' : 'updated',
            // 			       'name' : name,
            // 			       'value' : value }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    deleteMail(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.del(name);
            // res.write(JSON.stringify({'result' : 'deleted',
            // 			       'value'  : name }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    createTransaction(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("creating counter named '" + name + "'");
            // await this.theDatabase.put(name, 0);
            // res.write(JSON.stringify({'result' : 'created',
            // 			       'name' : name,
            // 			       'value' : 0 }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    errorTransaction(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.write(JSON.stringify({'result': 'error'}));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    readTransaction(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // let value = await this.theDatabase.get(name);
            // res.write(JSON.stringify({'result' : 'read',
            // 			       'name' : name,
            // 			       'value' : value }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    updateTransaction(name, value, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.put(name, value);
            // res.write(JSON.stringify({'result' : 'updated',
            // 			       'name' : name,
            // 			       'value' : value }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    deleteTransaction(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.del(name);
            // res.write(JSON.stringify({'result' : 'deleted',
            // 			       'value'  : name }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    createSchedule(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("creating counter named '" + name + "'");
            // await this.theDatabase.put(name, 0);
            // res.write(JSON.stringify({'result' : 'created',
            // 			       'name' : name,
            // 			       'value' : 0 }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    errorSchedule(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.write(JSON.stringify({'result': 'error'}));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    readSchedule(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // let value = await this.theDatabase.get(name);
            // res.write(JSON.stringify({'result' : 'read',
            // 			       'name' : name,
            // 			       'value' : value }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    updateSchedule(name, value, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.put(name, value);
            // res.write(JSON.stringify({'result' : 'updated',
            // 			       'name' : name,
            // 			       'value' : value }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    deleteSchedule(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.del(name);
            // res.write(JSON.stringify({'result' : 'deleted',
            // 			       'value'  : name }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    createShift(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("creating counter named '" + name + "'");
            // await this.theDatabase.put(name, 0);
            // res.write(JSON.stringify({'result' : 'created',
            // 			       'name' : name,
            // 			       'value' : 0 }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    errorShift(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.write(JSON.stringify({'result': 'error'}));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    readShift(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // let value = await this.theDatabase.get(name);
            // res.write(JSON.stringify({'result' : 'read',
            // 			       'name' : name,
            // 			       'value' : value }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    updateShift(name, value, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.put(name, value);
            // res.write(JSON.stringify({'result' : 'updated',
            // 			       'name' : name,
            // 			       'value' : value }));
            // res.end();
        });
    }
    // TODO
    // @ts-ignore
    deleteShift(name, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.del(name);
            // res.write(JSON.stringify({'result' : 'deleted',
            // 			       'value'  : name }));
            // res.end();
        });
    }
}
exports.PRServer = PRServer;
