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

setupCards(".example.main");

cardistry({
  target: ".example.main",
  loop: true,
  // relative: true,
  states: [
    {
      delay: 500,
    },
    {
      ...spreadCenter(500),
      delay: 500,
    },
    {
      delay: 500,
      ...fan(),
    },
    {
      delay: 700,
      translateY: (i, n) => (i + 0.5 - n / 2) * 20,
      translateX: (i, n) => (i + 0.5 - n / 2) * 25,
      duration: 400,
    },
    {
      delay: 400,
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
    {
      contentRotateY: 180,
      delay: 500,
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
