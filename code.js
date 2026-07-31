document.addEventListener("DOMContentLoaded", () => {
  console.log("MAYONI.CODE — SYSTEM.ONLINE ✅");

  // ── Navbar: tambah bg solid saat scroll ──────────
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("navbar-scrolled", window.scrollY > 60);
    }, { passive: true });
  }

  // ── Reveal animasi saat scroll (Intersection Observer) ──
  const revealItems = document.querySelectorAll(
    ".info-card, .price-card, .curr-card, .section-header"
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealItems.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    revealObserver.observe(el);
  });
});
