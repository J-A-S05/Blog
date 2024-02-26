import { useContext, useState } from "react"
import "./write.css"
import axios from "axios";
import { Context } from "../../context/Context";

const Write = () => {
  const [postTitle , setTitle] = useState("")
  const [desc , setDesc] = useState("");
  const [file , setFile] = useState("")
  const {user} = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username : user.username,
      postTitle,
      desc
    }

    
    if(file){
      console.log(file);
      const data = new FormData();
      console.log(data)
      const filename = Date.now() + file.name;
      data.append("name" , filename);
      data.append("file" , file);
      const base64 = await convertToBase64(file);
      newPost.photo = base64;

      try {
        console.log(data);
        await axios.post("http:localhost:8000/api/upload" , data);
      } catch (error) {
        console.log(error)
      }
    }

    try {
      
      const res = await axios.post("http://localhost:8000/api/posts" , newPost)
      console.log(res)
      window.location.replace("/post/" + res.data._id)
    } catch (error) {
      console.log(error)
    }
  }

  function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  return (
    <div className="write ">
      {
      file &&  (<img src={URL.createObjectURL(file)} alt="" className="writeImg" />)
        
      }
      <form action="" className="writeForm" onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <div className="writeFormGroup">
            <label htmlFor="fileInput">
            <i class="fa-solid fa-plus"></i>
            </label>
            <input type="file" id="fileInput" hidden = "true" name="file" onChange={(e) => setFile(e.target.files[0])} />
            <input type="text" placeholder="Title" className="writeInput" autoFocus = {true} onChange={(e) => {setTitle(e.target.value)}}/>
        </div>
        <div className="writeFormGroup">
            <textarea placeholder="Tell your story..."  cols="30" rows="10" className="writeInput writeText" onChange={(e) => {setDesc(e.target.value)}}></textarea>
        </div>
        <button className="writeSubmit" type="submit">Publish</button>
      </form>
    </div>
  )
}

export default Write
