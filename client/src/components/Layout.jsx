import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Post from "./Post";
import { Outlet } from "react-router-dom";


const Layout = ()=>{
    
    return(
        <main>
        <Header />
        <Outlet />
        </main>
    )
}

export default Layout;