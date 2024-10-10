const mainMenu = document.getElementById("menuContainer");
const openMenu = document.getElementById("menuOpener");
const firstBar = document.getElementById("firstBar");
const secondBar = document.getElementById("secondBar");
const thirdBar = document.getElementById("thirdBar");
const mainElement = document.querySelector("main");
const searchBar = document.getElementById("searchBar");
const body = document.body;
let menuIsOpened = false;
let numOfProducts = 0;
let searchText = "";

searchBar.addEventListener("input", (event) => {
  searchText = event.target.value;
  renderCards();
  console.log(searchText);
});

async function getPricesAndNames() {
  let promise = await fetch("php/getProducts.php", {
    method: "GET",
  });

  let data = await promise.json();
  return data;
}

async function postNewProduct() {
  const form = document.getElementById("addProductForm");
  const data = new FormData(form);

  await fetch("php/postProducts.php", {
    method: "POST",
    body: data,
  });

  form.elements["name"].value = "";
  form.elements["price"].value = "";
  form.elements["img"].value = "";
  renderCards();
}

async function removeProduct() {
  const form = document.getElementById("removeProductForm");
  const data = new FormData(form);

  await fetch("php/removeProduct.php", {
    method: "POST",
    body: data,
  });

  openProductRemoveWindow();
  renderCards();
}

async function renderCards() {
  let cars = await getPricesAndNames();
  while (mainElement.firstChild) {
    mainElement.removeChild(mainElement.lastChild);
  }
  cars = cars.filter((car) =>
    car.name
      .toUpperCase()
      .replace(/\s/g, "")
      .includes(searchText.toUpperCase().replace(/\s/g, ""))
  );
  if (cars.length > 0) {
    cars.forEach((car) => {
      createAndAppendProductCard(car.id, car.name, car.price, car.img);
    });
  } else {
    appendNoCarsFoundText();
  }
}

openMenu.addEventListener("click", () => {
  if (!menuIsOpened) {
    mainMenu.style.transform = "translateY(0%)";
    firstBar.style.transform = "translateY(6px) rotate(225deg)";
    secondBar.style.opacity = "0";
    thirdBar.style.transform = "translateY(-6px) rotate(-225deg)";
    body.style.overflow = "hidden";
    menuIsOpened = true;
  } else {
    mainMenu.style.transform = "translateY(-100%)";
    firstBar.style.transform = "";
    secondBar.style.opacity = "";
    thirdBar.style.transform = "";
    body.style.overflow = "auto";
    menuIsOpened = false;
  }
});

function appendNoCarsFoundText() {
  const HTML = "<h4>Nenhum item corresponde à sua pesquisa...</h4>";
  mainElement.insertAdjacentHTML("beforeend", HTML);
}

function createAndAppendProductCard(id, name, price, imgUrl) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  const cardHTML = `
    <div class="outer-product">
      <div class="product-info" style="background-image: url(${imgUrl})">
        <div class="product-name">${name}</div>
        <div class="product-price">${formattedPrice}</div>
      </div>
      <div class="add-to-cart" onclick="addToCart(${id}, 1)">
        <span>Adicionar ao carrinho</span>
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
    </div>
  `;

  mainElement.insertAdjacentHTML("beforeend", cardHTML);
  numOfProducts += 1;
}

async function fillSelectInput() {
  const productArray = await getPricesAndNames();
  const selectRemove = document.getElementById("selectRemove");
  while (selectRemove.firstChild) {
    selectRemove.removeChild(selectRemove.lastChild);
  }

  productArray.forEach((product) => {
    const currentOption = document.createElement("option");
    currentOption.textContent = product.name;
    currentOption.setAttribute("value", product.id);
    selectRemove.appendChild(currentOption);
  });
}

let addProduct = false;
const addProductWindow = document.getElementById("addProductWindow");
const overlay = document.getElementById("overlay");

function openProductAddWindow() {
  if (!addProduct) {
    addProductWindow.style.width = "30%";
    addProductWindow.style.height = "60vh";
    addProductWindow.style.border = "solid 2px #000";
    body.style.overflow = "hidden";
    addProductWindow.style.top = "20vh";
    addProductWindow.style.left = "35%";
    overlay.style.display = "block";
    addProduct = true;
  } else {
    addProductWindow.style.top = "50%";
    addProductWindow.style.left = "50%";
    addProductWindow.style.width = "0";
    addProductWindow.style.height = "0";
    addProductWindow.style.border = "none";
    body.style.overflow = "auto";
    overlay.style.display = "none";
    addProduct = false;
  }
}

let removeProductWindowIsOpened = false;
const removeProductWindow = document.getElementById("removeProductWindow");
const overlay2 = document.getElementById("overlay2");

function openProductRemoveWindow() {
  if (!removeProductWindowIsOpened) {
    removeProductWindow.style.width = "30%";
    removeProductWindow.style.height = "60vh";
    removeProductWindow.style.border = "solid 2px #000";
    body.style.overflow = "hidden";
    removeProductWindow.style.top = "20vh";
    removeProductWindow.style.left = "35%";
    overlay2.style.display = "block";
    fillSelectInput();
    removeProductWindowIsOpened = true;
  } else {
    removeProductWindow.style.top = "50%";
    removeProductWindow.style.left = "50%";
    removeProductWindow.style.width = "0";
    removeProductWindow.style.height = "0";
    removeProductWindow.style.border = "none";
    body.style.overflow = "auto";
    overlay2.style.display = "none";
    removeProductWindowIsOpened = false;
  }
}

async function addToCart(product_id, cart_id) {
  let data = new FormData();
  data.append("product_id", product_id);
  data.append("cart_id", cart_id);
  await fetch("php/addToCart.php", {
    method: "POST",
    body: data,
  });
}

renderCards();

//todo create add to cart chip
//todo fix scroll behavior
//todo management of carts
