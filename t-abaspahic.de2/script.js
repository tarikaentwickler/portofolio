const hamburger = document.querySelector('.hamburger'); // promenjeno
const navLinks = document.querySelector('.nav-links'); // promenjeno

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

// ZATVARANJE MENIJA KADA SE KLIKNE NA LINK 
const menuLinks = navLinks.querySelectorAll('a'); 
menuLinks.forEach(link => { 
  link.addEventListener('click', () => { 
    navLinks.classList.remove('active');
  }); 
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
// EmailJS Configuration


const EMAILJS_PUBLIC_KEY = 'uyeeLyJ-kKvU98qz9'; // Tvoj Public Key
const EMAILJS_SERVICE_ID = 'ionos_554'; // Tvoj Service ID
const EMAILJS_TEMPLATE_ID = 'template_xsm7dnp'; // Tvoj Template ID
+


// Inicijalizacija EmailJS
(function() {
  emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// Form Submit Handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitButton = this.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  
  // Disable button i promeni tekst
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  
  // Ukloni prethodne poruke ako postoje
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Prikupi podatke iz forme
  const templateParams = {
    from_name: document.getElementById('name').value,
    from_company: document.getElementById('company').value,
    from_email: document.getElementById('email').value,
    message: document.getElementById('message').value,
    to_name: 'Tarik Abaspahic' // Tvoje ime
  };
  
  // Pošalji email preko EmailJS
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      
      // Prikaži success poruku
      showMessage('Message sent successfully!', 'success');
      
      // Resetuj formu
      document.getElementById('contact-form').reset();
      
      // Vrati button u normalno stanje
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      
    }, function(error) {
      console.log('FAILED...', error);
      
      // Prikaži error poruku
      showMessage('An error occurred. Please try again.', 'error');
      
      // Vrati button u normalno stanje
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    });
});

// Funkcija za prikaz poruka
function showMessage(text, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = text;
  
  const form = document.getElementById('contact-form');
  form.insertBefore(messageDiv, form.firstChild);
  
  // Ukloni poruku nakon 5 sekundi
  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}

// Validacija email adrese u realnom vremenu
document.getElementById('email').addEventListener('blur', function() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.value) && this.value !== '') {
    this.style.borderColor = '#dc3545';
    showMessage('“Please enter a valid email address.', 'error');
  } else {
    this.style.borderColor = '#e0e0e0';
  }
});