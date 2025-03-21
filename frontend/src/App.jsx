
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useNavigate } from "react-router-dom";
import './App.css'
import BlogPostDetails from './pages/blog/BlogPostDetails';
import BlogPostList from './pages/blog/BlogPostList'
import CreatePost from "./pages/blog/CreatePost";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import ProfilePage from "./pages/blog/ProfilePage";
import { useEffect, useState } from "react";
import { checkAuth, onLogoutSubmit } from "./services/api.js";
import UpdateBlog from "./pages/blog/UpdateBlog";
import YourBlogs from "./pages/blog/YourBlogs";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logoutSuccess } from "./redux/authSlice";


function App() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const verifyUser = async () => {
      const authStatus = await checkAuth();
      console.log(authStatus);
      if (authStatus) {
        dispatch(loginSuccess(authStatus))
      } else {
        dispatch(logoutSuccess())
      }
    };
    verifyUser();
  }, [dispatch]);



  return (
    // <Router>
    <div className="min-h-screen bg-gray-100 p-6">

      <nav className="main-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-400 font-bold" : "text-gray-500"}>
          Blog Posts
        </NavLink>

        {/* ✅ Only allow access to create post if logged in */}
        {isLoggedIn && (
          <>
            <NavLink to="/post/create" className={({ isActive }) => isActive ? "text-blue-400 font-bold" : "text-gray-500"}>
              Create Post
            </NavLink>

            <NavLink to="/your-blogs" className={({ isActive }) => isActive ? "text-blue-400 font-bold" : "text-gray-500"}>
              Your Blogs
            </NavLink>
          </>
        )}

        {/* ✅ Show Login/Register if logged out, Logout if logged in */}
        {isLoggedIn ? (
          <ProfilePage />
        ) : (
          <div>
            <NavLink to="/login" className="text-gray-500">Login </NavLink>/
            <NavLink to="/register" className="text-gray-500">Register</NavLink>
          </div>
        )}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<BlogPostList />} />
          <Route path="/post/:id" element={<BlogPostDetails />} />
          <Route path="/post/create" element={<CreatePost />} />
          <Route path="/post/update/:id" element={<UpdateBlog />} />
          <Route path="/your-blogs" element={<YourBlogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
    // </Router >
  )
}

export default App
