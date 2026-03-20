import React, {useEffect, useState} from 'react';
import {useCafe} from "./CafeContextPro.jsx";

const Member = () => {

    //localStorage에 있는 회원 정보 가져오기
    const users = JSON.parse(localStorage.getItem("users")) || [];
    //로그인 한 사용자
    const {currentUser, setCurrentUser} = useCafe();

    //localStorage에 있는 게시글 가져오기(회원별 게시글 작성 수 확인 위함)
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    //출력할 회원 목록
    const [memberList, setMemberList] = useState([]);
    //검색 카테고리 종류
    const categories = ["별명(아이디)", "이메일", "게시글수"];
    //검색 입력값
    const [input, setInput] = useState("");
    //select 선택값
    const [selected, setSelected] = useState("id");


    //mount 되었을 때, 현재 로그인 한 사용자가 달라지면 게시글 목록 가져오기
    useEffect(() => {
        //관리자라면 리스트를 출력하고
        if (currentUser && currentUser.userId === "admin") {
            // eslint-disable-next-line react-hooks/immutability
            setMemberList(createMemberList(users));
        } else {
            setMemberList([]); // 관리자가 아니라면 null
        }
    }, [currentUser]);

    //mount 되었을 때 현재 로그인 한 사용자 가져오기
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        setCurrentUser(storedUser);
    }, [])

    //카테고리로 맴버 검색
    const findByCategory = () => {
        let filterMemberList = [];
        //선택된 카테고리 확인해서 검색
        if (selected === "id") {
            filterMemberList = users.filter(user =>
                user.userId.toLowerCase().includes(input.toLowerCase()));
        } else if (selected === "email") {
            filterMemberList = users.filter(user =>
                user.email.toLowerCase().includes(input.toLowerCase()));
        } else {
            alert("검색 종류를 제대로 선택해주세요!");
            return;
        }
        const newMemberList = createMemberList(filterMemberList);
        setMemberList(newMemberList);
    }

    //화면에 출력할 목록 생성
    const createMemberList = (list) => {
        return list.map((user, index) =>
            <tr key={index} className="text-black">
                <td className="px-4 py-3">{user.userId}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{posts.filter(post => post.writerId === user.userId).length}</td>
                <td>
                    <button onClick={() => deleteMember(user.userId)}
                            className="px-5 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded transition-colors">삭제
                    </button>
                </td>
            </tr>
        );
    }

    const deleteMember = (id) => {
        const preventMembers = JSON.parse(localStorage.getItem("users")) || [];
        const newMembers = preventMembers.filter((user) => user.userId !== id);
        setMemberList(createMemberList(newMembers));
        localStorage.setItem("users", JSON.stringify(newMembers));
    }

    //조회 중 취소 버튼을 눌렀을 때
    const cancelFind = () => {
        //입력창 초기화
        setInput("");
        //전체 회원 목록 보여주기
        const newMemberList = createMemberList(users);
        setMemberList(newMemberList);
    }

    //검색창에서 enter키 눌러도 검색
    const keyDownEvent = (e) => {
        if (e.keyCode === 13) {
            findByCategory()
        }
    }

    return (
        <main className="min-h-screen max-w-6xl mx-auto p-6 bg-white rounded-xl mt-10 text-gray-800">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-black">
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">맴버 목록</h1>
            </div>
            {/*관리자로 로그인했으면*/}
            {currentUser && currentUser.userId === "admin"
                //회원 목록 출력할건데, 일단 등록된 맴버가 있는지 확인
                ? (users.length > 0
                    ? (
                        <>
                            {/*검색창*/}
                            <div
                                className="flex items-center gap-2 mb-4 p-4 bg-white border border-gray-100 rounded-md">
                                <span className="text-sm font-medium text-gray-600 mr-2">맴버 검색</span>
                                <select value={selected} onChange={(e) => setSelected(e.target.value)}
                                        className="px-3 py-1.5 text-sm text-gray-600 border border-gray-100 rounded outline-none bg-white focus:border-green-500 transition-colors">
                                    <option value="id">별명(아이디)</option>
                                    <option value="email">이메일</option>
                                </select>
                                <input placeholder="검색어를 입력해주세요"
                                       className="flex-1 max-w-xs px-3 py-1.5 text-sm text-black border border-gray-100 rounded outline-none bg-white focus:border-green-500 transition-colors"
                                       value={input} onChange={(e) => setInput(e.target.value)}
                                       onKeyDown={keyDownEvent}/>
                                <button onClick={findByCategory}
                                        className="px-5 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded transition-colors">검색
                                </button>
                                <button onClick={cancelFind}
                                        className="px-5 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded transition-colors">초기화
                                </button>
                            </div>
                            {/*맴버 수*/}
                            <div className="flex items-center gap-2 mb-3">
                                <h5 className="text-sm text-gray-600">카페 멤버 수</h5>
                                <span
                                    className="text-sm font-bold text-green-500">{memberList ? memberList.length : 0}</span>
                            </div>
                            {/*맴버 목록*/}
                            <div className="rounded-lg overflow-hidden border border-gray-200 hover:bg-gray-50">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr className="text-left text-gray-600">
                                        {categories.map((category, index) => (
                                            <th className="px-4 py-3 font-semibold " key={index}>{category}</th>
                                        ))}
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                    {/*실제 맴버 목록 출력 위치*/}
                                    {memberList.length > 0 ? (memberList) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-[50px]">
                                                <div
                                                    className="py-10 text-center text-gray-600 border border-gray-100 rounded-md">
                                                    검색 결과와 일치하는 회원이 존재하지 않습니다.
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </>)
                    : (<div className="py-10 text-center text-gray-600 border border-gray-100 rounded-md">
                        회원이 존재하지 않습니다.
                    </div>))
                //아니라면 회원 목록 볼 수 없음
                : (<div className="py-20 text-center border border-gray-100 rounded-md">
                        <span className="text-sm text-gray-600">회원 목록은 관리자만 조화할 수 있습니다.</span>
                    </div>
                )
            }
        </main>
    );
};

export default Member;