import Sidebar from "../../components/sidebar/SideBar.jsx"
import SinglePost from "../../components/singlePost/SinglePost.jsx"
import "./single.css"

const Single = () => {
  return (
    <div className="single">
      <SinglePost/>
      <Sidebar/>
    </div>
  )
}

export default Single
