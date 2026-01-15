# Tarik Abaspahic — Portfolio Website

A small, responsive personal portfolio website for Tarik Abaspahic showcasing About, Projects and a Contact form. The site includes a first-visit language selection popup (German / English) with persisted preference, a rotating quote display, and a contact form powered by EmailJS.

This repository contains the website source inside the `t-abaspahic.de2/` folder.

## Features

- Language selection modal on first visit (German / English).
- Preference persistence using `localStorage` (keeps site language across visits).
- In-page language switcher (`DE` / `EN`) that also persists the choice.
- Contact form using EmailJS (send emails from the browser).
- Rotating quotes with fade animation.
- Responsive layout and mobile-friendly hamburger navigation.
- Content localization using `data-en` / `data-de` attributes in HTML.

## Repository layout

- `t-abaspahic.de2/index.html` — main HTML file with content and `data-en`/`data-de` translations.
- `t-abaspahic.de2/styles.css` — site styling.
- `t-abaspahic.de2/script.js` — JavaScript: language modal, language switching, quotes, and EmailJS logic.
- `t-abaspahic.de2/img/` — images used on the site (profile, projects, etc).


## Quick start — run locally

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/<repo>.git
cd <repo>
```

2. Serve the website locally. The site files are in `t-abaspahic.de2/` so run a static server in that folder:

```bash
# from repository root
cd t-abaspahic.de2
# Python 3 simple server
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Alternative: use `npx serve .` or the VS Code Live Server extension to serve the `t-abaspahic.de2/` folder.

## How the language system works

- Text is stored on elements using `data-en` and `data-de` attributes. Example:

```html
<h1 data-en="Hello" data-de="Hallo"></h1>
```

- On first visit the JavaScript displays a modal to choose a language. The choice is saved to `localStorage` under the key `preferredLanguage`.
- On subsequent loads `script.js` reads `preferredLanguage` and applies the saved language automatically.
- The `DE` / `EN` buttons in the page also switch language and save the choice.

To change the greeting shown in the modal, edit the `showGreetingAndPersist` function in `t-abaspahic.de2/script.js`.

## EmailJS (Contact form) — setup

The contact form uses EmailJS. To enable sending:

1. Sign up or log in to EmailJS (https://www.emailjs.com).
2. Create a service and an email template.
3. In `t-abaspahic.de2/script.js` set your keys near the top:

```js
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
```

4. Make sure the template fields match those sent in `templateParams` (currently: `from_name`, `from_company`, `from_email`, `message`, `to_name`).
5. The EmailJS SDK is already referenced in `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

Security note: EmailJS requires a public key for client-side sending but avoid embedding any private secrets in client code.

## Customization

- Text/content: update `t-abaspahic.de2/index.html` and the `data-en`/`data-de` values.
- Modal styles: currently some modal styles are injected inline from JavaScript. For maintainability move modal styles into `t-abaspahic.de2/styles.css` and remove inline style assignments in `script.js`.
- Colors and buttons: you can adjust the colors in `styles.css` or the inline styles in `script.js`.
- Add more languages: extend the `data-xx` attributes and update `switchLanguage()` to handle the new language codes.

## Deployment (GitHub Pages)

To publish with GitHub Pages:

1. Commit and push the repo to GitHub.
2. In repository Settings → Pages, choose branch `main` and folder `/ (root)` (or `/docs` if you prefer to move site files there).
3. Save. The site will be available at `https://<your-username>.github.io/<repo>/`.

If you prefer, move the website files to the repository root so `index.html` is at the repo root for cleaner Pages hosting.

## Accessibility & improvements (suggested)

- Add ARIA attributes to the modal (e.g., `role="dialog"`, `aria-modal="true"`) and trap focus inside the modal.
- Allow closing the modal with the Esc key (if you want to allow that) or keep forced selection.
- Move inline styles to CSS and add responsive media queries for the modal.
- Add transition/fade animations for a smoother UX.

## License

This project doesn't include an explicit license file. Suggested: MIT License. Add a `LICENSE` file if you choose to publish with a license.

## Contact

If you need help customizing the site or want additional features, open an issue or contact Tarik via the email listed on the site.

---

Created automatically — if you'd like I can also:
- Move modal inline styles into `t-abaspahic.de2/styles.css` and add responsive modal styling,
- Add ARIA attributes and Esc/Outside-click behavior for the modal,
- Create a short CONTRIBUTING or LICENSE file.
