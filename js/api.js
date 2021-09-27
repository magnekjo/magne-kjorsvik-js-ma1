const url = "https://fakestoreapi.com/products";
const products = document.querySelector(".products");
const loader = document.querySelector(".loader");
const search = document.querySelector(".filter");

async function getProducts() {
  try {
    const response = await fetch(url);
    const results = await response.json();

    loader.innerHTML = "";

    return results;
  } catch (error) {
    loader.innerHTML = "An error has occured <br>" + error;
  }
}

function createHTML(product) {
  products.innerHTML += `
        <div class="products__item">
            <div class="product-image" style="background-image: url(${product.image})"></div>
            <h4 class="product-name">${product.title}</h4>
            <h5 class="product-price">${product.price}</h5>
        </div>`;
}

const allProducts = await getProducts();
allProducts.forEach(createHTML);

search.onkeyup = (event) => {
  products.innerHTML = "";

  let searchValue = event.target.value;
  let filteredProducts = allProducts.filter((product) => {
    if (product.price <= searchValue) {
      return true;
    }
  });

  filteredProducts.forEach(createHTML);
};
