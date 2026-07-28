/* ===================== APP STATE ===================== */

const State = {
  screen: "home",
  history: [],
  activeProductId: PRODUCTS[0].id,
  activeCategory: null,
  wishlist: [2, 6],
  cart: [
    { id: 1, qty: 1 },
    { id: 3, qty: 2 },
  ],
  coupon: { code: "", applied: false },
};

function cartItems() {
  return State.cart.map((c) => ({ ...findProduct(c.id), qty: c.qty }));
}
function cartCount() {
  return State.cart.reduce((s, i) => s + i.qty, 0);
}
function cartSubtotal() {
  return cartItems().reduce((s, i) => s + i.price * i.qty, 0);
}
function isWished(id) {
  return State.wishlist.includes(id);
}
function toggleWish(id) {
  id = Number(id);
  State.wishlist = isWished(id) ? State.wishlist.filter((x) => x !== id) : [...State.wishlist, id];
  renderApp();
}
function addToCart(id) {
  id = Number(id);
  const existing = State.cart.find((i) => i.id === id);
  if (existing) existing.qty += 1;
  else State.cart.push({ id, qty: 1 });
  renderApp();
  toast("Added to cart");
}
function updateQty(id, delta) {
  id = Number(id);
  const item = State.cart.find((i) => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  renderApp();
}
function removeFromCart(id) {
  id = Number(id);
  State.cart = State.cart.filter((i) => i.id !== id);
  renderApp();
}
function applyCoupon(code) {
  State.coupon = { code, applied: !!code };
  renderApp();
}
function placeOrder() {
  State.cart = [];
  State.coupon = { code: "", applied: false };
  navReplace("success");
}

/* navigation */
function navGo(screen) {
  State.history.push(State.screen);
  State.screen = screen;
  renderApp();
  window.scrollTo({ top: 0, behavior: "instant" });
}
function navBack() {
  State.screen = State.history.pop() || "home";
  renderApp();
  window.scrollTo({ top: 0, behavior: "instant" });
}
function navReplace(screen) {
  State.history = [];
  State.screen = screen;
  renderApp();
  window.scrollTo({ top: 0, behavior: "instant" });
}
function openProduct(id) {
  State.activeProductId = Number(id);
  navGo("product");
}
function openCategory(id) {
  State.activeCategory = id;
  navGo("listing");
}

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.remove("opacity-0", "translate-y-4");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    el.classList.add("opacity-0", "translate-y-4");
  }, 1800);
}