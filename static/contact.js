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
function createMessage() {
    (() => __awaiter(this, void 0, void 0, function* () {
        let name = document.getElementById("inputName").value;
        let email = document.getElementById("inputEmail").value;
        let type = document.getElementById("inputType").value;
        let message = document.getElementById("inputMessage").value;
        const newURL = window.location.pathname + "/mail/create";
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
