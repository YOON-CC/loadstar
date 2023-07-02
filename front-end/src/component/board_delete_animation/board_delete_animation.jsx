import React, { Component } from "react";
import "./board_delete_animation.css";
import store from "../../store";
import { Link, useNavigate} from 'react-router-dom';

const Board_delete_animation = () => {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/');
    }, 1200);

    return (
        <div className="delete_container">
            <img className="delete_img" src="image/logo.png"></img>
        </div>
    )
    
}
export default Board_delete_animation;