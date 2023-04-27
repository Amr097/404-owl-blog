export const onLogout = async (cb, event)=>{
  event.preventDefault();
    await fetch('http://localhost:4000/logout', {
      method: "GET",
      credentials: "include"
    }).then((response) => response.json())
      .then(status=>{
      cb({state:status});
     //console.log(status);
    })
  
  }  