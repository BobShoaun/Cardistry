import cardistry from "../../cardistry/test";
import { stack, fan, spreadRight, flip, spreadLeft, disperse, spreadCenter } from "cardistry/presets";

import { setupCards } from "./helpers";

setupCards(".example.main");

cardistry({
  target: ".example.main",
  loop: true,
  // relative: true,
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
      delay: 700,
      translateY: (i, n) => (i + 0.5 - n / 2) * 20,
      translateX: (i, n) => (i + 0.5 - n / 2) * 25,
      duration: 300,
    },
    {
      delay: 200,
      duration: 400,
      translateY: (i, n) => (i + 0.5 - n / 2) * -20,
      translateX: (i, n) => (i + 0.5 - n / 2) * -25,
    },
    {
      delay: i => i * 50,
      translateX: (i, n) => (i + 0.5 - n / 2) * -25,
    },
    {
      ...flip(),
      translateX: (i, n) => (i + 0.5 - n / 2) * -25,
      delay: i => i * 50,
      zIndex: (i, n) => n - i,
    },
    // {
    //   rotateZ: (i, n) => (i + 0.5 - n / 2) * -20,
    //   translateX: (i, n) => (i + 0.5 - n / 2) * -25,
    //   delay: 500,
    //   contentRotateY: 180,
    // },
    {
      contentRotateY: 180,
      delay: 700,
    },
    {
      contentRotateY: 180,
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
