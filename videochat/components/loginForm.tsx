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
        <div>
            {!isLoggined ? (
                <div>
                    <form onSubmit={submitNotLogin}>
                        <input
                            id="nickname"
                            name="nickname"
                            className="w-1/2"
                            value={userNickName}
                            type="text"
                            placeholder="아무것도 입력하지 않을경우 랜덤 닉네임이 생성됩니다."
                            onChange={(e) => setUserNickName(e.target.value)}
                        ></input>
                        <button className="mx-4 bg-white" type="submit">
                            로그인없이 입장
                        </button>
                    </form>
                    <div>
                        <button onClick={signInWithGoogle}>Google Login</button>
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
