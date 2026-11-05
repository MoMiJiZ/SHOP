/* Language switcher: English is the default. Product names and details stay as written in products.js. */
const LANGS = [
  { code: "en", label: "English" },
  { code: "th", label: "ไทย" },
  { code: "zh", label: "中文" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "ru", label: "Русский" },
  { code: "ar", label: "العربية" }
];

const I18N = {
  en: {
    nav_catalog: "CATALOGE", nav_about: "ABOUT", announce: "Free shipping on orders over {n} baht",
    catalog_title: "CATALOGE", all: "ALL", "cat:GIVE A WAY": "GIVE A WAY", "cat:SET MENU": "SET MENU",
    search: "SEARCH", sort_by: "SORT BY", sort_low: "price [low-high]", sort_newest: "Newest", sort_top: "Top Sellers", sort_high: "Price [high-low]",
    items: "{n} ITEMS", card_add: "ADD TO CART", select_options: "SELECT OPTIONS", sold_out: "SOLD OUT",
    "badge:NEW": "NEW", "badge:BEST SELLER": "BEST SELLER", added: "Added to cart", no_items: "No items found",
    not_found: "Item not found.", back_catalog: "Back to CATALOGE", back_link: "← CATALOGE",
    options: "Options", quantity: "Quantity", add_to_cart: "Add to Cart", buy_now: "Buy Now", details: "Product Details",
    f_about: "About Us", f_menu: "Menu", f_catalog: "Catalog", f_contact: "Contact Us", f_follow: "Follow Us", tel: "Tel",
    cart_title: "Cart", order_summary: "Order summary", go_checkout: "Checkout", checkout_title: "Checkout", continue: "Continue shopping",
    subtotal: "Subtotal", shipping: "Shipping", free: "Free", cod_fee: "COD fee", total: "Total",
    cart_empty: "Your cart is empty.", option: "Option", ship_more: "Add {n} more for free shipping",
    ship_details: "Shipping details", full_name: "Full name", phone: "Phone", address: "Shipping address",
    address_ph: "House no., street, subdistrict, district, province, postal code", note: "Note (optional)",
    pay_method: "Payment method", place_order: "Place order", your_order: "Your order",
    pay_transfer: "Bank transfer / PromptPay", pay_cod: "Cash on delivery",
    err_name: "Please enter your name", err_phone: "Please enter a 9–10 digit phone number", err_addr: "Please enter your full shipping address",
    pay_details: "Payment details", amount: "Amount to transfer", slip: "After transferring, send the payment slip with your order via LINE.",
    summary: "Order summary", order_no: "Order no. {n} — your order is complete once you send this to the shop.",
    send_line: "Send order via LINE", copy: "Copy order", back_shop: "Back to shop",
    copied: "Copied", copy_fail: "Copy failed. Press and hold the text to copy it.", language: "Language"
  },
  th: {
    nav_catalog: "แคตตาล็อก", nav_about: "เกี่ยวกับเรา", announce: "ส่งฟรีเมื่อสั่งซื้อครบ {n} บาท",
    catalog_title: "แคตตาล็อก", all: "ทั้งหมด", "cat:GIVE A WAY": "ของแจก", "cat:SET MENU": "เซ็ตเมนู",
    search: "ค้นหา", sort_by: "เรียงตาม", sort_low: "ราคา [ต่ำ-สูง]", sort_newest: "ใหม่ล่าสุด", sort_top: "ขายดี", sort_high: "ราคา [สูง-ต่ำ]",
    items: "{n} รายการ", card_add: "ใส่ตะกร้า", select_options: "เลือกตัวเลือก", sold_out: "สินค้าหมด",
    "badge:NEW": "ใหม่", "badge:BEST SELLER": "ขายดี", added: "ใส่ตะกร้าแล้ว", no_items: "ไม่พบสินค้า",
    not_found: "ไม่พบสินค้านี้", back_catalog: "กลับไปแคตตาล็อก", back_link: "← แคตตาล็อก",
    options: "ตัวเลือก", quantity: "จำนวน", add_to_cart: "ใส่ตะกร้า", buy_now: "ซื้อเลย", details: "รายละเอียดสินค้า",
    f_about: "เกี่ยวกับเรา", f_menu: "เมนู", f_catalog: "แคตตาล็อก", f_contact: "ติดต่อเรา", f_follow: "ติดตามเรา", tel: "โทร",
    cart_title: "ตะกร้าสินค้า", order_summary: "สรุปยอด", go_checkout: "ไปหน้าสั่งซื้อ", checkout_title: "สั่งซื้อสินค้า", continue: "เลือกซื้อสินค้าต่อ",
    subtotal: "ราคาสินค้า", shipping: "ค่าส่ง", free: "ส่งฟรี", cod_fee: "ค่าเก็บเงินปลายทาง", total: "ยอดรวม",
    cart_empty: "ยังไม่มีสินค้าในตะกร้า", option: "ตัวเลือก", ship_more: "ซื้อเพิ่มอีก {n} ส่งฟรี",
    ship_details: "ข้อมูลผู้รับ", full_name: "ชื่อ-นามสกุล", phone: "เบอร์โทร", address: "ที่อยู่จัดส่ง",
    address_ph: "บ้านเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์", note: "หมายเหตุ (ถ้ามี)",
    pay_method: "วิธีชำระเงิน", place_order: "ยืนยันคำสั่งซื้อ", your_order: "รายการสินค้า",
    pay_transfer: "โอนเงิน / พร้อมเพย์", pay_cod: "เก็บเงินปลายทาง",
    err_name: "กรุณากรอกชื่อ", err_phone: "กรุณากรอกเบอร์โทร 9–10 หลัก", err_addr: "กรุณากรอกที่อยู่จัดส่งให้ครบ",
    pay_details: "ช่องทางชำระเงิน", amount: "ยอดที่ต้องโอน", slip: "โอนแล้วส่งสลิปพร้อมรายการสั่งซื้อมาทาง LINE",
    summary: "สรุปรายการสั่งซื้อ", order_no: "เลขที่ {n} — คำสั่งซื้อจะสมบูรณ์เมื่อส่งรายการนี้ให้ร้าน",
    send_line: "ส่งรายการทาง LINE", copy: "คัดลอกรายการ", back_shop: "กลับไปหน้าร้าน",
    copied: "คัดลอกแล้ว", copy_fail: "คัดลอกไม่สำเร็จ ให้กดค้างที่ข้อความเพื่อคัดลอก", language: "ภาษา"
  },
  zh: {
    nav_catalog: "商品目录", nav_about: "关于我们", announce: "订单满 {n} 泰铢免运费",
    catalog_title: "商品目录", all: "全部", "cat:GIVE A WAY": "赠品", "cat:SET MENU": "套餐",
    search: "搜索", sort_by: "排序方式", sort_low: "价格 [低-高]", sort_newest: "最新", sort_top: "畅销", sort_high: "价格 [高-低]",
    items: "{n} 件商品", card_add: "加入购物车", select_options: "选择款式", sold_out: "已售罄",
    "badge:NEW": "新品", "badge:BEST SELLER": "热销", added: "已加入购物车", no_items: "未找到商品",
    not_found: "未找到该商品。", back_catalog: "返回商品目录", back_link: "← 商品目录",
    options: "款式", quantity: "数量", add_to_cart: "加入购物车", buy_now: "立即购买", details: "商品详情",
    f_about: "关于我们", f_menu: "菜单", f_catalog: "商品目录", f_contact: "联系我们", f_follow: "关注我们", tel: "电话",
    cart_title: "购物车", order_summary: "订单摘要", go_checkout: "去结算", checkout_title: "结算", continue: "继续购物",
    subtotal: "小计", shipping: "运费", free: "免运费", cod_fee: "货到付款手续费", total: "合计",
    cart_empty: "购物车是空的。", option: "款式", ship_more: "再买 {n} 即可免运费",
    ship_details: "收货信息", full_name: "姓名", phone: "电话", address: "收货地址",
    address_ph: "门牌号、街道、分区、区/县、府、邮政编码", note: "备注（选填）",
    pay_method: "付款方式", place_order: "提交订单", your_order: "您的订单",
    pay_transfer: "银行转账 / PromptPay", pay_cod: "货到付款",
    err_name: "请输入姓名", err_phone: "请输入 9–10 位电话号码", err_addr: "请填写完整的收货地址",
    pay_details: "付款信息", amount: "应转账金额", slip: "转账后，请通过 LINE 发送付款凭证和订单。",
    summary: "订单摘要", order_no: "订单号 {n} — 将此订单发送给店铺后即完成下单。",
    send_line: "通过 LINE 发送订单", copy: "复制订单", back_shop: "返回商店",
    copied: "已复制", copy_fail: "复制失败，请长按文字进行复制。", language: "语言"
  },
  es: {
    nav_catalog: "CATÁLOGO", nav_about: "ACERCA DE", announce: "Envío gratis en pedidos superiores a {n} baht",
    catalog_title: "CATÁLOGO", all: "TODO", "cat:GIVE A WAY": "REGALOS", "cat:SET MENU": "MENÚ SET",
    search: "BUSCAR", sort_by: "ORDENAR POR", sort_low: "precio [menor-mayor]", sort_newest: "Más recientes", sort_top: "Más vendidos", sort_high: "Precio [mayor-menor]",
    items: "{n} ARTÍCULOS", card_add: "AÑADIR AL CARRITO", select_options: "ELEGIR OPCIONES", sold_out: "AGOTADO",
    "badge:NEW": "NUEVO", "badge:BEST SELLER": "MÁS VENDIDO", added: "Añadido al carrito", no_items: "No se encontraron artículos",
    not_found: "Artículo no encontrado.", back_catalog: "Volver al catálogo", back_link: "← CATÁLOGO",
    options: "Opciones", quantity: "Cantidad", add_to_cart: "Añadir al carrito", buy_now: "Comprar ahora", details: "Detalles del producto",
    f_about: "Sobre nosotros", f_menu: "Menú", f_catalog: "Catálogo", f_contact: "Contacto", f_follow: "Síguenos", tel: "Tel.",
    cart_title: "Carrito", order_summary: "Resumen del pedido", go_checkout: "Finalizar compra", checkout_title: "Finalizar compra", continue: "Seguir comprando",
    subtotal: "Subtotal", shipping: "Envío", free: "Gratis", cod_fee: "Cargo contra reembolso", total: "Total",
    cart_empty: "Tu carrito está vacío.", option: "Opción", ship_more: "Añade {n} más para envío gratis",
    ship_details: "Datos de envío", full_name: "Nombre completo", phone: "Teléfono", address: "Dirección de envío",
    address_ph: "Número, calle, subdistrito, distrito, provincia, código postal", note: "Nota (opcional)",
    pay_method: "Método de pago", place_order: "Realizar pedido", your_order: "Tu pedido",
    pay_transfer: "Transferencia bancaria / PromptPay", pay_cod: "Contra reembolso",
    err_name: "Introduce tu nombre", err_phone: "Introduce un teléfono de 9–10 dígitos", err_addr: "Introduce tu dirección de envío completa",
    pay_details: "Datos de pago", amount: "Importe a transferir", slip: "Después de transferir, envía el comprobante con tu pedido por LINE.",
    summary: "Resumen del pedido", order_no: "Pedido n.º {n}: tu pedido se completa al enviarlo a la tienda.",
    send_line: "Enviar pedido por LINE", copy: "Copiar pedido", back_shop: "Volver a la tienda",
    copied: "Copiado", copy_fail: "No se pudo copiar. Mantén pulsado el texto para copiarlo.", language: "Idioma"
  },
  fr: {
    nav_catalog: "CATALOGUE", nav_about: "À PROPOS", announce: "Livraison gratuite dès {n} bahts d'achat",
    catalog_title: "CATALOGUE", all: "TOUT", "cat:GIVE A WAY": "CADEAUX", "cat:SET MENU": "MENUS",
    search: "RECHERCHER", sort_by: "TRIER PAR", sort_low: "prix [croissant]", sort_newest: "Nouveautés", sort_top: "Meilleures ventes", sort_high: "Prix [décroissant]",
    items: "{n} ARTICLES", card_add: "AJOUTER AU PANIER", select_options: "CHOISIR UNE OPTION", sold_out: "ÉPUISÉ",
    "badge:NEW": "NOUVEAU", "badge:BEST SELLER": "MEILLEURE VENTE", added: "Ajouté au panier", no_items: "Aucun article trouvé",
    not_found: "Article introuvable.", back_catalog: "Retour au catalogue", back_link: "← CATALOGUE",
    options: "Options", quantity: "Quantité", add_to_cart: "Ajouter au panier", buy_now: "Acheter maintenant", details: "Détails du produit",
    f_about: "À propos", f_menu: "Menu", f_catalog: "Catalogue", f_contact: "Contact", f_follow: "Suivez-nous", tel: "Tél.",
    cart_title: "Panier", order_summary: "Récapitulatif", go_checkout: "Commander", checkout_title: "Commande", continue: "Continuer mes achats",
    subtotal: "Sous-total", shipping: "Livraison", free: "Gratuite", cod_fee: "Frais de paiement à la livraison", total: "Total",
    cart_empty: "Votre panier est vide.", option: "Option", ship_more: "Plus que {n} pour la livraison gratuite",
    ship_details: "Informations de livraison", full_name: "Nom complet", phone: "Téléphone", address: "Adresse de livraison",
    address_ph: "N°, rue, sous-district, district, province, code postal", note: "Remarque (facultatif)",
    pay_method: "Mode de paiement", place_order: "Valider la commande", your_order: "Votre commande",
    pay_transfer: "Virement bancaire / PromptPay", pay_cod: "Paiement à la livraison",
    err_name: "Veuillez saisir votre nom", err_phone: "Veuillez saisir un numéro de 9 à 10 chiffres", err_addr: "Veuillez saisir votre adresse de livraison complète",
    pay_details: "Informations de paiement", amount: "Montant à virer", slip: "Après le virement, envoyez le justificatif avec votre commande via LINE.",
    summary: "Récapitulatif de la commande", order_no: "Commande n° {n} — elle sera finalisée dès que vous l'enverrez à la boutique.",
    send_line: "Envoyer la commande via LINE", copy: "Copier la commande", back_shop: "Retour à la boutique",
    copied: "Copié", copy_fail: "Échec de la copie. Appuyez longuement sur le texte pour le copier.", language: "Langue"
  },
  ru: {
    nav_catalog: "КАТАЛОГ", nav_about: "О НАС", announce: "Бесплатная доставка при заказе от {n} бат",
    catalog_title: "КАТАЛОГ", all: "ВСЕ", "cat:GIVE A WAY": "ПОДАРКИ", "cat:SET MENU": "СЕТ-МЕНЮ",
    search: "ПОИСК", sort_by: "СОРТИРОВКА", sort_low: "цена [по возрастанию]", sort_newest: "Новинки", sort_top: "Хиты продаж", sort_high: "Цена [по убыванию]",
    items: "ТОВАРОВ: {n}", card_add: "В КОРЗИНУ", select_options: "ВЫБРАТЬ ВАРИАНТ", sold_out: "РАСПРОДАНО",
    "badge:NEW": "НОВИНКА", "badge:BEST SELLER": "ХИТ ПРОДАЖ", added: "Добавлено в корзину", no_items: "Ничего не найдено",
    not_found: "Товар не найден.", back_catalog: "Назад в каталог", back_link: "← КАТАЛОГ",
    options: "Варианты", quantity: "Количество", add_to_cart: "В корзину", buy_now: "Купить сейчас", details: "Описание товара",
    f_about: "О нас", f_menu: "Меню", f_catalog: "Каталог", f_contact: "Контакты", f_follow: "Мы в соцсетях", tel: "Тел.",
    cart_title: "Корзина", order_summary: "Итог заказа", go_checkout: "Оформить заказ", checkout_title: "Оформление заказа", continue: "Продолжить покупки",
    subtotal: "Подытог", shipping: "Доставка", free: "Бесплатно", cod_fee: "Сбор за наложенный платёж", total: "Итого",
    cart_empty: "Корзина пуста.", option: "Вариант", ship_more: "Добавьте ещё на {n} для бесплатной доставки",
    ship_details: "Данные для доставки", full_name: "Имя и фамилия", phone: "Телефон", address: "Адрес доставки",
    address_ph: "Дом, улица, подрайон, район, провинция, индекс", note: "Комментарий (необязательно)",
    pay_method: "Способ оплаты", place_order: "Оформить заказ", your_order: "Ваш заказ",
    pay_transfer: "Банковский перевод / PromptPay", pay_cod: "Наложенный платёж",
    err_name: "Введите имя", err_phone: "Введите номер телефона из 9–10 цифр", err_addr: "Укажите полный адрес доставки",
    pay_details: "Реквизиты для оплаты", amount: "Сумма к переводу", slip: "После оплаты отправьте чек вместе с заказом в LINE.",
    summary: "Сводка заказа", order_no: "Заказ № {n} — заказ будет оформлен после отправки в магазин.",
    send_line: "Отправить заказ в LINE", copy: "Скопировать заказ", back_shop: "Вернуться в магазин",
    copied: "Скопировано", copy_fail: "Не удалось скопировать. Нажмите и удерживайте текст, чтобы скопировать.", language: "Язык"
  },
  ar: {
    nav_catalog: "الكتالوج", nav_about: "من نحن", announce: "شحن مجاني للطلبات التي تزيد عن {n} بات",
    catalog_title: "الكتالوج", all: "الكل", "cat:GIVE A WAY": "هدايا", "cat:SET MENU": "قائمة الوجبات",
    search: "بحث", sort_by: "ترتيب حسب", sort_low: "السعر [من الأقل إلى الأعلى]", sort_newest: "الأحدث", sort_top: "الأكثر مبيعًا", sort_high: "السعر [من الأعلى إلى الأقل]",
    items: "{n} منتج", card_add: "أضف إلى السلة", select_options: "اختر الخيارات", sold_out: "نفدت الكمية",
    "badge:NEW": "جديد", "badge:BEST SELLER": "الأكثر مبيعًا", added: "تمت الإضافة إلى السلة", no_items: "لم يتم العثور على منتجات",
    not_found: "المنتج غير موجود.", back_catalog: "العودة إلى الكتالوج", back_link: "→ الكتالوج",
    options: "الخيارات", quantity: "الكمية", add_to_cart: "أضف إلى السلة", buy_now: "اشترِ الآن", details: "تفاصيل المنتج",
    f_about: "من نحن", f_menu: "القائمة", f_catalog: "الكتالوج", f_contact: "اتصل بنا", f_follow: "تابعنا", tel: "هاتف",
    cart_title: "السلة", order_summary: "ملخص الطلب", go_checkout: "إتمام الطلب", checkout_title: "إتمام الطلب", continue: "متابعة التسوق",
    subtotal: "المجموع الفرعي", shipping: "الشحن", free: "مجاني", cod_fee: "رسوم الدفع عند الاستلام", total: "الإجمالي",
    cart_empty: "سلتك فارغة.", option: "الخيار", ship_more: "أضف {n} للحصول على شحن مجاني",
    ship_details: "بيانات الشحن", full_name: "الاسم الكامل", phone: "رقم الهاتف", address: "عنوان الشحن",
    address_ph: "رقم المنزل، الشارع، الحي، المنطقة، المقاطعة، الرمز البريدي", note: "ملاحظة (اختياري)",
    pay_method: "طريقة الدفع", place_order: "تأكيد الطلب", your_order: "طلبك",
    pay_transfer: "تحويل بنكي / PromptPay", pay_cod: "الدفع عند الاستلام",
    err_name: "يرجى إدخال اسمك", err_phone: "يرجى إدخال رقم هاتف من 9–10 أرقام", err_addr: "يرجى إدخال عنوان الشحن كاملًا",
    pay_details: "بيانات الدفع", amount: "المبلغ المطلوب تحويله", slip: "بعد التحويل، أرسل إيصال الدفع مع طلبك عبر LINE.",
    summary: "ملخص الطلب", order_no: "رقم الطلب {n} — يكتمل طلبك عند إرساله إلى المتجر.",
    send_line: "أرسل الطلب عبر LINE", copy: "نسخ الطلب", back_shop: "العودة إلى المتجر",
    copied: "تم النسخ", copy_fail: "فشل النسخ. اضغط مطولًا على النص لنسخه.", language: "اللغة"
  }
};

const LANG = (function () {
  let l = "en";
  try { l = localStorage.getItem("lang") || "en"; } catch (e) {}
  return I18N[l] ? l : "en";
})();

function T(key, n) {
  let s = (I18N[LANG] && I18N[LANG][key]) || I18N.en[key];
  if (s === undefined) s = key.indexOf(":") > 0 ? key.split(":").slice(1).join(":") : key;
  return n === undefined ? s : s.replace("{n}", n);
}

function setLang(code) {
  try { localStorage.setItem("lang", code); } catch (e) {}
  location.reload();
}

(function () {
  document.documentElement.lang = LANG;
  document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";
  function apply() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = T(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.placeholder = T(el.dataset.i18nPh); });
    document.querySelectorAll("[data-i18n-empty]").forEach(function (el) {
      el.innerHTML = "";
      el.append(T("cart_empty") + " ");
      const a = document.createElement("a"); a.href = "index.html"; a.textContent = T("continue"); el.appendChild(a);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply); else apply();
})();
