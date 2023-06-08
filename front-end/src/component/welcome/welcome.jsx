import React, { Component } from "react";
import "./welcome.css";
import store from "../../store";

export default class Welcome extends Component{

    render() { 

        const { number, userId } = store.getState();


        setTimeout(() => {
            store.dispatch({ type: 'FIRST_QUESTION', payload: {
                number: 10,
                userId: userId
            }});
        }, 5000);
        return (
            <div className="welcome_container">
                <div className="text1">THANKS FOR</div>
                <div className="text2">JOINING</div>
                <div className="text3">OUR SITE</div>
                <img className="welcome_img" src="image/logo.png"></img>
            </div>
        )
    }
}