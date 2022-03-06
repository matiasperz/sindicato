import fc from "fast-check";
import { rle } from "../src/main";

// sanity check that tests work
test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});

test("rle for empty strings should be the empty array", () => {
  expect(rle("")).toStrictEqual([]);
});

test("rle single letter should be the letter with count of 1", () => {
  expect(rle("a")).toEqual([["a", 1]]);
});

test("rle two letters should be the two letters with count of 1", () => {
  let x = rle("ab");
  expect(x).toEqual([
    ["a", 1],
    ["b", 1],
  ]);
});

test("rle of 10 letters should be the letter with count of 10", () => {
  expect(rle("aaaaaaaaaa")).toEqual([["a", 10]]);
});

test("rle letters should be the letters with their count", () => {
  expect(rle("abbcccdddd")).toEqual([
    ["a", 1],
    ["b", 2],
    ["c", 3],
    ["d", 4],
  ]);
});

test("rle shouldn't group separated repeated letters in one position", () => {
  expect(rle("abbcccbbbb")).toEqual([
    ["a", 1],
    ["b", 2],
    ["c", 3],
    ["b", 4],
  ]);
});


// this is just an example of a property-based-test
it("sum is commutative", () => {
  const commutativity = fc.property(
    fc.integer(),
    fc.float(),
    (a: number, b: number) => {
      return a + b === b + a;
    }
  );

  fc.assert(commutativity, { verbose: true });
});

it("sum of char groups should be equal to total length", () => {
  const integerConfig = { min: 1, max: 100 }

  fc.assert(fc.property(
    fc.integer(integerConfig),
    fc.integer(integerConfig),
    fc.integer(integerConfig),
    (a: number,b: number,c: number) => {
      const totalLength = a + b + c;

      const encoded = rle("a".repeat(a) + "b".repeat(b) + "c".repeat(c))
      const encodedTotalLength = encoded.reduce((acc, [char, count]) => acc + count, 0);

      return totalLength === encodedTotalLength;
    }
  ), { verbose: true });
});

