function joinAlert() {
alert("Welcome to ABC Fitness Studio!");
}

function saveContact(event) {
event.preventDefault();

let name = document.getElementById("name").value;
let email = document.getElementById("email").value;

localStorage.setItem("name", name);
localStorage.setItem("email", email);

document.getElementById("message").innerHTML =
"Thank you " + name + "! We will contact you soon.";
}
