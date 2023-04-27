import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Register = ()=>{

  const [Input, setInput]=useState({username:"",password:""});
  const [redirect, setRedirect] = useState(false);

  const setInputHandler = event=>{
      const userInput = event.target.value;
      const inputName = event.target.name;
     
      setInput(prevValue=>{
        return({
           ...prevValue,
           [inputName]:userInput
        })
      });
  }

  const onRegister = async event=>{
    event.preventDefault();

    const response = await fetch('http://localhost:4000/register', {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(Input),
      headers: {'Content-Type':'application/json'}
    });

    //console.log(response);

    if(response.status==200){
      setRedirect(true);
    }
    else{
      alert('Failed to register');
    }
    setInput({username:"",password:""});
  }

  if(redirect){
    return(<Navigate to={'/login'} />);
  }
    return(
       <form action="/login" className="login" onSubmit={onRegister} autoComplete="off">
         <h1>Sign Up</h1>
         <div className="text-field">
         <input onChange={setInputHandler} type="text" maxLength="20" name="username" value={Input.username} />
         <label>Username</label>
         </div>
         <div className="password">
         <input onChange={setInputHandler} type="password" maxLength="20" name="password" value={Input.password}/>
         <label>Password</label>
         </div>
         <button>Sign Up</button>
       </form>
    )
}

export default Register;