export class Ticker {
  private tick: () => void;
  private frequency: number;
  private startTs: DOMHighResTimeStamp | undefined;
  private rid?: number;

  constructor(tick: () => void, frequency: number) {
    this.tick = tick;
    this.frequency = frequency;
  }

  private get slot() {
    return 1000 / this.frequency;
  }

  private step = (ts: DOMHighResTimeStamp) => {
    if (!this.startTs) {
      this.startTs = ts;
    }

    if (ts < this.startTs + this.slot) {
      this.rid = requestAnimationFrame(this.step);
    } else {
      this.startTs += this.slot;
      this.tick();
      this.step(ts);
    }
  };

  start() {
    this.rid = requestAnimationFrame(this.step);
  }

  stop() {
    this.startTs = undefined;
    cancelAnimationFrame(this.rid ?? -1);
  }
}
