import { ReactiveController, ReactiveControllerHost } from "lit";
import { Chip8 } from "./Chip8";
import { Display } from "./Display";

export class ChipController implements ReactiveController {
  host: ReactiveControllerHost;
  display: Display;
  chip: Chip8;
  private timer?: ReturnType<typeof setInterval>;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
    this.display = new Display();
    this.chip = new Chip8(this.display);
  }

  loadRom(buffer: ArrayBuffer) {
    this.chip.loadRom(buffer);
  }

  run() {
    this.timer = setInterval(() => {
      this.chip.performCycle();
      this.display.dump();
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
