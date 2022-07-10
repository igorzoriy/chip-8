import { Chip8, DISPLAY_WIDTH, DISPLAY_HEIGHT } from "./Chip8";
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
      expect(chip.vregisters[i]).toBe(0);
    }
    expect(chip.sp).toBe(0);
    for (let i = 0; i < 16; i++) {
      expect(chip.stack[i]).toBe(0);
    }
    expect(chip.delayTimer).toBe(0);
    expect(chip.soundTimer).toBe(0);
    expect(chip.memory.getUint8(0)).toBe(0xf0);
    expect(chip.memory.getUint8(0x4f)).toBe(0x80);
    expect(chip.memory.getUint8(0x50)).toBe(0);
    expect(chip.vram).toEqual(new Uint8Array(DISPLAY_WIDTH * DISPLAY_HEIGHT));
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

  test("chip ticks", () => {
    chip.delayTimer = 3;
    chip.soundTimer = 5;
    chip.tick();
    expect(chip.delayTimer).toBe(2);
    expect(chip.soundTimer).toBe(4);
    chip.tick();
    expect(chip.delayTimer).toBe(1);
    expect(chip.soundTimer).toBe(3);
    chip.tick();
    expect(chip.delayTimer).toBe(0);
    expect(chip.soundTimer).toBe(2);
    chip.tick();
    expect(chip.delayTimer).toBe(0);
    expect(chip.soundTimer).toBe(1);
    chip.tick();
    expect(chip.delayTimer).toBe(0);
    expect(chip.soundTimer).toBe(0);
    chip.tick();
    expect(chip.delayTimer).toBe(0);
    expect(chip.soundTimer).toBe(0);
  });

  test("chip executes `00E0` opcode", () => {
    chip.vram[0] = 1;
    chip.loadRom(generateRom("00E0"));
    chip.performCycle();
    expect(chip.vram).toEqual(new Uint8Array(DISPLAY_WIDTH * DISPLAY_HEIGHT));
    expect(chip.pc).toBe(0x202);
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
    expect(chip.stack[0]).toBe(0x202);
  });

  test("chip executes `2NNN` opcode and throws an exception when stack is overflow", () => {
    chip.loadRom(
      generateRom(
        "2202 2204 2206 2208 220A 220C 220E 2210 2212 2214 2216 2218 221A 221C 221E 2220 2222"
      )
    );
    for (let i = 0; i < 16; i++) {
      chip.performCycle();
    }
    expect(() => chip.performCycle()).toThrowError("Stack overflow");
  });

  test("chip executes `3XNN` opcode", () => {
    chip.loadRom(generateRom("30ff"));
    chip.vregisters[0] = 0x11;
    chip.performCycle();
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `3XNN` opcode and skips next instruction", () => {
    chip.loadRom(generateRom("30ff"));
    chip.vregisters[0] = 0xff;
    chip.performCycle();
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `4XNN` opcode", () => {
    chip.loadRom(generateRom("40ff"));
    chip.vregisters[0] = 0xff;
    chip.performCycle();
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `4XNN` opcode and skips next instruction", () => {
    chip.loadRom(generateRom("40ff"));
    chip.vregisters[0] = 0x11;
    chip.performCycle();
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `5XY0` opcode", () => {
    chip.loadRom(generateRom("5af0"));
    chip.vregisters[0xa] = 0x35;
    chip.vregisters[0xf] = 0x53;
    chip.performCycle();
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `5XY0` opcode and skips next instruction", () => {
    chip.loadRom(generateRom("5af0"));
    chip.vregisters[0xa] = 0x35;
    chip.vregisters[0xf] = 0x35;
    chip.performCycle();
    expect(chip.pc).toBe(0x204);
  });

  test("chip executes `6XNN` opcode", () => {
    chip.loadRom(generateRom("6c95"));
    chip.performCycle();
    expect(chip.vregisters[0xc]).toBe(0x95);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `7XNN` opcode", () => {
    chip.loadRom(generateRom("7205"));
    chip.vregisters[2] = 0x02;
    chip.performCycle();
    expect(chip.vregisters[2]).toBe(7);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY0` opcode", () => {
    chip.loadRom(generateRom("8650"));
    chip.vregisters[5] = 0x1a;
    chip.performCycle();
    expect(chip.vregisters[6]).toBe(0x1a);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY1` opcode", () => {
    chip.loadRom(generateRom("8341"));
    chip.vregisters[3] = 0x05;
    chip.vregisters[4] = 0x03;
    chip.performCycle();
    expect(chip.vregisters[3]).toBe(0x07);
    expect(chip.vregisters[4]).toBe(0x03);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY2` opcode", () => {
    chip.loadRom(generateRom("8342"));
    chip.vregisters[3] = 0x05;
    chip.vregisters[4] = 0x03;
    chip.performCycle();
    expect(chip.vregisters[3]).toBe(0x01);
    expect(chip.vregisters[4]).toBe(0x03);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY3` opcode", () => {
    chip.loadRom(generateRom("8343"));
    chip.vregisters[3] = 0x05;
    chip.vregisters[4] = 0x03;
    chip.performCycle();
    expect(chip.vregisters[3]).toBe(0x06);
    expect(chip.vregisters[4]).toBe(0x03);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY4` opcode", () => {
    chip.loadRom(generateRom("8344"));
    chip.vregisters[3] = 0x05;
    chip.vregisters[4] = 0x03;
    chip.performCycle();
    expect(chip.vregisters[3]).toBe(0x08);
    expect(chip.vregisters[4]).toBe(0x03);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY5` opcode", () => {
    chip.loadRom(generateRom("8345"));
    chip.vregisters[3] = 0x05;
    chip.vregisters[4] = 0x03;
    chip.performCycle();
    expect(chip.vregisters[3]).toBe(0x02);
    expect(chip.vregisters[4]).toBe(0x03);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY6` opcode", () => {
    chip.loadRom(generateRom("8306"));
    chip.vregisters[3] = 0xb3;
    chip.performCycle();
    expect(chip.vregisters[3]).toBe(0x59);
    expect(chip.vregisters[0xf]).toBe(1);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XY7` opcode", () => {
    chip.loadRom(generateRom("8347"));
    chip.vregisters[3] = 0x05;
    chip.vregisters[4] = 0x08;
    chip.performCycle();
    expect(chip.vregisters[3]).toBe(0x03);
    expect(chip.vregisters[0xf]).toBe(1);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `8XYE` opcode", () => {
    chip.loadRom(generateRom("830e"));
    chip.vregisters[3] = 0x11;
    chip.performCycle();
    expect(chip.vregisters[3]).toBe(0x22);
    expect(chip.vregisters[0xf]).toBe(0);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `9XY0` opcode", () => {
    chip.loadRom(generateRom("9140"));
    chip.vregisters[1] = 0x01;
    chip.vregisters[4] = 0x01;
    chip.performCycle();
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `9XY0` opcode and skips next instruction", () => {
    chip.loadRom(generateRom("9140"));
    chip.vregisters[1] = 0x01;
    chip.vregisters[4] = 0x02;
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
    chip.vregisters[0] = 0x10;
    chip.performCycle();
    expect(chip.pc).toBe(0x010f);
  });

  test.each([
    [
      "d015",
      0,
      1,
      [0x88, 0x50, 0x20, 0x50, 0x88],
      [0, 64, 68, 129, 131, 194, 257, 259, 320, 324],
      0,
    ],
    ["d012", 0, 0, [0xf0, 0xa0], [1, 2, 3, 64, 66], 1],
    ["d013", 62, 30, [0xe0, 0x40, 0xe0], [62, 63, 1920, 1982, 1983, 2047], 1],
  ])(
    "chip executes `DXYN` opcode: %#",
    (
      opcode: string,
      x: number,
      y: number,
      sprite: number[],
      filledPixels: number[],
      erased: number
    ) => {
      chip.loadRom(generateRom(opcode));
      chip.vram[0] = 1; // fill top left pixel
      chip.vregisters[0] = x;
      chip.vregisters[1] = y;
      chip.I = 0x500;
      for (let i = 0; i < sprite.length; i++) {
        chip.memory.setUint8(chip.I + i, sprite[i]);
      }

      chip.performCycle();

      for (let i = 0; i < chip.vram.length; i++) {
        if (filledPixels.includes(i)) {
          expect(chip.vram[i]).toBe(1);
        } else {
          expect(chip.vram[i]).toBe(0);
        }
      }
      expect(chip.vregisters[0xf]).toBe(erased);
      expect(chip.pc).toBe(0x202);
    }
  );

  test("chip executes `FX07` opcode", () => {
    chip.loadRom(generateRom("f407"));
    chip.delayTimer = 0x3c;
    chip.performCycle();
    expect(chip.vregisters[4]).toBe(0x3c);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `FX15` opcode", () => {
    chip.loadRom(generateRom("f515"));
    chip.vregisters[5] = 0xb1;
    chip.performCycle();
    expect(chip.delayTimer).toBe(0xb1);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `FX18` opcode", () => {
    chip.loadRom(generateRom("f018"));
    chip.vregisters[0] = 0x11;
    chip.performCycle();
    expect(chip.soundTimer).toBe(0x11);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `FX1E` opcode", () => {
    chip.loadRom(generateRom("f11e"));
    chip.I = 0x100;
    chip.vregisters[1] = 0x34;
    chip.performCycle();
    expect(chip.I).toBe(0x134);
    expect(chip.pc).toBe(0x202);
  });

  test("chip executes `FX29` opcode", () => {
    chip.loadRom(generateRom("f129"));
    chip.vregisters[1] = 0xe;
    chip.performCycle();
    expect(chip.I).toBe(0x46);
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
      chip.vregisters[rIndex] = rValue;
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
    chip.vregisters[0] = 0xf1;
    chip.vregisters[1] = 0x34;
    chip.vregisters[2] = 0x56;
    chip.vregisters[3] = 0x78;
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
    expect(chip.vregisters[0]).toBe(0x56);
    expect(chip.vregisters[1]).toBe(0x34);
    expect(chip.vregisters[2]).toBe(0xfc);
    expect(chip.pc).toBe(0x202);
  });
});
