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
Object.defineProperty(exports, "__esModule", { value: true });
const url = "http://localhost:8080";
function readInventory() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let type = document.getElementById("inputType").value;
        let item = document.getElementById("inputItem").value;
        let newURL = url;
        if (type) {
            newURL = newURL + "/stock/type/read?type=" + type;
        }
        if (item) {
            newURL = newURL + "/stock/item/read?item=" + item;
        }
        const resp = yield fetch(newURL);
        const j = yield resp.json();
        if (j['result'] !== 'error') {
            document.getElementById("output").innerHTML = "error";
        }
        else {
            document.getElementById("output").innerHTML = "name: " + name;
        }
    }))();
}
