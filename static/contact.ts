function createMessage() {
    (async () => {
	let name = (<HTMLInputElement>document.getElementById("inputName")).value;
	let email = (<HTMLInputElement>document.getElementById("inputEmail")).value;
	let type = (<HTMLInputElement>document.getElementById("inputType")).value;
	let message = (<HTMLInputElement>document.getElementById("inputMessage")).value;
	const newURL = window.location.pathname + "/mail/create";
	const resp = await fetch(newURL);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = "error";
	} else {
	    document.getElementById("output").innerHTML = "name: " + name;
	}
    })();
}