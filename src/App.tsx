import React from "react";

import styles from "./App.module.css";

import { MOVE_CONFIG, MOVES, type Move } from "./constants";
import MoveButton from "./MoveButton";
import capitalize from "./util/capitalize";
import getRandomElement from "./util/getRandomElement";

function getRandomMove(): Move {
  return getRandomElement(MOVES);
}

function getGameResult(
  moveA: Move,
  moveB: Move,
): ["a" | "b", string] | ["tie", null] {
  const aBeatsB = MOVE_CONFIG[moveA][moveB];
  if (aBeatsB != null) {
    return ["a", aBeatsB];
  }

  const bBeatsA = MOVE_CONFIG[moveB][moveA];
  if (bBeatsA != null) {
    return ["b", bBeatsA];
  }

  return ["tie", null];
}

type GameResults = { wins: number; losses: number; draws: number };

function App() {
  const [computerMove, setComputerMove] = React.useState<Move>(getRandomMove());
  const [playerMove, setPlayerMove] = React.useState<Move | null>(null);
  const [{ wins, losses, draws }, setGameResults] = React.useState<GameResults>(
    { wins: 0, losses: 0, draws: 0 },
  );

  const handleMove = (move: Move) => {
    setPlayerMove(move);
    switch (getGameResult(move, computerMove)[0]) {
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
      <div className={`${styles.container} centered-container`}>
        <h1>Make your move!</h1>
        {MOVES.map((move, i) => (
          <MoveButton
            key={move}
            move={move}
            onClick={() => handleMove(move)}
            transform={`rotate(${
              i / MOVES.length
            }turn) translateY(-35vmin) rotate(${-i / MOVES.length}turn)`}
          />
        ))}
      </div>
    );
  }

  const resetGame = () => {
    setPlayerMove(null);
    setComputerMove(getRandomMove());
  };

  const [gameResult, verb] = getGameResult(playerMove, computerMove);
  const gameResultContent = (() => {
    switch (gameResult) {
      case "a": {
        return (
          <div style={{ color: "forestgreen" }}>
            <strong>{capitalize(playerMove)}</strong> {verb}{" "}
            <strong>{computerMove}</strong>, you win!
          </div>
        );
      }
      case "b": {
        return (
          <div style={{ color: "crimson" }}>
            <strong>{capitalize(computerMove)}</strong> {verb}{" "}
            <strong>{playerMove}</strong>, computer wins...
          </div>
        );
      }
      case "tie": {
        return <div style={{ color: "royalblue" }}>It's a tie.</div>;
      }
    }
  })();

  return (
    <div className="App-container centered-container" style={{ gap: "4vmin" }}>
      <div className="centered-container" style={{ gap: "2vmin" }}>
        <div>
          You picked <strong>{playerMove}</strong>, computer picked{" "}
          <strong>{computerMove}</strong>.
        </div>
        {gameResultContent}
        <div>
          Wins: {wins} / Losses: {losses} / Draws: {draws}
        </div>
      </div>
      <button className="App-reset-button" onClick={resetGame}>
        Play again
      </button>
    </div>
  );
}

export default App;
