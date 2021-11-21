class Navbar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* html */ `
      <nav class="navbar">
        <ul>
          <li>
            <a href="">Cardistry</a>
            <span>v 0.2.0a</span>
          </li>
          <li><a href="/">Home</a></li>
          <li><a href="/examples.html">Examples</a></li>
          <li><a href="/documentation.html">Documentation</a></li>
          <li><a href="/presets.html">Presets</a></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define("app-navbar", Navbar);
