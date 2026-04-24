document.addEventListener("DOMContentLoaded", () => {
  console.log("MAYONI.CODE — SYSTEM.ONLINE ✅");

  // ── Table row hover (desktop) ──────────────────
  const tableRows = document.querySelectorAll(".cyber-table tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      row.style.backgroundColor = "rgba(0, 243, 255, 0.04)";
      row.style.transition = "background-color 0.25s ease";
    });
    row.addEventListener("mouseleave", () => {
      row.style.backgroundColor = "transparent";
    });
  });

  // ── Navbar: tambah bg solid saat scroll ──────────
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        navbar.style.borderBottomColor = "rgba(0, 243, 255, 0.35)";
        navbar.style.boxShadow = "0 2px 20px rgba(0, 243, 255, 0.08)";
      } else {
        navbar.style.borderBottomColor = "";
        navbar.style.boxShadow = "";
      }
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
