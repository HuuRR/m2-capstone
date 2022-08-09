import { Api } from "../controllers/Api.js";
import { Cart } from "../controllers/Cards.js";

async function productsPageDOM(){
    const data = await Api.getProducts();
    constructorProducts(data);
}

productsPageDOM()

function constructorProducts(data){

    const container = document.querySelector("#container");
    container.innerHTML = "";
    data.forEach((item)=> {
        const productCard        = document.createElement("div");
        const img                = document.createElement("img");
        const h3                 = document.createElement("h3");
        const divDescricaoTag    = document.createElement("div");
        const p                  = document.createElement("p");
        const span               = document.createElement("span");
        const divPrice           = document.createElement("div");
        const price              = document.createElement("span");
        const icon               = document.createElement("div");
        const span_i             = document.createElement("span");
        const i                  = document.createElement("i");

        divDescricaoTag.className = "divDescricaoTag";
        productCard.className     = "productCard";
        divPrice.className        = "divPrice";
        price.className           = "price";
        icon.className            = "icon";
        i.className               = "fa-solid fa-cart-plus";


        p.innerText               = item.descricao;
        h3.innerText              = item.nome;
        img.src                   = item.imagem;
        span.innerText            = item.categoria;
        price.innerText           =  `R$ ${item.preco}`;

        span_i.setAttribute('id', "addProduct")
        span_i.dataset.itemId = item.id
        i.dataset.itemId = item.id
        span_i.appendChild(i);
        icon.appendChild(span_i);
        divPrice.appendChild(price);
        divPrice.appendChild(icon);
        divDescricaoTag.appendChild(p);
        divDescricaoTag.appendChild(span);
        productCard.appendChild(img);
        productCard.appendChild(h3);
        productCard.appendChild(divDescricaoTag);
        productCard.appendChild(divPrice);
        container.appendChild(productCard);
    });


    Cart.handleCardsEvents()


}


function constructorSearch(products){
    
    const barCamp = document.querySelector("#barCamp")
    barCamp.innerHTML       = ""
    products.forEach((item) =>{
        
        const productBar        = document.createElement("div")               
        const imgBarSearch      = document.createElement("img")   
        const span              = document.createElement("span")   
        productBar.className    = "productBar"
        imgBarSearch.className  = "imgBarSearch"
       
        imgBarSearch.src        = item.imagem
        span.innerText          = item.nome


        
        productBar.appendChild(imgBarSearch)
        productBar.appendChild(span)
        barCamp.appendChild(productBar)
        
    })
}
export {constructorProducts, constructorSearch};