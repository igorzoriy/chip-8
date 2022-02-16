export class Chip8 {
  memory: ArrayBuffer = new ArrayBuffer(0);
  opcode: number = 0;
  I: number = 0;
  pc: number = 0;
  v: ArrayBuffer = new ArrayBuffer(0);

  constructor() {
    this.initialize();
  }

  initialize() {
    this.memory = new ArrayBuffer(0x1000);
    this.opcode = 0;
    this.I = 0;
    this.pc = 0x200;
    this.v = new ArrayBuffer(8);
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
      default:
        throw new Error(`Unknown opcode: ${opcode.toString(16)}`);
    }
  }
}
