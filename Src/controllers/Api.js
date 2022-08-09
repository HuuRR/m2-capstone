import { Label } from "../controllers/Label.js";
import { productsPageDOM } from "../js/cartDOM.js"
import { Cart } from "../controllers/Cards.js"
import { Dashboard } from "../models/Dashboard.js";

class Api {
    static URL = 'https://api-kenzie-food.herokuapp.com'
    static myProductsURL = '/my/products/'

    static async registerUser(data){
        const register = '/auth/register'
        await fetch(`${this.URL}${register}`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)
        })
        .then(response => response.json())
        .then((res) => {
            if(res !== "User Already Exists!"){
                window.location = '/../index.html'
            } else {
                Label.sameEmail();
            }
        })
        .catch((err) => console.error(err));
    }
    static async loginUser(data){
        const login = '/auth/login'
        await fetch(`${this.URL}${login}`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((res) => {
            if(res.error === undefined){
                localStorage.setItem("token", res)
                window.location = "./Src/pages/home.html"
            }else if(res.error === `Email: ${data.email} does not exists`){
                Label.emailError();
            } else {
                Label.wrongPassword();
            }
        })
        .catch((err) => {
            console.error(err)
        });
    }
    static async getProducts(){
        const urlP = '/products'
        let products ;
        await fetch(`${this.URL}${urlP}`)
        .then((response) => response.json())
        .then((res) => {
            products = res
        })
        .catch((err) => console.error(err));
        return products
    }

    static async getMyProducts(token){
        let myProducts ;
        await fetch("https://api-kenzie-food.herokuapp.com/my/products/", {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then((res) => myProducts = res)
        .catch((err) => console.error(err));
        return myProducts
    }

    static async newProduct(token,data){
        await fetch("https://api-kenzie-food.herokuapp.com/my/products/", {
            "method": "POST",
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((res) => {
            if(res.error){
                Dashboard.successEdit(res.error);
            }else{
                Dashboard.successEdit("Produto adicionado com sucesso!")
            }
        })
    }

    static async editProduct(token,data, id){
        await fetch(`https://api-kenzie-food.herokuapp.com/my/products/${id}`, {
            "method": "PATCH",
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)
        })
        .then((response) =>{
            if (response.ok){
                Dashboard.successEdit("Produto editado com sucesso!")
            } else{
                Dashboard.successEdit("Algo deu errado.");
            }
        })
        .catch((err) => console.error(err));
    }

    static async delProduct(token,id){
        await fetch(`${this.URL}${this.myProductsURL}${id}`, {
            "method": "DELETE",
            "headers": {
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res) => {
            if(res.ok){
                Dashboard.successEdit("Produto removido.");
            }else{
                Dashboard.successEdit("Não era para acontecer isso...");
            }
        }) 
        .catch((err) => console.error(err));
    }

    static async getCart(token){
        let cart ;
        await fetch(`${this.URL}\/cart`, {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((res) => cart = res)
        .catch((err) => console.error(err));
        return cart
    }
    static async addToCart(data,token){
        await fetch(`${this.URL}\/cart\/add`,{
            "method": "POST",
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((res) => productsPageDOM(res))

    }
    static async removeFromCart(token,id){
        const dellURL = '/cart/remove/'
        await fetch(`${this.URL}${dellURL}${id}`, {
            "method": "DELETE",
            "headers": {
                "Authorization": `Bearer ${token}`
            }
        })
        .catch((err) => console.error(err));
    }
}

export {Api}
