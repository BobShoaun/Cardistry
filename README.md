# Cardistry

An expressive and versatile card animation engine, for animating cards or card-like visuals in your website.

It provides an easy and intuitive API for developers to animate a group of cards, and allows them to specify a sequence of animations to play for a group of cards.

## Documentation

For full documentation, visit [cardistry.herokuapp.com](https://cardistry.herokuapp.com/documentation.html).

### Installation

- Run `npm install cardistry`
- Run `yarn add cardistry`

### Basic Usage

Setup a simple hello world example to get you up and running.
Import the library as an ES6 module.

```
import Cardistry from 'cardistry';
```

Setup your HTML with cards to be animated.

```
<section class="example-cards">
  <div class="card"> <div class="content"> </div> </div>
  <div class="card"> <div class="content"> </div> </div>
  <div class="card"> <div class="content"> </div> </div>
  <div class="card"> <div class="content"> </div> </div>
</section>
```

Use the Cardistry state machine to animate the group of cards.

```
new Cardistry({
  target: ".example-cards",
  loop: true,
  states: [
    { moveX: 250, moveY: -100 },
    { moveY: 100 },
    { moveX: -250, moveY: -100 },
    { moveY: 100 }
  ]
});
```
