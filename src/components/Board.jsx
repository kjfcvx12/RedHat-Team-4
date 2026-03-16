import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Board = () => {
    
        const {id}=useParams();
    
        const [post,setPost]=useState({id:'', title: '', content: '',writerId:'' });
    
    
        useEffect(()=>{
            const posts=JSON.parse(localStorage.getItem('posts'))||[];
    
            const currnetPost=posts.find((i)=>i.id===parseInt(id));
    
            if(currnetPost){
                setPost(currnetPost);
            }
        },[id])

    
        return (
            <div>
                <form>
                    <h2>게시글</h2>
                    <p>{post.title}</p>
                    <p>{post.content}</p>
                </form>
            </div>
        );
    };

export default Board;