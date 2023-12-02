import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  let sum = 0;
  lines.forEach(line => {
    const chars = line.split("");
    const firstDigit = chars.find(char => !isNaN(char));
    const lastDigit = chars.reverse().find(char => !isNaN(char));
    sum += parseInt(firstDigit + lastDigit);
  });
  return sum;
};

const part2 = (rawInput) => {
  let input = parseInput(rawInput);
  const digits = [
    ['one', 'o1e'],
    ['two', 't2o'],
    ['three', 't3e'],
    ['four', '4'],
    ['five', '5e'],
    ['six', '6'],
    ['seven', '7n'],
    ['eight', 'e8'],
    ['nine', '9']
  ];
  digits.forEach(digit => { input = input.replaceAll(digit[0], digit[1]) });
  const lines = input.split("\n");
  let sum = 0;
  lines.forEach(line => {
    const chars = line.split("");
    const firstDigit = chars.find(char => !isNaN(char));
    const lastDigit = chars.reverse().find(char => !isNaN(char));
    sum += parseInt(firstDigit + lastDigit);
  });
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `jnsk5aaa`,
        expected: 55,
      },
      {
        input: `1sdgjnsk5`,
        expected: 15,
      },
      {
        input: `sdg4j4441nsk`,
        expected: 41,
      },
      {
        input: `
        sd5g5j41nsk9
        1sdgjnsk5
        `,
        expected: 74,
      },
      {
        input: `
        1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet
        `,
        expected: 142,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: 'onethree',
        expected: 13,
      },
      {
        input: `
        two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen
        `,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true
});
