import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Join = () => {

    const [userId, setUserId] = useState('');
    const [pw, setPw] = useState('');
    const [pw2, setPw2] = useState('');
    const [email, setEmail] = useState(null);
    const navigator = useNavigate();

    const onJoin = (e) => {
        e.preventDefault();

        const user = {userId, pw, email};

        if (userId.length < 5) {
            alert('아이디를 5자 이상 입력하세요!');
            return;
        }

        if (pw.length < 8) {
            alert('비밀번호를 8자 이상 입력하세요!');
            return;
        }

        if (pw !== pw2) {
            alert('비밀번호를 다시 확인해주세요~');
            return;
        }

        if (email === null) {
            alert('이메일 입력해주세요!!!')
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some((e) => e.userId === userId)) {
            alert('중복된 아이디입니다. 다시 입력하세요.')
            return;
        }

        users.push(user);
        localStorage.setItem("users", JSON.stringify(users))

        setUserId("");
        setPw("");
        setEmail("");

        navigator('/login')
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-green-50 bg-gray-100 to-white flex items-center justify-center">
            <form
                onSubmit={onJoin}
                className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 text-gray-800 border border-gray-100"
            >
                <div className="mb-8 pb-4 border-b border-gray-100">
                    <p className="text-sm font-semibold text-green-400 mb-2">You’re in!</p>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        회원가입
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                        아이디와 비밀번호, 이메일을 입력해주세요.
                    </p>
                </div>

                <div className="space-y-5">
                    <input
                        type='text'
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder='아이디 5자 이상 입력'
                        className="w-full px-4 py-3 text-sm text-gray-600 border border-gray-200 rounded-lg outline-none bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                    />
                    <input
                        type='password'
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        placeholder='비밀번호 8자 이상 입력'
                        className="w-full px-4 py-3 text-sm text-gray-600 border border-gray-200 rounded-lg outline-none bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                    />
                    <input
                        type='password'
                        value={pw2}
                        onChange={(e) => setPw2(e.target.value)}
                        placeholder='비밀번호 확인'
                        className="w-full px-4 py-3 text-sm text-gray-600 border border-gray-200 rounded-lg outline-none bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                    />
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='이메일 @ 포함 입력'
                        className="w-full px-4 py-3 text-sm text-gray-600 border border-gray-200 rounded-lg outline-none bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                    />
                    <button
                        className="w-full py-3 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-sm"
                    >
                        가입
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Join;