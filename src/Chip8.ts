import { font } from "./font";

export const MEMORY_SIZE = 0x1000;
export const DISPLAY_WIDTH = 64;
export const DISPLAY_HEIGHT = 32;

export class Chip8 {
  memoryBuffer!: ArrayBuffer;
  memory!: DataView;
  opcode!: number;
  I!: number;
  pc!: number;
  vregisters!: Uint8Array;
  sp!: number;
  stack!: Uint16Array;
  delayTimer!: number;
  soundTimer!: number;
  vram!: Uint8Array;
  keyboard!: Uint8Array;

  constructor() {
    this.reset();
  }

  reset() {
    this.memoryBuffer = new ArrayBuffer(MEMORY_SIZE);
    this.memory = new DataView(this.memoryBuffer);
    this.opcode = 0;
    this.I = 0;
    this.pc = 0x200;
    this.vregisters = new Uint8Array(16);
    this.sp = 0;
    this.stack = new Uint16Array(16);
    this.delayTimer = 0;
    this.soundTimer = 0;
    this.vram = new Uint8Array(DISPLAY_WIDTH * DISPLAY_HEIGHT);
    this.loadFont();
    this.keyboard = new Uint8Array(16);
  }

  private loadFont() {
    new Uint8Array(this.memoryBuffer).set(new Uint8Array(font), 0);
  }

  loadRom(rom: ArrayBuffer) {
    new Uint8Array(this.memoryBuffer).set(new Uint8Array(rom), 0x200);
  }

  private clearVram() {
    this.vram = new Uint8Array(DISPLAY_WIDTH * DISPLAY_HEIGHT);
  }

  private drawSprite(x: number, y: number, n: number) {
    let erased = false;
    for (let yy = 0; yy < n; yy++) {
      const byte = this.memory.getUint8(this.I + yy);
      for (let xx = 0; xx < 8; xx++) {
        const bit = byte & (1 << (7 - xx));
        if (bit) {
          const dx = x + xx >= DISPLAY_WIDTH ? x + xx - DISPLAY_WIDTH : x + xx;
          const dy =
            y + yy >= DISPLAY_HEIGHT ? y + yy - DISPLAY_HEIGHT : y + yy;
          const i = dx + dy * DISPLAY_WIDTH;
          erased = erased || this.vram[i] === 1;
          this.vram[i] ^= 1;
        }
      }
    }
    this.vregisters[0xf] = Number(erased);
  }

  updateKeyboard(keyboard: Uint8Array) {
    this.keyboard = keyboard;
  }

  parseOpcode(opcode: number) {
    const x = (opcode & 0x0f00) >> 8;
    const y = (opcode & 0x00f0) >> 4;
    const nn = opcode & 0x00ff;
    const nnn = opcode & 0x0fff;
    return { x, y, nn, nnn };
  }

  private nextInstruction() {
    this.pc += 2;
  }

  private skipNextInstruction() {
    this.pc += 4;
  }

  returnFromSubroutine() {
    if (this.sp <= 0) {
      throw new Error("Stack underflow");
    }
    this.sp--;
    this.pc = this.stack[this.sp];
  }

  callSubroutine(address: number) {
    if (this.sp > 15) {
      throw new Error("Stack overflow");
    }
    this.stack[this.sp] = this.pc + 2;
    this.sp++;
    this.pc = address;
  }

  tick() {
    if (this.delayTimer > 0) {
      this.delayTimer--;
    }

    if (this.soundTimer > 0) {
      this.soundTimer--;
    }
  }

  private throwUnknownOpcode(opcode: number) {
    throw new Error(`Unknown opcode: ${opcode.toString(16)}`);
  }

