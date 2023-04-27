import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";


const Login = ()=>{

  const [loginInput, setLoginInput] = useState({username:"",password:""});
  const [redirect, setRedirect] = useState(false);
  //const {status, setStatus} = useContext(StateContext);

  const loginInputHandler = event=>{
    const  {name, value} = event.target;
    //console.log(event.target)
    setLoginInput(prevValue=>{
     return ({
        ...prevValue,
        [name]: value
      })
    })
  };

  const onLogin= async event=>{
    event.preventDefault();
    try{
      await fetch('http://localhost:4000/login', {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(loginInput),
        headers: {'Content-Type':'application/json'}
      }).then(response=>{
  
        if(response.status!==200){
          alert('Failed to login');
        }
        if(response.ok){
          setRedirect(true);
        }
        else{
          alert('Wrong credentials');
        }
      });}
      catch(err){
        
      }
    }
   
    

    if(redirect){
      return(<Navigate to={'/'} />);
    }
    return(
       <form className="login" method="POST" onSubmit={onLogin} autoComplete="off">
       <h1>Login</h1>
       <div className="text-field">
       <input onChange={loginInputHandler} name="username" maxLength="20" type="text" value={loginInput.username} required />
         <label>Username</label>
       </div>
         <div className="password">
         <input onChange={loginInputHandler} name="password" maxLength="20" type="password" value={loginInput.password} required />
         <label>Password</label>
         </div>
         <button>Login</button>
       </form>
    )
}

export default Login;