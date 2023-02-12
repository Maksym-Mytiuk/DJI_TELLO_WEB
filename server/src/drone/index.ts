import { Socket } from "socket.io";
import { initialize as initStateConnection } from "./state";
import { initialize as initCommandConnection } from "./command";
import { initialize as initVideoConnection } from "./video";

export const initialize = (socket: Socket) => {
  initStateConnection(socket);
  initCommandConnection(socket);
  initVideoConnection(socket);
};
