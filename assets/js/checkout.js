// Load cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartSummary = document.getElementById("cart-summary");
    const totalPriceEl = document.getElementById("total-price");

    let total = 0;
    if (cart.length === 0) {
      cartSummary.innerHTML = "<p>Your cart is empty.</p>";
      document.getElementById("place-order").disabled = true;
    } else {
      cart.forEach(item => {
        total += item.price * (item.quantity || 1);
        cartSummary.innerHTML += `
          <div class="checkout-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="checkout-details">
            <h6>${item.name}</h6>
            <p>Size: ${item.size || "-"} | color:${item.color|| "-"} | Qty:${item.quantity||1}</p>
            </div>
            <div class=checkout-price>
               ₹${item.price} × ${item.quantity || 1} = ₹${item.price * (item.quantity || 1)}
            
            </div>
           
          </div>
        `;
      });
      totalPriceEl.textContent = total.toFixed(2);
    }

    // Handle place order
    document.getElementById("checkout-form").addEventListener("submit", function(e) {
      e.preventDefault();
      alert("✅ Order placed successfully!");
      localStorage.removeItem("cart"); // Clear cart
      window.location.href = "index.html"; // Redirect to thank-you page
    });