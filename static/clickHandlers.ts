type PageData = {
    items: {
        name: string,
        category: string,
        count: number
    }[],
    check_in: boolean
}

let pageData: PageData = {
    items: [],
    check_in: true
}

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
        let dest = (<Element>e.target).getAttribute("href")?.substr(1);
        document.getElementById("chk-in-tab")?.classList.toggle("active");
        document.getElementById("chk-out-tab")?.classList.toggle("active");
        document.getElementById("btn-add-item")?.classList.toggle("btn-cyan");
        let submitText = `<i class='fe fe-check-circle'></i> Check ${dest} items`;
        document.getElementById("submit-items")!.innerHTML = submitText;
        document.getElementById("select-table")?.classList.toggle("select-cyan");
        document.getElementById("weight-modal-label")!.innerHTML = `Complete check ${dest}`;
        document.getElementById("weight-form-label")!.innerHTML = `Total weight of ${dest === 'in' ? 'donated' : 'distributed'} items`;
        document.getElementById("submit-items-modal")!.innerHTML = submitText;
        pageData.check_in = !pageData.check_in;
    }
}


function addItemHandler() {
    let name = (<HTMLInputElement>document.getElementById("inputItem")).value;
    let category = (<HTMLInputElement>document.getElementById("inputCategory")).value;
    let count = (<HTMLInputElement>document.getElementById("inputNumber")).value;
    pageData.items.push({
        name: name,
        category: category,
        count: Number(count)
    });
    document.getElementById("select-table-body")?.insertAdjacentHTML('beforeend',
        `<tr onclick="selectionHandler(event)">
                    <td>${name}</td>
                    <td>${category}</td>
                    <td>${count}</td>
                </tr>`
    );

}

function submitTransactionHandler(e: SubmitEvent): void {
    e.preventDefault();
    console.log("hello");
    (async () => {
        let data = new FormData(<HTMLFormElement>document.getElementById("weight-form"));
        console.log(data);
        for (const prop in pageData) {
            // @ts-ignore: fuck off TS the object is indexable
            data.append(prop, pageData[prop]);
        }
        console.log(data);
        let object = {};
        data.forEach((value: any, key: any) => {object[key] = value});
        console.log(object);
        const resp = await postData(window.location.origin + "/create/item", JSON.stringify(object));
        if ((await resp.json())['result'] !== 'error') {
            document.getElementById("alert-success")!.style.visibility = "visible";
        } else {
            document.getElementById("alert-error")!.style.visibility = "visible";
        }
    })();
}

async function postData(url : string, data: any) {
    const resp = await fetch(url,
			     {
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
}