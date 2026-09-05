import { io } from "socket.io-client";

//const BASE_URL = process.env.NODE_ENV === "production" ? "http://10.10.4.186:3000" : `http://192.168.8.4:3000`;

const BASE_URL = process.env.NODE_ENV === "production" ? "http://10.10.4.186:3000" : `http://10.10.12.158:3000`;

//export const socket = io(`${window.location.protocol}//${window.location.host.split(":")[0]}`);

export const socket = io(BASE_URL, { autoConnect: false });
