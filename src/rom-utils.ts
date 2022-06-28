export const generateRom = (chars: string): ArrayBuffer => {
  const bytes: number[] = [];
  let numStr = "";
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (char === " ") {
      continue;
    }

    numStr += char;
    if (numStr.length < 2) {
      continue;
    }

    const num = parseInt(numStr, 16);
    if (Number.isNaN(num)) {
      throw new Error(`Can't convert ${numStr} to number`);
    }
    bytes.push(num);
    numStr = "";
  }

  if (bytes.length % 2 !== 0 || numStr.length !== 0) {
    throw new Error("Invalid number of hexcodes");
  }

  return Uint8Array.from(bytes).buffer;
};

export const dumpVram = (vram: Uint8Array, width: number, heigth: number) => {
  let dump = "";
  for (let y = 0; y < heigth; y++) {
    for (let x = 0; x < width; x++) {
      dump += vram[x + y * width] ? "X" : "-";
    }
    dump += "\n";
  }
  console.log(dump);
};
