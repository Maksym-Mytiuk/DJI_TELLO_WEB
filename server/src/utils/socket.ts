import { Socket } from "socket.io";
import { initialize } from "../drone";

export const droneSocketConnection = (socket: Socket) => {
  initialize(socket);
};
