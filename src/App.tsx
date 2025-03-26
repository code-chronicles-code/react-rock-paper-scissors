import React from "react";

import { MOVE_CONFIG, MOVES, MOVE_EMOJI, type Move } from "./constants";
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
    <div style={containerStyle}>
      <div>
        You picked <strong>{playerMove}</strong>, computer picked{" "}
        <strong>{computerMove}</strong>.
      </div>
      {gameResultContent}
      <div>
        Wins: {wins} / Losses: {losses} / Draws: {draws}
      </div>
      <button onClick={resetGame}>Play again</button>
    </div>
  );
}

export default App;
