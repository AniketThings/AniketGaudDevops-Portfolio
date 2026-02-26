/* =====================
   FADE-UP ANIMATION
   ===================== */
const fadeElements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

fadeElements.forEach(el => observer.observe(el));

/* =====================
   CONTACT FORM POPUP
   ===================== */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const modal = document.getElementById("thankyou-modal");
  const closeBtn = document.getElementById("close-modal");

  if (!form || !modal) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    // If running locally (file://), just show popup
    if (window.location.protocol === "file:") {
      modal.style.display = "flex";
      form.reset();
      return;
    }

    // Netlify production submission
    fetch(window.location.pathname, {
      method: "POST",
      body: new FormData(form)
    })
      .then(() => {
        modal.style.display = "flex";
        form.reset();
      })
      .catch(() => {
        alert("Something went wrong. Please try again.");
      });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });
});
