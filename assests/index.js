import Config from "./config.js";

// Run after DOM ready to ensure elements exist
document.addEventListener("DOMContentLoaded", () => {
  // NAV TOGGLE
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      nav.hidden = expanded;
    });
  }

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
      if (window.innerWidth < 768 && nav) nav.hidden = true;
    });
  });

  // CAROUSEL
  const track = document.querySelector(".carousel-track");
  if (track) {
    const slides = Array.from(track.children);
    let currentIndex = 0;

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    if (nextBtn) nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });
    if (prevBtn) prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    // Autoplay every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }, 5000);
  }

  // BOOKING FORM
  const bookingForm = document.getElementById("booking-form");
  const formMsg = document.querySelector(".form-msg");
  if (bookingForm && formMsg) {
    const bookedDates = ["2025-09-10", "2025-09-15", "2025-09-22"];
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const checkin = document.getElementById("checkin").value;
      const checkout = document.getElementById("checkout").value;
      if (bookedDates.includes(checkin) || bookedDates.includes(checkout)) {
        showMessage("Selected date is occupied. Try next month!", "red");
      } else {
        showMessage("Booking unavailable! Please proceed another time.", "green");
      }
    });
  }

  function showMessage(message, color) {
    if (!formMsg) return;
    formMsg.textContent = message;
    formMsg.style.color = color;
    formMsg.style.opacity = "1";
    formMsg.style.animation = "fadeInOut 3s ease";
    setTimeout(() => {
      formMsg.style.opacity = "0";
      formMsg.style.animation = "";
    }, 3000);
  }

  // SECURITY: confirm presence of SECRET_KEY without exposing it
  try {
    const hasSecret = Boolean(Config.getSecretKey());
    if (hasSecret) {
      console.info("SECRET_KEY is configured in the environment.");
    } else {
      console.info("SECRET_KEY is not available in the browser environment (expected).");
    }
  } catch (e) {
    // fail silently
  }

});
