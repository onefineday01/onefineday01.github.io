const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
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

document.getElementById('year').textContent = String(new Date().getFullYear());
