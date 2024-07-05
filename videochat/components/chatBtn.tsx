import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import FindRandomChat from './findRandomChat';
import { GoAlertFill } from 'react-icons/go';
import StudyRoomList from './studyRoomList';

const ChatBtn = () => {
    const router = useRouter();
    const [randomChat, setRandomChat] = useState(false);
    const [loginWarn, setLoginWarn] = useState(false);
    const [studyRoomList, setStudyRoomList] = useState(false);

    const goPage = (url: string) => {
        const isLoggined = localStorage.getItem('rtcName');
        if (url === 'study/list') {
            isLoggined ? setStudyRoomList(true) : setLoginWarn(true);
        } else {
            isLoggined ? setRandomChat(true) : setLoginWarn(true);
        }
    };

    return (
        <>
            {!studyRoomList ? (
                <div className="min-w-[350px] md:min-w-[350px] mt-[20px] flex flex-row justify-center md:flex-col w-full md:w-7/12">
                    <div
                        onClick={() => goPage('random')}
                        className="min-w-[145px] md:min-w-[350px] md:max-w-[500px] mr-[10px] flex items-center justify-center rounded-xl h-[100px] w-[40%] md:h-[196px] md:w-[90%] border bg-[#BDBDBD] duration-300 ease-in-out hover:bg-zinc-400 border-sky-500 cursor-pointer bg-gray-100"
                    >
                        <p className="text-4xl text-black">랜덤채팅</p>
                    </div>
                    <div
                        onClick={() => goPage('study/list')}
                        className="min-w-[145px] md:min-w-[350px] md:max-w-[500px] flex items-center justify-center rounded-xl h-[100px] w-[40%] md:h-[196px] md:w-[90%] md:mt-[10px] bg-[#BDBDBD] duration-300 ease-in-out hover:bg-zinc-400 border border-sky-500 cursor-pointer bg-gray-100"
                    >
                        <p className="text-4xl text-black">스터디룸</p>
                    </div>
                </div>
            ) : (
                <div className="min-w-[350px] md:min-w-[350px] mt-[20px] flex flex-row justify-center md:flex-col w-full md:w-7/12">
                    <StudyRoomList setEvent={setStudyRoomList} />
                </div>
            )}

            <div>{randomChat && <FindRandomChat setEvent={setRandomChat} />}</div>
            {loginWarn && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="flex flex-col justify-center items-center bg-white py-5 px-8 rounded shadow-md relative z-10">
                            <GoAlertFill size={40} className="mb-[5px]" />
                            <p className="text-xl font-semibold mb-4">로그인 후 입장해주세요 !</p>
                            <div className="flex justify-center items-center">
                                <button
                                    onClick={() => setLoginWarn(false)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-red active:bg-blue-800"
                                >
                                    확인
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ChatBtn;
