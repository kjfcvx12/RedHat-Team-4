import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

const EditBoard = () => {
    //URL 주소창 내 id
    const {id} = useParams();
    //input, textarea 내 값을 객체로 저장해둔 state
    const [post, setPost] = useState({title:"", content:""});
    //페이지 전환을 위한 네비게이터 객체
    const navigator = useNavigate();

    //주소창 내 id 값이 변경될 때마다
    useEffect(() => {
        //localStorage에 저장된 전체 게시글 불러와서
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        //주소창 내 id와 같은 id를 가진 게시글 찾아(find)보고
        const currentPost = storedPosts.find((post) => post.id === parseInt(id));
        //만약 일치하는 게시글이 있다면
        if (currentPost) {
            //게시글의 title, content를 input, textarea 값으로 넣기
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPost(currentPost);
        }
    }, [id]);

    //수정 버튼 클릭 시 실행
    const onSubmit = (e) => {
        e.preventDefault();
        //localStorage에 저장된 전체 게시글 불러와서
        let storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        //수정한 내용을 반영하여 방금 localStorage에서 받아온 게시글 배열 갱신(수정 시에도 첫 작성자는 유지되도록)
        storedPosts = storedPosts.map((p) => p.id === parseInt(id) ? {...post, writerId:p.writerId} : p);
        //localStorage에 갱신한 게시글 배열 저장
        localStorage.setItem("posts", JSON.stringify(storedPosts));
        //수정 후 게시글 목록으로 복귀
        navigator("/list");
    }

    const editCancel = () => {
        navigator("/list");
    }

    return (
        <form className="min-h-screen max-w-5xl mx-auto px-6 py-6" onSubmit={onSubmit}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-600">카페 글쓰기</h3>
                <div className="flex gap-2">
                    <button
                        className="px-5 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded transition-colors"
                        type="button" onClick={editCancel}>
                        취소
                    </button>
                    <button
                        className="px-5 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded transition-colors"
                        type="submit">
                        등록
                    </button>
                </div>
            </div>
            <hr className="border-gray-100 mb-6"/>
            <div className="border border-gray-100 rounded-md">
                <input placeholder="제목을 입력해 주세요."
                       className="w-full px-4 py-3 text-sm text-black border-b border-gray-100 outline-none rounded-t-md"
                       value={post.title} onChange={(e) => setPost({...post, title: e.target.value})}/>
                <textarea placeholder="내용을 입력하세요."
                          className="w-full h-64 px-4 py-3 text-sm text-black outline-none resize-none rounded-b-md"
                          value={post.content} onChange={(e) => setPost({...post, content: e.target.value})}/>
            </div>
        </form>
    );
};

export default EditBoard;