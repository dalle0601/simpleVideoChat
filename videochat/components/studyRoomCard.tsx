'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface IStudyRoomCard {
    id: string;
    title: string;
    content: string;
    author: string;
    date: string;
}

const StudyRoomCard = ({ id, title, content, author, date }: IStudyRoomCard) => {
    const router = useRouter();

    const enterStudyRoom = () => {
        // 리덕스에 룸 정보를 담아보자.
        router.push(`/study/${id}`);
        console.log(title, content);
    };
    return (
        <div
            className="bg-white shadow-md rounded-md p-4 mb-4 cursor-pointer hover:bg-gray-200"
            onClick={enterStudyRoom}
        >
            <h2 className="text-xl font-bold mb-2 text-black">{title}</h2>
            <p className="text-gray-600 mb-2">{content}</p>
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{`By ${author} on ${date}`}</p>
            </div>
        </div>
    );
};

export default StudyRoomCard;
