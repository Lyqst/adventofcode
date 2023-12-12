import run from "aocrunner"

import ocr from "../utils/ocr/index.cjs"

const part1 = (input) => {
  return input.split("\n").map((line) => line.split(" ")).reduce((_, [instruction, value]) => {
    _.cycleCount += instruction == "noop" ? 1 : 2
    if (_.cycleCount >= _.cycleToCheck && _.cycleToCheck < 260) {
      _.total += _.x * _.cycleToCheck
      _.cycleToCheck += 40
    }
    if (instruction == "addx") _.x += parseInt(value)
    return _
  }, { cycleCount: 0, cycleToCheck: 20, x: 1, total: 0 }).total
}

const part2 = (input) => {
  const draw = (line, x, cycle) => {
    let sprite = (Math.abs(x - (cycle % 40)) < 2) ? "#" : "."
    line.push(sprite)
    return line
  }
  let crt = input.split("\n").map((line) => line.split(" ")).reduce((_, [instruction, value]) => {
    _.currLine = draw(_.currLine, _.x, _.cycleCount)
    _.cycleCount++
    if (_.cycleCount >= _.cycleToCheck) {
      _.crt.push(_.currLine)
      _.currLine = []
      _.cycleToCheck += 40
    }
    if (instruction == "addx") {
      _.currLine = draw(_.currLine, _.x, _.cycleCount)
      _.cycleCount++
      _.x += parseInt(value)
      if (_.cycleCount >= _.cycleToCheck) {
        _.crt.push(_.currLine)
        _.currLine = []
        _.cycleToCheck += 40
      }
    }
    return _
  }, { cycleCount: 0, cycleToCheck: 40, x: 1, currLine: [], crt: [] }).crt
  return ocr(crt.map(line => line.join("")).join("\n"))
}

run({
  part1: {
    tests: [
      {
        input: `
        addx 15
        addx -11
        addx 6
        addx -3
        addx 5
        addx -1
        addx -8
        addx 13
        addx 4
        noop
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx 5
        addx -1
        addx -35
        addx 1
        addx 24
        addx -19
        addx 1
        addx 16
        addx -11
        noop
        noop
        addx 21
        addx -15
        noop
        noop
        addx -3
        addx 9
        addx 1
        addx -3
        addx 8
        addx 1
        addx 5
        noop
        noop
        noop
        noop
        noop
        addx -36
        noop
        addx 1
        addx 7
        noop
        noop
        noop
        addx 2
        addx 6
        noop
        noop
        noop
        noop
        noop
        addx 1
        noop
        noop
        addx 7
        addx 1
        noop
        addx -13
        addx 13
        addx 7
        noop
        addx 1
        addx -33
        noop
        noop
        noop
        addx 2
        noop
        noop
        noop
        addx 8
        noop
        addx -1
        addx 2
        addx 1
        noop
        addx 17
        addx -9
        addx 1
        addx 1
        addx -3
        addx 11
        noop
        noop
        addx 1
        noop
        addx 1
        noop
        noop
        addx -13
        addx -19
        addx 1
        addx 3
        addx 26
        addx -30
        addx 12
        addx -1
        addx 3
        addx 1
        noop
        noop
        noop
        addx -9
        addx 18
        addx 1
        addx 2
        noop
        noop
        addx 9
        noop
        noop
        noop
        addx -1
        addx 2
        addx -37
        addx 1
        addx 3
        noop
        addx 15
        addx -21
        addx 22
        addx -6
        addx 1
        noop
        addx 2
        addx 1
        noop
        addx -10
        noop
        noop
        addx 20
        addx 1
        addx 2
        addx 2
        addx -6
        addx -11
        noop
        noop
        noop
        `,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
