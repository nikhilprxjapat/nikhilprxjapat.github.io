/* ===================== SCREENS: CART / CHECKOUT / SUCCESS / WISHLIST / PROFILE / TRACKING / ABOUT / CONTACT ===================== */

function renderCart() {
  const items = cartItems();
  if (items.length === 0) {
    return `
    <div class="pb-6">
      ${topBar("My Cart")}
      <div class="flex flex-col items-center justify-center py-24 px-8 text-center">
        <div class="text-6xl mb-4">🛍️</div>
        <p class="font-bold text-stone-800 mb-1">Your cart is empty</p>
        <p class="text-[12.5px] text-stone-500 mb-5">Add some divine blessings to get started.</p>
        <button onclick="navReplace('home')" ${primaryBtnAttrs()} style="padding:12px 24px">Start Shopping</button>
      </div>
    </div>`;
  }
  const subtotal = cartSubtotal();
  const discount = State.coupon.applied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal > 999 ? 0 : 79;
  const total = subtotal - discount + delivery;

  return `
  <div class="pb-40">
    ${topBar(`My Cart (${items.length})`)}
    <div class="px-5 mt-3 space-y-3">
      ${items.map((item) => `
      <div class="bg-white rounded-2xl p-3 border border-stone-100 shadow-sm flex gap-3">
        <div class="w-20 h-20 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center text-3xl shrink-0">${item.emoji}</div>
        <div class="flex-1 min-w-0">
          <p class="text-[13px] font-semibold text-stone-900 leading-tight line-clamp-2">${item.name}</p>
          <p class="text-[13px] font-bold text-stone-900 mt-1">${money(item.price)}</p>
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-3 bg-stone-100 rounded-full px-1 py-1">
              <button onclick="updateQty(${item.id},-1)" class="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm"><i class="fas fa-minus text-[10px]"></i></button>
              <span class="text-[12.5px] font-bold w-4 text-center">${item.qty}</span>
              <button onclick="updateQty(${item.id},1)" class="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm"><i class="fas fa-plus text-[10px]"></i></button>
            </div>
            <button onclick="removeFromCart(${item.id})"><i class="fas fa-trash text-stone-400"></i></button>
          </div>
        </div>
      </div>`).join("")}
    </div>

    <div class="px-5 mt-5">
      ${glassCardOpen("p-4")}
        <p class="text-[12px] font-semibold text-stone-700 mb-2">Apply Coupon</p>
        <div class="flex gap-2">
          <input id="couponInput" value="${State.coupon.code}" placeholder="MAHAKAL10" class="flex-1 bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-[13px] outline-none focus:border-orange-500"/>
          <button onclick="applyCoupon(document.getElementById('couponInput').value)" class="px-4 rounded-xl bg-stone-900 text-amber-300 text-[12px] font-bold">Apply</button>
        </div>
        ${State.coupon.applied ? `<p class="text-[11.5px] text-emerald-600 font-semibold mt-2 flex items-center gap-1"><i class="fas fa-check"></i> Coupon applied — 10% off</p>` : ""}
      </div>
    </div>

    <div class="px-5 mt-4">
      ${glassCardOpen("p-4 space-y-2.5")}
        <div class="flex justify-between text-[13px] text-stone-600"><span>Subtotal</span><span>${money(subtotal)}</span></div>
        ${State.coupon.applied ? `<div class="flex justify-between text-[13px] text-emerald-600"><span>Coupon Discount</span><span>-${money(discount)}</span></div>` : ""}
        <div class="flex justify-between text-[13px] text-stone-600"><span>Delivery Charges</span><span>${delivery === 0 ? "FREE" : money(delivery)}</span></div>
        <div class="h-px bg-stone-200 my-1"></div>
        <div class="flex justify-between text-[15px] font-bold text-stone-900"><span>Total</span><span>${money(total)}</span></div>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-stone-200 px-5 py-3">
      <button onclick="navGo('checkout')" ${primaryBtnAttrs()} style="width:100%;padding:16px 0">Proceed to Checkout <i class="fas fa-arrow-right"></i></button>
    </div>
  </div>`;
}

