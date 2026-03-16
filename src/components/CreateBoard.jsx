import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBoard = () => {

    const [title,setTitle]=useState('');
    const [content,setContent]=useState('');


    const navigator=useNavigate();

    const currentUser=JSON.parse(localStorage.getItem('currentUser'));

    useEffect(()=>{
        if(!currentUser){
            alert('로그인 필요해');
            navigator('/login');
        }
    },[])

    const onSubmit1=(e)=>{
        e.preventDefault();

        let posts=JSON.parse(localStorage.getItem('posts')) || [];
        
        const newPosts={
            id:Date.now(),
            title,
            content,
            writerId:currentUser.userId,
        }

        posts.push(newPosts);
   
        localStorage.setItem('posts',JSON.stringify(posts));

        setTitle('');
        setContent('');

        navigator('/list');

    };

    return (
        <div>
            <h1>게시글 작성</h1>
            <form onSubmit={onSubmit1}>
                <input type='text' onChange={(e)=>setTitle(e.target.value)} value={title} name='title'/>
                <textarea onChange={(e)=>setContent(e.target.value)} value={content} name='content'/>
                
                <button type='submit'>작성 완료</button>
            </form>

            
        </div>
    );
};

export default CreateBoard;