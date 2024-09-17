import type { ScoreHistory } from "./penalty-types";
import { shoot, updateHistory, updateScore, winner } from "./penalty-utils";

// Scenario nominal
const match = (history: ScoreHistory) => {
  let score =
    history.length > 0 ? history[history.length - 1] : { TeamA: 0, TeamB: 0 };
  const randomNumberTeamA = Math.random();
  const penaltyteamA = shoot(randomNumberTeamA);
  const scoreAfterShootA = updateScore(penaltyteamA, "TeamA", score);
  const randomNumberTeamB = Math.random();
  const penaltyteamB = shoot(randomNumberTeamB);
  const scoreAfterShootB = updateScore(penaltyteamB, "TeamB", scoreAfterShootA);
  const newHistory = updateHistory(history, scoreAfterShootB);

  if (newHistory.length < 5) match(newHistory);
  else {
    const result = winner(newHistory[history.length - 1]);
    console.log(result);
  }
};

match([]);
