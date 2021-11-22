class Deck extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = /*html*/ `
      <div class="${this.getAttribute("type")}">
        <div class="card playing-card" draggable="${this.getAttribute("draggable")}">
          <div class="content">
            <div class="front">
              <div class="top-left">
                <p class="rank">A</p>
                <p class="suit">♥</p>
              </div>
              <div class="bottom-right">
                <p class="rank">A</p>
                <p class="suit">♥</p>
              </div>
              <p class="center-rank">♥</p>
            </div>
            <div class="back">
              <img src="images/card-back.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("app-deck", Deck);
