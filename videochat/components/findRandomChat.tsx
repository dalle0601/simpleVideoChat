'use client';
import React, { SetStateAction, useEffect, useState } from 'react';
import Loader from './loader';
import { useRouter } from 'next/navigation';
import { socket } from '@/middelware/socket';
import Modal from './modal';

interface IFindRandomChat {
    setEvent: React.Dispatch<SetStateAction<boolean>>;
}

const FindRandomChat = ({ setEvent }: IFindRandomChat) => {
    const router = useRouter();
    const nickName = localStorage.getItem('rtcName');

    const [joinState, setJoinState] = useState(true);
    const [createState, setCreateState] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const getRandomChatRoom = () => {
        socket.emit('find_room');
    };

    useEffect(() => {
        getRandomChatRoom();
        socket.on('getRandomRoomList', (rooms) => {
            console.log(rooms);
            // ['study-1', 'study-2']

            let randomRoomNumber = Math.floor(Math.random() * rooms['rooms'].length);

            console.log(randomRoomNumber);
            setJoinState(false);

            let roomName = '';
            if (rooms['rooms'].length === 0) {
                roomName = `random-${Math.random().toString(36).substring(2, 10)}`;
            } else {
                roomName = rooms['rooms'][randomRoomNumber];
                setCreateState(false);
            }
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                router.push(`/random/${roomName}`);
            }, 3000);
        });
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="border-4 border-black rounded-lg p-5 bg-white text-black flex flex-col justify-center items-center">
                {joinState ? (
                    <>
                        <p>채팅방을 찾고있습니다.</p>
                        <p>참여가능한 채팅방이 없으면 새로 생성됩니다.</p>
                    </>
                ) : createState ? (
                    <p>채팅방을 생성중입니다.</p>
                ) : (
                    <p>채팅방에 입장중입니다.</p>
                )}

                <Loader />
            </div>
        </div>
    );
};

export default FindRandomChat;
