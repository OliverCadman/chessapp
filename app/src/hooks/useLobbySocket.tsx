import useWebSocket from "react-use-websocket";
import { BASE_SOCKET_URL, SOCKET_LOBBY_ENDPOINT } from "../api/constants";
import { useEffect } from "react";

const useLobbySocket = (lobbyId?: string, token?: string) => {
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    BASE_SOCKET_URL + SOCKET_LOBBY_ENDPOINT + `/${lobbyId}` + `?token=${token}`,
    {
      onOpen: (_) => console.log("Websocket connected."),
      onError: (err) => {
        console.log("THERE HAS BEEN AN ERROR:", err);
      },
      heartbeat: {
        message: JSON.stringify({ type: "heartbeat" }),
        interval: 3000,
        timeout: 60000,
      },
    },
  );

  return { sendMessage, lastMessage, readyState, getWebSocket };
};

export default useLobbySocket;
