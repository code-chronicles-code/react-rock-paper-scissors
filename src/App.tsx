import React from "react";

const MOVES_CONFIG = {
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

type Move = keyof typeof MOVES_CONFIG;

function objectKeys<T extends Record<PropertyKey, unknown>>(
  obj: T,
): (keyof T)[] {
  return Object.keys(obj);
}

const MOVES: readonly Move[] = objectKeys(MOVES_CONFIG);

function getRandomMove(): Move {
  const index = Math.floor(Math.random() * MOVES.length);
  return MOVES[index];
}

function getWinner(moveA: Move, moveB: Move): "a" | "b" | "tie" {
  if (moveA === moveB) {
    return "tie";
  }

  return Object.hasOwn(MOVES_CONFIG[moveA], moveB) ? "a" : "b";
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
    gap: 5,
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
          <button onClick={() => handleMove("rock")}>🪨</button>
          <button onClick={() => handleMove("paper")}>📄</button>
          <button onClick={() => handleMove("scissors")}>✂️</button>
          <button onClick={() => handleMove("lizard")}>🦎</button>
          <button onClick={() => handleMove("Spock")}>🖖</button>
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
