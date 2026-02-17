// ===== Shopping Cart using sessionStorage =====

const CART_KEY = "abc_cart_items";
const ORDER_KEY = "abc_order_processed";

function getCart() {
  const raw = sessionStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveCart(cart) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function isOrderProcessed() {
  return sessionStorage.getItem(ORDER_KEY) === "true";
}

function setOrderProcessed(value) {
  sessionStorage.setItem(ORDER_KEY, value ? "true" : "false");
}

function addToCart(name, price) {
  const cart = getCart();
  cart.push({ name, price });
  saveCart(cart);

  // If they add something new, allow processing again
  setOrderProcessed(false);

  alert(`${name} added to cart!`);
}

function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

function renderCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  const cartTotalP = document.getElementById("cartTotal");

  const cart = getCart();

  if (!cartItemsDiv || !cartTotalP) return;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalP.textContent = "";
    return;
  }

  cartItemsDiv.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-row">
          <span>${item.name}</span>
          <span>$${item.price}</span>
        </div>
      `
    )
    .join("");

  const total = calculateTotal(cart);
  cartTotalP.textContent = `Total: $${total}`;
}

function openCart() {
  const modal = document.getElementById("cartModal");
  if (!modal) return;
  renderCart();
  modal.classList.remove("hidden");
}

function closeCart() {
  const modal = document.getElementById("cartModal");
  if (!modal) return;
  modal.classList.add("hidden");
}

function clearCart() {
  sessionStorage.removeItem(CART_KEY);
  setOrderProcessed(false);
  renderCart();
  alert("Cart is cleared!");
}

function processOrder() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty. Add an item before processing an order.");
    return;
  }

  if (isOrderProcessed()) {
    alert("Your order has already been processed.");
    return;
  }

  // "Process" the order
  setOrderProcessed(true);

  alert("Thank you for your order!");
}

document.addEventListener("DOMContentLoaded", () => {
  const viewCartBtn = document.getElementById("viewCartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const processOrderBtn = document.getElementById("processOrderBtn");
  const modal = document.getElementById("cartModal");

  if (viewCartBtn) viewCartBtn.addEventListener("click", openCart);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);

  if (clearCartBtn) clearCartBtn.addEventListener("click", clearCart);
  if (processOrderBtn) processOrderBtn.addEventListener("click", processOrder);

  // Close modal if clicking outside the modal content
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeCart();
    });
  }
});
