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
            <div className="min-w-[350px] md:min-w-[350px] mt-[20px] flex flex-row justify-center md:flex-col w-full md:w-7/12">
                <div
                    onClick={() => setRandomChat(true)}
                    className="min-w-[145px] md:min-w-[350px] md:max-w-[500px] mr-[10px] flex items-center justify-center rounded-xl h-[100px] w-[40%] md:h-[196px] md:w-[90%] border bg-[#BDBDBD] duration-300 ease-in-out hover:bg-zinc-400 border-sky-500 cursor-pointer bg-gray-100"
                >
                    <p className="text-4xl text-white">랜덤채팅</p>
                </div>
                <div
                    onClick={() => goPage('study/list')}
                    className="min-w-[145px] md:min-w-[350px] md:max-w-[500px] flex items-center justify-center rounded-xl h-[100px] w-[40%] md:h-[196px] md:w-[90%] md:mt-[10px] bg-[#BDBDBD] duration-300 ease-in-out hover:bg-zinc-400 border border-sky-500 cursor-pointer bg-gray-100"
                >
                    <p className="text-4xl text-white">스터디룸</p>
                </div>
            </div>
            <div>{randomChat && <FindRandomChat setEvent={setRandomChat} />}</div>
        </>
    );
};

export default ChatBtn;
