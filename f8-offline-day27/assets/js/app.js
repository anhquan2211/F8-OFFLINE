// variables

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");
const overlay = document.querySelector("#overlay");

// This is button what can be clicked to remove all cart
const clearCartBtn = document.createElement("button");
clearCartBtn.className = "clear-cart banner-btn";
clearCartBtn.innerText = "Clear cart";
function eventRemoveBtn() {
  if (cart.length > 0) {
    document.querySelector(".cart-footer").append(clearCartBtn);
  } else {
    clearCartBtn?.remove?.();
  }
}

//cart
let cart = [];
//buttons
let buttonsDOM = [];

let edit = false;

// getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch("https://api-anhquan.vercel.app/items");
      let products = await result.json();
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      return products;
    } catch (error) {
      console.log("error", error);
    }
  }
}

// display products
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
        <!-- single product -->
        <article class="product">
          <div class="img-container skeleton">
            <img
              src=${product.image}
              alt="product"
              class="product-img"
            />
            <button class="bag-btn" data-id=${product.id}>
              <i class="fas fa-shopping-cart"></i>
              Add to cart
            </button>
          </div>
          <h3 class="skeleton">${product.title}</h3>
          <h4 class="skeleton">$${product.price}</h4>
        </article>
        <!-- end of single product -->
        `;
    });
    productsDOM.innerHTML = result;
  }

  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;
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

        //get product from products
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        //add product to the cart
        cart = [...cart, cartItem];
        //save cart in local storage
        Storage.saveCart(cart);
        //set cart values
        this.setCartValues(cart);
        //display cart item
        this.addCartItem(cartItem);
        //show the cart
        this.showCart();
      });
    });
  }

  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += +item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }

  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
        <img src="${item.image}" alt="product" />
        <div>
            <h4>${item.title}</h4>
            <h5>$${item.price}</h5>
            <span class="remove-item" data-id=${item.id}>Remove</span>
        </div>
        <div class="icon-wrapper">
            <i class="fas fa-chevron-up" data-id=${item.id}></i>
            <p class="item-amount" data-id=${item.id}>${item.amount}</p>
            <i class="fas fa-chevron-down" data-id=${item.id}></i>
        </div>
    `;
    cartContent.appendChild(div);
  }

  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
    eventRemoveBtn();
  }

  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }

  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener("click", this.showCart);
    closeCartBtn.addEventListener("click", this.hideCart);
  }

  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }

  cartLogic() {
    //clear cart button
    clearCartBtn?.addEventListener("click", () => {
      this.clearCart();
    });
    //cart functionality
    cartContent.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        let removeItem = e.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      } else if (e.target.classList.contains("item-amount")) {
        let itemAmount = e.target;
        let _this = this;
        itemAmount.setAttribute("contenteditable", true);
        itemAmount.onblur = function () {
          let arrayCart = JSON.parse(localStorage.cart);
          arrayCart.forEach((item) => {
            if (itemAmount.dataset.id === item.id) {
              itemAmount.innerText = itemAmount.innerText.replace(
                /[^0-9]/g,
                ""
              );
              item.amount = itemAmount.innerText;
            }
          });
          cart = arrayCart;
          Storage.saveCart(cart);
          _this.setCartValues(cart);
        };
      } else if (e.target.classList.contains("fa-chevron-up")) {
        let addAmount = e.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (e.target.classList.contains("fa-chevron-down")) {
        let lowerAmount = e.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        } else {
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
          this.removeItem(id);
        }
        eventRemoveBtn();
      }
    });
  }

  clearCart() {
    let cartItems = cart.map((item) => item.id);
    cartItems.forEach((id) => this.removeItem(id));
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    this.hideCart();
  }

  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
    eventRemoveBtn();
  }

  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
  }

  skeleton() {
    const allSkeleton = document.querySelectorAll(".skeleton");
    // console.log(allSkeleton);
    // window.addEventListener("load", function () {
    //   console.log("loaded");
    //   allSkeleton.forEach((item) => {
    //     item.classList.remove("skeleton");
    //   });
    // });
    setTimeout(() => {
      allSkeleton.forEach((item) => {
        item.classList.remove("skeleton");
      });
    }, 2000);
  }
}

// local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }
  static saveCart() {
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
  // setup app
  ui.setupAPP();

  //   get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      ui.skeleton();
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic();
    });
});

overlay.addEventListener("change", function () {
  cartOverlay.classList.remove("transparentBcg");
  cartDOM.classList.remove("showCart");
});
