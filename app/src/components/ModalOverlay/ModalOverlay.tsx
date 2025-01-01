import { motion } from "framer-motion";
import React from "react";
import { useLobbyStore } from "../../store/lobby";

interface ChildProps {
  children: React.ReactNode;
}

const ModalOverlay: React.FC<ChildProps> = ({ children }) => {
  const handleClick = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      useLobbyStore.setState((prevState) => {
        return {
          ...prevState,
          challengeModalProps: {
            ...prevState.challengeModalProps,
            showChallengeModal: false,
            opponentId: undefined,
            opponentName: undefined,
          },
        };
      });
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      key={"overlay-animate"}
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default ModalOverlay;
