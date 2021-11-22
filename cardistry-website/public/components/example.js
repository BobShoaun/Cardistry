class Example extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
      <h2 class="mb-1">${this.getAttribute("title")}</h2>
      <p class="mb-3">${this.getAttribute("subtitle")}</p>
      <section class="poker-table" style="flex-basis: 100%; margin-bottom: 5rem; height: ${
        this.getAttribute("height") ?? 30
      }rem">
        <app-deck type="${this.getAttribute("type")}" draggable="${this.getAttribute(
      "draggable"
    )}"></app-deck>
      </section>
    `;
  }
}

customElements.define("app-example", Example);
