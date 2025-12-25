  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  // Otvori/zatvori meni kada se klikne hamburger dugme
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // spreči zatvaranje odmah nakon otvaranja
    navLinks.classList.toggle('active');
  });

  // Zatvori meni ako klikneš bilo gdje izvan menija
  document.addEventListener('click', (e) => {
    const isClickInsideMenu = navLinks.contains(e.target) || hamburger.contains(e.target);
    if (!isClickInsideMenu) {
      navLinks.classList.remove('active');
    }
  });

// Select language switcher buttons
const enButton = document.getElementById("en-btn");
const deButton = document.getElementById("de-btn");

// Function to switch language
function switchLanguage(language) {
  const translatableElements = document.querySelectorAll("[data-en][data-de]");
  translatableElements.forEach((element) => {
    element.textContent = element.getAttribute(`data-${language}`);
  });
}

// Add event listeners to language buttons
enButton.addEventListener("click", () => switchLanguage("en"));
deButton.addEventListener("click", () => switchLanguage("de"));

// Set default language to German
switchLanguage("de");

// Set default language to German
switchLanguage("de");

// Citat funkcionalnost
const quotes = [
  {
    text: "The journey of a thousand miles begins with a single step.",
    author: "Lao Tzu",
  },
  {
    text: "Code is like humor. When you have to explain it, it’s bad.",
    author: "Cory House",
  },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "Programs grow faster than programmers understand them.",
    author: "Gerald Weinberg",
  },
  {
    text: "Move fast and break things.",
    author: "Mark Zuckerberg",
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
  },
];

const quoteDisplay = document.getElementById("quote-display");

const changeQuote = () => {
  quoteDisplay.classList.remove("fade-in");
  quoteDisplay.classList.add("fade-out");

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `${quote.text} <br /><span class="author">— ${quote.author}</span>`;

    quoteDisplay.classList.remove("fade-out");
    quoteDisplay.classList.add("fade-in");
  }, 500);
};

changeQuote();
setInterval(changeQuote, 10000);


// Kontakt
