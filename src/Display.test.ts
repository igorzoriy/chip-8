import { Display } from "./Display";

describe("Display", () => {
  let display: Display;

  beforeEach(() => {
    display = new Display();
  });
  test("should be initialized", () => {
    expect(display.byteCanvas).toEqual(new Uint8Array(64 * 32));
  });

  test("should be able to clear", () => {
    display.byteCanvas[0] = 1;
    display.clear();
    expect(display.byteCanvas).toEqual(new Uint8Array(64 * 32));
  });

  test("should be able to draw a sprite", () => {
    const erased = display.drawSprite(
      0,
      1,
      new Uint8Array([0x88, 0x50, 0x20, 0x50, 0x88])
    );
    for (let i = 0; i < display.byteCanvas.length; i++) {
      if ([64, 68, 129, 131, 194, 257, 259, 320, 324].includes(i)) {
        expect(display.byteCanvas[i]).toBe(1);
      } else {
        expect(display.byteCanvas[i]).toBe(0);
      }
    }
    expect(erased).toBe(false);
  });

  test("should be able to draw a sprite when a part of sprite is positioned outside", () => {
    const erased = display.drawSprite(
      62,
      30,
      new Uint8Array([0xe0, 0x40, 0xe0])
    );
    for (let i = 0; i < display.byteCanvas.length; i++) {
      if ([0, 62, 63, 1920, 1982, 1983, 2047].includes(i)) {
        expect(display.byteCanvas[i]).toBe(1);
      } else {
        expect(display.byteCanvas[i]).toBe(0);
      }
    }
    expect(erased).toBe(false);
  });

  test("should be able to draw a sprite and return true when the it erases at lease one pixel", () => {
    display.drawSprite(0, 0, new Uint8Array([0xf0]));
    const erased = display.drawSprite(0, 0, new Uint8Array([0xa0]));
    expect(erased).toBe(true);
    expect(display.byteCanvas[0]).toBe(0);
    expect(display.byteCanvas[1]).toBe(1);
    expect(display.byteCanvas[2]).toBe(0);
    expect(display.byteCanvas[3]).toBe(1);
  });
});
