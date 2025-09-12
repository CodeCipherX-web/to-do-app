// homepage.js

// Greeting based on time of day
function setGreeting() {
  const greetingElement = document.querySelector(".homepage h1");
  const now = new Date();
  const hour = now.getHours();

  let greeting = "Welcome to Listify 👋";
  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning 🌞, welcome to Listify!";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good Afternoon 🌤, welcome to Listify!";
  } else {
    greeting = "Good Evening 🌙, welcome to Listify!";
  }

  greetingElement.textContent = greeting;
}

// Add fade-in animation
function fadeInContent() {
  document.querySelector(".homepage").classList.add("show");
}

// Add button hover sparkle effect (just for fun ✨)
function buttonEffect() {
  const btn = document.querySelector(".start-btn");
  btn.addEventListener("mouseenter", () => {
    btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Let’s Go!';
  });
  btn.addEventListener("mouseleave", () => {
    btn.innerHTML = '<i class="fa-solid fa-rocket"></i> Get Started';
  });
}

// Run functions when page loads
document.addEventListener("DOMContentLoaded", () => {
  setGreeting();
  fadeInContent();
  buttonEffect();
});
