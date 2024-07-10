import React, { useEffect, useRef } from 'react';

interface Props {
    nickname: string;
    stream: MediaStream;
    isLocal?: boolean;
    isMulti?: boolean;
}

const Video = ({ nickname, stream, isLocal = false, isMulti = false }: Props) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (ref.current) ref.current.srcObject = stream;
    }, [stream]);

    return (
        <div className={`relative ${isLocal ? 'w-1/4' : 'w-full'}`}>
            <video ref={ref} autoPlay playsInline className="rounded-lg w-full h-full" />
            <div className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-lg">
                <span className="text-xs">{nickname}</span>
            </div>
        </div>
    );
};

export default Video;
