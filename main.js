'use strict'

const cards = document.querySelectorAll(".card");


let hasFlippedCard = false;
let first,second;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  if (this === first) return;

  this.classList.add("flip")
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    first = this;
    return;
  }
  second = this;

  checkForMatch()
}

function checkForMatch() {
  let isMatch = first.dataset.face === second.dataset.face;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  first.removeEventListener("click",flipCard);
  second.removeEventListener("click",flipCard);
  resetBoard();
}  

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    first.classList.remove("flip");
    second.classList.remove("flip");
    resetBoard();
  },1200);
}
 function resetBoard() {
   [hasFlippedCard,lockBoard] = [false,false];
   [first,second] = [null,null];
 }

(function shuffle(){
  cards.forEach((card) => {
    let newPosition = Math.floor(Math.random()*44);
    card.style.order = newPosition;
  });
})();

cards.forEach((card) => card.addEventListener("click",flipCard));





