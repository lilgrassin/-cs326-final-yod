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
class PRServer {
    constructor(db) {
        // Server stuff: use express instead of http.createServer
        this.server = express_1.default();
        this.router = express_1.default.Router();
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
        this.server.use('/', express_1.default.static('./static', { 'extensions': ['html'] }));
        /* TODO: Handle CREATE, READ, UPDATE, and DELETE operations
        handle errors with a wildcard (*) */
        this.router.get('/create/mail', this.createMailHandler.bind(this));
        this.router.get('/create/user', this.createUserHandler.bind(this));
        this.router.get('/users/:userId/read', [this.errorHandler.bind(this), this.readHandler.bind(this)]);
        this.router.get('/users/:userId/update', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);
        this.router.get('/users/:userId/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
        this.router.get('*', (request, response) => __awaiter(this, void 0, void 0, function* () {
            response.send(JSON.stringify({ "result": "command-not-found" }));
        }));
        this.server.use('/counter', this.router);
    }
    // TODO
    errorHandler(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // let value : boolean = await this.theDatabase.isFound(request.params['userId']+"-"+request.query.name);
            // if (!value) {
            //     response.write(JSON.stringify({'result' : 'error'}));
            //     response.end();
            // } else {
            next();
            // }
        });
    }
    // TODO
    createMailHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createMail(request.query.name, request.query.email, request.query.type, request.query.message, response);
        });
    }
    createUserHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createUser(request.query.name, request.query.email, request.query.type, request.query.message, response);
        });
    }
    // TODO
    readHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readUser(request.params['email'] + "-" + request.query.name, response);
        });
    }
    // TODO
    updateHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateUser(request.params['email'] + "-" + request.query.name, request.query.value, response);
        });
    }
    // TODO
    deleteHandler(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteUser(request.params['email'] + "-" + request.query.name, response);
        });
    }
    // FIXME: check this?
    listen(port) {
        this.server.listen(port);
    }
    // TODO
    createUser(first, last, email, phone, graduation, password, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("creating user " + first);
            yield this.theDatabase.put({ dataType: db_interface_1.DataType.User, data: { 'fname': first, 'lname': last, 'email': email, 'phone': phone, 'password': password, 'grad': graduation, 'admin': false } });
            response.write(JSON.stringify({ 'result': 'created',
                'name': name,
                'value': 0 }));
            response.end();
        });
    }
    // TODO
    errorUser(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // response.write(JSON.stringify({'result': 'error'}));
            // response.end();
        });
    }
    // TODO
    readUser(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // let value = await this.theDatabase.get(name);
            // response.write(JSON.stringify({'result' : 'read',
            // 			       'name' : name,
            // 			       'value' : value }));
            // response.end();
        });
    }
    // TODO
    updateUser(name, value, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.put(name, value);
            // response.write(JSON.stringify({'result' : 'updated',
            // 			       'name' : name,
            // 			       'value' : value }));
            // response.end();
        });
    }
    // TODO
    deleteUser(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.del(name);
            // response.write(JSON.stringify({'result' : 'deleted',
            // 			       'value'  : name }));
            // response.end();
        });
    }
    // TODO
    createItem(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("creating counter named '" + name + "'");
            // await this.theDatabase.put(name, 0);
            // response.write(JSON.stringify({'result' : 'created',
            // 			       'name' : name,
            // 			       'value' : 0 }));
            // response.end();
        });
    }
    // TODO
    errorItem(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // response.write(JSON.stringify({'result': 'error'}));
            // response.end();
        });
    }
    // TODO
    readItem(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // let value = await this.theDatabase.get(name);
            // response.write(JSON.stringify({'result' : 'read',
            // 			       'name' : name,
            // 			       'value' : value }));
            // response.end();
        });
    }
    // TODO
    updateItem(name, value, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.put(name, value);
            // response.write(JSON.stringify({'result' : 'updated',
            // 			       'name' : name,
            // 			       'value' : value }));
            // response.end();
        });
    }
    // TODO
    deleteItem(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.del(name);
            // response.write(JSON.stringify({'result' : 'deleted',
            // 			       'value'  : name }));
            // response.end();
        });
    }
    // TODO
    createMail(name, email, type, message, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("creating mail");
            let dateTime = new Date();
            yield this.theDatabase.put({ dataType: db_interface_1.DataType.Mail, data: { 'created': dateTime, 'name': name, 'email': email, 'type': type, 'message': message } });
            response.write(JSON.stringify({ 'result': 'created',
                'name': name,
                'value': 0 }));
            response.end();
        });
    }
    // TODO
    errorMail(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // response.write(JSON.stringify({'result': 'error'}));
            // response.end();
        });
    }
    // TODO
    readMail(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // let value = await this.theDatabase.get(name);
            // response.write(JSON.stringify({'result' : 'read',
            // 			       'name' : name,
            // 			       'value' : value }));
            // response.end();
        });
    }
    // TODO
    updateMail(name, value, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.put(name, value);
            // response.write(JSON.stringify({'result' : 'updated',
            // 			       'name' : name,
            // 			       'value' : value }));
            // response.end();
        });
    }
    // TODO
    deleteMail(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.del(name);
            // response.write(JSON.stringify({'result' : 'deleted',
            // 			       'value'  : name }));
            // response.end();
        });
    }
    // TODO
    createTransaction(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("creating counter named '" + name + "'");
            // await this.theDatabase.put(name, 0);
            // response.write(JSON.stringify({'result' : 'created',
            // 			       'name' : name,
            // 			       'value' : 0 }));
            // response.end();
        });
    }
    // TODO
    errorTransaction(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // response.write(JSON.stringify({'result': 'error'}));
            // response.end();
        });
    }
    // TODO
    readTransaction(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // let value = await this.theDatabase.get(name);
            // response.write(JSON.stringify({'result' : 'read',
            // 			       'name' : name,
            // 			       'value' : value }));
            // response.end();
        });
    }
    // TODO
    updateTransaction(name, value, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.put(name, value);
            // response.write(JSON.stringify({'result' : 'updated',
            // 			       'name' : name,
            // 			       'value' : value }));
            // response.end();
        });
    }
    // TODO
    deleteTransaction(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.del(name);
            // response.write(JSON.stringify({'result' : 'deleted',
            // 			       'value'  : name }));
            // response.end();
        });
    }
    // TODO
    createSchedule(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("creating counter named '" + name + "'");
            // await this.theDatabase.put(name, 0);
            // response.write(JSON.stringify({'result' : 'created',
            // 			       'name' : name,
            // 			       'value' : 0 }));
            // response.end();
        });
    }
    // TODO
    errorSchedule(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // response.write(JSON.stringify({'result': 'error'}));
            // response.end();
        });
    }
    // TODO
    readSchedule(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // let value = await this.theDatabase.get(name);
            // response.write(JSON.stringify({'result' : 'read',
            // 			       'name' : name,
            // 			       'value' : value }));
            // response.end();
        });
    }
    // TODO
    updateSchedule(name, value, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.put(name, value);
            // response.write(JSON.stringify({'result' : 'updated',
            // 			       'name' : name,
            // 			       'value' : value }));
            // response.end();
        });
    }
    // TODO
    deleteSchedule(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.del(name);
            // response.write(JSON.stringify({'result' : 'deleted',
            // 			       'value'  : name }));
            // response.end();
        });
    }
    // TODO
    createShift(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("creating counter named '" + name + "'");
            // await this.theDatabase.put(name, 0);
            // response.write(JSON.stringify({'result' : 'created',
            // 			       'name' : name,
            // 			       'value' : 0 }));
            // response.end();
        });
    }
    // TODO
    errorShift(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // response.write(JSON.stringify({'result': 'error'}));
            // response.end();
        });
    }
    // TODO
    readShift(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // let value = await this.theDatabase.get(name);
            // response.write(JSON.stringify({'result' : 'read',
            // 			       'name' : name,
            // 			       'value' : value }));
            // response.end();
        });
    }
    // TODO
    updateShift(name, value, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.put(name, value);
            // response.write(JSON.stringify({'result' : 'updated',
            // 			       'name' : name,
            // 			       'value' : value }));
            // response.end();
        });
    }
    // TODO
    deleteShift(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.theDatabase.del(name);
            // response.write(JSON.stringify({'result' : 'deleted',
            // 			       'value'  : name }));
            // response.end();
        });
    }
}
exports.PRServer = PRServer;
