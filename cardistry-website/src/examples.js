import Cardistry from "../../cardistry";
import { stack, spreadRight, spreadLeft, spreadCenter } from "../../cardistry/presets";

import { setupCards } from "./helpers";

const examples = [
  {
    name: "Move",
    description: "Animation of a card moving",
    numCards: 1,
    getInstance: () =>
      new Cardistry({
        target: ".example",
        loop: true,
        relative: true,
        autoplay: false,
        timing: "quad",
        states: [
          {
            moveX: 250,
            moveY: -100,
          },
          {
            moveY: 100,
          },
          {
            moveX: -250,
            moveY: -100,
          },
          {
            moveY: 100,
          },
        ],
      }),
    code: `new Cardistry({
  target: ".example",
  loop: true,
  relative: true,
  autoplay: false,
  timing: "quad",
  states: [
    {
      moveX: 250,
      moveY: -100,
    },
    {
      moveY: 100,
    },
    {
      moveX: -250,
      moveY: -100,
    },
    {
      moveY: 100,
    },
  ],
})`,
  },
  {
    name: "Spread",
    description: "Animation of spreading a deck of cards",
    numCards: 10,
    getInstance: () =>
      new Cardistry({
        target: ".example",
        loop: true,
        autoplay: false,
        timing: "quad",
        // relative: true,
        states: [
          { ...stack(), delay: 500 },
          { ...spreadCenter(), duration: 700 },
          { ...stack(), delay: 500 },
          { ...spreadLeft(), duration: 700 },
          { ...stack(), delay: 500 },
          { ...spreadRight(), duration: 700 },
        ],
      }),
    code: ``,
  },
  {
    name: "Flip",
    description: "Flipping each card in sequence",
    numCards: 10,
    getInstance: () =>
      new Cardistry({
        target: ".example",
        relative: true,
        autoplay: false,
        initialState: { ...spreadCenter(), order: i => i },
        states: [
          {
            flipY: 0,
            duration: 1000,
            delay: (i, n) => (n - i) * 50,
            order: i => i,
          },
          {
            flipY: 180,
            duration: 1000,
            delay: i => i * 50,
            order: (i, n) => n - i,
          },
        ],
      }),
    code: ``,
  },
  {
    name: "Fan",
    description: "Fanning the cards in sequence",
    numCards: 13,
    getInstance: () =>
      new Cardistry({
        target: ".example",
        loop: true,
        relative: true,
        autoplay: false,
        states: [
          {
            originY: 2,
            rotate: (_, n) => (0.5 - n / 2) * 6,
            delay: 500,
            duration: 500,
          },
          {
            rotate: (i, n) => (i + 0.5 - n / 2) * 6,
            duration: 500,
          },
          {
            rotate: 0,
            duration: 500,
            delay: 700,
          },
        ],
      }),
    code: ``,
  },
  {
    name: "Twist",
    description: "Rotating the cards in sequence",
    numCards: 13,
    getInstance: () =>
      new Cardistry({
        target: ".example",
        loop: true,
        autoplay: false,
        states: [
          {
            ...spreadCenter(40),
            rotate: (i, n) => -90 + i * (360 / (n - 1)),
            duration: 1000,
            delay: 500,
          },
          {
            ...stack(),
            duration: 700,
            delay: 500,
          },
        ],
      }),
    code: ``,
  },
  {
    name: "Distribute",
    description: "Animation of distributing cards to 4 players",
    numCards: 16,
    height: 50,
    getInstance: () =>
      new Cardistry({
        target: ".example",
        loop: true,
        autoplay: false,
        relative: true,
        states: [
          {
            flipY: 180,
            order: (i, n) => n - i,
            moveY: 0,
            moveX: 0,
            rotate: 0,
            delay: 0,
          },
          {
            moveX: (i, n) => (i % 4 === 0 || i % 4 === 2 ? 0 : i % 4 === 1 ? 300 : -300),
            moveY: i => (i % 4 === 1 || i % 4 === 3 ? 0 : i % 4 === 0 ? -300 : 300),
            delay: i => i * 200,
            duration: 500,
            order: (i, n) => i,
            rotate: () => Math.random() * 180,
          },
          {
            flipY: 0,
            delay: 500,
          },
          {
            delay: 2000,
          },
          {
            moveY: 0,
            moveX: 0,
            duration: 500,
          },
        ],
      }),
    code: ``,
  },
  {
    name: "Waterfall",
    description: "Animation of a card waterfall",
    numCards: 40,
    height: 50,
    getInstance: () =>
      new Cardistry({
        target: ".example",
        loop: true,
        autoplay: false,
        states: [
          {
            delay: 1000,
            moveY: -270,
            rotate: 90,
          },
          {
            moveX: i => (i % 2 === 0 ? -100 : 100),
            moveY: -270,
            delay: 500,
            rotate: 90,
          },
          {
            moveY: 270,
            delay: (i, n) => (n - i) * 70,
            rotate: i => (i % 2 === 0 ? 180 : 0),
            duration: 1000,
          },
        ],
      }),
    code: ``,
  },
  {
    name: "Wave",
    description: "A sine wave with cards",
    numCards: 30,
    height: 30,
    getInstance: () =>
      new Cardistry({
        target: ".example",
        loop: true,
        autoplay: false,
        timing: "linear",
        initialState: {
          flipY: 180,
          moveX: (i, n) => (i + 0.5 - n / 2) * 25,
          moveY: i => Math.sin(i / 3) * 100,
        },
        states: [
          {
            flipY: 180,
            moveX: (i, n) => (i + 0.5 - n / 2) * 25,
            moveY: i => Math.sin(i / 3) * 100,
            duration: 400,
          },
          {
            flipY: 180,
            moveX: (i, n) => (i + 0.5 - n / 2) * 25,
            moveY: i => Math.cos(i / 3) * 100,
            duration: 400,
          },
          {
            flipY: 180,
            moveX: (i, n) => (i + 0.5 - n / 2) * 25,
            moveY: i => Math.sin(i / 3 + Math.PI) * 100,
            duration: 400,
          },
          {
            flipY: 180,
            moveX: (i, n) => (i + 0.5 - n / 2) * 25,
            moveY: i => Math.cos(i / 3 + Math.PI) * 100,
            duration: 400,
          },
        ],
      }),
    code: ``,
  },
];

let currExampleIndex = 0;

let currInstance = null;

const setExample = example => {
  if (currInstance) currInstance.stop();
  setupCards(".example", example.numCards);
  currInstance = example.getInstance();
  currInstance.initialize();
  currInstance.speed = 1;
  currInstance.play();
  document.getElementById("code").innerText = example.code;
  document.getElementById("title").innerText = example.name;
  document.getElementById("description").innerText = example.description;
  document.getElementById("table").style.height = (example.height ?? 30) + "rem";
};

setExample(examples[currExampleIndex]);

document.getElementById("previous").onclick = () => {
  currExampleIndex--;
  if (currExampleIndex < 0) currExampleIndex = examples.length - 1;
  setExample(examples[currExampleIndex]);
};

document.getElementById("next").onclick = () => {
  currExampleIndex++;
  if (currExampleIndex >= examples.length) currExampleIndex = 0;
  setExample(examples[currExampleIndex]);
};

document.getElementById("play").onclick = () => {
  currInstance.play();
};

document.getElementById("pause").onclick = () => {
  currInstance.pause();
};

document.getElementById("stop").onclick = () => {
  currInstance.stop();
};

document.getElementById("speed").onchange = e => {
  currInstance.speed = parseFloat(e.target.value);
};
