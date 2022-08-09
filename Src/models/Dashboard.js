import { Api } from "../controllers/Api.js";
import { Products } from "../controllers/Products.js";
import { Redirect } from "../controllers/Redirect.js";

class Dashboard {
  static dashModal = document.querySelector("#modalDashboard");
  static modalBody = document.querySelector(".dashboard--body");
  static token = localStorage.getItem("token");

  static openDashboard() {
    if (this.token !== null) {
      const dashBtn = document.querySelector("#profile");
      dashBtn.addEventListener("click", () => {
        this.dashModal.style.display = "block";
      });
    } else {
        const dashBtn = document.querySelector("#profile");
        dashBtn.addEventListener("click", () => {
            const loginModal = document.querySelector("#loginModal");
            loginModal.style.display = "block";
        });
    }
  }

  static closeDashboard() {
    const dashBtn = document.querySelector("#closeDashboard");
    dashBtn.addEventListener("click", () => {
      this.modalBody.innerHTML = "";
      this.dashModal.style.display = "none";
    });
  }

  static renderAddInputs(inputs, callback, buttonName, id) {
    const form = document.createElement("form");
    form.classList.add("addProduct-div");

    for (let count = 0; count < inputs; count++) {
      const input = document.createElement("input");
      input.classList.add("addProduct-input");
      input.type = "text";

      switch (count) {
        case 0:
          (input.name = "nome"), (input.placeholder = "Nome do produto");
          break;
        case 1:
          (input.name = "categoria"),
            (input.placeholder = "Categoria do produto");
          break;
        case 2:
          (input.name = "descricao"),
            (input.placeholder = "Descrição do produto");
          break;
        case 3:
          (input.name = "imagem"),
            (input.type = "url"),
            (input.placeholder = "URL com imagem do produto");
          break;
        case 4:
          (input.name = "preco"),
            (input.type = "text"),
            (input.placeholder = "Valor do produto");
          break;
      }

      form.appendChild(input);
    }
    const adicionarBtn = document.createElement("button");
    adicionarBtn.id = "addProductBtn";
    adicionarBtn.textContent = buttonName;
    adicionarBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const forms = [...form];
      const DATA = Products.getDATA(forms);
      const token = localStorage.getItem("token");
      await callback(token, DATA, id);
    });

    form.appendChild(adicionarBtn);
    this.modalBody.appendChild(form);
  }

  static openAddProduct() {
    const addProductBtn = document.querySelector("#addProductDash");
    addProductBtn.addEventListener("click", () => {
      this.modalBody.innerHTML = "";
      this.renderAddInputs(5, Api.newProduct, "Adicionar novo produto");
    });
  }

  static myProducts() {
    const myProducts = document.querySelector("#editProduct");
    myProducts.addEventListener("click", async () => {
      this.modalBody.innerHTML = "";
      const DATA = await Api.getMyProducts(this.token);
      this.modalBody.appendChild(Products.renderMyProducts(DATA));
    });
  }

  static removeProduct(){

    const ID = this.id;
    const h2 = document.createElement("h2");
    const confirm = document.createElement("button");
    const decline = document.createElement("button");
    const div = document.createElement("div");

    Dashboard.modalBody.innerHTML = ""

    h2.textContent = "Remover produto?"
    confirm.textContent = "Sim";
    decline.textContent = "Não";

    confirm.setAttribute("class", "confirm");
    decline.setAttribute("class", "decline");
    h2.setAttribute("class", "deleteWarning");
    div.setAttribute("class", "remove-div");

    div.append(h2,confirm, decline);
    Dashboard.modalBody.append(div);

    confirm.addEventListener("click", async ()=>{
      await Api.delProduct(Dashboard.token, ID);
    })

    decline.addEventListener("click", ()=>{
      Dashboard.dashModal.style.display = "none";
    })

  }

  static openEdit() {
    const ID = this.dataset.itemId;
    const modalBody = document.querySelector(".dashboard--body");
    modalBody.innerHTML = "";
    Dashboard.renderAddInputs(5, Api.editProduct, "Confirmar edit", ID);
  }

  static successEdit(text) {
    Dashboard.dashModal.style.display = "none";
    Dashboard.modalBody.innerHTML = "";
    const sucessModal = document.querySelector("#modalSuccess");
    sucessModal.style.display = "block";
    sucessModal.classList.remove("slide-out");
    setTimeout(() => {
      sucessModal.classList.add("slide-in");
    }, 100);
    const TEXT = document.querySelector("#success-h2");
    TEXT.textContent = text;
    const close = document.querySelector("#closeModal");
    close.addEventListener("click", () => {
      sucessModal.classList.remove("slide-in");
      sucessModal.classList.add("slide-out");
      setTimeout(() => {
        sucessModal.style.display = "none";
      }, 1000);
    });
  }

  static logout() {
    const logout = document.querySelector("#userLogout");
    logout.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "/../index.html";
    });
  }

  static retornarLogin() {
    Redirect.toLoginHTML("#yes");
  }

  static continuarSemLogin(){
      const btn = document.querySelector("#no");
      btn.addEventListener("click", ()=>{
        const loginModal = document.querySelector("#loginModal");
        loginModal.style.display = "none";
      })
  }

  static dashboard() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      this.openDashboard();
      this.closeDashboard();
      this.openAddProduct();
      this.myProducts();
      this.logout();
    } else {
      this.openDashboard();
      this.retornarLogin();
      this.continuarSemLogin();
    }
  }
}

export { Dashboard };
