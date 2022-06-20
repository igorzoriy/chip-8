import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { Chip8 } from "./Chip8";
import { Display } from "./Display";

@customElement("ch-app")
export class App extends LitElement {
  chip: Chip8;
  display: Display;
  timer?: ReturnType<typeof setInterval>;

  constructor() {
    super();
    this.display = new Display();
    this.chip = new Chip8(this.display);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  async handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) {
      return;
    }
    const file = target.files[0];
    try {
      const buffer = await file.arrayBuffer();
      this.chip.loadRom(buffer);
    } catch (e) {
      console.error(e);
    }

    this.timer = setInterval(() => {
      this.chip.performCycle();
      this.display.dump();
    }, 300);
  }

  render() {
    return html`
      <h1>CHIP-8 TypeScript</h1>
      <input type="file" @change="${this.handleChange}" />
    `;
  }
}
