/* ===================== SCREENS: CATEGORIES / LISTING / PRODUCT / LUCKY STONE ===================== */

function renderCategories() {
  return `
  <div class="pb-6">
    <div class="px-5 pt-4 pb-2">
      <p class="text-[11px] tracking-[0.2em] uppercase text-orange-600 font-semibold mb-1">Browse</p>
      <h1 class="text-[22px] font-bold text-stone-900 font-serif">All Categories</h1>
    </div>
    <div class="grid grid-cols-2 gap-4 px-5 mt-4">
      ${CATEGORIES.map((c) => {
        const count = PRODUCTS.filter((p) => p.cat === c.id).length;
        return `
        <button onclick="openCategory('${c.id}')" class="text-left rounded-[22px] overflow-hidden border border-stone-100 bg-white shadow-sm" data-aos="fade-up">
          <div class="h-24 bg-gradient-to-br ${c.tint} flex items-center justify-center text-4xl text-white"><i class="fas ${c.icon}"></i></div>
          <div class="p-3">
            <p class="font-bold text-[13px] text-stone-900 leading-tight">${c.name}</p>
            <p class="text-[11px] text-stone-400 mt-0.5">${count} products</p>
          </div>
        </button>`;
      }).join("")}
    </div>
  </div>`;
}

let listingSort = "popular";

function renderListing() {
  const cat = CATEGORIES.find((c) => c.id === State.activeCategory);
  let items = State.activeCategory ? PRODUCTS.filter((p) => p.cat === State.activeCategory) : PRODUCTS;
  items = [...items].sort((a, b) => {
    if (listingSort === "priceLow") return a.price - b.price;
    if (listingSort === "priceHigh") return b.price - a.price;
    if (listingSort === "rating") return b.rating - a.rating;
    return b.reviews - a.reviews;
  });
  const sorts = [
    { id: "popular", label: "Popular" },
    { id: "priceLow", label: "Price: Low to High" },
    { id: "priceHigh", label: "Price: High to Low" },
    { id: "rating", label: "Top Rated" },
  ];
  return `
  <div class="pb-4">
    ${topBar(cat ? cat.name : "All Products", true)}
    <div class="flex gap-2 px-5 py-3 overflow-x-auto no-scrollbar">
      ${sorts.map((s) => `<button onclick="setListingSort('${s.id}')" class="shrink-0 text-[11.5px] font-semibold px-3 py-1.5 rounded-full border ${listingSort === s.id ? "bg-stone-900 text-amber-300 border-stone-900" : "bg-white text-stone-600 border-stone-200"}">${s.label}</button>`).join("")}
      <button class="shrink-0 flex items-center gap-1 text-[11.5px] font-semibold px-3 py-1.5 rounded-full border bg-white text-stone-600 border-stone-200"><i class="fas fa-sliders"></i> Filter</button>
    </div>
    <p class="px-5 text-[11.5px] text-stone-500 mb-2">${items.length} products found</p>
    <div class="grid grid-cols-2 gap-3 px-5">${items.map((p) => productCard(p)).join("")}</div>
  </div>`;
}
function setListingSort(s) { listingSort = s; renderApp(); }

let productImgIdx = 0;
let productTab = "desc";

