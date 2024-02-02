import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Loader from './loader';
import FindRandomChat from './findRandomChat';

const ChatBtn = () => {
    const router = useRouter();
    const [randomChat, setRandomChat] = useState(false);

    const goPage = (url: string) => {
        const isLoggined = localStorage.getItem('rtcName');
        isLoggined ? router.push(`/${url}`) : alert('로그인 후 이용해주세요.');
    };

    return (
        <>
            <div className="flex flex-col w-3/4">
                <div
                    onClick={() => setRandomChat(true)}
                    className="h-1/2 border border-sky-500 cursor-pointer bg-gray-100"
                >
                    랜덤채팅
                </div>
                <div
                    onClick={() => goPage('study/list')}
                    className="h-1/2 border border-sky-500 cursor-pointer bg-gray-100"
                >
                    스터디룸
                </div>
            </div>
            <div>{randomChat && <FindRandomChat setEvent={setRandomChat} />}</div>
        </>
    );
};

export default ChatBtn;
