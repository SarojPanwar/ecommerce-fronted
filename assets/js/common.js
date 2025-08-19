function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) {
        cartCountEl.innerText = `Cart (${cart.length})`;
    }
}

// Run on every page load
 window.addEventListener("load",updateCartCount );
    
     
  