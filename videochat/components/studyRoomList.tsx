'use client';
import StudyRoomCard from '@/components/studyRoomCard';
import { useRouter } from 'next/navigation';
import React, { SetStateAction } from 'react';
import { TiArrowLeftOutline } from 'react-icons/ti';

interface IStudyRoomList {
    setEvent: React.Dispatch<SetStateAction<boolean>>;
}

const StudyRoomList = ({ setEvent }: IStudyRoomList) => {
    const router = useRouter();

    const posts = [
        {
            id: 'study-1',
            title: '스터디1',
            content: '이곳에 내용을 입력하세요.',
            author: '사용자1',
            date: '2022-02-01',
        },
        {
            id: 'study-2',
            title: '영어스터디',
            content: '이곳에 내용을 입력하세요.',
            author: '사용자2',
            date: '2022-02-02',
        },
        // 추가적인 게시물들을 원하는 만큼 추가할 수 있습니다.
    ];

    return (
        <>
            <div className="grid gap-4">
                <div className="flex">
                    <TiArrowLeftOutline
                        size={30}
                        color="#fff"
                        className="cursor-pointer mr-[10px]"
                        onClick={() => setEvent(false)}
                    />
                    <h1 className="text-3xl font-bold mb-4 text-white">스터디룸 목록</h1>
                </div>

                {posts.map((post) => (
                    <StudyRoomCard key={post.id} {...post} />
                ))}
            </div>
        </>
    );
};

export default StudyRoomList;
