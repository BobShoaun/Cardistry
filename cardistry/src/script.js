// NOT USED, left for reference.

export const play = ({ target, states, loop }) => {
  const hand = document.querySelector(target);

  if (!hand) return;

  const cards = hand.querySelectorAll(".card");
  const cardProps = [...cards].map(() => ({
    translateX: 0,
    translateY: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    zIndex: 1,
    transformOrigin: "50% 50%",
    contentRotateY: 0,
    contentRotateZ: 0,
    hoverScale: 1,
  }));

  const applyLayout = (state, transition) => {
    // console.log(state.layout, transition);
    const delay = transition.stagger
      ? (transition.duration / cards.length) * transition.stagger
      : 0;
    const duration = transition.duration - (cards.length - 1) * delay;

    cardProps.forEach(card => {
      // card.translateX = 0;
      // card.translateY = 0;
      // card.rotateZ = 0;
      // card.transformOrigin = "50% 50%";
      // card.contentRotateY = 0;
      card.contentRotateZ = 0;
    });

    switch (state.layout) {
      case "stack":
        cardProps.forEach(card => {
          card.translateX = 0;
          card.translateY = 0;
          card.rotateZ = 0;
        });
        break;
      case "spread-x": {
        const spacing = 50;
        const totalWidth = (cards.length - 1) * spacing;
        let initialX = 0;
        if (state.anchor === "right") initialX = -totalWidth;
        else if (state.anchor === "center") initialX = -totalWidth / 2;

        cardProps.forEach((card, i) => {
          card.translateX = initialX + spacing * i;
          card.rotateZ = 0;
        });
        break;
      }
      case "spread-y":
        cardProps.forEach((card, i) => {
          card.translateY = 50 * i;
          card.rotateZ = 0;
        });
        break;
      case "rotate-x": {
        const spacing = 50;
        const totalWidth = (cards.length - 1) * spacing;
        const rotation = 180 / (cardProps.length - 1);

        let initialX = 0;
        if (state.anchor === "right") initialX = -totalWidth;
        else if (state.anchor === "center") initialX = -totalWidth / 2;

        // let initialRotation = 0;
        // if (state.anchor === "right") initialRotation = -arcAngle;
        // else if (state.anchor === "center") initialRotation = -arcAngle / 2;

        cardProps.forEach((card, i) => {
          card.translateX = initialX + spacing * i;
          card.contentRotateZ = rotation * i;
        });
        break;
      }
      case "fan": {
        const arcAngle = 120;
        const arcLength = 2;
        const rotation = arcAngle / (cardProps.length - 1);

        let initialRotation = 0;
        if (state.anchor === "right") initialRotation = -arcAngle;
        else if (state.anchor === "center") initialRotation = -arcAngle / 2;

        cardProps.forEach((card, i) => {
          card.translateX = 0;
          card.translateY = 0;
          card.transformOrigin = `50% ${arcLength * 100}%`;
          card.rotateZ = initialRotation + rotation * i;
        });

        break;
      }
      case "snake": {
        let rotation = 0;
        cardProps.forEach((card, i) => {
          card.rotateZ = rotation;
          if (i < cardProps.length / 2) {
            card.transformOrigin = "50% 100%";
          } else {
            card.transformOrigin = "50% 100%";
            card.translateY = 300;
            rotation = 0;
          }
          rotation += 30;
        });

        break;
      }
      case "flip-x":
        cardProps.forEach((card, i) => {
          const flipped = card.contentRotateY === 180;
          card.contentRotateY = flipped ? 0 : 180;
          card.zIndex = flipped ? cardProps.length - i : 0;
        });
        break;
      case "spread-xy": {
        // const radius = 8;
        const f = x => {
          return x;
        };

        const spacing = 25;
        const totalWidth = (cards.length - 1) * spacing;
        let initialX = 0;
        if (state.anchor === "right") initialX = -totalWidth;
        else if (state.anchor === "center") initialX = -totalWidth / 2;

        cardProps.forEach((card, i) => {
          card.translateX = initialX + spacing * i;
          card.translateY = initialX + spacing * i;
          card.rotateZ = 0;
        });
        break;
      }
      case "hover": {
        cardProps.forEach(card => {
          card.hoverScale = 1.1;
        });
        break;
      }
      default:
        return;
    }
    cards.forEach((card, i) => {
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
      } = cardProps[i];
      card.style.transformOrigin = transformOrigin;
      card.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
      card.style.transitionDelay = `${i * delay}ms`;
      card.style.transitionDuration = `${duration}ms`;
      card.style.zIndex = zIndex;

      const cardContent = card.querySelector(".content");
      cardContent.style.transform = `rotateY(${contentRotateY}deg) rotateZ(${contentRotateZ}deg)`;
      cardContent.style.transitionDuration = `${duration}ms`;
      cardContent.style.transitionDelay = `${i * delay}ms`;

      card.onmouseover = () => {
        card.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${hoverScale})`;
      };

      card.onmouseleave = () => {
        card.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
      };

      // setTimeout(() => {
      // }, i * delay);
    });
  };

  const timeouts = [];
  const intervals = [];

  applyLayout(states[0], { stagger: false, duration: 0 }); // set initial layout
  let elapsedDuration = states[0].duration;

  const totalDuration = states.reduce((prev, state) => prev + state.duration, 0);

  for (let i = 1; i < states.length; i += 2) {
    const transition = states[i];
    const state = states[i + 1];
    timeouts.push(
      setTimeout(() => {
        if (loop) intervals.push(setInterval(() => applyLayout(state, transition), totalDuration));
        applyLayout(state, transition);
      }, elapsedDuration)
    );
    elapsedDuration += state.duration + transition.duration;
  }

  const cancel = () => {
    intervals.forEach(clearInterval);
    timeouts.forEach(clearTimeout);
  };

  return { cancel };
};
