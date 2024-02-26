import Post from "../post/Post.jsx"
import "./posts.css"



const Posts = ({posts}) => {
  return (
    <div className="posts">
      {posts.map((p) => {
        return  <Post post = {p}/>
      })}
      
    </div>
  )
}

export default Posts
