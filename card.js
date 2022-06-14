"use strict";

class Card {
  constructor(num) {
    this.num = num;
    this.value = this.getCardValue(num);
    this.suit = this.getSuit(num);
    this.img = document.createElement(`img`);
    this.img.src = `./img/card_${this.suit}_${this.getCardValueString(num)}.png`;
  }

  getNum() {
    return this.num;
  }

  getValue() {
    return this.value;
  }

  getImg() {
    return this.img;
  }

  getCardValue(number) {
    switch (number % 13) {
      case 0:
      case 11:
      case 12:
        return 10;
      default:
        return number % 13;
    }
  }

  getCardValueString(number) {
    switch (number % 13) {
      case 1:
        return `A`;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        return `0${number % 13}`;
      case 10:
        return `10`;
      case 11:
        return `J`;
      case 12:
        return `Q`;
      case 0:
        return `K`;
    }
  }

  getSuit(number) {
    let suitNum = number / 13;
    if (suitNum <= 1) {
      return `clubs`;
    } else if (suitNum <= 2) {
      return `diamonds`;
    } else if (suitNum <= 3) {
      return `hearts`;
    }
    return `spades`;
  }
}
