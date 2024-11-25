import useWebSocket from "react-use-websocket";
import { BASE_SOCKET_URL, SOCKET_LOBBY_ENDPOINT } from "../api/constants";
import { nanoid } from "nanoid";

const lobbyId = nanoid();

const useLobbySocket = (token?: string) => {

    const {sendMessage, lastMessage, readyState, getWebSocket} = useWebSocket(
        BASE_SOCKET_URL + SOCKET_LOBBY_ENDPOINT + `/${lobbyId}` + `?token=${token}`, {
            onOpen: (res) => console.log("Websocket connected.", res)
        }
    );

    return getWebSocket
}

export default useLobbySocket