let checkoutState = { delivery: "standard", payment: "cod" };

function renderCheckout() {
  const subtotal = cartSubtotal();
  const total = subtotal + (checkoutState.delivery === "express" ? 99 : 0);
  const deliveryOpts = [
    { id: "standard", label: "Standard Delivery", sub: "3-5 business days · Free" },
    { id: "express", label: "Express Delivery", sub: "1-2 business days · +₹99" },
  ];
  const paymentOpts = [
    { id: "cod", label: "Cash on Delivery", icon: "fa-money-bill-wave" },
    { id: "upi", label: "UPI", icon: "fa-mobile-screen" },
    { id: "credit", label: "Credit Card", icon: "fa-credit-card" },
    { id: "debit", label: "Debit Card", icon: "fa-credit-card" },
  ];
  return `
  <div class="pb-32">
    ${topBar("Checkout", true)}
    <div class="px-5 mt-3 space-y-4">
      ${glassCardOpen("p-4")}
        <div class="flex items-center gap-2 mb-3"><i class="fas fa-map-pin text-orange-600"></i><p class="font-bold text-[13.5px] text-stone-900">Delivery Address</p></div>
        <p class="text-[13px] font-semibold text-stone-800">Priya Sharma</p>
        <p class="text-[12.5px] text-stone-500 mt-0.5 leading-relaxed">123, Mahadev Nagar, Near Ujjain Temple Road, Ujjain, Madhya Pradesh - 456001</p>
        <button class="text-[11.5px] font-bold text-orange-600 mt-2 flex items-center gap-1"><i class="fas fa-pen text-[10px]"></i> Change Address</button>
      </div>

      ${glassCardOpen("p-4")}
        <div class="flex items-center gap-2 mb-2"><i class="fas fa-phone text-orange-600"></i><p class="font-bold text-[13.5px] text-stone-900">Mobile Number</p></div>
        <p class="text-[13px] text-stone-700">+91 98765 43210</p>
      </div>

      ${glassCardOpen("p-4")}
        <div class="flex items-center gap-2 mb-3"><i class="fas fa-truck text-orange-600"></i><p class="font-bold text-[13.5px] text-stone-900">Delivery Option</p></div>
        ${deliveryOpts.map((d) => `
        <button onclick="setCheckoutDelivery('${d.id}')" class="w-full flex items-center justify-between p-3 rounded-xl border mb-2 last:mb-0 ${checkoutState.delivery === d.id ? "border-orange-500 bg-orange-50" : "border-stone-200 bg-white"}">
          <div class="text-left"><p class="text-[12.5px] font-semibold text-stone-800">${d.label}</p><p class="text-[11px] text-stone-500">${d.sub}</p></div>
          <div class="w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${checkoutState.delivery === d.id ? "border-orange-600" : "border-stone-300"}">${checkoutState.delivery === d.id ? '<div class="w-2.5 h-2.5 rounded-full bg-orange-600"></div>' : ""}</div>
        </button>`).join("")}
      </div>

      ${glassCardOpen("p-4")}
        <div class="flex items-center gap-2 mb-3"><i class="fas fa-wallet text-orange-600"></i><p class="font-bold text-[13.5px] text-stone-900">Payment Method</p></div>
        ${paymentOpts.map((p) => `
        <button onclick="setCheckoutPayment('${p.id}')" class="w-full flex items-center gap-3 p-3 rounded-xl border mb-2 last:mb-0 ${checkoutState.payment === p.id ? "border-orange-500 bg-orange-50" : "border-stone-200 bg-white"}">
          <i class="fas ${p.icon} text-stone-600"></i>
          <p class="text-[12.5px] font-semibold text-stone-800 flex-1 text-left">${p.label}</p>
          <div class="w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${checkoutState.payment === p.id ? "border-orange-600" : "border-stone-300"}">${checkoutState.payment === p.id ? '<div class="w-2.5 h-2.5 rounded-full bg-orange-600"></div>' : ""}</div>
        </button>`).join("")}
      </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-stone-200 px-5 py-3 flex items-center gap-3">
      <div><p class="text-[10px] text-stone-400">Total Amount</p><p class="text-[16px] font-bold text-stone-900">${money(total)}</p></div>
      <button onclick="placeOrder()" ${primaryBtnAttrs()} style="flex:1;padding:14px 0">Place Order</button>
    </div>
  </div>`;
}
function setCheckoutDelivery(id) { checkoutState.delivery = id; renderApp(); }
function setCheckoutPayment(id) { checkoutState.payment = id; renderApp(); }

