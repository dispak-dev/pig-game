'use strict';

const player1 = document.querySelector(`.player--0`);
const player2 = document.querySelector(`.player--1`);

const dice = document.querySelector('.dice');
const diceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const newGameButton = document.querySelector('.btn--new');
const overlay = document.querySelector('.overlay');

let activePlayer = 0;
let playerNames = ['Player 1', 'Player 2'];

let resultNumber;

const scores = [0, 0];
let currentScore = 0;

const modal = {
  element: document.querySelector('.modal'),
  bodyText: document.querySelector('.modal-body-text'),
}

const openModal = (message) => {
  modal.element.classList.remove('hidden');
  overlay.classList.remove('hidden');
  modal.bodyText.textContent = message;
}

const closeModal = () => {
  modal.element.classList.add('hidden');
  overlay.classList.add('hidden');
  restartGame();
}

const restartGame = () => {
  scores.fill(0);
  currentScore = 0;
  playerNames.forEach((name, i) => {
    document.querySelector(`#score--${i}`).textContent = '0';
    document.querySelector(`#current--${i}`).textContent = '0';
    document.querySelector(`.name--${i}`).value = '';
  })
}

const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
}

const switchPlayer = () => {
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active')
  document.querySelector(`#current--${activePlayer}`).textContent = '0';
  currentScore = 0;
  activePlayer = 1 - activePlayer;
}

diceButton.addEventListener('click', () => {
  for(let i = 0; i < 2; i++) {
    playerNames[i] = document.querySelector(`.name--${i}`).value || `Player ${i + 1}`
  }
  console.log(playerNames);
  resultNumber = Number(document.querySelector('#points').value);
  const diceResult = rollDice();
  console.log(diceResult);
  if (resultNumber > 0) {
    dice.src = `dice-${diceResult}.png`;
  } else {
    openModal('Enter valid number of points for winning')
  }
  if (diceResult !== 1) {
    currentScore += diceResult;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
})

holdButton.addEventListener('click', () => {
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
  if (scores[activePlayer] >= resultNumber) {
    openModal(`${playerNames[activePlayer]} wins!`);
  }
  switchPlayer();
})

overlay.addEventListener('click', closeModal)
newGameButton.addEventListener('click', restartGame)

restartGame();
