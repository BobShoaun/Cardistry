export const setupCards = (target) => {
  const hand = document.querySelector(target);
  if (!hand) return;

  const numCards = 15;
  const cardHeight = 120;
  const cardWidth = 75;

  for (let i = 0; i < numCards; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardHeight}px`;
    const content = document.createElement("div");
    content.classList.add("content");
    const front = document.createElement("div");
    front.classList.add("front");
    const back = document.createElement("div");
    back.classList.add("back");
    content.appendChild(front);
    content.appendChild(back);
    card.appendChild(content);
    hand.appendChild(card);
  }
};
