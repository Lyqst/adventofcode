import run from "aocrunner";

const getMaxPerColor = (sets, color) => {
  const re = new RegExp(`\\d+(\\.\\d)* ${color}+`, 'g');
  return Math.max(...(sets.match(re).map(match => match.split(" ")[0])));
}

const part1 = (input) => {
  const games = input.split("\n");

  const sum = games.reduce((total, game) => {
    const [tag, sets] = game.split(": ");
    const id = parseInt(tag.split(" ")[1]);

    const isValid = getMaxPerColor(sets, 'blue') < 15 && getMaxPerColor(sets, 'green') < 14 && getMaxPerColor(sets, 'red') < 13;

    return isValid ? total + id : total;
  }, 0);

  return sum;
};

const part2 = (input) => {
  const games = input.split("\n");

  const sum = games.reduce((total, game) => {
    const maxBlue = getMaxPerColor(game, 'blue');
    const maxGreen = getMaxPerColor(game, 'green');
    const maxRed = getMaxPerColor(game, 'red');
    return total + (maxBlue * maxGreen * maxRed);
  }, 0);

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 1 blue, 1 red, 1 green; 2 blue, 2 green, 2 red`,
        expected: 1,
      },
      {
        input: `
          Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
          Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
          Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
          Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
          Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `,
        expected: 8
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
          Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
          Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
          Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
          Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
