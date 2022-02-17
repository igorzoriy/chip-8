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

      default:
        throw new Error(`Unknown opcode: ${opcode.toString(16)}`);
    }
  }
}
