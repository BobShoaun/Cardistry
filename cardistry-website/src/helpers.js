// temporary function, so i dont have to copy paste all the cards in the DOM manually

const suits = ["♠", "♥", "♣", "♦"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export const setupCards = (target, numCards = 16, draggable = false) => {
  const hand = document.querySelector(target);
  if (!hand) return;

  let cards = "";

  for (let i = 0; i < numCards; i++) {
    const rank = ranks[i % ranks.length];
    const suit = "♥";
    const color = suit === "♥" || suit === "♦" ? "red" : "black";

    cards += /*html*/ `
      <div class="card poker-card ${color}" draggable="${draggable}">
        <div class="content">
          <div class="front">
            <div class="top-left">
              <p class="rank">${rank}</p>
              <p class="suit">${suit}</p>
            </div>
            <div class="bottom-right">
              <p class="rank">${rank}</p>
              <p class="suit">${suit}</p>
            </div>
            <p class="center-suit">${suit}</p>
          </div>
          <div class="back" draggable="false">
            <img src="images/card-back.png" alt="" />
          </div>
        </div>
      </div>
    `;
  }

  hand.innerHTML = cards;
};
