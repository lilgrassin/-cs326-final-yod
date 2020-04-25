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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = __importStar(require("mongodb"));
exports.Database = class Database {
    constructor(collectionName) {
        this.uri = "mongodb+srv://guest:guest@cluster0-y0tyl.mongodb.net/test?retryWrites=true&w=majority";
        this.dbName = "pantryraider";
        this.collectionName = collectionName;
        this.client = new mongodb.MongoClient(this.uri, { useNewUrlParser: true });
        (() => __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore: https://stackoverflow.com/questions/51675833/typescript-error-property-is-used-before-being-assigned
            yield this.client.connect().catch(err => { console.log(err); });
        }))();
    }
    put(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection(this.collectionName);
            console.log("put: key = " + key + ", value = " + value);
            let result = yield collection.updateOne({ 'name': key }, { $set: { 'value': value } }, { 'upsert': true });
            console.log("result = " + result);
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection(this.collectionName);
            console.log("get: key = " + key);
            let result = yield collection.findOne({ 'name': key });
            console.log("get: returned " + JSON.stringify(result));
            if (result) {
                return result.value;
            }
            else {
                return null;
            }
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection(this.collectionName);
            console.log("delete: key = " + key);
            let result = yield collection.deleteOne({ 'name': key });
            console.log("result = " + result);
        });
    }
    isFound(key) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("isFound: key = " + key);
            let v = yield this.get(key);
            console.log("is found result = " + v);
            if (v === null) {
                return false;
            }
            else {
                return true;
            }
        });
    }
};
