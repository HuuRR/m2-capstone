import { productsPageDOM } from "../js/cartDOM.js"

const btnCar = document.querySelector("#cart");

btnCar.addEventListener("click", operCar)


function operCar (){

    productsPageDOM()
    
    const modalCar = document.querySelector("#modalCar");
    modalCar.style.display = "flex"
}

const btnClose = document.querySelector("#close")

btnClose.addEventListener("click", closeCar)

function closeCar (){
    const modalCar = document.querySelector("#modalCar");

    modalCar.style.display = "none"

}