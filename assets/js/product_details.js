// Product Details Page
document.querySelectorAll('.view-details').forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const productCard = this.closest('.single_product');

      const product = {
        id: productCard.getAttribute('data-id'),
        name: productCard.getAttribute('data-name'),
        price: productCard.getAttribute('data-price'),
        image: productCard.getAttribute('data-image')
      };

      // Save  selcetd product and go to details page
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href="product_details.html";
    });
  });


  const product = JSON.parse(localStorage.getItem("selectedProduct"));

  if (product) {
    document.getElementById("product-details").innerHTML = `
      <img src="${product.image}" class="img-fluid mb-3" style="max-height:300px;">
      <h2>${product.name}</h2>
      <label for="size">Size:</label>
      <select id="size">
        <option value="" disabled selected>Select Size</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
        </select>
        <label for="color">Color:</label>
        <select id="color">
            <option value="" disabled selected>Select Color</option>
            <option value="Red">Red</option>
            <option value="Blue" disabled>Blue (Out of Stock)</option>
            <option value="Black">Black</option>
        </select>
        <!-- Quantity -->
        <div class="quantity-selector">
            <button id="decrease">−</button>
            <input type="number" id="quantity" value="1" min="1" max="10" readonly>
            <button id="increase">+</button>
        </div>
        <p>Total: <span id="total-price">${product.price}</span></p>
      <button class="btn btn-primary"  id="add-to-cart">Add to Cart</button>
      <p id="cart-message" style="display:none;color:green;">✔ Added to Cart!</p>
    `;
  

  //  price calculation
  const unitPrice = product.price;
  let quantity = 1;
  const maxQty = 10;

  const quantityInput = document.getElementById("quantity");
  const totalPriceEl = document.getElementById("total-price");

  function updateQuantity() {
    quantityInput.value = quantity;
    totalPriceEl.textContent = (unitPrice * quantity).toFixed(2);
  }

  // Quantity buttons
  document.getElementById("increase").addEventListener("click", () => {
    if (quantity < maxQty) {
      quantity++;
      updateQuantity();
    }
  });

  document.getElementById("decrease").addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      updateQuantity();
    }
  });

  


  document.getElementById("add-to-cart").addEventListener("click",()=>{
   
   const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;

    if (!size || !color) {
      alert("Please select size and color!");
      return;
    }

     let cart =JSON.parse(localStorage.getItem("cart"))|| [];

         cart.push({
            ...product,
            size,
            color,
            quantity,
            totalPrice:(unitPrice*quantity).toFixed(2),
         });
        

        localStorage.setItem("cart", JSON.stringify(cart));

        // Update cart count
        updateCartCount();
       
         //  Feedback
         const cartMessage = document.getElementById("cart-message");
           cartMessage.style.display = "block";
            setTimeout(() => {
            cartMessage.style.display = "none";
            }, 2000);
 
});

} else {
    document.getElementById("product_details").innerHTML = `<p>Product not found.</p>`;
}




  





