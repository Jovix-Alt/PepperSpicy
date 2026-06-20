// ============================================================
// Pepper Spicy Restaurant — App Logic
// Renders dynamic content from menu.js
// ============================================================

const $ = (sel, root = document) => root.querySelector(sel);
const phoneHref = (p) => `tel:${p.replace(/\s/g, "")}`;

// ---------- Fill restaurant info ----------
function fillInfo() {
  document.title = `${restaurant.name} — Authentic Kerala Flavors · Al Ain`;
  $("#year").textContent = new Date().getFullYear();
  $("#address").textContent = restaurant.address;
  $("#address-footer").textContent = restaurant.address;
  $("#phones").textContent = restaurant.phones.join(" · ");
  $("#hours").textContent = restaurant.hours;
  $("#delivery").textContent = restaurant.delivery;
  $("#tagline").textContent = restaurant.tagline + ". Slow-cooked biriyani, fresh dosa, fiery grills — served the Malabar way.";
  $("#name-arabic").innerHTML = `${restaurant.nameArabic}<br><span class="hero-location">Sanaiya, Al Ain</span>`;
  $("#name-arabic-2").textContent = restaurant.sloganArabic;
  $("#currency-note").textContent = `All prices in ${restaurant.currency}. ASP = as per market price. Menu evolves with the seasons.`;

  document.querySelectorAll("[data-phone]").forEach(el => {
    el.href = phoneHref(restaurant.phones[0]);
  });
  $("#phone-main").textContent = restaurant.phones[0];
}

// ---------- Menu state ----------
let activeCategoryId = categories[0].id;
let searchQuery = "";

function getFiltered() {
  const q = searchQuery.trim().toLowerCase();
  if (!q) return categories;
  return categories
    .map(c => ({ ...c, items: c.items.filter(i => i.name.toLowerCase().includes(q)) }))
    .filter(c => c.items.length);
}

function renderMenu() {
  const filtered = getFiltered();
  const listEl = $("#cat-list");
  const panelEl = $("#menu-panel");
  const emptyEl = $("#menu-empty");

  if (filtered.length === 0) {
    listEl.innerHTML = "";
    panelEl.innerHTML = "";
    emptyEl.style.display = "block";
    emptyEl.textContent = `No dishes match "${searchQuery}".`;
    return;
  }
  emptyEl.style.display = "none";

  const current = filtered.find(c => c.id === activeCategoryId) || filtered[0];
  activeCategoryId = current.id;

  listEl.innerHTML = filtered.map(c => `
    <button class="cat-btn ${c.id === current.id ? "active" : ""}" data-id="${c.id}">${c.title}</button>
  `).join("");

  listEl.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategoryId = btn.dataset.id;
      renderMenu();
    });
  });

  panelEl.innerHTML = `
    <div class="menu-panel-head">
      <h3>${current.title}</h3>
      ${current.tagline ? `<p class="font-serif">${current.tagline}</p>` : ""}
    </div>
    <ul class="menu-items">
      ${current.items.map(it => `
        <li>
          <span>${it.name}</span>
          <span class="dots"></span>
          <span class="price">${it.price}</span>
        </li>
      `).join("")}
    </ul>
  `;
}

// ---------- Scroll-reveal animation ----------
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  fillInfo();
  renderMenu();
  initReveal();

  $("#search").addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderMenu();
  });

  // Random Dish Generator
const randomBtn = document.getElementById("random-dish-btn");

if (randomBtn) {
  randomBtn.addEventListener("click", () => {

    const allDishes = [];

    categories.forEach(category => {
      category.items.forEach(item => {
        allDishes.push(item);
      });
    });

    const first =
      allDishes[Math.floor(Math.random() * allDishes.length)];

    let second =
      allDishes[Math.floor(Math.random() * allDishes.length)];

    while (second.name === first.name) {
      second =
        allDishes[Math.floor(Math.random() * allDishes.length)];
    }

    document.getElementById("dish1").textContent =
      `${first.name} - AED ${first.price}`;

    document.getElementById("dish2").textContent =
      `${second.name} - AED ${second.price}`;

    document
      .getElementById("dish-modal")
      .classList.add("show");
  });
}

document
  .getElementById("close-modal")
  .addEventListener("click", () => {
    document
      .getElementById("dish-modal")
      .classList.remove("show");
  });
const galleryImages = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("show");
  });
});

closeLightbox.addEventListener("click", () => {
  lightbox.classList.remove("show");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("show");
  }
});
});
