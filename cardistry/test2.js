const linear = t => t;
const quad = t => t * t;
const easeIn = t => t * t * t;
const easeOut = t => 1 - Math.pow(1 - t, 3);
const ease = t => {
  if (t <= 0.5) return 2 * t * t;
  t -= 0.5;
  return 2 * t * (1 - t) + 0.5;
};

const elastic = t => {
  const c4 = (2 * Math.PI) / 3;
  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

const bounce = t => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
  else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
  return n1 * (t -= 2.625 / d1) * t + 0.984375;
};

class Cardistry {
  #speed;

  constructor({
    target,
    initialState = {
      translateX: 0,
      translateY: 0,
      rotateZ: 0,
      scale: 1,
      originX: 0.5,
      originY: 0.5,
      zIndex: 1,
      contentRotateY: 0,
    },
    states,
    loop = true,
    relative = false,
    autoplay = true,
    timing = ease,
    pauseWhenNotInView = true,
  }) {
    this.target = target;
    this.initialState = initialState;
    this.states = states;
    this.loop = loop;
    this.relative = relative;
    this.autoplay = autoplay;
    this.#speed = 1;
    this.status = "stopped"; // playing, paused, stopped
    this.timing = this.getTiming(timing);
    this.initialize();
    if (autoplay) this.play();
  }

  isInViewport() {
    const rect = this.parent.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  initialize() {
    this.parent = document.querySelector(this.target);
    if (!this.parent) return;
    this.cards = this.parent.querySelectorAll(".card");
    this.cardContents = [...this.cards].map(card => card.querySelector(".content"));
    const {
      translateX = 0,
      translateY = 0,
      rotateZ = 0,
      scale = 1,
      originX = 0.5,
      originY = 0.5,
      zIndex = 1,
      contentRotateY = 0,
    } = this.initialState;

    const n = this.cards.length;

    requestAnimationFrame(() => {
      for (let i = 0; i < n; i++) {
        const getValue = prop => (typeof prop === "function" ? prop(i, n) : prop);

        this.cards[i].style.transformOrigin = `${getValue(originX) * 100}% ${getValue(originY) * 100}%`;
        this.cards[i].style.zIndex = getValue(zIndex);
        this.cards[i].style.transform = `translateX(${getValue(translateX)}px)
        translateY(${getValue(translateY)}px)
        rotateZ(${getValue(rotateZ)}deg), scale(${getValue(scale)})`;
        this.cardContents[i].style.transform = `rotateY(${getValue(contentRotateY)}deg)`;
      }
    });
  }

  pause() {
    this.status = "paused";
  }

  stop() {
    this.status = "stopped";
  }

  set speed(value) {
    this.#speed = Math.max(value, 0);
  }

  // https://javascript.info/js-animation
  async #animate({ timing, draw, duration, delay }) {
    await new Promise(resolve => setTimeout(resolve, delay / this.#speed));
    return new Promise((resolve, reject) => {
      let prevTime = performance.now();
      let totalTime = 0;
      const frame = time => {
        if (!this.isInViewport()) {
          this.status = "paused";
        } else this.status = "playing";
        if (this.status === "stopped") return resolve();

        const deltaTime = time - prevTime;
        totalTime += deltaTime * (this.status === "paused" ? 0 : this.#speed);
        prevTime = time;

        // normalizedTime goes from 0 to 1
        const normalizedTime = Math.min(totalTime / duration, 1);
        const progress = timing(normalizedTime);
        draw(progress);
        requestAnimationFrame(frame);
        if (normalizedTime >= 1) return resolve();
      };
      requestAnimationFrame(frame);
    });
  }

  getTiming(timingInput) {
    if (!timingInput) return null;
    if (typeof timingInput === "function") return timingInput;
    switch (timingInput) {
      case "linear":
        return linear;
      case "ease":
        return ease;
      case "quad":
        return quad;
      case "ease-in":
        return easeIn;
      case "ease-out":
        return easeOut;
      case "elastic":
        return elastic;
      case "bounce":
        return bounce;
      default:
        console.error("invalid timing input for state");
    }
  }

  async play() {
    if (this.status === "paused") {
      this.status = "playing";
      return;
    }
    if (this.status !== "stopped") return; // avoid multiple instances
    this.status = "playing";
    const n = this.cards.length;

    const prevStateCards = new Array(n);
    for (let i = 0; i < n; i++) prevStateCards[i] = { ...this.initialState };

    for (let k = typeof this.loop === "boolean" ? Infinity : this.loop; this.status !== "stopped" && k; k--) {
      for (const state of this.states) {
        const animations = [];

        for (let i = 0; i < n; i++) {
          const getValue = propName =>
            typeof state[propName] === "function" ? state[propName](i, n) : state[propName];
          const getValueRelative = propName =>
            getValue(propName) ?? (this.relative ? prevStateCards[i][propName] : null);

          const { duration = 500 } = state;
          const _translateX = getValueRelative("translateX") ?? 0;
          const _translateY = getValueRelative("translateY") ?? 0;
          const _rotateZ = getValueRelative("rotateZ") ?? 0;
          const _scale = getValueRelative("scale") ?? 1;
          const _originX = getValueRelative("originX") ?? 0.5;
          const _originY = getValueRelative("originY") ?? 0.5;
          const _zIndex = getValueRelative("zIndex") ?? 1;
          const _contentRotateY = getValueRelative("contentRotateY") ?? 0;

          const _delay = getValue("delay") ?? 0;
          const _timing = this.getTiming(state.timing) ?? this.timing;

          const _prevState = { ...prevStateCards[i] };

          const animation = this.#animate({
            timing: _timing,
            draw: progress => {
              this.cards[i].style.transformOrigin = `${_originX * 100}% ${_originY * 100}%`;
              if (progress >= 0.5) {
                this.cards[i].style.zIndex = _zIndex;
              }
              this.cards[i].style.transform = `translateX(${
                (_translateX - _prevState.translateX) * progress + _prevState.translateX
              }px)
          translateY(${(_translateY - _prevState.translateY) * progress + _prevState.translateY}px) rotateZ(${
                (_rotateZ - _prevState.rotateZ) * progress + _prevState.rotateZ
              }deg) scale(${(_scale - _prevState.scale) * progress + _prevState.scale})`;
              this.cardContents[i].style.transform = `rotateY(${
                (_contentRotateY - _prevState.contentRotateY) * progress + _prevState.contentRotateY
              }deg)`;
            },
            duration,
            delay: _delay,
          });
          animations.push(animation);

          prevStateCards[i].translateX = _translateX;
          prevStateCards[i].translateY = _translateY;
          prevStateCards[i].rotateZ = _rotateZ;
          prevStateCards[i].scale = _scale;
          prevStateCards[i].originX = _originX;
          prevStateCards[i].originY = _originY;
          prevStateCards[i].contentRotateY = _contentRotateY;
          prevStateCards[i].zIndex = _zIndex;
        }

        await Promise.all(animations);
      }
    }
  }
}

export default Cardistry;
