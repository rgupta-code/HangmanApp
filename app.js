// Hangman App - MVP
// Modern UI, Gemini API integration placeholder

const MAX_ATTEMPTS = 6;
let secretWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
let gameActive = true;

// Placeholder: Replace with Gemini API integration
async function fetchWordFromGemini() {
  // TODO: Integrate Gemini API here
  // For now, use a static list
  const words = ['help','fly','javascript', 'gradient', 'hangman', 'startup', 'modern', 'transition', 'gemini'];
  return words[Math.floor(Math.random() * words.length)];
}

function renderWord() {
  const wordDiv = document.createElement('div');
  wordDiv.className = 'word';
  for (const letter of secretWord) {
    const span = document.createElement('span');
    span.className = 'letter' + (guessedLetters.includes(letter) ? ' revealed' : '');
    span.textContent = guessedLetters.includes(letter) ? letter : '';
    wordDiv.appendChild(span);
  }
  return wordDiv;
}

function renderKeyboard() {
  const keyboardDiv = document.createElement('div');
  keyboardDiv.className = 'keyboard';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  for (const char of alphabet) {
    const btn = document.createElement('button');
    btn.className = 'key';
    btn.textContent = char;
    btn.disabled = !gameActive || guessedLetters.includes(char) || secretWord.includes(char) && guessedLetters.includes(char);
    btn.onclick = () => handleGuess(char);
    keyboardDiv.appendChild(btn);
  }
  return keyboardDiv;
}

function renderStatus() {
  const statusDiv = document.createElement('div');
  statusDiv.className = 'status';
  if (!gameActive) {
    if (wrongGuesses >= MAX_ATTEMPTS) {
      statusDiv.textContent = `You lost! The word was "${secretWord}".`;
      statusDiv.style.color = '#1e3c72';
    } else {
      statusDiv.textContent = 'Congratulations! You won!';
      statusDiv.style.color = '#1e3c72';
    }
  } else {
    statusDiv.textContent = `Wrong guesses: ${wrongGuesses} / ${MAX_ATTEMPTS}`;
    statusDiv.style.color = '#3a7bd5';
  }
  return statusDiv;
}

function renderHangmanFigure() {
  // Simple stick figure using SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '120');
  svg.setAttribute('height', '120');
  svg.classList.add('hangman-figure');
  // Gallows and figure in dark blue
  svg.innerHTML = `
    <line x1="20" y1="110" x2="100" y2="110" stroke="#1e3c72" stroke-width="4" />
    <line x1="60" y1="110" x2="60" y2="20" stroke="#1e3c72" stroke-width="4" />
    <line x1="60" y1="20" x2="90" y2="20" stroke="#1e3c72" stroke-width="4" />
    <line x1="90" y1="20" x2="90" y2="35" stroke="#1e3c72" stroke-width="4" />
    ${wrongGuesses > 0 ? '<circle cx="90" cy="45" r="10" stroke="#1e3c72" stroke-width="3" fill="none" />' : ''}
    ${wrongGuesses > 1 ? '<line x1="90" y1="55" x2="90" y2="80" stroke="#1e3c72" stroke-width="3" />' : ''}
    ${wrongGuesses > 2 ? '<line x1="90" y1="60" x2="80" y2="70" stroke="#1e3c72" stroke-width="3" />' : ''}
    ${wrongGuesses > 3 ? '<line x1="90" y1="60" x2="100" y2="70" stroke="#1e3c72" stroke-width="3" />' : ''}
    ${wrongGuesses > 4 ? '<line x1="90" y1="80" x2="80" y2="100" stroke="#1e3c72" stroke-width="3" />' : ''}
    ${wrongGuesses > 5 ? '<line x1="90" y1="80" x2="100" y2="100" stroke="#1e3c72" stroke-width="3" />' : ''}
  `;
  return svg;
}

function renderRestartButton() {
  const btn = document.createElement('button');
  btn.className = 'restart';
  btn.textContent = 'Restart';
  btn.onclick = startGame;
  return btn;
}

function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  const title = document.createElement('h1');
  title.textContent = 'Hangman';
  app.appendChild(title);
  app.appendChild(renderHangmanFigure());
  app.appendChild(renderWord());
  app.appendChild(renderStatus());
  app.appendChild(renderKeyboard());
  if (!gameActive) app.appendChild(renderRestartButton());
}

function handleGuess(letter) {
  if (!gameActive || guessedLetters.includes(letter)) return;
  guessedLetters.push(letter);
  if (!secretWord.includes(letter)) {
    wrongGuesses++;
    if (wrongGuesses >= MAX_ATTEMPTS) {
      gameActive = false;
    }
  } else {
    // Check win
    if (secretWord.split('').every(l => guessedLetters.includes(l))) {
      gameActive = false;
    }
  }
  renderApp();
}

async function startGame() {
  secretWord = await fetchWordFromGemini();
  guessedLetters = [];
  wrongGuesses = 0;
  gameActive = true;
  renderApp();
}

document.addEventListener('DOMContentLoaded', startGame); 