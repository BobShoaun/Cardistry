class Example extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
      <h3 class="mb-0 font-bold text-lg">${this.getAttribute("title")}</h3>
      <p class="mb-2 text-sm">${this.getAttribute("subtitle")}</p>
      <section class="bg-table mb-10 shadow-inner overflow-hidden" style="height: ${
        this.getAttribute("height") ?? 30
      }rem">
        <div class="${this.getAttribute("type")}">
        </div>
      </section>
    `;
  }
}

customElements.define("app-example", Example);
