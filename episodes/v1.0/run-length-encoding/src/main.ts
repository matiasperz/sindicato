type RunLengthEncodedString = [string, number][];

// given a string, return each repeating character and it's run count, for example:
// "aaaabbbccc" => [["a", 4], ["b", 3], ["c", 3]]
//
// see https://en.wikipedia.org/wiki/Run-length_encoding
export function rle(plain: string): RunLengthEncodedString {
  const encoded: RunLengthEncodedString = []

  for(let i = 0; i < plain.length; i++) {
    const char = plain[i];
    const isEqualToPrev = char === plain[i - 1];

    if(isEqualToPrev) {
      encoded[encoded.length - 1][1]++;
    } else {
      encoded.push([char, 1]);
    }
  }

  return encoded;
}
