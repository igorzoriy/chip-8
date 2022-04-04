import { Chip8 } from "./Chip8";

const generateRom = (...bytes: number[]) => Uint8Array.of(...bytes).buffer;

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
    chip.loadRom(generateRom(0x00, 0xe0, 0xa2, 0x2a, 0x60, 0x0c, 0x61, 0x08));
    const view = new DataView(chip.memory);
    expect(view.getUint16(0x200)).toBe(0x00e0);
    expect(view.getUint16(0x202)).toBe(0xa22a);
    expect(view.getUint16(0x204)).toBe(0x600c);
    expect(view.getUint16(0x206)).toBe(0x6108);
    expect(view.getUint16(0x208)).toBe(0x0000);
  });

  test("chip executes `ANNN` opcode", () => {
    chip.loadRom(generateRom(0xa1, 0x23));
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    expect(chip.I).toBe(0x123);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `6XNN` opcode", () => {
    chip.loadRom(generateRom(0x6c, 0x95));
    expect(chip.vRegisters[0xc]).toBe(0);
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    expect(chip.vRegisters[0xc]).toBe(0x95);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `7XNN` opcode", () => {
    chip.loadRom(generateRom(0x62, 0x02, 0x72, 0x05));
    expect(chip.vRegisters[2]).toBe(0);
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    chip.performCycle();
    expect(chip.vRegisters[2]).toBe(7);
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `8XY0` opcode", () => {
    chip.loadRom(generateRom(0x65, 0x1a, 0x86, 0x50));
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
    chip.loadRom(generateRom(0x63, 0x05, 0x64, 0x03, 0x83, 0x41));
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
    chip.loadRom(generateRom(0x63, 0x05, 0x64, 0x03, 0x83, 0x42));
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
    chip.loadRom(generateRom(0x63, 0x05, 0x64, 0x03, 0x83, 0x43));
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
    chip.loadRom(generateRom(0x63, 0x05, 0x64, 0x03, 0x83, 0x44));
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
    chip.loadRom(generateRom(0x63, 0x05, 0x64, 0x03, 0x83, 0x45));
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
    chip.loadRom(generateRom(0x63, 0xb3, 0x83, 0x06));
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
    chip.loadRom(generateRom(0x63, 0x05, 0x64, 0x08, 0x83, 0x47));
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
    chip.loadRom(generateRom(0x63, 0x11, 0x83, 0x0e));
    expect(chip.vRegisters[3]).toBe(0);
    expect(chip.vRegisters[0xf]).toBe(0);
    expect(chip.pc).toBe(0x200);
    chip.performCycle();
    chip.performCycle();
    expect(chip.vRegisters[3]).toBe(0x22);
    expect(chip.vRegisters[0xf]).toBe(0);
    expect(chip.pc).toBe(0x204);
  });
});
