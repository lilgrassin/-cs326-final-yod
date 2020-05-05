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

function createMessage() {
    (async () => {
	let name = (<HTMLInputElement>document.getElementById("inputName")).value;
	let email = (<HTMLInputElement>document.getElementById("inputEmail")).value;
	let type = (<HTMLInputElement>document.getElementById("inputType")).value;
	let message = (<HTMLInputElement>document.getElementById("inputMessage")).value;
    let data = {'name': name, 'email': email, 'type': type, 'message': message};
    const newURL = window.location.pathname + "/mail/create"; 
    const resp = await postData(newURL, data);
    const j = await resp.json();
    let output = document!.getElementById("output") as HTMLOutputElement;
    if (j!['result'] !== 'error') {
	    output!.innerHTML = name + " created.</b>";
	} else {
	    console.log("error");
    }
    })();
}

function createUser() {
    (async () => {
    let first = (<HTMLInputElement>document.getElementById("inputFirst")).value;
    let last = (<HTMLInputElement>document.getElementById("inputLast")).value;
	let email = (<HTMLInputElement>document.getElementById("inputEmail")).value;
	let phone = (<HTMLInputElement>document.getElementById("inputPhone")).value;
    let graduation = (<HTMLInputElement>document.getElementById("inputGrad")).value;
    let password = (<HTMLInputElement>document.getElementById("inputPassword")).value;
	let data = { 'firstName': first, 'lastName': last, 'email': email, 'phone': phone, 'graduation': graduation, 'password':password};
    const newURL = window.location.pathname + "/create/user";
    const resp = await postData(newURL, data);
    const j = await resp.json();
    let output = document!.getElementById("output") as HTMLOutputElement;
    if (j!['result'] !== 'error') {
	    output!.innerHTML = first + " created.</b>";
	} else {
	    console.log("error");
	}
    })();
}

function readInventory() {
    (async () => {
    const data = { };
    const newURL = window.location.pathname + "/inventory/read";
    console.log("counterRead: fetching " + newURL);
    const resp = await postData(newURL, data);
    const j = await resp.json();
    if (j['result'] !== 'error') {
        console.log("read");
    } else {
        console.log("error");
    }
    })();
}

