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
    return (p.images && p.images[0]) || "";
  }

  function imageBox(p, cls, lazy) {
    const src = coverImage(p);
    if (!src) return '<div class="' + cls + ' ph"><span>' + esc(p.placeholder || "") + "</span></div>";
    return '<img class="' + cls + (p.fit === "cover" && cls === "card-photo" ? " fill" : "") + '" src="' + esc(src) + '" alt="' + esc(p.name) + '"' + (lazy ? ' loading="lazy"' : "") +
      " onerror=\"this.src='images/no-image.svg'\">";
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

  function langSelect(id) {
    return '<select id="' + id + '" class="lang-select" aria-label="' + esc(T("language")) + '">' +
      LANGS.map(function (l) { return '<option value="' + l.code + '"' + (l.code === LANG ? " selected" : "") + ">" + l.label + "</option>"; }).join("") +
      "</select>";
  }

  function renderHeader() {
    const el = document.getElementById("site-header");
    if (!el) return;
    const home = pageName() === "home" ? "" : "index.html";
    el.innerHTML =
      (SHOP.announcement ? '<div class="announce">' + esc(SHOP.freeShippingMin ? T("announce", SHOP.freeShippingMin) : SHOP.announcement) + "</div>" : "") +
      '<div class="header-bar">' +
        '<div class="container header-inner">' +
          '<button type="button" class="icon-btn menu-btn" id="menu-btn" aria-label="Open menu" aria-expanded="false">' + ICON.menu + "</button>" +
          '<nav class="nav" id="main-nav">' +
            '<a href="' + home + '#catalog">' + esc(T("nav_catalog")) + '</a>' +
            '<a href="' + home + '#about">' + esc(T("nav_about")) + '</a>' +
            '<div class="nav-lang">' + langSelect("lang-select-m") + "</div>" +
          "</nav>" +
          '<a href="index.html" class="brand">' + brandHTML() + "</a>" +
          '<div class="header-icons">' +
            langSelect("lang-select") +
            '<a href="' + home + '#catalog" class="icon-btn" id="search-link" aria-label="Search">' + ICON.search + "</a>" +
            '<a href="cart.html" class="icon-btn cart-link" aria-label="Cart">' + ICON.bag +
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
    document.querySelectorAll(".lang-select").forEach(function (sel) { sel.addEventListener("change", function (e) { setLang(e.target.value); }); });
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
      SHOP.phone ? "<span>" + esc(T("tel")) + " " + esc(SHOP.phone) + "</span>" : "",
      SHOP.lineOA ? ext("https://line.me/R/ti/p/" + encodeURIComponent(SHOP.lineOA), "LINE " + esc(SHOP.lineOA)) : "",
      SHOP.email ? '<a href="mailto:' + esc(SHOP.email) + '">' + esc(SHOP.email) + "</a>" : "",
      SHOP.address ? "<span>" + esc(SHOP.address) + "</span>" : ""
    ].join("");
    const social = [ext(SHOP.facebook, "Facebook"), ext(SHOP.instagram, "Instagram"), ext(SHOP.tiktok, "TikTok")].join("");

    el.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-col footer-about" id="about"><h4>' + esc(T("f_about")) + '</h4>' +
            "<span>" + esc(SHOP.about || SHOP.name) + "</span>" +
          "</div>" +
          '<div class="footer-col"><h4>' + esc(T("f_menu")) + '</h4>' +
            '<a href="' + home + '#catalog">' + esc(T("f_catalog")) + '</a>' +
          "</div>" +
          '<div class="footer-col"><h4>' + esc(T("f_contact")) + '</h4>' + (contact || "<span>-</span>") + "</div>" +
          '<div class="footer-col"><h4>' + esc(T("f_follow")) + '</h4>' + (social || "<span>-</span>") + "</div>" +
        "</div>" +
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
    const badgeText = p.soldOut ? T("sold_out") : (p.badge ? T("badge:" + p.badge) : "");
    let action;
    if (p.soldOut) action = '<span class="card-btn is-disabled">' + esc(T("sold_out")) + '</span>';
    else if (p.options && p.options.length) action = '<a class="card-btn" href="' + url + '">' + esc(T("select_options")) + '</a>';
    else action = '<button type="button" class="card-btn" data-add="' + esc(p.id) + '">' + esc(T("card_add")) + '</button>';

    return (
      '<article class="card' + (p.soldOut ? " is-soldout" : "") + '">' +
        '<a class="card-img" href="' + url + '">' +
          (badgeText ? '<span class="badge">' + esc(badgeText) + "</span>" : "") +
          imageBox(p, "card-photo", true) +
        "</a>" +
        '<div class="card-body">' +
          '<div class="card-top">' +
            '<a class="card-name" href="' + url + '">' + esc(p.name) + "</a>" +
            '<span class="card-price">' + money(p.price) +
              (p.oldPrice ? ' <s class="old-price">' + money(p.oldPrice) + "</s>" : "") + "</span>" +
          "</div>" +
          action +
        "</div>" +
      "</article>"
    );
  }

  document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    Cart.add(btn.dataset.add, "", 1);
    toast(T("added"));
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
        '<div class="hero-word" aria-hidden="true"><span>' + esc(h.title) + "</span></div>");
      const hg = hero.querySelector(".hero-title");
      if (hg) hg.classList.add("sr-only");
      const box = hero.querySelector(".hero-word");
      const word = box.querySelector("span");
      const fit = function () {
        if (!box.clientWidth) return;
        word.style.fontSize = "100px";
        const w = word.getBoundingClientRect().width;
        if (w) word.style.fontSize = (100 * box.clientWidth * 0.88 / w) + "px";
      };
      fit();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
      window.addEventListener("load", fit);
      window.addEventListener("resize", fit);
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
          '<div class="section-head"><h2>' + esc(SHOP.featuredTitle || "Featured") + "</h2>" +
            '<div class="slider-nav">' +
              '<button type="button" class="icon-btn round" data-dir="-1" aria-label="Previous">' + ICON.left + "</button>" +
              '<button type="button" class="icon-btn round" data-dir="1" aria-label="Next">' + ICON.right + "</button>" +
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

    document.getElementById("catalog-title").textContent = T("catalog_title");
    const filterBox = document.getElementById("filters");
    const grid = document.getElementById("product-grid");
    const search = document.getElementById("search");
    const sort = document.getElementById("sort");
    const ALL = "ALL";
    let activeCat = ALL;

    const cats = [ALL].concat(CATEGORIES);
    filterBox.innerHTML = cats.map(function (c) {
      return '<button type="button" class="chip' + (c === activeCat ? " active" : "") + '" data-cat="' + esc(c) + '">' + esc(c === ALL ? T("all") : T("cat:" + c)) + "</button>";
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
        const okCat = activeCat === ALL || p.category === activeCat;
        const okWord = !word || p.name.toLowerCase().includes(word);
        return okCat && okWord;
      });
      const by = {
        low: function (a, b) { return a.price - b.price; },
        high: function (a, b) { return b.price - a.price; },
        newest: function (a, b) { return (b.added || 0) - (a.added || 0); },
        top: function (a, b) { return (b.sold || 0) - (a.sold || 0); }
      }[sort.value];
      if (by) list = list.slice().sort(by);

      document.getElementById("catalog-count").textContent = T("items", list.length);
      if (!list.length) {
        grid.innerHTML = '<p class="empty">' + esc(T("no_items")) + '</p>';
        return;
      }
      const cards = list.map(productCard);
      const plain = activeCat === ALL && !word && !by;
      if (plain) {
        (SHOP.catalogFeatures || []).slice().sort(function (x, y) { return y.after - x.after; }).forEach(function (f) {
          if (f.after <= cards.length) {
            cards.splice(f.after, 0, '<div class="feature-tile"><img src="' + esc(f.image) + '" alt="" loading="lazy"></div>');
          }
        });
      }
      grid.innerHTML = cards.join("");
    }
    draw();
  }

  function initProduct() {
    const box = document.getElementById("product-detail");
    const p = findProduct(qs("id"));
    if (!p) {
      box.innerHTML = '<p class="empty">' + esc(T("not_found")) + ' <a href="index.html#catalog">' + esc(T("back_catalog")) + '</a></p>';
      return;
    }
    const title = p.name + (p.soldOut ? " (" + T("sold_out") + ")" : "");
    document.title = p.name + " | " + SHOP.name;
    const imgs = (p.images || []).slice();
    const opts = p.options || [];
    opts.forEach(function (o) { if (o.image && imgs.indexOf(o.image) < 0) imgs.push(o.image); });
    const details = (p.details || []).filter(Boolean);

    box.innerHTML =
      '<div class="detail">' +
        '<div class="gallery">' +
          '<div class="main-frame">' + (imgs.length
            ? '<img id="main-img" class="main-img" src="' + esc(imgs[0]) + '" alt="' + esc(p.name) + '">'
            : '<div class="main-img ph"><span>' + esc(p.placeholder || "") + "</span></div>") +
          "</div>" +
          (imgs.length > 1
            ? '<div class="thumbs">' + imgs.map(function (src, i) {
                return '<button type="button" class="thumb' + (i === 0 ? " active" : "") + '" data-src="' + esc(src) + '" aria-label="Image ' + (i + 1) + '"><img src="' + esc(src) + '" alt=""></button>';
              }).join("") + "</div>"
            : "") +
        "</div>" +
        '<div class="info">' +
          '<a href="index.html#catalog" class="back">' + esc(T("back_link")) + '</a>' +
          '<div class="info-cat">' + esc(T("cat:" + p.category)) + "</div>" +
          '<h1 class="info-title">' + esc(title) + "</h1>" +
          '<div class="detail-price"><span class="price">' + money(p.price) + "</span>" +
            (p.oldPrice ? '<s class="old-price">' + money(p.oldPrice) + "</s>" : "") + "</div>" +
          (opts.length
            ? '<label class="field"><span>' + esc(T("options")) + '</span><select id="opt" class="input">' +
                opts.map(function (o) { return '<option value="' + esc(o.label) + '">' + esc(o.label) + "</option>"; }).join("") +
              "</select></label>"
            : "") +
          '<div class="field"><span>' + esc(T("quantity")) + '</span>' +
            '<div class="qty"><button type="button" data-step="-1" aria-label="Decrease">−</button>' +
            '<input id="qty" type="number" min="1" value="1" inputmode="numeric" aria-label="Quantity">' +
            '<button type="button" data-step="1" aria-label="Increase">+</button></div>' +
          "</div>" +
          (p.soldOut
            ? '<button class="btn btn-block btn-soldout" disabled>' + esc(T("sold_out")) + '</button>'
            : '<button id="add-btn" class="btn btn-primary btn-block">' + esc(T("add_to_cart")) + '</button>' +
              '<button id="buy-btn" class="btn btn-block">' + esc(T("buy_now")) + '</button>') +
          '<div class="desc"><h2 class="desc-title">' + esc(T("details")) + '</h2>' +
            '<ul class="desc-list">' + details.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul>" +
          "</div>" +
        "</div>" +
      "</div>";

    const main = document.getElementById("main-img");
    const optEl = document.getElementById("opt");
    function show(src) {
      if (!main || !src) return;
      main.src = src;
      box.querySelectorAll(".thumb").forEach(function (x) { x.classList.toggle("active", x.dataset.src === src); });
    }
    box.querySelectorAll(".thumb").forEach(function (t) {
      t.addEventListener("click", function () {
        show(t.dataset.src);
        if (optEl) {
          const o = opts.find(function (o) { return o.image === t.dataset.src; });
          if (o && opts.filter(function (x) { return x.image === o.image; }).length === 1) optEl.value = o.label;
        }
      });
    });
    if (optEl) {
      optEl.addEventListener("change", function () {
        const o = opts.find(function (o) { return o.label === optEl.value; });
        if (o) show(o.image);
      });
    }

    const qtyInput = document.getElementById("qty");
    box.querySelectorAll(".qty button").forEach(function (b) {
      b.addEventListener("click", function () {
        qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) + Number(b.dataset.step));
      });
    });

    function addToCart() {
      const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
      Cart.add(p.id, optEl ? optEl.value : "", qty);
    }
    const addBtn = document.getElementById("add-btn");
    if (addBtn) {
      addBtn.addEventListener("click", function () { addToCart(); toast(T("added")); });
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
      note = '<div class="ship-note">' + esc(T("ship_more", money(SHOP.freeShippingMin - sub))) + "</div>";
    }
    return {
      total: sub + ship + cod,
      sub: sub, ship: ship, cod: cod,
      html:
        '<div class="sum-row"><span>' + esc(T("subtotal")) + '</span><span>' + money(sub) + "</span></div>" +
        '<div class="sum-row"><span>' + esc(T("shipping")) + '</span><span>' + (ship === 0 ? T("free") : money(ship)) + "</span></div>" +
        (cod ? '<div class="sum-row"><span>' + esc(T("cod_fee")) + '</span><span>' + money(cod) + "</span></div>" : "") +
        '<div class="sum-row sum-total"><span>' + esc(T("total")) + '</span><span>' + money(sub + ship + cod) + "</span></div>" +
        note
    };
  }

  function initCart() {
    const list = document.getElementById("cart-list");
    const sum = document.getElementById("cart-summary");

    function draw() {
      const items = Cart.items();
      if (!items.length) {
        list.innerHTML = '<p class="empty">' + esc(T("cart_empty")) + ' <a href="index.html">' + esc(T("continue")) + '</a></p>';
        sum.hidden = true;
        return;
      }
      sum.hidden = false;
      list.innerHTML = items.map(function (it) {
        const p = findProduct(it.id);
        return (
          '<div class="cart-item" data-key="' + esc(it.key) + '">' +
            imageBox(p, "ci-img", false) +
            '<div class="ci-info">' +
              '<a href="product.html?id=' + encodeURIComponent(p.id) + '" class="ci-name">' + esc(p.name) + "</a>" +
              (it.option ? '<div class="ci-opt">' + esc(T("option")) + ': ' + esc(it.option) + "</div>" : "") +
              '<div class="ci-price">' + money(p.price) + "</div>" +
            "</div>" +
            '<div class="qty qty-sm"><button type="button" data-act="dec" aria-label="Decrease">−</button>' +
              "<span>" + it.qty + "</span>" +
              '<button type="button" data-act="inc" aria-label="Increase">+</button></div>' +
            '<div class="ci-total">' + money(p.price * it.qty) + "</div>" +
            '<button type="button" class="ci-remove" data-act="del" aria-label="Remove">✕</button>' +
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
    if (SHOP.payment.transfer) pays.push({ v: "transfer", t: T("pay_transfer") });
    if (SHOP.payment.cod) pays.push({ v: "cod", t: T("pay_cod") + (SHOP.payment.codFee ? " (+" + money(SHOP.payment.codFee) + ")" : "") });
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
      if (!name) err("name", T("err_name"));
      if (!/^0\d{8,9}$/.test(phone.replace(/[\s-]/g, ""))) err("phone", T("err_phone"));
      if (address.length < 10) err("address", T("err_addr"));
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
        "Order " + orderNo,
        "Shop: " + SHOP.name,
        "--------------------",
        lines.join("\n"),
        "--------------------",
        "Subtotal: " + money(s.sub),
        "Shipping: " + (s.ship === 0 ? "Free" : money(s.ship)),
        cod ? "COD fee: " + money(s.cod) : null,
        "Total: " + money(s.total),
        "Payment: " + (cod ? "Cash on delivery" : "Bank transfer / PromptPay"),
        "--------------------",
        "Name: " + name,
        "Phone: " + phone,
        "Address: " + address,
        note ? "Note: " + note : null
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
        '<div class="pay-info"><h3>' + esc(T("pay_details")) + '</h3>' +
          "<p>" + esc(T("amount")) + " <strong>" + money(total) + "</strong></p>" +
          (SHOP.payment.bankInfo ? "<p>" + esc(SHOP.payment.bankInfo) + "</p>" : "") +
          (SHOP.payment.promptpay ? "<p>" + esc(SHOP.payment.promptpay) + "</p>" : "") +
          (SHOP.payment.qrImage ? '<img class="qr" src="' + esc(SHOP.payment.qrImage) + '" alt="PromptPay QR">' : "") +
          "<p>" + esc(T("slip")) + "</p>" +
        "</div>";

      result.innerHTML =
        "<h2>" + esc(T("summary")) + "</h2>" +
        "<p>" + esc(T("order_no", orderNo)) + "</p>" +
        '<pre class="order-text" id="order-text">' + esc(text) + "</pre>" +
        '<div class="result-actions">' +
          '<a class="btn btn-primary" id="line-btn" href="' + esc(lineUrl) + '" target="_blank" rel="noopener">' + esc(T("send_line")) + '</a>' +
          '<button class="btn" id="copy-btn" type="button">' + esc(T("copy")) + '</button>' +
        "</div>" +
        payInfo +
        '<p><a href="index.html">' + esc(T("back_shop")) + '</a></p>';

      document.getElementById("copy-btn").addEventListener("click", function () {
        copyText(text).then(function () { toast(T("copied")); }, function () { toast(T("copy_fail")); });
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
