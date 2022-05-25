export interface IDisplay {
  clear(): void;
  drawSprite(x: number, y: number, sprite: Uint8Array): boolean;
}

export class Display implements IDisplay {
  static width = 64;
  static height = 32;
  byteCanvas!: Uint8Array;

  constructor() {
    this.clear();
  }

  clear() {
    this.byteCanvas = new Uint8Array(Display.width * Display.height);
  }

  drawSprite(x: number, y: number, sprite: Uint8Array): boolean {
    let erased = false;
    for (let yy = 0; yy < sprite.byteLength; yy++) {
      for (let xx = 0; xx < 8; xx++) {
        const bit = sprite[yy] & (1 << (7 - xx));
        if (bit) {
          const dx = x + xx >= Display.width ? x + xx - Display.width : x + xx;
          const dy =
            y + yy >= Display.height ? y + yy - Display.height : y + yy;
          const i = dx + dy * Display.width;
          erased = erased || this.byteCanvas[i] === 1;
          this.byteCanvas[i] ^= 1;
        }
      }
    }
    return erased;
  }

  dump() {
    let dump = "";
    for (let y = 0; y < Display.height; y++) {
      for (let x = 0; x < Display.width; x++) {
        dump += this.byteCanvas[x + y * Display.width] ? "X" : "-";
      }
      dump += "\n";
    }
    console.log(dump);
  }
}
