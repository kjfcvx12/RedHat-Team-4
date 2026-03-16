import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBoard = () => {

    const {id}=useParams();

    const [post,setPost]=useState({id:'', title: '', content: '',writerId:'' });

    const navigator=useNavigate();

    useEffect(()=>{
        const posts=JSON.parse(localStorage.getItem('posts'))||[];
       
        const currnetPost=posts.find((i)=>i.id===parseInt(id));

        if(currnetPost){
            setPost(currnetPost);
        }
    },[id])

    const onSubmit1=(e)=>{
        e.preventDefault();

        let posts=JSON.parse(localStorage.getItem('posts'))||[];

        posts=posts.map((p)=>p.id===parseInt(id)?{...post,writerId:p.writerId}:p);

        localStorage.setItem('posts',JSON.stringify(posts));

        navigator('/list');
    }


    return (
        <div>
            <form onSubmit={onSubmit1}>
                <h2>게시글 수정</h2>
                <input type='text' onChange={(e)=>setPost({...post,title:e.target.value})} value={post.title}/>
                <textarea onChange={(e)=>setPost({...post,content:e.target.value})} value={post.content}/>
                <button type='submit'>수정</button>
            </form>
        </div>
    );
};

export default EditBoard;