import React from 'react';
import {useCafe} from "./CafeContextPro.jsx";

const Member = () => {

    //localStorage에 있는 회원 정보 가져오기
    const users = JSON.parse(localStorage.getItem("users")) || [];
    //로그인 한 사용자
    const {currentUser} = useCafe();

    return (
        <div className="max-w-5xl mx-auto px-6 py-6">
            <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-600">맴버 목록</h3>
            </div>
            <hr className="border-gray-100 mb-6"/>
            <h5>카페 맴버 수</h5>
            <table>
                <thead>
                <tr>
                    <th>아이디</th>
                </tr>
                </thead>
            </table>
            {/*관리자로 로그인했으면*/}
            {currentUser && currentUser.userId === "admin" && currentUser.password === "admin"
                //회원 목록 보여주고
                ? (<ul>
                        {users.length > 0
                            ? (users.map((user, index) => <li key={index}>{user.userId}</li>))
                            : (<li>회원이 존재하지 않습니다.</li>)
                        }
                    </ul>
                )
                //아니라면 회원 목록 볼 수 없음
                : (<div>
                        <div>회원 목록은 관리자만 조화할 수 있습니다.</div>
                    </div>
                )
            }
        </div>
    );
};

export default Member;