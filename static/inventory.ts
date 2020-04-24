export {};
const url = "http://localhost:8080";

function readInventory() {
    (async () => {
	let type = (<HTMLInputElement>document.getElementById("inputType")).value;
	let item = (<HTMLInputElement>document.getElementById("inputItem")).value;
    let newURL = url;
    if(type){
        newURL = newURL + "/stock/type/read?type=" + type;
    }
    if(item){
        newURL = newURL + "/stock/item/read?item=" + item;
    }
	const resp = await fetch(newURL);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = "error";
	} else {
	    document.getElementById("output").innerHTML = "name: " + name;
	}
    })();
}