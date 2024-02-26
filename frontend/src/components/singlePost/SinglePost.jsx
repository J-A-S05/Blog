import { Link, useLocation } from 'react-router-dom'
import './singlePost.css'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { Context } from '../../context/Context';

const SinglePost = () => {
  const PF = "http://localhost:8000/images/"
  const loc = useLocation();
  const Id = loc.pathname.split("/")[2];
  const [post , setPost] = useState({});
  const {user} = useContext(Context)
  const [postTitle , setTitle] = useState("");
  const [desc , setDesc] = useState("");
  const [updateMode , setUpdateMode] = useState(false);

  const handleDelete = async() => {

    try {
      await axios.delete("http://localhost:8000/api/posts/" + Id , {data:{username : user.username}})
      window.location.replace("/");
      
    } catch (error) {
      
    }
  }

  

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/posts/${post._id}`, {
        username: user.username,
        postTitle,
        desc,
      });
      setUpdateMode(false)
      getPost();
    } catch (err) {}
  };

  const getPost = async() => {
    const res = await axios.get(`http://localhost:8000/api/posts/${Id}`);
    setPost(res.data);
    setTitle(res.data.postTitle);
    setDesc(res.data.desc)
  }

  useEffect(() => {
    getPost();
  } , [Id]);

  return (
    <div className='singlePost'>
      <div className="singlePostWrapper">
        {
          
        post.photo && <img src={post.photo} alt="" className="singlePostImg" />
        }
        { updateMode ? <input type='text' value={postTitle} className="singlePostTitleInput" onChange={(e) => {setTitle(e.target.value)}}></input>
        :
        
        <h1 className="singlePostTitle">
          {post.postTitle}
          {post.username === user.username && 
          
        <div className="singlePostEdit">
        <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
        <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
        </div>
          }
        </h1>
        }

        <div className="singlePostInfo">
          <span className="singlePostAuthor"><Link className='link' to={`/?user=${post.username}`}><b>Author : {post.username}</b></Link></span>
          <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? <textarea value = {desc} className='singlePostDescInput' onChange={(e) => {setDesc(e.target.value)}}></textarea>
        :
        <p className='singlePostDesc'>{post.desc}</p>
        
        }
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>

    </div>
  )
}

export default SinglePost
