class Card extends HTMLElement {
  constructor() {
    super();

    const suit = this.getAttribute("suit") || "♥";
    const rank = this.getAttribute("rank") || "A";
    const color = suit === "♥" || suit === "♦" ? "red" : "black";
    const draggable = this.getAttribute("draggable") || false;

    this.innerHTML = /*html*/ `
      <div class="card playing-card ${color}" draggable="${draggable}">
        <div class="content">
          <div class="front">
            <div class="top-left">
              <p class="rank">${rank}</p>
              <p class="suit">${suit}</p>
            </div>
            <div class="bottom-right">
              <p class="rank">${rank}</p>
              <p class="suit">${suit}</p>
            </div>
            <p class="center-suit">${suit}</p>
          </div>
          <div class="back" draggable="false">
            <img src="images/card-back.png" alt="" />
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("app-card", Card);
