class Footer extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
      <footer class="footer">
        <p>Found a bug? Contribute by fixing it on GitHub</p>
        <strong>Made with ♥ by Bob Shoaun Ng</strong>
      </footer>
    `;
  }
}

customElements.define("app-footer", Footer);
