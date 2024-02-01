'use client';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
    nickname: string;
    stream: MediaStream;
}

const Video = ({ nickname, stream }: Props) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (ref.current) ref.current.srcObject = stream;
    }, [stream]);

    return (
        <>
            <video className=" w-10 h-10" ref={ref} autoPlay playsInline />
            <label>{nickname}</label>
        </>
    );
};

export default Video;
