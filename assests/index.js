import Config from "./config.js";

// NAV TOGGLE

const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");
navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  nav.hidden = expanded;
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
    if (window.innerWidth < 768) nav.hidden = true;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  let currentIndex = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  document.querySelector(".next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  document.querySelector(".prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  // Autoplay every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }, 5000);
});

// booking form

document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("booking-form");
  const formMsg = document.querySelector(".form-msg");

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

  function showMessage(message, color) {
    formMsg.textContent = message;
    formMsg.style.color = color;
    formMsg.style.opacity = "1";
    formMsg.style.animation = "fadeInOut 3s ease";

    setTimeout(() => {
      formMsg.style.opacity = "0";
      formMsg.style.animation = "";
    }, 3000);
  }
});

// SECURITY: check for SECRET_KEY presence without exposing it
// In browser environments this will return null; in server/bundled builds process.env.SECRET_KEY
// can be used by backends. We never print the secret itself.
try {
  const hasSecret = Boolean(Config.getSecretKey());
  if (hasSecret) {
    console.info("SECRET_KEY is configured in the environment.");
  } else {
    console.info(
      "SECRET_KEY is not available in the browser environment (expected)."
    );
  }
} catch (e) {
  // fail silently to avoid leaking any details
}
