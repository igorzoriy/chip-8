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
    expect(chip.v.byteLength).toBe(8);
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
});
