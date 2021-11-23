import cardistry from "cardistry";
import {
  stack,
  fan,
  spreadRight,
  flip,
  spreadLeft,
  disperse,
  spreadCenter,
} from "cardistry/presets";

import { setupCards } from "./helpers";

setupCards(".example.spread");
setupCards(".example.flip");
setupCards(".example.fan");
setupCards(".example.rotate");
setupCards(".example.hover-flip");
setupCards(".example.distribute");
setupCards(".example.wave", 30);
setupCards(".example.waterfall", 40);
// setupCards(".example.drag-n-drop");

cardistry({
  target: ".example.move",
  loop: true,
  relative: true,
  states: [
    {
      translateX: 250,
      translateY: -100,
      duration: 400,
    },
    {
      translateY: 100,
      duration: 400,
    },
    {
      translateX: -250,
      translateY: -100,
      duration: 400,
    },
    {
      translateY: 100,
      duration: 400,
    },
  ],
});

cardistry({
  target: ".example.spread",
  loop: true,
  states: [
    stack(),
    { ...spreadCenter(), duration: 700 },
    stack(),
    { ...spreadLeft(), duration: 700 },
    stack(),
    { ...spreadRight(), duration: 700 },
  ],
});

cardistry({
  target: ".example.flip",
  loop: true,
  relative: true,
  states: [
    { ...spreadCenter(), duration: 700 },
    { ...flip(), ...spreadCenter(), duration: 500, delay: i => i * 50, zIndex: (i, n) => n - i },
    { delay: 500 },
    {
      contentRotateY: 0,
      ...spreadCenter(),
      duration: 500,
      delay: (i, n) => (n - i) * 50,
      zIndex: i => i,
    },
  ],
});

cardistry({
  target: ".example.fan",
  loop: true,
  states: [
    stack(),
    {
      transformOrigin: "50% 200%",
      rotateZ: (_, n) => (0.5 - n / 2) * 6,
      delay: 500,
      duration: 500,
    },
    {
      transformOrigin: "50% 200%",
      rotateZ: (i, n) => (i + 0.5 - n / 2) * 6,
      duration: 500,
    },
    {
      transformOrigin: "50% 200%",
      rotateZ: 0,
      duration: 500,
      delay: 700,
    },
  ],
});

cardistry({
  target: ".example.rotate",
  loop: true,
  states: [
    {
      ...stack(),
      duration: 700,
      delay: 500,
    },
    {
      ...spreadCenter(400, 40),
      rotateZ: (i, n) => -90 + i * (360 / (n - 1)),
      duration: 1000,
    },
  ],
});

cardistry({
  target: ".example.hover-flip",
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

cardistry({
  target: ".example.wave",
  loop: true,
  states: [
    {
      contentRotateY: 180,
      translateX: (i, n) => (i + 0.5 - n / 2) * 25,
      translateY: i => Math.sin(i / 3) * 100,
      timing: "linear",
    },
    {
      contentRotateY: 180,
      translateX: (i, n) => (i + 0.5 - n / 2) * 25,
      translateY: i => Math.cos(i / 3) * 100,
      timing: "linear",
    },
    {
      contentRotateY: 180,
      translateX: (i, n) => (i + 0.5 - n / 2) * 25,
      translateY: i => Math.sin(i / 3 + Math.PI) * 100,
      timing: "linear",
    },
    {
      contentRotateY: 180,
      translateX: (i, n) => (i + 0.5 - n / 2) * 25,
      translateY: i => Math.cos(i / 3 + Math.PI) * 100,
      timing: "linear",
    },
  ],
});

cardistry({
  target: ".example.waterfall",
  loop: true,
  states: [
    {
      delay: 1000,
      translateY: -270,
      rotateZ: 90,
    },
    {
      translateX: i => (i % 2 === 0 ? -100 : 100),
      translateY: -270,
      delay: 500,
      rotateZ: 90,
    },
    {
      translateY: 270,
      delay: (i, n) => (n - i) * 70,
      rotateZ: i => (i % 2 === 0 ? 180 : 0),
      duration: 1000,
      timing: "ease-in-out",
    },
  ],
});

// WIP: drag and drop
// cardistry({
//   target: ".example.drag-n-drop",
//   states: [spreadCenter()],
// });

// const deck = document.querySelector(".example.drag-n-drop");
// const cards = deck.querySelectorAll(".card");

// deck.ondragover = e => {
//   e.preventDefault();
//   const card = deck.querySelector(".dragging");
//   const box = card.getBoundingClientRect();
//   // console.log(box);
// };

// cards.forEach(card => {
//   card.ondragstart = e => {
//     e.target.classList.add("dragging");
//   };
//   card.ondragend = e => {
//     e.target.classList.remove("dragging");
//   };
// });
