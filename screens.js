/* ===================== SCREEN TEMPLATES ===================== */

function renderSplash() {
  return `
  <div class="h-screen w-full relative overflow-hidden flex items-center justify-center" style="background:radial-gradient(circle at 50% 30%,#3a1a08 0%,#1a0e05 55%,#0a0603 100%)">
    ${mandalaSvg("absolute w-[420px] h-[420px] text-amber-300 animate-spin-slow")}
    <div class="relative z-10 animate-fade-in">${logoBlock(84, true)}</div>
    <div class="absolute bottom-16 flex flex-col items-center gap-3">
      <div class="w-32 h-1 rounded-full bg-white/10 overflow-hidden">
        <div class="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full animate-loadbar"></div>
      </div>
      <p class="text-[10px] tracking-[0.3em] text-amber-200/60">HAR HAR MAHADEV</p>
    </div>
  </div>`;
}

const ONBOARD_SLIDES = [
  { icon: "🕉️", title: "Welcome to Annapurna Bhakti Bhandar", sub: "Divine energy, delivered to your doorstep. Discover sacred products blessed with tradition." },
  { icon: "💎", title: "100% Original Products", sub: "Every rudraksha, gemstone and kada is certified authentic and spiritually energized." },
  { icon: "🚚", title: "Fast Delivery, Secure Payment", sub: "Pan-India delivery with safe packaging and 100% secure payment options." },
];
let onboardIdx = 0;

function renderOnboarding() {
  const s = ONBOARD_SLIDES[onboardIdx];
  return `
  <div class="h-screen w-full flex flex-col relative overflow-hidden" style="background:linear-gradient(to bottom,#241004,#160b04,#0d0704)">
    ${mandalaSvg("absolute -top-10 -right-16 w-64 h-64 text-amber-300")}
    <button onclick="finishOnboarding()" class="absolute top-6 right-5 text-[12px] text-amber-200/70 font-semibold z-10">Skip</button>
    <div class="flex-1 flex flex-col items-center justify-center px-8 text-center z-10">
      <div class="w-40 h-40 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-400/10 flex items-center justify-center text-7xl mb-8 border border-amber-300/20" style="box-shadow:0 0 60px rgba(255,140,0,0.25)">${s.icon}</div>
      <h2 class="text-white text-[24px] font-bold mb-3 font-serif">${s.title}</h2>
      <p class="text-amber-100/70 text-[14px] leading-relaxed max-w-xs">${s.sub}</p>
    </div>
    <div class="px-8 pb-10 z-10">
      <div class="flex items-center justify-center gap-2 mb-6">
        ${ONBOARD_SLIDES.map((_, i) => `<div class="h-1.5 rounded-full transition-all ${i === onboardIdx ? "w-7 bg-orange-500" : "w-1.5 bg-amber-100/20"}"></div>`).join("")}
      </div>
      <button onclick="nextOnboard()" ${primaryBtnAttrs()} style="width:100%;padding:16px 0">
        ${onboardIdx < ONBOARD_SLIDES.length - 1 ? "Next" : "Get Started"} <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>`;
}
function nextOnboard() {
  if (onboardIdx < ONBOARD_SLIDES.length - 1) { onboardIdx++; renderApp(); }
  else finishOnboarding();
}
function finishOnboarding() {
  window.__phase = "app";
  renderApp();
}

