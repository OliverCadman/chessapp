import { create } from "zustand";
import { LobbyState } from "./store.types";

export const useLobbyStore = create<LobbyState>((_) => ({
  showChallengeModal: false,
}));
