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
function postData(url, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        });
        return resp;
    });
}
function createMessage() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let name = document.getElementById("inputName").value;
        let email = document.getElementById("inputEmail").value;
        let type = document.getElementById("inputType").value;
        let message = document.getElementById("inputMessage").value;
        let data = { 'name': name, 'email': email, 'type': type, 'message': message };
        const newURL = window.location.pathname + "/mail/create";
        const resp = yield postData(newURL, data);
        const j = yield resp.json();
        let output = document.getElementById("output");
        if (j['result'] !== 'error') {
            output.innerHTML = name + " created.</b>";
        }
        else {
            console.log("error");
        }
    }))();
}
function createUser() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let first = document.getElementById("inputFirst").value;
        let last = document.getElementById("inputLast").value;
        let email = document.getElementById("inputEmail").value;
        let phone = document.getElementById("inputPhone").value;
        let graduation = document.getElementById("inputGrad").value;
        let password = document.getElementById("inputPassword").value;
        let data = { 'firstName': first, 'lastName': last, 'email': email, 'phone': phone, 'graduation': graduation, 'password': password };
        const newURL = window.location.pathname + "/create/user";
        const resp = yield postData(newURL, data);
        const j = yield resp.json();
        let output = document.getElementById("output");
        if (j['result'] !== 'error') {
            output.innerHTML = first + " created.</b>";
        }
        else {
            console.log("error");
        }
    }))();
}
function readInventory() {
    (() => __awaiter(this, void 0, void 0, function* () {
        const data = {};
        const newURL = window.location.pathname + "/inventory/read";
        console.log("counterRead: fetching " + newURL);
        const resp = yield postData(newURL, data);
        const j = yield resp.json();
        if (j['result'] !== 'error') {
            console.log("read");
        }
        else {
            console.log("error");
        }
    }))();
}
