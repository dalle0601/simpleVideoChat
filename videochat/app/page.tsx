'use client';

import Login from './login/page';

// import { useEffect } from 'react';
// import io from 'socket.io-client';

export default function Home() {
    // const socket = io('http://localhost:4000');
    // const socketTest = () => {
    //     socket.emit('join_roomRTC', { room: 'ggg', nickname: 'abc' });
    // };

    // useEffect(() => {
    //     socket.on('all_users', (data: any) => {
    //         console.log(data);
    //     });

    //     socket.on('room_full', () => {
    //         console.log('flfulfulfulfulfuluflfulful');
    //     });
    // }, [socket]);

    // return <div onClick={socketTest}>Hlllllll</div>;

    return (
        <>
            <Login />
        </>
    );
}
