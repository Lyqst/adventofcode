import run from "aocrunner";

const letterCardToValue = (letter, jokerValue = false) => {
  switch (letter) {
    case "T":
      return 10;
    case "J":
      return jokerValue ? 0 : 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
    default:
      return parseInt(letter);
  }
}

const part1 = (input) => {
  const games = input.split("\n").map((line) => line.split(" "));

  games.forEach(game => {
    const hand = game[0];
    const cards = Array.from(new Set(hand)).map(card => { return { card, count: hand.split(card).length - 1 } });

    if (cards.length == 1) {
      game.push(7);
    } else if (cards.length == 2) {
      if (cards.some(card => card.count === 4)) {
        game.push(6);
      } else {
        game.push(5);
      }
    } else if (cards.length == 3) {
      if (cards.some(card => card.count === 3)) {
        game.push(4);
      } else {
        game.push(3);
      }
    } else if (cards.length == 4) {
      game.push(2);
    } else {
      game.push(1);
    }
  });
  games.sort((a, b) => {
    if (a[2] > b[2]) {
      return 1
    } else if (a[2] < b[2]) {
      return -1
    }
    a = a[0].split("").map((c) => letterCardToValue(c));
    b = b[0].split("").map((c) => letterCardToValue(c));
    for (let i = 0; i < 5; i++) {
      if (a[i] > b[i]) {
        return 1
      } else if (a[i] < b[i]) {
        return -1
      }
    }
    return 0
  });

  return games.reduce((total, game, index) => {
    return total + (game[1] * (index + 1));
  }, 0);
};

const part2 = (input) => {
  const games = input.split("\n").map((line) => line.split(" "));

  games.forEach(game => {
    const hand = game[0];
    let jokers = 0;
    const cards = Array.from(new Set(hand)).map(card => {
      if (card === "J") jokers = hand.split(card).length - 1
      return { card, count: hand.split(card).length - 1 }
    }).filter(card => card.card !== "J");
    if (cards.length === 1 || jokers === 5) {
      game.push(7);
    } else if (cards.length === 2) {
      if (cards.some(card => card.count === 4 - jokers)) {
        game.push(6);
      } else {
        game.push(5);
      }
    } else if (cards.length === 3) {
      if (cards.some(card => card.count === 3 - jokers)) {
        game.push(4);
      } else {
        game.push(3);
      }
    } else if (cards.length === 4) {
      game.push(2);
    } else {
      game.push(1);
    }
  });
  games.sort((a, b) => {
    if (a[2] > b[2]) {
      return 1
    } else if (a[2] < b[2]) {
      return -1
    }
    a = a[0].split("").map((c) => letterCardToValue(c, true));
    b = b[0].split("").map((c) => letterCardToValue(c, true));
    for (let i = 0; i < 5; i++) {
      if (a[i] > b[i]) {
        return 1
      } else if (a[i] < b[i]) {
        return -1
      }
    }
    return 0
  });

  return games.reduce((total, game, index) => {
    return total + (game[1] * (index + 1));
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
          32T3K 765
          T55J5 684
          KK677 28
          KTJJT 220
          QQQJA 483
        `,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          32T3K 765
          T55J5 684
          KK677 28
          KTJJT 220
          QQQJA 483
        `,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});

