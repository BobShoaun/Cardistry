// import cardistry from "../../cardistry";
import Cardistry from "../../cardistry/test2";

import { stack, fan, spreadRight, flip, spreadLeft, disperse, spreadCenter } from "../../cardistry/presets";

import { setupCards } from "./helpers";

setupCards(".example.main");

new Cardistry({
  target: ".example.main",
  loop: true,
  // relative: true,
  // timing: "linear",
  states: [
    {
      delay: 700,
    },
    {
      ...spreadCenter(500),
      delay: 500,
    },
    {
      delay: 500,
      ...fan(7),
    },
    {
      delay: 500,
      rotate: 0,
      originY: 2,
      duration: 300,
    },
    {
      delay: 100,
      moveY: (i, n) => (i + 0.5 - n / 2) * 20,
      moveX: (i, n) => (i + 0.5 - n / 2) * 25,
      duration: 300,
    },
    {
      delay: 200,
      duration: 400,
      moveY: (i, n) => (i + 0.5 - n / 2) * -20,
      moveX: (i, n) => (i + 0.5 - n / 2) * -25,
    },
    {
      delay: i => i * 50 + 100,
      moveX: (i, n) => (i + 0.5 - n / 2) * -25,
      duration: 200,
    },
    {
      ...flip(),
      moveX: (i, n) => (i + 0.5 - n / 2) * -25,
      delay: i => i * 50,
      order: (i, n) => n - i,
    },
    // {
    //   rotateZ: (i, n) => (i + 0.5 - n / 2) * -20,
    //   translateX: (i, n) => (i + 0.5 - n / 2) * -25,
    //   delay: 500,
    //   contentRotateY: 180,
    // },
    {
      flipY: 180,
      order: (i, n) => n - i,
      delay: 400,
    },
    {
      delay: 100,
      flipY: 180,
      duration: 100,
    },
    {
      flipY: 180,
      ...disperse(500),
    },
  ],
});

/*
    do we want them to all play at the same time, or stagger them?
    if  we want to stagger, which card goes first? front or back?

    simple builder:
    preset animations, just play them, reset b4 each anim

    animation builder:
    specify deltas
    */