function renderSuccess() {
  const orderNum = "MK" + Math.floor(10000 + Math.random() * 89999);
  return `
  <div class="h-screen flex flex-col items-center justify-center px-8 text-center" style="background:linear-gradient(to bottom,#FDFAF4,#FFF4E8)">
    <div class="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center mb-6 animate-pop" style="box-shadow:0 10px 40px rgba(16,185,129,0.4)">
      <i class="fas fa-check text-white text-5xl"></i>
    </div>
    <h2 class="text-[21px] font-bold text-stone-900 mb-2 font-serif">Order Placed Successfully!</h2>
    <p class="text-[13px] text-stone-500 mb-1">Your order #${orderNum} has been confirmed.</p>
    <p class="text-[12.5px] text-stone-500 mb-8">Mahakal's blessings are on their way to you 🙏</p>
    <button onclick="navReplace('home')" ${primaryBtnAttrs()} style="width:100%;padding:16px 0">Continue Shopping</button>
    <button onclick="navReplace('tracking')" class="mt-4 text-[12.5px] font-semibold text-orange-600">Track My Order</button>
  </div>`;
}

function renderWishlist() {
  const items = PRODUCTS.filter((p) => isWished(p.id));
  return `
  <div class="pb-6">
    ${topBar(`Wishlist (${items.length})`)}
    ${items.length === 0 ? `
    <div class="flex flex-col items-center justify-center py-24 px-8 text-center">
      <i class="far fa-heart text-stone-300 text-5xl mb-4"></i>
      <p class="font-bold text-stone-800 mb-1">Your wishlist is empty</p>
      <p class="text-[12.5px] text-stone-500">Tap the heart icon on products you love.</p>
    </div>` : `
    <div class="grid grid-cols-2 gap-3 px-5 mt-3">${items.map((p) => productCard(p)).join("")}</div>`}
  </div>`;
}

