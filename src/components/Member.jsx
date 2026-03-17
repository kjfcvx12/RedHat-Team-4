import React, {useEffect} from 'react';
import {useCafe} from "./CafeContextPro.jsx";

const Member = () => {

    //localStorage에 있는 회원 정보 가져오기
    // const users = JSON.parse(localStorage.getItem("users")) || [];
    const users = [
        {userId:"1", pw:"1111", email:"1111@naver.com"},
        {userId:"2", pw:"2222", email:"2222@goggle.com"},
        {userId:"3", pw:"3333", email:"3333@daum.net"}
    ];
    //로그인 한 사용자
    const {currentUser, setCurrentUser} = useCafe();
    //전체 게시글(개수 카운트 위함)
    let posts = [
        {id:"post1", title:"first", content:"first_content", writerId:"1"},
        {id:"post2", title:"second", content:"second_content", writerId:"2"},
        {id:"post3", title:"third", content:"third_content", writerId:"3"},
        {id:"post4", title:"fourth", content:"fourth_content", writerId:"3"},
        {id:"post5", title:"fifth", content:"fifth_content", writerId:"3"},
        {id:"post6", title:"sixth", content:"sixth_content", writerId:"3"}
    ];


    //mount 되었을 때 게시글 목록 가져오기
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        posts = JSON.parse(localStorage.getItem("posts")) || [];
    }, []);

    //회원 목록 확인용 버튼(삭제 예정)
    const changeUser = () => {
        if (!currentUser) setCurrentUser({userId:"admin", pw:"admin", email:"admin@office.com"});
        else setCurrentUser(null);
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-6">
            <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-600">맴버 목록</h3>
            </div>
            <hr className="border-gray-100 mb-6"/>
            {/*관리자로 로그인했으면*/}
            {currentUser && currentUser.userId === "admin" && currentUser.pw === "admin"
                //회원 목록 보여주고
                ? (users.length > 0
                        ? (
                            <>
                                <div className="flex items-center gap-2 mb-3">
                                    <h5 className="text-sm text-gray-600">카페 멤버 수</h5>
                                    <span className="text-sm font-bold text-green-500">{users.length}</span>
                                </div>
                                <table className="w-full text-sm">
                                    <thead className="bg-white border-b border-gray-100">
                                        <tr className="text-left text-gray-600">
                                            <th className="px-4 py-3 font-semibold">별명(아이디)</th>
                                            <th className="px-4 py-3 font-semibold">게시글수</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {users.map((user, index) =>
                                            <tr key={index} className="text-black">
                                                <td className="px-4 py-3">{user.userId}</td>
                                                <td className="px-4 py-3">{posts.filter(post => post.writerId === user.userId).length}</td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </>)
                        : (<div className="py-10 text-center text-gray-600 border border-gray-100 rounded-md">회원이 존재하지 않습니다.</div>))
                //아니라면 회원 목록 볼 수 없음
                : (<div className="py-20 text-center border border-gray-100 rounded-md">
                    <span className="text-sm text-gray-600">회원 목록은 관리자만 조화할 수 있습니다.</span>
                    </div>
                )
            }
            <button onClick={changeUser} className="px-5 py-1.5 bg-green-500 hover:bg-green-500 text-white text-sm font-medium rounded-md transition-colors">관리자모드 전환</button>
        </div>
    );
};

export default Member;