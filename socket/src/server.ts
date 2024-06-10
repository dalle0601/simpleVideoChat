import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        credentials: true,
    },
});

// 서버 실행
server.listen(4000, () => {
    console.log('server listening on port : 4000');
});

interface User {
    id: string;
    email: string;
}

let users: { [key: string]: User[] } = {};
let socketRoom: { [key: string]: string } = {};
let randomRoom: { [key: string]: string } = {};

let maximum = 5;

io.on('connection', (socket: Socket) => {
    // 연결이 성공했을 경우 실행됨

    socket.on('join_roomRtc', (data: { room: string; email: string; type: string }) => {
        if (data.type === 'single') {
            maximum = 2;
        }

        if (users[data.room]) {
            const length = users[data.room].length;
            if (length === maximum) {
                socket.to(socket.id).emit('room_full');
                return;
            }
            users[data.room].push({ id: socket.id, email: data.email });
        } else {
            users[data.room] = [{ id: socket.id, email: data.email }];
        }
        if (data.type === 'single') {
            randomRoom[socket.id] = data.room;
        } else {
            socketRoom[socket.id] = data.room;
        }
        socket.join(data.room);
        const usersInThisRoom = users[data.room].filter((user) => user.id !== socket.id);
        io.to(socket.id).emit('all_users', usersInThisRoom);
    });

    socket.on(
        'offerRtc',
        (data: {
            offerReceiveID: string;
            sdp: RTCSessionDescriptionInit;
            offerSendID: string;
            offerSendEmail: string;
        }) => {
            socket.to(data.offerReceiveID).emit('getOffer', {
                sdp: data.sdp,
                offerSendID: data.offerSendID,
                offerSendEmail: data.offerSendEmail,
            });
        }
    );

    socket.on(
        'answerRtc',
        (data: { answerReceiveID: string; sdp: RTCSessionDescriptionInit; answerSendID: string }) => {
            socket.to(data.answerReceiveID).emit('getAnswer', { sdp: data.sdp, answerSendID: data.answerSendID });
        }
    );

    socket.on(
        'candidateRtc',
        (data: { candidateReceiveID: string; candidate: RTCIceCandidate; candidateSendID: string }) => {
            socket
                .to(data.candidateReceiveID)
                .emit('getCandidate', { candidate: data.candidate, candidateSendID: data.candidateSendID });
        }
    );

    socket.on('disconnectrtc', (current_roomId: string) => {
        const roomID = socketRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter((user) => user.id !== socket.id);
            users[roomID] = room;
            if (room.length === 0) {
                delete users[roomID];
                return;
            }
        }
        socket.to(roomID).emit('user_exit', { id: socket.id });
        socket.leave(current_roomId);
    });

    socket.on('find_room', () => {
        const roomNames = Object.values(socketRoom);

        const random: string[] = [];

        for (const str of roomNames) {
            if (!random.includes(str)) {
                random.push(str);
            }
        }

        const realRandom = random.filter((rooms) => rooms.split('-')[0] === 'study');
        io.to(socket.id).emit('getRandomRoomList', { rooms: realRandom });
    });

    socket.on('disconnect', () => {
        // 클라이언트의 연결이 끊어졌을 경우 실행됨
    });
});
