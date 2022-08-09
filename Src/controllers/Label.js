class Label{

    static inputs = document.querySelectorAll("input");
    static emailLabel = document.querySelector(".label-email");
    static passwordLabel = document.querySelector(".label-password");
    static password = document.querySelector("#password");
    static email = document.querySelector("#email")

    static translateEffect(event){
        if(event.target.id === "email"){
            this.emailLabel.classList.remove("deactive");
            this.emailLabel.classList.add("active");
            if(this.passwordLabel.classList.contains("active") && this.password.value === ""){
                this.passwordLabel.classList.remove("active");
                this.passwordLabel.classList.add("deactive");
            }
        } else if (event.target.id === "password"){
            this.passwordLabel.classList.remove("deactive");
            this.passwordLabel.classList.add("active");
            if(this.emailLabel.classList.contains("active") && this.email.value === ""){
                this.emailLabel.classList.remove("active");
                this.emailLabel.classList.add("deactive");
            }
        }
    }

    static removeTranslate(){
        if(this.passwordLabel.classList.contains("active") && this.password.value === ""){
            this.passwordLabel.classList.remove("active");
            this.passwordLabel.classList.add("deactive");
        }else if(this.emailLabel.classList.contains("active") && this.email.value === ""){
            this.emailLabel.classList.remove("active");
            this.emailLabel.classList.add("deactive");
        }
    }

    static sameEmail(){
        const error = document.querySelector(".error");
        error.style.display = "block";
    }

    static emailError(){
        const errorPassword = document.querySelector(".errorPassword");
        errorPassword.style.display = "none";
        const error = document.querySelector(".error");
        error.style.display = "block";
    }

    static wrongPassword(){
        const errorEmail = document.querySelector(".error");
        errorEmail.style.display = "none";
        const error = document.querySelector(".errorPassword");
        error.style.display = "block";
    }

}

export {Label}