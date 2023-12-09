import run from "aocrunner"

const part1 = (input) => {
  const pairs = input.split('\n').map((line) => { return line.split(',') })
  return pairs.filter(pair => {
    const first = pair[0].split('-').map(Number)
    const second = pair[1].split('-').map(Number)
    return (first[0] <= second[0] && first[1] >= second[1]) || (second[0] <= first[0] && second[1] >= first[1])
  }).length
}

const part2 = (input) => {
  const pairs = input.split('\n').map((line) => { return line.split(',') })
  return pairs.filter(pair => {
    const first = pair[0].split('-').map(Number)
    const second = pair[1].split('-').map(Number)
    return (first[0] >= second[0] && first[0] <= second[1]) || (second[0] >= first[0] && second[0] <= first[1])
  }).length
}

run({
  part1: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
