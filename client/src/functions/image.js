import React from "react";

export function Image (path){
  
    const {src, alt} = path
    //console.log(path)
  const imgSrc = src && src.includes('https://')? src : 'http://localhost:4000/' + src;

  return(<img src={imgSrc} alt=""/>)
}