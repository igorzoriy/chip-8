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
    expect(chip.vRegisters.length).toBe(16);
  });

  test("a rom is being loaded to chip memory", () => {
    chip.loadRom(generateRom("00e0 a22a 600c 6108"));
    const view = new DataView(chip.memory);
    expect(view.getUint16(0x200)).toBe(0x00e0);
    expect(view.getUint16(0x202)).toBe(0xa22a);
    expect(view.getUint16(0x204)).toBe(0x600c);
    expect(view.getUint16(0x206)).toBe(0x6108);
    expect(view.getUint16(0x208)).toBe(0x0000);
  });

  test("chip parses x, y, nn, nnn from opcodes", () => {
    expect(chip.parseOpcode(0xa64f).nnn).toBe(0x64f);

    expect(chip.parseOpcode(0x42dd).x).toBe(2);
    expect(chip.parseOpcode(0x42dd).nn).toBe(0xdd);

    expect(chip.parseOpcode(0x58f0).x).toBe(8);
    expect(chip.parseOpcode(0x58f0).y).toBe(0xf);
  });

  test("chip executes `00EE` opcode", () => {
    chip.loadRom(generateRom("2202 2204 00EE 00EE"));
    chip.performCycle();
    chip.performCycle();
    chip.performCycle();
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `00EE` opcode and throws an exception when stack is underflow", () => {
    chip.loadRom(generateRom("00EE"));
    expect(() => chip.performCycle()).toThrowError("Stack underflow");
  });

  test("chip executes `1NNN` opcode", () => {
    chip.loadRom(generateRom("12ff"));
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    expect(chip.pc).toBe(0x2ff);
  });

  test("chip executes `2NNN` opcode", () => {
    chip.loadRom(generateRom("24FF"));
    expect(chip.pc).toBe(0x200);
    expect(chip.sp).toBe(0);
    expect(chip.stack[0]).toBe(0);
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
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `3XNN` opcode and skips next instruction", () => {
    chip.loadRom(generateRom("30ff"));
    chip.vRegisters[0] = 0xff;
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `4XNN` opcode", () => {
    chip.loadRom(generateRom("40ff"));
    chip.vRegisters[0] = 0xff;
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `4XNN` opcode and skips next instruction", () => {
    chip.loadRom(generateRom("40ff"));
    chip.vRegisters[0] = 0x11;
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `5XY0` opcode", () => {
    chip.loadRom(generateRom("5af0"));
    chip.vRegisters[0xa] = 0x35;
    chip.vRegisters[0xf] = 0x53;
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `5XY0` opcode and skips next instruction", () => {
    chip.loadRom(generateRom("5af0"));
    chip.vRegisters[0xa] = 0x35;
    chip.vRegisters[0xf] = 0x35;
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `6XNN` opcode", () => {
    chip.loadRom(generateRom("6c95"));
    expect(chip.vRegisters[0xc]).toBe(0);
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    expect(chip.vRegisters[0xc]).toBe(0x95);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `7XNN` opcode", () => {
    chip.loadRom(generateRom("6202 7205"));
    expect(chip.vRegisters[2]).toBe(0);
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    chip.performCycle();
    expect(chip.vRegisters[2]).toBe(7);
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `8XY0` opcode", () => {
    chip.loadRom(generateRom("651a 8650"));
    expect(chip.vRegisters[5]).toBe(0);
    expect(chip.vRegisters[6]).toBe(0);
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    chip.performCycle();
    expect(chip.vRegisters[5]).toBe(0x1a);
    expect(chip.vRegisters[6]).toBe(0x1a);
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `8XY1` opcode", () => {
    chip.loadRom(generateRom("6305 6403 8341"));
    expect(chip.vRegisters[3]).toBe(0);
    expect(chip.vRegisters[4]).toBe(0);
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    chip.performCycle();
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x07);
    expect(chip.vRegisters[4]).toBe(0x03);
    expect(chip.pc).toBe(0x206);
  });

  test("chip executes `8XY2` opcode", () => {
    chip.loadRom(generateRom("6305 6403 8342"));
    expect(chip.vRegisters[3]).toBe(0);
    expect(chip.vRegisters[4]).toBe(0);
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    chip.performCycle();
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x01);
    expect(chip.vRegisters[4]).toBe(0x03);
    expect(chip.pc).toBe(0x206);
  });

  test("chip executes `8XY3` opcode", () => {
    chip.loadRom(generateRom("6305 6403 8343"));
    expect(chip.vRegisters[3]).toBe(0);
    expect(chip.vRegisters[4]).toBe(0);
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    chip.performCycle();
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x06);
    expect(chip.vRegisters[4]).toBe(0x03);
    expect(chip.pc).toBe(0x206);
  });

  test("chip executes `8XY4` opcode", () => {
    chip.loadRom(generateRom("6305 6403 8344"));
    expect(chip.vRegisters[3]).toBe(0);
    expect(chip.vRegisters[4]).toBe(0);
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    chip.performCycle();
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x08);
    expect(chip.vRegisters[4]).toBe(0x03);
    expect(chip.pc).toBe(0x206);
  });

  test("chip executes `8XY5` opcode", () => {
    chip.loadRom(generateRom("6305 6403 8345"));
    expect(chip.vRegisters[3]).toBe(0);
    expect(chip.vRegisters[4]).toBe(0);
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    chip.performCycle();
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x02);
    expect(chip.vRegisters[4]).toBe(0x03);
    expect(chip.pc).toBe(0x206);
  });

  test("chip executes `8XY6` opcode", () => {
    chip.loadRom(generateRom("63b3 8306"));
    expect(chip.vRegisters[3]).toBe(0);
    expect(chip.vRegisters[0xf]).toBe(0);
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x59);
    expect(chip.vRegisters[0xf]).toBe(1);
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `8XY7` opcode", () => {
    chip.loadRom(generateRom("6305 6408 8347"));
    expect(chip.vRegisters[3]).toBe(0);
    expect(chip.vRegisters[4]).toBe(0);
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    chip.performCycle();
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x03);
    expect(chip.vRegisters[0xf]).toBe(1);
    expect(chip.pc).toBe(0x206);
  });

  test("chip executes `8XYE` opcode", () => {
    chip.loadRom(generateRom("6311 830e"));
    expect(chip.vRegisters[3]).toBe(0);
    expect(chip.vRegisters[0xf]).toBe(0);
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x22);
    expect(chip.vRegisters[0xf]).toBe(0);
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `9XY0` opcode", () => {
    chip.loadRom(generateRom("9140"));
    chip.vRegisters[1] = 0x01;
    chip.vRegisters[4] = 0x01;
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `9XY0` opcode and skips next instruction", () => {
    chip.loadRom(generateRom("9140"));
    chip.vRegisters[1] = 0x01;
    chip.vRegisters[4] = 0x02;
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `ANNN` opcode", () => {
    chip.loadRom(generateRom("a123"));
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    expect(chip.I).toBe(0x123);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `BNNN` opcode", () => {
    chip.loadRom(generateRom("6010 b0ff"));
    chip.performCycle();
    chip.performCycle();
    expect(chip.pc).toBe(0x010f);
  });
});
