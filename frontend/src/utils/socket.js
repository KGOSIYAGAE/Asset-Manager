import { io } from "socket.io-client";
export const socket = io("http://10.10.12.158:3000", { autoConnect: false });

//export const socket = io("http://192.168.8.4:3000", { autoConnect: false });
