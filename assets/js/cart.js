function renderCart() {
      const container = document.getElementById("cart-items");
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      container.innerHTML = "";

      if (cart.length === 0) {
          container.innerHTML = "<p>Your cart is empty.</p>";
          updateCartCount();
          return;
      }

      cart.forEach((item, index) => {
          let div = document.createElement("div");
          div.classList.add("cart-item");

          div.innerHTML = `
              <img src="${item.image}" alt="${item.name}" width="50">
              <span>${item.name} -  Size: ${item.size}, Color: ${item.color}, Qty: ${item.quantity}, Total: ₹${item.totalPrice}</span>
              <button onclick="removeFromCart(${index})">Remove</button>
          `;

          container.appendChild(div);
      });

     
  }

  // ✅ Remove item
  function removeFromCart(index) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(index, 1); // Remove item
      localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
      renderCart(); // Refresh cart display
      alert("Item removed from cart!");
  }

  // Run when cart page loads
 window.addEventListener("load", renderCart);
      
  