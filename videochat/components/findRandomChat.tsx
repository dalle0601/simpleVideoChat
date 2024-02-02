'use client';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import Loader from './loader';
import { useRouter } from 'next/navigation';
import { socket } from '@/middelware/socket';

interface IFindRandomChat {
    setEvent: React.Dispatch<SetStateAction<boolean>>;
}

const FindRandomChat = ({ setEvent }: IFindRandomChat) => {
    const router = useRouter();
    const nickName = localStorage.getItem('rtcName');

    const [infoState, setInfoState] = useState(true);

    const getRandomChatRoom = () => {
        socket.emit('find_room');
    };

    useEffect(() => {
        getRandomChatRoom();
        socket.on('getRandomRoomList', (rooms) => {
            console.log(rooms);
            // ['study-1', 'study-2']

            let randomRoomNumber = Math.floor(Math.random() * rooms['rooms'].length);

            setInfoState(false);

            setTimeout(() => {
                router.push(`/random/${rooms['rooms'][randomRoomNumber]}`);
            }, 3000);
        });
    }, []);
    return (
        <div className="flex flex-col justify-center items-center h-screen pb-[200px]">
            {infoState ? (
                <>
                    <p>채팅방을 찾고있습니다.</p>
                    <p>참여가능한 채팅방이 없으면 새로 생성됩니다.</p>
                </>
            ) : (
                <p>채팅방에 입장중입니다.</p>
            )}

            <Loader />
            <div className="border border-sky-500 cursor-pointer" onClick={() => setEvent(false)}>
                취소하기
            </div>
        </div>
    );
};

export default FindRandomChat;
