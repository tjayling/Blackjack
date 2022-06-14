// ace is 1 or 11
// picture cards are 10;

"use strict";

const startButton = document.getElementById("start-button");
const drawButton = document.getElementById("draw-button");
const foldButton = document.getElementById("fold-button");
const resetButton = document.getElementById("reset-button");
const cardsList = document.getElementById("cards-list");
const totalContainer = document.getElementById("total-container");
const startButtonContainer = document.getElementById("start-button-container");
const otherButtonsContainer = document.getElementById(
  "other-buttons-container"
);

let running = false;
let total = 0;
let cards = [];

function init() {
  startButton.addEventListener("click", startGame);
  drawButton.addEventListener("click", drawCard);
  foldButton.addEventListener("click", foldGame);
  resetButton.addEventListener("click", resetPage);
}

function startGame() {
  running = true;
  toggleButtons();
  for (let i = 0; i < 2; i++) {
    let card = getCard();
    cards.push(card);
    total += card;
    updateList(card);
  }
  updateDom();
}

function drawCard() {
  if (!running) return;
  let card = getCard();
  cards.push(card);
  total += card;
  updateList(card);
  updateDom();
  if (total >= 21) {
    gameOver(false);
    return;
  }
}

function getCard() {
  return Math.floor(Math.random() * 11) + 1;
}

function foldGame() {
  if (!running) return;
  running = false;
  gameOver(true);
}

function resetPage() {
  running = false;
  total = 0;
  cards = [];
  clearList();
  toggleButtons();
  updateDom();
}

function updateList(card) {
  let li = document.createElement(`li`);
  li.appendChild(document.createTextNode(`${card}`));
  cardsList.appendChild(li);
}

function clearList() {
  cardsList.innerHTML = ``;
}

function gameOver(fold) {
  let win = `Total is: ${total}, you were ${21 - total} points away from 21`;
  let lose = `You went over`;
  console.log(fold ? win : lose);
}

function updateDom() {
  totalContainer.replaceChild(
    document.createTextNode(`Total: ${total}`),
    totalContainer.childNodes[0]
  );
}

function toggleButtons() {
  otherButtonsContainer.style.display = running ? "block" : "none";
  startButtonContainer.style.display = running ? "none" : "block";
}

(function () {
  document.addEventListener("DOMContentLoaded", init);
})();
