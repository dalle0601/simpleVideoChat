const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        credentials: true,
    },
});

// 서버 실행
server.listen(4000, function () {
    console.log('server listening on port : 4000');
});

let users = {};
let socketRoom = {};
let randomRoom = {};

let maximum = 5;
// connection을 수립하고, callback 인자로 socket을 받음
io.on('connection', (socket) => {
    // 연결이 성공했을 경우 실행됨

    socket.on('join_roomRtc', (data) => {
        if (data.type === 'single') {
            maximum = 2;
        }

        let checkData = false;
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
        io.sockets.to(socket.id).emit('all_users', usersInThisRoom);
    });

    socket.on('offerRtc', (data) => {
        socket
            .to(data.offerReceiveID)
            .emit('getOffer', { sdp: data.sdp, offerSendID: data.offerSendID, offerSendEmail: data.offerSendEmail });
    });

    socket.on('answerRtc', (data) => {
        socket.to(data.answerReceiveID).emit('getAnswer', { sdp: data.sdp, answerSendID: data.answerSendID });
    });

    socket.on('candidateRtc', (data) => {
        socket
            .to(data.candidateReceiveID)
            .emit('getCandidate', { candidate: data.candidate, candidateSendID: data.candidateSendID });
    });

    socket.on('disconnectrtc', (current_roomId) => {
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
        let roomNames = Object.values(socketRoom);

        let random = [];

        for (let str of roomNames) {
            if (!random.includes(str)) {
                random.push(str);
            }
        }

        let realRandom = random.filter((rooms) => rooms.split('-')[0] === 'study');
        // let realRandom = random.filter((rooms) => rooms.split('-')[0] === 'random');
        io.sockets.to(socket.id).emit('getRandomRoomList', { rooms: realRandom });
    });

    socket.on('disconnect', () => {
        // 클라이언트의 연결이 끊어졌을 경우 실행됨
    });
});
