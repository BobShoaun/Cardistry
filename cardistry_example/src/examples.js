import cardistry from "cardistry";
import { setupCards } from "cardistry/setup";
import {
  stack,
  fan,
  spreadRight,
  flip,
  spreadLeft,
  disperse,
  spreadCenter,
} from "cardistry/presets";

setupCards(".hand-fan");
setupCards(".example.distribute");
setupCards(".example.waterfall");
setupCards(".example.drag-n-drop");

cardistry({
  target: ".example.drag-n-drop",
  states: [spreadCenter()],
});

const deck = document.querySelector(".example.drag-n-drop");
const cards = deck.querySelectorAll(".card");

deck.ondragover = e => {
  e.preventDefault();
  const card = deck.querySelector(".dragging");
  const box = card.getBoundingClientRect();
  // console.log(box);
};

cards.forEach(card => {
  card.ondragstart = e => {
    e.target.classList.add("dragging");
  };
  card.ondragend = e => {
    e.target.classList.remove("dragging");
  };
});

cardistry({
  target: ".example.waterfall",
  // loop: true,
  relative: true,
  states: [
    stack(),
    spreadCenter(),
    {
      translateY: i => i * 10,
      delay: i => i * 100,
    },
  ],
});

cardistry({
  target: ".hand-fan",
  // loop: true,
  relative: true,
  states: [
    stack(),
    fan(),
    flip(),
    {
      duration: 200,
      hover: {
        scale: 1.2,
        translateY: -30,
        rotateY: 0,
      },
      focus: {
        scale: 1.2,
        translateY: -30,
        rotateY: 0,
      },
    },
  ],
});

cardistry({
  target: ".example.distribute",
  loop: true,
  relative: true,
  states: [
    {
      contentRotateY: 180,
      zIndex: (i, n) => n - i,
      translateY: 0,
      translateX: 0,
      rotateZ: 0,
      delay: 0,
    },
    {
      translateX: (i, n) => (i % 4 === 0 || i % 4 === 2 ? 0 : i % 4 === 1 ? 300 : -300),
      translateY: i => (i % 4 === 1 || i % 4 === 3 ? 0 : i % 4 === 0 ? -300 : 300),
      delay: i => i * 200,
      duration: 500,
      zIndex: (i, n) => i,
      rotateZ: () => Math.random() * 180,
    },
    {
      contentRotateY: 0,
      delay: 500,
    },
    {
      delay: 2000,
    },
    {
      translateY: 0,
      translateX: 0,
      duration: 500,
    },
  ],
});
