const itemQnt = document.getElementById("numberOfItems");
const mainElement = document.querySelector("main");
let scrollY = window.scrollY;
let numberOfProducts = 0;

async function getPricesAndNames() {
  let promise = await fetch("php/products.php", {
    method: "GET",
  });

  let data = await promise.json();
  return data;
}

async function getCartInfo() {
  let promise = await fetch("php/getCart.php", {
    method: "GET",
  });

  let data = await promise.json();
  return data;
}

async function renderProductCards() {
  while (mainElement.firstChild) {
    mainElement.removeChild(mainElement.lastChild);
  }
  const productArray = await getCartInfo();
  numberOfProducts = productArray.length;
  productArray;
  productArray.forEach((product) => {
    createCard(
      product.img,
      product.name,
      product.price,
      product.quantity,
      product.cart_id,
      product.product_id
    );
    numberOfProducts += 1;
  });
}

function createCard(img, name, price, quantity, cartId, productId) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price * quantity);

  let cardHTML = `
    <div class="product-outer">
      <div class="product-img" style="background-image: URL(${img}); background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;">
      </div>
        <div class="product-name">
          <span>${name}</span>
        </div>
        <div class="quantity-outer">
          <div>
            <span class="qtn-number" id="numberOfItems${productId}">
              ${quantity}
            </span>
          </div>
          <div class="qnt-counter">
             <button class="increase-qnt" id="increase${productId}" onclick="increaseQuantity(${productId} , ${price})">
          +
        </button>
        <button class="decrease-qnt" id="decrease${productId}" onclick="decreaseQuantity( ${productId}, ${price} )">
          -
        </button>
          </div>
        </div>
        <div class="product-price" id="productPrice${productId}">${formattedPrice}</div>
        <div class="trash-can">
          <i class="fa-solid fa-trash" onclick="trashCanCart(${productId})"></i>
        </div>
      </div>
    </div>
  `;

  mainElement.insertAdjacentHTML("beforeend", cardHTML);
}

let updatedQuantities = {};

function decreaseQuantity(productId, productPrice) {
  let quantitySpan = document.getElementById("numberOfItems" + productId);
  let productPriceVal = document.getElementById("productPrice" + productId);

  let quantityText = parseInt(quantitySpan.textContent);
  if (quantityText > 0) {
    quantityText -= 1;
    quantitySpan.textContent = quantityText;
    updatedQuantities[productId] = quantityText;

    let totalPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(quantityText * productPrice);
    productPriceVal.textContent = totalPrice;
  }
  calcTotalCart();
}

function increaseQuantity(productId, productPrice) {
  let quantitySpan = document.getElementById("numberOfItems" + productId);
  let productPriceVal = document.getElementById("productPrice" + productId);

  let quantityText = parseInt(quantitySpan.textContent);
  if (quantityText < 100) {
    quantityText += 1;
    quantitySpan.textContent = quantityText;
    updatedQuantities[productId] = quantityText;

    let totalPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(quantityText * productPrice);
    productPriceVal.textContent = totalPrice;
  }
  calcTotalCart();
}

function trashCanCart(productId) {
  let quantitySpan = document.getElementById("numberOfItems" + productId);
  let productPriceVal = document.getElementById("productPrice" + productId);

  quantitySpan.textContent = 0;
  updatedQuantities[productId] = 0;

  let totalPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(0);
  productPriceVal.textContent = totalPrice;
  calcTotalCart();
}

window.addEventListener("beforeunload", updateQuantityDataBase);

async function updateQuantityDataBase() {
  let data = new FormData();
  data.append("updated_quantities", JSON.stringify(updatedQuantities));

  let promise = await fetch("php/changeCartQnt.php", {
    method: "POST",
    body: data,
  });
}

async function calcTotalCart() {
  const subTotalDiv = document.getElementById("subTotalDiv");
  let productArray = await getCartInfo();
  let subTotal = 0;

  productArray.forEach((car) => {
    let sumOfProduct = document.getElementById("productPrice" + car.product_id);

    subTotal += parseFloat(sumOfProduct.textContent.replace(/[^\d,-]/g, ""));
  });

  subTotalDiv.textContent = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(subTotal);

  let deliveryTotal = subTotal * 0.001;
  const deliverydiv = document.getElementById("deliveryFee");

  deliverydiv.textContent = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(deliveryTotal);

  let total = subTotal + deliveryTotal;

  const totalDiv = document.getElementById("totalDiv");

  totalDiv.textContent = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(total);
}

async function createFinishPurchase() {
  const finishPurchaseDiv = document.getElementById("finishPurchase");

  cardFinishPurchaseHTML = `
      <span class="cart-finish-purchase">Seu carrinho</span>
      <span class="sub-total-outer">SubTotal: <span id="subTotalDiv"></span></span>
      <span class="delivery-outer">Frete: <span id="deliveryFee"></span> </span>
      <div class="dividing-div-finish-purchase"></div>
      <span class="total-outer">Total: <span id="totalDiv"></span></span>
      <button class="finish-purchase-button" id="finishPurchase">Finalizar compra</button>`;

  finishPurchaseDiv.insertAdjacentHTML("beforeend", cardFinishPurchaseHTML);
}

window.onload = renderProductCards();
createFinishPurchase();
calcTotalCart();
