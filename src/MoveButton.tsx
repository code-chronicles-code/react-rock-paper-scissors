import React from "react";

import "./MoveButton.css";

import { MOVE_EMOJI, type Move } from "./constants";

type Props = {
  move: Move;
  onClick?: () => void;
  isAnimating?: boolean;
  transform?: string;
};

export default function MoveButton({
  move,
  onClick,
  isAnimating,
  transform,
}: Props) {
  return (
    <div
      className="MoveButton-outer-container"
      style={{
        animationPlayState: isAnimating ? undefined : "paused",
      }}
    >
      <div className="MoveButton-transform-container" style={{ transform }}>
        <button
          onClick={onClick}
          className="MoveButton-button"
          style={{
            animationPlayState: isAnimating ? undefined : "paused",
            pointerEvents: onClick ? undefined : "none",
          }}
        >
          {MOVE_EMOJI[move]}
        </button>
      </div>
    </div>
  );
}
