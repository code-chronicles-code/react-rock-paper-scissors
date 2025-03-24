import React from "react";

type Move = "rock" | "paper" | "scissors";
const MOVES: readonly Move[] = ["rock", "paper", "scissors"];

function getRandomMove(): Move {
  const index = Math.floor(Math.random() * 3);
  return MOVES[index];
}

function App() {
  const [computerMove, setComputerMove] = React.useState<Move>(getRandomMove());

  return <div>Computer move: {computerMove}</div>;
}

export default App;
