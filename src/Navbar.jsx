import React from "react";
import "./Navbar.css";

const Navbar = ({color}) => {

    return (
        <div className="navbar">
            <h1 style={{textShadow: color}} className="navbar-header">Chat With Strangers</h1>
        </div>
    )
}

export default Navbar;