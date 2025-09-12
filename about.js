// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Animate headings and paragraphs
  const fadeElements = document.querySelectorAll(".about-hero h1, .about-hero p, .about-content h2, .about-content p, .about-content ul li");
  fadeElements.forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    setTimeout(() => {
      el.style.transition = "all 0.6s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, i * 200); // staggered animation
  });

  // Dark/Light Mode Toggle
  const toggleBtn = document.createElement("button");
  toggleBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  toggleBtn.classList.add("mode-toggle");
  document.body.appendChild(toggleBtn);

  let darkMode = false;
  toggleBtn.addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode", darkMode);
    toggleBtn.innerHTML = darkMode
      ? `<i class="fa-solid fa-sun"></i>`
      : `<i class="fa-solid fa-moon"></i>`;
  });

  // Glow effect on highlighted word
  const highlight = document.querySelector(".highlight");
  if (highlight) {
    setInterval(() => {
      highlight.classList.toggle("glow");
    }, 1000);
  }
});
