import React from "react";

import "./MoveButton.css";

import { MOVE_EMOJI, type Move } from "./constants";

type Props = {
  move: Move;
  onClick?: () => void;
  transform?: string;
};

export default function MoveButton({ move, onClick, transform }: Props) {
  return (
    <button
      onClick={onClick}
      className="MoveButton-button centered-container"
      style={{ transform }}
    >
      <div className="MoveButton-emoji">{MOVE_EMOJI[move]}</div>
    </button>
  );
}
