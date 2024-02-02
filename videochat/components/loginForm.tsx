import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';

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
    }, [isLoggined]);

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

    return (
        <div className="w-1/4 border border-sky-500">
            {!isLoggined ? (
                <div>
                    <form onSubmit={submitNotLogin}>
                        <input
                            id="nickname"
                            name="nickname"
                            className="w-1/2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            value={userNickName}
                            type="text"
                            placeholder="NickName"
                            onChange={(e) => setUserNickName(e.target.value)}
                        ></input>
                        <button className="mx-4 bg-white border border-sky-500" type="submit">
                            ENTER
                        </button>
                    </form>
                    <div>OR</div>
                    <div>
                        <button className="border border-sky-500" onClick={signInWithGoogle}>
                            Google Login
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <p>{userNickName}님 안녕하세요.</p>
                </div>
            )}
            {showPopup && (
                <div>
                    <p>* 닉네임으로 접근시 *</p>
                    <p> - 제한된 기능 (랜덤 1:1채팅) 만 이용가능합니다.</p>
                    <p> - 닉네임을 입력하지 않으실 경우 랜덤으로 입력됩니다.</p>
                    <button onClick={() => notGoogleLogin()}>확인</button>
                    <button onClick={() => setShowPopup(false)}>취소</button>
                </div>
            )}
        </div>
    );
};

export default LoginForm;
