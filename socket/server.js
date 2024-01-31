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
const maximum = 2;
// connection을 수립하고, callback 인자로 socket을 받음
io.on('connection', (socket) => {
    // 연결이 성공했을 경우 실행됨
    socket.on('join_roomRTC', (data) => {
        if (users[data.room]) {
            const length = users[data.room].length;
            if (length === maximum) {
                io.to(socket.id).emit('room_full');
                return;
            }
            users[data.room].push({ id: socket.id, nickname: data.nickname });
        } else {
            users[data.room] = [{ id: socket.id, nickname: data.nickname }];
        }

        socketRoom[socket.id] = data.room;
        socket.join(data.room);
        const userInThisRoom = users[data.room].filter((user) => user.id !== socket.id);
        io.to(socket.id).emit('all_users', userInThisRoom);
    });
    socket.on('disconnect', () => {
        // 클라이언트의 연결이 끊어졌을 경우 실행됨
    });
});
