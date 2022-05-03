import { generateRom } from "./rom-utils";

describe("Rom utils", () => {
  test("generateRom generates ArrayBuffer with rom from a string of hexcodes", () => {
    const view1 = new DataView(generateRom("00e0a22a"));
    expect(view1.getUint16(0x00)).toBe(0x00e0);
    expect(view1.getUint16(0x02)).toBe(0xa22a);

    const view2 = new DataView(generateRom("00e0 a22a 600c"));
    expect(view2.getUint16(0x00)).toBe(0x00e0);
    expect(view2.getUint16(0x02)).toBe(0xa22a);
    expect(view2.getUint16(0x04)).toBe(0x600c);
  });

  test("generateRom throws error if hexcodes are invalid", () => {
    expect(() => generateRom("xxe0 a22a")).toThrowError(
      "Can't convert xx to number"
    );
  });

  test("generateRom throws error if number of hexcodes is invalid", () => {
    expect(() => generateRom("00e")).toThrowError("Invalid number of hexcodes");
    expect(() => generateRom("00e0a")).toThrowError(
      "Invalid number of hexcodes"
    );
    expect(() => generateRom("00e0a2")).toThrowError(
      "Invalid number of hexcodes"
    );
    expect(() => generateRom("00e0a22")).toThrowError(
      "Invalid number of hexcodes"
    );
  });
});
