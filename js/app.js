(function () {
  "use strict";

  const CART_KEY = "shop_cart_v1";

  
  function pageName() {
    const el = document.querySelector("[data-page]") || document.body;
    return el.dataset.page || "";
  }

  function esc(text) {
    return String(text ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function money(n) {
    return SHOP.currency + Number(n || 0).toLocaleString("th-TH");
  }

  function findProduct(id) {
    return PRODUCTS.find(function (p) { return p.id === id; });
  }

  function coverImage(p) {
    return (p.images && p.images[0]) || "images/no-image.svg";
  }

  function qs(name) {
    return new URLSearchParams(location.search).get(name);
  }

  let memoryCart = [];
  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return memoryCart;
    }
  }
  function saveCart(cart) {
    memoryCart = cart;
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {  }
    updateCartBadge();
  }

  
  const Cart = {
    items: function () {
      return loadCart().filter(function (it) { return findProduct(it.id); });
    },
    add: function (id, option, qty) {
      const cart = loadCart();
      const key = id + "|" + (option || "");
      const found = cart.find(function (it) { return it.key === key; });
      if (found) found.qty += qty;
      else cart.push({ key: key, id: id, option: option || "", qty: qty });
      saveCart(cart);
    },
    setQty: function (key, qty) {
      let cart = loadCart();
      cart.forEach(function (it) { if (it.key === key) it.qty = qty; });
      cart = cart.filter(function (it) { return it.qty > 0; });
      saveCart(cart);
    },
    remove: function (key) {
      saveCart(loadCart().filter(function (it) { return it.key !== key; }));
    },
    clear: function () { saveCart([]); },
    count: function () {
      return Cart.items().reduce(function (s, it) { return s + it.qty; }, 0);
    },
    subtotal: function () {
      return Cart.items().reduce(function (s, it) {
        return s + findProduct(it.id).price * it.qty;
      }, 0);
    },
    shipping: function (subtotal) {
      if (subtotal <= 0) return 0;
      if (SHOP.freeShippingMin > 0 && subtotal >= SHOP.freeShippingMin) return 0;
      return SHOP.shippingFee;
    }
  };

  
  const ICON = {
    search: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    bag: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    left: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
    right: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>'
  };

  function brandHTML() {
    return SHOP.logo
      ? '<img src="' + esc(SHOP.logo) + '" alt="' + esc(SHOP.name) + '" class="logo-img">'
      : '<span class="logo-text">' + esc(SHOP.name) + "</span>";
  }

  function followLink() {
    if (SHOP.lineOA) return "https://line.me/R/ti/p/" + encodeURIComponent(SHOP.lineOA);
    return SHOP.facebook || SHOP.instagram || SHOP.tiktok || "";
  }

  function renderHeader() {
    const el = document.getElementById("site-header");
    if (!el) return;
    const home = pageName() === "home" ? "" : "index.html";
    el.innerHTML =
      (SHOP.announcement ? '<div class="announce">' + esc(SHOP.announcement) + "</div>" : "") +
      '<div class="header-bar">' +
        '<div class="container header-inner">' +
          '<button type="button" class="icon-btn menu-btn" id="menu-btn" aria-label="เปิดเมนู" aria-expanded="false">' + ICON.menu + "</button>" +
          '<nav class="nav" id="main-nav">' +
            '<a href="' + home + '#catalog">สินค้า</a>' +
            ((SHOP.stories || []).length ? '<a href="' + home + '#stories">คอลเลกชัน</a>' : "") +
            '<a href="' + home + '#about">เกี่ยวกับเรา</a>' +
          "</nav>" +
          '<a href="index.html" class="brand">' + brandHTML() + "</a>" +
          '<div class="header-icons">' +
            '<a href="' + home + '#catalog" class="icon-btn" id="search-link" aria-label="ค้นหาสินค้า">' + ICON.search + "</a>" +
            '<a href="cart.html" class="icon-btn cart-link" aria-label="ตะกร้าสินค้า">' + ICON.bag +
              '<span class="cart-badge" id="cart-badge">0</span></a>' +
          "</div>" +
        "</div>" +
      "</div>";

    const btn = document.getElementById("menu-btn");
    const nav = document.getElementById("main-nav");
    btn.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    });
    document.getElementById("search-link").addEventListener("click", function () {
      setTimeout(function () {
        const s = document.getElementById("search");
        if (s) s.focus({ preventScroll: true });
      }, 300);
    });
    updateCartBadge();
  }

  function renderFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;
    const home = pageName() === "home" ? "" : "index.html";
    function ext(url, label) {
      return url ? '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + label + "</a>" : "";
    }
    const contact = [
      SHOP.phone ? "<span>โทร " + esc(SHOP.phone) + "</span>" : "",
      SHOP.lineOA ? ext("https://line.me/R/ti/p/" + encodeURIComponent(SHOP.lineOA), "LINE " + esc(SHOP.lineOA)) : "",
      SHOP.email ? '<a href="mailto:' + esc(SHOP.email) + '">' + esc(SHOP.email) + "</a>" : "",
      SHOP.address ? "<span>" + esc(SHOP.address) + "</span>" : ""
    ].join("");
    const social = [ext(SHOP.facebook, "Facebook"), ext(SHOP.instagram, "Instagram"), ext(SHOP.tiktok, "TikTok")].join("");

    el.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-col footer-about" id="about">' +
            '<h4>เกี่ยวกับเรา</h4>' +
            (SHOP.about ? "<p>" + esc(SHOP.about) + "</p>" : "<p>" + esc(SHOP.name) + "</p>") +
          "</div>" +
          '<div class="footer-col"><h4>เมนู</h4>' +
            '<a href="' + home + '#catalog">สินค้าทั้งหมด</a>' +
            ((SHOP.stories || []).length ? '<a href="' + home + '#stories">คอลเลกชัน</a>' : "") +
            '<a href="cart.html">ตะกร้าสินค้า</a>' +
          "</div>" +
          '<div class="footer-col"><h4>ติดต่อร้าน</h4>' + (contact || "<span>-</span>") + "</div>" +
          '<div class="footer-col"><h4>ติดตาม</h4>' + (social || "<span>-</span>") + "</div>" +
        "</div>" +
        '<div class="footer-bottom">' + esc(SHOP.footerNote) + "</div>" +
        '<div class="footer-wordmark" aria-hidden="true">' + esc(SHOP.name) + "</div>" +
      "</div>";
  }

  function updateCartBadge() {
    const b = document.getElementById("cart-badge");
    if (!b) return;
    const n = Cart.count();
    b.textContent = n;
    b.hidden = n === 0;
  }

  function toast(msg) {
    let t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.className = "toast";
      t.setAttribute("role", "status");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  
  function productCard(p) {
    const url = "product.html?id=" + encodeURIComponent(p.id);
    const badge = p.soldOut
      ? '<span class="badge">SOLD OUT</span>'
      : p.badge ? '<span class="badge">' + esc(p.badge) + "</span>" : "";
    let action;
    if (p.soldOut) action = '<span class="card-btn is-disabled">สินค้าหมด</span>';
    else if (p.options && p.options.length) action = '<a class="card-btn" href="' + url + '">เลือกตัวเลือก</a>';
    else action = '<button type="button" class="card-btn" data-add="' + esc(p.id) + '">ใส่ตะกร้า</button>';

    return (
      '<article class="card' + (p.soldOut ? " is-soldout" : "") + '">' +
        '<a class="card-img" href="' + url + '">' + badge +
          '<img src="' + esc(coverImage(p)) + '" alt="' + esc(p.name) + '" loading="lazy" onerror="this.src=\'images/no-image.svg\'">' +
        "</a>" +
        '<div class="card-body">' +
          '<div class="card-top">' +
            '<a class="card-name" href="' + url + '">' + esc(p.name) + "</a>" +
            '<span class="card-price">' + money(p.price) +
              (p.oldPrice ? ' <s class="old-price">' + money(p.oldPrice) + "</s>" : "") + "</span>" +
          "</div>" +
          (p.short ? '<div class="card-short">' + esc(p.short) + "</div>" : "") +
          action +
        "</div>" +
      "</article>"
    );
  }

  document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    Cart.add(btn.dataset.add, "", 1);
    toast("เพิ่มลงตะกร้าแล้ว");
  });

  
  function initHome() {
    document.title = SHOP.name + (SHOP.tagline ? " | " + SHOP.tagline : "");

        const hero = document.getElementById("hero");
    const h = SHOP.hero || {};
    if (h.layout === "below") hero.classList.add("hero-below");
    if (h.layout === "overlay") hero.classList.add("hero-overlay");
    hero.innerHTML =
      (h.image
        ? "<picture>" +
            (h.imageMobile ? '<source media="(max-width: 700px)" srcset="' + esc(h.imageMobile) + '">' : "") +
            '<img class="hero-img" src="' + esc(h.image) + '" alt="">' +
          "</picture>"
        : "") +
      '<div class="hero-content">' +
        (h.title ? '<h1 class="hero-title">' + esc(h.title) + "</h1>" : '<h1 class="sr-only">' + esc(SHOP.name) + "</h1>") +
        (h.buttonText ? '<a class="btn btn-light" href="' + esc(h.buttonLink || "#catalog") + '">' + esc(h.buttonText) + "</a>" : "") +
      "</div>";

        if (h.layout === "overlay" && h.effect === "glass" && h.title) {
      hero.insertAdjacentHTML("beforeend",
        '<svg class="hero-mask" viewBox="0 0 1500 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
          '<text class="hero-glass" x="750" y="258" text-anchor="middle" dominant-baseline="central" textLength="1300" lengthAdjust="spacingAndGlyphs">' +
            esc(h.title).toLowerCase() + "</text>" +
        "</svg>");
      const hg = hero.querySelector(".hero-title");
      if (hg) hg.classList.add("sr-only");
    }
    if (h.layout === "overlay" && h.effect === "knockout" && h.title) {
      const t = esc(h.title).toLowerCase();
      hero.insertAdjacentHTML("beforeend",
        '<svg class="hero-mask" viewBox="0 0 1500 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
          '<defs><mask id="hero-knock" maskUnits="userSpaceOnUse" x="0" y="0" width="1500" height="500">' +
            '<rect width="1500" height="500" fill="#fff"/>' +
            '<text x="750" y="258" text-anchor="middle" dominant-baseline="central" textLength="1300" lengthAdjust="spacingAndGlyphs">' + t + "</text>" +
          "</mask></defs>" +
          '<rect class="hero-tint" width="1500" height="500" mask="url(#hero-knock)"/>' +
        "</svg>");
      const ht = hero.querySelector(".hero-title");
      if (ht) ht.classList.add("sr-only");
    }

    const feat = document.getElementById("featured");
    let featList = (SHOP.featuredIds || []).map(findProduct).filter(Boolean);
    if (!featList.length) featList = PRODUCTS.filter(function (p) { return p.badge && !p.soldOut; });
    if (SHOP.showFeatured === false || !featList.length) {
      feat.hidden = true;
    } else {
      feat.innerHTML =
        '<div class="container">' +
          '<div class="section-head"><h2>' + esc(SHOP.featuredTitle || "สินค้าแนะนำ") + "</h2>" +
            '<div class="slider-nav">' +
              '<button type="button" class="icon-btn round" data-dir="-1" aria-label="เลื่อนซ้าย">' + ICON.left + "</button>" +
              '<button type="button" class="icon-btn round" data-dir="1" aria-label="เลื่อนขวา">' + ICON.right + "</button>" +
            "</div>" +
          "</div>" +
          '<div class="slider" id="slider">' + featList.map(productCard).join("") + "</div>" +
          '<div class="slider-progress"><span id="slider-bar"></span></div>' +
        "</div>";
      const slider = document.getElementById("slider");
      const bar = document.getElementById("slider-bar");
      feat.querySelectorAll("[data-dir]").forEach(function (b) {
        b.addEventListener("click", function () {
          slider.scrollBy({ left: Number(b.dataset.dir) * slider.clientWidth * 0.8, behavior: "smooth" });
        });
      });
      function progress() {
        const max = slider.scrollWidth - slider.clientWidth;
        const ratio = slider.clientWidth / slider.scrollWidth;
        bar.style.width = Math.min(100, ratio * 100) + "%";
        bar.style.marginLeft = (max > 0 ? (slider.scrollLeft / slider.scrollWidth) * 100 : 0) + "%";
      }
      slider.addEventListener("scroll", progress, { passive: true });
      window.addEventListener("resize", progress);
      progress();
    }

        const stories = document.getElementById("stories");
    const st = SHOP.stories || [];
    if (!st.length) stories.hidden = true;
    stories.innerHTML = st.map(function (s, i) {
      return (
        '<div class="story' + (i % 2 ? " story-reverse" : "") + '">' +
          '<div class="story-img"><img src="' + esc(s.image) + '" alt="" loading="lazy"></div>' +
          '<div class="story-text">' +
            "<h2>" + esc(s.title) + "</h2>" +
            (s.text ? "<p>" + esc(s.text) + "</p>" : "") +
            (s.buttonText ? '<a class="btn btn-dark" href="' + esc(s.buttonLink || "#catalog") + '">' + esc(s.buttonText) + "</a>" : "") +
          "</div>" +
        "</div>"
      );
    }).join("");

        const com = document.getElementById("community");
    const c = SHOP.community || {};
    if (!c.images || !c.images.length) {
      com.hidden = true;
    } else {
      const link = c.buttonLink || followLink();
      com.innerHTML =
        '<div class="container">' +
          '<h2 class="community-title">' + esc(c.title) + "</h2>" +
          '<div class="collage">' + c.images.slice(0, 3).map(function (src, i) {
            return '<figure class="polaroid p' + (i + 1) + '"><img src="' + esc(src) + '" alt="" loading="lazy"></figure>';
          }).join("") + "</div>" +
          (c.text ? '<p class="community-text">' + esc(c.text) + "</p>" : "") +
          (c.buttonText && link ? '<a class="btn btn-dark" href="' + esc(link) + '" target="_blank" rel="noopener">' + esc(c.buttonText) + "</a>" : "") +
        "</div>";
    }

        document.getElementById("catalog-title").textContent = SHOP.catalogTitle || "สินค้าทั้งหมด";
    const filterBox = document.getElementById("filters");
    const grid = document.getElementById("product-grid");
    const search = document.getElementById("search");
    const sort = document.getElementById("sort");
    let activeCat = "ทั้งหมด";

    const cats = ["ทั้งหมด"].concat(CATEGORIES);
    filterBox.innerHTML = cats.map(function (c) {
      return '<button type="button" class="chip' + (c === activeCat ? " active" : "") + '" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
    }).join("");

    filterBox.addEventListener("click", function (e) {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      activeCat = btn.dataset.cat;
      filterBox.querySelectorAll(".chip").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      draw();
    });
    search.addEventListener("input", draw);
    sort.addEventListener("change", draw);

    function draw() {
      const word = search.value.trim().toLowerCase();
      let list = PRODUCTS.filter(function (p) {
        const okCat = activeCat === "ทั้งหมด" || p.category === activeCat;
        const okWord = !word ||
          p.name.toLowerCase().includes(word) ||
          (p.description || "").toLowerCase().includes(word);
        return okCat && okWord;
      });
      if (sort.value === "low") list = list.slice().sort(function (a, b) { return a.price - b.price; });
      if (sort.value === "high") list = list.slice().sort(function (a, b) { return b.price - a.price; });

      document.getElementById("catalog-count").textContent = list.length + " รายการ";
      if (!list.length) {
        grid.innerHTML = '<p class="empty">ไม่พบสินค้าที่ค้นหา</p>';
        return;
      }
      const cards = list.map(productCard);
      const showFeature = SHOP.catalogFeatureImage && activeCat === "ทั้งหมด" && !word && list.length >= 5;
      if (showFeature) {
        cards.splice(3, 0,
          '<div class="feature-tile"><img src="' + esc(SHOP.catalogFeatureImage) + '" alt="" loading="lazy"></div>');
      }
      grid.innerHTML = cards.join("");
    }
    draw();
  }

  
  function initProduct() {
    const box = document.getElementById("product-detail");
    const p = findProduct(qs("id"));
    if (!p) {
      box.innerHTML = '<p class="empty">ไม่พบสินค้านี้ <a href="index.html">กลับไปหน้าสินค้าทั้งหมด</a></p>';
      return;
    }
    document.title = p.name + " | " + SHOP.name;
    const imgs = (p.images && p.images.length) ? p.images : ["images/no-image.svg"];

    box.innerHTML =
      '<div class="detail">' +
        '<div class="gallery">' +
          '<img id="main-img" class="main-img" src="' + esc(imgs[0]) + '" alt="' + esc(p.name) + '" onerror="this.src=\'images/no-image.svg\'">' +
          (imgs.length > 1
            ? '<div class="thumbs">' + imgs.map(function (src, i) {
                return '<button type="button" class="thumb' + (i === 0 ? " active" : "") + '" data-src="' + esc(src) + '"><img src="' + esc(src) + '" alt=""></button>';
              }).join("") + "</div>"
            : "") +
        "</div>" +
        '<div class="info">' +
          '<a href="index.html" class="back">← สินค้าทั้งหมด</a>' +
          '<div class="card-cat">' + esc(p.category) + "</div>" +
          "<h1>" + esc(p.name) + "</h1>" +
          '<div class="detail-price"><span class="price">' + money(p.price) + "</span>" +
            (p.oldPrice ? '<span class="old-price">' + money(p.oldPrice) + "</span>" : "") + "</div>" +
          (p.options && p.options.length
            ? '<label class="field"><span>ตัวเลือก</span><select id="opt">' +
                p.options.map(function (o) { return "<option>" + esc(o) + "</option>"; }).join("") +
              "</select></label>"
            : "") +
          '<label class="field"><span>จำนวน</span>' +
            '<div class="qty"><button type="button" data-step="-1" aria-label="ลดจำนวน">−</button>' +
            '<input id="qty" type="number" min="1" value="1" inputmode="numeric">' +
            '<button type="button" data-step="1" aria-label="เพิ่มจำนวน">+</button></div>' +
          "</label>" +
          (p.soldOut
            ? '<button class="btn btn-block" disabled>สินค้าหมด</button>'
            : '<button id="add-btn" class="btn btn-primary btn-block">ใส่ตะกร้า</button>' +
              '<button id="buy-btn" class="btn btn-block">ซื้อเลย</button>') +
          (p.description ? '<div class="desc">' + esc(p.description).replace(/\n/g, "<br>") + "</div>" : "") +
        "</div>" +
      "</div>";

    box.querySelectorAll(".thumb").forEach(function (t) {
      t.addEventListener("click", function () {
        document.getElementById("main-img").src = t.dataset.src;
        box.querySelectorAll(".thumb").forEach(function (x) { x.classList.toggle("active", x === t); });
      });
    });

    const qtyInput = document.getElementById("qty");
    box.querySelectorAll(".qty button").forEach(function (b) {
      b.addEventListener("click", function () {
        qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) + Number(b.dataset.step));
      });
    });

    function addToCart() {
      const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
      const optEl = document.getElementById("opt");
      Cart.add(p.id, optEl ? optEl.value : "", qty);
    }
    const addBtn = document.getElementById("add-btn");
    if (addBtn) {
      addBtn.addEventListener("click", function () { addToCart(); toast("เพิ่มลงตะกร้าแล้ว"); });
      document.getElementById("buy-btn").addEventListener("click", function () {
        addToCart(); location.href = "cart.html";
      });
    }
  }

  
  function summaryHTML(withCod) {
    const sub = Cart.subtotal();
    const ship = Cart.shipping(sub);
    const cod = withCod ? (SHOP.payment.codFee || 0) : 0;
    let note = "";
    if (SHOP.freeShippingMin > 0 && sub > 0 && sub < SHOP.freeShippingMin) {
      note = '<div class="ship-note">ซื้อเพิ่มอีก ' + money(SHOP.freeShippingMin - sub) + " ส่งฟรี</div>";
    }
    return {
      total: sub + ship + cod,
      sub: sub, ship: ship, cod: cod,
      html:
        '<div class="sum-row"><span>ราคาสินค้า</span><span>' + money(sub) + "</span></div>" +
        '<div class="sum-row"><span>ค่าส่ง</span><span>' + (ship === 0 ? "ส่งฟรี" : money(ship)) + "</span></div>" +
        (cod ? '<div class="sum-row"><span>ค่าเก็บเงินปลายทาง</span><span>' + money(cod) + "</span></div>" : "") +
        '<div class="sum-row sum-total"><span>ยอดรวม</span><span>' + money(sub + ship + cod) + "</span></div>" +
        note
    };
  }

  function initCart() {
    const list = document.getElementById("cart-list");
    const sum = document.getElementById("cart-summary");

    function draw() {
      const items = Cart.items();
      if (!items.length) {
        list.innerHTML = '<p class="empty">ยังไม่มีสินค้าในตะกร้า <a href="index.html">เลือกซื้อสินค้า</a></p>';
        sum.hidden = true;
        return;
      }
      sum.hidden = false;
      list.innerHTML = items.map(function (it) {
        const p = findProduct(it.id);
        return (
          '<div class="cart-item" data-key="' + esc(it.key) + '">' +
            '<img src="' + esc(coverImage(p)) + '" alt="" onerror="this.src=\'images/no-image.svg\'">' +
            '<div class="ci-info">' +
              '<a href="product.html?id=' + encodeURIComponent(p.id) + '" class="ci-name">' + esc(p.name) + "</a>" +
              (it.option ? '<div class="ci-opt">ตัวเลือก: ' + esc(it.option) + "</div>" : "") +
              '<div class="ci-price">' + money(p.price) + "</div>" +
            "</div>" +
            '<div class="qty qty-sm"><button type="button" data-act="dec" aria-label="ลดจำนวน">−</button>' +
              "<span>" + it.qty + "</span>" +
              '<button type="button" data-act="inc" aria-label="เพิ่มจำนวน">+</button></div>' +
            '<div class="ci-total">' + money(p.price * it.qty) + "</div>" +
            '<button type="button" class="ci-remove" data-act="del" aria-label="ลบสินค้า">✕</button>' +
          "</div>"
        );
      }).join("");
      sum.querySelector(".sum-lines").innerHTML = summaryHTML(false).html;
    }

    list.addEventListener("click", function (e) {
      const btn = e.target.closest("button[data-act]");
      if (!btn) return;
      const key = btn.closest(".cart-item").dataset.key;
      const it = Cart.items().find(function (x) { return x.key === key; });
      if (btn.dataset.act === "inc") Cart.setQty(key, it.qty + 1);
      if (btn.dataset.act === "dec") Cart.setQty(key, it.qty - 1);
      if (btn.dataset.act === "del") Cart.remove(key);
      draw();
    });
    draw();
  }

  
  function makeOrderNo() {
    const d = new Date();
    const pad = function (n) { return String(n).padStart(2, "0"); };
    return "OD" + String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate()) +
      "-" + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());
  }

  function initCheckout() {
    const form = document.getElementById("checkout-form");
    const sumBox = document.getElementById("checkout-summary");
    const result = document.getElementById("order-result");
    const payBox = document.getElementById("pay-options");

    if (!Cart.items().length) {
      form.hidden = true;
      sumBox.hidden = true;
      document.getElementById("checkout-empty").hidden = false;
      return;
    }

    const pays = [];
    if (SHOP.payment.transfer) pays.push({ v: "transfer", t: "โอนเงิน / พร้อมเพย์" });
    if (SHOP.payment.cod) pays.push({ v: "cod", t: "เก็บเงินปลายทาง" + (SHOP.payment.codFee ? " (+" + money(SHOP.payment.codFee) + ")" : "") });
    payBox.innerHTML = pays.map(function (p, i) {
      return '<label class="radio"><input type="radio" name="pay" value="' + p.v + '"' + (i === 0 ? " checked" : "") + "> " + esc(p.t) + "</label>";
    }).join("");

    function isCod() {
      const r = form.querySelector('input[name="pay"]:checked');
      return r && r.value === "cod";
    }

    function drawSummary() {
      const items = Cart.items();
      sumBox.querySelector(".sum-items").innerHTML = items.map(function (it) {
        const p = findProduct(it.id);
        return '<div class="sum-row"><span>' + esc(p.name) + (it.option ? " (" + esc(it.option) + ")" : "") +
          " × " + it.qty + "</span><span>" + money(p.price * it.qty) + "</span></div>";
      }).join("");
      sumBox.querySelector(".sum-lines").innerHTML = summaryHTML(isCod()).html;
    }
    payBox.addEventListener("change", drawSummary);
    drawSummary();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const f = new FormData(form);
      const name = (f.get("name") || "").trim();
      const phone = (f.get("phone") || "").trim();
      const address = (f.get("address") || "").trim();
      const note = (f.get("note") || "").trim();

      let ok = true;
      form.querySelectorAll(".error").forEach(function (x) { x.textContent = ""; });
      function err(field, msg) {
        form.querySelector('[data-err="' + field + '"]').textContent = msg;
        ok = false;
      }
      if (!name) err("name", "กรุณากรอกชื่อ");
      if (!/^0\d{8,9}$/.test(phone.replace(/[\s-]/g, ""))) err("phone", "กรุณากรอกเบอร์โทร 9–10 หลัก");
      if (address.length < 10) err("address", "กรุณากรอกที่อยู่จัดส่งให้ครบ");
      if (!ok) return;

      const cod = isCod();
      const s = summaryHTML(cod);
      const orderNo = makeOrderNo();
      const lines = Cart.items().map(function (it, i) {
        const p = findProduct(it.id);
        return (i + 1) + ". " + p.name + (it.option ? " (" + it.option + ")" : "") +
          " x" + it.qty + " = " + money(p.price * it.qty);
      });

      const text = [
        "รายการสั่งซื้อ " + orderNo,
        "ร้าน " + SHOP.name,
        "--------------------",
        lines.join("\n"),
        "--------------------",
        "ราคาสินค้า " + money(s.sub),
        "ค่าส่ง " + (s.ship === 0 ? "ส่งฟรี" : money(s.ship)),
        cod ? "ค่าเก็บเงินปลายทาง " + money(s.cod) : null,
        "ยอดรวม " + money(s.total),
        "ชำระเงิน: " + (cod ? "เก็บเงินปลายทาง" : "โอนเงิน / พร้อมเพย์"),
        "--------------------",
        "ชื่อ: " + name,
        "โทร: " + phone,
        "ที่อยู่: " + address,
        note ? "หมายเหตุ: " + note : null
      ].filter(function (x) { return x !== null; }).join("\n");

      showResult(orderNo, text, cod, s.total);
      Cart.clear();
    });

    function showResult(orderNo, text, cod, total) {
      form.hidden = true;
      sumBox.hidden = true;
      result.hidden = false;
      const lineUrl = SHOP.lineOA
        ? "https://line.me/R/oaMessage/" + encodeURIComponent(SHOP.lineOA) + "/?" + encodeURIComponent(text)
        : "https://line.me/R/msg/text/?" + encodeURIComponent(text);

      const payInfo = cod ? "" :
        '<div class="pay-info"><h3>ช่องทางชำระเงิน</h3>' +
          "<p>ยอดที่ต้องโอน <strong>" + money(total) + "</strong></p>" +
          (SHOP.payment.bankInfo ? "<p>" + esc(SHOP.payment.bankInfo) + "</p>" : "") +
          (SHOP.payment.promptpay ? "<p>" + esc(SHOP.payment.promptpay) + "</p>" : "") +
          (SHOP.payment.qrImage ? '<img class="qr" src="' + esc(SHOP.payment.qrImage) + '" alt="QR พร้อมเพย์">' : "") +
          "<p>โอนแล้วส่งสลิปพร้อมรายการสั่งซื้อมาทาง LINE</p>" +
        "</div>";

      result.innerHTML =
        "<h2>สรุปรายการสั่งซื้อ</h2>" +
        "<p>เลขที่ " + esc(orderNo) + " — คำสั่งซื้อจะสมบูรณ์เมื่อส่งรายการนี้ให้ร้าน</p>" +
        '<pre class="order-text" id="order-text">' + esc(text) + "</pre>" +
        '<div class="result-actions">' +
          '<a class="btn btn-primary" id="line-btn" href="' + esc(lineUrl) + '" target="_blank" rel="noopener">ส่งรายการทาง LINE</a>' +
          '<button class="btn" id="copy-btn" type="button">คัดลอกรายการ</button>' +
        "</div>" +
        payInfo +
        '<p><a href="index.html">กลับไปหน้าร้าน</a></p>';

      document.getElementById("copy-btn").addEventListener("click", function () {
        copyText(text).then(function () { toast("คัดลอกแล้ว"); }, function () { toast("คัดลอกไม่สำเร็จ ให้กดค้างที่ข้อความเพื่อคัดลอก"); });
      });
      window.scrollTo(0, 0);
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy") ? resolve() : reject(); } catch (e) { reject(e); }
      ta.remove();
    });
  }

  
  document.addEventListener("DOMContentLoaded", function () {
    const warn = document.getElementById("load-warning");
    if (warn) warn.remove();
    renderHeader();
    renderFooter();
    const page = pageName();
    if (page === "home") initHome();
    if (page === "product") initProduct();
    if (page === "cart") initCart();
    if (page === "checkout") initCheckout();
  });

  window.addEventListener("storage", function (e) { if (e.key === CART_KEY) updateCartBadge(); });
})();
