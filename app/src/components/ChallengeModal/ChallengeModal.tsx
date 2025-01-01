import React from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import BlackKing from "../../assets/pieces/black/Chess_kdt45.svg?react";
import WhiteKing from "../../assets/pieces/white/Chess_klt45.svg?react";
import MixedKing from "../../assets/pieces/mixed/wbK.svg?react";
import { Colors } from "../../store/store.types";

interface ChallengeModalProps {
  playerName?: string;
  playerId?: number;
  currentPlayersChallenged: number[];
  minutesPerSide: string;
  increment: string;
  color?: string;
  handleRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleColorChange: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ChallengeModal: React.FC<ChallengeModalProps> = ({
  playerName,
  playerId,
  minutesPerSide,
  increment,
  handleRangeChange,
  handleColorChange,
  color,
  handleSubmit,
  currentPlayersChallenged,
}) => {
  return playerId ? (
    <ModalOverlay>
      <aside className="challenge-modal">
        <div className="challenge-modal__header">
          <h2>Challenge {playerName}</h2>
        </div>
        <div className="challenge-modal__options">
          <form onSubmit={handleSubmit}>
            <div className="option-wrapper flex column centered">
              <h3>Time Controls</h3>
              <div className="option time-control">
                <label htmlFor="minutes-per-side">
                  Minutes per side: <span>{minutesPerSide}</span>
                </label>
                <input
                  onChange={handleRangeChange}
                  type="range"
                  value={minutesPerSide}
                  min="1"
                  max="20"
                  id="minutes-per-side"
                />
              </div>
              <div className="option time-control flex column centered">
                <label htmlFor="increment">
                  Increment in seconds: <span>{increment}</span>
                </label>
                <input
                  onChange={handleRangeChange}
                  type="range"
                  value={increment}
                  min="0"
                  max="10"
                  id="increment"
                />
              </div>
            </div>
            <div className="option-wrapper color">
              <h3>Colour</h3>
              <div className="icons">
                <div
                  className={`icon-wrapper flex centered ${color === Colors.WHITE ? "selected" : ""}`}
                  onClick={handleColorChange}
                >
                  <input
                    defaultValue={Colors.WHITE}
                    type="text"
                    className="hidden"
                    id="white"
                  />
                  <WhiteKing />
                </div>
                <div
                  className={`icon-wrapper flex centered ${color === Colors.RANDOM ? "selected" : ""}`}
                  onClick={handleColorChange}
                >
                  <input
                    defaultValue={Colors.RANDOM}
                    type="text"
                    className="hidden"
                    id="random"
                  />
                  <MixedKing />
                </div>
                <div
                  className={`icon-wrapper flex centered ${color === Colors.BLACK ? "selected" : ""}`}
                  onClick={handleColorChange}
                >
                  <input
                    defaultValue={Colors.BLACK}
                    type="text"
                    className="hidden"
                    id="black"
                  />
                  <BlackKing />
                </div>
              </div>
            </div>

            <div className="challenge-modal__submit flex centered">
              <button
                type="submit"
                className={`btn challenge-btn ${currentPlayersChallenged.includes(playerId) ? "disabled" : ""}`}
                disabled={currentPlayersChallenged.includes(playerId)}
              >
                {!currentPlayersChallenged.includes(playerId)
                  ? "Send Challenge"
                  : "Challenge sent."}
              </button>
            </div>
          </form>
        </div>
      </aside>
    </ModalOverlay>
  ) : (
    ""
  );
};

export default ChallengeModal;
