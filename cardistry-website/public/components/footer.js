class Footer extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /*html*/ `
      <footer class="text-center bg-neutral-100 border-t-[1px] p-10 border-neutral-500">
        <p class="mb-7 text-sm text-neutral-700">
        Found a bug? Contribute by fixing it on GitHub
        </p>
        <strong class="text-xs">Made with <span class="text-red-600 text-lg mx-0.5">♥</span> by <a href="https://www.bobng.me/" target="_blank">Bob Shoaun Ng</a></strong>
      </footer>
    `;
  }
}

customElements.define("app-footer", Footer);