function renderProduct() {
  const product = findProduct(State.activeProductId);
  const related = PRODUCTS.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4);
  const wished = isWished(product.id);
  const catName = CATEGORIES.find((c) => c.id === product.cat)?.name;
  const imgs = [product.emoji, "✨", "🎁"];

  const tabs = [
    { id: "desc", label: "Description" },
    { id: "benefits", label: "Benefits" },
    { id: "details", label: "Stone & Zodiac" },
    { id: "care", label: "Wearing & Care" },
  ];

  let tabBody = "";
  if (productTab === "desc") {
    tabBody = `<p class="text-[13px] text-stone-600 leading-relaxed">${product.desc}</p>`;
  } else if (productTab === "benefits") {
    const list = ["Spiritually energized & temple blessed", "Balances energy and brings positivity", "Handcrafted by skilled artisans", "Comes with an authenticity certificate"];
    tabBody = `<ul class="space-y-2">${list.map((b) => `<li class="flex items-start gap-2 text-[13px] text-stone-600"><i class="fas fa-check text-orange-600 mt-1 text-[11px]"></i> ${b}</li>`).join("")}</ul>`;
  } else if (productTab === "details") {
    const d = [
      { icon: "fa-gem", label: "Stone", val: product.stone },
      { icon: "fa-circle-dot", label: "Zodiac", val: product.zodiac },
      { icon: "fa-sun", label: "Planet", val: product.planet },
      { icon: "fa-moon", label: "Chakra", val: product.chakra },
    ];
    tabBody = `<div class="grid grid-cols-2 gap-3">${d.map((x) => `
      <div class="bg-stone-50 rounded-xl p-3 border border-stone-100">
        <i class="fas ${x.icon} text-orange-600 mb-1.5"></i>
        <p class="text-[10px] text-stone-400 font-semibold uppercase">${x.label}</p>
        <p class="text-[12.5px] text-stone-800 font-semibold mt-0.5">${x.val}</p>
      </div>`).join("")}</div>`;
  } else if (productTab === "care") {
    tabBody = `
      <div class="space-y-3">
        <div><p class="text-[12px] font-bold text-stone-900 mb-1">Wearing Method</p><p class="text-[13px] text-stone-600 leading-relaxed">${product.wearing}</p></div>
        <div><p class="text-[12px] font-bold text-stone-900 mb-1">Care Instructions</p><p class="text-[13px] text-stone-600 leading-relaxed">${product.care}</p></div>
      </div>`;
  }

  return `
  <div class="pb-28">
    ${topBar("Product Details", true, `<button onclick="toggleWish(${product.id})" class="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center"><i class="fa-heart ${wished ? "fas text-orange-600" : "far text-stone-500"}"></i></button>`)}

    <div class="swiper product-swiper">
      <div class="swiper-wrapper">
        ${imgs.map((e) => `<div class="swiper-slide"><div class="w-full aspect-square bg-gradient-to-br from-orange-50 via-amber-50 to-stone-100 flex items-center justify-center text-[110px]">${e}</div></div>`).join("")}
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="px-3 mt-2"><div class="inline-block">${badge(product.badge, "dark")}</div></div>

    <div class="mx-5 mt-3 rounded-2xl bg-stone-900 h-28 flex items-center justify-center gap-2 relative overflow-hidden">
      <div class="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center"><i class="fas fa-camera text-white"></i></div>
      <p class="text-white/60 text-[12px] absolute bottom-2 left-3">Product video</p>
    </div>

    <div class="px-5 mt-5">
      <p class="text-[11px] font-semibold text-orange-600 uppercase tracking-wide mb-1">${catName}</p>
      <h1 class="text-[20px] font-bold text-stone-900 leading-tight">${product.name}</h1>
      <div class="flex items-center gap-2 mt-2">${stars(product.rating, "text-sm")}<span class="text-[12px] text-stone-500">${product.rating} (${product.reviews} reviews)</span></div>
      <div class="flex items-center gap-3 mt-3 flex-wrap">
        <span class="text-[24px] font-bold text-stone-900">${money(product.price)}</span>
        <span class="text-[14px] text-stone-400 line-through">${money(product.mrp)}</span>
        ${badge(discountOf(product.price, product.mrp) + "% OFF", "gold")}
      </div>
      <div class="mt-3 flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
        <i class="fas fa-sparkles text-emerald-600 text-[12px]"></i>
        <p class="text-[11.5px] text-emerald-700 font-medium">Limited-time temple blessing offer — free pooja thread included.</p>
      </div>
    </div>

    <div class="mt-5 px-5 flex gap-2 overflow-x-auto no-scrollbar">
      ${tabs.map((t) => `<button onclick="setProductTab('${t.id}')" class="shrink-0 text-[11.5px] font-semibold px-3 py-1.5 rounded-full ${productTab === t.id ? "bg-orange-600 text-white" : "bg-stone-100 text-stone-600"}">${t.label}</button>`).join("")}
    </div>
    <div class="px-5 mt-4">${tabBody}</div>

    <div class="mt-7">
      ${sectionTitle("Verified buyers", "Customer Reviews")}
      <div class="flex gap-3 px-5 overflow-x-auto no-scrollbar">
        ${REVIEWS.slice(0, 3).map((r) => `
        <div class="shrink-0 bg-white rounded-2xl p-4 border border-stone-100 shadow-sm" style="width:220px">
          ${stars(r.rating, "text-xs")}
          <p class="text-[12px] text-stone-700 mt-2 leading-relaxed">"${r.text}"</p>
          <p class="text-[11px] font-semibold text-stone-900 mt-3">${r.name}</p>
        </div>`).join("")}
      </div>
    </div>

    <div class="mt-7">
      ${sectionTitle("You may also like", "Related Products")}
      <div class="flex gap-3 px-5 overflow-x-auto no-scrollbar">
        ${related.map((p) => `<div class="shrink-0">${productCard(p, "150px")}</div>`).join("")}
      </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-stone-200 px-5 py-3 flex gap-3">
      <button onclick="addToCart(${product.id})" class="flex-1 py-3.5 border border-stone-300 text-stone-800 font-semibold rounded-2xl bg-white flex items-center justify-center gap-2"><i class="fas fa-shopping-bag"></i> Add to Cart</button>
      <button onclick="addToCart(${product.id}); navReplace('cart')" ${primaryBtnAttrs()} style="flex:1;padding:14px 0">Buy Now</button>
    </div>
  </div>`;
}
function setProductTab(t) { productTab = t; renderApp(); }

