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

// Function to switch language (updates all elements with data-en and data-de)
function switchLanguage(language) {
  const translatableElements = document.querySelectorAll("[data-en][data-de]");
  translatableElements.forEach((element) => {
    element.textContent = element.getAttribute(`data-${language}`);
  });
}

// When user clicks language buttons in the page, switch and persist choice
if (enButton) enButton.addEventListener("click", () => {
  switchLanguage("en");
  localStorage.setItem('preferredLanguage', 'en');
});
if (deButton) deButton.addEventListener("click", () => {
  switchLanguage("de");
  localStorage.setItem('preferredLanguage', 'de');
});

// Show a language selection modal on first visit (or if no preference saved).
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('preferredLanguage');
  if (saved) {
    // Apply saved language
    switchLanguage(saved);
  } else {
    showLanguageModal();
  }
});

// Create and show a modal that lets the user pick a language and confirms with a greeting
function showLanguageModal() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'lang-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0,0,0,0.5)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';

  // Create modal box
  const modal = document.createElement('div');
  modal.id = 'lang-modal';
    modal.style.background = '#202766';
    modal.style.color = '#ffffff';
  modal.style.padding = '20px';
  modal.style.borderRadius = '8px';
  modal.style.maxWidth = '90%';
  modal.style.width = '420px';
  modal.style.boxShadow = '0 6px 24px rgba(0,0,0,0.2)';
  modal.style.textAlign = 'center';

  const title = document.createElement('h2');
  title.textContent = 'Choose your language / Wähle deine Sprache';
  title.style.marginTop = '0';

  const buttonsWrap = document.createElement('div');
  buttonsWrap.style.display = 'flex';
  buttonsWrap.style.justifyContent = 'center';
  buttonsWrap.style.gap = '12px';
  buttonsWrap.style.marginTop = '16px';

  const btnDe = document.createElement('button');
  btnDe.type = 'button';
  btnDe.textContent = 'Deutsch';
  btnDe.dataset.lang = 'de';
  btnDe.style.padding = '10px 16px';
    btnDe.style.backgroundColor = '#3177f8';
    btnDe.style.color = '#000000';
    btnDe.style.border = 'none';
    btnDe.style.borderRadius = '6px';
    btnDe.style.cursor = 'pointer';

  const btnEn = document.createElement('button');
  btnEn.type = 'button';
  btnEn.textContent = 'English';
  btnEn.dataset.lang = 'en';
  btnEn.style.padding = '10px 16px';
    btnEn.style.backgroundColor = '#3177f8';
    btnEn.style.color = '#000000';
    btnEn.style.border = 'none';
    btnEn.style.borderRadius = '6px';
    btnEn.style.cursor = 'pointer';

  buttonsWrap.appendChild(btnDe);
  buttonsWrap.appendChild(btnEn);

  modal.appendChild(title);
  modal.appendChild(buttonsWrap);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Prevent background scroll while modal is open
  const prevOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';

  function closeModal() {
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    document.documentElement.style.overflow = prevOverflow;
  }

  function showGreetingAndPersist(lang) {
    // Apply immediately so content in page changes while modal is visible
    switchLanguage(lang);

    // Replace modal content with greeting and OK button
    modal.innerHTML = '';
    const greeting = document.createElement('p');
    greeting.style.fontSize = '18px';
    greeting.style.margin = '18px 0';
    greeting.style.color = '#ffffff';
    greeting.textContent = lang === 'de' ? 'Willkommen! 👋😊' : 'Welcome! 👋😊';

    const okBtn = document.createElement('button');
    okBtn.type = 'button';
    okBtn.textContent = lang === 'de' ? 'OK' : 'OK';
    okBtn.style.padding = '10px 18px';
    okBtn.style.backgroundColor = '#3177f8';
    okBtn.style.color = '#000000';
    okBtn.style.border = 'none';
    okBtn.style.borderRadius = '6px';
    okBtn.style.cursor = 'pointer';

    modal.appendChild(greeting);
    modal.appendChild(okBtn);

    okBtn.addEventListener('click', () => {
      localStorage.setItem('preferredLanguage', lang);
      closeModal();
    });
  }

  // Attach handlers
  btnDe.addEventListener('click', () => showGreetingAndPersist('de'));
  btnEn.addEventListener('click', () => showGreetingAndPersist('en'));

  // If user clicks outside modal, don't close automatically to force a choice; optional: could close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      // keep modal open — encourage language choice
    }
  });
}



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