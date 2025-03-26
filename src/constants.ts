export const MOVES = ["rock", "paper", "scissors", "lizard", "Spock"] as const;
export type Move = (typeof MOVES)[number];

export const MOVE_CONFIG: Readonly<
  Record<Move, Partial<Readonly<Record<Move, string>>>>
> = {
  rock: {
    scissors: "crushes",
    lizard: "crushes",
  },
  paper: {
    rock: "covers",
    Spock: "disproves",
  },
  scissors: {
    paper: "cuts",
    lizard: "decapitates",
  },
  lizard: {
    paper: "eats",
    Spock: "poisons",
  },
  Spock: {
    scissors: "smashes",
    rock: "vaporizes",
  },
};

export const MOVE_EMOJI: Record<Move, string> = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️",
  lizard: "🦎",
  Spock: "🖖",
};
