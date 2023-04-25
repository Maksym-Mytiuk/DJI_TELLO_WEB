// @ts-ignore
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
    if (counter === 10) {
      const state = parseState(message.toString());
      socket.emit("dronestate", state);
      counter = 0;
    }
  });

  droneSocket.on("error", (err) => {
    handleError(err);
  });
};
