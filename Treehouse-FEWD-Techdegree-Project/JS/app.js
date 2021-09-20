// Global Variables

const overlay = document.querySelector('#overlay');
const startBtn = document.querySelector('.btn__reset');
let qwerty = document.querySelector('#qwerty');
let phrase = document.querySelector('#phrase');
let phraseUl = document.querySelector('#phrase ul');
let tries = document.querySelectorAll('.tries img');
let buttons = document.querySelectorAll('BUTTON');


// Wrong Awnsers

let missed = 0;

// Phrase Array

phrases = ['hulk', 'loki', 'groot', 'thor', 'thanos'];

// Start Game Button

startBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// Random Phrase Function

function getRandomPhraseAsArray(arr) {
  let pick = Math.floor(Math.random() * arr.length);
  return phrases[pick];
}
let randomPhrase = getRandomPhraseAsArray(phrases);

// Phrase Choice

function addPhraseToDisplay(randomPhrase) {
  for (let i = 0; i < randomPhrase.length; i++) {
    let letter = randomPhrase[i];
    let li = document.createElement('li');
    li.textContent = letter;
    if (letter !==  '') {
      li.className = 'letter';
      phraseUl.appendChild(li);
    } else {
      li.className = 'space';
      phraseUl.appendChild(li);
    }
  }
}
addPhraseToDisplay(randomPhrase);

// Check Letter

function checkLetter(button) {
  let letters = document.querySelectorAll('.letter');
  let match = null;
  for (i = 0; i < letters.length; i++) {
    if (button === letters[i].textContent) {
      letters[i].classList.add('show');
      match = true;
    }
  }
  return match;
}

// Event Listener on click keyboard

qwerty.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    let button = event.target;
    button.className = 'chosen';
    button.disabled = true;
    let letterFound = checkLetter(button.textContent);

    if (letterFound === null) {
      tries[missed].src = 'images/lostHeart.png';
      missed++;
      checkWin();
    } else {
      checkWin();
    }
  }
});

// Check Win Function

function checkWin() {
  let letters = document.querySelectorAll('.letter');
  let correct = document.querySelectorAll('.show');


  if (letters.length == correct.length) {
    overlay.className = 'win';
    overlay.firstElementChild.textContent = 'Wooooo!!! You Win!!';
    overlay.style.display = 'flex';
    startBtn.textContent = 'Fancy Another Game?';
    reset();
  } else if (missed > 4) {
    overlay.className = 'lose';
    overlay.firstElementChild.textContent = 'Game Over!! ';
    overlay.style.display = 'flex';
    startBtn.textContent = 'Try Again?';
    reset();
  }
}

// Reset Game Function

function reset() {
  startBtn.textContent = 'Play Again';
  missed = 0;
  phraseUl.innerHTML = ' ';
  let phraseChoice = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseChoice);
  let chosen = document.querySelectorAll('.chosen');
  for (let i = 0; i < chosen.length; i++) {
    chosen[i].classList.remove('chosen');
    chosen[i].disabled = false;
  }

  for (let i = 0; i < tries.length; i++) {
    tries[i].src = 'images/liveHeart.png';
  }
}
