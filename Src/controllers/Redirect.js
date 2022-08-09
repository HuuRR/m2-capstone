class Redirect{

    static toRegisterHTML(){
        const cadastrar = document.querySelector("#register");
        cadastrar.addEventListener("click",  ()=>{
            window.location.href = "/Src/pages/register.html"
        })
    }

    static toLoginHTML(id){
        const login = document.querySelector(id);
        login.addEventListener("click", ()=>{
            window.location.href = "/../index.html"
        })
    }

    static toPublicHome(){
        const skip = document.querySelector("#skip-register");
        skip.addEventListener("click", ()=>{
            window.location.href = "/Src/pages/home.html";
        })
    }

}

export {Redirect};