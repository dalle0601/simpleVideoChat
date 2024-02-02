import StudyRoomCard from '@/components/studyRoomCard';
import React from 'react';

const StudyList = () => {
    const posts = [
        {
            id: 'study-1',
            title: '채현이의 사이드프로젝트',
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
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="max-w-2xl mx-auto grid gap-4">
                <h1 className="text-3xl font-bold mb-4">스터디룸 목록</h1>
                {posts.map((post) => (
                    <StudyRoomCard key={post.id} {...post} />
                ))}
            </div>
        </div>
    );
};

export default StudyList;
