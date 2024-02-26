import { useContext, useState } from "react"
import Sidebar from "../../components/sidebar/SideBar"
import "./settings.css"
import { Context } from "../../context/Context"
import axios from "axios"

const Settings = () => {
  const {user , dispatch} = useContext(Context);
  const [username , setUsername] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [file , setFile] = useState("")
  const [success , setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type : "UPDATE_START"})
    const updatedUser = {
      userId : user._id,
      username,
      email,
      password
    }

    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name" , filename);
      data.append("file" , file);
      const base64 = await convertToBase64(file);
      updatedUser.pfp = base64;

      try {
        await axios.post("http:localhost:8000/api/upload" , data);
      } catch (error) {
        console.log(error)
      }
    }

    try {
      
      const res = await axios.put("http://localhost:8000/api/users/" + user._id, updatedUser)
      setSuccess(true)
      dispatch({type : "UPDATE_SUCCESS",payload:res.data})
    } catch (error) {
      dispatch({type : "UPDATE_FAILURE"})

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
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update your Account</span>
            <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form action="" className="settingsForm" onSubmit={handleSubmit} encType="multipart/form-data">
            <label>Profile Picture</label>
            <div className="settingsPP">
                <img src={user.pfp} alt="" />
                <label htmlFor="fileInput">
                <i class="settingsPPICon fa-regular fa-circle-user"></i>
                </label>
                <input type="file" id="fileInput" hidden = "true" name="file" onChange={(e) => {setFile(e.target.files[0])}}/>
            </div>
            <label >Username</label>
            <input type="text" placeholder={user.username}  onChange={(e) => {setUsername(e.target.value)}}/>
            <label >eMail</label>
            <input type="text" placeholder={user.email}  onChange={(e) => {setEmail(e.target.value)}}/>
            <label >Password</label>
            <input type="text" onChange={(e) => {setPassword(e.target.value)}}/>
            <button className="settingsSubmit" type="submit">Update</button>
            {success && <span style = {{color : "green"}} >Profile updated successfully</span>}
        </form>
      </div>

      <Sidebar/>
    </div>
  )
}

export default Settings
