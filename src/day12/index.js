import run from "aocrunner";

const gen = (candidates, existing, pointer = -1, i = 0) => {
  if (i == candidates.length) {
    return 1;
  }
  let solutions = 0;
  const possiblePos = candidates[i].possiblePos.filter(p => p > pointer && (existing.length == 0 || p <= existing[0]));
  for (let j = 0; j < possiblePos.length; j++) {
    // console.log(i, possiblePos.join(' '), pointer, existing)
    const newExisting = [...existing].filter(e => e > possiblePos[j] + candidates[i].group);
    solutions += gen(candidates, newExisting, possiblePos[j] + candidates[i].group, i + 1);
  }
  return solutions;
}

const part1 = (input) => {
  return input.split("\n").reduce((total, line) => {
    const [[springs], groups] = line.split(" ").map(g => g.split(","));
    const distinctGroups = new Set(groups);
    let possiblePos = new Map();
    [...distinctGroups].forEach((group) => {
      const regex = new RegExp(`(?<=([.?]|^))[?#](?=[?#]{${parseInt(group) - 1}}([.?]+|$))`, "g");
      possiblePos.set(group, [...springs.matchAll(regex)].map(m => m.index));
    });
    const candidates = Array(groups.length)
    const existing = [...springs.matchAll(/(?<=([.?]|^))[#]/g)].map(m => m.index);
    groups.forEach((group, index) => {
      candidates[index] = { group: parseInt(group), possiblePos: possiblePos.get(group) };
    });
    const gen1 = gen(candidates, existing);
    console.log(line, gen1)
    return total + gen1;
  }, 0);
};

const part2 = (input) => {
  // return input.split("\n").reduce((total, line) => {
  //   const [[springs], groups] = line.split(" ").map(g => g.split(","));
  //   const newSprings = Array(5).fill(springs).join('?');
  //   const distinctGroups = new Set(groups);
  //   let possiblePos = new Map();
  //   [...distinctGroups].forEach((group) => {
  //     const regex = new RegExp(`(?<=([.?]|^))[?#](?=[?#]{${parseInt(group) - 1}}([.?]+|$))`, "g");
  //     //console.log(regex)
  //     possiblePos.set(group, [...newSprings.matchAll(regex)].map(m => m.index));
  //   });
  //   const newGroups = Array(5).fill(groups).flat();
  //   const candidates = Array(newGroups.length)
  //   const existing = [...newSprings.matchAll(/(?<=([.?]|^))[#]/g)].map(m => m.index);
  //   newGroups.forEach((group, index) => {
  //     candidates[index] = { group: parseInt(group), possiblePos: possiblePos.get(group) };
  //   });
  //   //console.log(possiblePos)
  //   return total + gen(candidates, existing);
  // }, 0);
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   ???.### 1,1,3
      //   `,
      //   expected: 1
      // },
      // {
      //   input: `
      //   .??..??...?##. 1,1,3
      //   `,
      //   expected: 4
      // },
      // {
      //   input: `
      //   ?#?#?#?#?#?#?#? 1,3,1,6
      //   `,
      //   expected: 1
      // },
      // {
      //   input: `
      //   ????.#...#... 4,1,1
      //   `,
      //   expected: 1
      // },
      // {
      //   input: `
      //   ????.######..#####. 1,6,5
      //   `,
      //   expected: 4
      // },
      // {
      //   input: `
      //   ?###???????? 3,2,1
      //   `,
      //   expected: 10
      // },
      // {
      //   input: `?#?????#??. 3,3`,
      //   expected: 6
      // },
      // {
      //   input: `???#???#?#?? 1,3,1,1`,
      //   expected: 4
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `
      //   ???.### 1,1,3
      //   `,
      //   expected: 1
      // },
      // {
      //   input: `
      //   .??..??...?##. 1,1,3
      //   `,
      //   expected: 16384
      // },
      // {
      //   input: `
      //   ?#?#?#?#?#?#?#? 1,3,1,6
      //   `,
      //   expected: 1
      // },
      // {
      //   input: `
      //   ????.#...#... 4,1,1
      //   `,
      //   expected: 16
      // },
      // {
      //   input: `
      //   ????.######..#####. 1,6,5
      //   `,
      //   expected: 2500
      // },
      // {
      //   input: `
      //   ?###???????? 3,2,1
      //   `,
      //   expected: 506250
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
