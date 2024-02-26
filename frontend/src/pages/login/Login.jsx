import { Link } from "react-router-dom"
import "./login.css"
import { useContext, useRef } from "react"
import { Context } from "../../context/Context.js";
import axios from "axios";

const Login = () => {

  const userRef = useRef();
  const passwordRef = useRef();

  const {dispatch , isFetching} = useContext(Context)
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type : "LOGIN_START"});

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login" , {
        username : userRef.current.value,
        password : passwordRef.current.value
      })
    dispatch({type : "LOGIN_SUCCESS" , payload : res.data});

    } catch (error) {
    dispatch({type : "LOGIN_FAILURE"});
      
    }

    console.log(isFetching)
  }
  return (
    <div className="login">
        <form action="" className="loginForm" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="">Username</label>
            <input type="text" placeholder="Enter your username..."  className="loginInput" ref={userRef}/>
            <label htmlFor="">Password</label>
            <input type="password" name="" id="" placeholder="Enter your password..." className="loginInput" ref={passwordRef}/>
            <button className="loginButton" type="submit" disabled = {isFetching}>Login</button>
        </form>
        <button className="loginRegisterButton"><Link to = "/register" className="link">Register</Link></button>
    </div>
  )
}

export default Login
