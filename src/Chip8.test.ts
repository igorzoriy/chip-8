import { Chip8 } from "./Chip8";
import { generateRom } from "./rom-utils";

describe("Chip8", () => {
  let chip: Chip8;

  beforeEach(() => {
    chip = new Chip8();
  });

  test("chip is initialized after creating", () => {
    expect(chip.memory.byteLength).toBe(4096);
    expect(chip.opcode).toBe(0);
    expect(chip.I).toBe(0);
    expect(chip.pc).toBe(0x200);
    for (let i = 0; i < 16; i++) {
      expect(chip.vRegisters[i]).toBe(0);
    }
    expect(chip.sp).toBe(0);
    for (let i = 0; i < 16; i++) {
      expect(chip.stack[i]).toBe(0);
    }
  });

  test("a rom is being loaded to chip memory", () => {
    chip.loadRom(generateRom("00e0 a22a 600c 6108"));
    const { memory } = chip;
    expect(memory.getUint16(0x200)).toBe(0x00e0);
    expect(memory.getUint16(0x202)).toBe(0xa22a);
    expect(memory.getUint16(0x204)).toBe(0x600c);
    expect(memory.getUint16(0x206)).toBe(0x6108);
    expect(memory.getUint16(0x208)).toBe(0x0000);
  });

  test("chip parses x, y, nn, nnn from opcodes", () => {
    expect(chip.parseOpcode(0xa64f).nnn).toBe(0x64f);

    expect(chip.parseOpcode(0x42dd).x).toBe(2);
    expect(chip.parseOpcode(0x42dd).nn).toBe(0xdd);

    expect(chip.parseOpcode(0x58f0).x).toBe(8);
    expect(chip.parseOpcode(0x58f0).y).toBe(0xf);
  });

  test("chip executes `00EE` opcode", () => {
    chip.loadRom(generateRom("00EE 00EE"));
    chip.stack[0] = 0x400;
    chip.stack[1] = 0x200;
    chip.sp = 2;
    chip.pc = 0x202;
    chip.performCycle();
    expect(chip.pc).toBe(0x200);
    expect(chip.sp).toBe(1);
    chip.performCycle();
    expect(chip.pc).toBe(0x400);
    expect(chip.sp).toBe(0);
  });

  test("chip executes `00EE` opcode and throws an exception when stack is underflow", () => {
    chip.loadRom(generateRom("00EE"));
    expect(() => chip.performCycle()).toThrowError("Stack underflow");
  });

  test("chip executes `1NNN` opcode", () => {
    chip.loadRom(generateRom("12ff"));
    chip.performCycle();
    expect(chip.pc).toBe(0x2ff);
  });

  test("chip executes `2NNN` opcode", () => {
    chip.loadRom(generateRom("24FF"));
    chip.performCycle();
    expect(chip.pc).toBe(0x4ff);
    expect(chip.sp).toBe(1);
    expect(chip.stack[0]).toBe(0x200);
  });

  test("chip executes `2NNN` opcode and throws an exception when stack is overflow", () => {
    chip.loadRom(
      generateRom(
        "2202 2204 2206 2208 220A 220C 220E 2210 2212 2214 2216 2218 221A 221C 221E 2220"
      )
    );
    for (let i = 0; i < 15; i++) {
      chip.performCycle();
    }
    expect(() => chip.performCycle()).toThrowError("Stack overflow");
  });

  test("chip executes `3XNN` opcode", () => {
    chip.loadRom(generateRom("30ff"));
    chip.vRegisters[0] = 0x11;
    chip.performCycle();
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `3XNN` opcode and skips next instruction", () => {
    chip.loadRom(generateRom("30ff"));
    chip.vRegisters[0] = 0xff;
    chip.performCycle();
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `4XNN` opcode", () => {
    chip.loadRom(generateRom("40ff"));
    chip.vRegisters[0] = 0xff;
    chip.performCycle();
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `4XNN` opcode and skips next instruction", () => {
    chip.loadRom(generateRom("40ff"));
    chip.vRegisters[0] = 0x11;
    chip.performCycle();
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `5XY0` opcode", () => {
    chip.loadRom(generateRom("5af0"));
    chip.vRegisters[0xa] = 0x35;
    chip.vRegisters[0xf] = 0x53;
    chip.performCycle();
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `5XY0` opcode and skips next instruction", () => {
    chip.loadRom(generateRom("5af0"));
    chip.vRegisters[0xa] = 0x35;
    chip.vRegisters[0xf] = 0x35;
    chip.performCycle();
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `6XNN` opcode", () => {
    chip.loadRom(generateRom("6c95"));
    chip.performCycle();
    expect(chip.vRegisters[0xc]).toBe(0x95);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `7XNN` opcode", () => {
    chip.loadRom(generateRom("7205"));
    chip.vRegisters[2] = 0x02;
    chip.performCycle();
    expect(chip.vRegisters[2]).toBe(7);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY0` opcode", () => {
    chip.loadRom(generateRom("8650"));
    chip.vRegisters[5] = 0x1a;
    chip.performCycle();
    expect(chip.vRegisters[6]).toBe(0x1a);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY1` opcode", () => {
    chip.loadRom(generateRom("8341"));
    chip.vRegisters[3] = 0x05;
    chip.vRegisters[4] = 0x03;
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x07);
    expect(chip.vRegisters[4]).toBe(0x03);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY2` opcode", () => {
    chip.loadRom(generateRom("8342"));
    chip.vRegisters[3] = 0x05;
    chip.vRegisters[4] = 0x03;
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x01);
    expect(chip.vRegisters[4]).toBe(0x03);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY3` opcode", () => {
    chip.loadRom(generateRom("8343"));
    chip.vRegisters[3] = 0x05;
    chip.vRegisters[4] = 0x03;
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x06);
    expect(chip.vRegisters[4]).toBe(0x03);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY4` opcode", () => {
    chip.loadRom(generateRom("8344"));
    chip.vRegisters[3] = 0x05;
    chip.vRegisters[4] = 0x03;
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x08);
    expect(chip.vRegisters[4]).toBe(0x03);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY5` opcode", () => {
    chip.loadRom(generateRom("8345"));
    chip.vRegisters[3] = 0x05;
    chip.vRegisters[4] = 0x03;
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x02);
    expect(chip.vRegisters[4]).toBe(0x03);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY6` opcode", () => {
    chip.loadRom(generateRom("8306"));
    chip.vRegisters[3] = 0xb3;
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x59);
    expect(chip.vRegisters[0xf]).toBe(1);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY7` opcode", () => {
    chip.loadRom(generateRom("8347"));
    chip.vRegisters[3] = 0x05;
    chip.vRegisters[4] = 0x08;
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x03);
    expect(chip.vRegisters[0xf]).toBe(1);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XYE` opcode", () => {
    chip.loadRom(generateRom("830e"));
    chip.vRegisters[3] = 0x11;
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x22);
    expect(chip.vRegisters[0xf]).toBe(0);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `9XY0` opcode", () => {
    chip.loadRom(generateRom("9140"));
    chip.vRegisters[1] = 0x01;
    chip.vRegisters[4] = 0x01;
    chip.performCycle();
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `9XY0` opcode and skips next instruction", () => {
    chip.loadRom(generateRom("9140"));
    chip.vRegisters[1] = 0x01;
    chip.vRegisters[4] = 0x02;
    chip.performCycle();
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `ANNN` opcode", () => {
    chip.loadRom(generateRom("a123"));
    chip.performCycle();
    expect(chip.I).toBe(0x123);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `BNNN` opcode", () => {
    chip.loadRom(generateRom("b0ff"));
    chip.vRegisters[0] = 0x10;
    chip.performCycle();
    expect(chip.pc).toBe(0x010f);
  });

  test("chip executes `FX1E` opcode", () => {
    chip.loadRom(generateRom("f11e"));
    chip.I = 0x100;
    chip.vRegisters[1] = 0x34;
    chip.performCycle();
    expect(chip.I).toBe(0x134);
    expect(chip.pc).toBe(0x202);
  });

  test.each([
    ["f033", 0, 0, 0x300, 0, 0, 0],
    ["f133", 1, 9, 0x310, 0, 0, 9],
    ["f233", 2, 10, 0x315, 0, 1, 0],
    ["f333", 3, 99, 0x356, 0, 9, 9],
    ["f433", 4, 100, 0x371, 1, 0, 0],
    ["f533", 5, 199, 0x402, 1, 9, 9],
    ["f633", 6, 200, 0x404, 2, 0, 0],
    ["f733", 7, 255, 0x512, 2, 5, 5],
  ])(
    "chip executes `FX33` opcode: %s",
    (
      opcode: string,
      rIndex: number,
      rValue: number,
      i: number,
      i0: number,
      i1: number,
      i2: number
    ) => {
      chip.loadRom(generateRom(opcode));
      chip.vRegisters[rIndex] = rValue;
      chip.I = i;
      chip.performCycle();
      const { memory } = chip;
      expect(memory.getUint8(i)).toBe(i0);
      expect(memory.getUint8(i + 1)).toBe(i1);
      expect(memory.getUint8(i + 2)).toBe(i2);
      expect(chip.pc).toBe(0x202);
    }
  );

  test("chip executes `FX55` opcode", () => {
    chip.loadRom(generateRom("f355"));
    chip.I = 0x400;
    chip.vRegisters[0] = 0xf1;
    chip.vRegisters[1] = 0x34;
    chip.vRegisters[2] = 0x56;
    chip.vRegisters[3] = 0x78;
    chip.performCycle();
    const { memory } = chip;
    expect(memory.getUint8(0x400)).toBe(0xf1);
    expect(memory.getUint8(0x401)).toBe(0x34);
    expect(memory.getUint8(0x402)).toBe(0x56);
    expect(memory.getUint8(0x403)).toBe(0x78);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `FX65` opcode", () => {
    chip.loadRom(generateRom("f265"));
    chip.I = 0x444;
    chip.memory.setUint8(0x444, 0x56);
    chip.memory.setUint8(0x445, 0x34);
    chip.memory.setUint8(0x446, 0xfc);
    chip.performCycle();
    expect(chip.vRegisters[0]).toBe(0x56);
    expect(chip.vRegisters[1]).toBe(0x34);
    expect(chip.vRegisters[2]).toBe(0xfc);
    expect(chip.pc).toBe(0x202);
  });
});
