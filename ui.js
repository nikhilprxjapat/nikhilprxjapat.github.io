/* ===================== SHARED UI TEMPLATES ===================== */

function stars(rating, size = "text-xs") {
  let html = `<span class="flex items-center gap-0.5 ${size}">`;
  for (let i = 1; i <= 5; i++) {
    html += `<i class="fa-star ${i <= Math.round(rating) ? "fas text-amber-400" : "far text-stone-300"}"></i>`;
  }
  html += `</span>`;
  return html;
}

function badge(text, tone = "orange") {
  const tones = {
    orange: "bg-orange-600 text-white",
    gold: "bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-900",
    dark: "bg-stone-900 text-amber-300",
  };
  return `<span class="text-[10px] font-bold px-2 py-1 rounded-full shadow ${tones[tone]}">${text}</span>`;
}

function mandalaSvg(className) {
  let lines = "";
  for (let i = 0; i < 16; i++) {
    const a = (i * Math.PI * 2) / 16;
    lines += `<line x1="100" y1="100" x2="${100 + 90 * Math.cos(a)}" y2="${100 + 90 * Math.sin(a)}" stroke-width="0.5"/>`;
  }
  return `<svg class="${className}" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.12" stroke="currentColor">
      <circle cx="100" cy="100" r="90" stroke-width="0.6"/>
      <circle cx="100" cy="100" r="70" stroke-width="0.6"/>
      <circle cx="100" cy="100" r="50" stroke-width="0.6"/>
      ${lines}
    </g>
  </svg>`;
}

function sectionTitle(eyebrow, title, actionLabel, actionAttr) {
  return `
  <div class="flex items-end justify-between px-5 mb-3">
    <div>
      ${eyebrow ? `<p class="text-[11px] tracking-[0.2em] uppercase text-orange-600 font-semibold mb-1">${eyebrow}</p>` : ""}
      <h2 class="text-[19px] font-bold text-stone-900 leading-tight">${title}</h2>
    </div>
    ${actionLabel ? `<button ${actionAttr} class="text-[12px] font-semibold text-orange-600 flex items-center gap-0.5">${actionLabel} <i class="fas fa-chevron-right text-[10px]"></i></button>` : ""}
  </div>`;
}

function productCard(p, compactWidth) {
  const wished = isWished(p.id);
  const disc = discountOf(p.price, p.mrp);
  return `
  <div class="bg-white rounded-[20px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] overflow-hidden border border-stone-100 flex flex-col" ${compactWidth ? `style="width:${compactWidth}"` : ""}>
    <div class="relative">
      <button onclick="openProduct(${p.id})" class="w-full aspect-square bg-gradient-to-br from-orange-50 via-amber-50 to-stone-100 flex items-center justify-center text-6xl">${p.emoji}</button>
      <button onclick="toggleWish(${p.id})" class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow">
        <i class="fa-heart ${wished ? "fas text-orange-600" : "far text-stone-500"}"></i>
      </button>
      <div class="absolute top-2 left-2">${badge(p.badge, "dark")}</div>
    </div>
    <div class="p-3 flex flex-col gap-1.5 flex-1">
      <button onclick="openProduct(${p.id})" class="text-left">
        <p class="text-[13px] font-semibold text-stone-900 leading-snug line-clamp-2">${p.name}</p>
      </button>
      <div class="flex items-center gap-1">
        ${stars(p.rating)}
        <span class="text-[10px] text-stone-500">(${p.reviews})</span>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-[15px] font-bold text-stone-900">${money(p.price)}</span>
        <span class="text-[11px] text-stone-400 line-through">${money(p.mrp)}</span>
        <span class="text-[10px] font-bold text-emerald-600">${disc}% off</span>
      </div>
      <button onclick="addToCart(${p.id})" class="mt-1 w-full py-2 rounded-xl bg-stone-900 text-amber-300 text-[12px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform">
        <i class="fas fa-shopping-bag text-[11px]"></i> Add to Cart
      </button>
    </div>
  </div>`;
}

function topBar(title, showBack, rightHtml) {
  return `
  <div class="sticky top-0 z-30 backdrop-blur-xl border-b border-stone-200/70 px-4 py-3 flex items-center justify-between" style="background:rgba(253,250,244,0.9)">
    <div class="flex items-center gap-2">
      ${showBack ? `<button onclick="navBack()" class="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center"><i class="fas fa-chevron-left text-stone-800 text-sm"></i></button>` : ""}
      <h1 class="text-[16px] font-bold text-stone-900">${title}</h1>
    </div>
    <div>${rightHtml || ""}</div>
  </div>`;
}

function glassCardOpen(extra) {
  return `<div class="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[20px] ${extra || ""}">`;
}

function primaryBtnAttrs() {
  return `class="bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold rounded-2xl shadow-[0_8px_24px_rgba(255,107,0,0.35)] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"`;
}

function bottomNavHtml() {
  const items = [
    { id: "home", label: "Home", icon: "fa-house" },
    { id: "categories", label: "Categories", icon: "fa-border-all" },
    { id: "wishlist", label: "Wishlist", icon: "fa-heart", count: State.wishlist.length },
    { id: "cart", label: "Cart", icon: "fa-shopping-bag", count: cartCount() },
    { id: "profile", label: "Profile", icon: "fa-user" },
  ];
  return `
  <div class="fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 max-w-md mx-auto">
    <div class="bg-white/90 backdrop-blur-xl border border-stone-200 rounded-[22px] shadow-[0_-4px_30px_rgba(0,0,0,0.08)] flex items-center justify-between px-2 py-2">
      ${items.map((it) => {
        const active = State.screen === it.id;
        return `
        <button onclick="navReplace('${it.id}')" class="relative flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-2xl transition-colors ${active ? "bg-gradient-to-b from-orange-50 to-amber-50" : ""}">
          <span class="relative">
            <i class="fas ${it.icon} ${active ? "text-orange-600" : "text-stone-400"} text-[18px]"></i>
            ${it.count ? `<span class="absolute -top-1.5 -right-2 bg-orange-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">${it.count}</span>` : ""}
          </span>
          <span class="text-[10px] font-semibold ${active ? "text-orange-700" : "text-stone-400"}">${it.label}</span>
        </button>`;
      }).join("")}
    </div>
  </div>`;
}

function whatsappFab() {
  return `
  <a href="#" onclick="return false;" class="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(37,211,102,0.5)] flex items-center justify-center active:scale-95 transition-transform">
    <i class="fab fa-whatsapp text-white text-2xl"></i>
  </a>`;
}

function logoBlock(size, light) {
  return `
  <div class="flex flex-col items-center gap-3">
    <div class="rounded-full flex items-center justify-center" style="width:${size}px;height:${size}px;background:conic-gradient(from 180deg,#FF6B00,#FFD166,#FF6B00);box-shadow:0 0 40px rgba(255,140,0,0.5)">
      <div class="rounded-full bg-stone-950 flex items-center justify-center" style="width:${size - 8}px;height:${size - 8}px;font-size:${size * 0.42}px">🕉️</div>
    </div>
    <div class="text-center">
      <p class="font-serif tracking-[0.15em] text-[22px] font-bold ${light ? "text-white" : "text-stone-900"}">MAHAKAL</p>
      <p class="text-[10px] tracking-[0.5em] -mt-1 ${light ? "text-amber-300/80" : "text-orange-600"}">SPIRITUAL STORE</p>
    </div>
  </div>`;
}