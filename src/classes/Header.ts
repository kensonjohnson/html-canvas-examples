class Header extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadow.innerHTML = /*html*/ `
    <header>
        <h1>Header</h1>
    </header>

    <style>
      header {
        background-color: #333;
        padding: 0;
        margin: 0;
      }
      h1 {
        color: white;
        margin: 0;
      }
    </style>
    `;
  }
}

customElements.define("app-header", Header);
