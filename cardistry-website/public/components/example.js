class Example extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
      <h3 class="mb-1" style="margin-top: 3rem">${this.getAttribute("title")}</h3>
      <p class="mb-3">${this.getAttribute("subtitle")}</p>
      <section class="poker-table" style="flex-basis: 100%; margin-bottom: 3rem; height: ${
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
