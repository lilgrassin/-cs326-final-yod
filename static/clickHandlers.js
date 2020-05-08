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
let pageData = {
    items: [],
    check_in: true
};
function selectionHandler(e) {
    var _a;
    let row = e.currentTarget;
    console.log(e.target);
    console.log(row);
    if (e.target instanceof Node && e.target.nodeName != "BUTTON" && ((_a = e.target.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName) != "BUTTON") {
        row.classList.toggle("selected");
    }
    e.stopPropagation();
}
function tabHandler(e) {
    var _a, _b, _c, _d, _e;
    if (e.target instanceof Node && e.target.nodeType == e.target.ELEMENT_NODE && !e.target.classList.contains("active")) {
        let dest = (_a = e.target.getAttribute("href")) === null || _a === void 0 ? void 0 : _a.substr(1);
        (_b = document.getElementById("chk-in-tab")) === null || _b === void 0 ? void 0 : _b.classList.toggle("active");
        (_c = document.getElementById("chk-out-tab")) === null || _c === void 0 ? void 0 : _c.classList.toggle("active");
        (_d = document.getElementById("btn-add-item")) === null || _d === void 0 ? void 0 : _d.classList.toggle("btn-cyan");
        let submitText = `<i class='fe fe-check-circle'></i> Check ${dest} items`;
        document.getElementById("submit-items").innerHTML = submitText;
        (_e = document.getElementById("select-table")) === null || _e === void 0 ? void 0 : _e.classList.toggle("select-cyan");
        document.getElementById("weight-modal-label").innerHTML = `Complete check ${dest}`;
        document.getElementById("weight-form-label").innerHTML = `Total weight of ${dest === 'in' ? 'donated' : 'distributed'} items`;
        document.getElementById("submit-items-modal").innerHTML = submitText;
        pageData.check_in = !pageData.check_in;
    }
}
function addItemHandler() {
    var _a;
    let name = document.getElementById("inputItem").value;
    let category = document.getElementById("inputCategory").value;
    let count = document.getElementById("inputNumber").value;
    pageData.items.push({
        name: name,
        category: category,
        count: Number(count)
    });
    (_a = document.getElementById("select-table-body")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', `<tr onclick="selectionHandler(event)">
                    <td>${name}</td>
                    <td>${category}</td>
                    <td>${count}</td>
                </tr>`);
}
function submitTransactionHandler(e) {
    e.preventDefault();
    console.log("hello");
    (() => __awaiter(this, void 0, void 0, function* () {
        let data = new FormData(document.getElementById("weight-form"));
        console.log(data);
        for (const prop in pageData) {
            // @ts-ignore: fuck off TS the object is indexable
            data.append(prop, pageData[prop]);
        }
        console.log(data);
        let object = {};
        data.forEach((value, key) => { object[key] = value; });
        console.log(object);
        const resp = yield postData(window.location.origin + "/create/item", JSON.stringify(object));
        if ((yield resp.json())['result'] !== 'error') {
            document.getElementById("alert-success").style.visibility = "visible";
        }
        else {
            document.getElementById("alert-error").style.visibility = "visible";
        }
    }))();
}
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
