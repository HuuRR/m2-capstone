import { Api } from "./Api.js"
import { productsPageDOM } from "../js/cartDOM.js"

class Cart {
        
    static async handleCardsEvents(){
        const cards = document.querySelectorAll('#addProduct')
        cards.forEach(ele => {
            ele.addEventListener('click', (e) => {
                this.addItemToCart(e.target.dataset.itemId);
            })
        })
    }
        
    static addItemToCart(id,quantidade){
        const token = localStorage.getItem('token')
        const data = {}
        data['product_id'] = id
        if(token !== null){
            Api.addToCart(data,token)
        } else {
            const length = localStorage.length + 1
            
            if (localStorage.length > 0){
                let arr = []
                for(let i = 1; i < length; i++){
                    let item = JSON.parse(localStorage.getItem(i))
                    arr.push(item)
                }
                if(arr.some((ele) => ele.id === id)){
                    let index = arr.findIndex(ele => ele.id === id)
                    let item = JSON.parse(localStorage.getItem(index+1))
                    item.quantity++
                    localStorage.removeItem(index+1)
                    localStorage.setItem(index+1,JSON.stringify(item))
                } else {
                    let item = {}
                    item.id = id
                    item.quantity = 1
                    localStorage.setItem(length, JSON.stringify(item))
                }        
            } else {
                let item = {}
                item.id = id
                
                item.quantity = quantidade || 1
                localStorage.setItem(length, JSON.stringify(item))
            }
        }
        productsPageDOM()
    }
    
    static async removeFromCart(id){
        const token = localStorage.getItem('token')
        if(token !== null){
            await Api.removeFromCart(token,id)
        } else {
            if(localStorage.length == 1){
                localStorage.clear()
                window.location.reload()
            }
            let arr = []
            for(let i = 1; i < localStorage.length+1; i++){
                let item = JSON.parse(localStorage.getItem(i))
                arr.push(item)
            }
            localStorage.clear()
            arr.filter(ele => {
                if(ele.id !== id){
                    this.addItemToCart(ele.id,ele.quantity)
                    
                }
            })
        }
        productsPageDOM()
    }

} 


export { Cart }