import { ReactiveController, ReactiveControllerHost } from "lit";
import { Chip8 } from "./Chip8";

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
      this.host.requestUpdate();
    }, 300);
  }

  getChipData() {
    return this.chip.getData();
  }

  hostDisconnected() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
