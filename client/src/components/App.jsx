import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import Login from "./Login";
import Register from "./Register";
import { StateContextProvider } from "../StateContext";
import Blog from "./Blog";
import PostPage from "./PostPage";
import EditPost from "./EditPost";


function App() {
  return (
    <BrowserRouter>
     <StateContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="blog" element={<Blog />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
     </StateContextProvider>
    </BrowserRouter>
  );
}

export default App;
