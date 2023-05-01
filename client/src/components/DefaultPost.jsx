import React from "react";
import {format} from "date-fns"
import { Link } from "react-router-dom";

const DefaultPost = ()=>{
    //console.log(createdAt)
    return(
        <>
        <div className="post">

        <div className="image">
        <Link to={"/post/065968581"}>
        <img src='/images/1_H06MvmVU9sxQt4fOUmqCHQ.webp' alt=''/>
        </Link>
        </div>
       
        <article className="content">
        <Link id="link" to={`/post/065968581`}>
        <h2>Performance & Compensation: ‘Two Households Both Alike In Dignity’</h2>
        </Link>
        <p className="info">  <a className="author">By Hedwig Potter</a> <time>{format(new Date(), 'MMM d, yyy HH:mm')}</time></p> 
        <p className="summary">
        It’s an expectation that Performance and Compensation go hand in hand and that they work together effortlessly. The problem is they’re chalk and chees</p>
        </article>
        
       
        </div>
        <div className="post">

        <div className="image">
        <Link to={"/post/065968582"}>
        <img src='/images/board-22098__340.jpg' alt=''/>
        </Link>
        </div>
       
        <article className="content">
        <Link id="link" to={`/post/065968582`}>
        <h2>Wealth, fame, power. The world had it all won by one man.</h2>
        </Link>
        <p className="info">  <a className="author">By Gol D. Roger</a> <time>{format(new Date(), 'MMM d, yyy HH:mm')}</time></p> 
        <p className="summary">
        You want my treasure? You can have it! I left everything I gathered together in one place. Now you just have to find it.
        </p>
        </article>
        
       
        </div>
        <div className="post">

        <div className="image">
        <Link to={"/post/065968583"}>
        <img src='/images/home-office-2804083__340.jpg' alt=''/>
        </Link>
        </div>
       
        <article className="content">
        <Link id="link" to={`/post/065968583`}>
        <h2>What we’re reading: Want to see something beautiful?</h2>
        </Link>
        <p className="info">  <a className="author">By Sarah</a> <time>{format(new Date(), 'MMM d, yyy HH:mm')}</time></p> 
        <p className="summary">A handpicked selection of stories you may have missed this week</p>
        </article>
        
       
        </div>
        <div className="post">

        <div className="image">
        <Link to={"/post/065968584"}>
        <img src='/images/istockphoto-1365847213-612x612.jpg' alt=''/>
        </Link>
        </div>
       
        <article className="content">
        <Link id="link" to={`/post/065968584`}>
        <h2>The Ultimate List of Web-Safe HTML and CSS Fonts</h2>
        </Link>
        <p className="info">  <a className="author">By Sarah</a> <time>{format(new Date(), 'MMM d, yyy HH:mm')}</time></p> 
        <p className="summary">Designer Michael Bierut has said that fonts are to written text what tone and accent are to your speech. Basically, fonts are your brand's voice. If you're choosing the HTML and CSS fonts you'll use on your website, what do you want your audience to hear?</p>
        </article>
        
       
        </div>
        <div className="post">

        <div className="image">
        <Link to={"/post/065968585"}>
        <img src='/images/robot-2301646__340.jpg' alt=''/>
        </Link>
        </div>
       
        <article className="content">
        <Link id="link" to={`/post/065968585`}>
        <h2>How to Build Credibility at Work
</h2>
        </Link>
        <p className="info">  <a className="author">By Jesse Owens</a> <time>{format(new Date(), 'MMM d, yyy HH:mm')}</time></p> 
        <p className="summary">Building credibility requires more than just competence and knowledge.</p>
        </article>
        
       
        </div>
       
        </> 
    )
}

export default DefaultPost;