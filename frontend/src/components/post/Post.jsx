import { Link } from "react-router-dom"
import "./post.css"

const Post = ({post}) => {
  const PF = "http://localhost:8000/public/images/"
  return (
    <div className="post">
      {post.photo && <img src={post.photo} alt="" className="postImg" />}

      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => {

            <span className="postCat">{c.name}</span>
          })}
            {/* <span className="postCat">Music</span> */}
            
        </div>
        <Link to = {`/post/${post._id}`} className="link">

        <span className="postTitle">
            {post.postTitle}
        </span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p>{post.desc}</p>
    </div>
  )
}

export default Post
