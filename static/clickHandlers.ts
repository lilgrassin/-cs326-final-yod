function selectionHandler(e: MouseEvent): void {
    let row = e.currentTarget as Element;
    console.log(e.target);
    console.log(row);
    if (e.target instanceof Node && e.target.nodeName != "BUTTON" && e.target.parentNode?.nodeName != "BUTTON") {
        row.classList.toggle("selected");
    }
    e.stopPropagation();
}


function tabHandler(e: MouseEvent): void {
    if (e.target instanceof Node && e.target.nodeType == e.target.ELEMENT_NODE && !(e.target as Element).classList.contains("active")) {
        {
            let dest = (<Element>e.target).getAttribute("href")?.substr(1);
            document.getElementById("chk-in-tab")?.classList.toggle("active");
            document.getElementById("chk-out-tab")?.classList.toggle("active");
            document.getElementById("btn-add-item")?.classList.toggle("btn-cyan");
            // @ts-ignore submit-items definitely exists
            document.getElementById("submit-items").innerHTML = "<i class='fe fe-check-circle'></i> Check " + dest + " items";
            document.getElementById("select-table")?.classList.toggle("select-cyan");
        }
    }
}