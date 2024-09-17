export type Team = "TeamA" | "TeamB";

export type Score = Record<Team, number>;

export type ScoreHistory = Readonly<Score[]>;
