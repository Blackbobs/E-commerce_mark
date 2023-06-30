const menuBtn = document.querySelector(".fa-bars-staggered");
const sideMenu = document.querySelector(".side-menu");
const cartBtn = document.querySelector(".cart");
const cartUi = document.querySelector(".cart-overlay");
const search = document.querySelector(".fa-search");
const closeBtn = document.querySelector(".fa-close");
const closeCart = document.querySelector(".fa-times-circle");
const productDom = document.querySelector(".inner-products");
const cartTotal = document.querySelector(".total");
const cartItems = document.querySelector(".cart-items");
const cartContent = document.querySelector(".cart-content");

// events listener
menuBtn.addEventListener("click", displayMenu);
search.addEventListener("click", displayMenu);
closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("show");
});
closeCart.addEventListener("click", () => {
  cartUi.classList.remove("show");
});

cartBtn.addEventListener("click", () => {
  cartUi.classList.add("show");
});

function displayMenu() {
  sideMenu.classList.toggle("show");
}

let cart = [];

let buttonsDom = [];

class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const title = item.name_d;
        const price = item.price;
        const id = item.id;
        const image = item.img;
        return { title, price, id, image };
      });
      return products;
    } catch (error) {}
  }
}

class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
      <div class="item">
      <img
        src="./images/young-woman-training-gym.jpg"
        alt="product"
        class="img"
      />
      <div class="net">
        <h4 class="name">${product.title}</h4>
        <i class="fa fa-heart" aria-hidden="true"></i>
      </div>
      <div class="order">
        <small>&#8358; ${product.price}</small>
        <button class="bag-btn" data-id=${product.id}>Add to cart</button>
      </div>
    </div>
      `;
    });
    productDom.innerHTML = result;
  }
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDom = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }
      button.addEventListener("click", (e) => {
        e.target.innerText = "In Cart";
        e.target.disabled = true;

        let cartItem = { ...Storage.getProducts(id), amount: 1 };
        cart = [...cart, cartItem];

        Storage.saveCart(cart);

        this.setCartValues(cart);
        this.addCartItem(cartItem);
      });
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerHTML = `Total : &#8358; ${tempTotal}`;
    cartItems.innerText = itemsTotal;
  }

  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
          <div class="cart-img">
            <img src="./images/young-woman-training-gym.jpg" alt="product" />
          </div>
          <div class="description">
            <h5 class="item-name">${item.title}</h5>
            <small class="prc">&#8358; ${item.price}</small>
            <br>
            <small class="remove-item" data-id=${item.id}>remove</small>
          </div>
          <div class="quantity">
            <i class="fas fa-chevron-up" data-id=${item.id}></i>
            <small class="no_item">${item.amount}</small>
            <i class="fas fa-chevron-down" data-id=${item.id}></i>
          </div>
    `;
    cartContent.appendChild(div);
  }

  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
  }
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProducts(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  ui.setupAPP();

  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
    });
});
