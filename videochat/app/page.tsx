'use client';

import ChatBtn from '@/components/chatBtn';
import LoginForm from '@/components/loginForm';

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
        <div className="flex flex-col-reverse md:h-[400px] md:flex-row justify-center items-center w-full">
            <ChatBtn />
            <LoginForm />
        </div>
    );
}
