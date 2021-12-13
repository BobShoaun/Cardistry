// temporary function, so i dont have to copy paste all the cards in the DOM manually

const suits = ["♠", "♥", "♣", "♦"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export const setupCards = (target, numCards = 16, draggable = false) => {
  const hand = document.querySelector(target);
  if (!hand) return;

  let cards = "";

  for (let i = 0; i < numCards; i++) {
    const rank = ranks[i % ranks.length];
    cards += `<app-card rank=${rank} suit="♥" draggable=${draggable}></app-card>`;
    // const newCard = card.cloneNode(true);
    // const newCard = document.createElement("app-card").cloneNode();
    // newCard.setAttribute("rank", ranks[i % ranks.length]);
    // newCard.setAttribute("suit", "♣");
    // newCard.tabIndex = i;
    // hand.appendChild(newCard);
    // const card = document.createElement("div");
    // card.classList.add("card");
    // card.style.width = `${cardWidth}px`;
    // card.style.height = `${cardHeight}px`;
    // const content = document.createElement("div");
    // content.classList.add("content");
    // const front = document.createElement("div");
    // front.classList.add("front");
    // const back = document.createElement("div");
    // back.classList.add("back");
    // content.appendChild(front);
    // content.appendChild(back);
    // card.appendChild(content);
    // hand.appendChild(card);
  }

  hand.innerHTML = cards;
};
