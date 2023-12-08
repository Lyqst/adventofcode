import run from "aocrunner";

const part1 = (input) => {
  let [instructions, network] = input.split("\n\n")
  instructions = instructions.split('').map(i => i == 'L' ? 0 : 1)
  const lines = network.split('\n')
  const nodes = lines.map(line => { return line.split(" = ")[0] });
  network = lines.map(line => {
    const children = line.split(" = ")[1]
    const [left, right] = children.replace(/[()]/g, '').split(", ")
    return [nodes.indexOf(left), nodes.indexOf(right)];
  })
  let currIndex = nodes.indexOf("AAA");
  const endIndex = nodes.indexOf("ZZZ");
  let steps = 0;
  while (currIndex != endIndex) {
    currIndex = network[currIndex][instructions[steps % instructions.length]];
    steps++;
  }
  return steps;
};

function smallestCommons(arr) {
  arr.sort((a, b) => a - b);
  let multiple = arr[arr.length - 1];

  while (true) {
    if (arr.every((number) => multiple % number === 0)) {
      return multiple;
    }
    multiple += arr[arr.length - 1];
  }
}

const part2 = (input) => {
  let [instructions, network] = input.split("\n\n")
  instructions = instructions.split('').map(i => i == 'L' ? 0 : 1)
  const lines = network.split('\n')
  const nodes = lines.map(line => { return line.split(" = ")[0] });
  network = lines.map(line => {
    const children = line.split(" = ")[1]
    const [left, right] = children.replace(/[()]/g, '').split(", ")
    return [nodes.indexOf(left), nodes.indexOf(right)];
  })
  let indices = nodes.map((n, i) => n.endsWith('A') ? i : '').filter(String)
  let steps = []
  indices.forEach((i, index) => {
    let currIndex = i
    let end = false
    steps[index] = 0
    while (!end) {
      currIndex = network[currIndex][instructions[steps[index] % instructions.length]]
      end = nodes[currIndex].endsWith('Z')
      steps[index]++;
    }
  });
  return smallestCommons(steps);
};

run({
  part1: {
    tests: [
      {
        input: `
          RL

          AAA = (BBB, CCC)
          BBB = (DDD, EEE)
          CCC = (ZZZ, GGG)
          DDD = (DDD, DDD)
          EEE = (EEE, EEE)
          GGG = (GGG, GGG)
          ZZZ = (ZZZ, ZZZ)
        `,
        expected: 2,
      },
      {
        input: `
          LLR
          
          AAA = (BBB, BBB)
          BBB = (AAA, ZZZ)
          ZZZ = (ZZZ, ZZZ)
        `,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        LR

        11A = (11B, XXX)
        11B = (XXX, 11Z)
        11Z = (11B, XXX)
        22A = (22B, XXX)
        22B = (22C, 22C)
        22C = (22Z, 22Z)
        22Z = (22B, 22B)
        XXX = (XXX, XXX)
      `,
        expected: 6
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
