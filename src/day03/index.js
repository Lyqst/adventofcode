import run from "aocrunner";

function numberRange(start, end) {
  return new Array(end - start).fill().map((d, i) => i + start);
}

const part1 = (input) => {
  const lineLength = input.indexOf("\n") + 1;
  const symbolRegexp = /[^0-9.\n]/g;
  const symbolPositions = [...input.matchAll(symbolRegexp)].map((match) => match.index);
  const numberRegexp = /[0-9]+/g;
  const numbers = [...input.matchAll(numberRegexp)].map((match) => [match[0], match.index, match[0].length]);
  const sum = numbers.reduce((total, number) => {
    const isEdgeLeft = number[1] % lineLength === 0;
    const isEdgeRight = (number[1] + number[2] + 1) % lineLength === 0;
    let positionsToCheck = [
      ...numberRange(number[1] - (!isEdgeLeft && 1) - lineLength, number[1] + number[2] - lineLength + (!isEdgeRight && 1)),
      !isEdgeLeft && number[1] - 1,
      !isEdgeRight && number[1] + number[2],
      ...numberRange(number[1] - (!isEdgeLeft && 1) + lineLength, number[1] + number[2] + lineLength + (!isEdgeRight && 1)),
    ]
    positionsToCheck = positionsToCheck.filter((position) => position >= 0 && position < input.length);
    const isPartNumber = positionsToCheck.some((position) => symbolPositions.includes(position));
    return isPartNumber ? total + parseInt(number[0]) : total;
  }, 0);
  return sum;
};

const part2 = (input) => {
  const lineLength = input.indexOf("\n") + 1;
  const symbolRegexp = /[\*]/g;
  const symbolPositions = [...input.matchAll(symbolRegexp)].map((match) => match.index);
  const numberRegexp = /[0-9]+/g;
  const numbers = [...input.matchAll(numberRegexp)].map((match) => [match[0], match.index, match[0].length]);
  let potentialGears = Array.from({ length: symbolPositions.length }, () => []);
  numbers.forEach(number => {
    const isEdgeLeft = number[1] % lineLength === 0;
    const isEdgeRight = (number[1] + number[2] + 1) % lineLength === 0;
    let positionsToCheck = [
      ...numberRange(number[1] - (!isEdgeLeft && 1) - lineLength, number[1] + number[2] - lineLength + (!isEdgeRight && 1)),
      !isEdgeLeft && number[1] - 1,
      !isEdgeRight && number[1] + number[2],
      ...numberRange(number[1] - (!isEdgeLeft && 1) + lineLength, number[1] + number[2] + lineLength + (!isEdgeRight && 1)),
    ]
    positionsToCheck = positionsToCheck.filter((position) => position >= 0 && position < input.length);
    positionsToCheck.forEach((position) => {
      const symbolIndex = symbolPositions.findIndex(p => p == position);
      symbolIndex >= 0 && potentialGears[symbolIndex].push(number[0]);
    });
  });
  return potentialGears.reduce((total, gear) => {
    const isGear = gear.length === 2;
    return isGear ? total + parseInt(gear[0]) * parseInt(gear[1]) : total;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
          12.......*..
          +.........34
          .......-12..
          ..78........
          ..*....60...
          78.........9
          .5.....23..$
          8...90*12...
          ............
          2.2......12.
          .*.........*
          1.1..503+.56
        `,
        expected: 925,
      },
      {
        input: `
          467....114
          ...*......
          ..35..633.
          ......#...
          617*......
          .....+.58.
          ..592.....
          ......755.
          ...$.*....
          .664.598..
        `,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          467..114..
          ...*......
          ..35..633.
          ......#...
          617*......
          .....+.58.
          ..592.....
          ......755.
          ...$.*....
          .664.598..
        `,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
