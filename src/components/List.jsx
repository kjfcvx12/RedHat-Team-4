import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const List = () => {

    const [posts,setPosts]=useState(
        JSON.parse(localStorage.getItem("posts"))||[]
    );
    const [currentUser,setCurrnetUser]=useState(
        JSON.parse(localStorage.getItem("currentUser"))||null
    );

    const [find,setFind]=useState('id');
    const [input,setInput]=useState('');

    const [findPost,setFindPost]=useState([]);
    const [findNum,setFindNum]=useState(false);


    const handleDelete=(id)=>{
       const updated=posts.filter((i)=>i.id!==id)
       localStorage.setItem('posts',JSON.stringify(updated));
       setPosts(updated);
    }

    const handleFind=()=>{
        setFindNum(true);

        setFindPost(posts.filter((i)=>{
            if(find==='all'){
                return i.title.includes(input)||i.content.includes(input)
            }else{
                return String(i[find]).includes(input);
            }
        })||[]);
    }

    const handleCancel=()=>{
        setFindNum(false);
        setFindPost([]);
        setInput('');
    }


    return (
        <div>
            <h1>게시글 목록</h1>
            <Link to={'/board/create'}><button>글쓰기</button></Link>

            <ul>
                <li>번호/제목/좋아요/싫어요</li>
                
                {(findNum?findPost:posts).length>0?(
                    ((findNum?findPost:posts).map((i)=>(<li key={i.id}>
                        {i.id}/
                        <Link to={`/list/${i.id}`}>{i.title}</Link>
                        /{i.like}/{i.hate}

                        {currentUser&&
                        currentUser.userId===i.writerId||
                        currentUser.userId==='admin'&&(
                        <>
                        {currentUser.userId===i.writerId&&(
                        <Link to={`/board/edit/${i.id}`}>
                            <button>수정</button>
                        </Link>)}

                        <button onClick={()=>handleDelete(i.id)}>삭제</button>
                        </>
                        )}
                        </li>)))):(
                            <div>
                                {(findNum?
                                     `${input}일치하는 결과가 없습니다.`
                                    :'첫 번째 게시물을 작성해 보세요!')}
                            </div>
                        )}
            </ul>

            <select onChange={(e)=>setFind(e.target.value)}>
                <option value="id">id</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="all">제목+내용</option>
            </select>
            <input onChange={(e)=>setInput(e.target.value)} 
            onKeyDown={(e)=>e.key==='Enter'&&handleFind()} value={input}/>
            <button onClick={()=>handleFind()}>검색</button>
            <button onClick={()=>handleCancel()}>검색취소</button>
            
        </div>
    );
};

export default List;