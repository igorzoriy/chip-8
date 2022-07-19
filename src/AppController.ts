import { ReactiveController, ReactiveControllerHost } from "lit";
import { Chip8 } from "./Chip8";
import { keymap } from "./keymap";
import { Speaker } from "./Speaker";
import { Ticker } from "./Ticker";

export class AppController implements ReactiveController {
  host: ReactiveControllerHost;
  romName: string;
  loaded: boolean;
  paused: boolean;
  muted: boolean;
  private chip: Chip8;
  private keyboard: Uint8Array;
  private speaker: Speaker;
  private ticker: Ticker;
  private frequency = 60;
  private speed = 5;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
    this.chip = new Chip8();
    this.romName = "";
    this.loaded = false;
    this.paused = true;
    this.muted = false;
    this.keyboard = new Uint8Array(16);
    this.speaker = new Speaker();
    this.ticker = new Ticker(this.tick, this.frequency);
  }

  hostConnected() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  hostDisconnected() {
    this.ticker.stop();
  }

  loadRom(name: string, rom: ArrayBuffer) {
    this.romName = name;
    this.loaded = true;
    this.chip.loadRom(rom);
    this.host.requestUpdate();
  }

  private tick = () => {
    for (let i = 0; i < this.speed; i++) {
      this.chip.performCycle();
    }
    if (this.chip.shouldBeep) {
      this.speaker.start();
    } else {
      this.speaker.stop();
    }
    this.chip.tick();
    this.host.requestUpdate();
  };

  play() {
    this.ticker.start();
    this.paused = false;
    this.host.requestUpdate();
  }

  pause() {
    this.ticker.stop();
    this.paused = true;
    this.host.requestUpdate();
  }

  reset() {
    this.speaker.stop();
    this.ticker.stop();
    this.romName = "";
    this.loaded = false;
    this.paused = true;
    this.chip.reset();
    this.host.requestUpdate();
  }

  muteUnmute() {
    this.muted = !this.muted;
    this.speaker.mute(this.muted);
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
}
