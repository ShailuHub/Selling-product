const form = document.getElementById("form");
const price = document.getElementById("price");
const productName = document.getElementById("name");
const submit = document.getElementById("submit");
const listItem = document.getElementById("listItem");
const total = document.getElementById("total");
const baseUrl = "https://crudcrud.com/api/cd8185388e49439ca172ee5097f720ed";

let sum = 0;

form.addEventListener("submit", product);

//Get request
function getProducts() {
  axios
    .get(`${baseUrl}/product`)
    .then((res) => {
      const resProduct = res.data;
      sum = 0;
      resProduct.forEach((productItem) => {
        const newPrice = parseFloat(productItem.price);
        if (!isNaN(newPrice)) {
          sum += newPrice;
        }
        showData(productItem);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

//Showing initial total amount and previous data
total.innerText = `Total amount: ${sum}`;
getProducts();

// Post request
function postProduct(details) {
  console.log(details);
  axios
    .post(`${baseUrl}/product`, details)
    .then((res) => {
      listItem.innerHTML = "";
      getProducts();
    })
    .catch((err) => {
      console.log(err);
    });
}

//submit handler function
function product(event) {
  event.preventDefault();

  const details = {
    name: productName.value,
    price: price.value,
  };
  postProduct(details);
}

//delete request
function deleteProduct(productId) {
  axios
    .get(`${baseUrl}/product/${productId}`)
    .then((res) => {
      sum -= res.data.price;
      total.innerText = `Total amount: ${sum}`;
    })
    .catch((err) => {
      console.log(err);
    });
  axios
    .delete(`${baseUrl}/product/${productId}`)
    .then(() => {
      const rowToDelete = document.querySelector(
        `[data-item-id="${productId}"]`
      );
      if (rowToDelete) {
        rowToDelete.remove();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

listItem.addEventListener("click", handleDeleteButton);

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
  newList.dataset.itemId = item._id;
  newList.innerHTML = `
    <div class="col-6">${item.name}</div>
    <div class="col-4">Rs. ${item.price}  </div>
    <div class="col-2">
      <button class="btn btn-danger">Delete</button>
    </div>
    `;
  listItem.appendChild(newList);
  total.innerText = `Total amount: ${sum}`;
}
