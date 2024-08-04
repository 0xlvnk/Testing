const cartListElement = document.getElementById('cart-list');
const cartTotalElement = document.getElementById('cart-total');
const orderNumberValueElement = document.getElementById('order-number-value');
const checkoutButton = document.getElementById('checkout-button');
const clearCartButton = document.getElementById('clear-cart-button');

let cart = [];
let orderNumber = '';

// Generate a random order number
const randomNumber = Math.floor(Math.random() * 100000); // adjust the range as needed
orderNumber = `#${randomNumber}`;
orderNumberValueElement.textContent = orderNumber;

// Add event listener to the Clear Cart button
clearCartButton.addEventListener('click', () => {
  cart = [];
  cartListElement.innerHTML = '';
  cartTotalElement.textContent = 'Total: Rp 0';
});

// Function to show and hide pop-ups
function showPopup(id) {
  document.getElementById(id).style.display = "block";
  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.add("show");
}

function closePopup(id) {
  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.remove("show");
  setTimeout(() => {
    document.getElementById(id).style.display = "none";
  }, 0); // Wait for the animation to finish before hiding the pop-up
}


// Add event listeners to the pop-up buttons
document.getElementById("tentang-kami-link").addEventListener("click", () => {
  showPopup("tentangKamiPopup");
});

document.getElementById("kontak-link").addEventListener("click", () => {
  showPopup("popupContact");
});

document.querySelectorAll(".close-button").forEach(button => {
  button.addEventListener("click", () => {
    closePopup(button.parentNode.parentNode.id);
  });
});

checkoutButton.addEventListener('click', () => {
  showPopup("confirmationPopup");
});

// ...

// ...

document.getElementById("confirmationPopup").addEventListener("click", function(event) {
  if (event.target.id === "yes-btn") {
    const name = document.getElementById("nameInput").value.trim();
    const configName = document.getElementById("configSelect").value;
    if (name === '' || configName === '') {
      alert('Harap masukkan nama anda dan pilih config');
      return;
    }
    const whatsappMessage = `Halo, saya ingin pesan produk berikut:\nOrder ${orderNumber}, dengan kode produk:\n${cart.map(product => `${product.code} - ${product.name}`).join('\n')}\n dan total Rp ${cartTotalElement.textContent.replace('Rp ', '')}\n\nNama: ${name}\nConfig: ${configName}`;
    const whatsappUrl = `https://wa.me/6283125410252?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Clear the cart after checkout
    cart = [];
    cartListElement.innerHTML = '';
    cartTotalElement.textContent = 'Rp 0';

    closePopup("confirmationPopup");
  } else if (event.target.id === "no-btn") {
    closePopup("confirmationPopup");
  }
});

// ...

// ...

document.addEventListener("DOMContentLoaded", function() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const productId = button.getAttribute("data-product-id");
      const productName = button.parentNode.querySelector('h3').textContent;
      const product = {
        code: productId,
        name: productName,
        price: 10000
      };

      if (!cart.includes(product)) {
        cart.push(product);
      }

      updateCart();
    });
  });

  cartListElement.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-button")) {
      const productId = event.target.parentNode.getAttribute("data-product-id");
      const index = cart.findIndex(function(product) {
        return product.code === productId;
      });
      if (index!== -1) {
        cart.splice(index, 1);
        updateCart();
      }
    }
  });

  function updateCart() {
    cartListElement.innerHTML = "";
    cart.forEach(function(product) {
      const cartItem = document.createElement("li");
      cartItem.innerHTML = `${product.name} (Rp ${product.price})`;
      cartItem.setAttribute("data-product-id", product.code);
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-button");
      removeButton.innerHTML = "X";
      removeButton.style.backgroundColor = "transparent"; // Remove background color
      removeButton.style.position = "relative"; // Add position style
      removeButton.style.top = "0"; // Add top style
      cartItem.appendChild(removeButton);
      cartListElement.appendChild(cartItem);
    });

    const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);
    cartTotalElement.textContent = ` Rp ${totalPrice}`;
  }
});