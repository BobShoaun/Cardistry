class Footer extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
      <footer class="footer">
        <p>Found a bug? Contribute by fixing it on GitHub</p>
        <strong>Made with <span class="heart">♥</span> by <a href="https://www.bobng.me/" target="_blank">Bob Shoaun Ng</a></strong>
      </footer>
    `;
  }
}

customElements.define("app-footer", Footer);
