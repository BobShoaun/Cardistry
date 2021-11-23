// temporary function, so i dont have to copy paste all the cards in the DOM manually

export const setupCards = (target, numCards = 15) => {
  const hand = document.querySelector(target);
  if (!hand) return;

  const card = hand.querySelector(".card");

  for (let i = 0; i < numCards; i++) {
    const newCard = card.cloneNode(true);
    newCard.tabIndex = i + 10;
    hand.appendChild(newCard);

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
};
