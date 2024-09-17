import type { Score, ScoreHistory, Team } from "./penalty-types";

export const shoot = (randomNumber: number): boolean => {
  return randomNumber >= 0.5;
};

export const updateScore = (
  penalty: boolean,
  teamName: Team,
  score: Score
): Score => {
  const updatedTeamScore = penalty ? score[teamName] + 1 : score[teamName];
  const { [teamName]: _, ...updatedScore } = score;
  return { ...updatedScore, [teamName]: updatedTeamScore } as Score;
};

export const updateHistory = (
  history: ScoreHistory,
  currentScore: Score
): ScoreHistory => [...history, currentScore];

export const printScore = (
  index: number,
  currentScore: Score,
  previousScore: Score
) => {
  return `Tir ${index} | Score : ${currentScore["TeamA"]}/${
    currentScore["TeamB"]
  } (équipe A: ${
    currentScore["TeamA"] > previousScore["TeamA"] ? `+1` : `0`
  }, équipe B: ${currentScore["TeamB"] > previousScore["TeamB"] ? `+1` : `0`})`;
};

export const winner = (score: Score): string => {
  const result =
    score["TeamA"] == score["TeamB"]
      ? "Egalité"
      : score["TeamA"] > score["TeamB"]
      ? "Team A"
      : "Team B";
  return result;
};
