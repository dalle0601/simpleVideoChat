'use client';
import ChattingRoom from '@/components/chattingRoom';
import { useParams } from 'next/navigation';
import React from 'react';

const StudyRoom = () => {
    const { id } = useParams();
    return <ChattingRoom type="multi" roomName={id.toString()} />;
};

export default StudyRoom;
