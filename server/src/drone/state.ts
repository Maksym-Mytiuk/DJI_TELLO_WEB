import dgram from "dgram";
import { Socket } from "socket.io";

import { PORT_GET_DRONE_STATE } from "../utils/env";
import { parseState } from "../utils/parseDroneState";
import { handleError } from "../utils/errorHandler";

export const initialize = (socket: Socket) => {
  const droneSocket = dgram.createSocket("udp4");
  droneSocket.bind(PORT_GET_DRONE_STATE);
  let counter = 0;

  droneSocket.on("message", (message) => {
    counter++;
    if (counter === 45) {
      const state = parseState(message.toString());
      socket.emit("dronestate", state);
      counter = 0;
    }
  });

  droneSocket.on("error", (err) => {
    console.warn("state error");
    console.warn(err);
    handleError(err);
  });

  droneSocket.on("close", () => {
    console.warn("state close");
  });

  droneSocket.on("connect", () => {
    console.warn("state connect");
  });

  droneSocket.on("listening", () => {
    console.warn("state listening");
  });
};
