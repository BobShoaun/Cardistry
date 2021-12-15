const animate2 = async (card, keyframes, totalDuration) => {
  console.log("DFSDF", keyframes);

  while (true) {
    for (let i = 0; i < keyframes.length; i++) {
      card.style.zIndex = keyframes[i].testIndex;
      const next = keyframes[(i + 1) % keyframes.length];
      await new Promise((resolve, reject) => setTimeout(resolve, (next.offset - keyframes[i].offset) * totalDuration));
    }
  }

  // keyframes.forEach(keyframe => {
  //   setTimeout(() => {
  //     card.style.zIndex = keyframe.testIndex;
  //   }, keyframe.offset * totalDuration);
  // });
};

// main function for animation
const cardistry2 = async ({ target, states, loop, relative }) => {
  const hand = document.querySelector(target);
  if (!hand) return;

  const cards = hand.querySelectorAll(".card");
  const cardContents = [...cards].map(card => card.querySelector(".content"));
  const cardProps = [...cards];

  // console.log(actualStates);
  // console.log(totalDuration);

  cards.forEach((card, i) => {
    // const style = getComputedStyle(card);
    // const matrix = new DOMMatrixReadOnly(style.transform);
    // const initialKeyframe = {
    //   transform: `translateX(${matrix.m41}px) translateY(${matrix.m42}px)`,
    // };

    const actualStates = states.map(({ translateX = 0, translateY = 0, zIndex = 1, duration = 500, delay = 0 }) => ({
      translateX: typeof translateX === "function" ? translateX(i, cards.length) : translateX,
      translateY: typeof translateY === "function" ? translateY(i, cards.length) : translateY,
      zIndex: typeof zIndex === "function" ? zIndex(i, cards.length) : zIndex,
      duration,
      delay: typeof delay === "function" ? delay(i, cards.length) : delay,
    }));

    const totalDuration = actualStates.reduce((total, { duration, delay }) => total + duration + delay, 0);

    const keyframes = [];

    let nextOffset = 0;
    actualStates.forEach(({ translateX, translateY, zIndex, delay }, j) => {
      // offsets duration, so current state duration is that time is takes to get TO that state
      const prev = actualStates[(j + 1) % actualStates.length];
      if (prev.delay > 0) {
        keyframes.push({
          transform: `translateX(${translateX}px) translateY(${translateY}px)`,
          // zIndex,
          testIndex: zIndex,
          offset: nextOffset,
        });
        nextOffset += prev.delay / totalDuration;
      }

      // console.log(zIndex);
      keyframes.push({
        transform: `translateX(${translateX}px) translateY(${translateY}px)`,
        // zIndex,
        testIndex: zIndex,
        offset: nextOffset,
        // easing: "ease",
      });
      nextOffset += prev.duration / totalDuration;

      // card.style.zIndex = zIndex;
    });

    // console.log(actualStates);
    // console.log(totalDuration);
    // console.log(keyframes);

    keyframes.push({ ...keyframes[0], offset: 1 });

    const instance = card.animate(keyframes, {
      iterations: Infinity,
      duration: totalDuration,
      fill: "forwards",
      // direction: "alternate",
      // easing: "ease",
    });

    // animate2(card, keyframes, totalDuration);

    instance.onfinish = () => console.log("fdfi");
  });

  cardContents.forEach((cardContent, i) => {
    const actualStates = states.map(({ contentRotateY = 0, zIndex = 1, duration = 500, delay = 0 }) => ({
      duration,
      zIndex: typeof zIndex === "function" ? zIndex(i, cards.length) : zIndex,
      delay: typeof delay === "function" ? delay(i, cards.length) : delay,
      contentRotateY,
    }));

    const totalDuration = actualStates.reduce((total, { duration, delay }) => total + duration + delay, 0);

    const keyframes = [];

    let nextOffset = 0;
    actualStates.forEach(({ contentRotateY, zIndex, delay }, j) => {
      if (delay > 0) {
        keyframes.push({ transform: `rotateY(${contentRotateY}deg)`, offset: nextOffset });
        nextOffset += delay / totalDuration;
      }
      // offsets duration, so current state duration is that time is takes to get TO that state
      const prev = actualStates[(j + 1) % actualStates.length];
      keyframes.push({
        transform: `rotateY(${contentRotateY}deg)`,
        offset: nextOffset,
        // zIndex,
        easing: "ease",
      });
      nextOffset += prev.duration / totalDuration;
    });

    cardContent.animate([...keyframes, { ...keyframes[0], offset: 1 }], {
      iterations: Infinity,
      duration: totalDuration,
      fill: "forwards",
    });
  });

  return;

  const resetCardProps = transitionPropsOnly => {
    cardProps.forEach(card => {
      card.duration = 200;
      card.delay = 0;
      card.timing = "ease";
      if (transitionPropsOnly) return;
      card.translateX = 0;
      card.translateY = 0;
      card.rotateX = 0;
      card.rotateY = 0;
      card.rotateZ = 0;
      card.scale = 1;
      card.zIndex = 1;
      card.transformOrigin = "50% 50%";
      card.contentRotateY = 0;
      card.contentRotateZ = 0;
      card.hoverScale = 1;
    });
  };

  resetCardProps();

  const apply = async state => {
    resetCardProps(relative);

    for (let i = 0; i < cards.length; i++) {
      const index = state.flip ? cards.length - i - 1 : i;

      for (const [prop, value] of Object.entries(state))
        cardProps[index][prop] = typeof value === "function" ? value(index, cards.length) : value;
    }

    const totalDurations = [];
    // for (let i = 0; i < cards.length; i++) {
    //   const {
    //     translateX,
    //     translateY,
    //     rotateX,
    //     rotateY,
    //     rotateZ,
    //     scale,
    //     zIndex,
    //     transformOrigin,
    //     contentRotateY,
    //     contentRotateZ,
    //     hoverScale,
    //     hover,
    //     focus,
    //     duration,
    //     delay,
    //     timing,
    //   } = cardProps[i];

    //   totalDurations[i] = delay + duration;
    //   cards[i].style.animationPlayState = "paused";

    //   requestAnimationFrame(() => {
    //     cards[i].style.zIndex = zIndex;
    //     cards[i].style.transitionDuration = `${duration}ms`;
    //     cards[i].style.transitionDelay = `${delay}ms`;
    //     cards[i].style.transitionTimingFunction = timing;
    //     cards[i].style.transformOrigin = transformOrigin;
    //     cards[i].style.transform = `translateX(${translateX}px)
    //                                 translateY(${translateY}px)
    //                                 rotateX(${rotateX}deg)
    //                                 rotateY(${rotateY}deg)
    //                                 rotateZ(${rotateZ}deg)
    //                                 scale(${scale})`;
    //     cardContents[i].style.transitionDuration = `${duration}ms`;
    //     cardContents[i].style.transitionDelay = `${delay}ms`;
    //     cardContents[i].style.transform = `rotateY(${contentRotateY}deg)
    //                                        rotateZ(${contentRotateZ}deg)`;
    //   });

    //   cards[i].onmouseover = () =>
    //     requestAnimationFrame(() => {
    //       cardContents[i].style.transform = `translateX(${hover?.translateX ?? 0}px)
    //   translateY(${hover?.translateY ?? 0}px)
    //   rotateY(${hover?.rotateY}deg)
    //   rotateZ(${contentRotateZ}deg)
    //   scale(${hover?.scale ?? 1})`;
    //     });

    //   cards[i].onmouseleave = () =>
    //     requestAnimationFrame(() => {
    //       cardContents[i].style.transform = `rotateY(${contentRotateY}deg)
    //       rotateZ(${contentRotateZ}deg)
    //       scale(${scale})`;
    //     });

    //   cards[i].onfocus = () =>
    //     requestAnimationFrame(() => {
    //       cardContents[i].style.transform = `translateX(${focus?.translateX ?? 0}px)
    //     translateY(${focus?.translateY ?? 0}px)
    //     rotateY(${focus?.rotateY}deg)
    //     rotateZ(${contentRotateZ}deg)
    //     scale(${focus?.scale ?? 1})`;
    //     });

    //   cards[i].onblur = () =>
    //     requestAnimationFrame(() => {
    //       cardContents[i].style.transform = `rotateY(${contentRotateY}deg)
    //     rotateZ(${contentRotateZ}deg)
    //     scale(${scale})`;
    //     });
    // }

    return new Promise((resolve, reject) => setTimeout(resolve, Math.max(...totalDurations)));
  };

  // await new Promise(resolve => setTimeout(resolve, 500)); // sleep

  if (typeof loop === "boolean") while (loop) for (const state of states) await apply(state);

  for (let i = loop ?? 0; i >= 0; i--) for (const state of states) await apply(state);
};

export default cardistry2;
