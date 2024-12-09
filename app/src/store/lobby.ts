import { create } from "zustand";
import { Colors, LobbyState } from "./store.types";

export const useLobbyStore = create<LobbyState>((_) => ({
  challengeModalProps: {
    showChallengeModal: false,
    opponentId: undefined,
    opponentName: undefined,
  },
  challengeOptions: {
    timeControls: {
      minutesPerSide: "1",
      increment: "0",
    },
    color: undefined,
    playerListPayload: undefined,
  },

  players: [],
}));
