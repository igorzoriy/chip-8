import { LitElement, html, css } from "lit";
import { customElement, query } from "lit/decorators.js";
import { AppController } from "./AppController";
import { DISPLAY_WIDTH, DISPLAY_HEIGHT } from "./Chip8";

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
        width: 100%;
        border: 1px solid var(--primary-color);
        background-color: var(--primary-color);
        image-rendering: pixelated;
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
      .button:hover:not([disabled]) {
        background-color: var(--secondary-color);
        color: var(--bg-color);
        border-color: var(--bg-color);
      }
      .button[disabled] {
        color: var(--secondary-color);
        cursor: default;
      }

      .file-input {
        display: none;
      }

      .rom-selector {
        margin: 0.2rem 0.4rem;
        padding: 0.5rem;
        background-color: var(--bg-color);
        color: var(--primary-color);
        font-family: var(--font-family);
        border: 1px solid var(--primary-color);
        border-radius: 0;
        text-align: center;
        appearance: none;
        cursor: pointer;
      }
      .rom-selector:hover {
        background-color: var(--secondary-color);
        color: var(--bg-color);
        border-color: var(--bg-color);
      }
    `,
  ];

  @query(".file-input") fileInput?: HTMLInputElement;
  @query(".rom-selector") romSelector?: HTMLSelectElement;
  @query(".display") canvas?: HTMLCanvasElement;
  private ctrl = new AppController(this);

  async handleSelectRom() {
    const filename = this.romSelector?.value;
    if (!filename) {
      return;
    }
    try {
      const res = await fetch(`roms/${filename}`);
      const buffer = await res.arrayBuffer();
      this.ctrl.loadRom(buffer);
    } catch (e) {
      console.error(e);
    }
    this.ctrl.play();
  }

  handleUploadClick() {
    this.fileInput?.click();
  }

  async handleUploadRom(e: Event) {
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
    this.ctrl.play();
  }

  handlePlayPauseClick() {
    const { ctrl } = this;
    if (ctrl.paused) {
      ctrl.play();
    } else {
      ctrl.pause();
    }
  }

  willUpdate() {
    this.renderDisplay();
  }

  renderDisplay() {
    const ctx = this.canvas?.getContext("2d");
    if (!ctx) {
      return;
    }

    const { vram } = this.ctrl.getChipData();
    const imageData = ctx.createImageData(DISPLAY_WIDTH, DISPLAY_HEIGHT);
    for (let i = 0; i < imageData.data.length; i++) {
      imageData.data[i * 4] = vram[i] === 0 ? 0 : 255; // red
      imageData.data[i * 4 + 1] = vram[i] === 0 ? 0 : 255; // green
      imageData.data[i * 4 + 2] = vram[i] === 0 ? 0 : 255; // blue
      imageData.data[i * 4 + 3] = 255; // alpha
    }
    ctx.putImageData(imageData, 0, 0);
  }

  render() {
    const { ctrl } = this;
    const { vregisters, I, pc } = ctrl.getChipData();

    return html`
      <h1 class="app-header">CHIP-8 TypeScript</h1>
      <section class="controls">
        <h2 class="subheader">Controls</h2>
        <select class="rom-selector" @change="${this.handleSelectRom}">
          <option value="" selected disabled hidden>Select ROM</option>
          <optgroup label="Games">
            <option value="invaders.ch8">Invaders</option>
            <option value="maze.ch8">Maze</option>
            <option value="pong.ch8">Pong</option>
          </optgroup>
          <optgroup label="Tests">
            <option value="font-test.ch8">Font Test</option>
            <option value="ibm-logo.ch8">IBM Logo</option>
            <option value="chip8-logo.ch8">CHIP-8 Logo</option>
          </optgroup>
        </select>
        <button class="button" @click="${this.handleUploadClick}">
          Upload ROM
        </button>
        <input
          class="file-input"
          type="file"
          @change="${this.handleUploadRom}"
        />
        <button
          class="button"
          @click="${this.handlePlayPauseClick}"
          ?disabled="${!ctrl.loaded}"
        >
          ${this.ctrl.paused ? "Play" : "Pause"}
        </button>
        <button class="button">reset</button>
        <button class="button">🔊 mute/unmute</button>
      </section>
      <section class="registers">
        <h2 class="subheader">Registers</h2>
        <ul>
          <li>I: ${I.toString(16)}</li>
          <li>PC: ${pc.toString(16)}</li>
          ${vregisters.map((v, i) => html`<li>V${i}: ${v.toString(16)}</li>`)}
        </ul>
      </section>
      <canvas
        class="display"
        width="${DISPLAY_WIDTH}"
        height="${DISPLAY_HEIGHT}"
      ></canvas>
    `;
  }
}
