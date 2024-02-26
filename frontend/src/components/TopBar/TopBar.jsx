import { Link } from "react-router-dom"
import "./topBar.css"
import { useContext } from "react"
import { Context } from "../../context/Context"


const TopBar = () => {
  const {user , dispatch} = useContext(Context)

  const handleLogout = () => {
    // e.preventDefault();
    dispatch({type : "LOGOUT"})
  }
  return (
    <div className="top">
        <div className="topLeft">
        <i className="topIcon fa-brands fa-square-pinterest"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
        <i className="topIcon fa-brands fa-square-whatsapp"></i>
        <i className="topIcon fa-brands fa-square-facebook"></i>
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className="topListItem"><Link to= "/" className="link">HOME</Link></li>
                <li className="topListItem"><Link to= "/about" className="link">ABOUT</Link></li>
                <li className="topListItem"><Link to= "/contact" className="link">CONTACT</Link></li>
                <li className="topListItem"><Link to= "/write" className="link">WRITE</Link></li>
                {user && <li className="topListItem" onClick={handleLogout}>LOGOUT</li>}
            </ul>
        </div>
        <div className="topRight">
          {
            user ? (<Link className="link" to= "/settings" >{user.pfp && <img src = {user.pfp} alt="" className="topImg"/>}</Link>) : (<ul className="topList"> 
              <li className="topListItem"><Link to = "/login" className="link">LOGIN</Link></li>
              <li className="topListItem"><Link to = "/register" className="link">REGISTER</Link></li>
            </ul>)
          }
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
  )
}

export default TopBar
