import { SendMessage, ReadyState } from "react-use-websocket";
import { WebSocketLike } from "react-use-websocket/dist/lib/types";

export interface ISocket {
  sendMessage: SendMessage;
  lastMessage: MessageEvent<any> | null;
  readyState: ReadyState;
  getWebSocket: () => WebSocketLike | null;
}
