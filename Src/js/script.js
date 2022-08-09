import { Label } from "../controllers/Label.js";
import { Redirect } from "../controllers/Redirect.js";
import { Api } from "../controllers/Api.js";

function getEvent(){
    window.addEventListener("click", (event)=>{
        if(event.target.id === "email" || event.target.id === "password"){
            Label.translateEffect(event);
        }else{
            Label.removeTranslate();
        }
    });
}

function getLoginSubmit(){
    const formLogin = document.querySelector("#form-login");
    formLogin.addEventListener("submit", loginUser);
}

function loginUser(event){
    event.preventDefault();
    const DATA = getDATA(event);
    Api.loginUser(DATA);
}

function getDATA(event){
    const forms =  [...event.target];
    const DATA = {};
    forms.forEach(element =>{
        if (element.name != "" && element.value !== "Entrar"){
            DATA[element.name] = element.value;
        }
    })
    return DATA;
}


Redirect.toRegisterHTML();
Redirect.toPublicHome();
getLoginSubmit();
getEvent();