function renderHome() {
  const featured = PRODUCTS.slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.badge === "Bestseller");
  const deals = PRODUCTS.filter((p) => discountOf(p.price, p.mrp) >= 35).slice(0, 4);

  return `
  <div class="pb-4">
    <!-- Hero Swiper Banner -->
    <div class="mx-4 mt-4 rounded-[24px] overflow-hidden">
      <div class="swiper hero-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="relative bg-gradient-to-br from-[#2b1305] via-[#3a1a08] to-[#5a2a0c] p-6 min-h-[220px] flex flex-col justify-between">
              ${mandalaSvg("absolute -right-10 -top-10 w-56 h-56 text-amber-300")}
              <div class="flex items-center justify-between relative z-10">
                <div>
                  <p class="text-[10px] tracking-[0.3em] text-amber-300/80 font-semibold mb-1">DIVINE COLLECTION</p>
                  <h1 class="text-white text-[24px] font-bold leading-tight font-serif w-44">Blessings of<br/>Mahakal</h1>
                </div>
                <div class="text-6xl">🔱</div>
              </div>
              <div class="relative z-10 flex items-center justify-between">
                <p class="text-amber-100/70 text-[12px] w-40">Handcrafted sacred jewellery, energized at Ujjain temple.</p>
                <button onclick="navReplace('categories')" ${primaryBtnAttrs()} style="padding:12px 20px;font-size:13px">Shop Now</button>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="relative bg-gradient-to-br from-[#4a1d05] via-[#5a2a0c] to-[#7a3a10] p-6 min-h-[220px] flex flex-col justify-between">
              ${mandalaSvg("absolute -right-10 -top-10 w-56 h-56 text-amber-200")}
              <div class="relative z-10">
                <p class="text-[10px] tracking-[0.3em] text-amber-200/80 font-semibold mb-1">FESTIVE OFFER</p>
                <h1 class="text-white text-[22px] font-bold leading-tight font-serif">Flat 35% Off<br/>on Rudraksha</h1>
              </div>
              <div class="relative z-10 flex items-center justify-between">
                <p class="text-amber-100/70 text-[12px] w-40">Limited period temple blessing offer.</p>
                <button onclick="openCategory('rudraksha')" ${primaryBtnAttrs()} style="padding:12px 20px;font-size:13px">Explore</button>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="relative bg-gradient-to-br from-[#241004] via-[#3a1a08] to-[#241004] p-6 min-h-[220px] flex flex-col justify-between">
              ${mandalaSvg("absolute -right-10 -top-10 w-56 h-56 text-amber-300")}
              <div class="relative z-10">
                <p class="text-[10px] tracking-[0.3em] text-amber-300/80 font-semibold mb-1">PERSONALIZED</p>
                <h1 class="text-white text-[22px] font-bold leading-tight font-serif">Find Your<br/>Lucky Stone</h1>
              </div>
              <div class="relative z-10 flex items-center justify-between">
                <p class="text-amber-100/70 text-[12px] w-40">Get a bracelet recommendation based on your zodiac.</p>
                <button onclick="navGo('luckystone')" ${primaryBtnAttrs()} style="padding:12px 20px;font-size:13px">Discover</button>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <!-- Search -->
    <div class="px-5 mt-5" data-aos="fade-up">
      <button onclick="navGo('listing')" class="w-full flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-stone-100">
        <i class="fas fa-search text-stone-400"></i>
        <span class="text-[13px] text-stone-400">Search rudraksha, kada, bracelets...</span>
      </button>
    </div>

    <!-- Trust strip -->
    <div class="px-5 mt-4 grid grid-cols-3 gap-2" data-aos="fade-up">
      <div class="bg-white rounded-2xl py-3 flex flex-col items-center gap-1 border border-stone-100 shadow-sm"><i class="fas fa-shield-halved text-orange-600"></i><span class="text-[9.5px] font-semibold text-stone-600 text-center">100% Original</span></div>
      <div class="bg-white rounded-2xl py-3 flex flex-col items-center gap-1 border border-stone-100 shadow-sm"><i class="fas fa-truck-fast text-orange-600"></i><span class="text-[9.5px] font-semibold text-stone-600 text-center">Fast Delivery</span></div>
      <div class="bg-white rounded-2xl py-3 flex flex-col items-center gap-1 border border-stone-100 shadow-sm"><i class="fas fa-award text-orange-600"></i><span class="text-[9.5px] font-semibold text-stone-600 text-center">Temple Blessed</span></div>
    </div>

    <!-- Categories -->
    <div class="mt-7">
      ${sectionTitle("Explore", "Shop by Category", "View all", `onclick="navReplace('categories')"`)}
      <div class="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-1">
        ${CATEGORIES.map((c) => `
          <button onclick="openCategory('${c.id}')" class="flex flex-col items-center gap-2 shrink-0 w-[76px]">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br ${c.tint} flex items-center justify-center text-2xl shadow-lg text-white"><i class="fas ${c.icon}"></i></div>
            <span class="text-[10.5px] font-semibold text-stone-700 text-center leading-tight">${c.name}</span>
          </button>`).join("")}
      </div>
    </div>

    <!-- Featured -->
    <div class="mt-8" data-aos="fade-up">
      ${sectionTitle("Curated", "Featured Products", "See all", `onclick="navReplace('listing')"`)}
      <div class="grid grid-cols-2 gap-3 px-5">${featured.map((p) => productCard(p)).join("")}</div>
    </div>

    <!-- Best sellers -->
    <div class="mt-8">
      ${sectionTitle("Loved by many", "Best Sellers")}
      <div class="flex gap-3 px-5 overflow-x-auto no-scrollbar">
        ${bestSellers.map((p) => `<div class="shrink-0">${productCard(p, "150px")}</div>`).join("")}
      </div>
    </div>

    <!-- Today's deals -->
    <div class="mt-8 mx-4 rounded-[24px] bg-gradient-to-r from-stone-900 to-stone-800 p-5 relative overflow-hidden">
      <i class="fas fa-fire absolute -right-4 -top-4 text-orange-600/20 text-[110px]"></i>
      <div class="flex items-center gap-2 mb-3 relative z-10"><i class="fas fa-fire text-orange-500"></i><h3 class="text-white font-bold text-[15px]">Today's Deals</h3></div>
      <div class="flex gap-3 overflow-x-auto no-scrollbar relative z-10">
        ${deals.map((p) => `<div class="shrink-0" style="width:130px">${productCard(p, "130px")}</div>`).join("")}
      </div>
    </div>

    <!-- Zodiac -->
    <div class="mt-8 mx-4" data-aos="fade-up">
      <div class="rounded-[24px] bg-gradient-to-br from-amber-50 via-orange-50 to-white p-5 border border-amber-200/60 relative overflow-hidden">
        ${mandalaSvg("absolute -left-8 -bottom-8 w-40 h-40 text-orange-400")}
        <div class="relative z-10 flex items-center gap-4">
          <div class="text-4xl">♈♉♊</div>
          <div class="flex-1">
            <h3 class="font-bold text-stone-900 text-[15px] mb-1">Find Your Zodiac Bracelet</h3>
            <p class="text-[11.5px] text-stone-600 mb-3">Get a personalized lucky stone recommendation based on your birth details.</p>
            <button onclick="navGo('luckystone')" class="text-[12px] font-bold text-orange-700 flex items-center gap-1">Discover Now <i class="fas fa-arrow-right text-[11px]"></i></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reviews Swiper -->
    <div class="mt-8">
      ${sectionTitle("Testimonials", "Customer Reviews")}
      <div class="swiper reviews-swiper px-5">
        <div class="swiper-wrapper pb-2">
          ${REVIEWS.map((r) => `
          <div class="swiper-slide" style="width:240px">
            <div class="bg-white rounded-2xl p-4 border border-stone-100 shadow-sm h-full">
              ${stars(r.rating, "text-[13px]")}
              <p class="text-[12.5px] text-stone-700 mt-2 leading-relaxed">"${r.text}"</p>
              <p class="text-[11px] font-semibold text-stone-900 mt-3">${r.name} <span class="text-stone-400 font-normal">· ${r.loc}</span></p>
            </div>
          </div>`).join("")}
        </div>
      </div>
    </div>

    <!-- Shop story -->
    <div class="mt-8 mx-4 rounded-[24px] overflow-hidden bg-stone-950 p-6 relative" data-aos="fade-up">
      ${mandalaSvg("absolute right-0 top-0 w-52 h-52 text-amber-300")}
      <p class="text-[10px] tracking-[0.3em] text-amber-400/80 font-semibold mb-2 relative z-10">OUR STORY</p>
      <h3 class="text-white font-serif text-[19px] font-bold mb-2 relative z-10">Born in the shadow of Mahakaleshwar</h3>
      <p class="text-amber-100/60 text-[12.5px] leading-relaxed mb-4 relative z-10">Since 2015, our family workshop near the Ujjain temple has hand-crafted spiritual jewellery, blending tradition with modern design.</p>
      <button onclick="navGo('about')" class="text-amber-400 text-[12px] font-bold flex items-center gap-1 relative z-10">Read our story <i class="fas fa-arrow-right text-[11px]"></i></button>
    </div>

    <!-- Footer -->
    <div class="mt-10 px-6 pb-4">
      <div class="flex justify-center mb-4">${logoBlock(44, false)}</div>
      <div class="flex justify-center gap-4 mb-5">
        <div class="w-9 h-9 rounded-full bg-white border border-stone-200 flex items-center justify-center shadow-sm"><i class="fab fa-instagram text-stone-700"></i></div>
        <div class="w-9 h-9 rounded-full bg-white border border-stone-200 flex items-center justify-center shadow-sm"><i class="fab fa-facebook-f text-stone-700"></i></div>
        <div class="w-9 h-9 rounded-full bg-white border border-stone-200 flex items-center justify-center shadow-sm"><i class="fab fa-youtube text-stone-700"></i></div>
      </div>
      <div class="flex justify-center gap-5 text-[11px] text-stone-500 font-medium mb-4">
        <button onclick="navGo('about')">About</button>
        <button onclick="navGo('contact')">Contact</button>
        <button onclick="navReplace('profile')">Account</button>
      </div>
      <p class="text-center text-[10.5px] text-stone-400">© 2026 Mahakal Spiritual Store · Made with devotion in Ujjain</p>
    </div>
  </div>`;
}