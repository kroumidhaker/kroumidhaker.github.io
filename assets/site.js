const publications = [
  {
    number: 1,
    year: 2015,
    tags: ["game-theory"],
    title: "Conditions for cooperation to be more abundant than defection in a hierarchically structured population",
    meta: "Kroumi, D.; Lessard, S. Dynamic Games and Applications 5(2), 239–262.",
    link: "https://doi.org/10.1007/s13235-014-0128-9"
  },
  {
    number: 2,
    year: 2015,
    tags: ["game-theory"],
    title: "Strong migration limit for games in structured populations: applications to dominance hierarchy and set structure",
    meta: "Kroumi, D.; Lessard, S. Games 6(3), 318–346.",
    link: "https://doi.org/10.3390/g6030318"
  },
  {
    number: 3,
    year: 2015,
    tags: ["game-theory"],
    title: "Evolution of cooperation in a multidimensional phenotype space",
    meta: "Kroumi, D.; Lessard, S. Theoretical Population Biology 102, 60–75.",
    link: "https://doi.org/10.1016/j.tpb.2015.03.005"
  },
  {
    number: 4,
    year: 2021,
    tags: ["game-theory"],
    title: "Aspiration can promote cooperation in well-mixed populations as in regular graphs",
    meta: "Kroumi, D. Dynamic Games and Applications 11(2), 390–417.",
    link: "https://doi.org/10.1007/s13235-020-00362-7"
  },
  {
    number: 5,
    year: 2021,
    tags: ["game-theory"],
    title: "The effect of variability in payoffs on average abundance in two-player linear games under symmetric mutation",
    meta: "Kroumi, D.; Lessard, S. Journal of Theoretical Biology 513, Paper No. 110569.",
    link: "https://doi.org/10.1016/j.jtbi.2020.110569"
  },
  {
    number: 6,
    year: 2021,
    tags: ["game-theory"],
    title: "Effect of variability in payoffs on conditions for the evolution of cooperation in a small population",
    meta: "Kroumi, D.; Martin, É.; Li, C.; Lessard, S. Dynamic Games and Applications 11(4), 803–834.",
    link: "https://doi.org/10.1007/s13235-021-00386-7"
  },
  {
    number: 7,
    year: 2021,
    tags: ["game-theory"],
    title: "A game-theoretic approach to analyze interacting actors in GRL goal models",
    meta: "Hassine, J.; Kroumi, D.; Amyot, D. Requirements Engineering 26(3), 399–422.",
    link: "https://doi.org/10.1007/s00766-021-00352-y"
  },
  {
    number: 8,
    year: 2022,
    tags: ["game-theory"],
    title: "Evolution of cooperation with respect to fixation probabilities in multi-player games with random payoffs",
    meta: "Kroumi, D.; Martin, É.; Lessard, S. Theoretical Population Biology 145, 1–21.",
    link: "https://doi.org/10.1016/j.tpb.2022.02.001"
  },
  {
    number: 9,
    year: 2022,
    tags: ["game-theory"],
    title: "Average abundancy of cooperation in multi-player games with random payoffs",
    meta: "Kroumi, D.; Lessard, S. Journal of Mathematical Biology 85(3), Paper No. 27.",
    link: "https://doi.org/10.1007/s00285-022-01793-z"
  },
  {
    number: 10,
    year: 2022,
    tags: ["words"],
    title: "On primitive words with non-primitive product",
    meta: "Echi, O.; Khalfallah, A.; Kroumi, D. RAIRO – Theoretical Informatics and Applications 56, Article 4, 11 pp.",
    link: "https://doi.org/10.1051/ita/2022004"
  },
  {
    number: 11,
    year: 2023,
    tags: ["inequalities"],
    title: "Estimating the remainder of an alternating p-series using hypergeometric functions",
    meta: "Echi, O.; Khalfallah, A.; Kroumi, D. Journal of Mathematical Inequalities 17(2), 569–580.",
    link: "https://doi.org/10.7153/jmi-2023-17-36"
  },
  {
    number: 12,
    year: 2023,
    tags: ["inequalities"],
    title: "Sharp estimate of the remainder of some alternating series",
    meta: "Echi, O.; Khalfallah, A.; Kroumi, D. Mathematical Inequalities & Applications 26(1), 83–91.",
    link: "https://doi.org/10.7153/mia-2023-26-07"
  }
];

