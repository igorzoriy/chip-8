export class Chip8 {
  memory: ArrayBuffer = new ArrayBuffer(0);
  opcode: number = 0;
  I: number = 0;
  pc: number = 0;
  vRegisters: Uint8Array = new Uint8Array(0);

  constructor() {
    this.initialize();
  }

  initialize() {
    this.memory = new ArrayBuffer(0x1000);
    this.opcode = 0;
    this.I = 0;
    this.pc = 0x200;
    this.vRegisters = new Uint8Array(16);
  }

  loadRom(rom: ArrayBuffer) {
    const memoryArray = new Uint8Array(this.memory);
    const romArray = new Uint8Array(rom);
    memoryArray.set(romArray, 0x200);
  }

  performCycle() {
    const view = new DataView(this.memory);
    const opcode = view.getUint16(this.pc);
    switch (opcode & 0xf000) {
      case 0xa000:
        this.I = opcode & 0x0fff;
        this.pc += 2;
        break;
      case 0x6000:
        this.vRegisters[(opcode & 0x0f00) >> 8] = opcode & 0x00ff;
        this.pc += 2;
        break;
      case 0x7000:
        this.vRegisters[(opcode & 0x0f00) >> 8] += opcode & 0x00ff;
        this.pc += 2;
        break;
      case 0x8000: // 8XYN
        const x = (opcode & 0x0f00) >> 8;
        const y = (opcode & 0x00f0) >> 4;
        switch (opcode & 0x000f) {
          case 0x0000: // 8XY0
            this.vRegisters[x] = this.vRegisters[y];
            this.pc += 2;
            break;
          case 0x0001: // 8XY1
            this.vRegisters[x] |= this.vRegisters[y];
            this.pc += 2;
            break;
          case 0x0002: // 8XY2
            this.vRegisters[x] &= this.vRegisters[y];
            this.pc += 2;
            break;
          case 0x0003: // 8XY3
            this.vRegisters[x] ^= this.vRegisters[y];
            this.pc += 2;
            break;
          case 0x0004: // 8XY4
            const sum = this.vRegisters[x] + this.vRegisters[y];
            this.vRegisters[x] = sum;
            this.vRegisters[0xf] = sum > 0xff ? 1 : 0;
            this.pc += 2;
            break;
          case 0x0005: // 8XY5
            const diff = this.vRegisters[x] - this.vRegisters[y];
            this.vRegisters[x] = diff;
            this.vRegisters[0xf] = diff < 0 ? 0 : 1;
            this.pc += 2;
            break;
          case 0x0006: // 8XY6
            this.vRegisters[0xf] = this.vRegisters[x] & 0x1;
            this.vRegisters[x] >>= 1;
            this.pc += 2;
            break;
          case 0x0007: // 8XY7
            const diff2 = this.vRegisters[y] - this.vRegisters[x];
            this.vRegisters[x] = diff2;
            this.vRegisters[0xf] = diff2 < 0 ? 0 : 1;
            this.pc += 2;
            break;
          case 0x000e: // 8XYE
            this.vRegisters[0xf] = this.vRegisters[x] >> 7;
            this.vRegisters[x] <<= 1;
            this.pc += 2;
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
