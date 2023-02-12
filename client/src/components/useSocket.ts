import { reactive, ref, onMounted, onUnmounted, type Ref } from "vue";

import socket from "@/utils/socket";
import { DroneEvent } from "@/utils/events";

export function useSocket() {
  let droneState = reactive({
    bat: "0",
  });
  let isDroneConnect = ref(false);
  let stream: Ref<null> | Ref<Uint8Array> = ref(null);
  let count = ref(0);

  onMounted(() => {
    if (count.value > 1) {
      return;
    }
    count.value += 1;

    socket.on(DroneEvent.Connect, () => {
      console.warn("connect");
      console.warn(socket);
    });

    socket.on(DroneEvent.Status, (socket) => {
      console.warn("status");
      console.warn(socket);
      isDroneConnect.value = true;
    });

    socket.on(DroneEvent.State, (state: { bat: string }) => {
      droneState = state;
    });

    socket.on(DroneEvent.VideoStreamOn, (stream) => {
      stream = new Uint8Array(stream);
    });

    socket.on(DroneEvent.Disconnect, () => {
      console.log("disconnect");
      isDroneConnect.value = false;
    });
  });

  onUnmounted(() => {
    socket.close();
  });

  return { droneState, isDroneConnect, stream };
}
