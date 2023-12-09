import run from "aocrunner"

const part1 = (input) => {
  const rucksacks = input.split('\n').map((line) => { return line.split('') })
  return rucksacks.reduce((total, rucksack) => {
    const first = rucksack.slice(0, rucksack.length / 2)
    const second = rucksack.slice(rucksack.length / 2)
    const charCode = first.find(item => second.includes(item)).charCodeAt(0)
    return total + charCode - (charCode > 96 ? 96 : 38)
  }, 0)
}

const part2 = (input) => {
  const rucksacks = input.split('\n').map((line) => { return line.split('') })
  let total = 0
  for(let i = 0; i < rucksacks.length; i+= 3) {
    const charCode = rucksacks[i].find(item => rucksacks[i + 1].includes(item) && rucksacks[i + 2].includes(item)).charCodeAt(0)
    total = total + charCode - (charCode > 96 ? 96 : 38)
  }
  return total
}

run({
  part1: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
