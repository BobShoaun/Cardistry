import cardistry from "../../cardistry";
import cardistry2 from "../../cardistry/test";
import Cardistry from "../../cardistry/test2";
import { stack, fan, spreadRight, flip, spreadLeft, disperse, spreadCenter } from "cardistry/presets";
import { setupCards } from "./helpers";

setupCards(".example.move", 1);
setupCards(".example.spread");
setupCards(".example.flip");
setupCards(".example.fan");
setupCards(".example.rotate");
setupCards(".example.hover-flip");
setupCards(".example.distribute");
setupCards(".example.wave", 30);
setupCards(".example.waterfall", 40);

const instance = new Cardistry({
  target: ".example.move",
  loop: true,
  relative: true,
  states: [
    {
      translateX: 250,
      translateY: -100,
    },
    {
      translateX: 250,
      translateY: 100,
    },
    {
      translateX: -250,
      translateY: -100,
    },
    {
      translateX: -250,
      translateY: 100,
    },
  ],
});

document.getElementById("play").onclick = () => {
  instance.play();
  instance2.play();
};

document.getElementById("pause").onclick = () => {
  instance.pause();
  instance2.pause();
};

document.getElementById("speed").onchange = e => {
  instance.speed = parseFloat(e.target.value);
  instance2.speed = parseFloat(e.target.value);
};

const instance2 = new Cardistry({
  target: ".example.spread",
  loop: true,
  states: [
    { ...stack(), delay: 500 },
    { ...spreadCenter(), duration: 700 },
    { ...stack(), delay: 500 },
    { ...spreadLeft(), duration: 700 },
    { ...stack(), delay: 500 },
    { ...spreadRight(), duration: 700 },
  ],
});

cardistry2({
  target: ".example.flip",
  loop: true,
  // relative: true,
  states: [
    // { ...spreadCenter(), duration: 700 },
    {
      contentRotateY: 0,
      ...spreadCenter(),
      duration: 2000,
      delay: i => i * 50,
      // zIndex: i => i,
      delay: 2000,
    },
    // { delay: 500 },
    {
      contentRotateY: 180,
      ...spreadCenter(),
      duration: 2000,
      zIndex: (i, n) => n - i,

      // delay: (i, n) => (n - i) * 50,
      // zIndex: i => i,
    },
  ],
});

// cardistry2({
//   target: ".example.flip",
//   loop: true,
//   relative: true,
//   states: [
//     { ...spreadCenter(), duration: 700 },
//     { ...flip(), ...spreadCenter(), duration: 500, delay: i => i * 50, zIndex: (i, n) => n - i },
//     { delay: 500 },
//     {
//       contentRotateY: 0,
//       ...spreadCenter(),
//       duration: 500,
//       delay: (i, n) => (n - i) * 50,
//       zIndex: i => i,
//     },
//   ],
// });

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

setupCards(".example.drag-n-drop-1", 2, true);
setupCards(".example.drag-n-drop-2", 2, true);

// WIP: drag and drop
function dnd() {
  cardistry({
    target: ".example.drag-n-drop-1",
    states: [spreadCenter(100, 50)],
  });

  cardistry({
    target: ".example.drag-n-drop-2",
    states: [spreadCenter(100, 50)],
  });
}
dnd();

// const deck = document.querySelector(".example.drag-n-drop-1");
// const cards = deck.querySelectorAll("app-card");

const containers = document.querySelectorAll(".drag-container");

// deck.ondragover = e => {
//   e.preventDefault();
//   const card = deck.querySelector(".dragging");
//   const box = card.getBoundingClientRect();
//   // console.log(box);
// };

let dragClone = null;

const initDragClone = (x, y) => {
  // dragClone.style = null;
  dragClone.style.transform = `translateX(${x}px) translateY(${y}px)`;
  dragClone.classList.add("drag-clone");
};

let timestamp = null;
let lastMouseX = null;
let lastMouseY = null;

const translateDragClone = (x, y) => {
  if (!dragClone) return;
  requestAnimationFrame(() => {
    if (!timestamp) {
      timestamp = Date.now();
      lastMouseX = x;
      lastMouseY = y;
      return;
    }

    const now = Date.now();
    const dt = Math.max(now - timestamp, 1);
    const dx = x - lastMouseX;
    const dy = y - lastMouseY;
    const speedX = Math.min(Math.max(dx / dt, -50), 50);
    const speedY = Math.min(Math.max(dy / dt, -50), 50);

    const skewAmount = 10;
    let skewDirection = 0;
    if ((speedX > 0 && speedY < 0) || (speedX < 0 && speedY > 0)) skewDirection = -1;
    else if ((speedX < 0 && speedY < 0) || (speedX > 0 && speedY > 0)) skewDirection = 1;

    dragClone.style.transform = `translateX(${x}px) translateY(${y}px) 
    skew(${skewAmount * skewDirection}deg)
    `;

    timestamp = now;
    lastMouseX = x;
    lastMouseY = y;
  });
};

containers.forEach(container => {
  const cards = container.querySelectorAll(".card");

  cards.forEach(card => {
    card.ondragenter = e => {};
    card.ondragstart = e => {
      dragClone = card.cloneNode(true);
      initDragClone(e.x, e.y);
      container.appendChild(dragClone);
      card.classList.add("dragging");
    };
    card.ondragend = e => {
      card.classList.remove("dragging");
      container.removeChild(dragClone);
      // dnd();
    };

    card.ondrag = e => {
      translateDragClone(e.clientX, e.clientY);
    };
  });

  container.ondragenter = e => {
    const dragging = document.querySelector(".dragging");
    container.appendChild(dragging);
    dnd();
  };

  container.ondragover = e => {
    e.preventDefault();
    return;

    const getOffset = child => {
      // child.querySelector(".card");
      const box = child.getBoundingClientRect();
      // console.log(box);
      const x = e.clientX - box.right + box.width / 2;
      const y = e.clientY - box.top - box.height;
      return { x, y };
    };

    const children = container.querySelectorAll(":scope > .card:not(.drag-clone, .dragging)");
    // console.log(children);

    let before = null;
    let after = null;

    // find closest child before and after dragging position
    for (const child of children) {
      const { x, y } = getOffset(child);
      // console.log(x);
      const closestBefore = before ? getOffset(before) : { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY };
      const closestAfter = after ? getOffset(after) : { x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY };

      // if (y > 0 || y < closestBefore.y) continue;
      if (x < 0 && x > closestBefore.x) before = child;
      if (x > 0 && x < closestAfter.x) after = child;
    }

    const dragging = document.querySelector(".dragging");
    if (before) before.before(dragging);
    if (after) after.after(dragging);
    // dnd();
  };
});
