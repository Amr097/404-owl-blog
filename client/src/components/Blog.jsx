import React, { useRef, useState, useContext } from "react";
import { StateContext } from "../StateContext";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
import { Editor } from "../functions/Editor";

    

const Blog = ()=>{

    const [post, setPost] = useState({title:"", summary:""});
    const [content, setContent] = useState("");
    const [files, setFiles] = useState({});
    const [redirect, setRedirect] = useState(false);
    const {status} = useContext(StateContext);
    const inputRef = useRef(null); 

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
    
  
    const onSubmit= async event=>{
        event.preventDefault();
        let data = new FormData()
        data.set('title', post.title);
        data.set('summary', post.summary);
        data.set('file', files);
        data.set('content', content);

        

        await fetch('http://localhost:4000/submit', {
            method:"POST",
            credentials: 'include',
            body: data
            
        }).then(response=>{
            //console.log(response)
            if(response.ok){
                alert('Sucessfully published');
                setPost({title:"", summary:""});
                setContent("");
                inputRef.current.value = null;
                setRedirect(true);
              }
              else{
                alert('Failed to publish');
              }
        });
    }

    
    if(redirect){
      return (<Navigate to={'/'} />)
      } 
   
    return(
        status &&
        (<section>
          <form className="post" onSubmit={onSubmit}>
            <input onChange={postData} 
            type="text" name="title" 
            placeholder="Your Blog title"  
            value={post.title} required/>

            <input onChange={postData} 
            type="text" name="summary" 
            placeholder="Summary" maxLength="150" value=
            {post.summary}/>

            <input onChange={postFiles} ref={inputRef} 
            type="file" name="image" required/>

            <Editor value={content} onChange={setContent} />
            <button id="post-btn" type="submit">Publish</button>
          </form>
        </section>)
    )
}

export default Blog;