function renderProfile() {
  const menu = [
    { icon: "fa-box", label: "My Orders", sub: "Track, return or buy again", action: "navGo('tracking')" },
    { icon: "fa-heart", label: "Wishlist", sub: `${State.wishlist.length} items saved`, action: "navReplace('wishlist')" },
    { icon: "fa-map-marker-alt", label: "Saved Addresses", sub: "2 addresses saved", action: "" },
    { icon: "fa-credit-card", label: "Saved Cards", sub: "Manage payment methods", action: "" },
  ];
  return `
  <div class="pb-6">
    ${topBar("My Profile")}
    <div class="mx-5 mt-4 rounded-[22px] bg-gradient-to-br from-[#2b1305] to-[#4a2109] p-5 flex items-center gap-4 relative overflow-hidden">
      ${mandalaSvg("absolute -right-6 -top-6 w-32 h-32 text-amber-300")}
      <div class="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center text-2xl font-bold text-stone-900 relative z-10">PS</div>
      <div class="relative z-10">
        <p class="text-white font-bold text-[15px]">Priya Sharma</p>
        <p class="text-amber-200/70 text-[12px]">priya.sharma@email.com</p>
        <p class="text-amber-200/70 text-[12px]">+91 98765 43210</p>
      </div>
    </div>

    <div class="px-5 mt-5 space-y-3">
      ${menu.map((m) => `
      <button onclick="${m.action}" class="w-full flex items-center gap-3 bg-white rounded-2xl p-4 border border-stone-100 shadow-sm">
        <div class="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center"><i class="fas ${m.icon} text-orange-600"></i></div>
        <div class="flex-1 text-left"><p class="text-[13px] font-semibold text-stone-900">${m.label}</p><p class="text-[11px] text-stone-500">${m.sub}</p></div>
        <i class="fas fa-chevron-right text-stone-300 text-xs"></i>
      </button>`).join("")}

      <button onclick="navGo('about')" class="w-full flex items-center gap-3 bg-white rounded-2xl p-4 border border-stone-100 shadow-sm">
        <div class="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center"><i class="fas fa-star-and-crescent text-orange-600"></i></div>
        <div class="flex-1 text-left"><p class="text-[13px] font-semibold text-stone-900">About Us</p><p class="text-[11px] text-stone-500">Our temple story & workshop</p></div>
        <i class="fas fa-chevron-right text-stone-300 text-xs"></i>
      </button>
      <button onclick="navGo('contact')" class="w-full flex items-center gap-3 bg-white rounded-2xl p-4 border border-stone-100 shadow-sm">
        <div class="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center"><i class="fas fa-phone text-orange-600"></i></div>
        <div class="flex-1 text-left"><p class="text-[13px] font-semibold text-stone-900">Contact Us</p><p class="text-[11px] text-stone-500">Get in touch with our team</p></div>
        <i class="fas fa-chevron-right text-stone-300 text-xs"></i>
      </button>
      <button class="w-full flex items-center gap-3 bg-white rounded-2xl p-4 border border-stone-100 shadow-sm">
        <div class="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center"><i class="fas fa-right-from-bracket text-red-500"></i></div>
        <p class="text-[13px] font-semibold text-red-500 flex-1 text-left">Logout</p>
      </button>
    </div>
  </div>`;
}

function renderTracking() {
  const steps = [
    { icon: "fa-check", label: "Order Received", date: "24 Jul, 10:32 AM", done: true },
    { icon: "fa-box", label: "Packed", date: "24 Jul, 4:10 PM", done: true },
    { icon: "fa-truck", label: "Shipped", date: "25 Jul, 9:00 AM", done: true },
    { icon: "fa-location-dot", label: "Out for Delivery", date: "28 Jul, 8:15 AM", done: true },
    { icon: "fa-box-open", label: "Delivered", date: "Expected today", done: false },
  ];
  return `
  <div class="pb-8">
    ${topBar("Track Order", true)}
    <div class="mx-5 mt-4 rounded-2xl bg-white p-4 border border-stone-100 shadow-sm flex items-center gap-3">
      <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center text-2xl">🔱</div>
      <div><p class="text-[13px] font-bold text-stone-900">Order #MK48213</p><p class="text-[11.5px] text-stone-500">Mahakal Trishul Kada + 1 more item</p></div>
    </div>
    <div class="mx-5 mt-6">
      ${steps.map((s, i) => `
      <div class="flex gap-4">
        <div class="flex flex-col items-center">
          <div class="w-9 h-9 rounded-full flex items-center justify-center ${s.done ? "bg-orange-600" : "bg-stone-200"}">
            <i class="fas ${s.icon} ${s.done ? "text-white" : "text-stone-400"} text-sm"></i>
          </div>
          ${i < steps.length - 1 ? `<div class="w-0.5 flex-1 ${s.done ? "bg-orange-600" : "bg-stone-200"}" style="min-height:36px"></div>` : ""}
        </div>
        <div class="pb-8">
          <p class="text-[13.5px] font-bold ${s.done ? "text-stone-900" : "text-stone-400"}">${s.label}</p>
          <p class="text-[11.5px] text-stone-500">${s.date}</p>
        </div>
      </div>`).join("")}
    </div>
  </div>`;
}

