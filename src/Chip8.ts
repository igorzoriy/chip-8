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
    console.log("cycle");
  }
}
