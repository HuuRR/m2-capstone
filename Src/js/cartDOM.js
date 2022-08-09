import { Api } from "../controllers/Api.js";
import { Cart } from "../controllers/Cards.js"

async function productsPageDOM(id){
    const token = localStorage.getItem('token') 
    if(token !== null ){
        const data = await Api.getCart(token);
        constructorCartLogin(data);
    } else {
        if(localStorage.length === 0) {
        
        } else{
            const itens = await Api.getProducts()
            const length = localStorage.length + 1
            const data = []
            for(let i = 1; i < length; i++){
                let obj = {}
                obj.quantity = JSON.parse(localStorage.getItem(i)).quantity
                itens.filter((ele) => {
                    if (ele.id === JSON.parse(localStorage.getItem(i)).id){
                        obj.products = ele
                    }})
                    data.push(obj)
                    constructorCartLogin(data)
                }
            }
        }
    }
        
        function constructorCartLogin(data){
            const mainCart = document.querySelector('.ProductCar')
            const cartBody = document.querySelector('.cart-body')
            const cartFooter = document.querySelector(".cart-footer");
            mainCart.innerText = ""
            cartBody.innerText = ""
            data.forEach(element => {
                
                const cartProduct = document.createElement('div')
                const cartProductHeader = document.createElement("div");
                const cartProductBody = document.createElement("div");
                const cartProductDelete = document.createElement("div");
                
                const img = document.createElement('img')
                const h2 = document.createElement("h2");
                const span = document.createElement("span");
                const h3 = document.createElement("h3");
                const h4 = document.createElement('h4')
                const button = document.createElement("button");
                const icone = document.createElement("i");
                
                cartProduct.setAttribute("class", "cart-product");
                cartProductHeader.setAttribute("class", "cart-product-header");
                cartProductBody.setAttribute("class", "cart-product-body");
                cartProductDelete.setAttribute("class", "cart-product-delete");
                icone.setAttribute("class", "fa-solid fa-trash");
                h4.setAttribute('id', 'quantity-total')
                h3.setAttribute('id', 'value-total')
                
                h3.dataset.value = element.products.preco
                h4.dataset.quantity = element.quantity
                button.setAttribute("id", "sendToTrash");
                button.dataset.itemId = element.products.id;
                icone.dataset.itemId = element.products.id;
                button.appendChild(icone);
                
                img.src = element.products.imagem;
                h2.textContent = element.products.nome;
                span.textContent = element.products.categoria;
                h3.textContent = `R$ ${element.products.preco}`;
                h4.textContent = `quantidade: ${element.quantity}`
                
                h3.append(h4);
                cartProductHeader.appendChild(img);
                cartProductBody.append(h2,span,h3);
                cartProductDelete.append(button);
                cartProduct.append(cartProductHeader, cartProductBody, cartProductDelete);
                
                
                cartBody.append(cartProduct);
                mainCart.append(cartProduct.cloneNode(true))
                
            });
            
            totalSoma()
            
            const trashButton = document.querySelectorAll('#sendToTrash')
            trashButton.forEach(ele => {
                ele.addEventListener("click", async (e)=>{
                    await Cart.removeFromCart(e.target.dataset.itemId);
                })
            }) 
            if(data.length > 0){
                cartFooter.style.display = "block"
            } else {
                cartFooter.style.display = "none";
                cartBody.innerHTML = `<div class="empty-cart" id="empty-cart">
                <i id="basket-icon" class="fa-solid fa-basket-shopping"></i>
                <h3>Por enquanto não temos produto no carrinho</h3>
                </div>`
            }
            
        }
        
        function totalSoma(){
            let total = 0
            
            const quantityTotal = document.querySelectorAll('#quantity-total')
            quantityTotal.forEach((ele) => {
                total += parseInt(ele.dataset.quantity)
                return total
            })
            
            const cartQuantity = document.querySelectorAll('#cartQuantity')
            cartQuantity.forEach(ele => ele.innerText = total/2)
            
            
            let value = []
            
            const valueTotal = document.querySelectorAll('#value-total')
            valueTotal.forEach(ele => {
                let add = parseInt(ele.childNodes[1].dataset.quantity) * parseInt(ele.dataset.value)
                value.push(add)
            })
            const cartTotal = document.querySelectorAll('#cartTotal')
            const value3 = value.reduce((acc,contador) => acc + contador,0)
            cartTotal.forEach(ele => ele.innerText = `R$${value3/2}`)
        }
        
        export { productsPageDOM }