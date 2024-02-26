import './home.css'
import Header from '../../components/header/Header.jsx'
import Posts from '../../components/posts/Posts.jsx'
import SideBar from '../../components/sidebar/SideBar.jsx'
import Single from '../single/Single.jsx'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const [postList , setPostList] = useState([]);
  const {search} = useLocation();

  const fetchPosts = async() => {
    console.log(search)
    const res = await axios.get("http://localhost:8000/api/posts" + search);
    console.log(res.data)
    setPostList(res.data);
  }
  useEffect(() => {
    
    fetchPosts();
  } , [search])
  return (
    <>
      <Header/>
    <div className='home'>
      <Posts posts = {postList}/>
      {/* <Single/> */}
      <SideBar/>
    </div>
    </>
  )
}

export default Home
