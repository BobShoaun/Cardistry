// preset animations
export const spreadLeft = (amount = 25) => ({
  moveX: i => i * -amount,
});

export const spreadRight = (amount = 25) => ({
  moveX: i => i * amount,
});

export const spreadCenter = (amount = 25) => ({
  moveX: (i, n) => (i + 0.5 - n / 2) * amount,
});

export const stack = () => ({
  moveX: 0,
  moveY: 0,
  rotate: 0,
  duration: 300,
});

export const disperse = (amount = 200) => ({
  moveX: () => Math.random() * amount - amount / 2,
  moveY: () => Math.random() * amount - amount / 2,
  rotate: () => Math.random() * 180 - 90,
  duration: 400,
  delay: (i, n) => (n - i) * 100,
});

export const fan = (angle = 5) => ({
  originY: 2,
  rotate: (i, n) => (i + 0.5 - n / 2) * angle,
});

export const flip = () => ({
  flipY: 180,
  duration: 400,
});
