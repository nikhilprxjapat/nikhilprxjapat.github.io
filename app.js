/* ===================== APP ROOT / ROUTER ===================== */

window.__phase = "splash"; // splash -> onboarding -> app

const NO_NAV_SCREENS = ["product", "listing", "checkout", "success", "tracking", "about", "contact", "luckystone"];

function renderApp() {
  const root = document.getElementById("app-root");

  if (window.__phase === "splash") {
    root.innerHTML = renderSplash();
    return;
  }
  if (window.__phase === "onboarding") {
    root.innerHTML = renderOnboarding();
    return;
  }

  let body = "";
  switch (State.screen) {
    case "home": body = renderHome(); break;
    case "categories": body = renderCategories(); break;
    case "listing": body = renderListing(); break;
    case "product": body = renderProduct(); break;
    case "luckystone": body = renderLuckyStone(); break;
    case "cart": body = renderCart(); break;
    case "checkout": body = renderCheckout(); break;
    case "success": body = renderSuccess(); break;
    case "wishlist": body = renderWishlist(); break;
    case "profile": body = renderProfile(); break;
    case "tracking": body = renderTracking(); break;
    case "about": body = renderAbout(); break;
    case "contact": body = renderContact(); break;
    default: body = renderHome();
  }

  const showNav = !NO_NAV_SCREENS.includes(State.screen);

  root.innerHTML = `
    <div class="relative min-h-screen pb-2">
      ${body}
      ${showNav ? bottomNavHtml() : ""}
      ${whatsappFab()}
    </div>
  `;

  initSwipers();
  if (window.AOS) AOS.refreshHard();
}

function initSwipers() {
  const heroEl = document.querySelector(".hero-swiper");
  if (heroEl) {
    new Swiper(heroEl, {
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: ".hero-swiper .swiper-pagination", clickable: true },
    });
  }
  const reviewsEl = document.querySelector(".reviews-swiper");
  if (reviewsEl) {
    new Swiper(reviewsEl, {
      slidesPerView: "auto",
      spaceBetween: 12,
      freeMode: true,
    });
  }
  const productEl = document.querySelector(".product-swiper");
  if (productEl) {
    new Swiper(productEl, {
      pagination: { el: ".product-swiper .swiper-pagination", clickable: true },
    });
  }
}

/* boot */
document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) AOS.init({ duration: 600, once: true, offset: 30 });
  renderApp();
  setTimeout(() => {
    if (window.__phase === "splash") {
      window.__phase = "onboarding";
      renderApp();
    }
  }, 2200);
});