import { Chip8 } from "./Chip8";

test("chip8 is initialized after creating", () => {
  const chip = new Chip8();
  expect(chip.opcode).toBe(0);
  expect(chip.I).toBe(0);
  expect(chip.pc).toBe(0x200);
});
