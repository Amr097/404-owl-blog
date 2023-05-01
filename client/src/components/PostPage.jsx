import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {format} from "date-fns"
import { StateContext } from "../StateContext";
import { Navigate } from "react-router-dom";
import { Image } from "../functions/image";



const PostPage = ()=>{
 
   const [postInfo, setPostInfo] = useState({
        content:"", image:"", summary:"", title:"", _id:"", 
        createdAt:new Date(),author:{username:"", _id:""}
       })

    const {id} = useParams();
    const {status, setStatus} = useContext(StateContext);
    const[redirect, setRedirect]= useState(false)



    useEffect(
        ()=>{
           fetch(`http://localhost:4000/post/${id}`,{
            method:'GET',
            credentials:'include'
           }).then(response=>{
              response.json().then(user=>{
                setPostInfo(user.post);
                //console.log(user.post)
              })
           })
    }, []);
   
 

const deletePost = (event)=>{
    event.preventDefault();
    fetch(`http://localhost:4000/delete/${id}`,{
        method:'DELETE',
        credentials:'include',
       }).then(response=>{
        if(response.ok){
            setRedirect(true);
        }
       })
}

if(redirect){
    return (<Navigate to={'/'} />)
    }  

if(!postInfo.title){
    return (
        <div className="single-post">
        <div className="head">
        <p className="single-info">  <a className="single-author">{postInfo.author.username}</a> <time>{format(new Date(postInfo.createdAt), 'MMM d, yyy HH:mm')}</time></p> 
        {status.user && postInfo.author._id === status.user._id &&
        (<div className="custom-links">
        <Link id="single-link" to={`/edit/${postInfo._id}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg><p className="link-p">Edit</p></Link>
         
         <a id="delete-link" href="" onClick={deletePost}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
         </svg><p className="link-p">Delete</p></a>
        </div>)}
        </div>
        <section className="content">
        <h2>{postInfo.title}</h2>
        <p className="single-summary">{postInfo.summary}</p>
        <div className="single-image">
        <Image src={postInfo.image}/>
        </div>
        <p className="single-content" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </section>
        
       
        </div>
    );
}
else{
    return( 
        <div className="single-post">
        <div className="head">
        <p className="single-info">  <a className="single-author">{postInfo.author.username}</a> <time>{format(new Date(postInfo.createdAt), 'MMM d, yyy HH:mm')}</time></p> 
        {status.user && postInfo.author._id === status.user._id &&
        (<div className="custom-links">
        <Link id="single-link" to={`/edit/${postInfo._id}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg><p className="link-p">Edit</p></Link>
         
         <a id="delete-link" href="" onClick={deletePost}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
         </svg><p className="link-p">Delete</p></a>
        </div>)}
        </div>
        <section className="content">
        <h2>{postInfo.title}</h2>
        <p className="single-summary">{postInfo.summary}</p>
        <div className="single-image">
        <Image src={postInfo.image}/>
        </div>
        <p className="single-content" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </section>
        
       
        </div>
    )
}

}

export default PostPage;