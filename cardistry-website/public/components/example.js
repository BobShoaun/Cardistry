class Example extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
      <h3 class="mb-1">${this.getAttribute("title")}</h3>
      <p class="mb-3">${this.getAttribute("subtitle")}</p>
      <section class="poker-table mb-8" style="flex-basis: 100%; height: ${
        this.getAttribute("height") ?? 30
      }rem">
        <div class="${this.getAttribute("type")}">
        </div>
      </section>
    `;
  }
}

customElements.define("app-example", Example);
