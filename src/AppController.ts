import { ReactiveController, ReactiveControllerHost } from "lit";
import { Chip8 } from "./Chip8";
import { keymap } from "./keymap";

export class AppController implements ReactiveController {
  host: ReactiveControllerHost;
  loaded: boolean;
  paused: boolean;
  private chip: Chip8;
  private timer?: ReturnType<typeof setInterval>;
  private keyboard: Uint8Array;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
    this.chip = new Chip8();
    this.loaded = false;
    this.paused = true;
    this.keyboard = new Uint8Array(16);
  }

  loadRom(buffer: ArrayBuffer) {
    this.chip.loadRom(buffer);
    this.loaded = true;
  }

  play() {
    this.paused = false;
    let counter = 0;
    this.timer = setInterval(() => {
      counter++;

      if (counter % 5 === 0) {
        this.chip.tick();
        counter = 0;
      }
      this.chip.performCycle();
      this.host.requestUpdate();
    }, 3);
  }

  pause() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.paused = true;
    this.host.requestUpdate();
  }

  getChipData() {
    return this.chip.getData();
  }

  private handleKeyDown = ({ code }: KeyboardEvent) => {
    const key = this.mapCodeToKeyboard(code);
    if (key === -1) {
      return;
    }
    this.keyboard[key] = 1;
    this.chip.updateKeyboard(this.keyboard);
  };

  private handleKeyUp = ({ code }: KeyboardEvent) => {
    const key = this.mapCodeToKeyboard(code);
    if (key === -1) {
      return;
    }
    this.keyboard[key] = 0;
    this.chip.updateKeyboard(this.keyboard);
  };

  private mapCodeToKeyboard(code: string) {
    return keymap.indexOf(code);
  }

  hostConnected() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  hostDisconnected() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
