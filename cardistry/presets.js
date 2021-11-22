// preset animations
export const spreadLeft = () => ({
  translateX: i => i * -25,
});

export const spreadRight = () => ({
  translateX: i => i * 25,
});

export const spreadCenter = (duration = 200) => ({
  translateX: (i, n) => (i + 0.5 - n / 2) * 25,
  duration,
});

export const stack = () => ({
  translateX: 0,
  translateY: 0,
  rotateZ: 0,
  duration: 300,
  // delay: i => i * 100,
  // transformOrigin: "50% 50%",
});

export const disperse = (amount = 200) => ({
  translateX: () => Math.random() * amount - amount / 2,
  translateY: () => Math.random() * amount - amount / 2,
  rotateZ: () => Math.random() * 180 - 90,
  duration: 500,
  delay: (i, n) => (n - i) * 100,
});

export const fan = (angle = 5) => ({
  transformOrigin: "50% 200%",
  rotateZ: (i, n) => (i + 0.5 - n / 2) * angle,
  duration: 500,
});

export const flip = () => ({
  contentRotateY: 180,
  duration: 400,
});
