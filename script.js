const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".quick-nav a");
const statNumbers = document.querySelectorAll(".stat-number");
const sectionIds = ["home", "about", "experience", "skills", "contact"];
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const tickerTrack = document.querySelector(".ticker-track");
if (tickerTrack) {
  tickerTrack.innerHTML += tickerTrack.innerHTML;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item, idx) => {
  item.style.transitionDelay = `${idx * 70}ms`;
  observer.observe(item);
});

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  {
    rootMargin: "-35% 0px -45% 0px",
    threshold: 0
  }
);

sections.forEach((section) => navObserver.observe(section));

const animateCounter = (el) => {
  const target = Number(el.dataset.target);
  const decimals = Number(el.dataset.decimals || 0);
  const suffix = el.dataset.suffix || "";
  const start = 1;
  const duration = 1400;
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - (1 - progress) * (1 - progress);
    const value = start + (target - start) * eased;
    const rendered =
      decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));

    el.textContent = `${rendered}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  statNumbers.forEach((el) => {
    const target = Number(el.dataset.target);
    const decimals = Number(el.dataset.decimals || 0);
    const suffix = el.dataset.suffix || "";
    const rendered =
      decimals > 0 ? target.toFixed(decimals) : String(Math.round(target));
    el.textContent = `${rendered}${suffix}`;
  });
} else {
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );

  statNumbers.forEach((el) => statObserver.observe(el));
}

document.getElementById("year").textContent = String(new Date().getFullYear());
