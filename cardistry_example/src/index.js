import { play, setupCards, build } from "cardistry";

const spreadLeft = () => ({
  translateX: i => i * -25,
});

const spreadRight = () => ({
  translateX: i => i * 25,
  duration: 500,
  delay: 500,
});

const stack = () => ({
  translateX: 0,
  translateY: 0,
  rotateZ: 0,
  duration: 500,
  delay: 500,
});

const disperse = () => ({
  translateX: () => Math.random() * 200 - 100,
  translateY: () => Math.random() * 200 - 100,
  rotateZ: () => Math.random() * 180 - 90,
  duration: 500,
  delay: i => i * 100,
});

const fan = () => ({
  transformOrigin: "50% 200%",
  rotateZ: i => i * 5 - 40,
  duration: 500,
  delay: 1000,
});

const flip = () => ({
  contentRotateY: 180,
  duration: 1000,
  delay: 500,
});

setupCards(".spread-x");

build({
  target: ".spread-x",
  loop: true,
  states: [
    stack(),
    fan(),
    stack(),
    spreadRight(),
    flip(),
    disperse(),
    spreadRight(),
    {
      translateY: 100,
      duration: 500,
      delay: (i, n) => (15 - i) * 100,
    },

    // {
    //   duration: 500,
    // },
    // {
    //   translateX: 0,
    //   rotateZ: 0,
    //   duration: 500,
    // },
    // {
    //   duration: 500,
    // },
    // translateX: i => i * -20,
    // rotateZ: i => i * 5,
    // duration: i => (15 - i) * 100,
    // delay: i => i * 75,
  ],
  // states: [
  //   {
  //     transition: { stagger: 0.5, duration: 500 },
  //     layouts: ["stack"],
  //     duration: 500,
  //     anchor: "center",
  //   },
  //   {
  //     transition: { stagger: 0.5, duration: 500 },
  //     layouts: ["spread-x"],
  //     hover: ["scale"],
  //     duration: 500,
  //     anchor: "center",
  //   },
  // ],
});

// play({
//   target: ".spread-x",
//   states: [
//     { layout: "stack", duration: 300 },

//     { stagger: 0.3, duration: 500 },
//     { layout: "spread-x", duration: 500, anchor: "center" },
//     { stagger: 0.8, duration: 500 },
//     { layout: "stack", duration: 500 },

//     { stagger: 0.5, duration: 500 },
//     { layout: "spread-x", duration: 500, anchor: "left" },
//     { stagger: 1, duration: 1000 },
//     { layout: "stack", duration: 500 },

//     { stagger: 0.5, duration: 500 },
//     { layout: "spread-x", duration: 500, anchor: "right" },
//     { stagger: 1, duration: 1000 },
//     { layout: "stack", duration: 500 },
//   ],
//   loop: true,
// });

/*
    do we want them to all play at the same time, or stagger them?
    if  we want to stagger, which card goes first? front or back?

    simple builder:
    preset animations, just play them, reset b4 each anim

    animation builder:
    specify deltas
    */
