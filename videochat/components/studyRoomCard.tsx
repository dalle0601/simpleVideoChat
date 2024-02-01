'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface IStudyRoomCard {
    id: number;
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
        <div className="bg-white shadow-md rounded-md p-4 mb-4 cursor-pointer" onClick={enterStudyRoom}>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600 mb-2">{content}</p>
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{`By ${author} on ${date}`}</p>
                {/* 추가적인 버튼이나 기능을 여기에 추가할 수 있습니다. */}
            </div>
        </div>
    );
};

export default StudyRoomCard;
