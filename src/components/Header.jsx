import React from "react";
import "../styles/Header.css";
import loginIcon from '../assets/loginIcon.png'
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";

const Header = () =>{
    return(
        <>
            <div className="headerContainer">
                <Link to='/'>  <img src={logo} />  </Link>
                <Link to='/perfil'>  <img src={loginIcon} />  </Link>
            </div>
            
                
        </> 
    )
}

export default Header;