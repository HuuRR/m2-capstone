import { Api } from "../controllers/Api.js";
import { Redirect } from "../controllers/Redirect.js";

function getRegisterSubmit(){
    const formRegister = document.querySelector("#form-register");
    formRegister.addEventListener("submit", registerUser);
}

function registerUser(event){
    event.preventDefault();
    const DATA = getDATA(event);
    Api.registerUser(DATA);
}

function getDATA(event){
    const forms =  [...event.target];
    const DATA = {};
    forms.forEach(element =>{
        if (element.name != "" && element.value !== "Registrar"){
            DATA[element.name] = element.value;
        }
    })
    return DATA;
}

Redirect.toLoginHTML("#login");
Redirect.toPublicHome();
getRegisterSubmit();
