/* ============================================================
   MedSupply — Product detail page
   Loads product by ?id=, renders gallery, tabs, quote modal.
   ============================================================ */

(function () {
  "use strict";

  const loading   = document.getElementById("pdLoading");
  const notFound  = document.getElementById("pdNotFound");
  const root      = document.getElementById("pdRoot");

  if (!root || typeof PRODUCTS === "undefined") return;

  /* ---------- Get product from URL ---------- */
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    loading.classList.add("hidden");
    notFound.classList.remove("hidden");
    return;
  }

  /* ---------- Page title + breadcrumb ---------- */
  document.title = `${product.name} — MedSupply`;
  const crumb = document.getElementById("crumbProduct");
  if (crumb) crumb.textContent = product.name;

  /* ---------- Fill fields ---------- */
  const $ = (sel) => root.querySelector(sel) || document.querySelector(sel);

  document.getElementById("pdCategory").textContent = product.category;
  document.getElementById("pdTitle").textContent = product.name;
  document.getElementById("pdBrand").textContent = product.brand;
  document.getElementById("pdSku").textContent = product.sku;
  document.getElementById("pdRating").textContent = product.rating.toFixed(1);
  document.getElementById("pdReviews").textContent = product.reviews;
  document.getElementById("pdDesc").textContent = product.description;

  // Price + optional old price
  document.getElementById("pdPrice").textContent = `$${product.price.toFixed(2)}`;
  const oldEl = document.getElementById("pdOldPrice");
  const saveEl = document.getElementById("pdSave");
  if (product.oldPrice) {
    oldEl.textContent = `$${product.oldPrice.toFixed(2)}`;
    oldEl.classList.remove("hidden");
    const pct = Math.round((1 - product.price / product.oldPrice) * 100);
    saveEl.textContent = `Save ${pct}%`;
    saveEl.classList.remove("hidden");
  }

  // Stock
  const stockEl = document.getElementById("pdStock");
  const stockText = document.getElementById("pdStockText");
  if (product.stock > 0) {
    stockEl.classList.remove("out");
    stockEl.classList.add("in");
    stockText.textContent = `In stock — ${product.stock} available`;
  } else {
    stockEl.classList.remove("in");
    stockEl.classList.add("out");
    stockText.textContent = "Out of stock";
  }

  /* ---------- Gallery ---------- */
  const mainImg = document.getElementById("pdMainImg");
  const thumbs = document.getElementById("pdThumbs");
  const images = product.gallery && product.gallery.length ? product.gallery : [product.image];

  mainImg.src = images[0];
  mainImg.alt = product.name;

  thumbs.innerHTML = images.map((src, i) => `
    <button type="button" class="pd-thumb ${i === 0 ? "active" : ""}" data-img="${src}" role="listitem" aria-label="View image ${i + 1}">
      <img src="${src}" alt="${product.name} — image ${i + 1}" loading="lazy" />
    </button>
  `).join("");

  thumbs.addEventListener("click", (e) => {
    const btn = e.target.closest(".pd-thumb");
    if (!btn) return;
    mainImg.src = btn.dataset.img;
    thumbs.querySelectorAll(".pd-thumb").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
  });

  /* ---------- Quantity controls ---------- */
  const qty = document.getElementById("qtyValue");
  document.getElementById("qtyMinus").addEventListener("click", () => {
    qty.value = Math.max(1, parseInt(qty.value || "1", 10) - 1);
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    qty.value = Math.min(99, parseInt(qty.value || "1", 10) + 1);
  });

  /* ---------- Add to cart ---------- */
  document.getElementById("pdAddToCart").addEventListener("click", () => {
    const q = Math.max(1, parseInt(qty.value || "1", 10));
    addToCart(product.id, q);
  });

  /* ---------- Tabs ---------- */
  const tabs = root.querySelectorAll(".pd-tab");
  const panels = root.querySelectorAll(".pd-panel");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
      panels.forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      root.querySelector(`.pd-panel[data-panel="${tab.dataset.tab}"]`).classList.add("active");
    });
  });

  /* ---------- Specs table ---------- */
  const specs = document.getElementById("tabSpecs");
  if (specs && product.specs) {
    specs.innerHTML = Object.entries(product.specs).map(([k, v]) => `
      <tr><th scope="row">${k}</th><td>${v}</td></tr>
    `).join("");
  }

  /* ---------- Reviews (demo) ---------- */
  const reviewsEl = document.getElementById("tabReviews");
  if (reviewsEl) {
    const demoReviews = [
      { name: "Dr. N. Alvarez", date: "2 weeks ago", rating: 5, text: "Excellent quality, exactly as described. Arrived quickly and works perfectly in our clinic." },
      { name: "Clinic Manager, H.J.", date: "1 month ago", rating: 4, text: "Good product overall. Packaging could be sturdier for bulk orders, but no complaints about the item itself." },
      { name: "Sara K.", date: "2 months ago", rating: 5, text: "Ordered 20 units for our practice. Consistent quality and the support team was very helpful." }
    ];
    reviewsEl.innerHTML = demoReviews.map(r => `
      <div class="pd-review">
        <div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
        <div class="who">${r.name}</div>
        <div class="date">${r.date}</div>
        <p style="margin-top: 8px; color: var(--color-text);">${r.text}</p>
      </div>
    `).join("");
  }

  /* ---------- Quote modal ---------- */
  const modal      = document.getElementById("quoteModal");
  const openBtn    = document.getElementById("pdQuoteBtn");
  const closeBtn   = document.getElementById("quoteClose");
  const quoteForm  = document.getElementById("quoteForm");
  const quoteProd  = document.getElementById("qfProduct");

  function openModal() {
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (quoteProd) quoteProd.value = `${product.name} (${product.sku})`;
    setTimeout(() => document.getElementById("qfName").focus(), 50);
  }
  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  openBtn?.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  /* ---------- Quote form validation ---------- */
  function markInvalid(row, invalid) {
    row.classList.toggle("invalid", invalid);
  }

  quoteForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;

    const nameRow  = document.getElementById("qfName").closest(".form-row");
    const emailRow = document.getElementById("qfEmail").closest(".form-row");
    const qtyRow   = document.getElementById("qfQty").closest(".form-row");

    const name  = document.getElementById("qfName").value.trim();
    const email = document.getElementById("qfEmail").value.trim();
    const qty   = parseInt(document.getElementById("qfQty").value, 10);

    const nameOk  = name.length >= 2;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const qtyOk   = !isNaN(qty) && qty > 0;

    markInvalid(nameRow, !nameOk);
    markInvalid(emailRow, !emailOk);
    markInvalid(qtyRow, !qtyOk);

    if (!nameOk || !emailOk || !qtyOk) ok = false;

    if (!ok) return;

    // Demo success
    showToast("Quote request sent — we'll reply within 24h.", "success");
    quoteForm.reset();
    closeModal();
  });

  /* ---------- Show ---------- */
  loading.classList.add("hidden");
  root.classList.remove("hidden");
})();