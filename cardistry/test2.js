const linear = time => time;
const quad = time => Math.pow(time, 2);
const ease = time => {
  if (time <= 0.5) return 2 * time * time;
  time -= 0.5;
  return 2 * time * (1 - time) + 0.5;
};

class Cardistry {
  #speed;

  constructor({ target, states, loop = true, relative, autoplay = true }) {
    this.isPlaying = false;
    this.target = target;
    this.states = states;
    this.loop = loop;
    this.relative = relative;
    this.autoplay = autoplay;
    this.#speed = 1;
    this.initialize();
    if (autoplay) this.play();
  }

  initialize() {
    const hand = document.querySelector(this.target);
    if (!hand) return;
    this.cards = hand.querySelectorAll(".card");
    this.cardContents = [...this.cards].map(card => card.querySelector(".content"));
  }

  pause() {
    // this.#speed = 0;
    this.isPlaying = false;
  }

  stop() {
    this.isPlaying = false;
  }

  set speed(value) {
    this.#speed = Math.max(value, 0);
  }

  // https://javascript.info/js-animation
  async #animate({ timing, draw, duration, delay }) {
    await new Promise((resolve, reject) => setTimeout(resolve, delay / this.#speed));
    const start = performance.now();
    return new Promise((resolve, reject) => {
      const anim = time => {
        if (!this.isPlaying) return;
        // timeFraction goes from 0 to 1
        const normalizedTime = Math.min(((time - start) / duration) * this.#speed, 1);
        const progress = timing(normalizedTime);
        draw(progress);
        if (normalizedTime >= 1) return resolve();
        requestAnimationFrame(anim);
      };
      requestAnimationFrame(anim);
    });
  }

  async play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    const n = this.cards.length;

    while (this.loop && this.isPlaying)
      for (const state of this.states) {
        const animations = [];
        this.cards.forEach((card, i) => {
          const matrix = new DOMMatrixReadOnly(getComputedStyle(card).transform);
          const initialX = matrix.m41;
          const initialY = matrix.m42;

          // const { translateX = 0, translateY = 0, zIndex = 1, duration = 500, delay = 0 } = state;
          const duration = state.duration ?? 500;
          const xPosition = typeof state.translateX === "function" ? state.translateX(i, n) : state.translateX ?? 0;
          const yPosition = typeof state.translateY === "function" ? state.translateY(i, n) : state.translateY ?? 0;
          // const zIndex = typeof state.zIndex === "function" ? state.zIndex(i, cards.length) : state.zIndex ?? 1;
          const delay = typeof state.delay === "function" ? state.delay(i, n) : state.delay ?? 0;

          const animation = this.#animate({
            timing: ease,
            draw: progress => {
              card.style.transform = `translateX(${(xPosition - initialX) * progress + initialX}px)
          translateY(${(yPosition - initialY) * progress + initialY}px)`;
            },
            duration,
            delay,
          });
          animations.push(animation);
        });

        await Promise.all(animations);
      }
  }
}

const cardistry3 = ({ target, states, loop = true, relative, autoplay = true }) => {
  const hand = document.querySelector(target);
  if (!hand) return;

  const cards = hand.querySelectorAll(".card");
  const cardContents = [...cards].map(card => card.querySelector(".content"));

  let isPlaying = false;

  const play = async () => {
    if (isPlaying) return;
    isPlaying = true;
    while (loop)
      for (const state of states) {
        const animations = [];
        cards.forEach((card, i) => {
          const matrix = new DOMMatrixReadOnly(getComputedStyle(card).transform);
          const initialX = matrix.m41;
          const initialY = matrix.m42;

          // const { translateX = 0, translateY = 0, zIndex = 1, duration = 500, delay = 0 } = state;
          const duration = state.duration ?? 500;
          const xPosition =
            typeof state.translateX === "function" ? state.translateX(i, cards.length) : state.translateX ?? 0;
          const yPosition =
            typeof state.translateY === "function" ? state.translateY(i, cards.length) : state.translateY ?? 0;
          // const zIndex = typeof state.zIndex === "function" ? state.zIndex(i, cards.length) : state.zIndex ?? 1;
          const delay = typeof state.delay === "function" ? state.delay(i, cards.length) : state.delay ?? 0;

          animations.push(
            animate({
              timing: ease,
              draw: progress => {
                card.style.transform = `translateX(${(xPosition - initialX) * progress + initialX}px)
            translateY(${(yPosition - initialY) * progress + initialY}px)`;
              },
              duration,
              delay,
            })
          );
        });

        await Promise.all(animations);
      }
  };

  // https://javascript.info/js-animation
  const animate = async ({ timing, draw, duration, delay }) => {
    await new Promise((resolve, reject) => setTimeout(resolve, delay));
    const start = performance.now();
    return new Promise((resolve, reject) => {
      requestAnimationFrame(function animate(time) {
        if (!isPlaying) return;

        // timeFraction goes from 0 to 1
        const normalizedTime = Math.min((time - start) / duration, 1);

        const progress = timing(normalizedTime);

        draw(progress);

        // console.log("cardistry", normalizedTime);
        if (normalizedTime >= 1) return resolve();
        requestAnimationFrame(animate);
      });
    });
  };

  const pause = () => {
    isPlaying = false;
  };

  if (autoplay) play();

  return { play, pause };
};

export default Cardistry;
