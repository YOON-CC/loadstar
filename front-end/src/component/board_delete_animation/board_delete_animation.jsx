import React, { Component } from "react";
import "./board_delete_animation.css";
import store from "../../store";

export default class Board_delete_animation extends Component{
    render() { 
        setTimeout(() => {
            store.dispatch({type:'AFTER_LOGIN'});
        }, 1000);

        return (
            <div className="delete_container">
                <img className="delete_img" src="image/logo.png"></img>
            </div>
        )
    }
}