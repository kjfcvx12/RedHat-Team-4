import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoardList = () => {

    const [posts,setPosts]=useState([]);
    const [currentUser,setCurrentUser]=useState(null);
    
    
    useEffect(()=>{
        setPosts(JSON.parse(localStorage.getItem('posts'))||[]);
        setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
    },[])
    
    const handleDelete=(id)=>{
       const updated=posts.filter((i)=>i.id!==id)
       localStorage.setItem('posts',JSON.stringify(updated));
       setPosts(updated);
    }

    return (
        <div>
            <h1>게시글 목록</h1>
            <Link to={'/board/create'}><button>글쓰기</button></Link>
                    
            <ul>    
            {posts.length>0?(
                (posts.map((i)=>(
                    <li key={i.id}>
                        <Link to={`/list/${i.id}`}>
                        |  {i.id}  |
                        |  {i.title}  |
                        </Link>
                        {currentUser&&currentUser.userId===i.writerId&&(
                        <>
                            <Link to={`/board/edit/${i.id}`}><button>수정</button></Link>
                            <button onClick={()=>handleDelete(i.id)}>삭제</button>
                        </>   
                        )}
                        </li>)))):(
                            <div>게시물 없다</div>)}
            </ul>
            
        </div>
    );
};

export default BoardList;