publications.sort((a, b) => b.year - a.year || a.number - b.number);

const state = { filter: "all", query: "" };

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  }[ch]));
}

function renderPublications() {
  const list = qs("#publicationList");
  const status = qs("#publicationStatus");
  if (!list || !status) return;

  const query = state.query.trim().toLowerCase();

  const items = publications.filter((pub) => {
    const matchesFilter = state.filter === "all" || pub.tags.includes(state.filter);
    const haystack = `${pub.number} ${pub.year} ${pub.title} ${pub.meta} ${pub.tags.join(" ")}`.toLowerCase();
    return matchesFilter && (!query || haystack.includes(query));
  });

  status.textContent = `${items.length} publication${items.length === 1 ? "" : "s"} shown`;

  list.innerHTML = items.map((pub) => `
    <article class="publication">
      <time datetime="${pub.year}">${pub.year}</time>
      <div>
        <h3>${escapeHtml(pub.title)}</h3>
        <p>${escapeHtml(pub.meta)}</p>
        ${pub.link ? `<a href="${pub.link}" rel="noopener">Open DOI</a>` : ""}
      </div>
    </article>
  `).join("");

  observeReveals();
}

function getHeaderHeight() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
  const p = parseInt(v, 10);
  return Number.isFinite(p) ? p : 72;
}

function setHeaderState() {
  const header = qs("[data-header]");
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 24);

  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  const bar = qs("#scrollProgress");
  if (bar) bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

function setActiveNav() {
  const sections = qsa("main section[id]");
  const navLinks = qsa(".site-nav a");
  const threshold = getHeaderHeight() + 70;

  const current = sections
    .filter((section) => section.getBoundingClientRect().top < threshold)
    .pop();

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    link.classList.toggle("active", current && href === `#${current.id}`);
  });
}

let revealObserver;

function observeReveals() {
  const revealItems = qsa("[data-reveal]:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("visible"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }
  revealItems.forEach((item) => revealObserver.observe(item));
}

function animateFacts() {
  const facts = qsa("[data-count]");
  if (!("IntersectionObserver" in window)) {
    facts.forEach((fact) => { fact.textContent = fact.dataset.count; });
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const item = entry.target;
      const end = Number(item.dataset.count);
      const duration = 900;
      const startTime = performance.now();
      item.textContent = "0";
      function tick(now) {
        const p = Math.min(1, (now - startTime) / duration);
        item.textContent = Math.round(end * p);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      observer.unobserve(item);
    });
  }, { threshold: 0.6 });
  facts.forEach((fact) => observer.observe(fact));
}

function initNavigation() {
  const nav = qs("[data-nav]");
  const toggle = qs("[data-nav-toggle]");
  if (!nav || !toggle) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  qsa(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initPublicationControls() {
  const search = qs("#publicationSearch");
  if (search) {
    search.addEventListener("input", (event) => {
      state.query = event.target.value;
      renderPublications();
    });
  }
  qsa(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      qsa(".filter").forEach((item) => item.classList.toggle("active", item === button));
      renderPublications();
    });
  });
}

function init() {
  qsa(".section:not(.intro):not(.publications), .research-item, .service-grid article, .timeline article, .contact-panel, .news-item")
    .forEach((item) => item.setAttribute("data-reveal", ""));

  const yearEl = qs("#currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initNavigation();
  initPublicationControls();
  renderPublications();
  observeReveals();
  animateFacts();
  setHeaderState();
  setActiveNav();

  window.addEventListener("scroll", () => {
    setHeaderState();
    setActiveNav();
  }, { passive: true });
}

document.addEventListener("DOMContentLoaded", init);
