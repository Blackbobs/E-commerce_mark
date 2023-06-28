const menuBtn = document.querySelector(".fa-bars-staggered");
const sideMenu = document.querySelector(".side-menu");
const cartBtn = document.querySelector(".cart");
const cartUi = document.querySelector(".cart-overlay");
const search = document.querySelector(".fa-search");
const closeBtn = document.querySelector(".fa-close");
const closeCart = document.querySelector(".fa-times-circle");
const productDom = document.querySelector(".inner-products");

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
        alt=""
        class="img"
      />
      <div class="net">
        <h4 class="name">${product.title}</h4>
        <i class="fa fa-heart" aria-hidden="true"></i>
      </div>
      <div class="order" data-id=${product.id}>
        <small>${product.price}</small>
        <a href="#" class="bag-btn">Add to cart</a>
      </div>
    </div>
      `;
    });
    productDom.innerHTML = result;
  }
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttons.forEach((button) => {
      let id = button.dataset.id;
      console.log(id);
    });
  }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

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
