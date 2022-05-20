export class Chip8 {
  memorySize = 0x1000;
  memoryBuffer: ArrayBuffer;
  memory: DataView;
  opcode: number;
  I: number;
  pc: number;
  vRegisters: Uint8Array;
  sp: number;
  stack: Uint16Array;
  delayTimer: number;

  constructor() {
    this.memoryBuffer = new ArrayBuffer(this.memorySize);
    this.memory = new DataView(this.memoryBuffer);
    this.opcode = 0;
    this.I = 0;
    this.pc = 0x200;
    this.vRegisters = new Uint8Array(16);
    this.sp = 0;
    this.stack = new Uint16Array(16);
    this.delayTimer = 0;
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

  returnFromSubroutine() {
    if (this.sp <= 0) {
      throw new Error("Stack underflow");
    }
    this.sp--;
    this.pc = this.stack[this.sp];
  }

  callSubroutine(address: number) {
    if (this.sp >= 15) {
      throw new Error("Stack overflow");
    }
    this.stack[this.sp] = this.pc;
    this.pc = address;
    this.sp++;
  }

  tickDelayTimer() {
    if (this.delayTimer > 0) {
      this.delayTimer--;
    }
  }

  performCycle() {
    const opcode = this.memory.getUint16(this.pc);
    const { x, y, nn, nnn } = this.parseOpcode(opcode);
    switch (opcode & 0xf000) {
      case 0x0000:
        // 00EE - RET
        if (nnn === 0x0ee) {
          this.returnFromSubroutine();
        } else {
          throw new Error(`Unknown opcode: ${opcode.toString(16)}`);
        }
        break;
      case 0x1000: // 1NNN - JP addr
        this.pc = nnn;
        break;
      case 0x2000: // 2NNN - CALL addr
        this.callSubroutine(nnn);
        break;
      case 0x3000: // 3XNN - SE Vx, NN
        if (this.vRegisters[x] === nn) {
          this.skipNextInstruction();
        } else {
          this.nextInstruction();
        }
        break;
      case 0x4000: // 4XNN - SNE Vx, NN
        if (this.vRegisters[x] !== nn) {
          this.skipNextInstruction();
        } else {
          this.nextInstruction();
        }
        break;
      case 0x5000: // 5XY0 - SE Vx, Vy
        if (this.vRegisters[x] === this.vRegisters[y]) {
          this.skipNextInstruction();
        } else {
          this.nextInstruction();
        }
        break;
      case 0x6000: // 6XNN - LD Vx, NN
        this.vRegisters[x] = nn;
        this.nextInstruction();
        break;
      case 0x7000: // 7XNN - ADD Vx, NN
        this.vRegisters[x] += nn;
        this.nextInstruction();
        break;
      case 0x8000: // 8XYN
        switch (opcode & 0x000f) {
          case 0x0000: // 8XY0 - LD Vx, Vy
            this.vRegisters[x] = this.vRegisters[y];
            this.nextInstruction();
            break;
          case 0x0001: // 8XY1 - OR Vx, Vy
            this.vRegisters[x] |= this.vRegisters[y];
            this.nextInstruction();
            break;
          case 0x0002: // 8XY2 - AND Vx, Vy
            this.vRegisters[x] &= this.vRegisters[y];
            this.nextInstruction();
            break;
          case 0x0003: // 8XY3 - XOR Vx, Vy
            this.vRegisters[x] ^= this.vRegisters[y];
            this.nextInstruction();
            break;
          case 0x0004: // 8XY4 - ADD Vx, Vy
            const sum = this.vRegisters[x] + this.vRegisters[y];
            this.vRegisters[x] = sum;
            this.vRegisters[0xf] = sum > 0xff ? 1 : 0;
            this.nextInstruction();
            break;
          case 0x0005: // 8XY5 - SUB Vx, Vy
            const diff = this.vRegisters[x] - this.vRegisters[y];
            this.vRegisters[x] = diff;
            this.vRegisters[0xf] = diff < 0 ? 0 : 1;
            this.nextInstruction();
            break;
          case 0x0006: // 8XY6 - SHR Vx
            this.vRegisters[0xf] = this.vRegisters[x] & 0x1;
            this.vRegisters[x] >>= 1;
            this.nextInstruction();
            break;
          case 0x0007: // 8XY7 - SUBN Vx, Vy
            const diff2 = this.vRegisters[y] - this.vRegisters[x];
            this.vRegisters[x] = diff2;
            this.vRegisters[0xf] = diff2 < 0 ? 0 : 1;
            this.nextInstruction();
            break;
          case 0x000e: // 8XYE - SHL Vx
            this.vRegisters[0xf] = this.vRegisters[x] >> 7;
            this.vRegisters[x] <<= 1;
            this.nextInstruction();
            break;
          default:
            throw new Error(`Unknown opcode: ${opcode.toString(16)}`);
        }
        break;
      case 0x9000: // 9XY0 - SNE Vx, Vy
        if (this.vRegisters[x] !== this.vRegisters[y]) {
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
        this.pc = nnn + this.vRegisters[0];
        break;
      case 0xc000: // CXNN - RND Vx, NN
        this.vRegisters[x] = Math.floor(Math.random() * 255) & nn;
        this.nextInstruction();
        break;

      case 0xf000:
        switch (nn) {
          case 0x07: // FX07 - LD Vx, DT
            this.vRegisters[x] = this.delayTimer;
            this.nextInstruction();
            break;
          case 0x15: // FX15 - LD DT, Vx
            this.delayTimer = this.vRegisters[x];
            this.nextInstruction();
            break;
          case 0x1e: // FX1E - ADD I, Vx
            this.I += this.vRegisters[x];
            this.nextInstruction();
            break;
          case 0x33: // FX33 - LD B, Vx
            this.memory.setUint8(this.I, Math.floor(this.vRegisters[x] / 100));
            this.memory.setUint8(this.I + 1, (this.vRegisters[x] / 10) % 10);
            this.memory.setUint8(this.I + 2, this.vRegisters[x] % 10);
            this.nextInstruction();
            break;
          case 0x55: // FX55 - LD [I], Vx
            for (let i = 0; i <= x; i++) {
              this.memory.setUint8(this.I + i, this.vRegisters[i]);
            }
            this.nextInstruction();
            break;
          case 0x65: // FX65 - LD Vx, [I]
            for (let i = 0; i <= x; i++) {
              this.vRegisters[i] = this.memory.getUint8(this.I + i);
            }
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
