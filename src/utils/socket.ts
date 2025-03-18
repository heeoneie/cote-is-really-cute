import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'https://violent-lea-coteisreallycute-52210e1a.koyeb.app';

const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket'],
});

export default socket;
