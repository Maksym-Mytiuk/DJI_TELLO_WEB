export const commands = {
  control: {
    init: "command",
    takeoff: "takeoff",
    land: "land",
    videoStreamOn: "streamon",
    videoStreamOff: "streamoff",
  },
  action: {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
    forward: "forward",
    back: "back",
    rotateRight: "cw",
    rotateLeft: "ccw",
    flip: "flip",
    go: "go",
  },
  set: {
    speed: "speed",
  },
  read: {
    speed: "speed?",
    battery: "battery?",
    time: "time?",
    height: "height?",
    temp: "temp?",
    attitude: "attitude?",
    baro: "baro?",
    acceleration: "acceleration?",
    tof: "tof?",
  },
  emergency: {
    stop: "emergency",
  },
};
