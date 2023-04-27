export const fetchData = async (cb)=>{
    return(
        await fetch('http://localhost:4000/profile',{method: "GET",
           credentials: "include"}).then((response) => response.json())
           .then(user=>{
            cb(user);
           })     
    )
}
