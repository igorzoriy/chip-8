export class Chip8 {
  memory: ArrayBuffer;
  v: ArrayBuffer;
  opcode: number = 0;
  I: number = 0;
  pc: number = 0;

  constructor() {
    this.initialize();
    this.memory = new ArrayBuffer(4096);
    this.v = new ArrayBuffer(8);
  }

  initialize() {
    this.opcode = 0;
    this.I = 0;
    this.pc = 0x200;
  }

  performCycle() {
    console.log("cycle");
  }
}
