/* ============================================================
   MedSupply — Cart page
   - Renders cart items from localStorage
   - Qty update, remove, promo code, totals
   - Checkout modal with validation
   ============================================================ */

(function () {
  "use strict";

  const cartRoot   = document.getElementById("cartRoot");
  const cartEmpty  = document.getElementById("cartEmpty");
  const modal      = document.getElementById("checkoutModal");
  const coForm     = document.getElementById("checkoutForm");
  const coClose    = document.getElementById("coClose");
  const coTotal    = document.getElementById("coTotal");

  if (!cartRoot || typeof PRODUCTS === "undefined") return;

  /* ---------- Constants ---------- */
  const FREE_SHIP_THRESHOLD = 150;
  const SHIPPING_FEE        = 14.99;
  const TAX_RATE            = 0.08; // 8% demo
  const VALID_PROMOS        = { MEDSAVE10: 0.10, CLINIC15: 0.15 };

  let discountRate = 0;

  /* ---------- Helpers ---------- */
  function findProduct(id) {
    return PRODUCTS.find(p => p.id === id);
  }

  function formatMoney(n) {
    return `$${n.toFixed(2)}`;
  }

  /* ---------- Compute totals ---------- */
  function computeTotals(cart) {
    let subtotal = 0;
    let itemCount = 0;
    cart.forEach(item => {
      const p = findProduct(item.id);
      if (!p) return;
      subtotal += p.price * item.qty;
      itemCount += item.qty;
    });

    const discount = subtotal * discountRate;
    const afterDiscount = subtotal - discount;
    const shipping = afterDiscount === 0 ? 0 : (afterDiscount >= FREE_SHIP_THRESHOLD ? 0 : SHIPPING_FEE);
    const tax = afterDiscount * TAX_RATE;
    const total = afterDiscount + shipping + tax;

    return { subtotal, discount, shipping, tax, total, itemCount };
  }

  /* ---------- Render ---------- */
  function render() {
    const cart = getCart();

    // Empty state
    if (cart.length === 0) {
      cartRoot.classList.add("hidden");
      cartEmpty.classList.remove("hidden");
      updateCartBadge();
      return;
    }

    cartEmpty.classList.add("hidden");
    cartRoot.classList.remove("hidden");

    // Build cart items column
    const itemsHTML = cart.map(item => {
      const p = findProduct(item.id);
      if (!p) return "";
      return `
        <div class="cart-row" data-id="${p.id}">
          <a href="product.html?id=${p.id}" class="cart-thumb">
            <img src="${p.image}" alt="${p.name}" loading="lazy" />
          </a>
          <div class="cart-info">
            <h3 class="cart-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
            <div class="cart-meta">${p.category} · SKU ${p.sku}</div>
          </div>
          <div class="cart-qty" aria-label="Quantity for ${p.name}">
            <button type="button" data-action="dec" aria-label="Decrease quantity">−</button>
            <input type="number" value="${item.qty}" min="1" max="99" data-action="qty" aria-label="Quantity" />
            <button type="button" data-action="inc" aria-label="Increase quantity">+</button>
          </div>
          <div class="cart-unit">${formatMoney(p.price)} each</div>
          <div class="cart-total">${formatMoney(p.price * item.qty)}</div>
          <button type="button" class="cart-remove" data-action="remove" aria-label="Remove ${p.name}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      `;
    }).join("");

    const totals = computeTotals(cart);

    const summaryHTML = `
      <aside class="summary" aria-label="Order summary">
        <h3>Order summary</h3>

        <div class="summary-row">
          <span>Subtotal (${totals.itemCount} item${totals.itemCount === 1 ? "" : "s"})</span>
          <span>${formatMoney(totals.subtotal)}</span>
        </div>

        ${totals.discount > 0 ? `
          <div class="summary-row" style="color: var(--color-success);">
            <span>Discount</span>
            <span>−${formatMoney(totals.discount)}</span>
          </div>
        ` : ``}

        <div class="summary-row">
          <span>Shipping</span>
          <span>${totals.shipping === 0 ? "Free" : formatMoney(totals.shipping)}</span>
        </div>

        <div class="summary-row">
          <span>Tax (8%)</span>
          <span>${formatMoney(totals.tax)}</span>
        </div>

        <div class="summary-row total">
          <span>Total</span>
          <span>${formatMoney(totals.total)}</span>
        </div>

        <div class="promo-row">
          <input type="text" id="promoInput" placeholder="Promo code" aria-label="Promo code" />
          <button type="button" class="btn btn--ghost" id="promoApply">Apply</button>
        </div>
        <p style="font-size: var(--fs-xs); color: var(--color-muted); margin: 0;">
          Try <strong>MEDSAVE10</strong> or <strong>CLINIC15</strong>
        </p>

        <hr />

        <button type="button" class="btn btn--primary btn--block btn--lg" id="checkoutBtn">
          Proceed to checkout
        </button>
        <a href="products.html" class="btn btn--ghost btn--block mt-4" style="margin-top: var(--sp-3);">
          Continue shopping
        </a>

        ${totals.subtotal < FREE_SHIP_THRESHOLD && totals.subtotal > 0 ? `
          <p style="font-size: var(--fs-xs); color: var(--color-muted); text-align:center; margin-top: var(--sp-3);">
            Add ${formatMoney(FREE_SHIP_THRESHOLD - totals.subtotal)} more for free shipping 🚚
          </p>
        ` : ``}
      </aside>
    `;

    cartRoot.innerHTML = `
      <div>
        <div class="cart-list">${itemsHTML}</div>
      </div>
      ${summaryHTML}
    `;

    updateCartBadge();
  }

  /* ---------- Events: qty / remove ---------- */
  cartRoot.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const row = btn.closest(".cart-row");
    if (!row) return;
    const id = row.dataset.id;
    const action = btn.dataset.action;

    if (action === "inc") {
      const input = row.querySelector('input[data-action="qty"]');
      setQty(id, Math.min(99, parseInt(input.value || "1", 10) + 1));
      render();
    } else if (action === "dec") {
      const input = row.querySelector('input[data-action="qty"]');
      const next = Math.max(1, parseInt(input.value || "1", 10) - 1);
      setQty(id, next);
      render();
    } else if (action === "remove") {
      removeFromCart(id);
      showToast("Item removed from cart.", "info");
      render();
    }
  });

  /* ---------- Events: qty input change ---------- */
  cartRoot.addEventListener("change", (e) => {
    const input = e.target.closest('input[data-action="qty"]');
    if (!input) return;
    const row = input.closest(".cart-row");
    const id = row.dataset.id;
    const val = Math.max(1, Math.min(99, parseInt(input.value || "1", 10)));
    setQty(id, val);
    render();
  });

  /* ---------- Events: promo ---------- */
  cartRoot.addEventListener("click", (e) => {
    if (!e.target.closest("#promoApply")) return;
    const input = document.getElementById("promoInput");
    const code = (input.value || "").trim().toUpperCase();
    if (!code) return;

    if (VALID_PROMOS[code]) {
      discountRate = VALID_PROMOS[code];
      showToast(`Promo "${code}" applied — ${Math.round(discountRate * 100)}% off.`, "success");
    } else {
      discountRate = 0;
      showToast("Invalid promo code.", "error");
    }
    render();
  });

  /* ---------- Events: checkout ---------- */
  cartRoot.addEventListener("click", (e) => {
    if (!e.target.closest("#checkoutBtn")) return;
    const totals = computeTotals(getCart());
    if (coTotal) coTotal.textContent = formatMoney(totals.total);
    openModal();
  });

  /* ---------- Modal ---------- */
  function openModal() {
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    setTimeout(() => document.getElementById("coName").focus(), 50);
  }
  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  coClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  /* ---------- Checkout form validation ---------- */
  coForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const fields = [
      { id: "coName",     test: v => v.trim().length >= 2 },
      { id: "coEmail",    test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
      { id: "coAddress",  test: v => v.trim().length >= 5 },
      { id: "coCity",     test: v => v.trim().length >= 2 },
      { id: "coZip",      test: v => v.trim().length >= 3 },
      { id: "coPayment",  test: v => v !== "" }
    ];

    let ok = true;
    fields.forEach(f => {
      const el = document.getElementById(f.id);
      const row = el.closest(".form-row");
      const valid = f.test(el.value);
      row.classList.toggle("invalid", !valid);
      if (!valid) ok = false;
    });

    if (!ok) return;

    // Demo success
    showToast("Order placed! We'll email your confirmation shortly.", "success");
    // Clear cart
    saveCart([]);
    discountRate = 0;
    coForm.reset();
    closeModal();
    render();
  });

  /* ---------- React to external cart changes ---------- */
  window.addEventListener("cart:updated", () => {
    // Re-render whenever the cart changes elsewhere
    render();
  });

  /* ---------- Boot ---------- */
  render();
})();