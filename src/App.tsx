import React from "react";

type Move = "rock" | "paper" | "scissors";
const MOVES: readonly Move[] = ["rock", "paper", "scissors"];

function getRandomMove(): Move {
  const index = Math.floor(Math.random() * 3);
  return MOVES[index];
}

function App() {
  const [computerMove, setComputerMove] = React.useState<Move>(getRandomMove());
  const [playerMove, setPlayerMove] = React.useState<Move | null>(null);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    padding: 10,
  } as const;

  if (playerMove == null) {
    return (
      <div style={containerStyle}>
        <span>Make your move!</span>
        <button onClick={() => setPlayerMove("rock")}>Rock</button>
        <button onClick={() => setPlayerMove("paper")}>Paper</button>
        <button onClick={() => setPlayerMove("scissors")}>Scissors</button>
      </div>
    );
  }

  const resetGame = () => {
    setPlayerMove(null);
    setComputerMove(getRandomMove());
  };

  return (
    <div style={containerStyle}>
      <span>Computer move: {computerMove}</span>
      <span>Player move: {playerMove}</span>
      <button onClick={resetGame}>Play again</button>
    </div>
  );
}

export default App;
