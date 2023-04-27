import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { StateContext } from "../StateContext";
import Footer from "./Footer";


const Home = ()=>{
    const {status, setStatus} = useContext(StateContext);
    const [feed, setfeed] = useState([]);
    //console.log(status)

        const getPosts = async ()=>{
            
              await fetch('http://localhost:4000/feed', {
              method: "GET",
              credentials: "include"
            }).then(response=>{
                   response.json().then(user=>{
                   setfeed(user.posts);
                   setStatus({state: user.state, user:user.user});
                  })
            })
          }
        
      useEffect(()=>{getPosts()}, []);
      
      //console.log(feed)
    return(
        <>
        <section className="home">
            <div className="home-container">
               <h2 className="home-title"> The <span>Owl</span> Blog</h2>
               <span className="home-subtitle">Something to Hoot About</span>
            </div>
        </section>
        <section className="post">
       {feed.length>0 && feed.map((post, index)=>(
            <Post key={index} {...post} />
        ))}
        </section>
        <Footer />
        </>
    )
}

export default  Home;