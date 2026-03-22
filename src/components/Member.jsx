import React, {useEffect, useState} from 'react';
import {useCafe} from "./CafeContextPro.jsx";

const Member = () => {

    //localStorage에 있는 회원 정보 가져오기
    const users = JSON.parse(localStorage.getItem("users")) || [];
    //로그인 한 사용자
    const {currentUser, setCurrentUser} = useCafe();

    /*관리자 로그인 시 회원 목록 화면 관련*/
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

    /*일반 사용자 로그인 시 마이페이지 관련*/
    //마이페이지 수정 상태 state
    const [editMode, setEditMode] = useState(null);
    //마이페이지 입력값
    const [editUser, setEditUser] = useState({
        userId: "",
        email: "",
        pw: "",
        rePw: ""
    });
    useEffect(() => {
        if (currentUser) {
            setEditUser({
                userId: currentUser.userId,
                email: currentUser.email,
                pw: "",
                rePw: ""
            })
        }
    }, [currentUser]);

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

    //맴버 수정 사항 저장
    const onSubmit = (e) => {
        e.preventDefault();

        let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        if (storedUsers.find((e) => e.userId === editUser.userId && e.userId !== currentUser.userId)) {
            alert('중복된 아이디입니다. 다른 아이디를 입력하세요.');
            return;
        }
        if (editUser.userId.length < 5) {
            alert('아이디는 5자 이상이어야 합니다!');
            return;
        }
        if (editUser.email === null) {
            alert('이메일을 입력해주세요!');
            return;
        }
        if (editUser.pw.length < 8) {
            alert('비밀번호는 8자 이상이어야 합니다!');
            return;
        }
        if (editUser.pw !== editUser.rePw) {
            alert('비밀번호를 다시 확인해주세요!');
            return;
        }

        const editingUser = {userId: editUser.userId, pw: editUser.pw, email: editUser.email};

        storedUsers = storedUsers.map((user) => user.userId === editUser.userId ? editingUser : user);
        localStorage.setItem("users", JSON.stringify(storedUsers));
        localStorage.setItem("currentUser", JSON.stringify(editingUser));
        setCurrentUser(editingUser);
        setEditMode(null);
    }

    return (
        <main className="min-h-screen max-w-6xl mx-auto p-6 bg-white rounded-xl mt-10 text-gray-800">

            {/*누군가가 로그인했으면*/}
            {currentUser ? (
                // 로그인 한 사람이 관리자라면
                currentUser.userId === "admin"
                    //회원 목록 출력할건데, 일단 등록된 맴버가 있는지 확인
                    ? (users.length > 0
                        ? (
                            <>
                                <div className="flex justify-between items-center mb-8 pb-4 border-b border-black">
                                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">맴버 목록</h1>
                                </div>
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
                                                        검색 결과와 일치하는 맴버가 존재하지 않습니다.
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </>)
                        : (<div className="py-10 text-center text-gray-600 border border-gray-100 rounded-md">
                            맴버가 존재하지 않습니다.
                        </div>))
                    //아니라면 마이페이지
                    : (
                        <>
                            <div className="flex justify-between items-center mb-8 pb-4 border-b border-black">
                                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">내 정보 관리</h1>
                            </div>
                            <div className="py-10 px-10 border border-gray-100 rounded-md flex items-start gap-6">
                                <div
                                    className="w-24 h-24 bg-gray-200 rounded-full shrink-0">
                                </div>
                                {editMode ? (
                                    <form onSubmit={onSubmit} className="flex flex-col gap-1 w-full">
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="w-20 text-gray-500 shrink-0">새 아이디</span>
                                            <input type="text" placeholder="아이디 5자 이상 입력"
                                                   className="flex-1 border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-green-500"
                                                   value={editUser.userId} onChange={(e) => setEditUser({...editUser, userId: e.target.value})}/>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="w-20 text-gray-500 shrink-0">새 이메일</span>
                                            <input type="email" placeholder="이메일 @ 포함 입력"
                                                   className="flex-1 border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-green-500"
                                                   value={editUser.email} onChange={(e) => setEditUser({...editUser, email: e.target.value})}/>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="w-20 text-gray-500 shrink-0">새 비밀번호</span>
                                            <input type="password" placeholder="8자 이상 입력"
                                                   className="flex-1 border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-green-500"
                                                   value={editUser.pw} onChange={(e) => setEditUser({...editUser, pw: e.target.value})}/>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="w-20 text-gray-500 shrink-0">새 비밀번호 확인</span>
                                            <input type="password" placeholder="비밀번호 확인"
                                                   className="flex-1 border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-green-500"
                                                   value={editUser.rePw} onChange={(e) => setEditUser({...editUser, rePw: e.target.value})}/>
                                        </div>
                                        <div className="flex gap-2 justify-end mt-2 pt-2">
                                            <button type="submit"
                                                    className="px-5 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold cursor-pointer border-none rounded">저장
                                            </button>
                                            <button type="button" onClick={() => setEditMode(null)}
                                                    className="px-5 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs border border-gray-200 cursor-pointer rounded">취소
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="flex flex-col gap-2 text-sm flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="w-20 text-gray-500 shrink-0">내 아이디</span>
                                            <span className="text-gray-800">{currentUser.userId}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-20 text-gray-500 shrink-0">내 이메일</span>
                                            <span className="text-gray-800">{currentUser.email}</span>
                                        </div>
                                        <div className="flex justify-end mt-auto pt-2">
                                            <button onClick={() => setEditMode(true)}
                                                    className="px-5 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold cursor-pointer border-none rounded">내 정보 수정하기
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>

                    )
            ) : (
                <>
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-black">
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">마이페이지</h1>
                    </div>
                    <div className="py-20 text-center border border-gray-100 rounded-md">
                        <span className="text-sm text-gray-600">로그인 해주세요</span>
                    </div>
                </>
            )}
        </main>
    );
};

export default Member;