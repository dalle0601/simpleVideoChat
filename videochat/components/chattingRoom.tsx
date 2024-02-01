'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Video from './video';
import { socket } from '../middelware/socket';

export type WebRTCUser = {
    id: string;
    email: string;
    stream: MediaStream;
    audioStreamEnabled: boolean;
};

interface IChattingRoom {
    type: 'single' | 'multi';
    roomName: string;
}

const pc_config = {
    iceServers: [
        // {
        //   urls: 'stun:[STUN_IP]:[PORT]',
        //   'credentials': '[YOR CREDENTIALS]',
        //   'username': '[USERNAME]'
        // },
        {
            urls: 'stun:stun.l.google.com:19302',
        },
    ],
};

const ChattingRoom = ({ type, roomName }: IChattingRoom) => {
    let nickName = '';
    if (typeof window !== 'undefined') {
        nickName = localStorage.getItem('rtcName')!;
    }
    const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const localStreamRef = useRef<MediaStream>();
    const [users, setUsers] = useState<WebRTCUser[]>([]);

    const getLocalStream = useCallback(async () => {
        try {
            const localStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            localStreamRef.current = localStream;
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = localStream;
            }

            if (!socket) return;
            socket.emit('join_roomRtc', {
                room: roomName,
                email: nickName,
            });
        } catch (e) {
            console.log(`getUserMedia error: ${e}`);
        }
    }, []);

    const createPeerConnection = useCallback((socketID: string, email: string) => {
        try {
            const pc = new RTCPeerConnection(pc_config);
            pc.onicecandidate = (e) => {
                if (!e.candidate) return;
                socket.emit('candidateRtc', {
                    candidate: e.candidate,
                    candidateSendID: socket.id,
                    candidateReceiveID: socketID,
                });
            };

            pc.ontrack = (e) => {
                setUsers((oldUsers) =>
                    oldUsers
                        .filter((user) => user.id !== socketID)
                        .concat({
                            id: socketID,
                            email,
                            stream: e.streams[0],
                            audioStreamEnabled: e.streams[0].getAudioTracks()[0].enabled,
                        })
                );
            };

            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach((track) => {
                    if (!localStreamRef.current) return;
                    pc.addTrack(track, localStreamRef.current);
                });
            } else {
                console.log('no local stream');
            }

            return pc;
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }, []);

    // 브라우저 새로고침 및 닫기 시 RTC 종료
    const handleBeforeunload = (e: BeforeUnloadEvent) => {
        socket.emit('disconnectrtc', roomName);
    };

    useEffect(() => {
        getLocalStream();

        socket.on('all_users', (allUsers: Array<{ id: string; email: string }>) => {
            allUsers.forEach(async (user) => {
                const pc = createPeerConnection(user.id, user.email);
                if (!(pc && socket)) return;
                pcsRef.current = { ...pcsRef.current, [user.id]: pc };
                try {
                    const localSdp = await pc.createOffer({
                        offerToReceiveAudio: true,
                        offerToReceiveVideo: true,
                    });
                    await pc.setLocalDescription(new RTCSessionDescription(localSdp));
                    socket.emit('offerRtc', {
                        sdp: localSdp,
                        offerSendID: socket.id,
                        offerSendEmail: nickName,
                        offerReceiveID: user.id,
                    });
                } catch (e) {
                    console.error(e);
                }
            });
        });

        socket.on(
            'getOffer',
            async (data: { sdp: RTCSessionDescription; offerSendID: string; offerSendEmail: string }) => {
                const { sdp, offerSendID, offerSendEmail } = data;
                if (!localStreamRef.current) return;
                const pc = createPeerConnection(offerSendID, offerSendEmail);
                if (!(pc && socket)) return;
                pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
                try {
                    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
                    const localSdp = await pc.createAnswer({
                        offerToReceiveVideo: true,
                        offerToReceiveAudio: true,
                    });
                    await pc.setLocalDescription(new RTCSessionDescription(localSdp));
                    socket.emit('answerRtc', {
                        sdp: localSdp,
                        answerSendID: socket.id,
                        answerReceiveID: offerSendID,
                    });
                } catch (e) {
                    console.error(e);
                }
            }
        );

        socket.on('getAnswer', (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
            const { sdp, answerSendID } = data;
            const pc: RTCPeerConnection = pcsRef.current[answerSendID];
            if (!pc) return;
            pc.setRemoteDescription(new RTCSessionDescription(sdp));
        });

        socket.on('getCandidate', async (data: { candidate: RTCIceCandidateInit; candidateSendID: string }) => {
            const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID];
            if (!pc) return;

            await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        });

        socket.on('user_exit', (data: { id: string }) => {
            if (!pcsRef.current[data.id]) return;
            pcsRef.current[data.id].close();
            delete pcsRef.current[data.id];
            setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
        });

        return () => {
            users.forEach((user) => {
                if (!pcsRef.current[user.id]) return;

                pcsRef.current[user.id].close();
                delete pcsRef.current[user.id];
            });

            localStreamRef.current?.getTracks().forEach((track) => {
                track.enabled = false;
                track.stop();
            });
            socket.emit('disconnectrtc', roomName);
            socket.removeListener('all_users');
            socket.removeListener('getOffer');
            socket.removeListener('getAnswer');
            socket.removeListener('getCandidate');
            socket.removeListener('user_exit');
            socket.removeListener('_test');
            window.removeEventListener('unload', handleBeforeunload);
        };
    }, []);

    return (
        <>
            <div>스터디룸 - {roomName}</div>
            <div className="flex">
                <video muted ref={localVideoRef} autoPlay playsInline className="w-10 h-10" id="localVideo" />

                {users.map((user, index) => (
                    <Video key={index} nickname={user.email} stream={user.stream} />
                ))}
            </div>
            <div className="flex">
                <button className="mr-10">카메라, 마이크가 없어요!</button>
                <button>{type === 'multi' ? '스터디룸 나가기' : '다른사람과 통화하기'}</button>
            </div>
        </>
    );
};

export default ChattingRoom;
