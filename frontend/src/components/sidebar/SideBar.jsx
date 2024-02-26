import { Link } from "react-router-dom";
import "./sideBar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Sidebar() {
  const PF = "http://localhost:8000/public/images/"
  const [cats , setCats] = useState([]);
  const {user} = useContext(Context)

  const getCats = async () => {
    const res = await axios.get("http://localhost:8000/api/categories");
    setCats(res.data);
  }

  useEffect(() => {
    getCats();
  } , [])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        {user && <img
          src={user.pfp}
          alt=""
        />}
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => {

            return (<li className="sidebarListItem">
              <Link className="link" to={`/?cat=${c.name}`}>

                {c.name}
              </Link>
              
            </li>)
          })}
          {/* <li className="sidebarListItem">
            <p className="link" to="/posts?cat=Music">
              Music
            </p>
          </li>
          <li className="sidebarListItem">
            <p className="link" to="/posts?cat=Sport">
              Sport
            </p>
          </li>
          <li className="sidebarListItem">
            <p className="link" to="/posts?cat=Style">
              Style
            </p>
          </li>
          <li className="sidebarListItem">
            <p className="link" to="/posts?cat=Tech">
              Tech
            </p>
          </li>
          <li className="sidebarListItem">
            <p className="link" to="/posts?cat=Cinema">
              Cinema
            </p>
          </li> */}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
        <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
        <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        <i className="sidebarIcon fa-brands fa-square-whatsapp"></i>
        <i className="sidebarIcon fa-brands fa-square-facebook"></i>
        </div>
      </div>
    </div>
  );
}