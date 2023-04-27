export const onLogout = async (cb)=>{
    await fetch('http://localhost:4000/logout', {
      method: "POST",
      credentials: "include"
    }).then((response) => response.json())
      .then(status=>{
      cb({state:status});
     //console.log(status);
    })
  
  }  