export class Chip8 {
  memoryBuffer: ArrayBuffer;
  memory: DataView;
  opcode: number;
  I: number;
  pc: number;
  vRegisters: Uint8Array;
  sp: number;
  stack: Uint16Array;

  constructor() {
    this.memoryBuffer = new ArrayBuffer(0x1000);
    this.memory = new DataView(this.memoryBuffer);
    this.opcode = 0;
    this.I = 0;
    this.pc = 0x200;
    this.vRegisters = new Uint8Array(16);
    this.sp = 0;
    this.stack = new Uint16Array(16);
  }

  loadRom(rom: ArrayBuffer) {
    const memory = new Uint8Array(this.memoryBuffer);
    memory.set(new Uint8Array(rom), 0x200);
  }

  parseOpcode(opcode: number) {
    const x = (opcode & 0x0f00) >> 8;
    const y = (opcode & 0x00f0) >> 4;
    const nn = opcode & 0x00ff;
    const nnn = opcode & 0x0fff;
    return { x, y, nn, nnn };
  }

  nextInstruction() {
    this.pc += 2;
  }

  skipNextInstruction() {
    this.pc += 4;
  }

  performCycle() {
    const opcode = this.memory.getUint16(this.pc);
    const { x, y, nn, nnn } = this.parseOpcode(opcode);
    switch (opcode & 0xf000) {
      case 0x0000:
        // 00EE
        if (nnn === 0x0ee) {
          if (this.sp <= 0) {
            throw new Error("Stack underflow");
          }
          this.sp--;
          this.pc = this.stack[this.sp];
        } else {
          throw new Error(`Unknown opcode: ${opcode.toString(16)}`);
        }
        break;
      case 0x1000: // 1NNN
        this.pc = nnn;
        break;
      case 0x2000: // 2NNN
        if (this.sp >= 15) {
          throw new Error("Stack overflow");
        }
        this.stack[this.sp] = this.pc;
        this.pc = nnn;
        this.sp++;
        break;
      case 0x3000: // 3XNN
        if (this.vRegisters[x] === nn) {
          this.skipNextInstruction();
        } else {
          this.nextInstruction();
        }
        break;
      case 0x4000: // 4XNN
        if (this.vRegisters[x] !== nn) {
          this.skipNextInstruction();
        } else {
          this.nextInstruction();
        }
        break;
      case 0x5000: // 5XY0
        if (this.vRegisters[x] === this.vRegisters[y]) {
          this.skipNextInstruction();
        } else {
          this.nextInstruction();
        }
        break;
      case 0x6000: // 6XNN
        this.vRegisters[x] = nn;
        this.nextInstruction();
        break;
      case 0x7000: // 7XNN
        this.vRegisters[x] += nn;
        this.nextInstruction();
        break;
      case 0x8000: // 8XYN
        switch (opcode & 0x000f) {
          case 0x0000: // 8XY0
            this.vRegisters[x] = this.vRegisters[y];
            this.nextInstruction();
            break;
          case 0x0001: // 8XY1
            this.vRegisters[x] |= this.vRegisters[y];
            this.nextInstruction();
            break;
          case 0x0002: // 8XY2
            this.vRegisters[x] &= this.vRegisters[y];
            this.nextInstruction();
            break;
          case 0x0003: // 8XY3
            this.vRegisters[x] ^= this.vRegisters[y];
            this.nextInstruction();
            break;
          case 0x0004: // 8XY4
            const sum = this.vRegisters[x] + this.vRegisters[y];
            this.vRegisters[x] = sum;
            this.vRegisters[0xf] = sum > 0xff ? 1 : 0;
            this.nextInstruction();
            break;
          case 0x0005: // 8XY5
            const diff = this.vRegisters[x] - this.vRegisters[y];
            this.vRegisters[x] = diff;
            this.vRegisters[0xf] = diff < 0 ? 0 : 1;
            this.nextInstruction();
            break;
          case 0x0006: // 8XY6
            this.vRegisters[0xf] = this.vRegisters[x] & 0x1;
            this.vRegisters[x] >>= 1;
            this.nextInstruction();
            break;
          case 0x0007: // 8XY7
            const diff2 = this.vRegisters[y] - this.vRegisters[x];
            this.vRegisters[x] = diff2;
            this.vRegisters[0xf] = diff2 < 0 ? 0 : 1;
            this.nextInstruction();
            break;
          case 0x000e: // 8XYE
            this.vRegisters[0xf] = this.vRegisters[x] >> 7;
            this.vRegisters[x] <<= 1;
            this.nextInstruction();
            break;
          default:
            throw new Error(`Unknown opcode: ${opcode.toString(16)}`);
        }
        break;
      case 0x9000: // 9XY0
        if (this.vRegisters[x] !== this.vRegisters[y]) {
          this.skipNextInstruction();
        } else {
          this.nextInstruction();
        }
        break;
      case 0xa000: // ANNN
        this.I = opcode & 0x0fff;
        this.nextInstruction();
        break;
      case 0xb000: // BNNN
        this.pc = nnn + this.vRegisters[0];
        break;
      case 0xc000: // CXNN
        this.vRegisters[x] = Math.floor(Math.random() * 255) & nn;
        this.nextInstruction();
        break;

      case 0xf000:
        switch (nn) {
          case 0x1e: // FX1E
            this.I += this.vRegisters[x];
            this.nextInstruction();
            break;
          default:
            throw new Error(`Unknown opcode: ${opcode.toString(16)}`);
        }
        break;
      default:
        throw new Error(`Unknown opcode: ${opcode.toString(16)}`);
    }
  }
}
