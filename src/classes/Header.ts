import { headerLinks } from "../constants";

declare global {
  interface HTMLElementTagNameMap {
    "app-header": HeaderElement;
  }
}

type Link = {
  path: string;
  name: string;
};

class HeaderElement extends HTMLElement {
  shadow: ShadowRoot;
  #links: Link[];

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.#links = headerLinks;
    this.render();
  }

  get links() {
    return this.#links;
  }

  set links(value: Link[]) {
    this.#links = value;
    this.render();
  }

  render() {
    this.shadow.innerHTML = /*html*/ `
    <header>
        <h1>HTML Canvas Examples</h1>
        <nav>${
          this.#links.length > 0
            ? this.#links
                .map((link) => {
                  // find the active link from url
                  const isActive = window.location.pathname === link.path;
                  return `<a href="${link.path}" ${isActive ? 'class="active"' : ""}>${link.name}</a>`;
                })
                .join("")
            : ""
        }</nav>
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
        padding-left: 10px;
      }
      nav {
        margin: 0;
        padding: 10px;
        background-color: #444;
        display: flex;
        justify-content: start;
        gap: 10px;
        flex-wrap: wrap;
      }
      a {
        color: white;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      .active {
        color: lightskyblue;
      }
    </style>
    `;
  }
}

customElements.define("app-header", HeaderElement);
document.body.prepend(document.createElement("app-header"));
