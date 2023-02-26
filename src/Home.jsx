import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Chat from "./Chat";
import "./Home.css";


const Home = ({socket, hideForm, otherUser, userId, setOtherUser, setHideForm, setUserId, setColor, color}) => {
    const [chatId, setChatId] = useState(null);
    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    const history = useNavigate();

  
    const changeColor = (e) => {
      switch (e?.target?.innerText) {
        case "BLUE": setColor("0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6");
        break;
        case "GREEN": setColor("0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #0fa, 0 0 25px #0fa, 0 0 30px #0fa, 0 0 35px #0fa"); 
          break;
        case "PINK": setColor("0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #f09, 0 0 25px #f09, 0 0 30px #f09, 0 0 35px #f09");
          break;
        case "PURPLE": setColor("0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #9D00FF, 0 0 25px #9D00FF, 0 0 30px #9D00FF, 0 0 35px #9D00FF");
          break;
          default: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6";
      }
  }
          
  const getIds = async (otherUserId, username) => {
    const getUserId = hideForm.id;
    const getOtherUserId = otherUserId;
    const {data} = await axios.post("http://localhost:5001/createChat", {getUserId: getUserId, getOtherUserId});
    setOtherUser({id: otherUserId, username})
    setChatId(data);
  }

  const searchOnEnter = (e) => {
   if (e.keyCode == 13) {
    setUsers(users.filter((object) => object.username.includes(searchUser )))
   }
    else if (e.keyCode == 8) {
      fetch("http://localhost:5001")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.filter((object) => object.username.includes(searchUser)))
      })
    } 
  }
  
  const handleLogout = () => {
    localStorage.clear()
    setUserId({})
    setHideForm(false);
    setOtherUser(null);
    history("/")
}
  
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("profile"))) {
        setHideForm(JSON.parse(localStorage.getItem("profile")))
    }
}, [userId])   

  useEffect(() => {
    fetch("http://localhost:5001")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
      })
    socket.emit("join_room", chatId) //chatId
    // const interval = setInterval(() => {
    //   fetch("http://localhost:5001")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("this logs every 5 secs")
    //     setUsers(data)
    //   })
    // }, 5000)
    // return () => {
    //   clearInterval(interval)
    // }
}, [userId, chatId])
  
  // console.log(showHidden)

    return (
        <div className="app-container">
            <div className="theme-container">
                <div className="themes">
                    <h1 className="theme-header">Themes</h1>
                    <h3 onClick={changeColor} style={{textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #0fa, 0 0 25px #0fa, 0 0 30px #0fa, 0 0 35px #0fa"}} className="light">GREEN</h3>
                    <h3 onClick={changeColor} style={{textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6"}} className="light">BLUE</h3>
                    <h3 onClick={changeColor} style={{textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #f09, 0 0 25px #f09, 0 0 30px #f09, 0 0 35px #f09"}} className="light">PINK</h3>
                    <h3 onClick={changeColor} style={{textShadow: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #9D00FF, 0 0 25px #9D00FF, 0 0 30px #9D00FF, 0 0 35px #9D00FF"}} className="light">PURPLE</h3>
                </div>
                <div className="logout">
                    <button style={{textShadow: color}} className="button1" onClick={handleLogout}>Logout</button>
                </div>
            </div>
      <div className="chat-users-container">
    <Chat socket={socket} chatId={chatId} hideForm={hideForm} otherUser={otherUser} color={color}></Chat>
    </div>
     <div className="users-container">
      <div className="users-header"><h1 style={{color: "white", textShadow: color}}>Chat Users</h1></div>
      <div className="search-container">
        <input onKeyDown={searchOnEnter} onChange={(e) => setSearchUser(e.target.value)} className="search-input" type="text" placeholder="Search User"></input>
    </div>
    <div className="all-users-container">
    <div className="all-users">
      {users && (users?.map(({_id, username, createdAt}) => {
        if(_id === hideForm?.id) return null
            return (
          <div onClick={() => getIds(_id, username)} className="user-profile">
            <div className="username">{username}</div>
            <div style={{textShadow: color}} className="createdAt"><div className="create">Created At</div><div>{createdAt.slice(0, 10)}</div></div>
          </div>           
        )
      }))}
                                                           
    </div>
    </div>
    </div>
    </div>
    )
}

export default Home;