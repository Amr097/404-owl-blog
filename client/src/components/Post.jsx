import React from "react";
import {format} from "date-fns"
import { Link } from "react-router-dom";
import { Image } from "../functions/image";

const Post = ({summary, title, image, createdAt, updatedAt, content, author, _id})=>{
    //console.log(createdAt)
    return(
        <div className="post">

        <div className="image">
        <Link to={`/post/${_id}`}>
        <Image src={image} alt=''/>
        </Link>
        </div>
       
        <article className="content">
        <Link id="link" to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">  <a className="author">By {author.username}</a> <time>{format(new Date(createdAt), 'MMM d, yyy HH:mm')}</time></p> 
        <p className="summary">{summary}</p>
        </article>
        
       
        </div>
       
    )
}

export default Post;