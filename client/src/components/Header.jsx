import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../StateContext";
import { onLogout } from "../functions/Logout";
import { fetchData } from "../functions/fetchData";


const Header = ()=>{

const {status, setStatus} = useContext(StateContext);
const [color, setColor] = useState(false);
console.log(status.state);
console.log(status);
const changeColor = ()=>{
    if(window.scrollY>=450){
      setColor(true);
    }
    else{
        setColor(false);
    }
}

const scrollTop = ()=>{
    window.scrollTo({top: 0 , behavior:"smooth"});
}
//console.log(status)

window.addEventListener('scroll', changeColor);

useEffect(()=>{
   fetchData(setStatus);
}, [])

    return(
        <header className={color? "header-bg" : null}>
            <Link to="/" className="Logo" onClick={scrollTop}>404 <span>Owl</span></Link>
            <nav>
            {status.state && (
                <>
                <Link to="/blog" className="nav-icon create-blog">New Blog</Link>
                <a href="" onClick={(event)=>{onLogout(setStatus, event)}} className="nav-icon">Logout</a>  
                </>
            )}
            {!status.state && (<>
               <Link to="/login" className="nav-icon">Log in</Link>
               <Link to="/register" className="nav-icon sign-up" >Sign up</Link>
            </>)}
            
             
            </nav>
        </header>
    )
}

export default Header;