let luckyForm = { name: "", dob: "", zodiac: "" };
let luckyResult = null;

function renderLuckyStone() {
  return `
  <div class="pb-10">
    ${topBar("Lucky Stone Finder", true)}
    <div class="mx-4 mt-4 rounded-[24px] bg-gradient-to-br from-[#2b1305] to-[#4a2109] p-6 relative overflow-hidden">
      ${mandalaSvg("absolute -right-8 -top-8 w-44 h-44 text-amber-300")}
      <div class="relative z-10">
        <p class="text-amber-400 text-[11px] font-bold tracking-[0.2em] mb-1">PERSONALIZED GUIDANCE</p>
        <h2 class="text-white font-serif text-[20px] font-bold mb-1">Discover Your Lucky Bracelet</h2>
        <p class="text-amber-100/60 text-[12.5px]">Enter your details to receive a stone recommendation aligned with your zodiac energy.</p>
      </div>
    </div>

    ${!luckyResult ? `
    <div class="mx-4 mt-4">
      ${glassCardOpen("p-5 space-y-4")}
        <div>
          <label class="text-[11.5px] font-semibold text-stone-600 mb-1.5 block">Full Name</label>
          <input id="luckyName" value="${luckyForm.name}" oninput="luckyForm.name=this.value" placeholder="e.g. Priya Sharma" class="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-[13.5px] outline-none focus:border-orange-500"/>
        </div>
        <div>
          <label class="text-[11.5px] font-semibold text-stone-600 mb-1.5 block">Date of Birth</label>
          <input type="date" id="luckyDob" value="${luckyForm.dob}" oninput="luckyForm.dob=this.value" class="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-[13.5px] outline-none focus:border-orange-500"/>
        </div>
        <div>
          <label class="text-[11.5px] font-semibold text-stone-600 mb-1.5 block">Zodiac Sign</label>
          <div class="grid grid-cols-3 gap-2">
            ${Object.keys(ZODIAC_DATA).map((z) => `<button onclick="selectZodiac('${z}')" class="text-[11.5px] font-semibold py-2.5 rounded-xl border ${luckyForm.zodiac === z ? "bg-orange-600 text-white border-orange-600" : "bg-white text-stone-600 border-stone-200"}">${z}</button>`).join("")}
          </div>
        </div>
        <button onclick="submitLucky()" ${primaryBtnAttrs()} style="width:100%;padding:14px 0"><i class="fas fa-wand-magic-sparkles"></i> Reveal My Stone</button>
      </div>
    </div>` : `
    <div class="mx-4 mt-4">
      ${glassCardOpen("p-5")}
        <p class="text-[12px] text-stone-500 mb-1">Namaste, <span class="font-semibold text-stone-800">${luckyForm.name || "Devotee"}</span> 🙏</p>
        <h3 class="text-[17px] font-bold text-stone-900 mb-4">Your Recommended Bracelet: ${luckyResult.stone}</h3>
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="bg-stone-50 rounded-xl p-3 border border-stone-100"><p class="text-[10px] text-stone-400 font-semibold uppercase">Lucky Color</p><p class="text-[13px] font-bold text-stone-800 mt-0.5">${luckyResult.color}</p></div>
          <div class="bg-stone-50 rounded-xl p-3 border border-stone-100"><p class="text-[10px] text-stone-400 font-semibold uppercase">Ruling Planet</p><p class="text-[13px] font-bold text-stone-800 mt-0.5">${luckyResult.planet}</p></div>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-5"><p class="text-[12.5px] text-amber-800 leading-relaxed">${luckyResult.benefit}</p></div>
        <button onclick="openProduct(2)" ${primaryBtnAttrs()} style="width:100%;padding:14px 0">Buy Now</button>
        <button onclick="luckyResult=null; renderApp()" class="w-full text-center text-[12px] font-semibold text-stone-500 mt-3">Check another sign</button>
      </div>
    </div>`}
  </div>`;
}
function selectZodiac(z) { luckyForm.zodiac = z; renderApp(); }
function submitLucky() {
  if (!luckyForm.name || !luckyForm.zodiac) { toast("Please enter name & zodiac sign"); return; }
  luckyResult = ZODIAC_DATA[luckyForm.zodiac];
  renderApp();
}