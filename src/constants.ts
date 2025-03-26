import objectKeys from "./util/objectKeys";

export const MOVE_CONFIG = {
  rock: {
    scissors: "crushes",
    lizard: "crushes",
  },
  paper: {
    rock: "covers",
    spock: "disproves",
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
} as const;

export type Move = keyof typeof MOVE_CONFIG;

MOVE_CONFIG satisfies Record<Move, Partial<Record<Move, string>>>;

export const MOVES: readonly Move[] = objectKeys(MOVE_CONFIG);

export const MOVE_EMOJI = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️",
  lizard: "🦎",
  Spock: "🖖",
} as const satisfies Record<Move, string>;
