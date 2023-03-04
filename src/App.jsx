import { useState } from "react";
import {io} from "socket.io-client";
import SignUp from './signUp';
import Navbar from './Navbar'
import Home from "./Home";
import { HashRouter, Route, Routes} from "react-router-dom";

const {VITE_BASE_URL} = import.meta.env;

const socket = io(VITE_BASE_URL);


function App() {
 const [hideForm, setHideForm] = useState(false);
  const [otherUser, setOtherUser] = useState(null);
  const [userId, setUserId] = useState({});
  const [color, setColor] = useState(null);
   
   
  return (
    <>
    <HashRouter>
    <Navbar color={color}></Navbar>
    <Routes>
      <Route path='/home' element={<Home setColor={setColor} color={color} setUserId={setUserId} userId={userId} socket={socket} hideForm={hideForm} setHideForm={setHideForm} otherUser={otherUser} setOtherUser={setOtherUser}></Home>}></Route>
      <Route path='/' element={<SignUp userId={userId} setUserId={setUserId} color={color}></SignUp>}>
      </Route>
    </Routes>
    </HashRouter>
    
    </>
  )
}

export default App
