import dgram from "node:dgram";
import { Socket } from "socket.io";
import { HOST, PORT_SET_DRONE_COMMAND } from "../utils/env";
import { handleError } from "../utils/errorHandler";

let hasCommandWaitingResolve = false;

export const initialize = (socket: Socket) => {
  const droneSocket = dgram.createSocket("udp4").bind(PORT_SET_DRONE_COMMAND);

  droneSocket.on("message", (status: string) => {
    socket.emit("status", status.toString());
    if (status) {
      hasCommandWaitingResolve = false;
    }
  });

  socket.on("command", (command: string) => {
    console.log(`command from client - ${command}`);

    if (hasCommandWaitingResolve) {
      return;
    }

    hasCommandWaitingResolve = true;

    droneSocket.send(
      command,
      0,
      command.length,
      PORT_SET_DRONE_COMMAND,
      HOST,
      handleError
    );

    if (command === "streamoff") {
      socket.emit("videostreamoff");
    }
  });

  droneSocket.on("error", (err) => {
    handleError(err);
  });

  droneSocket.on("close", () => {
    console.warn("status close");
  });

  droneSocket.on("connect", () => {
    console.warn("status connect");
  });

  droneSocket.on("listening", () => {
    console.warn("status listening");
  });
};
