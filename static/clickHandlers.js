function selectionHandler(e) {
    var _a;
    var row = e.currentTarget;
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
        {
            var dest = (_a = e.target.getAttribute("href")) === null || _a === void 0 ? void 0 : _a.substr(1);
            (_b = document.getElementById("chk-in-tab")) === null || _b === void 0 ? void 0 : _b.classList.toggle("active");
            (_c = document.getElementById("chk-out-tab")) === null || _c === void 0 ? void 0 : _c.classList.toggle("active");
            (_d = document.getElementById("btn-add-item")) === null || _d === void 0 ? void 0 : _d.classList.toggle("btn-cyan");
            // @ts-ignore submit-items definitely exists
            document.getElementById("submit-items").innerHTML = "<i class='fe fe-check-circle'></i> Check " + dest + " items";
            (_e = document.getElementById("select-table")) === null || _e === void 0 ? void 0 : _e.classList.toggle("select-cyan");
        }
    }
}
