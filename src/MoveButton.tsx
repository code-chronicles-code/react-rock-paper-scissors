import React from "react";

import styles from "./MoveButton.module.css";

import { MOVE_EMOJI, type Move } from "./constants";

type Props = {
  move: Move;
  onClick?: () => void;
  transform?: string;
};

export default function MoveButton({ move, onClick, transform }: Props) {
  return (
    <div className={styles.container} style={{ transform }}>
      <button
        onClick={onClick}
        className={`${styles.button} centered-container`}
      >
        <div className={styles.emoji}>{MOVE_EMOJI[move]}</div>
      </button>
    </div>
  );
}
