import { formatSeconds, numberWithCommas, formatVideoTitle } from "./functions";
import { LoremIpsum } from "lorem-ipsum";
const lorem = new LoremIpsum({});

describe("format seconds", () => {
  it("convert 373 to 6:13", () => {
    expect(formatSeconds(3612)).toEqual("1:00:12");
  });

  it("convert 3612 to 1:00:12", () => {
    expect(formatSeconds(3612)).toEqual("1:00:12");
  });
});

describe("numbers with commas", () => {
  it("convert 1234567890 to 1,234,567,890", () => {
    expect(numberWithCommas(1234567890)).toEqual("1,234,567,890");
  });
});

describe("format video title", () => {
  it("truncate long string", () => {
    const longSampleText = lorem.generateWords(100);

    expect(formatVideoTitle(longSampleText)).toHaveLength(43);
  });
});
