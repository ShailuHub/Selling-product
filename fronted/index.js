const form = document.getElementById("form");
const price = document.getElementById("price");
const productName = document.getElementById("name");
const submit = document.getElementById("submit");
const listItem = document.getElementById("listItem");
const total = document.getElementById("total");
const baseUrl = "http://localhost:3000";

let sum = 0;

form.addEventListener("submit", product);
listItem.addEventListener("click", handleDeleteButton);

//submit handler function
function product(event) {
  event.preventDefault();
  const details = {
    product: productName.value,
    price: price.value,
  };
  postProduct(details);
}

//Get request
async function getProducts() {
  try {
    const response = await axios.get(`${baseUrl}/admin/add-product`);
    const products = response.data;
    sum = 0;
    products.forEach((product) => {
      const newPrice = product.price;
      if (!isNaN(newPrice)) {
        sum += newPrice;
      }
      showData(product);
    });
  } catch (err) {
    console.log(err);
  }
}

//Showing initial total amount and previous data
total.innerText = `Total amount: ${sum}`;
getProducts();

// Post request
async function postProduct(details) {
  try {
    await axios.post(`${baseUrl}/admin/add-product`, details);
    listItem.innerHTML = "";
    getProducts();
  } catch (err) {
    console.log(err);
  }
}

//delete request
async function deleteProduct(productId) {
  try {
    const res = await axios.get(`${baseUrl}/admin/add-product/${productId}`);
    sum -= res.data.price;
    total.innerText = `Total amount: ${sum}`;

    await axios.delete(`${baseUrl}/admin/delete-product/${productId}`);
    const rowToDelete = document.querySelector(`[data-item-id="${productId}"]`);

    if (rowToDelete) {
      rowToDelete.remove();
    }
  } catch (err) {
    console.log(err);
  }
}

//Handling delete function
function handleDeleteButton(event) {
  const target = event.target;
  if (target.classList.contains("btn-danger")) {
    const parentRow = target.closest(".row");
    if (parentRow) {
      const itemId = getItemId(parentRow);
      if (itemId) {
        deleteProduct(itemId);
      }
    }
  }
}

function getItemId(parentRow) {
  return parentRow.dataset.itemId;
}

//Displaying data
function showData(item) {
  const newList = document.createElement("div");
  newList.classList.add("row", "mb-2");
  newList.dataset.itemId = item.id;

  newList.innerHTML = `
      <div class="col-6">${item.product}</div>
      <div class="col-4">Rs. ${item.price}  </div>
      <div class="col-2">
        <button class="btn btn-danger">Delete</button>
      </div>
      `;
  listItem.appendChild(newList);
  total.innerText = `Total amount: ${sum}`;
}
