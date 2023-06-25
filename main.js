const menuBtn = document.querySelector(".fa-bars-staggered");
const sideMenu = document.querySelector(".side-menu");
const cartBtn = document.querySelector(".cart");
const cartUi = document.querySelector(".cart-overlay");
const search = document.querySelector(".fa-search");
const closeBtn = document.querySelector(".fa-close");
const closeCart = document.querySelector(".fa-times-circle");

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
  cartUi.classList.toggle("show");
});

function displayMenu() {
  sideMenu.classList.toggle("show");
}

class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      return data;
    } catch (error) {}
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();

  products.getProducts().then((data) => console.log(data));
});
