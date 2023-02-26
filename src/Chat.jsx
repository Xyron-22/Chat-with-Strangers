import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Chat.css"


const Chat = ({socket, chatId, hideForm, otherUser, color}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [arrMessage, setArrMessage] = useState([]);
         
    const {VITE_BASE_URL} = import.meta.env;
    
    const sendMessage = async () => {
        if(currentMessage !== "" && hideForm?.id !== undefined) {
            const messageData = {
                room: chatId,
                author: hideForm?.username,
                message: currentMessage.trim(),
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
            setArrMessage([...arrMessage, {author: hideForm?.username, message: currentMessage, time: messageData.time}])
            setCurrentMessage("");
        }
    }

    const sendOnEnter = (e) => {
        if (e.keyCode === 13 && currentMessage.trim() !== "") {
            sendMessage();
        }
    }
 
    useEffect(() => {
        const fetchChats = async () => {
            if (chatId) {
                const {data} = await axios.post(`${VITE_BASE_URL}/getChats/${chatId}`);
                setArrMessage(data);
            }
        }
        fetchChats();
    }, [chatId, otherUser]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setArrMessage(data)
    })
    }, [socket, chatId, otherUser])
    
        
    return (
        <div className="chat-container">
        <div className="user-head" >
        <h3 style={{textShadow: color}} className="chat-header">{otherUser?.username}</h3>
        </div>
        <div className="chat-body-inside">
           {otherUser && arrMessage?.map((object, i) => {
            return object.author !== hideForm.username ? (
                <>
                <div className="other-user">
                <div className="other-user-chat">{object?.message}{i === arrMessage.length - 1 && <div className="time">{object?.time}</div>}</div>
                </div>
                </>
            ) : (
                <>
                <div className="user">
                <div className="user-chat">{object?.message}{i === arrMessage.length - 1 && <div className="time">{object?.time}</div>}</div>
                </div>
                </>
            )
           })}
        </div>
        <div className="chat-footer">
            <input className="input-text" type="text" placeholder="Type Here" onChange={(e) => setCurrentMessage(e.target.value)} value={currentMessage} onKeyDown={sendOnEnter}></input>
            <button style={{textShadow: color}} className="button" onClick={sendMessage}>
            <span class="material-symbols-outlined">
                send
            </span>
            </button>
        </div>
        </div>
    )
}

export default Chat;