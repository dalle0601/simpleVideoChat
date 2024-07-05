import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import Image from 'next/image';
import googleBtn from '../public/web_light_sq_na@1x.png';

const LoginForm = () => {
    const [userNickName, setUserNickName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isLoggined, setIsLoggined] = useState(false);

    useEffect(() => {
        const logged = localStorage.getItem('rtcName');
        if (logged) {
            setIsLoggined(true);
            setUserNickName(logged);
        }
    }, []);

    const submitNotLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userNickName) {
            setShowPopup(true);
            return;
        }
        setIsLoggined(true);
        localStorage.setItem('rtcName', userNickName);
    };

    const notGoogleLogin = () => {
        const randName = Math.random().toString(36).substring(2, 11);
        setShowPopup(false);
        setUserNickName(randName);
        setIsLoggined(true);
        localStorage.setItem('rtcName', randName);
    };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                toast.success('로그인에 성공했습니다.');
                setUserNickName(result.user.displayName!);
                setIsLoggined(true);
                localStorage.setItem('rtcName', result.user.displayName!);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const signOut = () => {
        localStorage.removeItem('rtcName');
        setIsLoggined(false);
        setUserNickName('');
    };

    return (
        <div className="min-w-[350px] md:min-w-[400px] w-full md:w-5/12">
            {!isLoggined ? (
                <div className="flex items-center justify-center h-full w-full">
                    <form className="flex flex-col items-center" onSubmit={submitNotLogin}>
                        <input
                            id="nickname"
                            name="nickname"
                            className="min-w-[300px] md:min-w-[350px] m-2 p-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
                            value={userNickName}
                            type="text"
                            placeholder="닉네임을 입력하세요"
                            onChange={(e) => setUserNickName(e.target.value)}
                        ></input>
                        <div className="flex justify-center min-w-[300px] mt-4">
                            <button
                                className="mx-2 bg-[#69E6A6] duration-300 ease-in-out hover:bg-green-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                                type="submit"
                            >
                                입장
                            </button>
                            <Image
                                src={googleBtn}
                                alt="googlelogin"
                                className="cursor-pointer object-cover transition-opacity duration-300 ease-in-out hover:opacity-75"
                                onClick={signInWithGoogle}
                            />
                        </div>
                    </form>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-xl text-white">{userNickName}님 안녕하세요.</p>
                    <button
                        onClick={signOut}
                        className="cursor-pointer bg-white object-cover font-bold py-2 px-4 mt-[10px] rounded transition-opacity duration-300 ease-in-out hover:opacity-75"
                    >
                        로그아웃
                    </button>
                </div>
            )}
            {showPopup && (
                <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-8 rounded shadow-md z-10 relative">
                        <p className="text-xl font-semibold mb-4">* 닉네임으로 접근시 *</p>
                        <p className="mb-4"> - 제한된 기능 (랜덤 1:1채팅) 만 이용가능합니다.</p>
                        <p className="mb-4"> - 닉네임을 입력하지 않으실 경우 랜덤으로 입력됩니다.</p>
                        <div className="flex justify-center items-center">
                            <button
                                onClick={() => notGoogleLogin()}
                                className="mr-[5px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red active:bg-blue-800"
                            >
                                확인
                            </button>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red active:bg-blue-800"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginForm;
