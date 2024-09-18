import { match } from "assert";
import type { ScoreHistory } from "./penalty-types";
import {
  checkVictory,
  printScore,
  shoot,
  updateHistory,
  updateScore,
  winner,
} from "./penalty-utils";

// Scenario nominal
const match1 = (history: ScoreHistory) => {
  let score =
    history.length > 0 ? history[history.length - 1] : { TeamA: 0, TeamB: 0 };
  const randomNumberTeamA = Math.random();
  const penaltyteamA = shoot(randomNumberTeamA);
  const scoreAfterShootA = updateScore(penaltyteamA, "TeamA", score);
  const randomNumberTeamB = Math.random();
  const penaltyteamB = shoot(randomNumberTeamB);
  const scoreAfterShootB = updateScore(penaltyteamB, "TeamB", scoreAfterShootA);
  const newHistory = updateHistory(history, scoreAfterShootB);

  if (newHistory.length < 5) match1(newHistory);
  else {
    const result = winner(newHistory[newHistory.length - 1]);
    for (let i = 0; i < newHistory.length; i++) {
      const previousScore = i >= 1 ? newHistory[i - 1] : { TeamA: 0, TeamB: 0 };
      console.log(printScore(i, newHistory[i], previousScore));
    }
    console.log(`Winner is : ${result}`);
  }
};
console.log("scenario nominal");
match1([]);

// Scenario alternatif 1
const match2 = (history: ScoreHistory) => {
  let score =
    history.length > 0 ? history[history.length - 1] : { TeamA: 0, TeamB: 0 };

  const shotsRemaining = 5 - history.length;

  const randomNumberTeamA = Math.random();
  const penaltyteamA = shoot(randomNumberTeamA);
  const scoreAfterShootA = updateScore(penaltyteamA, "TeamA", score);

  const randomNumberTeamB = Math.random();
  const penaltyteamB = shoot(randomNumberTeamB);
  const scoreAfterShootB = updateScore(penaltyteamB, "TeamB", scoreAfterShootA);
  const newHistory = updateHistory(history, scoreAfterShootB);

  if (checkVictory(scoreAfterShootB, shotsRemaining)) {
    const result = winner(scoreAfterShootB);
    // console.log(newHistory[newHistory.length - 1]);
    for (let i = 0; i < newHistory.length; i++) {
      const previousScore = i >= 1 ? newHistory[i - 1] : { TeamA: 0, TeamB: 0 };
      console.log(printScore(i, newHistory[i], previousScore));
    }
    console.log(`Winner is : ${result}`);
    return;
  }

  if (newHistory.length < 5) match2(newHistory);
  else {
    const result = winner(newHistory[newHistory.length - 1]);
    for (let i = 0; i < newHistory.length; i++) {
      const previousScore = i > 0 ? newHistory[i - 1] : { TeamA: 0, TeamB: 0 };
      console.log(printScore(i, newHistory[i], previousScore));
    }
    console.log(`Winner is : ${result}`);
  }
};

console.log("scenario alternatif 1 :");
match2([]);

// Scenario alternatif 2
const suddenDeath = (history: ScoreHistory) => {
  let score = history[history.length - 1];

  const randomNumberTeamA = Math.random();
  const penaltyteamA = shoot(randomNumberTeamA);
  const scoreAfterShootA = updateScore(penaltyteamA, "TeamA", score);

  const randomNumberTeamB = Math.random();
  const penaltyteamB = shoot(randomNumberTeamB);
  const scoreAfterShootB = updateScore(penaltyteamB, "TeamB", scoreAfterShootA);

  const newHistory = updateHistory(history, scoreAfterShootB);

  const lastScore = newHistory[newHistory.length - 1];
  if (lastScore["TeamA"] !== lastScore["TeamB"]) {
    const result = winner(lastScore);
    for (let i = 0; i < newHistory.length; i++) {
      const previousScore = i > 0 ? newHistory[i - 1] : { TeamA: 0, TeamB: 0 };
      console.log(printScore(i, newHistory[i], previousScore));
    }
    console.log(`Victoire en mort subite : ${result}`);
  } else {
    suddenDeath(newHistory);
  }
};

const match3 = (history: ScoreHistory) => {
  let score =
    history.length > 0 ? history[history.length - 1] : { TeamA: 0, TeamB: 0 };

  const shotsRemaining = 5 - history.length;

  const randomNumberTeamA = Math.random();
  const penaltyteamA = shoot(randomNumberTeamA);
  const scoreAfterShootA = updateScore(penaltyteamA, "TeamA", score);

  const randomNumberTeamB = Math.random();
  const penaltyteamB = shoot(randomNumberTeamB);
  const scoreAfterShootB = updateScore(penaltyteamB, "TeamB", scoreAfterShootA);
  const newHistory = updateHistory(history, scoreAfterShootB);

  if (checkVictory(scoreAfterShootB, shotsRemaining)) {
    const result = winner(scoreAfterShootB);
    // console.log(newHistory[newHistory.length - 1]);
    for (let i = 0; i < newHistory.length; i++) {
      const previousScore = i >= 1 ? newHistory[i - 1] : { TeamA: 0, TeamB: 0 };
      console.log(printScore(i, newHistory[i], previousScore));
    }
    console.log(`Winner is : ${result}`);
    return;
  }

  if (newHistory.length < 5) match3(newHistory);
  else {
    const lastScore = newHistory[newHistory.length - 1];
    if (lastScore["TeamA"] === lastScore["TeamB"]) suddenDeath(newHistory);
    else {
      const result = winner(newHistory[newHistory.length - 1]);
      for (let i = 0; i < newHistory.length; i++) {
        const previousScore =
          i > 0 ? newHistory[i - 1] : { TeamA: 0, TeamB: 0 };
        console.log(printScore(i, newHistory[i], previousScore));
      }
      console.log(`Winner is : ${result}`);
    }
  }
};

console.log("Scenario alternatif 2");
match3([]);
