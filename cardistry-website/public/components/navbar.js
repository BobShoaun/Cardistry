class Navbar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* html */ `
      <nav class="fixed h-14 top-0 right-0 shadow-md left-0 z-50 bg-neutral-100 border-b-[1px] border-neutral-500">
        <ul class="flex items-center gap-6 -container mx-auto px-10 py-3.5">
          <li class="mr-auto">
            <a class="italic text-xl" href=".">♠ Cardistry</a>
            <span class="text-xs text-neutral-600 ml-2">v1.0.1</span>
          </li>
          <li class="text-sm hover:underline underline-offset-2"><a href=".">Home</a></li>
          <li class="text-sm hover:underline underline-offset-2"><a href="examples.html">Examples</a></li>
          <li class="text-sm hover:underline underline-offset-2"><a href="documentation.html">Documentation</a></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define("app-navbar", Navbar);
