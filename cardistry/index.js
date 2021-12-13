// main function for animation
const cardistry = async ({ target, states, loop, relative }) => {
  const hand = document.querySelector(target);
  if (!hand) return;

  const cards = hand.querySelectorAll(".card");
  const cardContents = [...cards].map(card => card.querySelector(".content"));
  const cardProps = [...cards];

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

  const getValue = value => (typeof value === "function" ? value(i, cards.length) : value);

  const apply = async state => {
    resetCardProps(relative);

    for (let i = 0; i < cards.length; i++) {
      const index = state.flip ? cards.length - i - 1 : i;

      for (const [prop, value] of Object.entries(state))
        cardProps[index][prop] = typeof value === "function" ? value(index, cards.length) : value;
    }

    const totalDurations = [];
    for (let i = 0; i < cards.length; i++) {
      const {
        translateX,
        translateY,
        rotateX,
        rotateY,
        rotateZ,
        scale,
        zIndex,
        transformOrigin,
        contentRotateY,
        contentRotateZ,
        hoverScale,
        hover,
        focus,
        duration,
        delay,
        timing,
      } = cardProps[i];

      totalDurations[i] = delay + duration;

      requestAnimationFrame(() => {
        cards[i].style.zIndex = zIndex;
        cards[i].style.transitionDuration = `${duration}ms`;
        cards[i].style.transitionDelay = `${delay}ms`;
        cards[i].style.transitionTimingFunction = timing;
        cards[i].style.transformOrigin = transformOrigin;
        cards[i].style.transform = `translateX(${translateX}px)
                                    translateY(${translateY}px)
                                    rotateX(${rotateX}deg)
                                    rotateY(${rotateY}deg)
                                    rotateZ(${rotateZ}deg)
                                    scale(${scale})`;
        cardContents[i].style.transitionDuration = `${duration}ms`;
        cardContents[i].style.transitionDelay = `${delay}ms`;
        cardContents[i].style.transform = `rotateY(${contentRotateY}deg)
                                           rotateZ(${contentRotateZ}deg)`;
      });

      cards[i].onmouseover = () =>
        requestAnimationFrame(() => {
          cardContents[i].style.transform = `translateX(${hover?.translateX ?? 0}px) 
      translateY(${hover?.translateY ?? 0}px)
      rotateY(${hover?.rotateY}deg) 
      rotateZ(${contentRotateZ}deg) 
      scale(${hover?.scale ?? 1})`;
        });

      cards[i].onmouseleave = () =>
        requestAnimationFrame(() => {
          cardContents[i].style.transform = `rotateY(${contentRotateY}deg) 
          rotateZ(${contentRotateZ}deg) 
          scale(${scale})`;
        });

      cards[i].onfocus = () =>
        requestAnimationFrame(() => {
          cardContents[i].style.transform = `translateX(${focus?.translateX ?? 0}px) 
        translateY(${focus?.translateY ?? 0}px)
        rotateY(${focus?.rotateY}deg) 
        rotateZ(${contentRotateZ}deg) 
        scale(${focus?.scale ?? 1})`;
        });

      cards[i].onblur = () =>
        requestAnimationFrame(() => {
          cardContents[i].style.transform = `rotateY(${contentRotateY}deg) 
        rotateZ(${contentRotateZ}deg) 
        scale(${scale})`;
        });
    }

    return new Promise((resolve, reject) => setTimeout(resolve, Math.max(...totalDurations)));
  };

  // await new Promise(resolve => setTimeout(resolve, 500)); // sleep

  if (typeof loop === "boolean") while (loop) for (const state of states) await apply(state);

  for (let i = loop ?? 0; i >= 0; i--) for (const state of states) await apply(state);
};

export default cardistry;
