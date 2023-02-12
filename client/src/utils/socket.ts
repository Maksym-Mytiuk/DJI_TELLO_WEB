import io from "socket.io-client";

const port = 3000;
const url = `http://localhost:${port}`;

const socket = io(url);

export default socket;
