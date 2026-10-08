/* ============================================================
   MedSupply — Products catalog page (fixed version)
   Filters read directly from the DOM so they can never
   get out of sync when a checkbox is unchecked.
   ============================================================ */

(function () {
  "use strict";

  const PER_PAGE = 9;

  /* ---------- DOM refs ---------- */
  const grid         = document.getElementById("productGrid");
  const noResults    = document.getElementById("noResults");
  const resultsCount = document.getElementById("resultsCount");
  const pagination   = document.getElementById("pagination");
  const searchInput  = document.getElementById("shopSearch");
  const sortSelect   = document.getElementById("sortSelect");
  const filterCats   = document.getElementById("filterCategories");
  const filterBrands = document.getElementById("filterBrands");
  const priceMin     = document.getElementById("priceMin");
  const priceMax     = document.getElementById("priceMax");
  const clearBtn     = document.getElementById("clearFilters");
  const filterToggle = document.getElementById("filterToggle");
  const filtersEl    = document.getElementById("filters");

  if (!grid || typeof PRODUCTS === "undefined") return;

  /* ---------- Page state (only things NOT in the DOM) ---------- */
  const initial = { catFromUrl: null, qFromUrl: "" };
  let sort = "featured";
  let page = 1;

  /* ---------- Read URL params ---------- */
  function readUrlParams() {
    const params = new URLSearchParams(window.location.search);
    initial.catFromUrl = params.get("cat");
    initial.qFromUrl = params.get("q") || "";
    if (initial.qFromUrl && searchInput) searchInput.value = initial.qFromUrl;
  }

  /* ---------- Build filter UI (once) ---------- */
  function buildFilters() {
    if (filterCats) {
      filterCats.innerHTML = CATEGORIES.map(cat => `
        <label class="filter-option">
          <input type="checkbox" value="${cat}" data-filter="category"
                 ${initial.catFromUrl === cat ? "checked" : ""} />
          <span>${cat}</span>
        </label>
      `).join("");
    }
    if (filterBrands) {
      filterBrands.innerHTML = BRANDS.map(brand => `
        <label class="filter-option">
          <input type="checkbox" value="${brand}" data-filter="brand" />
          <span>${brand}</span>
        </label>
      `).join("");
    }
  }

  /* ---------- Read selected values straight from the DOM ---------- */
  function selectedValues(kind) {
    return Array.from(
      document.querySelectorAll(`input[data-filter="${kind}"]:checked`)
    ).map(cb => cb.value);
  }

  /* ---------- Apply filters + sort ---------- */
  function getFiltered() {
    let list = PRODUCTS.slice();

    const cats   = selectedValues("category");
    const brands = selectedValues("brand");
    const min    = parseFloat(priceMin?.value);
    const max    = parseFloat(priceMax?.value);
    const q      = (searchInput?.value || "").trim().toLowerCase();

    if (cats.length)   list = list.filter(p => cats.includes(p.category));
    if (brands.length) list = list.filter(p => brands.includes(p.brand));
    if (!isNaN(min))   list = list.filter(p => p.price >= min);
    if (!isNaN(max))   list = list.filter(p => p.price <= max);

    if (q) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating":     list.sort((a, b) => b.rating - a.rating); break;
      case "name":       list.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    return list;
  }

  /* ---------- Card HTML ---------- */
  function cardHTML(p) {
    const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    return `
      <article class="product-card">
        <div class="product-thumb">
          <a href="product.html?id=${p.id}">
            <img src="${p.image}" alt="${p.name}" loading="lazy" />
          </a>
          ${discount ? `<span class="product-badge product-badge--sale">-${discount}%</span>` : ``}
        </div>
        <div class="product-body">
          <span class="product-cat">${p.category}</span>
          <h3 class="product-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <div class="product-rating">
            <span class="stars">★★★★★</span>
            <span>${p.rating.toFixed(1)} (${p.reviews})</span>
          </div>
          <div class="product-price">
            <span class="now">$${p.price.toFixed(2)}</span>
            ${p.oldPrice ? `<span class="old">$${p.oldPrice.toFixed(2)}</span>` : ``}
          </div>
          <div class="product-actions">
            <button class="btn btn--primary btn--block" data-add-to-cart="${p.id}">Add to cart</button>
          </div>
        </div>
      </article>
    `;
  }

  /* ---------- Render ---------- */
  function render() {
    const filtered = getFiltered();
    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total / PER_PAGE));
    if (page > pages) page = pages;

    const start = (page - 1) * PER_PAGE;
    const items = filtered.slice(start, start + PER_PAGE);

    if (total === 0) {
      grid.innerHTML = "";
      noResults.classList.remove("hidden");
    } else {
      noResults.classList.add("hidden");
      grid.innerHTML = items.map(cardHTML).join("");
    }

    if (resultsCount) {
      resultsCount.textContent = total === 0
        ? "No products"
        : `Showing ${start + 1}–${Math.min(start + PER_PAGE, total)} of ${total} products`;
    }

    if (pagination) {
      if (pages <= 1) {
        pagination.innerHTML = "";
      } else {
        let html = "";
        for (let i = 1; i <= pages; i++) {
          html += `<button data-page="${i}" class="${i === page ? "active" : ""}">${i}</button>`;
        }
        pagination.innerHTML = html;
      }
    }
  }

  /* ---------- Debounce helper ---------- */
  function debounce(fn, wait) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  /* ---------- Events ---------- */
  function attachEvents() {
    // Category + Brand checkboxes — listen on the filter sidebar.
    // We do NOT track a separate Set; we re-read the checkboxes every render.
    filtersEl?.addEventListener("change", (e) => {
      if (e.target && e.target.matches('input[data-filter]')) {
        page = 1;
        render();
      }
    });

    // Search
    searchInput?.addEventListener("input", debounce(() => {
      page = 1;
      render();
    }, 200));

    // Price range
    const onPrice = debounce(() => { page = 1; render(); }, 250);
    priceMin?.addEventListener("input", onPrice);
    priceMax?.addEventListener("input", onPrice);

    // Sort
    sortSelect?.addEventListener("change", () => {
      sort = sortSelect.value;
      page = 1;
      render();
    });

    // Clear all filters
    clearBtn?.addEventListener("click", () => {
      document.querySelectorAll('input[data-filter]:checked')
        .forEach(cb => { cb.checked = false; });
      if (searchInput) searchInput.value = "";
      if (priceMin) priceMin.value = "";
      if (priceMax) priceMax.value = "";
      if (sortSelect) sortSelect.value = "featured";
      sort = "featured";
      page = 1;
      render();
    });

    // Pagination
    pagination?.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-page]");
      if (!btn) return;
      page = parseInt(btn.dataset.page, 10);
      render();
      window.scrollTo({ top: 300, behavior: "smooth" });
    });

    // Mobile filters toggle
    filterToggle?.addEventListener("click", () => {
      filtersEl?.classList.toggle("is-open");
    });
  }

  /* ---------- Boot ---------- */
  readUrlParams();
  buildFilters();
  attachEvents();
  render();
})();