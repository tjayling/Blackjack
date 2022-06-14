// ace is 1 or 11
// picture cards are 10;
"use strict";

const nameInput = document.getElementById("name-input");
const startButton = document.getElementById("start-button");
const drawButton = document.getElementById("draw-button");
const foldButton = document.getElementById("fold-button");
const resetButton = document.getElementById("reset-button");
const player1NameContainer = document.getElementById("player1-name-container");
const player2NameContainer = document.getElementById("player2-name-container");
const player1TotalContainer = document.getElementById(
  "player1-total-container"
);
const player2TotalContainer = document.getElementById(
  "player2-total-container"
);
const playerContainer = document.getElementById("player-container");
const startButtonContainer = document.getElementById("start-button-container");
const otherButtonsContainer = document.getElementById(
  "other-buttons-container"
);
const winOrLoseContainer = document.getElementById("win-or-lose-container");

let running = false;
let total = 0;
let player1, player2;
let cards = [];

function init() {
  nameInput.addEventListener("input", getName);
  startButton.addEventListener("click", startGame);
  drawButton.addEventListener("click", drawCard);
  foldButton.addEventListener("click", foldGame);
  resetButton.addEventListener("click", resetPage);
  for (let i = 1; i < 53; i++) cards.push(new Card(i));
}

function getName() {
  if (nameInput.value.length > 0) {
    startButtonContainer.style.display = "block";
    return;
  }
  startButtonContainer.style.display = "none";
}

function startGame() {
  running = true;
  player1 = new Player(nameInput.value, true);
  player2 = new Player("Kevin", false);
  addNames(nameInput.value, "Kevin");
  nameInput.style.display = "none";
  winOrLoseContainer.innerHTML = ``;
  toggleButtons();

  for (let i = 0; i < 2; i++) {
    let p1Card = getCard(player1.getCards());
    let p2Card = getCard(player2.getCards());
    player1.addCard(p1Card);
    player2.addCard(p2Card);
  }
  updateTotal();
}

function drawCard() {
  if (!running) return;
  let p1Card = getCard(player1.getCards());
  let p2Card = getCard(player2.getCards());
  player1.addCard(p1Card);
  player2.addCard(p2Card);

  updateTotal();

  if (player1.getTotal() >= 21) {
    gameOver(false);
    return;
  }
}

function foldGame() {
  if (!running) return;
  running = false;
  gameOver(true);
}

function gameOver(fold) {
  running = false;
  let score = `Your total was: ${player1.getTotal()}, you were ${21 - player1.getTotal()} points away from 21`;
  let win =
    player1.total > player2.total ? "You beat the bot!" : `The bot beat you!`;
  let lose = `You went over`;
  winOrLoseContainer.innerHTML = `<h2>${
    fold ? `${score}<br/>${win}` : lose
  }</h2>`;
}

function resetPage() {
  player1 = new Player(nameInput.value, true);
  player2 = new Player(`Kevin`, false);
  player1.clearList();
  player2.clearList();
  toggleButtons();
  updateTotal();
}

function getCard() {
  return new Card(Math.floor(Math.random() * 52) + 1);
}

function addNames(player1Name, player2Name) {
  let player1NameH2 = document
    .createElement(`h2`)
    .appendChild(document.createTextNode(player1Name));
  let player2NameH2 = document
    .createElement(`h2`)
    .appendChild(document.createTextNode(player2Name));
  player1NameContainer.replaceChild(
    player1NameH2,
    player1NameContainer.childNodes[0]
  );
  player2NameContainer.replaceChild(
    player2NameH2,
    player2NameContainer.childNodes[0]
  );
}

function updateTotal() {
  player1TotalContainer.replaceChild(
    document.createTextNode(`Total: ${player1.getTotal()}`),
    player1TotalContainer.childNodes[0]
  );
  player2TotalContainer.replaceChild(
    document.createTextNode(`Total: ${player2.getTotal()}`),
    player2TotalContainer.childNodes[0]
  );
}

function toggleButtons() {
  otherButtonsContainer.style.display = running ? "block" : "none";
  startButtonContainer.style.display = running ? "none" : "block";
}

(function () {
  document.addEventListener("DOMContentLoaded", init);
})();
