class Deck extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = /*html*/ `
      <div class="${this.getAttribute("type")}">
       
      </div>
    `;
  }
}

customElements.define("app-deck", Deck);
