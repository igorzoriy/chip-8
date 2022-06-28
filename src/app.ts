import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { ChipController } from "./ChipController";

@customElement("ch-app")
export class App extends LitElement {
  static styles = [
    css`
      :host {
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr 3fr;
        grid-template-rows: auto;
        grid-template-areas:
          "header header"
          "controls display"
          "registers display";
        max-width: var(--max-app-width);
        margin: 0 auto;
        padding: 0.6rem;
      }

      .app-header {
        grid-area: header;
        font-size: 1.8rem;
        color: var(--primary-color);
        border-bottom: 1px dashed var(--primary-color);
        margin: 0.625rem 0 0;
        padding-bottom: 0.5rem;
      }

      .controls {
        grid-area: controls;
        border: 1px solid var(--primary-color);
        display: flex;
        flex-direction: column;
      }

      .display {
        grid-area: display;
      }

      .registers {
        grid-area: registers;
        border: 1px solid var(--primary-color);
      }

      .subheader {
        margin: 0;
        padding: 0.3rem;
        font-size: 1.2rem;
        background-color: var(--secondary-color);
        color: var(--bg-color);
        text-align: center;
      }

      .button {
        margin: 0.2rem 0.4rem;
        padding: 0.5rem;
        background-color: var(--bg-color);
        color: var(--primary-color);
        border: 1px solid var(--primary-color);
        font-family: var(--font-family);
        cursor: pointer;
      }
      .button:hover {
        color: var(--secondary-color);
      }

      .file-input {
        display: none;
      }
    `,
  ];

  private ctrl = new ChipController(this);

  handleLoadClick() {
    (this.renderRoot.querySelector(".file-input") as HTMLInputElement)?.click();
  }

  async handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) {
      return;
    }
    const file = target.files[0];
    try {
      const buffer = await file.arrayBuffer();
      this.ctrl.loadRom(buffer);
    } catch (e) {
      console.error(e);
    }

    this.ctrl.run();
  }

  render() {
    const info = this.ctrl.getInfo();

    return html`
      <h1 class="app-header">CHIP-8 TypeScript</h1>
      <section class="controls">
        <h2 class="subheader">Controls</h2>
        <button class="button" @click="${this.handleLoadClick}">
          load rom
        </button>
        <input class="file-input" type="file" @change="${this.handleChange}" />
        <button class="button">reset</button>
        <button class="button">play/pause</button>
        <button class="button">mute/unmute</button>
      </section>
      <section class="registers">
        <h2 class="subheader">Registers</h2>
        <ul>
          ${info.vRegisters.map((v, i) => html`<li>V${i}: ${v}</li>`)}
        </ul>
      </section>
      <canvas class="display"></canvas>
    `;
  }
}