function renderAbout() {
  return `
  <div class="pb-8">
    ${topBar("About Us", true)}
    <div class="mx-5 mt-4 rounded-[22px] overflow-hidden bg-gradient-to-br from-[#2b1305] to-[#4a2109] p-6 relative">
      ${mandalaSvg("absolute -right-10 -top-10 w-56 h-56 text-amber-300")}
      <p class="text-amber-400 text-[10px] font-bold tracking-[0.3em] mb-2 relative z-10">OUR STORY</p>
      <h2 class="text-white font-serif text-[20px] font-bold mb-2 relative z-10">Rooted in Faith, Crafted with Devotion</h2>
      <p class="text-amber-100/70 text-[12.5px] leading-relaxed relative z-10">Founded in 2015 near the sacred Mahakaleshwar Temple in Ujjain, we began with a single mission — to bring authentic, energized spiritual jewellery to devotees across India.</p>
    </div>

    <div class="px-5 mt-6">
      <div class="flex items-center gap-2 mb-3"><i class="fas fa-map-pin text-orange-600"></i><p class="font-bold text-[14px] text-stone-900">Temple Location</p></div>
      <div class="rounded-2xl overflow-hidden h-40 relative flex items-center justify-center" style="background:linear-gradient(135deg,#ffedd5,#e7e5e4)">
        <i class="fas fa-map-pin text-orange-600 text-3xl"></i>
      </div>
      <p class="text-[12px] text-stone-500 mt-2">Mahakaleshwar Marg, Ujjain, Madhya Pradesh - 456001</p>
    </div>

    <div class="px-5 mt-6">
      <p class="font-bold text-[14px] text-stone-900 mb-3">Our Workshop Gallery</p>
      <div class="grid grid-cols-3 gap-2">
        ${["🔱","🪷","💎","🧿","🕉️","✨"].map((e) => `<div class="aspect-square rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center text-2xl border border-stone-100">${e}</div>`).join("")}
      </div>
    </div>

    <div class="px-5 mt-6">
      <div class="bg-white rounded-2xl p-4 border border-stone-100 shadow-sm flex items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center text-2xl"><i class="fas fa-user text-stone-700"></i></div>
        <div><p class="text-[13.5px] font-bold text-stone-900">Rajesh Prajapat</p><p class="text-[11.5px] text-stone-500">Founder & Artisan, Mahakal Spiritual Store</p></div>
      </div>
    </div>

    <div class="px-5 mt-6"><button onclick="navGo('contact')" ${primaryBtnAttrs()} style="width:100%;padding:14px 0">Get in Touch</button></div>
  </div>`;
}

function renderContact() {
  return `
  <div class="pb-8">
    ${topBar("Contact Us", true)}
    <div class="px-5 mt-4 space-y-3">
      <a href="#" onclick="return false" class="flex items-center gap-3 bg-white rounded-2xl p-4 border border-stone-100 shadow-sm">
        <div class="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center"><i class="fas fa-phone text-orange-600"></i></div>
        <div><p class="text-[13px] font-semibold text-stone-900">Call Us</p><p class="text-[12px] text-stone-500">+91 98765 43210</p></div>
      </a>
      <a href="#" onclick="return false" class="flex items-center gap-3 bg-white rounded-2xl p-4 border border-stone-100 shadow-sm">
        <div class="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center"><i class="fab fa-whatsapp text-emerald-600"></i></div>
        <div><p class="text-[13px] font-semibold text-stone-900">WhatsApp</p><p class="text-[12px] text-stone-500">Chat with us instantly</p></div>
      </a>
      <div class="rounded-2xl overflow-hidden h-40 relative flex items-center justify-center" style="background:linear-gradient(135deg,#ffedd5,#e7e5e4)">
        <i class="fas fa-map-pin text-orange-600 text-3xl"></i>
      </div>
      <div class="bg-white rounded-2xl p-4 border border-stone-100 shadow-sm">
        <p class="text-[13px] font-semibold text-stone-900 mb-3">Follow Us</p>
        <div class="flex gap-3">
          <div class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center"><i class="fab fa-instagram text-orange-600"></i></div>
          <div class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center"><i class="fab fa-facebook-f text-orange-600"></i></div>
          <div class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center"><i class="fab fa-youtube text-orange-600"></i></div>
        </div>
      </div>
    </div>
  </div>`;
}