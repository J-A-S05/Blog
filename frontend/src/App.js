import { useContext } from "react";
import TopBar from "./components/TopBar/TopBar.jsx"; 
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Settings from "./pages/settings/Settings.jsx";
import Single from "./pages/single/Single.jsx";
import Write from "./pages/write/Write.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Context } from "./context/Context.js";

function App() {
  const {user} = useContext(Context)
  return (
    <Router>

      <TopBar/>
      <Routes>
        <Route key={""} path="/" element = {<Home/>}>

      {/* <Home/> */}
        </Route>
        <Route key={""} exact path="/post/:postId" element = {<Single/>}>
      {/* <Single/> */}
          
        </Route>
        <Route key={""} exact path="/write" element = {user ? <Write/> : <Register/>}>
      {/* <Write/> */}
          
        </Route>
        <Route key={""} exact path="/settings" element = {user ? <Settings/> : <Register/>}>
      {/* <Settings/> */}
          
        </Route>
        <Route key={""} exact path="/login" element = {user ? <Home/> : <Login/>}>
          
      {/* <Login/> */}
        </Route>
        <Route key={""} exact path="/register" element = {user ? <Home/> : <Register/>}>
      {/* <Register/> */}
          
        </Route>
      </Routes>
    </Router>
    
  );
}

export default App;
