import React, { useState, useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
import { fetchEditPost } from "../functions/fetchEditPost";
import { useParams } from "react-router-dom";
import { Editor } from "../functions/Editor";

export default function EditPost() {
    

    const [post, setPost] = useState({title:"", summary:""});
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");
    const [redirect, setRedirect] = useState(false);
    //console.log(files)
    const {id} = useParams();


  
    useEffect(()=>{
        fetchEditPost(setPost,setContent,setFiles,id);
    }, []);


    const postData = (event)=>{
        const name = event.target.name;
        //console.log(name)
        const value = event.target.value;
         setPost(prevValue=>{
             return(
                 {
                   ...prevValue,
                   [name] : value  
                 }
             )
         })
     }
 
     const postFiles = event=> {
       setFiles(event.target.files[0]);
     }

     const updatePost= async event=>{
        event.preventDefault();
        let data = new FormData()
        data.set('title', post.title);
        data.set('summary', post.summary);
        if(files){
            data.set('file', files);
        }
        data.set('content', content);
        data.set('id', id)
       
        

        await fetch('http://localhost:4000/update', {
            method:"PATCH",
            credentials: 'include',
            body: data
            
        }).then(response=>{
            response.json().then(updatedPost=>{
                setPost({title: updatedPost.title, summary: updatedPost.summary});
                setContent(updatedPost.content);
                setRedirect(true);
            })
            if(response.ok){
                alert('Sucessfully updated');
                
              }
              else{
                alert('Failed to update');
              }
        });
    }
 

    if(redirect){
        return (<Navigate to={`/post/${id}`} />)
        }


  return(
    <section>
          <form className="post" onSubmit={updatePost}>
            <input onChange={postData} 
            type="text" name="title" 
            placeholder="Your Blog title"  
            value={post.title} required/>

            <input onChange={postData} 
            type="text" name="summary" 
            placeholder="Summary" value=
            {post.summary}/>

            <input onChange={postFiles}
            type="file" name="image"/>

            <Editor  value={content} onChange={setContent}/>
            <button id="post-btn" type="submit">Confirm</button>
          </form>
        </section>
  )
}