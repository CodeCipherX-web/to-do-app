document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  // ================= TIME-BASED BACKGROUND =================
  function updateBackgroundGradient() {
    const hour = new Date().getHours();
    let gradient;

    if (hour >= 6 && hour < 12)
      gradient = "linear-gradient(135deg, #f6d365, #fda085)"; // morning
    else if (hour >= 12 && hour < 18)
      gradient = "linear-gradient(135deg, #a1c4fd, #c2e9fb)"; // afternoon
    else
      gradient = "linear-gradient(135deg, #667eea, #764ba2)"; // evening/night

    body.style.background = gradient;
    body.style.backgroundSize = "cover";
  }

  updateBackgroundGradient();
  setInterval(updateBackgroundGradient, 15 * 60 * 1000);

  // ================= FLOATING PARTICLES =================
  const particleCount = 50;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    body.appendChild(particle);
  }

  // ================= THEME TOGGLE =================
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");
    const icon = themeToggle.querySelector("i");
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
    updateBackgroundGradient(); // update background on theme toggle
  });

  // ================= CONTACT FORM =================
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !email || !message) {
        alert("Please fill out all fields!");
        return;
      }

      // Simulate submission
      alert(`Thank you, ${name}! Your message has been sent.`);
      contactForm.reset();
    });
  }
});
