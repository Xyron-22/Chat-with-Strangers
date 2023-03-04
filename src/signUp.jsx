import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";


const SignUp = ({setUserId, color}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [toggle, setToggle] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState();
    const history = useNavigate();
          
    const {VITE_BASE_URL} = import.meta.env;
                    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            if (username.length > 8) return setMessage("Username must be 8 characters and below");
            const {data} = await axios.post(`${VITE_BASE_URL}/${toggle ? "signin" : "signup"}`, {username, password});
            if (data === "User already exist" || data === "User does not exist") return setMessage(data)
            localStorage.setItem("profile", JSON.stringify(data))
            setUserId(data);
            history("/home") 
            setUsername("")
            setPassword("")
        } else {
            setMessage("Username and Password required")
        }
};
    
    
    return(
        <>
        <div className="signup-container">  
                <div style={{textShadow: color}} className="signup-header">
                {toggle? <h1>Sign In</h1> : <h1>Sign Up</h1>}
                </div>
            <div className="signup-body">
                <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off" noValidate method="post">
                    <div className="form-div">
                    <span onClick={() => setToggle(!toggle)} style={{fontSize: "50px", marginBottom: "50px"}} class="material-symbols-outlined">
                        {toggle? "lock" : "login"}
                    </span>
                        <input name="username" type="text" placeholder="Username" id="input1" onChange={(e) => setUsername(e.target.value)} value={username}></input>
                        <label className="label" for="input1">Username</label>
                        <div className="div-inside">
                        <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" id="input2" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                        <span style={{position: "absolute", right: "3px"}} onClick={() => setShowPassword(!showPassword)} class="material-symbols-outlined">
                        {showPassword? "visibility_off" : "visibility"}
                        </span>
                        </div>
                        <label className="label" for="input2">Password</label>
                        <div className="alert">{message}</div>
                        <button className="login-register" type="submit">
                        {toggle? "Login" : "Register"}
                        </button>
                    </div>
                </form>
            </div>
            <div style={{textShadow: color}} className="signup-footer" onClick={() => setToggle(!toggle)}>
                {toggle ? "Don't have an Account ? Sign up" : "Already have an Account ? Sign in"}
            </div> 
        </div>
        </>
    )
};

export default SignUp;