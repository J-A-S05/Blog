import { Link } from "react-router-dom"
import "./register.css"
import { useState } from "react"
import axios from "axios"

const Register = () => {
  const [username , setUsername] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [error , setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      
      const res = await axios.post("http://localhost:8000/api/auth/register" , {
        username,
        email,
        password
      })

      res.data && window.location.replace("/login")
    } catch (error) {
      console.log(error)
      setError(true);
    }
  }

  return (
    <div className="register">
        <form action="" className="registerForm" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="">Username</label>
            <input type="text" placeholder="Enter your username..."  className="registerInput" onChange={(e) => {setUsername(e.target.value)}}/>
            <label htmlFor="">Email</label>
            <input type="text" placeholder="Enter your email..."  className="registerInput" onChange={(e) => {setEmail(e.target.value)}}/>
            <label htmlFor="">Password</label>
            <input type="password" name="" id="" placeholder="Enter your password..." className="registerInput" onChange={(e) => {setPassword(e.target.value)}}/>
            <button className="registerButton" type="submit">Register</button>
        </form>
        <button className="registerLoginButton"><Link to = "/login" className="link">Login</Link></button>
        {error && <span>Something went wrong!!!</span>}
    </div>
  )
}

export default Register
