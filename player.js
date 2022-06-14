"user strict";

class Player {
  constructor(name, user) {
    this.cardsList = document.getElementById(
      user ? `player1-cards-list` : `player2-cards-list`
    );
    this.name = name;
    this.total = 0;
    this.cards = [];
    this.user = user;
    this.tokens = 150;
  }

  addCard(card) {
    this.cards.push(card);
    this.total += card.getValue();
    this.updateList(card);
  }

  getCards() {
    return this.cards;
  }

  getTotal() {
    return this.total;
  }

  clearList() {
    this.cardsList.innerHTML = ``;
  }

  updateList(card) {
    let li = document.createElement(`li`);
    li.appendChild(card.getImg());
    this.cardsList.appendChild(li); 
  }
}
