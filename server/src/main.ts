import express from "express";
import { Server as HTTPServer } from "http";
import { Server as SocketServer } from "socket.io";

import { droneSocketConnection } from "./utils/socket";
import { PORT_APP } from "./utils/env";

const app = express();
const httpServer = new HTTPServer(app);
const io = new SocketServer(httpServer, { cors: { origin: "*" } });
io.on("connection", droneSocketConnection);

httpServer.listen(PORT_APP, () => {
  console.log(`Listening on port: http://localhost:${PORT_APP}`);
});
