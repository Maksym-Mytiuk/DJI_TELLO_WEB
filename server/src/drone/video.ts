import dgram from "dgram";
import { Socket } from "socket.io";
import { PORT_GET_DRONE_VIDEO } from "../utils/env";
import { handleError } from "../utils/errorHandler";

export const initialize = (socket: Socket) => {
  const videoConnection = dgram.createSocket("udp4").bind(PORT_GET_DRONE_VIDEO);
  const countFramePerRequest = 3;
  let counter = 0;
  let videoBuffer: Buffer[] = [];

  // videoConnection.on("message", (message) => {
  //   const buffer = Buffer.from(message);

  //   if (buffer.includes(Buffer.from([0, 0, 0, 1]))) {
  //     counter++;
  //     if (counter === countFramePerRequest) {
  //       counter = 0;
  //       let stream = Buffer.concat(videoBuffer);
  //       socket.emit("videostreamon", stream);

  //       videoBuffer.length = 0;
  //       videoBuffer = [];
  //     }

  //     videoBuffer.push(buffer);
  //   } else {
  //     videoBuffer.push(buffer);
  //   }
  // });

  videoConnection.on("message", (message) => {
    let buffer = Buffer.from(message);
    videoBuffer.push(buffer);
    counter++;

    if (counter === countFramePerRequest) {
      const stream = Buffer.concat(videoBuffer);
      socket.emit("videostreamon", stream);

      counter = 0;
      videoBuffer.length = 0;
      videoBuffer = [];
    }
  });

  videoConnection.on("error", (err) => {
    handleError(err);
  });
};
