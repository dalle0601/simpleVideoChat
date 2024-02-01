import Link from 'next/link';
import React from 'react';

const ChatBtn = () => {
    return (
        <div className="flex flex-col">
            <Link href="/random" className="border border-sky-500 cursor-pointer">
                랜덤채팅
            </Link>
            <Link href="/study/list" className="border border-sky-500 cursor-pointer">
                스터디룸
            </Link>
        </div>
    );
};

export default ChatBtn;
