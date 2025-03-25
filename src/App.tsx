import React from "react";

const MOVE_CONFIG = {
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

type Move = keyof typeof MOVE_CONFIG;

function objectKeys<T extends Record<PropertyKey, unknown>>(
  obj: T,
): (keyof T)[] {
  return Object.keys(obj);
}

const MOVES: readonly Move[] = objectKeys(MOVE_CONFIG);

function getRandomMove(): Move {
  const index = Math.floor(Math.random() * MOVES.length);
  return MOVES[index];
}

const MOVE_EMOJI = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️",
  lizard: "🦎",
  Spock: "🖖",
} as const satisfies Record<Move, string>;

function getWinner(moveA: Move, moveB: Move): "a" | "b" | "tie" {
  if (moveA === moveB) {
    return "tie";
  }

  return Object.hasOwn(MOVE_CONFIG[moveA], moveB) ? "a" : "b";
}

type GameResults = { wins: number; losses: number; draws: number };

function App() {
  const [computerMove, setComputerMove] = React.useState<Move>(getRandomMove());
  const [playerMove, setPlayerMove] = React.useState<Move | null>(null);
  const [{ wins, losses, draws }, setGameResults] = React.useState<GameResults>(
    { wins: 0, losses: 0, draws: 0 },
  );

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    padding: 10,
  } as const;

  const buttonRowStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  } as const;

  const handleMove = (move: Move) => {
    setPlayerMove(move);
    switch (getWinner(move, computerMove)) {
      case "a": {
        setGameResults({ wins: wins + 1, losses, draws });
        break;
      }
      case "b": {
        setGameResults({ wins, losses: losses + 1, draws });
        break;
      }
      case "tie": {
        setGameResults({ wins, losses, draws: draws + 1 });
        break;
      }
    }
  };

  if (playerMove == null) {
    return (
      <div style={containerStyle}>
        <span>Make your move!</span>
        <div style={buttonRowStyle}>
          {MOVES.map((move) => (
            <button
              key={move}
              onClick={() => handleMove(move)}
              style={{
                fontSize: 30,
                // line-height unit doesn't default to pixels!
                lineHeight: "50px",
                textAlign: "center",
                width: 50,
                height: 50,
                padding: 0,
              }}
            >
              {MOVE_EMOJI[move]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const resetGame = () => {
    setPlayerMove(null);
    setComputerMove(getRandomMove());
  };

  const winnerText = {
    a: "You win!",
    b: "Computer wins.",
    tie: "It's a tie...",
  }[getWinner(playerMove, computerMove)];

  return (
    <div style={containerStyle}>
      <div>
        You picked <strong>{playerMove}</strong>, computer picked{" "}
        <strong>{computerMove}</strong>. {winnerText}
      </div>
      <div>
        Wins: {wins} / Losses: {losses} / Draws: {draws}
      </div>
      <button onClick={resetGame}>Play again</button>
    </div>
  );
}

export default App;