  performCycle() {
    const opcode = this.memory.getUint16(this.pc);
    const { x, y, nn, nnn } = this.parseOpcode(opcode);
    /* eslint-disable no-case-declarations */
    switch (opcode & 0xf000) {
      case 0x0000:
        if (nnn === 0x0e0) {
          // 00E0 - CLS
          this.clearVram();
          this.nextInstruction();
        } else if (nnn === 0x0ee) {
          // 00EE - RET
          this.returnFromSubroutine();
        } else {
          this.throwUnknownOpcode(opcode);
        }
        break;
      case 0x1000: // 1NNN - JP addr
        this.pc = nnn;
        break;
      case 0x2000: // 2NNN - CALL addr
        this.callSubroutine(nnn);
        break;
      case 0x3000: // 3XNN - SE Vx, NN
        if (this.vregisters[x] === nn) {
          this.skipNextInstruction();
        } else {
          this.nextInstruction();
        }
        break;
      case 0x4000: // 4XNN - SNE Vx, NN
        if (this.vregisters[x] !== nn) {
          this.skipNextInstruction();
        } else {
          this.nextInstruction();
        }
        break;
      case 0x5000: // 5XY0 - SE Vx, Vy
        if (this.vregisters[x] === this.vregisters[y]) {
          this.skipNextInstruction();
        } else {
          this.nextInstruction();
        }
        break;
      case 0x6000: // 6XNN - LD Vx, NN
        this.vregisters[x] = nn;
        this.nextInstruction();
        break;
      case 0x7000: // 7XNN - ADD Vx, NN
        this.vregisters[x] += nn;
        this.nextInstruction();
        break;
      case 0x8000: // 8XYN
        switch (opcode & 0x000f) {
          case 0x0000: // 8XY0 - LD Vx, Vy
            this.vregisters[x] = this.vregisters[y];
            this.nextInstruction();
            break;
          case 0x0001: // 8XY1 - OR Vx, Vy
            this.vregisters[x] |= this.vregisters[y];
            this.nextInstruction();
            break;
          case 0x0002: // 8XY2 - AND Vx, Vy
            this.vregisters[x] &= this.vregisters[y];
            this.nextInstruction();
            break;
          case 0x0003: // 8XY3 - XOR Vx, Vy
            this.vregisters[x] ^= this.vregisters[y];
            this.nextInstruction();
            break;
          case 0x0004: // 8XY4 - ADD Vx, Vy
            const sum = this.vregisters[x] + this.vregisters[y];
            this.vregisters[x] = sum;
            this.vregisters[0xf] = sum > 0xff ? 1 : 0;
            this.nextInstruction();
            break;
          case 0x0005: // 8XY5 - SUB Vx, Vy
            const diff = this.vregisters[x] - this.vregisters[y];
            this.vregisters[x] = diff;
            this.vregisters[0xf] = diff < 0 ? 0 : 1;
            this.nextInstruction();
            break;
          case 0x0006: // 8XY6 - SHR Vx
            this.vregisters[0xf] = this.vregisters[x] & 0x1;
            this.vregisters[x] >>= 1;
            this.nextInstruction();
            break;
          case 0x0007: // 8XY7 - SUBN Vx, Vy
            const diff2 = this.vregisters[y] - this.vregisters[x];
            this.vregisters[x] = diff2;
            this.vregisters[0xf] = diff2 < 0 ? 0 : 1;
            this.nextInstruction();
            break;
          case 0x000e: // 8XYE - SHL Vx
            this.vregisters[0xf] = this.vregisters[x] >> 7;
            this.vregisters[x] <<= 1;
            this.nextInstruction();
            break;
          default:
            this.throwUnknownOpcode(opcode);
        }
        break;
      case 0x9000: // 9XY0 - SNE Vx, Vy
        if (this.vregisters[x] !== this.vregisters[y]) {
          this.skipNextInstruction();
        } else {
          this.nextInstruction();
        }
        break;
      case 0xa000: // ANNN - LD I, addr
        this.I = opcode & 0x0fff;
        this.nextInstruction();
        break;
      case 0xb000: // BNNN - JP V0, addr
        this.pc = nnn + this.vregisters[0];
        break;
      case 0xc000: // CXNN - RND Vx, NN
        this.vregisters[x] = Math.floor(Math.random() * 255) & nn;
        this.nextInstruction();
        break;
      case 0xd000: // DXYN - DRW Vx, Vy, nibble
        const n = opcode & 0x000f;
        this.drawSprite(this.vregisters[x], this.vregisters[y], n);
        this.nextInstruction();
        break;
      case 0xe000:
        if (nn === 0x9e) {
          // EX9E - SKP Vx
          const key = this.vregisters[x];
          if (this.keyboard[key]) {
            this.skipNextInstruction();
          } else {
            this.nextInstruction();
          }
        } else if (nn === 0xa1) {
          // EXA1 - SKNP Vx
          const key = this.vregisters[x];
          if (!this.keyboard[key]) {
            this.skipNextInstruction();
          } else {
            this.nextInstruction();
          }
        } else {
          this.throwUnknownOpcode(opcode);
        }
        break;
      case 0xf000:
        switch (nn) {
          case 0x07: // FX07 - LD Vx, DT
            this.vregisters[x] = this.delayTimer;
            this.nextInstruction();
            break;
          case 0x15: // FX15 - LD DT, Vx
            this.delayTimer = this.vregisters[x];
            this.nextInstruction();
            break;
          case 0x18: // FX18 - LD ST, Vx
            this.soundTimer = this.vregisters[x];
            this.nextInstruction();
            break;
          case 0x1e: // FX1E - ADD I, Vx
            this.I += this.vregisters[x];
            this.nextInstruction();
            break;
          case 0x29: // FX29 - LD F, Vx
            if (this.vregisters[x] > 0xf) {
              throw new Error(`Invalid font sprite: ${this.vregisters[x]}`);
            }
            this.I = this.vregisters[x] * 5;
            this.nextInstruction();
            break;
          case 0x33: // FX33 - LD B, Vx
            this.memory.setUint8(this.I, Math.floor(this.vregisters[x] / 100));
            this.memory.setUint8(this.I + 1, (this.vregisters[x] / 10) % 10);
            this.memory.setUint8(this.I + 2, this.vregisters[x] % 10);
            this.nextInstruction();
            break;
          case 0x55: // FX55 - LD [I], Vx
            for (let i = 0; i <= x; i++) {
              this.memory.setUint8(this.I + i, this.vregisters[i]);
            }
            this.nextInstruction();
            break;
          case 0x65: // FX65 - LD Vx, [I]
            for (let i = 0; i <= x; i++) {
              this.vregisters[i] = this.memory.getUint8(this.I + i);
            }
            this.nextInstruction();
            break;
          default:
            this.throwUnknownOpcode(opcode);
        }
        break;
      default:
        this.throwUnknownOpcode(opcode);
      /* eslint-enable no-case-declarations */
    }
  }

  get shouldBeep(): boolean {
    return this.soundTimer > 0;
  }

  getData(): {
    vregisters: number[];
    I: number;
    pc: number;
    vram: number[];
  } {
    return {
      vregisters: [...this.vregisters],
      I: this.I,
      pc: this.pc,
      vram: [...this.vram],
    };
  }
}
