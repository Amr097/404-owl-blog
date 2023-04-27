
export const fetchEditPost = async (setPost,setContent,setFiles, id)=>{
    return(
        await fetch(`http://localhost:4000/post/${id}`,{method: "GET",
           credentials: "include"}).then((response) => response.json())
           .then(user=>{
            console.log(user)
            setPost({title: user.post.title, summary:user.post.summary});
            setContent(user.post.content);
            setFiles(user.post.image);
           }) 
         
    )
}
