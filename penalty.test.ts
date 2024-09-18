import { expect, test } from "bun:test";
import {
  checkVictory,
  printScore,
  shoot,
  updateHistory,
  updateScore,
  winner,
} from "./penalty-src/penalty-utils";
import type { Score, ScoreHistory } from "./penalty-src/penalty-types";

test("shoot: penalty ok", () => {
  expect(shoot(0.7)).toBeTrue;
});

test("shoot: penalty not ok", () => {
  expect(shoot(0.2)).toBeTrue;
});

test("updateScore: penalty ok for teamA", () => {
  const score = { TeamA: 0, TeamB: 0 };
  expect(updateScore(true, "TeamA", score)).toMatchObject({
    TeamA: 1,
    TeamB: 0,
  });
});

test("updateScore: penalty not ok for teamA", () => {
  const score = { TeamA: 0, TeamB: 0 };
  expect(updateScore(false, "TeamA", score)).toMatchObject({
    TeamA: 0,
    TeamB: 0,
  });
});

test("updateHistory", () => {
  const history = [] as ScoreHistory;
  const score = { TeamA: 2, TeamB: 0 };
  expect(updateHistory(history, score)).toBeArrayOfSize(1);
});

test("printScore", () => {
  const index = 1;
  const currentScore = { TeamA: 2, TeamB: 1 };
  const previousScore = { TeamA: 1, TeamB: 1 };
  expect(printScore(index, currentScore, previousScore)).toBe(
    `Tir 2 | Score : 2/1 (équipe A: +1, équipe B: 0)`
  );
});

test("winner", () => {
  const score = { TeamA: 3, TeamB: 5 };
  expect(winner(score)).toBe("Team B");
});

test("winner: egalité", () => {
  const score = { TeamA: 3, TeamB: 3 };
  expect(winner(score)).toBe("Egalité");
});

test("checkVictory, TeamB win 0-3", () => {
  const score = { TeamA: 0, TeamB: 3 };
  const remainingShots = 2;
  expect(checkVictory(score, remainingShots)).toBeTrue();
});

test("checkVictory, no-winner", () => {
  const score = { TeamA: 1, TeamB: 3 };
  const remainingShots = 2;
  expect(checkVictory(score, remainingShots)).toBeFalse();
});
