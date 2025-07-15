# HangmanApp

A modern, interactive Hangman game built with HTML, CSS, and JavaScript.

## Features
- **Modern UI:** Clean, responsive design with smooth transitions and a blue color theme.
- **Interactive Gameplay:** On-screen keyboard, animated hangman SVG, and instant feedback.
- **Customizable Words:** Easily update the word list or integrate with the Gemini API for dynamic word generation.
- **Mobile Friendly:** Fully responsive for desktop and mobile devices.

## Getting Started
1. **Clone or Download** this repository to your local machine.
2. **Open `index.html`** in your web browser. No build step or server required.

## Customizing the Word List
- By default, the app uses a static list of words in `app.js` (see `fetchWordFromGemini()` function).
- You can add or remove words from this list as needed.

## Gemini API Integration
- The code is ready for Gemini API integration to fetch random words.
- To use Gemini, replace the placeholder logic in `fetchWordFromGemini()` in `app.js` with an actual API call.

## Design
- The app uses only shades of blue for a cohesive, modern look.
- All UI elements, including the hangman figure and status messages, follow the blue theme.

## Demo
Just open `index.html` in your browser and start playing!

---

*For questions or improvements, feel free to reach out!*