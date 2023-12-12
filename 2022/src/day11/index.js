import run from "aocrunner"

const part1 = (input) => {
  const monkeys = input.split("\n\n").map((m) => {
    const lines = m.split("\n")
    return {
      items: lines[1].split(": ")[1].split(", ").map(Number) || [],
      operation: (n) => eval(lines[2].split("= ")[1].replaceAll('old', n)),
      throwTo: (n) => (n % lines[3].split("by ")[1]) === 0 ? lines[4].split("monkey ")[1] : lines[5].split("monkey ")[1],
      inspected: 0
    }
  })
  for (let i = 0; i < 20; i++) {
    monkeys.forEach((m) => {
      while (m.items.length > 0) {
        const item = m.items.shift()
        const newItem = Math.floor(m.operation(item) / 3)
        const throwTo = m.throwTo(newItem)
        monkeys[throwTo].items.push(newItem)
        m.inspected++
      }
    })
  }
  const max1 = Math.max(...monkeys.map((m) => m.inspected))
  const max2 = Math.max(...monkeys.filter((m) => m.inspected !== max1).map((m) => m.inspected))
  return max1 * max2
}

const part2 = (input) => {
  const monkeys = input.split("\n\n").map((m) => {
    const lines = m.split("\n")
    return {
      items: lines[1].split(": ")[1].split(", ").map(Number) || [],
      operation: (n) => eval(lines[2].split("= ")[1].replaceAll('old', n)),
      divisibleBy: lines[3].split("by ")[1],
      throwTo: (n) => (n % lines[3].split("by ")[1]) === 0 ? lines[4].split("monkey ")[1] : lines[5].split("monkey ")[1],
      inspected: 0
    }
  })
  const lcm = monkeys.map((m) => m.divisibleBy).reduce((a, b) => a * b, 1)
  for (let i = 0; i < 10000; i++) {
    monkeys.forEach((m) => {
      while (m.items.length > 0) {
        const item = m.items.shift()
        const newItem = m.operation(item) % lcm
        const throwTo = m.throwTo(newItem)
        monkeys[throwTo].items.push(newItem)
        m.inspected++
      }
    })
  }
  const max1 = Math.max(...monkeys.map((m) => m.inspected))
  const max2 = Math.max(...monkeys.filter((m) => m.inspected !== max1).map((m) => m.inspected))
  return max1 * max2
}

run({
  part1: {
    tests: [
      {
        input: `
        Monkey 0:
          Starting items: 79, 98
          Operation: new = old * 19
          Test: divisible by 23
            If true: throw to monkey 2
            If false: throw to monkey 3

        Monkey 1:
          Starting items: 54, 65, 75, 74
          Operation: new = old + 6
          Test: divisible by 19
            If true: throw to monkey 2
            If false: throw to monkey 0

        Monkey 2:
          Starting items: 79, 60, 97
          Operation: new = old * old
          Test: divisible by 13
            If true: throw to monkey 1
            If false: throw to monkey 3

        Monkey 3:
          Starting items: 74
          Operation: new = old + 3
          Test: divisible by 17
            If true: throw to monkey 0
            If false: throw to monkey 1
        `,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Monkey 0:
          Starting items: 79, 98
          Operation: new = old * 19
          Test: divisible by 23
            If true: throw to monkey 2
            If false: throw to monkey 3

        Monkey 1:
          Starting items: 54, 65, 75, 74
          Operation: new = old + 6
          Test: divisible by 19
            If true: throw to monkey 2
            If false: throw to monkey 0

        Monkey 2:
          Starting items: 79, 60, 97
          Operation: new = old * old
          Test: divisible by 13
            If true: throw to monkey 1
            If false: throw to monkey 3

        Monkey 3:
          Starting items: 74
          Operation: new = old + 3
          Test: divisible by 17
            If true: throw to monkey 0
            If false: throw to monkey 1
        `,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
})
