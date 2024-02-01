import { useParams } from 'next/navigation';
import React from 'react';

const RandomChat = () => {
    const { id } = useParams();
    // return <ChattingRoom type="single" roomName={id.toString()} />;
    return <></>;
};

export default RandomChat;
