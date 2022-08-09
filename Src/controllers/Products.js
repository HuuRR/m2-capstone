import { Dashboard } from "../models/Dashboard.js";

class Products{
    
    static getDATA(forms){
        const DATA = {};
        forms.forEach(element =>{
            if (element.value != ""){
                if(element.name === "preco"){
                    DATA[element.name] = Number(element.value);
                }else{
                    DATA[element.name] = element.value;
                }
            }
        })
        return DATA;
    }

    static renderMyProducts(data){

        const div = document.createElement("div");
        div.setAttribute("class", "editProduct-div");

        data.forEach(element =>{

            const cartProduct = document.createElement('div')
            const cartProductHeader = document.createElement("div");
            const cartProductBody = document.createElement("div");
            const cartProductDelete = document.createElement("div");
    
            const img = document.createElement('img')
            const h2 = document.createElement("h2");
            const span = document.createElement("span");
            const h3 = document.createElement("h3");
            const button = document.createElement("button");
            const icone = document.createElement("i");
            const removerBtn = document.createElement("button");
            const iconeRemove = document.createElement("i");
            
            cartProduct.setAttribute("class", "cart-product");
            cartProductHeader.setAttribute("class", "cart-product-header");
            cartProductBody.setAttribute("class", "cart-product-body");
            cartProductDelete.setAttribute("class", "cart-product-delete");
            icone.setAttribute("class", "fa-solid fa-pen-to-square");
            iconeRemove.setAttribute("class", "fa-solid fa-trash");
    
            button.setAttribute("id", "openEdit");
            button.dataset.itemId = element.id;
            button.appendChild(icone);

            removerBtn.setAttribute("id", element.id);
            removerBtn.appendChild(iconeRemove);
            
            button.addEventListener("click", Dashboard.openEdit)
            removerBtn.addEventListener("click", Dashboard.removeProduct);
            
            img.src = element.imagem;
            h2.textContent = element.nome;
            span.textContent = element.categoria;
            h3.textContent = `R$${element.preco}`;
            
            cartProductHeader.appendChild(img);
            cartProductBody.append(h2,span,h3);
            cartProductDelete.append(button, removerBtn);
            cartProduct.append(cartProductHeader, cartProductBody, cartProductDelete);
            div.appendChild(cartProduct);

        })
        return div;
    }

}

export {Products}