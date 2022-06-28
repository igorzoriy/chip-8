import { ReactiveController, ReactiveControllerHost } from "lit";
import { Chip8, DISPLAY_WIDTH, DISPLAY_HEIGHT } from "./Chip8";
import { dumpVram } from "./rom-utils";

export class ChipController implements ReactiveController {
  host: ReactiveControllerHost;
  chip: Chip8;
  private timer?: ReturnType<typeof setInterval>;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
    this.chip = new Chip8();
  }

  loadRom(buffer: ArrayBuffer) {
    this.chip.loadRom(buffer);
  }

  run() {
    this.timer = setInterval(() => {
      this.chip.performCycle();
      dumpVram(this.chip.vram, DISPLAY_WIDTH, DISPLAY_HEIGHT);
      this.host.requestUpdate();
    }, 300);
  }

  getInfo() {
    return this.chip.getInfo();
  }

  hostDisconnected() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
