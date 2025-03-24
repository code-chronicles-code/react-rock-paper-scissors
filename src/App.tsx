import React from "react";

type Move = "rock" | "paper" | "scissors";
const MOVES: readonly Move[] = ["rock", "paper", "scissors"];

function getRandomMove(): Move {
  const index = Math.floor(Math.random() * 3);
  return MOVES[index];
}

function getWinner(moveA: Move, moveB: Move): "a" | "b" | "tie" {
  if (moveA === moveB) {
    return "tie";
  }

  const indexA = MOVES.indexOf(moveA);
  const indexB = MOVES.indexOf(moveB);
  return (indexA + 1) % MOVES.length === indexB ? "b" : "a";
}

function App() {
  const [computerMove, setComputerMove] = React.useState<Move>(getRandomMove());
  const [playerMove, setPlayerMove] = React.useState<Move | null>(null);

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

  if (playerMove == null) {
    return (
      <div style={containerStyle}>
        <span>Make your move!</span>
        <div style={buttonRowStyle}>
          <button onClick={() => setPlayerMove("rock")}>🪨</button>
          <button onClick={() => setPlayerMove("paper")}>📄</button>
          <button onClick={() => setPlayerMove("scissors")}>✂️</button>
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
      <span>
        You picked <strong>{playerMove}</strong>, computer picked{" "}
        <strong>{computerMove}</strong>. {winnerText}
      </span>
      <button onClick={resetGame}>Play again</button>
    </div>
  );
}

export default App;
