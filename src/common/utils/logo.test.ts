import { getDimensions } from "./logo";

describe("getDimensions", () => {
  it("should return proportionate width and height values, capped at maxWidth, when landscape", () => {
    const width = 400;
    const height = 300;
    const size = getDimensions({ width: width, height: height, maxWidth: 100, maxHeight: 100 });
    expect(size.width).toBe(100);
    expect(size.height).toBe((height / width) * 100);

    const width2 = 900;
    const height2 = 400;
    const size2 = getDimensions({ width: width2, height: height2, maxWidth: 100, maxHeight: 100 });
    expect(size2.width).toBe(100);
    expect(size2.height).toBe((height2 / width2) * 100);
  });

  it("should return proportionate width and height values, capped at maxHeight, when portrait", () => {
    const width = 300;
    const height = 600;
    const size = getDimensions({ width: width, height: height, maxWidth: 100, maxHeight: 100 });
    expect(size.width).toBe((width / height) * 100);
    expect(size.height).toBe(100);

    const width2 = 500;
    const height2 = 800;
    const size2 = getDimensions({ width: width2, height: height2, maxWidth: 100, maxHeight: 100 });
    expect(size2.width).toBe((width2 / height2) * 100);
    expect(size2.height).toBe(100);
  });
});
