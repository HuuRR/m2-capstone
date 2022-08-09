import { Api } from "./Api.js";
import { constructorProducts, constructorSearch } from "../js/carroselDOM.js";

class Filter{

    static getTagButtons(){
        const categories = document.querySelector("#categories").childNodes;
        const buttons = [ ];
        categories.forEach(element => {
            if(element.nodeName === "BUTTON"){
                buttons.push(element);
            };
        })
        return buttons
    }

    static async filterByTag(){
        const products = await Api.getProducts();
        const buttons = this.getTagButtons();
        buttons.forEach(button => {
            button.addEventListener("click", ()=>{
                
                for (const element of buttons){
                    if (element.id !== button.id){
                        element.classList.remove("tag--active");
                    }
                }

                if(button.id === "todos"){
                    button.classList.add("tag--active");
                    constructorProducts(products);
                } else{
                    const productsByTag = products.filter(products => products.categoria.toUpperCase() === button.id.toUpperCase());
                    button.classList.add("tag--active");
                    constructorProducts(productsByTag);
                }

            })
        });
    }
        static async filterInput(){
        const products = await Api.getProducts();
        const searchBar   = document.querySelector("#textBox");


        searchBar.addEventListener('keyup',()=>{
            
            let productsValueBar = products.filter(item => item.nome.toUpperCase().includes(searchBar.value.toUpperCase()))
            constructorSearch(productsValueBar)
        }) 
                
        
      
    }
    static showInputBox(){
        const body        = document.querySelector("body");
        
        const modalSearch = document.querySelector("#modalSearchBar");

        body.addEventListener('click', (e)=>{
            if(e.target.name == "search"){
                modalSearch.style.display = "flex"   
            }else{
                modalSearch.style.display = "none"   

            }})
    }
}

export {Filter}