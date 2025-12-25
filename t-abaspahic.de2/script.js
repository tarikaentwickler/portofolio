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
 // ============================================
// EMAILJS KONFIGURACIJA
// ============================================
// Ovde unesi svoje podatke iz EmailJS naloga
const EMAILJS_CONFIG = {
    publicKey: 'uyeeLyJ-kKvU98qz9',      // Iz: Account → API Keys
    serviceID: 'SMTP wbeserver',      // Iz: Email Services → Tvoj servis
    templateID: 'template_bkeb5br'     // Iz: Email Templates → Tvoj template
};

// ============================================
// INICIJALIZACIJA EMAILJS
// ============================================
(function() {
    // Inicijalizuj EmailJS sa tvojim Public Key-em
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log('✓ EmailJS inicijalizovan');
})();

// ============================================
// DOM ELEMENTI
// ============================================
const form = document.getElementById('contactForm');
const messageDiv = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');

// Elementi forme
const nameInput = document.getElementById('name');
const companyInput = document.getElementById('company');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// ============================================
// GLAVNA FUNKCIJA ZA SLANJE FORME
// ============================================
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validacija forme
    if (!validateForm()) {
        return;
    }
    
    // Pripremi UI za slanje
    setLoadingState(true);
    
    // Prikupi podatke iz forme
    const templateParams = {
        name: nameInput.value.trim(),
        company: companyInput.value.trim() || 'Nije navedeno',
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        // Dodatne informacije
        sent_date: new Date().toLocaleString('sr-RS'),
        reply_to: emailInput.value.trim()
    };
    
    try {
        // Pošalji email kroz EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            templateParams
        );
        
        console.log('✓ Email uspešno poslat:', response);
        handleSuccess();
        
    } catch (error) {
        console.error('✗ Greška pri slanju:', error);
        handleError(error);
    } finally {
        setLoadingState(false);
    }
});

// ============================================
// VALIDACIJA FORME
// ============================================
function validateForm() {
    // Ime i prezime
    if (nameInput.value.trim().length < 2) {
        showMessage('Molimo unesite ime i prezime (minimum 2 karaktera)', 'error');
        nameInput.focus();
        return false;
    }
    
    // Email validacija
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        showMessage('Molimo unesite validan email', 'error');
        emailInput.focus();
        return false;
    }
    
    // Poruka
    if (messageInput.value.trim().length < 10) {
        showMessage('Poruka mora imati minimum 10 karaktera', 'error');
        messageInput.focus();
        return false;
    }
    
    return true;
}

// ============================================
// UI FUNKCIJE
// ============================================

// Postavi loading stanje
function setLoadingState(isLoading) {
    submitBtn.disabled = isLoading;
    
    if (isLoading) {
        submitBtn.textContent = 'Šaljem...';
        submitBtn.style.opacity = '0.7';
        // Onemogući sva polja
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => input.disabled = true);
    } else {
        submitBtn.textContent = 'Pošalji Poruku';
        submitBtn.style.opacity = '1';
        // Omogući sva polja
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => input.disabled = false);
    }
}

// Prikaži poruku
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type} show`;
    
    // Automatski sakrij poruku nakon 5 sekundi
    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 5000);
    
    // Skroluj do poruke
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Uspešno slanje
function handleSuccess() {
    showMessage('✓ Hvala! Vaša poruka je uspešno poslata. Javićemo vam se uskoro.', 'success');
    
    // Resetuj formu
    form.reset();
    
    // Fokusiraj prvo polje
    setTimeout(() => {
        nameInput.focus();
    }, 100);
}

// Greška pri slanju
function handleError(error) {
    let errorMessage = '✗ Došlo je do greške pri slanju poruke. ';
    
    // Specifične greške
    if (error.text === 'Invalid publicKey') {
        errorMessage += 'Neispravan Public Key. Proverite konfiguraciju.';
    } else if (error.text === 'Service not found') {
        errorMessage += 'Servis nije pronađen. Proverite Service ID.';
    } else if (error.text === 'Template not found') {
        errorMessage += 'Template nije pronađen. Proverite Template ID.';
    } else {
        errorMessage += 'Molimo pokušajte ponovo.';
    }
    
    showMessage(errorMessage, 'error');
}

// ============================================
// POBOLJŠANJA KORISNIČKOG ISKUSTVA
// ============================================

// Automatsko uklanjanje grešaka pri unosu
const inputs = form.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (messageDiv.classList.contains('show') && messageDiv.classList.contains('error')) {
            messageDiv.classList.remove('show');
        }
    });
});

// Spreči slanje forme na Enter u textarea
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        // Shift+Enter za novi red je OK
    }
});

// ============================================
// PROVERA KONFIGURACIJE
// ============================================
window.addEventListener('load', () => {
    const isConfigured = 
        !EMAILJS_CONFIG.publicKey.includes('TVOJ_') &&
        !EMAILJS_CONFIG.serviceID.includes('TVOJ_') &&
        !EMAILJS_CONFIG.templateID.includes('TVOJ_');
    
    if (!isConfigured) {
        console.warn('⚠️ UPOZORENJE: EmailJS kredencijali nisu podešeni!');
        console.warn('📝 Unesi svoje podatke u EMAILJS_CONFIG objekat na vrhu fajla');
        
        showMessage('⚠️ Forma još nije konfigurisana. Kontaktirajte administratora.', 'error');
        submitBtn.disabled = true;
    } else {
        console.log('✓ EmailJS konfiguracija je kompletna');
    }
});

// ============================================
// OPCIONO: RATE LIMITING (Zaštita od spam-a)
// ============================================
let lastSubmitTime = 0;
const SUBMIT_COOLDOWN = 3000; // 3 sekunde između slanja

form.addEventListener('submit', function(e) {
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    
    if (timeSinceLastSubmit < SUBMIT_COOLDOWN) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const remainingTime = Math.ceil((SUBMIT_COOLDOWN - timeSinceLastSubmit) / 1000);
        showMessage(`Molimo sačekajte ${remainingTime} sekundi pre ponovnog slanja`, 'error');
        return false;
    }
    
    lastSubmitTime = now;
}, true);

// ============================================
// DEBUG MOD (ukloni za produkciju)
// ============================================
const DEBUG_MODE = false;

if (DEBUG_MODE) {
    console.log('🔧 Debug mod je uključen');
    console.log('📋 Konfiguracija:', EMAILJS_CONFIG);
    
    // Test funkcija (pozovi iz konzole: testEmailJS())
    window.testEmailJS = function() {
        console.log('🧪 Test EmailJS konfiguracije...');
        
        emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            {
                name: 'Test Korisnik',
                company: 'Test Firma',
                email: 'test@example.com',
                message: 'Ovo je test poruka',
                sent_date: new Date().toLocaleString('sr-RS')
            }
        ).then(
            (response) => {
                console.log('✓ Test uspešan!', response);
            },
            (error) => {
                console.error('✗ Test neuspešan:', error);
            }
        );
    };
}