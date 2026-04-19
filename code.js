document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi Sistem
  console.log("SYSTEM.ONLINE - Cyber Course Ready! 🚀");

  // Memberikan efek hover neon dinamis pada baris tabel
  const tableRows = document.querySelectorAll(".minimal-table tbody tr");

  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      // Efek glow cyan transparan ala antarmuka sci-fi
      row.style.backgroundColor = "rgba(0, 243, 255, 0.05)";
      row.style.transition = "background-color 0.3s ease";
    });

    row.addEventListener("mouseleave", () => {
      // Kembali ke transparan
      row.style.backgroundColor = "transparent";
    });
  });
});
